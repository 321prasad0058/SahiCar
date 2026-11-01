// Sign-in gate. Browsing, the quiz and your top match are free; the full ranking, saving cars and comparing
// need a free account. Whatever the visitor was doing is remembered and finished once they've signed in.
import { useAuth } from '../state/auth'
import { useStore } from '../state/store'
import { track } from './track'

export type Pending = { garage?: string; compare?: string }
const KEY = 'sc-pending'
let go: ((to: string) => void) | null = null

/** Called once by the app shell so the gate can navigate. */
export const setGateNavigator = (f: (to: string) => void) => void (go = f)

/** Firebase restores a saved session a moment after load; don't send a signed-in visitor to the login page. */
function ready() {
  return new Promise<void>((res) => {
    if (useAuth.getState().ready) return res()
    const stop = useAuth.subscribe((s) => s.ready && (stop(), res()))
    setTimeout(() => (stop(), res()), 4000)
  })
}

/** Run `act` if signed in (or sign-in isn't configured); otherwise remember `pending` and go to sign in. */
export async function gate(reason: 'save' | 'compare' | 'results', act: () => void, pending?: Pending) {
  if (!useAuth.getState().enabled) return act()
  await ready()
  if (useAuth.getState().user) return act()
  track('signup_prompt', { reason })
  try {
    if (pending) sessionStorage.setItem(KEY, JSON.stringify(pending))
  } catch { /* storage blocked: they'll just redo it */ }
  go?.(`/login?next=${encodeURIComponent(location.pathname)}&why=${reason}`)
}

/** After sign-in: finish what they were doing before the gate. */
export function finishPending() {
  let p: Pending | null = null
  try {
    p = JSON.parse(sessionStorage.getItem(KEY) ?? 'null')
    sessionStorage.removeItem(KEY)
  } catch { /* nothing pending */ }
  const s = useStore.getState()
  if (p?.garage && !s.garage.includes(p.garage)) s.toggleGarage(p.garage)
  if (p?.compare && !s.compare.includes(p.compare)) s.toggleCompare(p.compare)
}

/** Save or unsave a car; saving needs an account, removing never does. */
export function toggleSave(id: string, done?: (saved: boolean) => void) {
  const s = useStore.getState()
  if (s.garage.includes(id)) return done?.(s.toggleGarage(id))
  gate('save', () => {
    const saved = useStore.getState().toggleGarage(id)
    track('car_save', { car: id })
    done?.(saved)
  }, { garage: id })
}

/** Add or remove a car from compare; adding needs an account. */
export function toggleCompareGated(id: string) {
  const s = useStore.getState()
  if (s.compare.includes(id)) return s.toggleCompare(id)
  gate('compare', () => {
    useStore.getState().toggleCompare(id)
    track('compare_add', { car: id })
  }, { compare: id })
}
