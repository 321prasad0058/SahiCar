// The signed-in user. Google or email + password through Firebase Auth (both free on the Spark plan).
// The Firebase SDK is loaded lazily from fb/session; without a config it is never downloaded.
import type { User } from 'firebase/auth'
import { create } from 'zustand'
import { useStore } from './store'

const env = import.meta.env
const enabled = Boolean(env.VITE_FIREBASE_API_KEY) || env.VITE_FIREBASE_EMULATORS === '1'
export const fb = () => import('../fb/session')

interface AuthState {
  user: User | null
  ready: boolean
  enabled: boolean
  google: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  reset: (email: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = create<AuthState>(() => ({
  user: null,
  ready: !enabled,
  enabled,
  google: async () => (await fb()).google(),
  login: async (e, p) => (await fb()).login(e, p),
  signup: async (n, e, p) => (await fb()).signup(n, e, p),
  reset: async (e) => (await fb()).reset(e),
  logout: async () => (await fb()).logout(),
}))

/** On sign-in, merge this browser's garage with the account's, and restore saved answers if this browser has none. */
async function sync(u: User) {
  const { loadGarage, loadProfile, saveCar, saveProfile } = await fb()
  const local = useStore.getState()
  const [profile, garage] = await Promise.all([loadProfile(u.uid), loadGarage(u.uid)])
  const remote = garage.map((g) => g.carId)
  for (const id of local.garage.filter((id) => !remote.includes(id))) await saveCar(u.uid, id)
  useStore.getState().setGarage([...new Set([...remote, ...local.garage])])
  if (profile?.answers && !local.done) {
    useStore.getState().setAnswers(profile.answers)
    useStore.getState().finish()
  }
  await saveProfile(u, local.done ? local.answers : undefined)
}

if (enabled) {
  const start = () =>
    fb().then(({ watch }) =>
      watch((user) => {
        useAuth.setState({ user, ready: true })
        if (user) sync(user).catch(() => {})
      }),
    )
  if (document.readyState === 'complete') setTimeout(start, 300)
  else addEventListener('load', () => setTimeout(start, 300), { once: true })
}
