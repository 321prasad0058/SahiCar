// Car-loan EMI calculator: a price (typed, or a real car's on-road price), a down payment and a tenure in;
// the EMI, total cost and every lender's quote for this buyer out — updated as you move anything.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { carById, cars, onroad, states } from '../data'
import { LENDERS, RATES_AS_OF, REPO, SCORE_LABEL, type ScoreBand } from '../data/loans'
import { onRoad } from '../engine/costs'
import { quotes, schedule } from '../engine/loan'
import { inr, lakh } from '../lib/format'
import { reducedMotion } from '../lib/perf'
import { gsap } from '../lib/scroll'
import { track } from '../lib/track'
import { useStore } from '../state/store'

// price slider on a log scale, so ₹5 L and ₹50 L both get room
const P_MIN = 300000, P_MAX = 10000000
const toPrice = (i: number) => { const v = P_MIN * (P_MAX / P_MIN) ** (i / 1000); return v < 2000000 ? Math.round(v / 10000) * 10000 : Math.round(v / 50000) * 50000 }
const fromPrice = (v: number) => Math.round((Math.log(Math.min(P_MAX, Math.max(P_MIN, v)) / P_MIN) / Math.log(P_MAX / P_MIN)) * 1000)
const BRANDS = [...new Set(cars.map((c) => c.brand))].sort()

function Range({ value, min, max, step = 1, onChange, label }: { value: number; min: number; max: number; step?: number; onChange: (v: number) => void; label: string }) {
  return (
    <input type="range" aria-label={label} min={min} max={max} step={step} value={value} style={{ ['--fill' as string]: `${((value - min) / (max - min)) * 100}%` }} onChange={(e) => onChange(Number(e.target.value))} />
  )
}

/** A money figure that counts to its new value instead of jumping. */
function Count({ value, className }: { value: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null)
  const shown = useRef({ v: value })
  useEffect(() => {
    if (!el.current) return
    if (reducedMotion) { el.current.textContent = inr(value); shown.current.v = value; return }
    const t = gsap.to(shown.current, { v: value, duration: 0.45, ease: 'power2.out', onUpdate: () => void (el.current && (el.current.textContent = inr(shown.current.v))) })
    return () => void t.kill()
  }, [value])
  return <span ref={el} className={className}>{inr(value)}</span>
}

export default function Emi() {
  const [params] = useSearchParams()
  const homeState = useStore((s) => s.answers.state)
  const initialCar = params.get('car') && carById.get(params.get('car')!) ? params.get('car')! : ''

  const [mode, setMode] = useState<'price' | 'car'>(initialCar ? 'car' : 'price')
  const [typed, setTyped] = useState(1000000)
  const [carId, setCarId] = useState(initialCar)
  const car = carId ? carById.get(carId) : undefined
  const [variantIdx, setVariantIdx] = useState(0)
  const [st, setSt] = useState(homeState)
  const [downPct, setDownPct] = useState(20)
  const [years, setYears] = useState(5)
  const [score, setScore] = useState<ScoreBand>('excellent')
  const [evManual, setEvManual] = useState(false)
  const [income, setIncome] = useState(0)
  const [extra, setExtra] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  // phones: the result leads, a slim EMI bar stays pinned once it scrolls away, and the longer sections fold
  const [phone, setPhone] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(max-width: 960px)').matches)
  const hero = useRef<HTMLDivElement>(null)
  const [heroGone, setHeroGone] = useState(false)
  useEffect(() => {
    const mq = matchMedia('(max-width: 960px)')
    const on = () => setPhone(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  // the pinned EMI shows whenever the result card is off screen (above or below) once you've started scrolling,
  // so the EMI stays in view while you change the inputs
  useEffect(() => {
    if (!hero.current) return
    let off = false
    const update = () => setHeroGone(off && scrollY > 120)
    const io = new IntersectionObserver(([e]) => ((off = !e.isIntersecting), update()), { rootMargin: '-70px 0px 0px 0px' })
    io.observe(hero.current)
    addEventListener('scroll', update, { passive: true })
    return () => (io.disconnect(), removeEventListener('scroll', update))
  })

  useEffect(() => setVariantIdx(0), [carId])
  useEffect(() => track('emi_open', { from: initialCar ? 'car' : 'direct' }), [initialCar])

  // the price the loan is for: typed, or the chosen variant's on-road price in the chosen state
  const variants = car?.variants.length ? car.variants : car ? [{ name: 'Base', fuel: car.powertrains[0].fuel, transmission: '', price: car.price.min }] : []
  const variant = variants[Math.min(variantIdx, variants.length - 1)]
  const road = useMemo(() => {
    if (mode !== 'car' || !car || !variant) return null
    const pt = car.powertrains.find((p) => p.fuel === variant.fuel) ?? car.powertrains[0]
    return onRoad(onroad, st, car.body, variant.fuel, variant.price, pt.cc)
  }, [mode, car, variant, st])
  const price = road ? road.total : typed
  const ev = mode === 'car' ? variant?.fuel === 'ev' : evManual
  const down = Math.round((price * downPct) / 100)
  const loan = Math.max(0, price - down)

  const all = useMemo(() => quotes({ loan, years, score, ev }), [loan, years, score, ev])
  const best = all.find((q) => q.allowed) ?? all[0]
  const q = all.find((x) => x.lender.id === picked && x.allowed) ?? best
  const plan = useMemo(() => (q ? schedule(loan, q.rate, years, extra) : null), [loan, q, years, extra])
  const base = useMemo(() => (q ? schedule(loan, q.rate, years, 0) : null), [loan, q, years])

  if (!LENDERS.length || !q || !plan || !base) return <div className="page"><div className="wrap"><p className="muted">Loan rates are loading.</p></div></div>

  const share = income > 0 ? (q.emi / income) * 100 : 0
  const fee = q.fee ?? 0
  const totalOut = down + q.emi * years * 12 + fee
  const parts = [
    { k: 'down', label: 'Down payment', v: down },
    { k: 'principal', label: 'Loan', v: loan },
    { k: 'interest', label: 'Interest', v: q.interest },
    { k: 'fee', label: 'Fees', v: fee },
  ]
  const partsTotal = parts.reduce((s, p) => s + p.v, 0)
  const shown = showAll ? all : all.slice(0, phone ? 3 : 6)
  const maxYear = Math.max(...base.years.map((y) => y.principal + y.interest))
  const saved = base.totalInterest - plan.totalInterest
  const monthsSaved = base.months - plan.months

  return (
    <div className="page emi">
      <div className="wrap">
        <header className="emi-head">
          <div className="eyebrow">Car loan calculator</div>
          <h1>What will it cost you each month?</h1>
          <h1 className="emi-title-short">Car loan EMI</h1>
          <p className="muted emi-sub">Set the price, down payment and tenure. We price the loan at {LENDERS.length} banks and lenders for your credit score and show what you’d really pay — interest, fees and all.</p>
        </header>

        <div className={`emi-pin ${phone && heroGone ? 'show' : ''}`} aria-hidden={!(phone && heroGone)}>
          <span className="dim small">EMI</span>
          <b>{inr(q.emi)}<span className="dim">/mo</span></b>
          <span className="small muted">{q.lender.name.replace(/ (Bank|of India)$/,'')} · {q.rate.toFixed(2)}% · {years} yr</span>
        </div>

        <div className="emi-grid">
          {/* ── inputs */}
          <section className="emi-in card" aria-label="Your loan">
            <div className="emi-seg" role="tablist" aria-label="How to set the price">
              <button role="tab" aria-selected={mode === 'price'} className={mode === 'price' ? 'on' : ''} onClick={() => setMode('price')}>Enter a price</button>
              <button role="tab" aria-selected={mode === 'car'} className={mode === 'car' ? 'on' : ''} onClick={() => setMode('car')}>Choose a car</button>
            </div>

            {mode === 'price' ? (
              <div className="emi-field">
                <label className="emi-label" htmlFor="emi-price">On-road price</label>
                <div className="money-input">
                  <span>₹</span>
                  <input id="emi-price" inputMode="numeric" value={typed.toLocaleString('en-IN')} onChange={(e) => { const v = Number(e.target.value.replace(/\D/g, '')); if (v <= 50000000) setTyped(v) }} />
                  <span className="dim">{lakh(typed)}</span>
                </div>
                <Range label="On-road price" min={0} max={1000} value={fromPrice(typed)} onChange={(i) => setTyped(toPrice(i))} />
                <label className="check">
                  <input type="checkbox" checked={evManual} onChange={(e) => setEvManual(e.target.checked)} />
                  <span>It’s an electric car <span className="dim">(some banks charge less)</span></span>
                </label>
              </div>
            ) : (
              <div className="emi-field">
                <label className="emi-label" htmlFor="emi-car">Car</label>
                <select id="emi-car" className="select" value={carId} onChange={(e) => setCarId(e.target.value)}>
                  <option value="">Choose a car…</option>
                  {BRANDS.map((b) => (
                    <optgroup key={b} label={b}>
                      {cars.filter((c) => c.brand === b).map((c) => <option key={c.id} value={c.id}>{c.model}</option>)}
                    </optgroup>
                  ))}
                </select>
                {car && (
                  <div className="two">
                    <select className="select" aria-label="Variant" value={variantIdx} onChange={(e) => setVariantIdx(Number(e.target.value))}>
                      {variants.map((v, i) => <option key={v.name + i} value={i}>{v.name} · {lakh(v.price)}</option>)}
                    </select>
                    <select className="select" aria-label="State" value={st} onChange={(e) => setSt(e.target.value)}>
                      {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                    </select>
                  </div>
                )}
                {road && (
                  <p className="road small">
                    On-road <b>{lakh(road.total)}</b> <span className="dim">= {lakh(road.exShowroom)} ex-showroom + {lakh(road.total - road.exShowroom)} tax, registration and insurance</span>
                  </p>
                )}
              </div>
            )}

            <div className="emi-field">
              <div className="emi-label-row">
                <label className="emi-label" htmlFor="emi-down">Down payment</label>
                <b>{inr(down)} <span className="dim">· {downPct}%</span></b>
              </div>
              <Range label="Down payment" min={0} max={80} value={downPct} onChange={setDownPct} />
              <div className="quick">
                {[10, 20, 30].map((p) => <button key={p} className={`pick ${downPct === p ? 'on' : ''}`} onClick={() => setDownPct(p)}>{p}%</button>)}
              </div>
              {downPct < 10 && <p className="hint small">Most banks fund at most 90% of the on-road price, so plan at least 10% down.</p>}
            </div>

            <div className="emi-field">
              <span className="emi-label">Repay over</span>
              <div className="years" role="radiogroup" aria-label="Loan tenure">
                {[1, 2, 3, 4, 5, 6, 7].map((y) => (
                  <button key={y} role="radio" aria-checked={years === y} className={years === y ? 'on' : ''} onClick={() => setYears(y)}>
                    {y}<span>yr</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="emi-field">
              <span className="emi-label">Your credit score</span>
              <div className="quick">
                {(Object.keys(SCORE_LABEL) as ScoreBand[]).map((b) => <button key={b} className={`pick ${score === b ? 'on' : ''}`} onClick={() => setScore(b)}>{SCORE_LABEL[b]}</button>)}
              </div>
              <p className="dim small">Banks price car loans by your CIBIL score. Check it free once a year on the bureau sites.</p>
            </div>

            <div className="emi-field">
              <label className="emi-label" htmlFor="emi-income">Monthly take-home pay <span className="dim">(optional)</span></label>
              <div className="money-input">
                <span>₹</span>
                <input id="emi-income" inputMode="numeric" placeholder="e.g. 80,000" value={income ? income.toLocaleString('en-IN') : ''} onChange={(e) => setIncome(Number(e.target.value.replace(/\D/g, '')) || 0)} />
              </div>
            </div>
          </section>

          {/* ── results */}
          <section className="emi-out" aria-live="polite">
            <div className="emi-hero card" ref={hero}>
              <div className="emi-hero-top">
                <div>
                  <div className="dim small">Your EMI</div>
                  <div className="emi-big"><Count value={q.emi} /><span>/month</span></div>
                  <div className="small muted">{q.lender.name} · <b>{q.rate.toFixed(2)}%</b>{q.published ? '' : ' (estimated for your score)'} · {years * 12} months{ev && q.lender.evDiscount ? ' · green-loan rate' : ''}</div>
                </div>
                {q !== best && <button className="btn btn-ghost btn-sm" onClick={() => setPicked(null)}>Back to the cheapest</button>}
              </div>
              <div className="emi-stats">
                <div><span className="dim small">Loan</span><b>{lakh(loan)}</b></div>
                <div><span className="dim small">Total interest</span><b><Count value={q.interest} /></b></div>
                <div><span className="dim small">Processing fee</span><b>{q.fee == null ? <span className="dim">Not published</span> : <>{q.lender.fee.upTo ? 'up to ' : ''}{inr(q.fee)}</>}</b></div>
                <div><span className="dim small">You pay in all</span><b><Count value={totalOut} /></b></div>
              </div>
              <div className="split" role="img" aria-label="Where your money goes">
                {parts.map((p) => <span key={p.k} className={`split-${p.k}`} style={{ flexGrow: p.v / partsTotal }} />)}
              </div>
              <div className="split-legend small">
                {parts.map((p) => <span key={p.k}><i className={`split-${p.k}`} />{p.label} <b>{p.k === 'fee' && q.fee == null ? 'not published' : lakh(p.v)}</b></span>)}
              </div>
            </div>

            {
              <details className="emi-afford card fold" open={!phone || income > 0}>
                <summary><h2 className="h-card">Can you afford it?</h2></summary>
                {income > 0 ? (
                  <>
                    <div className="meter" aria-label={`EMI is ${share.toFixed(0)}% of take-home pay`}>
                      <div className="meter-zones"><span /><span /><span /></div>
                      <div className="meter-pin" style={{ left: `${Math.min(100, (share / 40) * 100)}%` }}><b>{share.toFixed(0)}%</b></div>
                    </div>
                    <div className="meter-scale dim small"><span>0%</span><span>15% comfortable</span><span>25% stretched</span><span>40%</span></div>
                    <p className="small">{share <= 15 ? 'Comfortable: the EMI leaves room for fuel, insurance and savings.' : share <= 25 ? 'Manageable, but fuel, insurance and service add another few thousand a month.' : 'Stretched: a bigger down payment or a cheaper variant would ease this.'}</p>
                  </>
                ) : (
                  <p className="dim small">Add your take-home pay to see how the EMI fits your month.</p>
                )}
                <ul className="rule">
                  <li className={downPct >= 20 ? 'ok' : ''}><b>20%</b> or more down <span className="dim">— you have {downPct}%</span></li>
                  <li className={years <= 4 ? 'ok' : ''}><b>4 years</b> or less <span className="dim">— you have {years}</span></li>
                  <li className={income > 0 && share <= 10 ? 'ok' : ''}><b>10%</b> of income or less on the EMI <span className="dim">— {income > 0 ? `${share.toFixed(0)}%` : 'add your pay'}</span></li>
                </ul>
                <p className="dim small">The 20/4/10 rule of thumb keeps a car from straining your finances. Missing one isn’t a red flag; missing all three is.</p>
              </details>
            }

            <div className="emi-banks card">
              <div className="h-row">
                <h2 className="h-card">Every lender, for your loan</h2>
                <span className="dim small">{SCORE_LABEL[score]} score{ev ? ' · electric' : ''} · {lakh(loan)} for {years} yr</span>
              </div>
              <div className="bank-list" role="list">
                {shown.map((x, i) => {
                  const on = x === q
                  const more = x.total - best.total
                  return (
                    <button key={x.lender.id} role="listitem" className={`bank ${on ? 'on' : ''} ${x.allowed ? '' : 'off'}`} disabled={!x.allowed} onClick={() => { setPicked(x.lender.id); track('emi_lender', { lender: x.lender.id }) }}>
                      <span className="bank-name">
                        <b>{x.lender.name}</b>
                        <span className="dim small">
                          {x.lender.type} · {x.lender.kind === 'floating' ? 'floating' : 'fixed'}{x.lender.evDiscount && ev ? ' · green-loan rate' : ''}
                          {!x.lender.verified && <span className="tag" title="The lender’s own page couldn’t be read; figures are from a rate-comparison site">aggregator data</span>}
                        </span>
                        {x.lender.note && <span className="bank-note dim small">{x.lender.note}</span>}
                      </span>
                      <span className="bank-rate"><b>{x.rate.toFixed(2)}%</b>{!x.published && <span className="dim small"> est.</span>}</span>
                      <span className="bank-emi">{x.allowed ? <>{inr(x.emi)}<span className="dim">/mo</span></> : <span className="dim small">{x.why}</span>}</span>
                      <span className="bank-cost small">
                        {!x.allowed ? '' : i === 0 && x === best ? <span className="chip green">Lowest total cost</span> : <span className="dim">+{inr(more)} overall</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
              {all.length > 6 && <button className="link-arrow more" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer' : `Show all ${all.length} lenders`}</button>}
              <p className="dim small">Sorted by interest over the full tenure plus the processing fee with GST, where the lender publishes it. “est.” marks a rate estimated for your score from the lender’s published range. Tap a lender to see your numbers with it.</p>
            </div>

            <details className="emi-years card fold" open={!phone}>
              <summary><h2 className="h-card">Year by year</h2></summary>
              <div className="ybars" role="img" aria-label="Principal and interest paid each year">
                {base.years.map((y) => (
                  <div key={y.year} className="ybar" title={`Year ${y.year}: ${inr(y.principal)} principal, ${inr(y.interest)} interest, ${inr(y.balance)} left`}>
                    <div className="ystack" style={{ height: `${((y.principal + y.interest) / maxYear) * 100}%` }}>
                      <span className="yi" style={{ flexGrow: y.interest }} />
                      <span className="yp" style={{ flexGrow: y.principal }} />
                    </div>
                    <span className="ylabel small">Yr {y.year}</span>
                    <span className="ybal dim small">{lakh(y.balance, 1)} left</span>
                  </div>
                ))}
              </div>
              <div className="split-legend small"><span><i className="split-principal" />Principal</span><span><i className="split-interest" />Interest</span></div>
              <p className="dim small">Interest is front-loaded: in year 1 about {Math.round((base.years[0].interest / (base.years[0].interest + base.years[0].principal)) * 100)}% of what you pay is interest.</p>
            </details>

            <details className="emi-extra card fold" open={!phone}>
              <summary><h2 className="h-card">Pay a little extra each year</h2></summary>
              <div className="emi-label-row">
                <span className="dim small">Extra payment once a year (a bonus, say)</span>
                <b>{extra ? inr(extra) : 'None'}</b>
              </div>
              <Range label="Extra yearly payment" min={0} max={Math.max(50000, Math.round(loan / 5 / 10000) * 10000)} step={5000} value={extra} onChange={setExtra} />
              <p className="small"><b>{q.lender.name}:</b> {q.lender.prepay}.</p>
              {extra > 0 ? (
                <p className="saver">You’d save <b>{inr(saved)}</b> in interest and finish <b>{monthsSaved} months</b> early.</p>
              ) : (
                <p className="dim small">Paying extra cuts interest straight away. Since 1 Jan 2026, RBI rules bar prepayment charges on floating-rate loans to individuals; fixed-rate loans can still carry them.</p>
              )}
            </details>

            <p className="dim small fine">
              Rates are each lender’s published new-car loan pricing, checked {RATES_AS_OF}, after RBI’s repo rise to {REPO.rate}% on {REPO.since}; your final rate depends on the lender’s own checks.
              EMIs use monthly reducing balance. Processing fees include 18% GST. {car && <Link to={`/car/${car.id}`} className="link-arrow">Back to the {car.model}</Link>}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
