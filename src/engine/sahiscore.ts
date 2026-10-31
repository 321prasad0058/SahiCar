// SahiScore: ranks every car, powertrain, gearbox and variant against one buyer's SahiFit answers.
//
// 1. Expand each model into configurations (fuel × gearbox) and pick the variant the buyer would actually buy:
//    the trim their must-haves and feature appetite call for, stepped down the ladder until it fits the budget.
// 2. Hard filters drop what can never work (over budget, too few seats, missing must-haves, refused fuel/gearbox).
// 3. Eleven sub-scores (0..100) measure fit: budget, 5-year cost, fuel match, safety, space, terrain,
//    drivability, performance, features, ownership and freshness.
// 4. Weights start from a balanced base, move with the buyer's priorities and are nudged by their context
//    (kids raise safety, long commutes raise running cost, bad roads raise terrain…).
// 5. Soft penalties multiply the result, so one deal-breaker can't be averaged away.
// 6. The best configuration per model is kept, and the top three are picked with a diversity rule.
import type { Answers, Priority } from './answers.ts'
import { MUST_HAVES } from './answers.ts'

const SOFT_MUST = new Set(MUST_HAVES.filter((m) => m.soft).map((m) => m.id))
import { tco, type Tco } from './costs.ts'
import type { Body, Car, Fuel, OnRoadData, Powertrain } from '../data/types.ts'

export type Dim = 'budget' | 'tco' | 'fuel' | 'safety' | 'space' | 'terrain' | 'drive' | 'performance' | 'features' | 'ownership' | 'fresh'

export const DIM_LABEL: Record<Dim, string> = {
  budget: 'Budget fit',
  tco: '5-year cost',
  fuel: 'Fuel match',
  safety: 'Safety',
  space: 'Space & comfort',
  terrain: 'Road & terrain',
  drive: 'Easy to drive',
  performance: 'Performance',
  features: 'Features',
  ownership: 'Ownership',
  fresh: 'Future-proof',
}

const BASE_WEIGHT: Record<Dim, number> = {
  budget: 8, tco: 16, fuel: 10, safety: 15, space: 12, terrain: 7, drive: 8, performance: 5, features: 9, ownership: 7, fresh: 3,
}

const PRIORITY_DIMS: Record<Priority, Dim[]> = {
  safety: ['safety'],
  cost: ['tco', 'fuel', 'budget'],
  space: ['space'],
  features: ['features'],
  performance: ['performance', 'drive'],
  reliability: ['ownership', 'fresh'],
}

export type GearKind = 'MT' | 'iMT' | 'AMT' | 'AT' | 'CVT' | 'DCT' | 'eCVT'

export function gearKind(t: string, fuel?: Fuel): GearKind {
  const s = t.toUpperCase().replace(/[^A-Z-]/g, '')
  if (fuel === 'ev' || s.includes('SINGLE')) return 'AT'
  if (s.startsWith('IMT') || s.includes('CLUTCHLESS')) return 'iMT'
  if (s.includes('AMT') || s.includes('AGS')) return 'AMT'
  if (s.includes('E-CVT') || s.includes('ECVT') || s.includes('DHT')) return 'eCVT'
  if (s.includes('CVT') || s.includes('IVT')) return 'CVT'
  if (s.includes('DCT') || s.includes('DSG') || s.includes('DCA')) return 'DCT'
  if (s.startsWith('AT') || s.includes('AUTO') || s.includes('TC') || s.includes('TORQUE')) return 'AT'
  return 'MT'
}
export const isAuto = (k: GearKind) => k !== 'MT' && k !== 'iMT'
export const GEAR_LABEL: Record<GearKind, string> = { MT: 'Manual', iMT: 'iMT (clutchless manual)', AMT: 'AMT', AT: 'Automatic', CVT: 'CVT', DCT: 'DCT', eCVT: 'e-CVT' }

export interface Config {
  car: Car
  pt: Powertrain
  gear: GearKind
  variant: string | null
  /** chosen trim's ex-showroom price */
  price: number
  /** 0 = base trim, 1 = top trim */
  trim: number
  trimCompromise: boolean
}

export interface Scored extends Config {
  score: number
  dims: Record<Dim, number>
  weights: Record<Dim, number>
  cost: Tco
  reasons: string[]
  caveats: string[]
  penalties: { label: string; factor: number }[]
  confidence: number
  badges: string[]
}

export interface Elimination {
  reason: string
  count: number
  examples: string[]
}

export interface Result {
  ranked: Scored[]
  picks: Scored[]
  eliminated: Elimination[]
  considered: number
  weights: Record<Dim, number>
  stretchHint: { car: Scored; extra: number } | null
}

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v))
const lakh = (v: number) => `₹${(v / 100000).toFixed(v >= 10000000 ? 0 : 2)} L`

// ── features

export function hasFeature(car: Car, id: string) {
  const want = id.toLowerCase()
  if (want === '6-airbags') return (car.safety.airbagsMax ?? car.safety.airbagsStd ?? 0) >= 6
  if (want === 'adas') return car.safety.adas !== 'none' || car.features.some((f) => f.toLowerCase().includes('adas'))
  return car.features.some((f) => {
    const have = f.toLowerCase()
    return have === want || have.includes(want) || (want === 'wireless-carplay' && have.includes('wireless') && (have.includes('carplay') || have.includes('android')))
  })
}

/** How far up the trim ladder the buyer needs to go, 0..1. */
function trimTarget(car: Car, a: Answers) {
  let t = [0, 0, 0.15, 0.35, 0.6, 0.85][a.priorities.features]
  for (const id of a.mustHave) {
    const m = MUST_HAVES.find((x) => x.id === id)
    if (!m) continue
    // 6 airbags are standard on most new cars now; only the trims that add them cost more
    const tier = id === '6-airbags' && (car.safety.airbagsStd ?? 0) < 6 ? 0.5 : m.tier
    t = Math.max(t, tier)
  }
  return t
}

// ── configurations

function variantsFor(car: Car, pt: Powertrain, gear: GearKind) {
  return car.variants
    .filter((v) => v.fuel === pt.fuel && v.price > 0)
    .filter((v) => {
      const k = gearKind(v.transmission, v.fuel)
      return k === gear || (isAuto(k) && isAuto(gear) && pt.transmissions.filter((t) => isAuto(gearKind(t, pt.fuel))).length === 1)
    })
    .sort((x, y) => x.price - y.price)
}

export function configs(car: Car, a: Answers, budgetEx: (fuel: Fuel) => number): Config[] {
  const out: Config[] = []
  const target = trimTarget(car, a)
  for (const pt of car.powertrains) {
    const gears = [...new Set((pt.transmissions.length ? pt.transmissions : ['MT']).map((t) => gearKind(t, pt.fuel)))]
    for (const gear of gears) {
      const ladder = variantsFor(car, pt, gear)
      const maxEx = budgetEx(pt.fuel)
      if (ladder.length) {
        let idx = Math.round(target * (ladder.length - 1))
        const wanted = idx
        while (idx > 0 && ladder[idx].price > maxEx) idx--
        const v = ladder[idx]
        out.push({ car, pt, gear, variant: v.name, price: v.price, trim: ladder.length > 1 ? idx / (ladder.length - 1) : 0.5, trimCompromise: idx < wanted })
      } else {
        // no variant ladder: interpolate between this powertrain's entry price and the model's top price
        const from = pt.priceFrom ?? car.price.min
        const top = Math.max(from, car.price.max)
        const autoPremium = isAuto(gear) && !car.powertrains.every((p) => p.transmissions.every((t) => isAuto(gearKind(t, p.fuel)))) ? 90000 : 0
        let trim = target
        let price = from + autoPremium + trim * (top - from) * 0.8
        while (trim > 0 && price > maxEx) {
          trim = Math.max(0, trim - 0.15)
          price = from + autoPremium + trim * (top - from) * 0.8
        }
        out.push({ car, pt, gear, variant: null, price: Math.round(price), trim, trimCompromise: trim < target })
      }
    }
  }
  return out
}

// ── estimates for missing data

const GC_BY_BODY: Record<Body, number> = { hatchback: 165, sedan: 165, 'compact-suv': 190, suv: 200, mpv: 180, pickup: 220, coupe: 140 }
const KERB_BY_BODY: Record<Body, number> = { hatchback: 900, sedan: 1100, 'compact-suv': 1200, suv: 1500, mpv: 1400, pickup: 1900, coupe: 1500 }

const yearOf = (s: string | null) => (s ? Number(s.slice(0, 4)) + (Number(s.slice(5, 7) || 6) - 1) / 12 : null)
const NOW = 2026 + 9.9 / 12

// ── sub-scores

function budgetScore(onRoadTotal: number, a: Answers) {
  const r = onRoadTotal / a.budget
  if (r > 1) return clamp(100 - ((r - 1) / Math.max(0.01, a.stretch)) * 45, 40)
  if (r >= 0.8) return 100
  if (r >= 0.5) return 70 + ((r - 0.5) / 0.3) * 30
  return Math.max(35, 70 - (0.5 - r) * 100)
}

function fuelScore(c: Config, a: Answers, annualKm: number) {
  const notes: string[] = []
  const hw = a.highwayShare
  let s: number
  switch (c.pt.fuel) {
    case 'ev': {
      const realRange = (c.pt.efficiency ?? (c.pt.batteryKwh ?? 30) * 6.5) * (0.78 - 0.1 * hw)
      s = a.charging === 'home' ? 100 : a.charging === 'work' ? 75 : 30
      if (a.charging === 'none') notes.push('No home or office charging — you’d live on public chargers')
      if (a.dailyKm * 1.4 > realRange) { s *= 0.4; notes.push(`Real range ~${Math.round(realRange)} km is tight for ${a.dailyKm} km a day`) }
      if (a.longTrips === 'weekly' && realRange < 350) { s *= 0.75; notes.push('Frequent long trips mean charging stops') }
      else if (a.longTrips === 'monthly' && realRange < 280) s *= 0.88
      if (a.place === 'rural') s *= 0.8
      else if (a.place === 'town') s *= 0.9
      if (annualKm > 12000 && a.charging !== 'none') s = Math.min(100, s * 1.08)
      break
    }
    case 'cng':
      s = a.cngNearby === 'yes' ? 95 : a.cngNearby === 'unsure' ? 70 : 30
      if (a.cngNearby === 'no') notes.push('No CNG station nearby')
      s *= annualKm > 12000 ? 1.05 : annualKm < 7000 ? 0.85 : 1
      if (a.hills) { s *= 0.8; notes.push('CNG loses ~10-15% power — felt on ghats') }
      if (a.luggage === 'heavy') { s *= 0.8; notes.push('The CNG cylinder eats into boot space') }
      if (hw > 0.6) s *= 0.9
      break
    case 'diesel':
      s = annualKm >= 15000 ? 100 : annualKm >= 10000 ? 85 : 62
      if (annualKm < 10000) notes.push('Diesel’s premium and DPF need longer, regular runs — you drive too little')
      if (hw > 0.5) s = Math.min(100, s + 8)
      if (a.hills) s = Math.min(100, s + 6)
      if (['DL', 'HR', 'UP'].includes(a.state) && a.years >= 10) { s *= 0.6; notes.push('Diesel cars are deregistered after 10 years in Delhi-NCR') }
      break
    case 'strong-hybrid':
      s = 80 + 20 * (1 - hw)
      if (annualKm < 7000) s *= 0.88
      break
    default:
      s = annualKm <= 10000 ? 100 : annualKm <= 15000 ? 88 : 75
      if (c.pt.fuel === 'mild-hybrid') s = Math.min(100, s + 3)
  }
  return { s: clamp(s), notes }
}

function safetyScore(car: Car, a: Answers) {
  const sf = car.safety
  let s: number
  const tested = sf.agency !== 'none' && sf.adult != null
  if (tested) {
    const wc = a.kids ? 0.7 : 0.35
    s = (((sf.adult ?? 0) + (sf.child ?? sf.adult ?? 0) * wc) / (5 * (1 + wc))) * 100
    if (sf.agency === 'GNCAP' && (sf.year ?? 2023) < 2022) s *= 0.85 // the older, easier protocol
  } else {
    s = 35 + ((sf.airbagsStd ?? 2) >= 6 ? 15 : 0) + (sf.esc ? 8 : 0)
  }
  if (sf.esc === false) s -= 6
  if (sf.adas === 'L2') s += 6 * (0.5 + a.highwayShare)
  else if (sf.adas === 'L1') s += 3
  return { s: clamp(s), tested }
}

function spaceScore(car: Car, c: Config, a: Answers) {
  const d = car.dims
  const wbTarget = a.people <= 2 ? 2350 : a.people <= 4 ? 2450 : a.people <= 5 ? 2550 : 2700
  const rear = clamp(70 + ((d.wheelbase ?? wbTarget - 50) - wbTarget) / 5, 25)
  const bootTarget = a.luggage === 'light' ? 200 : a.luggage === 'medium' ? 330 : 450
  let boot = d.boot ?? (car.body === 'hatchback' ? 260 : 380)
  if (c.pt.fuel === 'cng') boot *= /tata|hyundai/i.test(car.brand) ? 0.7 : 0.35 // twin-cylinder layouts keep more boot
  const bootS = clamp(60 + (boot - bootTarget) / 4, 10)
  const h = d.height ?? (car.body === 'hatchback' || car.body === 'sedan' ? 1500 : 1650)
  const ingress = clamp((h - 1450) / 2, 40)
  let s = 0.35 * rear + 0.35 * bootS + 0.3 * (a.elders ? ingress : rear)
  const maxSeats = Math.max(...car.seats)
  if (a.sevenOccasional && maxSeats >= 7) s += 12
  if (a.people >= 6 && maxSeats >= 7 && car.body === 'mpv') s += 6
  return clamp(s)
}

function terrainScore(car: Car, c: Config, a: Answers, ptw: number) {
  let T = { smooth: 160, mixed: 172, rough: 185, unpaved: 200 }[a.roads]
  if (a.flooding) T += 10
  const gc = car.dims.groundClearance ?? GC_BY_BODY[car.body]
  const gcS = gc >= T + 15 ? 100 : gc >= T ? 75 + ((gc - T) / 15) * 25 : Math.max(5, 75 - (T - gc) * 3)
  if (!a.hills) return { s: gcS, gc, T }
  let hill = clamp((ptw - 55) * 1.4, 20)
  if (c.pt.fuel === 'cng') hill *= 0.8
  return { s: 0.6 * gcS + 0.4 * hill, gc, T }
}

function driveScore(car: Car, c: Config, a: Answers) {
  const heavy = a.traffic === 'heavy'
  const gearS = { MT: heavy ? 40 : 85, iMT: heavy ? 62 : 85, AMT: heavy ? 82 : 78, AT: 100, CVT: 100, DCT: 95, eCVT: 100 }[c.gear]
  const L = car.dims.length ?? 4200
  const sizeS = a.parking === 'tight' ? clamp(100 - Math.max(0, L - 3850) / 10, 20) : clamp(100 - Math.max(0, L - 4600) / 15, 40)
  const tr = car.dims.turningRadius
  const turnS = tr ? clamp(100 - (tr - 4.8) * 40, 30) : 70
  let s = 0.45 * gearS + 0.4 * sizeS + 0.15 * turnS
  if (a.firstCar) s = 0.8 * s + 0.2 * clamp(100 - Math.max(0, L - 4000) / 8, 20)
  return clamp(s)
}

function perfScore(c: Config, ptw: number, a: Answers) {
  let s = clamp((ptw - 50) * 1.1)
  const tq = c.pt.torqueNm ?? 0
  if (a.highwayShare > 0.4) s = 0.75 * s + 0.25 * clamp((tq - 90) / 2.2)
  return clamp(s)
}

function featureScore(car: Car, c: Config) {
  const base = Math.min(100, 20 + car.features.length * 6)
  return clamp(base * (0.55 + 0.45 * c.trim))
}

function ownershipScore(car: Car, a: Answers) {
  const netW = { metro: 0.2, city: 0.3, town: 0.42, rural: 0.55 }[a.place]
  const net = (car.network ?? 3) * 20
  const resale = (car.resale ?? 3) * 20
  const svc = (6 - (car.serviceCost ?? 3)) * 20
  return clamp(netW * net + (1 - netW) * (0.55 * resale + 0.45 * svc))
}

function freshScore(car: Car) {
  const gen = yearOf(car.launched)
  const upd = yearOf(car.lastUpdate)
  if (gen == null) return 70
  const age = NOW - Math.max(gen, upd ?? gen)
  return age <= 2 ? 100 : age <= 4 ? 85 : age <= 6 ? 65 : 45
}

// ── weights

export function weightsFor(a: Answers): Record<Dim, number> {
  const w = { ...BASE_WEIGHT }
  for (const [p, dims] of Object.entries(PRIORITY_DIMS) as [Priority, Dim[]][]) {
    const m = 2 ** ((a.priorities[p] - 3) / 2) // level 3 is neutral; each step is ×√2
    for (const d of dims) w[d] *= m
  }
  const annualKm = a.dailyKm * 330
  if (a.kids) w.safety *= 1.3
  if (annualKm > 15000) { w.tco *= 1.25; w.fuel *= 1.2 }
  if (a.roads === 'rough' || a.roads === 'unpaved' || a.flooding) w.terrain *= 1.6
  else if (a.roads === 'smooth' && !a.hills) w.terrain *= 0.4
  if (a.hills) { w.terrain *= 1.3; w.performance *= 1.2 }
  if (a.place === 'town' || a.place === 'rural') w.ownership *= 1.4
  if (a.traffic === 'heavy' || a.firstCar || a.parking === 'tight') w.drive *= 1.3
  if (a.elders || a.people >= 5) w.space *= 1.2
  const sum = Object.values(w).reduce((x, y) => x + y, 0)
  for (const k of Object.keys(w) as Dim[]) w[k] = (w[k] / sum) * 100
  return w
}

// ── explanations

function explain(sc: Omit<Scored, 'reasons' | 'caveats' | 'badges'>, a: Answers, extra: { tested: boolean; gc: number; T: number; fuelNotes: string[] }) {
  const { car, pt, dims, weights, cost } = sc
  const reasons: { w: number; text: string }[] = []
  const caveats: string[] = [...extra.fuelNotes]
  const push = (d: Dim, text: string) => reasons.push({ w: dims[d] * weights[d], text })

  if (dims.safety >= 75) push('safety', extra.tested
    ? `${car.safety.adult}★ adult / ${car.safety.child ?? '–'}★ child in ${car.safety.agency} crash tests${a.kids ? ' — strong protection for your kids' : ''}`
    : `${car.safety.airbagsStd ?? 6} airbags${car.safety.esc ? ' and ESC' : ''} as standard`)
  if (dims.tco >= 70) push('tco', `About ₹${cost.perKm.toFixed(1)}/km all-in over ${cost.years} years — among the cheapest to own for your usage`)
  if (dims.fuel >= 85) {
    const why: Record<Fuel, string> = {
      ev: `Electric suits you: home charging at ~₹${cost.energyPerKm.toFixed(1)}/km`,
      cng: `CNG at ~₹${cost.energyPerKm.toFixed(1)}/km pays off on your ${a.dailyKm} km days`,
      diesel: `Diesel’s highway efficiency fits your ${Math.round(a.dailyKm * 330 / 1000)}k km a year`,
      'strong-hybrid': `Strong hybrid thrives in your city traffic — ~${cost.realEfficiency.toFixed(0)} kmpl real-world`,
      petrol: `Petrol makes most sense at your mileage — no premium you won’t recover`,
      'mild-hybrid': `Petrol mild-hybrid makes most sense at your mileage`,
    }
    push('fuel', why[pt.fuel])
  }
  if (dims.space >= 75) push('space', `${car.dims.boot ?? '—'} L boot and ${car.dims.wheelbase ?? '—'} mm wheelbase fit ${a.people} ${a.people === 1 ? 'person' : 'people'}${a.elders ? ' with easy ingress for elders' : ''}`)
  if (dims.terrain >= 80 && weights.terrain > 6) push('terrain', `${extra.gc} mm ground clearance clears your roads (we look for ${extra.T} mm+)`)
  if (dims.drive >= 80 && weights.drive > 7) push('drive', `${GEAR_LABEL[sc.gear]} ${a.traffic === 'heavy' ? 'takes the pain out of traffic' : 'is easy to live with'}${a.parking === 'tight' ? '; compact enough for tight parking' : ''}`)
  if (dims.performance >= 70) push('performance', `${pt.powerPs ?? '—'} PS / ${pt.torqueNm ?? '—'} Nm — effortless overtakes`)
  if (dims.features >= 75) push('features', `Well loaded: ${car.features.slice(0, 3).join(', ')}`)
  if (dims.ownership >= 75) push('ownership', `Strong resale and ${car.network >= 4 ? 'a service network that reaches small towns' : 'reasonable service costs'}`)

  if (!extra.tested) caveats.push('Not crash-tested by Bharat NCAP or Global NCAP yet')
  else if (dims.safety < 55) caveats.push(`Only ${car.safety.adult}★ adult crash rating`)
  if (dims.terrain < 55 && weights.terrain > 6) caveats.push(`${extra.gc} mm ground clearance is low for your roads (we look for ${extra.T} mm)`)
  if (dims.space < 50) caveats.push(a.luggage === 'heavy' ? 'Boot is small for your luggage' : 'Rear space is tight for your family')
  if (dims.drive < 55 && a.traffic === 'heavy') caveats.push('Manual gearbox in heavy traffic gets tiring')
  if (dims.budget < 70 && cost.onRoad.total > a.budget) caveats.push(`On-road ${lakh(cost.onRoad.total)} is above your ${lakh(a.budget)} budget`)
  if (sc.trimCompromise) caveats.push(`Your budget only reaches the ${sc.variant ?? 'lower'} trim — some features may be missing`)
  if (dims.fresh < 60) caveats.push('An ageing design — a new generation may not be far off')

  return {
    reasons: reasons.sort((x, y) => y.w - x.w).slice(0, 4).map((r) => r.text),
    caveats: [...new Set(caveats)].slice(0, 4),
  }
}

// ── the run

export function sahiScore(cars: Car[], a: Answers, data: OnRoadData): Result {
  const weights = weightsFor(a)
  const annualKm = a.dailyKm * 330
  const limit = a.budget * (1 + a.stretch)
  const elim = new Map<string, Elimination>()
  const drop = (reason: string, car: Car) => {
    const e = elim.get(reason) ?? { reason, count: 0, examples: [] }
    e.count++
    if (e.examples.length < 4 && !e.examples.includes(car.model)) e.examples.push(`${car.brand} ${car.model}`)
    elim.set(reason, e)
  }

  // the largest ex-showroom price whose on-road total still fits, per fuel (on-road is ~1.12–1.25× ex-showroom)
  const budgetEx = (fuel: Fuel) => limit / (fuel === 'ev' ? 1.05 : 1.17)

  const all: Scored[] = []
  for (const car of cars) {
    if (a.avoidBrands.includes(car.brand)) { drop('Brands you excluded', car); continue }
    if (a.bodies.length && !a.bodies.includes(car.body)) { drop('Not the body style you want', car); continue }
    const maxSeats = Math.max(...car.seats)
    const seatsNeeded = a.people >= 6 ? 7 : a.people
    if (maxSeats < seatsNeeded) { drop(`Fewer than ${seatsNeeded} seats`, car); continue }
    const missing = a.mustHave.filter((id) => !SOFT_MUST.has(id) && !hasFeature(car, id))
    if (missing.length) { drop('Missing a must-have feature', car); continue }
    const unconfirmed = a.mustHave.filter((id) => SOFT_MUST.has(id) && !hasFeature(car, id))

    const candidates = configs(car, a, budgetEx)
    // a car is only dropped when none of its configurations survive, for its most common reason
    const why: string[] = []
    let any = false
    for (const c of candidates) {
      if (a.avoidFuels.includes(c.pt.fuel)) { why.push('A fuel you ruled out'); continue }
      if (a.gearbox === 'auto' && !isAuto(c.gear)) { why.push('Manual only'); continue }
      if (a.gearbox === 'manual' && isAuto(c.gear)) { why.push('Automatic only'); continue }
      const cost = tco(car, c.pt, c.price, a, data)
      if (cost.onRoad.total > limit) { why.push('Over your budget'); continue }
      any = true

      const kerb = car.dims.kerbWeight ?? KERB_BY_BODY[car.body]
      const ptw = (c.pt.powerPs ?? 80) / (kerb / 1000)
      const fuel = fuelScore(c, a, annualKm)
      const safety = safetyScore(car, a)
      const terrain = terrainScore(car, c, a, ptw)
      const dims: Record<Dim, number> = {
        budget: budgetScore(cost.onRoad.total, a),
        tco: 0, // relative; filled in once every candidate is costed
        fuel: fuel.s,
        safety: safety.s,
        space: spaceScore(car, c, a),
        terrain: terrain.s,
        drive: driveScore(car, c, a),
        performance: perfScore(c, ptw, a),
        features: featureScore(car, c),
        ownership: ownershipScore(car, a),
        fresh: freshScore(car),
      }

      const penalties: { label: string; factor: number }[] = []
      if (c.pt.fuel === 'ev' && a.charging === 'none') penalties.push({ label: 'EV without a place to charge', factor: 0.78 })
      if (terrain.gc < terrain.T - 20) penalties.push({ label: 'Ground clearance well below what your roads need', factor: 0.85 })
      if (cost.onRoad.total > a.budget) penalties.push({ label: 'Over budget', factor: 1 - (0.08 * (cost.onRoad.total / a.budget - 1)) / Math.max(0.01, a.stretch) })
      if (c.trimCompromise) penalties.push({ label: 'Budget forces a lower trim', factor: 0.95 })
      if (a.kids && !safety.tested) penalties.push({ label: 'Untested car with kids on board', factor: 0.95 })
      if (c.pt.fuel === 'cng' && a.cngNearby === 'no') penalties.push({ label: 'No CNG nearby', factor: 0.8 })
      for (const id of unconfirmed) penalties.push({ label: `${MUST_HAVES.find((m) => m.id === id)?.label ?? id} not confirmed`, factor: 0.94 })

      const known = [car.dims.groundClearance, car.dims.boot, car.dims.wheelbase, c.pt.efficiency, car.safety.adult, c.pt.powerPs, car.dims.kerbWeight, car.variants.length || null]
      const confidence = known.filter((v) => v != null).length / known.length

      all.push({
        ...c, score: 0, dims, weights, cost, penalties, confidence, reasons: [], caveats: [], badges: [],
        ...{ _x: { tested: safety.tested, gc: terrain.gc, T: terrain.T, fuelNotes: fuel.notes } },
      } as Scored)
    }
    if (!candidates.length) drop('No price data', car)
    else if (!any) {
      const counts = why.reduce<Record<string, number>>((m, r) => ((m[r] = (m[r] ?? 0) + 1), m), {})
      drop(Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0], car)
    }
  }

  // 5-year cost is scored against the cheapest candidate the buyer could actually buy
  const minPerKm = Math.min(...all.map((s) => s.cost.perKm))
  for (const s of all) {
    s.dims.tco = clamp(100 * (minPerKm / s.cost.perKm) ** 1.3)
    let total = 0
    for (const d of Object.keys(weights) as Dim[]) total += s.dims[d] * weights[d]
    total /= 100
    for (const p of s.penalties) total *= p.factor
    s.score = Math.round(total * 10) / 10
    const x = (s as Scored & { _x: { tested: boolean; gc: number; T: number; fuelNotes: string[] } })._x
    Object.assign(s, explain(s, a, x))
    delete (s as Partial<typeof s> & { _x?: unknown })._x
  }

  // best configuration per model
  const bestByCar = new Map<string, Scored>()
  for (const s of all) {
    const cur = bestByCar.get(s.car.id)
    if (!cur || s.score > cur.score) bestByCar.set(s.car.id, s)
  }
  const ranked = [...bestByCar.values()].sort((x, y) => y.score - x.score)
  addBadges(ranked)

  return {
    ranked,
    picks: pickThree(ranked),
    eliminated: [...elim.values()].sort((x, y) => y.count - x.count),
    considered: cars.length,
    weights,
    stretchHint: null,
  }
}

/** Top three, but not three near-identical cars: the third slot goes to a different body or fuel if it is within 4 points. */
function pickThree(ranked: Scored[]) {
  const picks = ranked.slice(0, 2)
  const rest = ranked.slice(2, 12)
  if (!rest.length) return picks
  const differs = (s: Scored) => picks.every((p) => p.car.body !== s.car.body || p.pt.fuel !== s.pt.fuel)
  const alt = rest.find((s) => differs(s) && rest[0].score - s.score <= 4)
  picks.push(alt ?? rest[0])
  return picks
}

function addBadges(ranked: Scored[]) {
  const top = ranked.slice(0, 10)
  if (!top.length) return
  const best = (f: (s: Scored) => number) => top.reduce((x, y) => (f(y) > f(x) ? y : x))
  best((s) => -s.cost.perKm).badges.push('Lowest 5-yr cost')
  best((s) => s.dims.safety).badges.push('Safest')
  best((s) => s.dims.space).badges.push('Most spacious')
  best((s) => s.score / (s.cost.onRoad.total / 100000)).badges.push('Best value')
  best((s) => s.dims.features).badges.push('Most loaded')
}

/** Re-runs with a stretched budget to find a clearly better car the buyer is just short of. */
export function withStretchHint(cars: Car[], a: Answers, data: OnRoadData, res: Result): Result {
  if (!res.picks.length) return res
  const extra = Math.round((a.budget * 0.12) / 25000) * 25000
  const more = sahiScore(cars, { ...a, budget: a.budget + extra }, data)
  const top = more.ranked[0]
  if (top && top.car.id !== res.picks[0].car.id && top.score - res.picks[0].score >= 2.5) return { ...res, stretchHint: { car: top, extra } }
  return res
}

export type Relaxation = { label: string; patch: Partial<Answers>; fits: number }

/** When nothing fits: the single changes that would bring cars back, the one that brings back most first. */
export function relaxations(cars: Car[], a: Answers, data: OnRoadData): Relaxation[] {
  const out: Relaxation[] = []
  const tryPatch = (label: string, patch: Partial<Answers>) => {
    const fits = sahiScore(cars, { ...a, ...patch }, data).ranked.length
    if (fits) out.push({ label, patch, fits })
  }
  for (const id of a.mustHave) {
    const m = MUST_HAVES.find((x) => x.id === id)
    tryPatch(`Drop “${m?.label ?? id}”`, { mustHave: a.mustHave.filter((x) => x !== id) })
  }
  if (a.mustHave.length > 1) tryPatch('Drop all must-haves', { mustHave: [] })
  if (a.bodies.length) tryPatch('Any body style', { bodies: [] })
  if (a.avoidFuels.length) tryPatch('Allow every fuel', { avoidFuels: [] })
  if (a.gearbox !== 'any') tryPatch('Either gearbox', { gearbox: 'any' })
  if (a.avoidBrands.length) tryPatch('Allow every brand', { avoidBrands: [] })
  // the smallest budget rise that lets something in, in 10% steps up to the slider's ₹1 crore
  for (let b = a.budget * 1.1; b <= 10000000 * 1.0001; b *= 1.1) {
    const budget = b < 2000000 ? Math.round(b / 25000) * 25000 : Math.round(b / 100000) * 100000
    const fits = sahiScore(cars, { ...a, budget }, data).ranked.length
    if (fits) {
      out.push({ label: `Raise budget to ₹${parseFloat((budget / 100000).toFixed(2))} L`, patch: { budget }, fits })
      break
    }
  }
  return out.sort((x, y) => y.fits - x.fits).slice(0, 4)
}
