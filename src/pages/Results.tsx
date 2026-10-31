import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CarImage } from '../components/CarImage'
import { Fixes } from '../components/Fixes'
import { Icon } from '../components/Icon'
import { ScoreRing } from '../components/ScoreRing'
import { toast } from '../components/Toast'
import { cars, onroad, upcoming } from '../data'
import { BODY_LABEL, FUEL_LABEL } from '../data/types'
import { stateOf } from '../engine/costs'
import { DIM_LABEL, GEAR_LABEL, relaxations, sahiScore, withStretchHint, type Dim, type Scored } from '../engine/sahiscore'
import { expectedLabel, timingFor } from '../engine/timing'
import { inr, lakh } from '../lib/format'
import { reducedMotion } from '../lib/perf'
import { trackNoMatch } from '../lib/track'
import { gsap } from '../lib/scroll'
import { fb, useAuth } from '../state/auth'
import { useStore } from '../state/store'

const RANK = ['Best match', 'Runner-up', 'Worth a look']

function Pick({ s, i }: { s: Scored; i: number }) {
  const a = useStore((x) => x.answers)
  const saved = useStore((x) => x.garage.includes(s.car.id))
  const timing = useMemo(() => timingFor(s, upcoming, a), [s, a])
  return (
    <article className={`pick-card card ${i === 0 ? 'first' : ''}`}>
      <div className="pick-rank mono">{String(i + 1).padStart(2, '0')} · {RANK[i]}</div>
      <div className="pick-media">
        <CarImage official={s.car.official} image={s.car.image} wiki={s.car.wiki} body={s.car.body} alt={`${s.car.brand} ${s.car.model}`} eager />
        <div className="pick-ring"><ScoreRing score={s.score} size={i === 0 ? 104 : 88} delay={0.4 + i * 0.15} /></div>
      </div>
      <div className="pick-body">
        <div className="dim small">{s.car.brand}</div>
        <h2 className="pick-name">{s.car.model}</h2>
        <div className="pick-config">
          <span className="chip cyan">{s.variant ?? 'Suggested trim'}</span>
          <span className="chip">{FUEL_LABEL[s.pt.fuel]}</span>
          <span className="chip">{GEAR_LABEL[s.gear]}</span>
          {s.badges.map((b) => <span key={b} className="chip green">{b}</span>)}
        </div>

        <div className="pick-money">
          <div><span className="dim small">On-road</span><b>{lakh(s.cost.onRoad.total)}</b></div>
          {a.payment === 'loan' && <div><span className="dim small">EMI</span><b>{inr(s.cost.emi)}</b></div>}
          <div><span className="dim small">All-in cost</span><b>₹{s.cost.perKm.toFixed(1)}/km</b></div>
          <div><span className="dim small">{s.cost.years}-yr total</span><b>{lakh(s.cost.total)}</b></div>
        </div>

        <ul className="reasons">
          {s.reasons.map((r) => <li key={r}><Icon name="check" size={16} /> {r}</li>)}
        </ul>
        {s.caveats.length > 0 && (
          <ul className="caveats">
            {s.caveats.map((r) => <li key={r}><Icon name="alert" size={16} /> {r}</li>)}
          </ul>
        )}

        <div className={`timing ${timing.verdict}`}>
          <div className="timing-head">
            <Icon name="clock" size={16} />
            <b>{timing.headline}</b>
          </div>
          <p>{timing.detail}</p>
          {timing.launches.slice(0, 2).map((l) => (
            <div key={l.item.id} className="timing-launch small">
              <span>{l.item.brand} {l.item.model}</span>
              <span className="dim">{expectedLabel(l.item.expected)} · {l.item.status}</span>
            </div>
          ))}
        </div>

        <div className="pick-actions">
          <Link to={`/car/${s.car.id}`} className="btn btn-primary btn-sm">Full details <Icon name="arrow" size={16} /></Link>
          <button
            className={`icon-btn ${saved ? 'on' : ''}`}
            aria-label="Save"
            onClick={() => toast(useStore.getState().toggleGarage(s.car.id) ? `${s.car.model} saved` : `${s.car.model} removed`)}
          >
            <Icon name="heart" />
          </button>
          <button className="icon-btn" aria-label="Compare" onClick={() => useStore.getState().toggleCompare(s.car.id)}>
            <Icon name="compare" />
          </button>
        </div>
      </div>
    </article>
  )
}

function WhyBars({ picks, weights }: { picks: Scored[]; weights: Record<Dim, number> }) {
  const dims = (Object.keys(weights) as Dim[]).sort((x, y) => weights[y] - weights[x])
  return (
    <div className="why card">
      <div className="why-legend">
        {picks.map((p, i) => <span key={p.car.id} className={`lg lg-${i}`}>{p.car.model}</span>)}
      </div>
      {dims.map((d) => (
        <div key={d} className="why-row">
          <div className="why-label">
            <span>{DIM_LABEL[d]}</span>
            <span className="mono dim">{weights[d].toFixed(0)}%</span>
          </div>
          <div className="why-bars">
            {picks.map((p, i) => (
              <div key={p.car.id} className={`bar bar-${i}`} style={{ ['--w' as string]: `${p.dims[d]}%` }} title={`${p.car.model}: ${p.dims[d].toFixed(0)}`} />
            ))}
          </div>
        </div>
      ))}
      <p className="dim small">Bars show how well each car fits you on that dimension (0–100). The % is that dimension’s weight in your SahiScore — set by your priorities and your answers.</p>
    </div>
  )
}

export default function Results() {
  const answers = useStore((s) => s.answers)
  const done = useStore((s) => s.done)
  const user = useAuth((s) => s.user)
  const root = useRef<HTMLDivElement>(null)

  const res = useMemo(() => withStretchHint(cars, answers, onroad, sahiScore(cars, answers, onroad)), [answers])
  const st = stateOf(onroad, answers.state)
  const fixes = useMemo(() => (res.picks.length ? [] : relaxations(cars, answers, onroad)), [res, answers])

  useEffect(() => {
    if (done && !res.picks.length) trackNoMatch('results', 'results', answers, res)
  }, [done, res, answers])

  useEffect(() => {
    if (user && done) fb().then((m) => m.saveProfile(user, answers)).catch(() => {})
  }, [user, done, answers])

  useLayoutEffect(() => {
    if (reducedMotion || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('.res-head > *', { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' })
      gsap.from('.pick-card', { y: 80, autoAlpha: 0, rotateX: -12, transformPerspective: 1000, duration: 1.1, stagger: 0.15, ease: 'expo.out', delay: 0.25 })
      gsap.from('.res-section', { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.9 })
    }, root)
    return () => ctx.revert()
  }, [res])

  if (!done) return <Navigate to="/sahifit" replace />

  const rest = res.ranked.filter((s) => !res.picks.includes(s)).slice(0, 12)
  return (
    <div className="page results" ref={root}>
      <div className="wrap">
        <header className="res-head">
          <div className="eyebrow">Your SahiScore results</div>
          <h1>{res.picks.length ? <>Your right car is the <span className="grad">{res.picks[0].car.model}</span>.</> : 'Nothing fits — yet.'}</h1>
          <p className="muted">
            We scored {res.considered} models and {res.ranked.length} fit your must-haves and budget of {lakh(answers.budget)} on-road in {st.name}.
            {res.picks.length ? ' Here are the three that fit your life best.' : ''}
          </p>
          <div className="profile-chips">
            <span className="chip">{answers.dailyKm} km/day</span>
            <span className="chip">{answers.people} {answers.people === 1 ? 'person' : 'people'}{answers.kids ? ' + kids' : ''}</span>
            <span className="chip">{answers.roads} roads</span>
            <span className="chip">{answers.charging === 'home' ? 'home charging' : 'no home charging'}</span>
            <span className="chip">{answers.years}-yr ownership</span>
            <Link to="/sahifit" className="chip cyan"><Icon name="edit" size={12} /> Edit answers</Link>
          </div>
        </header>

        {res.picks.length ? (
          <div className="podium">
            {res.picks.map((s, i) => <Pick key={s.car.id} s={s} i={i} />)}
          </div>
        ) : (
          <div className="card empty-res">
            <p>
              Your choices rule out every car
              {res.eliminated[0] ? <> — mostly <b>{res.eliminated[0].reason.toLowerCase()}</b> ({res.eliminated[0].count} cars)</> : null}. Change one of
              these and your matches appear here straight away:
            </p>
            <Fixes fixes={fixes} />
            <Link to="/sahifit" className="btn btn-ghost">Edit all my answers</Link>
          </div>
        )}

        {res.stretchHint && (
          <div className="res-section stretch card">
            <Icon name="spark" size={22} />
            <div>
              <b>Stretch {lakh(res.stretchHint.extra)} and the {res.stretchHint.car.car.brand} {res.stretchHint.car.car.model} takes the top spot</b>
              <p className="muted small">It would score {res.stretchHint.car.score.toFixed(0)} vs {res.picks[0].score.toFixed(0)} — {res.stretchHint.car.reasons[0]?.toLowerCase()}.</p>
            </div>
            <Link to={`/car/${res.stretchHint.car.car.id}`} className="btn btn-ghost btn-sm">See it</Link>
          </div>
        )}

        {res.picks.length > 0 && (
          <section className="res-section">
            <h2 className="h-sec">Why {res.picks[0].car.model} wins</h2>
            <WhyBars picks={res.picks} weights={res.weights} />
          </section>
        )}

        {rest.length > 0 && (
          <section className="res-section">
            <h2 className="h-sec">Also worth a look</h2>
            <div className="rank-list">
              {rest.map((s, i) => (
                <Link key={s.car.id} to={`/car/${s.car.id}`} className="rank-row card">
                  <span className="mono dim">{String(i + 4).padStart(2, '0')}</span>
                  <span className="rank-name">
                    <b>{s.car.brand} {s.car.model}</b>
                    <span className="dim small">{s.variant ?? 'Suggested trim'} · {FUEL_LABEL[s.pt.fuel]} · {GEAR_LABEL[s.gear]} · {BODY_LABEL[s.car.body]}</span>
                  </span>
                  <span className="rank-money small"><b>{lakh(s.cost.onRoad.total)}</b><span className="dim">₹{s.cost.perKm.toFixed(1)}/km</span></span>
                  <span className="rank-score">{s.score.toFixed(0)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {res.eliminated.length > 0 && (
          <section className="res-section">
            <h2 className="h-sec">What we ruled out</h2>
            <div className="elim-grid">
              {res.eliminated.map((e) => (
                <div key={e.reason} className="card elim">
                  <b className="mono">{e.count}</b>
                  <span>{e.reason}</span>
                  <span className="dim small">e.g. {e.examples.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="dim small fine">
          Costs use {st.name} road tax and fuel prices (petrol ₹{st.fuel.petrol}/L, diesel ₹{st.fuel.diesel}/L, CNG ₹{st.fuel.cng}/kg,
          power ₹{st.fuel.electricity}/kWh), real-world mileage rather than ARAI claims, and estimated resale after {answers.years} years.
          Prices are ex-showroom Delhi; confirm with the dealer. <Link to="/about" className="link-arrow">How SahiScore works</Link>
        </p>
      </div>
    </div>
  )
}
