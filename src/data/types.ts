// The shape of SahiCar's car data. research/SCHEMA.md documents the same fields for the people who collect it.

export type Body = 'hatchback' | 'sedan' | 'compact-suv' | 'suv' | 'mpv' | 'pickup' | 'coupe'
export type Fuel = 'petrol' | 'diesel' | 'cng' | 'mild-hybrid' | 'strong-hybrid' | 'ev'

export interface Powertrain {
  fuel: Fuel
  engine: string | null
  cc: number | null
  powerPs: number | null
  torqueNm: number | null
  transmissions: string[]
  /** kmpl for petrol/diesel/hybrids, km/kg for CNG, claimed km of range for EVs */
  efficiency: number | null
  batteryKwh: number | null
  priceFrom: number | null
}

export interface Variant {
  name: string
  fuel: Fuel
  transmission: string
  price: number
}

export interface Car {
  id: string
  brand: string
  model: string
  body: Body
  segment: string
  launched: string | null
  lastUpdate: string | null
  price: { min: number; max: number }
  seats: number[]
  dims: {
    length: number | null
    width: number | null
    height: number | null
    wheelbase: number | null
    groundClearance: number | null
    boot: number | null
    kerbWeight: number | null
    fuelTank: number | null
    turningRadius: number | null
  }
  safety: {
    agency: string
    adult: number | null
    child: number | null
    year: number | null
    airbagsStd: number | null
    airbagsMax: number | null
    esc: boolean | null
    adas: 'none' | 'L1' | 'L2'
  }
  powertrains: Powertrain[]
  variants: Variant[]
  features: string[]
  highlights: string[]
  weaknesses: string[]
  serviceCost: number
  resale: number
  network: number
  wiki: string | null
  oemUrl: string | null
  image?: { src: string; page: string } | null
  /** the manufacturer's own image, self-hosted; preferred over the Wikimedia photo */
  official?: Official | null
  sources: string[]
  verifiedOn: string
}

export interface Official {
  src: string
  sm: string
  transparent: boolean
  page: string
  brand: string
}

export interface Upcoming {
  id: string
  brand: string
  model: string
  body: Body
  expected: string
  price: { min: number; max: number } | null
  fuels: Fuel[]
  status: 'launched-recently' | 'confirmed' | 'testing' | 'rumoured'
  rivals: string[]
  waitAdvice: string
  notes: string
  wiki: string | null
  sources: string[]
}

export interface TimingEvent {
  title: string
  when: string
  impact: string
  advice: string
  sources: string[]
}

export interface StateTax {
  code: string
  name: string
  roadTax: { fuel: string; upTo: number | null; ccUpTo?: number | null; pct: number }[]
  /** most road tax a state charges on one car, in ₹ */
  taxCap?: number
  city?: string
  confidence?: string
  notes?: string
  evNote?: string
  registrationFee?: number
  fuel: { petrol: number; diesel: number; cng: number; electricity: number }
}

export interface OnRoadData {
  states: StateTax[]
  tcsPctAbove10L: number
  fastag: number
  insurancePct: Record<string, number | string | object>
  sources: string[]
}

export const BODY_LABEL: Record<Body, string> = {
  hatchback: 'Hatchback',
  sedan: 'Sedan',
  'compact-suv': 'Compact SUV',
  suv: 'SUV',
  mpv: 'MPV / 7-seater',
  pickup: 'Pickup',
  coupe: 'Coupe',
}

export const FUEL_LABEL: Record<Fuel, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  cng: 'CNG',
  'mild-hybrid': 'Mild hybrid',
  'strong-hybrid': 'Strong hybrid',
  ev: 'Electric',
}
