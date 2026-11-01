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
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { auth, db } from './firebase'

export * from './user'

const need = () => {
  if (!auth) throw new Error('Sign-in is not configured on this deployment.')
  return auth
}

export const google = async () => void (await signInWithPopup(need(), new GoogleAuthProvider()))
export const login = async (email: string, password: string) => void (await signInWithEmailAndPassword(need(), email, password))
export async function signup(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(need(), email, password)
  await updateProfile(cred.user, { displayName: name })
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
