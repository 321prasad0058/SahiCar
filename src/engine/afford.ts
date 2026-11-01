// Can the buyer afford it? Used only when they give their take-home pay in SahiFit. The same lines as the EMI
// calculator: an EMI up to 15% of take-home pay is comfortable, up to 25% is a stretch, more is too much. A cash
// buyer is judged on the price against a year's pay and on the running cost (fuel, service, tyres, insurance).
import type { Answers } from './answers.ts'
import { emi, type Tco } from './costs.ts'

export type Verdict = 'yes' | 'stretch' | 'no'

export const COMFORT = 0.15
export const STRETCH = 0.25

export const VERDICT_LABEL: Record<Verdict, string> = {
  yes: 'Yes, comfortably',
  stretch: 'Yes, but it’s a stretch',
  no: 'Not yet',
}

export interface Afford {
  verdict: Verdict
  emi: number
  /** EMI as a share of take-home pay, 0..1 (0 for a cash buy) */
  emiShare: number
  running: number
  /** EMI + running cost as a share of take-home pay */
  totalShare: number
}

const worst = (...v: Verdict[]): Verdict => (v.includes('no') ? 'no' : v.includes('stretch') ? 'stretch' : 'yes')

export function afford(p: { price: number; down: number; rate: number; years: number; income: number; running: number; cash: boolean }): Afford {
  const m = p.cash ? 0 : emi(Math.max(0, p.price - p.down), p.rate, p.years)
  const emiShare = m / p.income
  const totalShare = (m + p.running) / p.income
  let verdict: Verdict
  if (p.cash) {
    const months = p.price / p.income
    verdict = worst(months <= 6 ? 'yes' : months <= 12 ? 'stretch' : 'no', totalShare <= 0.1 ? 'yes' : totalShare <= 0.18 ? 'stretch' : 'no')
  } else {
    verdict = emiShare <= COMFORT ? 'yes' : emiShare <= STRETCH ? 'stretch' : 'no'
  }
  return { verdict, emi: m, emiShare, running: p.running, totalShare }
}

/** The loan a comfortable EMI (15% of pay) repays over the tenure. */
export function comfortableLoan(income: number, rate: number, years: number) {
  const r = rate / 1200
  const n = years * 12
  const pay = income * COMFORT
  return r ? (pay * (1 - (1 + r) ** -n)) / r : pay * n
}

/** The most a buyer should spend on-road: the comfortable loan plus the down payment, or six months' pay in cash. */
export function comfortableBudget(income: number, a: Pick<Answers, 'payment' | 'downPayment' | 'rate' | 'tenureYears'>) {
  const v = a.payment === 'cash' ? income * 6 : comfortableLoan(income, a.rate, a.tenureYears) + a.downPayment
  return Math.floor(v / 25000) * 25000
}

/** The verdict for a scored car: its own on-road price and EMI, plus fuel, service, tyres and insurance per month. */
export function affordFor(cost: Tco, a: Answers) {
  const running = (cost.energy + cost.maintenance + cost.tyres + cost.insurance) / (cost.years * 12)
  return afford({ price: cost.onRoad.total, down: a.downPayment, rate: a.rate, years: a.tenureYears, income: a.income, running, cash: a.payment === 'cash' })
}
