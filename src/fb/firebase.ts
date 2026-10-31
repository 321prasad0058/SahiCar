// Firebase on the free Spark plan: Authentication for accounts, Firestore for saved answers and garages.
// Without a config the app still works end to end — sign-in is hidden and everything stays in this browser.
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectFirestoreEmulator, initializeFirestore, type Firestore } from 'firebase/firestore'

const env = import.meta.env
const emulators = env.VITE_FIREBASE_EMULATORS === '1'
export const firebaseEnabled = Boolean(env.VITE_FIREBASE_API_KEY) || emulators

let app: FirebaseApp | null = null
export let auth: Auth | null = null
export let db: Firestore | null = null

if (firebaseEnabled) {
  app = initializeApp({
    apiKey: env.VITE_FIREBASE_API_KEY ?? 'demo-key',
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ?? `${env.VITE_FIREBASE_PROJECT_ID ?? 'demo-sahicar'}.firebaseapp.com`,
    projectId: env.VITE_FIREBASE_PROJECT_ID ?? 'demo-sahicar',
    appId: env.VITE_FIREBASE_APP_ID,
  })
  auth = getAuth(app)
  db = initializeFirestore(app, { ignoreUndefinedProperties: true })
  if (emulators) {
    const host = location.hostname
    connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
    connectFirestoreEmulator(db, host, 8180)
  }
}
