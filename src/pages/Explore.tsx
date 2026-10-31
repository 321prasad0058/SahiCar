import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { Icon } from '../components/Icon'
import { brands, cars, onroad } from '../data'
import { BODY_LABEL, FUEL_LABEL, type Body, type Fuel } from '../data/types'
import { sahiScore } from '../engine/sahiscore'
import { useStore } from '../state/store'

const BUDGETS = [
  { v: 0, label: 'Any price' },
  { v: 700000, label: 'Under ₹7 L' },
  { v: 1000000, label: 'Under ₹10 L' },
  { v: 1500000, label: 'Under ₹15 L' },
  { v: 2000000, label: 'Under ₹20 L' },
  { v: 3000000, label: 'Under ₹30 L' },
]
type Sort = 'fit' | 'price' | 'safety' | 'efficiency' | 'new'

export default function Explore() {
  const answers = useStore((s) => s.answers)
  const done = useStore((s) => s.done)
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  // the landing page links straight to a body style or fuel
  const [body, setBody] = useState<Body | ''>(() => {
    const b = params.get('body')
    return b && b in BODY_LABEL ? (b as Body) : ''
  })
  const [fuel, setFuel] = useState<Fuel | ''>(() => {
    const f = params.get('fuel')
    return f && f in FUEL_LABEL ? (f as Fuel) : ''
  })
  const [budget, setBudget] = useState(0)
  const [brand, setBrand] = useState('')
  const [seven, setSeven] = useState(false)
  const [five, setFive] = useState(false)
  const [sort, setSort] = useState<Sort>(done ? 'fit' : 'price')

  const scores = useMemo(() => {
    if (!done) return new Map<string, number>()
    return new Map(sahiScore(cars, answers, onroad).ranked.map((s) => [s.car.id, s.score]))
  }, [answers, done])

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    const out = cars.filter(
      (c) =>
        words.every((w) => `${c.brand} ${c.model} ${c.body}`.toLowerCase().includes(w)) &&
        (!body || c.body === body || (body === 'suv' && c.body === 'compact-suv')) &&
        (!fuel || c.powertrains.some((p) => p.fuel === fuel)) &&
        (!budget || c.price.min <= budget) &&
        (!brand || c.brand === brand) &&
        (!seven || Math.max(...c.seats) >= 7) &&
        (!five || (c.safety.adult ?? 0) >= 5),
    )
    const eff = (c: (typeof cars)[number]) => Math.max(...c.powertrains.map((p) => (p.fuel === 'ev' ? (p.efficiency ?? 0) / 15 : p.efficiency ?? 0)))
    const by: Record<Sort, (a: (typeof cars)[number], b: (typeof cars)[number]) => number> = {
      fit: (a, b) => (scores.get(b.id) ?? -1) - (scores.get(a.id) ?? -1),
      price: (a, b) => a.price.min - b.price.min,
      safety: (a, b) => (b.safety.adult ?? 0) + (b.safety.child ?? 0) / 10 - ((a.safety.adult ?? 0) + (a.safety.child ?? 0) / 10),
      efficiency: (a, b) => eff(b) - eff(a),
      new: (a, b) => (b.lastUpdate ?? b.launched ?? '').localeCompare(a.lastUpdate ?? a.launched ?? ''),
    }
    return out.sort(by[sort])
  }, [q, body, fuel, budget, brand, seven, five, sort, scores])

  return (
    <div className="page explore">
      <div className="wrap">
        <div className="eyebrow">Explore</div>
        <h1>Every new car in India, <span className="grad">one honest page</span>.</h1>
        <p className="muted">{cars.length} models from {brands.length} brands. Prices are ex-showroom; open a car for on-road, variants and 5-year cost.</p>

        <div className="filters card">
          <label className="search">
            <Icon name="search" />
            <input className="input" placeholder="Search Creta, Nexon, EV…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search cars" />
          </label>
          <div className="filter-row">
            <select className="select" value={body} onChange={(e) => setBody(e.target.value as Body | '')} aria-label="Body style">
              <option value="">All body styles</option>
              {(Object.keys(BODY_LABEL) as Body[]).map((b) => <option key={b} value={b}>{BODY_LABEL[b]}</option>)}
            </select>
            <select className="select" value={fuel} onChange={(e) => setFuel(e.target.value as Fuel | '')} aria-label="Fuel">
              <option value="">All fuels</option>
              {(Object.keys(FUEL_LABEL) as Fuel[]).map((f) => <option key={f} value={f}>{FUEL_LABEL[f]}</option>)}
            </select>
            <select className="select" value={budget} onChange={(e) => setBudget(Number(e.target.value))} aria-label="Budget">
              {BUDGETS.map((b) => <option key={b.v} value={b.v}>{b.label}</option>)}
            </select>
            <select className="select" value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Brand">
              <option value="">All brands</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
              {done && <option value="fit">Best fit for me</option>}
              <option value="price">Price: low to high</option>
              <option value="safety">Safest first</option>
              <option value="efficiency">Most efficient</option>
              <option value="new">Newest</option>
            </select>
          </div>
          <div className="filter-row">
            <button className={`pick ${seven ? 'on' : ''}`} onClick={() => setSeven(!seven)}>7 seats</button>
            <button className={`pick ${five ? 'on' : ''}`} onClick={() => setFive(!five)}>5★ crash rating</button>
            <span className="dim small push">{list.length} cars</span>
          </div>
        </div>

        <div className="card-grid">
          {list.map((c) => <CarCard key={c.id} car={c} score={scores.get(c.id)} />)}
        </div>
        {!list.length && <p className="muted empty">No cars match those filters.</p>}
      </div>
    </div>
  )
}
