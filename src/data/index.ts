// The app's data, built from research/ by scripts/build-data.mjs.
import carsJson from './cars.json'
import onroadJson from './onroad.json'
import timingJson from './timing.json'
import upcomingJson from './upcoming.json'
import type { Car, OnRoadData, TimingEvent, Upcoming } from './types'

export const cars = carsJson as unknown as Car[]
export const upcoming = upcomingJson as unknown as (Upcoming & { image?: { src: string; page: string } | null })[]
export const timingEvents = timingJson as unknown as TimingEvent[]
export const onroad = onroadJson as unknown as OnRoadData

export const carById = new Map(cars.map((c) => [c.id, c]))
export const brands = [...new Set(cars.map((c) => c.brand))].sort()
export const states = onroad.states.map((s) => ({ code: s.code, name: s.name }))
