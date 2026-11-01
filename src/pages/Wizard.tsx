// SahiFit: nine short screens about how the buyer lives. A live counter shows how many cars still fit,
// and a blurred "leading so far" teaser keeps them going to the end.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fixes } from '../components/Fixes'
import { Icon } from '../components/Icon'
import { brands, cars, onroad, states } from '../data'
import { BODY_LABEL, FUEL_LABEL, type Body, type Fuel } from '../data/types'
import { MUST_HAVES, PRIORITY_LABEL, type Answers, type Level, type Priority } from '../engine/answers'
import { afford, comfortableBudget, VERDICT_LABEL } from '../engine/afford'
import { emi } from '../engine/costs'
import { relaxations, sahiScore } from '../engine/sahiscore'
import { inr, lakh } from '../lib/format'
import { reducedMotion } from '../lib/perf'
import { gsap } from '../lib/scroll'
import { track, trackNoMatch } from '../lib/track'
import { useStore } from '../state/store'

// ── controls

type Opt<T> = { v: T; label: string; hint?: string; icon?: string }

function Cards<T extends string | number | boolean>({ value, options, onChange, cols = 2 }: { value: T; options: Opt<T>[]; onChange: (v: T) => void; cols?: number }) {
  return (
    <div className="opt-grid" style={{ ['--cols' as string]: cols }} role="radiogroup">
      {options.map((o) => (
        <button key={String(o.v)} role="radio" aria-checked={value === o.v} className={`opt ${value === o.v ? 'on' : ''}`} onClick={() => onChange(o.v)}>
          {o.icon && <span className="opt-ico">{o.icon}</span>}
          <span className="opt-label">{o.label}</span>
          {o.hint && <span className="opt-hint">{o.hint}</span>}
        </button>
      ))}
    </div>
  )
}

function Chips<T extends string>({ value, options, onChange }: { value: T[]; options: Opt<T>[]; onChange: (v: T[]) => void }) {
  return (
    <div className="chip-pick">
      {options.map((o) => {
        const on = value.includes(o.v)
        return (
          <button key={o.v} className={`pick ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => onChange(on ? value.filter((x) => x !== o.v) : [...value, o.v])}>
            {on && <Icon name="check" size={14} />} {o.label}
          </button>
        )
      })}
    </div>
  )
}

function Toggle({ on, label, hint, onChange }: { on: boolean; label: string; hint?: string; onChange: (v: boolean) => void }) {
  return (
    <button className={`toggle ${on ? 'on' : ''}`} role="switch" aria-checked={on} onClick={() => onChange(!on)}>
      <span className="toggle-track"><span /></span>
      <span>
        <span className="toggle-label">{label}</span>
        {hint && <span className="opt-hint">{hint}</span>}
      </span>
    </button>
  )
}

function Range({ value, min, max, step = 1, onChange, label }: { value: number; min: number; max: number; step?: number; onChange: (v: number) => void; label: string }) {
  return (
    <input
      type="range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      style={{ ['--fill' as string]: `${((value - min) / (max - min)) * 100}%` }}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}

function Field({ label, children, note }: { label: string; children: ReactNode; note?: ReactNode }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      {children}
      {note && <div className="field-note">{note}</div>}
    </div>
  )
}

/** Can they afford this budget? The verdict on the budget itself, and the budget that would be comfortable. */
function PayCheck({ a, set }: { a: Answers; set: (p: Partial<Answers>) => void }) {
  const cash = a.payment === 'cash'
  const res = afford({ price: a.budget, down: a.downPayment, rate: a.rate, years: a.tenureYears, income: a.income, running: 0, cash })
  const ok = comfortableBudget(a.income, a)
  return (
    <div className={`pay-check ${res.verdict}`}>
      <b>{VERDICT_LABEL[res.verdict]}.</b>{' '}
      {cash
        ? <>{lakh(a.budget)} is {(a.budget / a.income).toFixed(1)} months of your pay.</>
        : <>An EMI of {inr(res.emi)} is {Math.round(res.emiShare * 100)}% of your take-home pay.</>}{' '}
      {res.verdict !== 'yes' && ok > B_MIN && (
        <button className="link-arrow" onClick={() => set({ budget: ok })}>Use a comfortable {lakh(ok)}</button>
      )}
    </div>
  )
}

// budget on a log scale, ₹3 L to ₹1 Cr
const B_MIN = 300000
const B_MAX = 10000000
const toBudget = (i: number) => {
  const v = B_MIN * (B_MAX / B_MIN) ** (i / 1000)
  return v < 2000000 ? Math.round(v / 25000) * 25000 : Math.round(v / 100000) * 100000
}
const fromBudget = (v: number) => Math.round((Math.log(v / B_MIN) / Math.log(B_MAX / B_MIN)) * 1000)

// ── steps

interface Step {
  id: string
  title: string
  sub: string
  render: (a: Answers, set: (p: Partial<Answers>) => void) => ReactNode
}

const STEPS: Step[] = [
  {
    id: 'budget',
    title: 'What can you spend, all-in?',
    sub: 'On-road price — tax, registration and insurance included. We’ll work out the ex-showroom ceiling.',
    render: (a, set) => {
      const loan = Math.max(0, a.budget - a.downPayment)
      return (
        <>
          <div className="big-number">{lakh(a.budget)}</div>
          <Range label="Budget" min={0} max={1000} value={fromBudget(a.budget)} onChange={(i) => set({ budget: toBudget(i) })} />
          <div className="range-ends dim mono"><span>₹3 L</span><span>₹1 Cr</span></div>
          <Field label="Could you stretch a little for a clearly better car?">
            <Cards value={a.stretch} cols={3} onChange={(v) => set({ stretch: v })} options={[{ v: 0, label: 'Not a rupee' }, { v: 0.05, label: 'Up to 5%' }, { v: 0.1, label: 'Up to 10%' }]} />
          </Field>
          <Field label="How will you pay?">
            <Cards value={a.payment} onChange={(v) => set({ payment: v })} options={[{ v: 'loan', label: 'Car loan' }, { v: 'cash', label: 'Full payment' }]} />
          </Field>
          {a.payment === 'loan' && (
            <div className="loan-box card">
              <Field label={`Down payment · ${lakh(a.downPayment)}`}>
                <Range label="Down payment" min={0} max={a.budget} step={25000} value={Math.min(a.downPayment, a.budget)} onChange={(v) => set({ downPayment: v })} />
              </Field>
              <Field label="Loan tenure">
                <Cards value={a.tenureYears} cols={4} onChange={(v) => set({ tenureYears: v })} options={[3, 4, 5, 7].map((y) => ({ v: y, label: `${y} yrs` }))} />
              </Field>
              <div className="emi-line">
                EMI about <b>{inr(emi(loan, a.rate, a.tenureYears))}</b>/month at {a.rate}% on {lakh(loan)}
              </div>
            </div>
          )}
          <Field label="Your monthly take-home pay (optional)" note={<><Icon name="shield" size={12} /> Stays on this device — never uploaded or shared. We use it to rank cars you can comfortably afford higher.</>}>
            <div className="money-input">
              <span>₹</span>
              <input
                inputMode="numeric"
                aria-label="Monthly take-home pay"
                placeholder="e.g. 80,000"
                value={a.income ? a.income.toLocaleString('en-IN') : ''}
                onChange={(e) => set({ income: Math.min(99999999, Number(e.target.value.replace(/\D/g, '')) || 0) })}
              />
            </div>
          </Field>
          {a.income > 0 && <PayCheck a={a} set={set} />}
        </>
      )
    },
  },
  {
    id: 'place',
    title: 'Where will the car live?',
    sub: 'Road tax, fuel prices and how far the nearest service centre is all depend on it.',
    render: (a, set) => (
      <>
        <Field label="State">
          <select className="select" value={a.state} onChange={(e) => set({ state: e.target.value })}>
            {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="What kind of place?">
          <Cards value={a.place} onChange={(v) => set({ place: v })} options={[
            { v: 'metro', label: 'Metro', hint: 'Mumbai, Delhi-NCR, Bengaluru…' },
            { v: 'city', label: 'City', hint: 'Pune, Jaipur, Indore, Kochi…' },
            { v: 'town', label: 'Small town', hint: 'District HQ, taluka' },
            { v: 'rural', label: 'Village / rural', hint: 'Nearest dealer is far' },
          ]} />
        </Field>
      </>
    ),
  },
  {
    id: 'drive',
    title: 'How much will you drive?',
    sub: 'This decides petrol vs diesel vs CNG vs electric more than anything else.',
    render: (a, set) => (
      <>
        <div className="big-number">{a.dailyKm} km<span className="dim"> / day</span></div>
        <Range label="Daily kilometres" min={5} max={200} step={5} value={a.dailyKm} onChange={(v) => set({ dailyKm: v })} />
        <div className="range-ends dim mono"><span>≈ {Math.round((a.dailyKm * 330) / 1000)}k km a year</span><span>200 km</span></div>
        <Field label={`How much of it is highway? · ${Math.round(a.highwayShare * 100)}%`}>
          <Range label="Highway share" min={0} max={1} step={0.05} value={a.highwayShare} onChange={(v) => set({ highwayShare: v })} />
          <div className="range-ends dim mono"><span>all city</span><span>all highway</span></div>
        </Field>
        <Field label="Long road trips (300 km+)?">
          <Cards value={a.longTrips} cols={3} onChange={(v) => set({ longTrips: v })} options={[{ v: 'rarely', label: 'Rarely' }, { v: 'monthly', label: 'Monthly' }, { v: 'weekly', label: 'Most weeks' }]} />
        </Field>
        <Field label="How long will you keep it?">
          <Cards value={a.years} cols={4} onChange={(v) => set({ years: v })} options={[3, 5, 7, 10].map((y) => ({ v: y, label: `${y} yrs` }))} />
        </Field>
      </>
    ),
  },
  {
    id: 'roads',
    title: 'What are the roads like?',
    sub: 'Be honest about the worst stretch you drive every week — that’s what scrapes the underbody.',
    render: (a, set) => (
      <>
        <Cards value={a.roads} onChange={(v) => set({ roads: v })} options={[
          { v: 'smooth', label: 'Smooth', hint: 'Good city roads, expressways' },
          { v: 'mixed', label: 'Mixed', hint: 'Speed breakers, some potholes' },
          { v: 'rough', label: 'Rough', hint: 'Broken patches, big speed breakers' },
          { v: 'unpaved', label: 'Unpaved', hint: 'Village roads, kaccha tracks' },
        ]} />
        <div className="toggles">
          <Toggle on={a.flooding} label="Waterlogging in monsoon" hint="We’ll want more ground clearance" onChange={(v) => set({ flooding: v })} />
          <Toggle on={a.hills} label="Hills or ghats regularly" hint="Power-to-weight matters" onChange={(v) => set({ hills: v })} />
        </div>
      </>
    ),
  },
  {
    id: 'people',
    title: 'Who rides with you?',
    sub: 'On a normal day — plus the occasional full house.',
    render: (a, set) => (
      <>
        <div className="stepper">
          <button className="icon-btn" aria-label="Fewer" onClick={() => set({ people: Math.max(1, a.people - 1) })}>−</button>
          <div className="big-number">{a.people}<span className="dim"> {a.people === 1 ? 'person' : 'people'}</span></div>
          <button className="icon-btn" aria-label="More" onClick={() => set({ people: Math.min(8, a.people + 1) })}>+</button>
        </div>
        <div className="toggles">
          <Toggle on={a.sevenOccasional} label="Sometimes 6–7 of us" hint="A third row would help now and then" onChange={(v) => set({ sevenOccasional: v })} />
          <Toggle on={a.elders} label="Elderly parents ride often" hint="Easy ingress, comfortable rear seat" onChange={(v) => set({ elders: v })} />
          <Toggle on={a.kids} label="Young kids" hint="Child-occupant safety weighs more" onChange={(v) => set({ kids: v })} />
        </div>
        <Field label="Luggage">
          <Cards value={a.luggage} cols={3} onChange={(v) => set({ luggage: v })} options={[
            { v: 'light', label: 'Light', hint: 'Office bag, groceries' },
            { v: 'medium', label: 'Medium', hint: 'Weekend trips' },
            { v: 'heavy', label: 'Heavy', hint: 'Family holidays, stroller' },
          ]} />
        </Field>
      </>
    ),
  },
  {
    id: 'city',
    title: 'Your daily drive',
    sub: 'Traffic, parking and gearbox — the stuff that makes you love or hate a car on day 30.',
    render: (a, set) => (
      <>
        <Field label="Traffic">
          <Cards value={a.traffic} onChange={(v) => set({ traffic: v })} options={[{ v: 'heavy', label: 'Bumper to bumper' }, { v: 'light', label: 'Mostly moving' }]} />
        </Field>
        <Field label="Parking">
          <Cards value={a.parking} onChange={(v) => set({ parking: v })} options={[{ v: 'tight', label: 'Tight lanes, tight spots' }, { v: 'easy', label: 'Plenty of room' }]} />
        </Field>
        <Field label="Gearbox">
          <Cards value={a.gearbox} cols={3} onChange={(v) => set({ gearbox: v })} options={[{ v: 'any', label: 'Recommend one' }, { v: 'auto', label: 'Automatic only' }, { v: 'manual', label: 'Manual only' }]} />
        </Field>
        <div className="toggles">
          <Toggle on={a.firstCar} label="This is my first car" hint="Easy to drive, cheap to fix dents" onChange={(v) => set({ firstCar: v })} />
        </div>
      </>
    ),
  },
  {
    id: 'fuel',
    title: 'Charging and CNG',
    sub: 'An EV is brilliant with a home charger and painful without one. Same story with CNG stations.',
    render: (a, set) => (
      <>
        <Field label="Could you charge an EV?">
          <Cards value={a.charging} cols={3} onChange={(v) => set({ charging: v })} options={[
            { v: 'home', label: 'At home', hint: 'Own parking with a socket' },
            { v: 'work', label: 'At work', hint: 'Office or society charger' },
            { v: 'none', label: 'Neither', hint: 'Street or shared parking' },
          ]} />
        </Field>
        <Field label="Is there a CNG pump near you?">
          <Cards value={a.cngNearby} cols={3} onChange={(v) => set({ cngNearby: v })} options={[{ v: 'yes', label: 'Yes' }, { v: 'unsure', label: 'Not sure' }, { v: 'no', label: 'No' }]} />
        </Field>
        <Field label="Any fuel you’d never buy?" note="Leave empty and let SahiScore decide — that’s usually best.">
          <Chips value={a.avoidFuels} onChange={(v) => set({ avoidFuels: v })} options={(['petrol', 'diesel', 'cng', 'strong-hybrid', 'ev'] as Fuel[]).map((f) => ({ v: f, label: FUEL_LABEL[f] }))} />
        </Field>
      </>
    ),
  },
  {
    id: 'priorities',
    title: 'What matters most?',
    sub: 'Rate each from 1 to 5. These become the weights in your SahiScore.',
    render: (a, set) => (
      <div className="prio-list">
        {(Object.keys(PRIORITY_LABEL) as Priority[]).map((p) => (
          <div key={p} className="prio">
            <div>
              <div className="prio-label">{PRIORITY_LABEL[p].label}</div>
              <div className="opt-hint">{PRIORITY_LABEL[p].hint}</div>
            </div>
            <div className="dots" role="radiogroup" aria-label={PRIORITY_LABEL[p].label}>
              {([1, 2, 3, 4, 5] as Level[]).map((l) => (
                <button key={l} role="radio" aria-checked={a.priorities[p] === l} aria-label={`${l}`} className={`dot ${a.priorities[p] >= l ? 'on' : ''}`}
                  onClick={() => set({ priorities: { ...a.priorities, [p]: l } })} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'musts',
    title: 'Any must-haves?',
    sub: 'Only real deal-breakers — every must-have pushes you to a pricier trim.',
    render: (a, set) => (
      <>
        <Field label="Features">
          <Chips value={a.mustHave} onChange={(v) => set({ mustHave: v })} options={MUST_HAVES.map((m) => ({ v: m.id, label: m.label }))} />
        </Field>
        <Field label="Body style" note="Leave empty if you’re open — we’ll show you why one shape fits.">
          <Chips value={a.bodies} onChange={(v) => set({ bodies: v })} options={(['hatchback', 'sedan', 'compact-suv', 'suv', 'mpv'] as Body[]).map((b) => ({ v: b, label: BODY_LABEL[b] }))} />
        </Field>
        <details className="more">
          <summary>Brands to leave out</summary>
          <Chips value={a.avoidBrands} onChange={(v) => set({ avoidBrands: v })} options={brands.map((b) => ({ v: b, label: b }))} />
        </details>
      </>
    ),
  },
]

export default function Wizard() {
  const nav = useNavigate()
  const answers = useStore((s) => s.answers)
  const setAnswers = useStore((s) => s.setAnswers)
  const [step, setStep] = useState(0)
  const panel = useRef<HTMLDivElement>(null)
  const countEl = useRef<HTMLSpanElement>(null)
  const dir = useRef(1)

  // live result: cheap enough to rerun on every answer (a few hundred configurations)
  const live = useMemo(() => sahiScore(cars, answers, onroad), [answers])
  const fits = live.ranked.length
  const lead = live.ranked[0]
  // nothing fits: the single changes that would bring cars back
  const fixes = useMemo(() => (fits ? [] : relaxations(cars, answers, onroad)), [fits, answers])
  useEffect(() => {
    if (!fits) trackNoMatch('quiz', STEPS[step].id, answers, live)
  }, [fits, step, answers, live])

  // counter tween
  const shown = useRef({ v: cars.length })
  useEffect(() => {
    const t = gsap.to(shown.current, { v: fits, duration: 0.6, ease: 'power2.out', onUpdate: () => void (countEl.current && (countEl.current.textContent = String(Math.round(shown.current.v)))) })
    return () => void t.kill()
  }, [fits])

  useLayoutEffect(() => {
    if (reducedMotion || !panel.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(panel.current, { x: 40 * dir.current, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' })
      gsap.from('.wz-body > *', { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.05 })
    }, panel)
    return () => ctx.revert()
  }, [step])

  useEffect(() => track('quiz_start', {}), [])

  const go = (n: number) => {
    if (n >= STEPS.length) {
      track('quiz_complete', { fits, budget_lakh: Math.round(answers.budget / 10000) / 10, pay_given: answers.income > 0 ? 1 : 0 })
      useStore.getState().finish()
      nav('/results')
      return
    }
    dir.current = n > step ? 1 : -1
    setStep(Math.max(0, n))
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !(e.target instanceof HTMLSelectElement) && !(e.target instanceof HTMLButtonElement)) go(step + 1)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  })

  const s = STEPS[step]
  return (
    <div className="wizard">
      <div className="wz-top">
        <div className="wrap wz-top-in">
          <div className="wz-progress" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((x, i) => (
              <button key={x.id} className={`seg ${i < step ? 'done' : i === step ? 'now' : ''}`} onClick={() => go(i)} aria-label={`Go to ${x.title}`} />
            ))}
          </div>
          <div className="wz-count mono">
            <span ref={countEl}>{fits}</span> of {cars.length} cars fit
          </div>
        </div>
      </div>

      <div className="wrap wz-grid">
        <section className="wz-panel" ref={panel} key={s.id}>
          <div className="eyebrow">Step {step + 1} of {STEPS.length}</div>
          <h1 className="wz-title">{s.title}</h1>
          <p className="muted wz-sub">{s.sub}</p>
          <div className="wz-body">{s.render(answers, setAnswers)}</div>
        </section>

        <aside className="wz-side card">
          <div className="mono dim small">leading so far</div>
          {lead ? (
            <>
              <div className="teaser">
                <span className="blur">{lead.car.brand} {lead.car.model}</span>
              </div>
              <div className="teaser-score">
                <b>{lead.score.toFixed(0)}</b>
                <span className="dim">/100</span>
              </div>
              <div className="chips">
                <span className="chip cyan">{BODY_LABEL[lead.car.body]}</span>
                <span className="chip">{FUEL_LABEL[lead.pt.fuel]}</span>
              </div>
              <p className="dim small">Finish SahiFit to reveal your top three — with the exact variant, the 5-year cost and whether to wait.</p>
            </>
          ) : (
            <>
              <p className="muted">Nothing fits yet. One of these brings cars back:</p>
              <Fixes fixes={fixes} />
            </>
          )}
          {live.eliminated.slice(0, 3).map((e) => (
            <div key={e.reason} className="elim-line small">
              <span className="dim">{e.reason}</span>
              <span className="mono">−{e.count}</span>
            </div>
          ))}
        </aside>
      </div>

      <div className="wz-foot">
        <div className="wrap wz-foot-in">
          <button className="btn btn-ghost" onClick={() => (step ? go(step - 1) : nav('/'))}>
            <Icon name="back" /> {step ? 'Back' : 'Home'}
          </button>
          <button className="btn btn-primary" onClick={() => go(step + 1)}>
            {step === STEPS.length - 1 ? 'Reveal my cars' : 'Next'} <Icon name="arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}
