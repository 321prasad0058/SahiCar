import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarImage } from '../components/CarImage'
import { carById, timingEvents, upcoming } from '../data'
import { BODY_LABEL, FUEL_LABEL } from '../data/types'
import { expectedLabel, monthsUntil } from '../engine/timing'
import { lakh } from '../lib/format'

const STATUS: Record<string, { label: string; cls: string }> = {
  'launched-recently': { label: 'Just launched', cls: 'cyan' },
  confirmed: { label: 'Confirmed', cls: 'green' },
  testing: { label: 'Spied testing', cls: 'amber' },
  rumoured: { label: 'Rumoured', cls: '' },
}

export default function Upcoming() {
  const [filter, setFilter] = useState<string>('all')
  const groups = useMemo(() => {
    const list = upcoming
      .filter((u) => filter === 'all' || u.status === filter || (filter === 'ev' && u.fuels.includes('ev')))
      .map((u) => ({ u, m: monthsUntil(u.expected) ?? 99 }))
      .sort((a, b) => a.m - b.m)
    const out = new Map<string, typeof list>()
    for (const x of list) {
      const key = x.u.status === 'launched-recently' ? 'Launched in the last few months' : x.m <= 3 ? 'Next 3 months' : x.m <= 6 ? 'In 3–6 months' : x.m <= 12 ? 'In 6–12 months' : 'Later'
      out.set(key, [...(out.get(key) ?? []), x])
    }
    return [...out.entries()]
  }, [filter])

  return (
    <div className="page upcoming">
      <div className="wrap">
        <div className="eyebrow">Buy now or wait?</div>
        <h1>Every car <span className="grad">coming to India</span>.</h1>
        <p className="muted">{upcoming.length} launches, new generations and facelifts we’re tracking — each matched against today’s cars, so your SahiScore results can warn you when a better one is weeks away.</p>
        <div className="tabs">
          {[['all', 'All'], ['confirmed', 'Confirmed'], ['testing', 'Testing'], ['ev', 'Electric'], ['launched-recently', 'Just launched']].map(([k, l]) => (
            <button key={k} className={`chip ${filter === k ? 'cyan' : ''}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>

        {groups.map(([title, items]) => (
          <section key={title} className="up-group">
            <h2 className="h-sec">{title}</h2>
            <div className="up-list">
              {items.map(({ u }) => (
                <article key={u.id} className="up card">
                  <CarImage image={u.image} wiki={u.wiki} body={u.body} alt={`${u.brand} ${u.model}`} />
                  <div className="up-body">
                    <div className="up-meta mono small">
                      <span>{expectedLabel(u.expected)}</span>
                      <span className={`chip ${STATUS[u.status]?.cls}`}>{STATUS[u.status]?.label ?? u.status}</span>
                    </div>
                    <div className="dim small">{u.brand}</div>
                    <h3>{u.model}</h3>
                    <div className="chips">
                      <span className="chip">{BODY_LABEL[u.body]}</span>
                      {u.fuels.map((f) => <span key={f} className="chip">{FUEL_LABEL[f]}</span>)}
                      {u.price && <span className="chip">{u.price.max > u.price.min ? `${lakh(u.price.min)} – ${lakh(u.price.max)}` : `from ${lakh(u.price.min)}`}</span>}
                    </div>
                    <p className="small">{u.waitAdvice}</p>
                    <p className="small dim">{u.notes}</p>
                    {u.rivals.some((r) => carById.has(r)) && (
                      <div className="small rivals">
                        Rivals:{' '}
                        {u.rivals.filter((r) => carById.has(r)).slice(0, 5).map((r) => (
                          <Link key={r} to={`/car/${r}`} className="chip">{carById.get(r)!.model}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {timingEvents.length > 0 && (
          <section className="up-group">
            <h2 className="h-sec">Dates that move prices</h2>
            <div className="events">
              {timingEvents.map((e) => (
                <div key={e.title} className="event card">
                  <div className="mono small cyan-t">{e.when}</div>
                  <b>{e.title}</b>
                  <p className="small muted">{e.impact}</p>
                  <p className="small">{e.advice}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
