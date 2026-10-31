// Runs SahiScore for a set of typical Indian buyers and prints their top picks, so the algorithm's behaviour
// can be eyeballed after any data or weight change. Usage: npm run test:engine
import { readFileSync } from 'node:fs'
import { DEFAULT_ANSWERS, type Answers } from '../src/engine/answers.ts'
import { sahiScore, withStretchHint } from '../src/engine/sahiscore.ts'
import { timingFor } from '../src/engine/timing.ts'

const load = (f: string) => JSON.parse(readFileSync(new URL(`../src/data/${f}`, import.meta.url), 'utf8'))
const cars = load('cars.json')
const onroad = load('onroad.json')
const upcoming = load('upcoming.json')

const PERSONAS: { name: string; a: Partial<Answers>; expect?: (ids: string[], fuels: string[]) => string | null }[] = [
  {
    name: 'Pune first-time buyer, ₹8 L, city, heavy traffic',
    a: { budget: 800000, state: 'MH', place: 'city', dailyKm: 25, highwayShare: 0.1, people: 2, firstCar: true, traffic: 'heavy', parking: 'tight' },
  },
  {
    name: 'Delhi family of 4 with kids, ₹14 L, 60 km/day, home charging',
    a: { budget: 1400000, state: 'DL', place: 'metro', dailyKm: 60, people: 4, kids: true, charging: 'home', priorities: { safety: 5, cost: 4, space: 3, features: 3, performance: 2, reliability: 3 } },
    expect: (_, f) => (f.includes('ev') ? null : 'expected an EV in the top 3 for home charging and 20k km/yr'),
  },
  {
    name: 'Rural Maharashtra, joint family of 7, ₹20 L, unpaved roads',
    a: { budget: 2000000, state: 'MH', place: 'rural', dailyKm: 70, highwayShare: 0.5, roads: 'unpaved', people: 7, elders: true, luggage: 'heavy', traffic: 'light' },
    expect: (ids) => (ids.length ? null : 'expected 7-seaters'),
  },
  {
    name: 'Bengaluru techie, ₹25 L, features + performance, automatic only',
    a: { budget: 2500000, state: 'KA', place: 'metro', dailyKm: 40, gearbox: 'auto', mustHave: ['sunroof', 'adas'], priorities: { safety: 4, cost: 2, space: 3, features: 5, performance: 4, reliability: 3 } },
  },
  {
    name: 'Mumbai Uber-style high mileage, ₹10 L, CNG nearby, 150 km/day',
    a: { budget: 1000000, state: 'MH', place: 'metro', dailyKm: 150, highwayShare: 0.2, cngNearby: 'yes', people: 4, luggage: 'medium', priorities: { safety: 3, cost: 5, space: 3, features: 2, performance: 1, reliability: 4 } },
    expect: (_, f) => (f.some((x) => x === 'cng' || x === 'ev' || x === 'strong-hybrid' || x === 'diesel') ? null : 'expected a low running-cost fuel'),
  },
  {
    name: 'Kerala hills, ₹16 L, monsoon flooding, highway trips',
    a: { budget: 1600000, state: 'KL', place: 'town', dailyKm: 50, highwayShare: 0.6, roads: 'rough', flooding: true, hills: true, longTrips: 'weekly' },
  },
  {
    name: 'Chennai retired couple, ₹12 L, elders, automatic, low km',
    a: { budget: 1200000, state: 'TN', place: 'metro', dailyKm: 15, highwayShare: 0.1, people: 2, elders: true, gearbox: 'auto', priorities: { safety: 4, cost: 3, space: 4, features: 2, performance: 1, reliability: 5 } },
  },
]

let failures = 0
for (const p of PERSONAS) {
  const a = { ...DEFAULT_ANSWERS, ...p.a, priorities: { ...DEFAULT_ANSWERS.priorities, ...p.a.priorities } }
  const t0 = performance.now()
  const res = withStretchHint(cars, a, onroad, sahiScore(cars, a, onroad))
  const ms = performance.now() - t0
  console.log(`\n■ ${p.name}  (${res.ranked.length}/${res.considered} fit, ${ms.toFixed(0)} ms)`)
  for (const s of res.picks) {
    const t = timingFor(s, upcoming, a)
    console.log(
      `  ${s.score.toFixed(1).padStart(5)}  ${s.car.brand} ${s.car.model} — ${s.variant ?? 'est. trim'} ${s.pt.fuel}/${s.gear}` +
        `  on-road ₹${(s.cost.onRoad.total / 1e5).toFixed(2)}L  ₹${s.cost.perKm.toFixed(1)}/km  [${t.verdict}]  ${s.badges.join(', ')}`,
    )
    console.log(`         + ${s.reasons.slice(0, 2).join(' | ')}`)
    if (s.caveats.length) console.log(`         ! ${s.caveats.slice(0, 2).join(' | ')}`)
  }
  if (res.stretchHint) console.log(`  ↗ +₹${(res.stretchHint.extra / 1e5).toFixed(1)}L unlocks ${res.stretchHint.car.car.model} (${res.stretchHint.car.score})`)
  console.log(`  dropped: ${res.eliminated.map((e) => `${e.reason} ${e.count}`).join('; ')}`)
  const why = p.expect?.(res.picks.map((s) => s.car.id), res.picks.map((s) => s.pt.fuel))
  if (why) { failures++; console.log(`  ✗ ${why}`) }
}
if (failures) { console.log(`\n${failures} expectation(s) failed`); process.exitCode = 1 }
