import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarImage } from '../components/CarImage'
import { Icon } from '../components/Icon'
import { carById, cars, onroad } from '../data'
import { BODY_LABEL, FUEL_LABEL, type Car } from '../data/types'
import { tco } from '../engine/costs'
import { sahiScore } from '../engine/sahiscore'
import { lakh } from '../lib/format'
import { useStore } from '../state/store'

type Row = { k: string; v: (c: Car) => number | string | null; best?: 'max' | 'min'; fmt?: (v: number) => string }

export default function Compare() {
  const ids = useStore((s) => s.compare)
  const answers = useStore((s) => s.answers)
  const done = useStore((s) => s.done)
  const [add, setAdd] = useState('')
  const list = ids.map((id) => carById.get(id)).filter(Boolean) as Car[]

  const scores = useMemo(() => (done ? new Map(sahiScore(cars, answers, onroad).ranked.map((s) => [s.car.id, s])) : new Map()), [done, answers])
  const cheapest = (c: Car) => {
    const pt = c.powertrains.reduce((a, b) => ((a.priceFrom ?? Infinity) <= (b.priceFrom ?? Infinity) ? a : b))
    return { pt, cost: tco(c, pt, pt.priceFrom ?? c.price.min, answers, onroad) }
  }

  const rows: Row[] = [
    ...(done ? [{ k: 'SahiScore for you', v: (c: Car) => scores.get(c.id)?.score ?? null, best: 'max' as const, fmt: (v: number) => v.toFixed(0) }] : []),
    { k: 'Price from', v: (c) => c.price.min, best: 'min', fmt: lakh },
    { k: 'Price to', v: (c) => c.price.max, fmt: lakh },
    { k: `All-in ₹/km (base, ${answers.years} yrs)`, v: (c) => cheapest(c).cost.perKm, best: 'min', fmt: (v) => `₹${v.toFixed(1)}` },
    { k: 'Body', v: (c) => BODY_LABEL[c.body] },
    { k: 'Fuels', v: (c) => [...new Set(c.powertrains.map((p) => FUEL_LABEL[p.fuel]))].join(', ') },
    { k: 'Adult crash stars', v: (c) => c.safety.adult, best: 'max', fmt: (v) => `${v}★` },
    { k: 'Child crash stars', v: (c) => c.safety.child, best: 'max', fmt: (v) => `${v}★` },
    { k: 'Airbags (std)', v: (c) => c.safety.airbagsStd, best: 'max' },
    { k: 'ADAS', v: (c) => c.safety.adas },
    { k: 'Max power', v: (c) => Math.max(...c.powertrains.map((p) => p.powerPs ?? 0)) || null, best: 'max', fmt: (v) => `${v} PS` },
    { k: 'Ground clearance', v: (c) => c.dims.groundClearance, best: 'max', fmt: (v) => `${v} mm` },
    { k: 'Boot', v: (c) => c.dims.boot, best: 'max', fmt: (v) => `${v} L` },
    { k: 'Wheelbase', v: (c) => c.dims.wheelbase, best: 'max', fmt: (v) => `${v} mm` },
    { k: 'Length', v: (c) => c.dims.length, fmt: (v) => `${v} mm` },
    { k: 'Seats', v: (c) => c.seats.join('/') },
    { k: 'Resale strength', v: (c) => c.resale, best: 'max', fmt: (v) => '●'.repeat(v) },
    { k: 'Service network', v: (c) => c.network, best: 'max', fmt: (v) => '●'.repeat(v) },
    { k: 'Features', v: (c) => c.features.slice(0, 8).join(', ') || '—' },
  ]

  return (
    <div className="page compare">
      <div className="wrap">
        <div className="eyebrow">Compare</div>
        <h1>Side by side, <span className="grad">best in each row lit up</span>.</h1>
        <div className="compare-add">
          <select className="select" value={add} onChange={(e) => { setAdd(''); if (e.target.value) useStore.getState().toggleCompare(e.target.value) }} aria-label="Add a car">
            <option value="">{list.length >= 3 ? 'Add a car (replaces the oldest)' : 'Add a car to compare…'}</option>
            {cars.filter((c) => !ids.includes(c.id)).map((c) => <option key={c.id} value={c.id}>{c.brand} {c.model}</option>)}
          </select>
          {list.length > 0 && <button className="btn btn-ghost btn-sm" onClick={() => useStore.getState().clearCompare()}>Clear</button>}
        </div>

        {list.length ? (
          <div className="cmp card" style={{ ['--n' as string]: list.length }}>
            <div className="cmp-row cmp-head">
              <span />
              {list.map((c) => (
                <div key={c.id} className="cmp-car">
                  <button className="cmp-x icon-btn" aria-label="Remove" onClick={() => useStore.getState().toggleCompare(c.id)}><Icon name="close" size={14} /></button>
                  <CarImage official={c.official} small image={c.image} wiki={c.wiki} body={c.body} alt={c.model} />
                  <Link to={`/car/${c.id}`}><span className="dim small">{c.brand}</span><b>{c.model}</b></Link>
                </div>
              ))}
            </div>
            {rows.map((r) => {
              const vals = list.map((c) => r.v(c))
              const nums = vals.filter((v): v is number => typeof v === 'number')
              const best = r.best && nums.length > 1 ? (r.best === 'max' ? Math.max(...nums) : Math.min(...nums)) : null
              return (
                <div key={r.k} className="cmp-row">
                  <span className="dim small">{r.k}</span>
                  {vals.map((v, i) => (
                    <span key={i} className={v === best ? 'best' : ''}>
                      {v == null || v === '' ? '—' : typeof v === 'number' && r.fmt ? r.fmt(v) : String(v)}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card empty-res">
            <p className="muted">Add up to three cars from Explore or your results using the <Icon name="compare" size={14} /> button.</p>
            <Link to="/explore" className="btn btn-primary">Explore cars</Link>
          </div>
        )}
      </div>
    </div>
  )
}
