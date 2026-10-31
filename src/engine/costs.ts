// Money: on-road price, real-world running cost, the loan, resale, and the total cost of owning the car.
// Every number here is an estimate with its assumptions written down, so the UI can show its working.
import type { Answers } from './answers.ts'
import type { Body, Car, Fuel, OnRoadData, Powertrain, StateTax } from '../data/types.ts'

export interface OnRoad {
  exShowroom: number
  roadTax: number
  roadTaxPct: number
  registration: number
  insurance: number
  tcs: number
  fastag: number
  total: number
}

const FALLBACK_STATE: StateTax = {
  code: 'XX',
  name: 'India (average)',
  roadTax: [{ fuel: 'ev', upTo: null, pct: 0 }, { fuel: 'any', upTo: 1000000, pct: 9 }, { fuel: 'any', upTo: null, pct: 11 }],
  registrationFee: 600,
  fuel: { petrol: 101, diesel: 90, cng: 85, electricity: 7.5 },
}

export const stateOf = (data: OnRoadData, code: string) => data.states.find((s) => s.code === code) ?? data.states[0] ?? FALLBACK_STATE

/** States levy road tax by fuel and price slab; CNG and hybrids fall back to the petrol ("any") rate when not listed. */
/** Fuel-specific rows win over "any" rows; a few states (Rajasthan) slab by engine size instead of price. */
export function roadTaxPct(state: StateTax, fuel: Fuel, price: number, cc: number | null = null) {
  const key = fuel === 'mild-hybrid' || fuel === 'strong-hybrid' ? 'petrol' : fuel
  const pick = (f: string) =>
    state.roadTax.filter((r) => r.fuel === f).sort((a, b) => (a.upTo ?? Infinity) - (b.upTo ?? Infinity) || (a.ccUpTo ?? Infinity) - (b.ccUpTo ?? Infinity))
  let rows = pick(key)
  if (!rows.length) rows = pick('any')
  const row = rows.find((r) => (r.upTo == null || price <= r.upTo) && (r.ccUpTo == null || (cc ?? 1200) <= r.ccUpTo)) ?? rows[rows.length - 1]
  return row?.pct ?? 10
}

export function onRoad(data: OnRoadData, stateCode: string, body: Body, fuel: Fuel, exShowroom: number, cc: number | null = null): OnRoad {
  const st = stateOf(data, stateCode)
  const pct = roadTaxPct(st, fuel, exShowroom, cc)
  const roadTax = Math.round(Math.min((exShowroom * pct) / 100, st.taxCap ?? Infinity))
  const pctOf = (k: string) => (typeof data.insurancePct[k] === 'number' ? (data.insurancePct[k] as number) : undefined)
  const insPct = fuel === 'ev' ? pctOf('ev') ?? 3.6 : exShowroom > 4000000 ? pctOf('luxury') ?? 2.8 : pctOf(body) ?? 3.4
  const insurance = Math.round((exShowroom * insPct) / 100)
  const tcs = exShowroom > 1000000 ? Math.round((exShowroom * (data.tcsPctAbove10L ?? 1)) / 100) : 0
  const registration = st.registrationFee ?? 600
  const fastag = data.fastag ?? 500
  return { exShowroom, roadTax, roadTaxPct: pct, registration, insurance, tcs, fastag, total: exShowroom + roadTax + registration + insurance + tcs + fastag }
}

// ── real-world efficiency

/** Claimed figures are lab numbers. These factors bring them to what Indian owners report, by city/highway mix. */
export function realFactor(fuel: Fuel, highwayShare: number) {
  const h = Math.min(1, Math.max(0, highwayShare))
  switch (fuel) {
    case 'diesel': return 0.75 + 0.12 * h
    case 'cng': return 0.75 + 0.1 * h
    case 'strong-hybrid': return 0.88 - 0.1 * h // hybrids shine in traffic and fade at highway speeds
    case 'ev': return 0.78 - 0.1 * h
    default: return 0.68 + 0.17 * h
  }
}

const FALLBACK_EFF: Record<Fuel, number> = { petrol: 16, 'mild-hybrid': 18, diesel: 19, cng: 24, 'strong-hybrid': 24, ev: 400 }

/** Rupees per kilometre for fuel or electricity. */
export function energyPerKm(pt: Powertrain, a: Answers, st: StateTax) {
  const claimed = pt.efficiency ?? (pt.fuel === 'ev' && pt.batteryKwh ? pt.batteryKwh * 6.5 : FALLBACK_EFF[pt.fuel])
  const real = claimed * realFactor(pt.fuel, a.highwayShare)
  const p = st.fuel
  switch (pt.fuel) {
    case 'ev': {
      const kwhPerKm = ((pt.batteryKwh ?? claimed / 6.5) / real) * 1.12 // charging losses
      const tariff = a.charging === 'home' ? p.electricity : a.charging === 'work' ? (p.electricity + 18) / 2 : 19 // public DC
      return { perKm: kwhPerKm * tariff, real, unit: 'km per charge' }
    }
    case 'cng': {
      // roughly a tenth of running is on petrol (cold starts, refills); a CNG car does ~0.77x its CNG figure on petrol
      const perKm = 0.9 * (p.cng / real) + 0.1 * (p.petrol / (real * 0.77))
      return { perKm, real, unit: 'km/kg' }
    }
    case 'diesel': return { perKm: p.diesel / real, real, unit: 'kmpl' }
    default: return { perKm: p.petrol / real, real, unit: 'kmpl' }
  }
}

// ── loan

export function emi(principal: number, ratePct: number, years: number) {
  if (principal <= 0) return 0
  const r = ratePct / 1200
  const n = Math.round(years * 12)
  if (r === 0) return principal / n
  return (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1)
}

// ── resale

/** Share of the ex-showroom price a car fetches after `years`. */
export function retention(car: Car, fuel: Fuel, years: number, annualKm: number, stateCode: string) {
  let r = 0.88 * 0.86 ** years
  r *= 1 + 0.07 * ((car.resale ?? 3) - 3)
  if (fuel === 'ev') r *= 0.88 // used-EV buyers still discount for battery uncertainty
  if (fuel === 'strong-hybrid') r *= 1.03
  // Delhi-NCR deregisters diesel cars at 10 years, which crushes their value late in life
  if (fuel === 'diesel' && ['DL', 'HR', 'UP'].includes(stateCode) && years >= 7) r *= 0.65
  if (annualKm > 12000) r *= Math.max(0.75, 1 - (0.012 * (annualKm - 12000)) / 1000)
  return Math.max(0.08, Math.min(0.85, r))
}

// ── insurance renewals

const IDV = [0.95, 0.85, 0.8, 0.7, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3]
function thirdParty(pt: Powertrain) {
  if (pt.fuel === 'ev') return (pt.batteryKwh ?? 30) > 30 ? 2800 : 1800
  const cc = pt.cc ?? 1200
  return cc < 1000 ? 2094 : cc <= 1500 ? 3416 : 7897
}

// ── maintenance

const SERVICE_PER_10K = [0, 5500, 7500, 10000, 14000, 22000]

export interface Tco {
  years: number
  totalKm: number
  onRoad: OnRoad
  energy: number
  maintenance: number
  tyres: number
  insurance: number
  interest: number
  emi: number
  resale: number
  total: number
  perKm: number
  perMonth: number
  energyPerKm: number
  realEfficiency: number
  efficiencyUnit: string
}

export function tco(car: Car, pt: Powertrain, exShowroom: number, a: Answers, data: OnRoadData): Tco {
  const st = stateOf(data, a.state)
  const years = Math.max(1, a.years)
  const annualKm = a.dailyKm * 330
  const totalKm = annualKm * years
  const or = onRoad(data, a.state, car.body, pt.fuel, exShowroom, pt.cc)

  const e = energyPerKm(pt, a, st)
  const energy = e.perKm * totalKm

  const svcIdx = Math.min(5, Math.max(1, Math.round(car.serviceCost ?? 3)))
  let svcYear = SERVICE_PER_10K[svcIdx] * Math.max(0.7, annualKm / 10000) ** 0.8
  if (pt.fuel === 'ev') svcYear *= 0.55
  else if (pt.fuel === 'diesel') svcYear *= 1.15
  else if (pt.fuel === 'strong-hybrid') svcYear *= 0.95
  const maintenance = svcYear * years
  const tyreSet = 14000 + exShowroom * 0.004
  const tyres = Math.floor(totalKm / 45000) * tyreSet

  let insurance = 0
  for (let y = 2; y <= years; y++) insurance += exShowroom * IDV[Math.min(y - 1, IDV.length - 1)] * 0.02 + thirdParty(pt)

  let interest = 0
  let monthly = 0
  if (a.payment === 'loan') {
    const principal = Math.max(0, or.total - a.downPayment)
    monthly = emi(principal, a.rate, a.tenureYears)
    interest = Math.max(0, monthly * a.tenureYears * 12 - principal)
  }

  const resale = exShowroom * retention(car, pt.fuel, years, annualKm, a.state)
  // TCS is adjusted against income tax, so it is not a cost of ownership
  const total = or.total - or.tcs + energy + maintenance + tyres + insurance + interest - resale
  return {
    years,
    totalKm,
    onRoad: or,
    energy,
    maintenance,
    tyres,
    insurance,
    interest,
    emi: monthly,
    resale,
    total,
    perKm: total / Math.max(1, totalKm),
    perMonth: total / (years * 12),
    energyPerKm: e.perKm,
    realEfficiency: e.real,
    efficiencyUnit: e.unit,
  }
}
