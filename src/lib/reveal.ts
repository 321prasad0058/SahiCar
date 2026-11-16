// The headlight reveal between "Reveal my cars" and the results page (components/Reveal.tsx). A tiny shared state, so
// the reveal (drawn above every route) and the results page (which renders unseen behind it) hand over without a flash.
//
//   idle → closing (night falls over the quiz) → hold (route changed; the headlights light "Your right car is…" while
//        the results load behind) → opening (the cards fly onto the page; its heading and cards appear) → idle

export type RevealPhase = 'idle' | 'closing' | 'hold' | 'opening'

let phase: RevealPhase = 'idle'
let ready = false
let onClosed: (() => void) | null = null
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())

export const getRevealPhase = () => phase
export const subscribeReveal = (f: () => void) => {
  subs.add(f)
  return () => void subs.delete(f)
}

/** Start the reveal. `closed` runs once the curtains have shut, which is when the route can change unseen. */
export function startReveal(closed: () => void) {
  ready = false
  onClosed = closed
  phase = 'closing'
  emit()
}

export function setRevealPhase(p: RevealPhase) {
  phase = p
  if (p === 'hold' && onClosed) {
    const f = onClosed
    onClosed = null
    f()
  }
  emit()
}

/** The results page has rendered behind the curtain. */
export function markResultsReady() {
  ready = true
  emit()
}
export const resultsReady = () => ready

/** Run `cb` once the curtain has started opening (or straight away when there is no reveal). */
export function whenRevealed(cb: () => void) {
  if (phase === 'idle' || phase === 'opening') {
    cb()
    return () => {}
  }
  const off = subscribeReveal(() => {
    if (phase === 'idle' || phase === 'opening') {
      off()
      cb()
    }
  })
  return off
}
