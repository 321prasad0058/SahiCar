// What the SahiFit wizard asks. Every field has a sensible default so a half-finished wizard still scores.
import type { Body, Fuel } from '../data/types.ts'

export type Priority = 'safety' | 'cost' | 'space' | 'features' | 'performance' | 'reliability'
export type Level = 1 | 2 | 3 | 4 | 5

export interface Answers {
  /** maximum on-road price in ₹ */
  budget: number
  /** how far over budget is acceptable, 0..0.2 */
  stretch: number
  payment: 'cash' | 'loan'
  downPayment: number
  tenureYears: number
  /** loan interest, % a year */
  rate: number
  /** monthly take-home pay, 0 when not given. Optional, kept in this browser only (never uploaded or tracked) */
  income: number
  state: string
  place: 'metro' | 'city' | 'town' | 'rural'
  dailyKm: number
  /** share of driving on highways, 0..1 */
  highwayShare: number
  longTrips: 'rarely' | 'monthly' | 'weekly'
  /** how many years they plan to keep the car */
  years: number
  roads: 'smooth' | 'mixed' | 'rough' | 'unpaved'
  flooding: boolean
  hills: boolean
  /** people in the car on a normal day */
  people: number
  sevenOccasional: boolean
  elders: boolean
  kids: boolean
  luggage: 'light' | 'medium' | 'heavy'
  parking: 'easy' | 'tight'
  traffic: 'light' | 'heavy'
  firstCar: boolean
  charging: 'home' | 'work' | 'none'
  cngNearby: 'yes' | 'no' | 'unsure'
  gearbox: 'any' | 'auto' | 'manual'
  /** empty means any body style */
  bodies: Body[]
  /** fuels the buyer refuses outright */
  avoidFuels: Fuel[]
  mustHave: string[]
  avoidBrands: string[]
  priorities: Record<Priority, Level>
}

export const DEFAULT_ANSWERS: Answers = {
  budget: 1200000,
  stretch: 0.05,
  payment: 'loan',
  downPayment: 300000,
  tenureYears: 5,
  rate: 9.25,
  income: 0,
  state: 'MH',
  place: 'metro',
  dailyKm: 35,
  highwayShare: 0.25,
  longTrips: 'monthly',
  years: 6,
  roads: 'mixed',
  flooding: false,
  hills: false,
  people: 4,
  sevenOccasional: false,
  elders: false,
  kids: false,
  luggage: 'medium',
  parking: 'easy',
  traffic: 'heavy',
  firstCar: false,
  charging: 'none',
  cngNearby: 'unsure',
  gearbox: 'any',
  bodies: [],
  avoidFuels: [],
  mustHave: [],
  avoidBrands: [],
  priorities: { safety: 4, cost: 3, space: 3, features: 3, performance: 2, reliability: 3 },
}

export const PRIORITY_LABEL: Record<Priority, { label: string; hint: string }> = {
  safety: { label: 'Safety', hint: 'Crash ratings, airbags, ESC, ADAS' },
  cost: { label: 'Running cost', hint: 'Fuel, service, insurance, resale — the 5-year bill' },
  space: { label: 'Space & comfort', hint: 'Rear seat, boot, ease of getting in' },
  features: { label: 'Features & tech', hint: 'Sunroof, screens, cameras, connected tech' },
  performance: { label: 'Driving fun', hint: 'Power, highway overtakes, ghats' },
  reliability: { label: 'Peace of mind', hint: 'Service network, resale, proven platform' },
}

/** Features a buyer can insist on. Matched loosely against each car's feature list.
 *  `soft`: our data records this feature on too few cars to rule the others out, so a car without it
 *  is marked down instead of dropped. */
export const MUST_HAVES: { id: string; label: string; tier: number; soft?: boolean }[] = [
  { id: '6-airbags', label: '6 airbags', tier: 0 },
  { id: 'sunroof', label: 'Sunroof', tier: 0.7 },
  { id: 'adas', label: 'ADAS', tier: 0.85 },
  { id: '360-camera', label: '360° camera', tier: 0.75 },
  { id: 'ventilated-seats', label: 'Ventilated seats', tier: 0.8 },
  { id: 'wireless-carplay', label: 'Wireless CarPlay / AA', tier: 0.45 },
  { id: 'cruise', label: 'Cruise control', tier: 0.5 },
  { id: 'auto-climate', label: 'Auto climate', tier: 0.45, soft: true },
  { id: 'hud', label: 'Head-up display', tier: 0.85 },
  { id: 'connected-car', label: 'Connected car', tier: 0.5, soft: true },
]
