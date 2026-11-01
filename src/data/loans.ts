import more from './lenders-more.json'
// New-car loan pricing by lender, from each lender's published rates (sources below), checked 1 November 2026.
// Indicative: the final rate depends on the lender's own credit checks. `verified: false` rows come from
// aggregator data because the lender's own page couldn't be read; they're labelled as such in the app.
// RBI raised the repo rate by 0.25 points on 7 Oct 2026 (to 5.50%); floating repo-linked rates published
// before then are adjusted and say so in `note`.
export type ScoreBand = 'excellent' | 'good' | 'fair' | 'unknown'
export const SCORE_LABEL: Record<ScoreBand, string> = { excellent: '750+', good: '700–749', fair: '650–699', unknown: 'Not sure' }

type Bands = Partial<Record<ScoreBand, number>>

export type Trust = {
  /** on RBI's list of domestic systemically important banks */
  dsib?: boolean
  /** long-term credit rating, e.g. 'CRISIL AAA' */
  rating?: string
  /** balance-sheet size band */
  size?: 'large' | 'mid' | 'small'
  /** RBI Ombudsman complaints, relative to peers */
  complaints?: 'low' | 'average' | 'high'
  sources?: string[]
}

export type Lender = {
  id: string
  name: string
  type: 'Public bank' | 'Private bank' | 'Small finance bank' | 'NBFC'
  trust?: Trust
  kind: 'floating' | 'fixed'
  rateFrom: number
  /** top of the published range; when missing, the app estimates higher score bands from rateFrom */
  rateTo?: number
  /** published rate by credit score; `upTo` tiers when pricing changes with the loan amount */
  bands?: Bands
  tiers?: { upTo: number | null; bands: Bands }[]
  /** below this credit score the lender doesn't lend */
  minScore?: number
  /** a higher starting rate for short loans */
  short?: { under: number; rateFrom: number }
  /** percentage points off for electric cars */
  evDiscount?: number
  maxTenure: number
  /** processing fee before GST; `unknown` when the lender doesn't publish it */
  fee: { pct?: number; flat?: number; min?: number; max?: number; upTo?: boolean; unknown?: boolean; slabs?: { upTo: number | null; flat: number }[] }
  prepay: string
  note?: string
  source: string
  verified: boolean
}

export const RATES_AS_OF = '1 November 2026'
export const REPO = { rate: 5.5, since: '7 October 2026' }

const BASE: Lender[] = [
  {
    id: 'pnb', name: 'Punjab National Bank', type: 'Public bank', kind: 'floating',
    rateFrom: 7.85, rateTo: 10.95, bands: { excellent: 7.9, good: 8.95, fair: 9.95 }, evDiscount: 0.05, maxTenure: 7,
    fee: { unknown: true }, prepay: 'No charge on floating-rate loans',
    source: 'https://www.pnb.bank.in/carloaninnerpage.html', verified: true,
  },
  {
    id: 'canara', name: 'Canara Bank', type: 'Public bank', kind: 'floating',
    rateFrom: 7.8, rateTo: 10.95,
    // Canara prices by its own internal grade, mapped here to score bands as an estimate
    tiers: [
      { upTo: 1500000, bands: { excellent: 8.2, good: 8.3, unknown: 8.55, fair: 8.95 } },
      { upTo: null, bands: { excellent: 7.8, good: 7.9, unknown: 8.15, fair: 8.55 } },
    ],
    evDiscount: 0.1, maxTenure: 7, fee: { unknown: true }, prepay: 'No charge on floating-rate loans',
    note: 'Lower rates above ₹15 lakh; grades mapped to scores',
    source: 'https://www.canarabank.bank.in/pages/rates-of-interest-for-retail-lending-schemes-linked-to-rllr', verified: true,
  },
  {
    id: 'bob', name: 'Bank of Baroda', type: 'Public bank', kind: 'floating',
    rateFrom: 7.85, rateTo: 11.55, minScore: 701, maxTenure: 7,
    fee: { slabs: [{ upTo: 1000000, flat: 1500 }, { upTo: null, flat: 2000 }] }, prepay: 'No charge on floating-rate loans',
    note: 'Fee waived if you apply to the bank directly',
    source: 'https://bankofbaroda.bank.in/interest-rate-and-service-charges/retail-loans-interest-rates', verified: true,
  },
  {
    id: 'indian', name: 'Indian Bank', type: 'Public bank', kind: 'floating',
    rateFrom: 7.75, rateTo: 9.1, maxTenure: 7, fee: { unknown: true }, prepay: 'No charge for individuals',
    source: 'https://indianbank.bank.in/en/interest-rates-on-personal-segment-loan-products', verified: true,
  },
  {
    id: 'sbi', name: 'State Bank of India', type: 'Public bank', kind: 'floating',
    rateFrom: 8.85, rateTo: 10.0, bands: { excellent: 8.85, good: 9.4, fair: 9.9 }, evDiscount: 0.1, maxTenure: 7,
    fee: { unknown: true }, prepay: 'No charge on floating-rate loans',
    note: 'Includes SBI’s 0.15-point rise of 15 Oct 2026',
    source: 'https://www.bankbazaar.com/sbi-car-loan-interest-rates.html', verified: false,
  },
  {
    id: 'union', name: 'Union Bank of India', type: 'Public bank', kind: 'floating',
    rateFrom: 7.85, evDiscount: 0.1, maxTenure: 7, fee: { flat: 1000 }, prepay: 'No charge',
    note: 'Includes the Oct 2026 repo rise of 0.25 points',
    source: 'https://www.bankbazaar.com/union-bank-car-loan-interest-rates.html', verified: false,
  },
  {
    id: 'icici', name: 'ICICI Bank', type: 'Private bank', kind: 'fixed',
    rateFrom: 8.4, short: { under: 3, rateFrom: 10.25 }, maxTenure: 7, fee: { flat: 8500, upTo: true }, prepay: '3% in year 1, 2% in year 2, then nil',
    source: 'https://www.icici.bank.in/personal-banking/loans/car-loan/interest-rate', verified: true,
  },
  {
    id: 'hdfc', name: 'HDFC Bank', type: 'Private bank', kind: 'fixed',
    rateFrom: 8.15, rateTo: 9.4, maxTenure: 7, fee: { unknown: true }, prepay: 'Charged on fixed-rate loans; ask the bank',
    note: 'Published figures conflict (8.15–9.40%)',
    source: 'https://www.bankbazaar.com/hdfc-car-loan-interest-rates.html', verified: false,
  },
  {
    id: 'axis', name: 'Axis Bank', type: 'Private bank', kind: 'fixed',
    rateFrom: 8.8, rateTo: 11.7, maxTenure: 7, fee: { pct: 2, upTo: true }, prepay: '5% of the amount prepaid',
    source: 'https://www.axis.bank.in/loans/car-loan/interest-rates-charges', verified: true,
  },
  {
    id: 'idfc', name: 'IDFC FIRST Bank', type: 'Private bank', kind: 'floating',
    rateFrom: 9.6, rateTo: 10.5, maxTenure: 7, fee: { flat: 10000, upTo: true }, prepay: 'No charge on floating-rate loans',
    source: 'https://www.bankbazaar.com/car-loan/idfc-first-bank-car-loan-interest-rate.html', verified: false,
  },
  {
    id: 'indusind', name: 'IndusInd Bank', type: 'Private bank', kind: 'fixed',
    rateFrom: 8.0, rateTo: 14.0, maxTenure: 5, fee: { unknown: true }, prepay: 'Charged on fixed-rate loans; ask the bank',
    source: 'https://bankdb.bankbazaar.com/indusind-car-loan-interest-rates.html', verified: false,
  },
  {
    id: 'mahindra-finance', name: 'Mahindra Finance', type: 'NBFC', kind: 'fixed',
    rateFrom: 8.75, maxTenure: 5, fee: { unknown: true }, prepay: 'Charged on fixed-rate loans; ask the lender',
    source: 'https://www.bankbazaar.com/car-loan/mahindra-finance.html', verified: false,
  },
  {
    id: 'tata-capital', name: 'Tata Capital', type: 'NBFC', kind: 'fixed',
    rateFrom: 9.49, maxTenure: 6, fee: { pct: 2.95, upTo: true }, prepay: '6% in year 1, then 5%',
    source: 'https://tatacapital.com/vehicle-loan/car-loan/interest-rates.html', verified: true,
  },
]

// 22 more lenders and every lender's trust facts (RBI D-SIB list of 2 Dec 2025, long-term credit ratings,
// balance-sheet size at 31 Mar 2026), researched 1 Nov 2026 with sources in each entry
export const LENDERS: Lender[] = [...BASE, ...(more.add as Lender[])].map((l) => ({ ...l, trust: (more.trust as Record<string, Trust>)[l.id] ?? l.trust }))
