// Product events for Analytics. Never anything personal: only the choices that shaped a result.
const on = import.meta.env.PROD && Boolean(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
const sent = new Set<string>()

/** Send an event once per distinct set of params per visit, without pulling Analytics into the page bundle. */
export function track(name: string, params: Record<string, string | number>) {
  if (!on) return
  const key = name + JSON.stringify(params)
  if (sent.has(key)) return
  sent.add(key)
  import('../fb/analytics').then((m) => m.log(name, params)).catch(() => {})
}

import type { Answers } from '../engine/answers'
import type { Result } from '../engine/sahiscore'

/** A zero-result quiz: which choices did it, so the data or the questions can be fixed. */
export function trackNoMatch(where: 'quiz' | 'results', step: string, a: Answers, res: Result) {
  const cut = (s: string) => s.slice(0, 100)
  track('no_match', {
    where,
    step,
    blockers: cut(res.eliminated.slice(0, 4).map((e) => `${e.reason}:${e.count}`).join('|')),
    budget_lakh: Math.round(a.budget / 10000) / 10,
    stretch_pct: Math.round(a.stretch * 100),
    people: a.people,
    gearbox: a.gearbox,
    bodies: cut(a.bodies.join(',') || 'any'),
    avoid_fuels: cut(a.avoidFuels.join(',') || 'none'),
    must_haves: cut(a.mustHave.join(',') || 'none'),
    avoid_brands: a.avoidBrands.length,
    state: a.state,
  })
}
