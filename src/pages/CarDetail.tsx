import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarCard, SafetyStars } from '../components/CarCard'
import { CarImage } from '../components/CarImage'
import { Icon } from '../components/Icon'
import { ScoreRing } from '../components/ScoreRing'
import { toast } from '../components/Toast'
import { carById, cars, onroad, states, upcoming } from '../data'
import { BODY_LABEL, FUEL_LABEL, type Car, type Fuel, type Variant } from '../data/types'
import { onRoad, tco } from '../engine/costs'
import { GEAR_LABEL, gearKind, sahiScore } from '../engine/sahiscore'
import { expectedLabel } from '../engine/timing'
import { inr, lakh, priceRange } from '../lib/format'
import { toggleCompareGated, toggleSave } from '../lib/gate'
import { track } from '../lib/track'
import { useStore } from '../state/store'
import type { Studio } from '../webgl/Studio'

const SHOWCASE_IDS = ['tata-sierra-ev', 'tata-sierra', 'tata-altroz', 'honda-city', 'maruti-victoris', 'maruti-ertiga']
// neutral grey for the generic body when the car has no verified colour list
const NEUTRAL = '#5b6b75'

function Studio3D({ car }: { car: Car }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const studio = useRef<Studio | null>(null)
  const paints = car.colours ?? []
  const [paint, setPaint] = useState(0)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let s: Studio | null = null
    let live = true
    Promise.all([import('../webgl/Studio'), import('../webgl/cars/specs')]).then(([{ Studio }, { SPEC_BY_ID, SIERRA_EV, archetype }]) => {
      if (!live) return
      try {
        const fuel = car.powertrains[0]?.fuel
        // the petrol/diesel Sierra shares the EV's body; it just wears a white plate
        const exact = SPEC_BY_ID[car.id] ?? (car.id === 'tata-sierra' ? { ...SIERRA_EV, ev: false, plate: 'MH 01 SC 2026' } : null)
        s = exact
          ? new Studio(canvas.current!, exact, paints[0] ? { paint: paints[0].hex } : {})
          : new Studio(canvas.current!, archetype(car.body, fuel), { generic: true, paint: paints[0]?.hex ?? NEUTRAL, size: car.dims })
        studio.current = s
      } catch {
        setFailed(true)
      }
    })
    return () => {
      live = false
      s?.dispose()
      studio.current = null
    }
  }, [car])
  if (failed) return <div className="studio-fail muted">3D needs WebGL, which this browser has turned off.</div>
  return (
    <div className="studio">
      <canvas ref={canvas} aria-label={`3D view of a ${BODY_LABEL[car.body]} at the ${car.model}'s proportions. Drag to rotate.`} />
      <div className="studio-bar">
        {paints.length > 0 && (
          <div className="paints">
            <div className="swatches" role="radiogroup" aria-label="Paint colour">
              {paints.map((p, i) => (
                <button
                  key={p.name}
                  role="radio"
                  aria-checked={i === paint}
                  className={`swatch ${i === paint ? 'on' : ''}`}
                  style={{ background: p.roof ? `linear-gradient(180deg, ${p.roof} 0 38%, ${p.hex} 38%)` : p.hex }}
                  title={p.name}
                  aria-label={p.name}
                  onClick={() => { setPaint(i); studio.current?.setColor(p.hex) }}
                />
              ))}
            </div>
            <span className="paint-name small">{paints[paint]?.name}</span>
          </div>
        )}
        <div className="views">
          {(['front', 'side', 'rear', 'top'] as const).map((v) => <button key={v} className="chip" onClick={() => studio.current?.view(v)}>{v}</button>)}
          <button className="chip" onClick={() => studio.current?.toggleLights()}>lights</button>
        </div>
      </div>
      <div className="studio-note dim small">
        {SHOWCASE_IDS.includes(car.id)
          ? `Our 3D model of the ${car.model} at its real dimensions · drag to spin 360°`
          : `Illustrative ${BODY_LABEL[car.body].toLowerCase()} at the ${car.model}’s real length, width and height · drag to spin 360°`}
      </div>
    </div>
  )
}

function Bar({ parts }: { parts: { label: string; v: number; c: string }[] }) {
  const total = parts.reduce((s, p) => s + Math.max(0, p.v), 0)
  return (
    <>
      <div className="stack">
        {parts.filter((p) => p.v > 0).map((p) => <span key={p.label} style={{ flex: p.v / total, background: p.c }} title={`${p.label}: ${inr(p.v)}`} />)}
      </div>
      <div className="stack-legend">
        {parts.map((p) => (
          <div key={p.label}><i style={{ background: p.c }} />{p.label}<b>{p.v < 0 ? '−' : ''}{inr(Math.abs(p.v))}</b></div>
        ))}
      </div>
    </>
  )
}

export default function CarDetail() {
  const { id } = useParams()
  const car = carById.get(id ?? '')
  const answers = useStore((s) => s.answers)
  const done = useStore((s) => s.done)
  const saved = useStore((s) => s.garage.includes(id ?? ''))
  useEffect(() => void (car && track('car_view', { car: car.id, body: car.body })), [car])
  const [state, setState] = useState(answers.state)
  const [view, setView] = useState<'photo' | '3d'>('photo')
  const fuels = useMemo(() => (car ? [...new Set(car.powertrains.map((p) => p.fuel))] : []), [car])
  const [fuel, setFuel] = useState<Fuel | null>(null)
  const [picked, setPicked] = useState<Variant | null>(null)

  useEffect(() => {
    if (car) document.title = `${car.brand} ${car.model} · price, variants, 5-year cost · SahiCar`
    setPicked(null)
    setFuel(null)
  }, [car])

  const forYou = useMemo(() => {
    if (!car || !done) return null
    const res = sahiScore(cars, answers, onroad)
    const i = res.ranked.findIndex((s) => s.car.id === car.id)
    return i < 0 ? { rank: null, s: null, of: res.ranked.length } : { rank: i + 1, s: res.ranked[i], of: res.ranked.length }
  }, [car, answers, done])

  if (!car) {
    return (
      <section className="page wrap empty">
        <h1>Car not found</h1>
        <Link to="/explore" className="btn btn-primary">Browse all cars</Link>
      </section>
    )
  }

  const activeFuel = fuel ?? fuels[0]
  const ladder = car.variants.filter((v) => v.fuel === activeFuel).sort((a, b) => a.price - b.price)
  const sel = picked ?? ladder[Math.floor(ladder.length / 2)] ?? null
  const pt = car.powertrains.find((p) => p.fuel === (sel?.fuel ?? activeFuel)) ?? car.powertrains[0]
  const price = sel?.price ?? pt.priceFrom ?? car.price.min
  const or = onRoad(onroad, state, car.body, pt.fuel, price, pt.cc)
  const cost = tco(car, pt, price, { ...answers, state }, onroad)
  const rivals = cars
    .filter((c) => c.id !== car.id && c.body === car.body && c.price.min <= car.price.max * 1.1 && c.price.max >= car.price.min * 0.9)
    .slice(0, 4)
  const soon = upcoming.filter((u) => u.rivals.includes(car.id) || (u.brand === car.brand && u.model.toLowerCase().startsWith(car.model.toLowerCase())))

  const spec = [
    ['Engine', pt.engine ?? (pt.fuel === 'ev' ? `${pt.batteryKwh ?? '—'} kWh battery` : '—')],
    ['Power', pt.powerPs ? `${pt.powerPs} PS / ${pt.torqueNm ?? '—'} Nm` : '—'],
    [pt.fuel === 'ev' ? 'Claimed range' : 'Claimed mileage', pt.efficiency ? `${pt.efficiency} ${pt.fuel === 'ev' ? 'km' : pt.fuel === 'cng' ? 'km/kg' : 'kmpl'}` : '—'],
    ['Real-world (est.)', `${cost.realEfficiency.toFixed(pt.fuel === 'ev' ? 0 : 1)} ${pt.fuel === 'ev' ? 'km' : pt.fuel === 'cng' ? 'km/kg' : 'kmpl'}`],
    ['Ground clearance', car.dims.groundClearance ? `${car.dims.groundClearance} mm` : '—'],
    ['Boot', car.dims.boot ? `${car.dims.boot} L` : '—'],
    ['Seats', car.seats.join(' / ')],
    ['Airbags', car.safety.airbagsStd ? `${car.safety.airbagsStd}${car.safety.airbagsMax && car.safety.airbagsMax > car.safety.airbagsStd ? `–${car.safety.airbagsMax}` : ''}` : '—'],
    ['ADAS', car.safety.adas === 'none' ? 'No' : `Level ${car.safety.adas.slice(1)}`],
    ['Length × width × height', car.dims.length ? `${car.dims.length} × ${car.dims.width ?? '—'} × ${car.dims.height ?? '—'} mm` : '—'],
    ['Wheelbase', car.dims.wheelbase ? `${car.dims.wheelbase} mm` : '—'],
    ['Fuel tank', car.dims.fuelTank ? `${car.dims.fuelTank} L` : '—'],
  ]

  return (
    <div className="page detail">
      <div className="wrap">
        <div className="crumbs small dim"><Link to="/explore">Explore</Link> / {car.brand} / <span className="muted">{car.model}</span></div>

        <div className="detail-top">
          <div className="detail-media card">
            <div className="media-tabs">
              <button className={`chip ${view === 'photo' ? 'cyan' : ''}`} onClick={() => setView('photo')}><Icon name="image" size={14} /> Photo</button>
              <button className={`chip ${view === '3d' ? 'cyan' : ''}`} onClick={() => setView('3d')}><Icon name="cube" size={14} /> 3D 360°</button>
              {car.oemUrl && (
                <a className="chip" href={car.oemUrl} target="_blank" rel="noreferrer">Official site & colours <Icon name="external" size={12} /></a>
              )}
            </div>
            {view === 'photo' ? <CarImage official={car.official} image={car.image} wiki={car.wiki} body={car.body} alt={`${car.brand} ${car.model}`} eager /> : <Studio3D car={car} />}
          </div>

          <div className="detail-head">
            <div className="dim">{car.brand}</div>
            <h1>{car.model}</h1>
            <div className="detail-price">{priceRange(car.price)} <span className="dim small">ex-showroom</span></div>
            <div className="chips">
              <span className="chip">{BODY_LABEL[car.body]}</span>
              <SafetyStars car={car} />
              <span className="chip">{car.seats.join('/')} seats</span>
              {fuels.map((f) => <span key={f} className="chip">{FUEL_LABEL[f]}</span>)}
            </div>

            {forYou && (
              <div className="for-you card">
                {forYou.s ? (
                  <>
                    <ScoreRing score={forYou.s.score} size={84} />
                    <div>
                      <b>#{forYou.rank} of {forYou.of} for you</b>
                      <div className="small muted">Best as {forYou.s.variant ?? 'suggested trim'} · {FUEL_LABEL[forYou.s.pt.fuel]} · {GEAR_LABEL[forYou.s.gear]}</div>
                      {forYou.s.reasons[0] && <div className="small"><Icon name="check" size={14} /> {forYou.s.reasons[0]}</div>}
                      {forYou.s.caveats[0] && <div className="small amber-t"><Icon name="alert" size={14} /> {forYou.s.caveats[0]}</div>}
                    </div>
                  </>
                ) : (
                  <div className="small muted">This car doesn’t fit your SahiFit answers (budget, seats, gearbox or must-haves). <Link to="/results" className="link-arrow">See what does</Link></div>
                )}
              </div>
            )}
            {!done && (
              <Link to="/sahifit" className="for-you card cta-small">
                <Icon name="spark" size={20} /> <span>Take SahiFit to see how well the {car.model} fits <b>you</b></span>
              </Link>
            )}

            <div className="detail-actions">
              <button className={`btn ${saved ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={() => toggleSave(car.id, (on) => toast(on ? 'Saved to your garage' : 'Removed'))}>
                <Icon name="heart" size={16} /> {saved ? 'Saved' : 'Save'}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => toggleCompareGated(car.id)}><Icon name="compare" size={16} /> Compare</button>
              <Link to={`/emi?car=${car.id}`} className="btn btn-ghost btn-sm"><Icon name="wallet" size={16} /> EMI</Link>
            </div>
          </div>
        </div>

        <section className="spec-grid">
          {spec.map(([k, v]) => (
            <div key={k} className="spec card"><span className="dim small">{k}</span><b>{v}</b></div>
          ))}
        </section>

        <section className="detail-cols">
          <div>
            <h2 className="h-sec">Variants & prices</h2>
            <div className="tabs">
              {fuels.map((f) => (
                <button key={f} className={`chip ${f === activeFuel ? 'cyan' : ''}`} onClick={() => { setFuel(f); setPicked(null) }}>{FUEL_LABEL[f]}</button>
              ))}
              <select className="select select-sm" value={state} onChange={(e) => setState(e.target.value)} aria-label="State for on-road price">
                {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
            <div className="variants card">
              <div className="v-row v-head small dim"><span>Variant</span><span>Gearbox</span><span>Ex-showroom</span><span>On-road*</span></div>
              {ladder.length ? (
                ladder.map((v) => {
                  const p = car.powertrains.find((x) => x.fuel === v.fuel)
                  const o = onRoad(onroad, state, car.body, v.fuel, v.price, p?.cc ?? null)
                  return (
                    <button key={`${v.name}-${v.transmission}-${v.price}`} className={`v-row ${sel === v ? 'on' : ''}`} onClick={() => setPicked(v)}>
                      <span>{v.name}</span>
                      <span className="dim">{GEAR_LABEL[gearKind(v.transmission, v.fuel)]}</span>
                      <span className="mono">{lakh(v.price)}</span>
                      <span className="mono">{lakh(o.total)}</span>
                    </button>
                  )
                })
              ) : (
                <div className="v-row muted">Variant list not available yet — from {lakh(pt.priceFrom ?? car.price.min)}.</div>
              )}
            </div>
            <p className="dim small">* Estimated for a private registration in {states.find((s) => s.code === state)?.name}. Tap a variant for its breakdown.</p>
          </div>

          <div>
            <h2 className="h-sec">{sel ? sel.name : 'Price'} — what you’ll really pay</h2>
            <div className="card pad">
              <div className="kv"><span>Ex-showroom</span><b>{inr(or.exShowroom)}</b></div>
              <div className="kv"><span>Road tax ({or.roadTaxPct}%)</span><b>{inr(or.roadTax)}</b></div>
              <div className="kv"><span>Registration</span><b>{inr(or.registration)}</b></div>
              <div className="kv"><span>Insurance (1st year)</span><b>{inr(or.insurance)}</b></div>
              {or.tcs > 0 && <div className="kv"><span>TCS 1% (claim back in ITR)</span><b>{inr(or.tcs)}</b></div>}
              <div className="kv"><span>FASTag</span><b>{inr(or.fastag)}</b></div>
              <div className="kv total"><span>On-road</span><b>{inr(or.total)}</b></div>
            </div>

            <h3 className="h-sub">{cost.years}-year cost of owning it</h3>
            <div className="card pad">
              <Bar
                parts={[
                  { label: 'On-road price', v: or.total - or.tcs, c: '#15171b' },
                  { label: pt.fuel === 'ev' ? 'Charging' : 'Fuel', v: cost.energy, c: '#0b6b4f' },
                  { label: 'Service & tyres', v: cost.maintenance + cost.tyres, c: '#c58a2a' },
                  { label: 'Insurance renewals', v: cost.insurance, c: '#2f5bb7' },
                  { label: 'Loan interest', v: cost.interest, c: '#b83a2e' },
                  { label: 'Resale value back', v: -cost.resale, c: '#c9c3b7' },
                ]}
              />
              <div className="kv total"><span>Net cost over {cost.years} years · {Math.round(cost.totalKm / 1000)}k km</span><b>{inr(cost.total)}</b></div>
              <div className="kv"><span>Per km, all-in</span><b>₹{cost.perKm.toFixed(2)}</b></div>
              <div className="kv"><span>Per month, all-in</span><b>{inr(cost.perMonth)}</b></div>
              <p className="dim small">Based on your SahiFit usage: {answers.dailyKm} km/day, {Math.round(answers.highwayShare * 100)}% highway{answers.payment === 'loan' ? `, loan at ${answers.rate}% for ${answers.tenureYears} yrs` : ''}.</p>
            </div>
          </div>
        </section>

        {(car.highlights.length > 0 || car.weaknesses.length > 0) && (
          <section className="detail-cols">
            <div className="card pad">
              <h3 className="h-sub">What’s good</h3>
              <ul className="reasons">{car.highlights.map((h) => <li key={h}><Icon name="check" size={16} /> {h}</li>)}</ul>
            </div>
            <div className="card pad">
              <h3 className="h-sub">Watch out for</h3>
              <ul className="caveats">{car.weaknesses.map((h) => <li key={h}><Icon name="alert" size={16} /> {h}</li>)}</ul>
            </div>
          </section>
        )}

        <section className="card pad safety-panel">
          <div><Icon name="shield" size={28} /></div>
          <div>
            <h3 className="h-sub">Safety</h3>
            {car.safety.adult != null ? (
              <p>
                <b>{car.safety.adult}★ adult</b>{car.safety.child != null && <> · <b>{car.safety.child}★ child</b></>} in {car.safety.agency === 'BNCAP' ? 'Bharat NCAP' : car.safety.agency === 'GNCAP' ? 'Global NCAP' : car.safety.agency} {car.safety.year ?? ''}
                {car.safety.agency === 'GNCAP' && (car.safety.year ?? 2023) < 2022 && <span className="muted"> (older, less strict protocol)</span>}
                {(car.safety.agency === 'ANCAP' || car.safety.agency === 'EuroNCAP') && <span className="muted"> (tested abroad — the Indian-spec car may differ)</span>}
              </p>
            ) : (
              <p className="muted">Not crash-tested by Bharat NCAP or Global NCAP yet.</p>
            )}
            <p className="small muted">{car.safety.airbagsStd ?? '—'} airbags standard · ESC {car.safety.esc ? 'standard' : car.safety.esc === false ? 'not standard' : 'unknown'} · ADAS {car.safety.adas === 'none' ? 'not offered' : car.safety.adas}</p>
          </div>
        </section>

        {soon.length > 0 && (
          <section>
            <h2 className="h-sec">Coming soon that affects this car</h2>
            <div className="soon-grid">
              {soon.map((u) => (
                <div key={u.id} className="soon-card card">
                  <div className="soon-when mono">{expectedLabel(u.expected)} · {u.status}</div>
                  <h3>{u.brand} {u.model}</h3>
                  <p className="small muted">{u.waitAdvice}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {rivals.length > 0 && (
          <section>
            <h2 className="h-sec">Rivals at this price</h2>
            <div className="card-grid">{rivals.map((c) => <CarCard key={c.id} car={c} />)}</div>
          </section>
        )}

        <section className="sources dim small">
          Data verified {car.verifiedOn}. Sources:{' '}
          {car.sources.map((s, i) => (
            <a key={s} href={s} target="_blank" rel="noreferrer nofollow">[{i + 1}] {new URL(s).hostname.replace('www.', '')} </a>
          ))}
        </section>
      </div>
    </div>
  )
}
