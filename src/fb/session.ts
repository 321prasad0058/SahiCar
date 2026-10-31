// Everything that touches the Firebase SDK, behind one dynamic import so visitors only download it when
// sign-in is configured — and never before the page has painted.
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'

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
