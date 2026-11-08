import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { Icon } from '../components/Icon'
import { brands, cars, onroad } from '../data'
import { BODY_LABEL, FUEL_LABEL, type Body, type Fuel } from '../data/types'
import { sahiScore } from '../engine/sahiscore'
import { lakh } from '../lib/format'
import { carMatch, norm, suggest, type Suggestion } from '../lib/carSearch'
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
  // the list of names under the box: open while typing, closed once one is picked
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(-1)
  const input = useRef<HTMLInputElement>(null)
  const hints = useMemo(() => suggest(cars, q), [q])
  const pick = (s: Suggestion) => {
    setQ(s.kind === 'car' ? `${s.car.brand} ${s.car.model}` : s.kind === 'brand' ? s.brand : q)
    if (s.kind === 'brand') setBrand('')
    setOpen(false)
    setHi(-1)
    input.current?.blur()
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (!open || !hints.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => (h + 1) % hints.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => (h <= 0 ? hints.length - 1 : h - 1)) }
    else if (e.key === 'Enter' && hi >= 0) { e.preventDefault(); pick(hints[hi]) }
    else if (e.key === 'Escape') setOpen(false)
  }
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
    const out = cars.filter(
      (c) =>
        carMatch(c, q) > 0 &&
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
          <div className="search">
            <Icon name="search" />
            <input
              ref={input}
              className="input"
              placeholder="Search Creta, Nexon, EV…"
              value={q}
              onChange={(e) => { setQ(e.target.value); setOpen(true); setHi(-1) }}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onKeyDown={onKey}
              aria-label="Search cars"
              role="combobox"
              aria-expanded={open && hints.length > 0}
              aria-controls="search-hints"
              aria-autocomplete="list"
              autoComplete="off"
            />
            {q && <button className="search-clear" aria-label="Clear search" onMouseDown={(e) => e.preventDefault()} onClick={() => { setQ(''); input.current?.focus() }}><Icon name="close" size={16} /></button>}
            {open && hints.length > 0 && (
              <ul className="search-hints" id="search-hints" role="listbox">
                {hints.map((s, i) => (
                  <li
                    key={s.kind === 'car' ? s.car.id : `b-${s.brand}`}
                    role="option"
                    aria-selected={i === hi}
                    className={i === hi ? 'on' : ''}
                    // mousedown, not click: the input's blur would close the list before a click lands
                    onMouseDown={(e) => { e.preventDefault(); pick(s) }}
                    onMouseEnter={() => setHi(i)}
                  >
                    <Icon name="search" size={15} />
                    {s.kind === 'car' ? (
                      <>
                        <span className="hint-name"><span className="dim">{s.car.brand}</span> <Mark text={s.car.model} q={q} /></span>
                        <span className="hint-meta">{BODY_LABEL[s.car.body]} · from {lakh(s.car.price.min)}</span>
                      </>
                    ) : (
                      <>
                        <span className="hint-name"><Mark text={s.brand} q={q} /> <span className="dim">· all cars</span></span>
                        <span className="hint-meta">{s.count} models</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
            <span className="dim small push">{list.length} {list.length === 1 ? 'car' : 'cars'}</span>
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

/** The typed letters in bold where they appear in a name ("Vict" in "Victoris"). */
function Mark({ text, q }: { text: string; q: string }) {
  // the longest typed word that appears in the name; if none does (a typo), the whole name stands out
  const lower = text.toLowerCase()
  const w = norm(q).split(' ').filter((x) => x && lower.includes(x)).sort((a, b) => b.length - a.length)[0]
  const at = w ? lower.indexOf(w) : -1
  if (at < 0) return <b>{text}</b>
  return (
    <>
      {text.slice(0, at)}
      <b>{text.slice(at, at + w.length)}</b>
      {text.slice(at + w.length)}
    </>
  )
}
