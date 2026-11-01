// Everything that touches the Firebase SDK, behind one dynamic import so visitors only download it when
// sign-in is configured — and never before the page has painted.
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  deleteUser,
  getAdditionalUserInfo,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { track } from '../lib/track'
import { auth, db } from './firebase'

export * from './user'
export * from './feedback'

const need = () => {
  if (!auth) throw new Error('Sign-in is not configured on this deployment.')
  return auth
}

// GA4's recommended sign_up / login events, for the sign-up conversion (the method only, nothing about the person)
export async function google() {
  const cred = await signInWithPopup(need(), new GoogleAuthProvider())
  track(getAdditionalUserInfo(cred)?.isNewUser ? 'sign_up' : 'login', { method: 'google' })
}
export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(need(), email, password)
  track('login', { method: 'email' })
}
export async function signup(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(need(), email, password)
  await updateProfile(cred.user, { displayName: name })
  track('sign_up', { method: 'email' })
}
export const reset = (email: string) => sendPasswordResetEmail(need(), email)
export const logout = async () => void (auth && (await signOut(auth)))
export const watch = (fn: (u: User | null) => void) => (auth ? onAuthStateChanged(auth, fn) : () => {})

/** Right to erasure (DPDP Act): delete the saved cars, the profile, then the account itself. */
export async function deleteAccount() {
  const u = need().currentUser
  if (!u) return
  if (db) {
    const garage = await getDocs(collection(db, 'users', u.uid, 'garage'))
    await Promise.all(garage.docs.map((d) => deleteDoc(d.ref)))
    await deleteDoc(doc(db, 'users', u.uid))
  }
  // Firebase asks for a recent sign-in before deleting an account; the caller explains that if it happens
  await deleteUser(u)
}
