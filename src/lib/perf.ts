// Performance tier, after the portfolio's: start from what the device reports, then step down if frames run slow.
export type Tier = 'high' | 'low'

// test switches (?perf=low|high, ?3d=0|1) work only on this computer (localhost), never on the live site
const testing = ['localhost', '127.0.0.1'].includes(location.hostname) || /^192\.168\./.test(location.hostname)

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }

function detect(): Tier {
  try {
    const forced = (testing ? new URLSearchParams(location.search).get('perf') : null) ?? sessionStorage.getItem('sc-perf')
    if (forced === 'high' || forced === 'low') return forced
  } catch { /* storage blocked */ }
  const n = navigator as Nav
  const cores = n.hardwareConcurrency ?? 4
  const mem = n.deviceMemory ?? 4
  if (n.connection?.saveData) return 'low'
  if (cores <= 2 || mem <= 2 || (cores <= 4 && mem <= 4)) return 'low'
  return 'high'
}

let tier: Tier = detect()
const listeners = new Set<(t: Tier) => void>()
document.documentElement.dataset.perf = tier

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
export const coarsePointer = matchMedia('(pointer: coarse)').matches
export const getTier = () => tier
export function setTier(t: Tier) {
  if (t === tier) return
  tier = t
  document.documentElement.dataset.perf = t
  try { sessionStorage.setItem('sc-perf', t) } catch { /* storage blocked */ }
  listeners.forEach((l) => l(t))
}
export function onTier(fn: (t: Tier) => void) {
  listeners.add(fn)
  return () => void listeners.delete(fn)
}

/** Calls onSlow once when the average frame stays over budget (~28 fps) for a full window. */
export class FrameGuard {
  private samples: number[] = []
  private fired = false
  private since = performance.now()
  constructor(private onSlow: () => void, private budgetMs = 36, private size = 90, private warmupMs = 2500) {}
  tick(dtMs: number) {
    if (this.fired || dtMs > 500) return // tab switches and long pauses are not a verdict
    if (performance.now() - this.since < this.warmupMs) return
    this.samples.push(dtMs)
    if (this.samples.length > this.size) this.samples.shift()
    if (this.samples.length === this.size && this.samples.reduce((a, b) => a + b, 0) / this.size > this.budgetMs) {
      this.fired = true
      this.onSlow()
    }
  }
  reset() { this.samples = []; this.since = performance.now() }
}

type Conn = { saveData?: boolean; effectiveType?: string }
/** Whether to start the 3D scene at all: never with Data Saver on, never without WebGL; `?3d=0|1` overrides on localhost. */
export function canRun3D() {
  // never while the build pre-renders pages (scripts/prerender.mjs): the 3D canvas isn't saved, and on a build server
  // without a graphics chip, drawing it in software can stall the page for minutes
  if ((window as Window & { __SC_PRERENDER__?: boolean }).__SC_PRERENDER__) return false
  try {
    const forced = testing ? new URLSearchParams(location.search).get('3d') : null
    if (forced === '0') return false
    if (forced === '1') return true
  } catch { /* ignore */ }
  const c = (navigator as Navigator & { connection?: Conn }).connection
  // only Data Saver opts out: slow networks and low-end phones still get the moving cars (the picture shows meanwhile)
  if (c?.saveData) return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** A good moment to fetch things the visitor will probably need next (not on slow or metered connections). */
export function whenIdle(fn: () => void) {
  const c = (navigator as Navigator & { connection?: Conn }).connection
  if (c?.saveData || c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g') return
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
  if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout: 4000 })
  else setTimeout(fn, 2000)
}

// ── the homepage hero comes first
// Until the homepage's 3D shows its first frame (or gives up), other background downloads — sign-in, analytics,
// the quiz — wait, so on a slow network the moving cars get the whole connection.
let heroDone = false
export function markHeroDone() {
  if (heroDone) return
  heroDone = true
  dispatchEvent(new Event('sc:hero-done'))
}
/** Run fn once the hero is up (straight away on any other page), and never later than maxMs. */
export function afterHero(fn: () => void, maxMs = 12000) {
  if (heroDone || location.pathname !== '/') return fn()
  let ran = false
  const go = () => {
    if (ran) return
    ran = true
    fn()
  }
  addEventListener('sc:hero-done', go, { once: true })
  setTimeout(go, maxMs)
}
