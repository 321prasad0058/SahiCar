// Buy now or wait? Looks for an update to the recommended car itself, or a strong new rival, launching soon.
import type { Answers } from './answers.ts'
import type { Scored } from './sahiscore.ts'
import type { Upcoming } from '../data/types.ts'

export interface Timing {
  verdict: 'buy' | 'consider' | 'wait'
  headline: string
  detail: string
  launches: { item: Upcoming; months: number; relation: 'same-model' | 'rival' | 'fits-you' }[]
}

/** Months from today (Oct 2026) to an expected date written as YYYY-MM, YYYY-Qn or YYYY-Hn. */
export function monthsUntil(expected: string, now = new Date()) {
  const m = expected.match(/^(\d{4})(?:-(\d{2})|-Q([1-4])|-H([12]))?/)
  if (!m) return null
  const year = Number(m[1])
  const month = m[2] ? Number(m[2]) : m[3] ? Number(m[3]) * 3 - 1 : m[4] ? (m[4] === '1' ? 4 : 10) : 7
  return (year - now.getFullYear()) * 12 + (month - (now.getMonth() + 1))
}

export function expectedLabel(expected: string) {
  const m = expected.match(/^(\d{4})(?:-(\d{2})|-Q([1-4])|-H([12]))?/)
  if (!m) return expected
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (m[2]) return `${months[Number(m[2]) - 1]} ${m[1]}`
  if (m[3]) return `Q${m[3]} ${m[1]}`
  if (m[4]) return `${m[4] === '1' ? 'First' : 'Second'} half ${m[1]}`
  return m[1]
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
// an upcoming car replaces the pick only if it's the same name and still offers the pick's fuel
// (a "Safari EV" is a new option next to the diesel Safari, not its replacement)
const sameModel = (u: Upcoming, s: Scored) =>
  slug(u.brand) === slug(s.car.brand) &&
  (slug(u.model).startsWith(slug(s.car.model)) || slug(s.car.model).startsWith(slug(u.model))) &&
  (!u.fuels.length || u.fuels.includes(s.pt.fuel) || (s.pt.fuel === 'mild-hybrid' && u.fuels.includes('petrol')))
const sameName = (u: Upcoming, s: Scored) => slug(u.brand) === slug(s.car.brand) && slug(u.model).startsWith(slug(s.car.model))
const rivals = (u: Upcoming, s: Scored) => u.rivals.some((r) => r === s.car.id || r.endsWith(`-${slug(s.car.model)}`))

export function timingFor(pick: Scored, upcoming: Upcoming[], a: Answers): Timing {
  const launches: Timing['launches'] = []
  for (const u of upcoming) {
    if (u.status === 'launched-recently') continue
    const months = monthsUntil(u.expected)
    if (months == null || months < 0 || months > 12) continue
    if (sameModel(u, pick)) launches.push({ item: u, months, relation: 'same-model' })
    else if ((rivals(u, pick) || sameName(u, pick)) && months <= 9) launches.push({ item: u, months, relation: 'rival' })
    else if (
      months <= 6 && u.body === pick.car.body && u.price && u.price.min <= a.budget &&
      (u.fuels.includes(pick.pt.fuel) || (u.fuels.includes('ev') && a.charging === 'home'))
    ) launches.push({ item: u, months, relation: 'fits-you' })
  }
  launches.sort((x, y) => (x.relation === 'same-model' ? -1 : 0) - (y.relation === 'same-model' ? -1 : 0) || x.months - y.months)

  const own = launches.find((l) => l.relation === 'same-model')
  const name = `${pick.car.brand} ${pick.car.model}`
  if (own && own.months <= 6 && own.item.status !== 'rumoured') {
    return {
      verdict: 'wait',
      headline: `Wait — a new ${own.item.model} is ~${Math.max(1, own.months)} month${own.months > 1 ? 's' : ''} away`,
      detail: own.item.waitAdvice || `An updated ${name} is expected ${expectedLabel(own.item.expected)}. If you must buy now, the outgoing model should come with a solid discount — negotiate hard.`,
      launches,
    }
  }
  const strong = launches.find((l) => l.relation !== 'same-model' && l.months <= 6 && l.item.status === 'confirmed')
  if (own || strong) {
    const l = own ?? strong!
    return {
      verdict: 'consider',
      headline: own ? `An update to the ${pick.car.model} is on the horizon` : `${l.item.brand} ${l.item.model} lands in ~${Math.max(1, l.months)} months`,
      detail: l.item.waitAdvice || `Worth a look before you sign: expected ${expectedLabel(l.item.expected)}.`,
      launches,
    }
  }
  return {
    verdict: 'buy',
    headline: 'Good time to buy',
    detail: launches.length
      ? `Nothing that replaces the ${pick.car.model} is close. ${launches.length} newcomer${launches.length > 1 ? 's' : ''} in this space later — none should change this pick.`
      : `No replacement or direct rival is due in the next year. Year-end (Dec) and March are the best months to negotiate.`,
    launches,
  }
}
