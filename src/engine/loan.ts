// Car-loan maths for the EMI calculator: the rate a lender would likely quote this buyer, the EMI, the full
// repayment schedule, and what an extra yearly payment saves. Monthly reducing balance, as Indian banks compute it.
import { LENDERS, type Lender, type ScoreBand } from '../data/loans.ts'
import { emi } from './costs.ts'

export type Profile = { loan: number; years: number; score: ScoreBand; ev: boolean }

// where in a lender's published range each score band usually lands, when it doesn't publish score pricing
const POSITION: Record<ScoreBand, number> = { excellent: 0, good: 0.2, unknown: 0.35, fair: 0.5 }
// without a published top rate: typical step-ups over the starting rate
const STEP: Record<ScoreBand, number> = { excellent: 0, good: 0.4, unknown: 0.6, fair: 1.0 }
const SCORE_FLOOR: Record<ScoreBand, number> = { excellent: 750, good: 700, fair: 650, unknown: 700 }

/** The rate this lender would likely quote, and whether it's published for this profile or our estimate. */
export function rateFor(l: Lender, p: Profile) {
  const from = l.short && p.years < l.short.under ? l.short.rateFrom : l.rateFrom
  const bands = l.tiers ? l.tiers.find((t) => t.upTo == null || p.loan <= t.upTo)!.bands : l.bands
  let rate: number
  let published = false
  if (bands?.[p.score] != null) {
    rate = bands[p.score]!
    published = !l.tiers // tiers are mapped from internal grades, so still an estimate
  } else if (l.rateTo != null) {
    rate = from + (l.rateTo - from) * POSITION[p.score]
  } else {
    rate = from + STEP[p.score]
  }
  if (p.ev && l.evDiscount) rate -= l.evDiscount
  return { rate: Math.round(rate * 100) / 100, published: published || p.score === 'excellent' }
}

/** Processing fee including 18% GST; null when the lender doesn't publish one. */
export function processingFee(l: Lender, loan: number): number | null {
  const f = l.fee
  if (f.unknown) return null
  let v = f.slabs ? f.slabs.find((s) => s.upTo == null || loan <= s.upTo)!.flat : f.pct != null ? (loan * f.pct) / 100 : f.flat ?? 0
  v = Math.min(f.max ?? Infinity, Math.max(f.min ?? 0, v))
  return Math.round(v * 1.18)
}

export type Quote = {
  lender: Lender
  rate: number
  /** true when the rate is the lender's published price for this profile, false when we estimated it */
  published: boolean
  emi: number
  interest: number
  fee: number | null
  total: number
  allowed: boolean
  why?: string
}

/** Every lender's quote for this loan: eligible first, then cheapest total cost (interest + fee). */
export function quotes(p: Profile): Quote[] {
  return LENDERS.map((l) => {
    const { rate, published } = rateFor(l, p)
    const m = emi(p.loan, rate, p.years)
    const interest = Math.max(0, m * p.years * 12 - p.loan)
    const fee = processingFee(l, p.loan)
    let why: string | undefined
    if (p.years > l.maxTenure) why = `Lends for up to ${l.maxTenure} years`
    else if (l.minScore && SCORE_FLOOR[p.score] < l.minScore) why = `Needs a score above ${l.minScore - 1}`
    return { lender: l, rate, published, emi: m, interest, fee, total: interest + (fee ?? 0), allowed: !why, why }
  }).sort((a, b) => Number(b.allowed) - Number(a.allowed) || a.total - b.total)
}

export type Year = { year: number; principal: number; interest: number; balance: number }

/** Year-by-year split of what you pay, with an optional extra payment at the end of each year. */
export function schedule(loan: number, rate: number, years: number, extraPerYear = 0) {
  const r = rate / 1200
  const pay = emi(loan, rate, years)
  let bal = loan
  let months = 0
  let totalInterest = 0
  const out: Year[] = []
  for (let y = 1; bal > 0.5 && y <= years; y++) {
    let pi = 0, ii = 0
    for (let m = 0; m < 12 && bal > 0.5; m++) {
      const i = bal * r
      const pp = Math.min(bal, pay - i)
      bal -= pp
      ii += i
      pi += pp
      months++
    }
    if (extraPerYear > 0 && bal > 0.5) {
      const x = Math.min(bal, extraPerYear)
      bal -= x
      pi += x
    }
    totalInterest += ii
    out.push({ year: y, principal: pi, interest: ii, balance: Math.max(0, bal) })
  }
  return { years: out, months, totalInterest, emi: pay }
}
