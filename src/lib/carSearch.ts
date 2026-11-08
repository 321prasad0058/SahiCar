// Search-as-you-type for car names: "vict" finds the Victoris, "nexon ev" finds the Nexon.ev, "cretta" still finds
// the Creta. Names are compared without dots, dashes or spaces inside words, and a typo or two is forgiven.
import type { Car } from '../data/types'

/** lower case, and "Nexon.ev" / "XUV 3XO" / "e-Vitara" reduced to plain words */
export const norm = (s: string) => s.toLowerCase().replace(/[.\-_/]+/g, ' ').replace(/[^a-z0-9 ]+/g, '').replace(/\s+/g, ' ').trim()

/** edit distance with adjacent swaps, stopping early once it can't come in under max */
function distance(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev2: number[] = []
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    let best = i
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], prev2[j - 2] + 1)
      best = Math.min(best, cur[j])
    }
    if (best > max) return max + 1
    prev2 = prev
    prev = cur
  }
  return prev[b.length]
}

/** How well one typed word matches a name's words: 0 = no match, higher is better. */
function wordScore(w: string, words: string[], joined: string) {
  let s = 0
  for (const t of words) {
    if (t === w) s = Math.max(s, 100)
    else if (t.startsWith(w)) s = Math.max(s, 80)
    // inside a word only from two letters ("vict" in "Invicto"), so a lone "h" doesn't match "Punch"
    else if (w.length >= 2 && t.includes(w)) s = Math.max(s, 50)
    // typos only from four letters: "xuv" is a name, not a misspelt "suv"
    else if (w.length >= 4) {
      // a typo: compare with the same-length start of the word ("victorus" ~ "victoris", "cretta" ~ "creta")
      const max = w.length >= 7 ? 2 : 1
      const d = Math.min(distance(w, t.slice(0, w.length), max), distance(w, t, max))
      if (d <= max) s = Math.max(s, 35 - d * 10)
    }
  }
  // "nexonev" for "Nexon.ev", "xuv3xo" for "XUV 3XO"
  if (!s && w.length >= 3 && joined.includes(w)) s = 45
  return s
}

/** 0 when any typed word misses; otherwise a score where model-name hits beat brand and body hits. */
export function carMatch(car: Pick<Car, 'brand' | 'model' | 'body'>, query: string) {
  const q = norm(query).split(' ').filter(Boolean)
  if (!q.length) return 1
  const model = norm(car.model).split(' ')
  const named = [...model, ...norm(car.brand).split(' ')]
  // body styles ("suv", "hatchback") count only once a word is long enough to mean them, so "tata h" isn't every hatchback
  const all = [...named, ...norm(car.body).split(' ')]
  const joined = norm(`${car.brand} ${car.model}`).replace(/ /g, '')
  let total = 0
  for (const w of q) {
    const inModel = wordScore(w, model, joined)
    const any = inModel || wordScore(w, w.length >= 3 ? all : named, joined) * 0.7
    if (!any) return 0
    total += any
  }
  return total / q.length
}

export type Suggestion = { kind: 'car'; car: Car; score: number } | { kind: 'brand'; brand: string; count: number }

/** Up to `limit` suggestions for the box under the search field: brands that match first, then cars, best first. */
export function suggest(cars: Car[], query: string, limit = 7): Suggestion[] {
  const q = norm(query)
  if (!q) return []
  const brandHits = [...new Set(cars.map((c) => c.brand))]
    .filter((b) => norm(b).startsWith(q) || (q.length >= 3 && norm(b).split(' ').some((w) => w.startsWith(q))))
    .map((brand) => ({ kind: 'brand' as const, brand, count: cars.filter((c) => c.brand === brand).length }))
  const carHits = cars
    .map((car) => ({ kind: 'car' as const, car, score: carMatch(car, q) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.car.price.min - b.car.price.min)
  return [...brandHits.slice(0, 2), ...carHits].slice(0, limit)
}
