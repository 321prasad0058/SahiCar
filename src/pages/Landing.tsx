import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { EmiTeaser } from '../components/EmiTeaser'
import { Icon } from '../components/Icon'
import summary from '../data/summary.json'
import { expectedLabel, monthsUntil } from '../engine/timing'
import { lakh } from '../lib/format'
import { setupCounts, setupReveals } from '../lib/motion'
import { canRun3D, reducedMotion, whenIdle } from '../lib/perf'
import { SplitText, gsap, startScroll } from '../lib/scroll'
import { useStore } from '../state/store'
import type { HeroWorld } from '../webgl/HeroWorld'

// Body styles, never named cars: SahiCar doesn't promote any model. The 3D car on stage is a shape for each
// style; the facts are across every model of that style in our data. `car` is the 3D showcase index.
type StyleKey = keyof typeof summary.styles
const STYLES: { key: StyleKey; car: number; kicker: string; short: string; line: string; best: string; explore: string }[] = [
  { key: 'suv', car: 3, kicker: 'SUV', short: 'SUV', line: 'Commanding view, clearance for broken roads, room for the family trip — and the widest choice of fuels.', best: 'Bad roads, mixed use, most buyers today', explore: 'body=suv' },
  { key: 'sedan', car: 2, kicker: 'Sedan', short: 'Sedan', line: 'Lowest cabin noise, the biggest boot for the money, the calmest on a long highway run.', best: 'Highway families, chauffeur-driven', explore: 'body=sedan' },
  { key: 'ev', car: 0, kicker: 'Electric', short: 'EV', line: 'With a charger at home an EV costs a rupee or two per km. SahiScore tells you if your life fits one.', best: 'Home charging, predictable daily km', explore: 'fuel=ev' },
  { key: 'hatchback', car: 1, kicker: 'Hatchback', short: 'Hatch', line: 'Slips through traffic, parks anywhere, cheapest to run and repair.', best: 'City commuters, first cars', explore: 'body=hatchback' },
  { key: 'mpv', car: 4, kicker: 'MPV', short: 'MPV', line: 'Three real rows: grandparents in the middle, kids at the back, luggage still fits.', best: 'Joint families, 6–7 regular riders', explore: 'body=mpv' },
]
const DWELL = 2 // seconds each style stays on stage

function styleFacts(k: StyleKey) {
  const s = summary.styles[k]
  return [
    { v: String(s.models), l: 'models' },
    { v: `${lakh(s.priceLow, 1)}–${lakh(s.priceHigh, 0)}`, l: 'price range' },
    { v: `${s.fiveStar}%`, l: '5★ crash rated' },
  ]
}

const STEPS = [
  { i: 'users', h: 'Tell us how you live', p: 'Budget, city, daily kilometres, the roads outside your house, who rides with you. Nine short screens — no specs, no jargon.' },
  { i: 'wallet', h: 'We cost every variant', p: 'Every fuel, gearbox and trim in your budget gets a true 5-year bill: on-road price for your state, real-world mileage, service, insurance, EMI interest, minus resale.' },
  { i: 'shield', h: 'We check safety and fit', p: 'Bharat NCAP stars, airbags and ESC, ground clearance against your roads, boot and rear-seat space against your family.' },
  { i: 'spark', h: 'Top 3 — and buy or wait', p: 'Three ranked picks with the exact variant to buy, the reasons in plain words, the catches, and whether a new model is about to land.' },
]

const VERSUS = [
  ['Who pays them', 'Dealers and carmakers, per lead or ad', 'Nobody. Free, no leads sold'],
  ['What you get', 'Filters and 200 spec rows', 'Three ranked answers, with reasons'],
  ['Running cost', 'Claimed ARAI mileage', 'Real-world mileage and the 5-year total'],
  ['Variant advice', 'All variants listed', 'The one trim worth buying for you'],
  ['Your phone number', 'Needed to see the on-road price', 'Never asked for'],
  ['Upcoming cars', 'A separate news page', 'Wired into every pick: buy now or wait'],
]

export default function Landing() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLElement>(null)
  const zone = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const world = useRef<HeroWorld | null>(null)
  const [live3d, setLive3d] = useState(false)
  const done = useStore((s) => s.done)

  // the style on stage, how many times it has cycled (restarts the progress bar), and why it might be paused
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [hover, setHover] = useState(false)
  const [offscreen, setOffscreen] = useState(false)
  // the 2-second clock only runs once the car is actually in view: after the 3D has loaded and its opening
  // sweep has finished, and — for each later car — after it has finished rolling in
  const [ready, setReady] = useState(false)
  const [arriving, setArriving] = useState(false)
  const paused = hover || offscreen || reducedMotion || !ready || arriving
  const activeRef = useRef(0)
  const swapSeq = useRef(0)

  const go = useCallback((i: number, dir: 1 | -1 = 1) => {
    const n = (i + STYLES.length) % STYLES.length
    activeRef.current = n
    setActive(n)
    setCycle((c) => c + 1)
    const w = world.current
    if (!w) return
    const seq = ++swapSeq.current
    setArriving(true)
    w.show(STYLES[n].car, dir).then(() => {
      if (seq === swapSeq.current) setArriving(false)
    })
  }, [])
  const next = useCallback(() => go(active + 1, 1), [go, active])
  const prev = useCallback(() => go(active - 1, -1), [go, active])

  // text first: the headline animates in immediately, whatever the 3D is doing
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(['[data-hero]', '.hero-in'], { autoAlpha: 1 })
        return
      }
      const tl = gsap.timeline({ delay: 0.1 })
      root.current!.querySelectorAll<HTMLElement>('[data-hero]').forEach((line, i) => {
        const split = SplitText.create(line, { type: 'chars', mask: 'chars' })
        tl.from(split.chars, { yPercent: 120, duration: 1.2, ease: 'expo.out', stagger: 0.03, onComplete: () => split.revert() }, i * 0.12)
      })
      tl.set(['[data-hero]'], { autoAlpha: 1 }, 0)
      tl.fromTo('.hero-in', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.07 }, 0.45)
    }, root)
    return () => ctx.revert()
  }, [])

  // frame the car inside the stage rectangle, whatever the screen
  const frame = useCallback(() => {
    const c = canvas.current
    const z = zone.current
    if (!c || !z || !world.current) return
    const cr = c.getBoundingClientRect()
    const zr = z.getBoundingClientRect()
    if (!cr.width || !cr.height) return
    world.current.setFocus(
      (zr.left + zr.width / 2 - cr.left) / cr.width,
      (zr.top + zr.height / 2 - cr.top) / cr.height,
      zr.width / cr.width,
      zr.height / cr.height,
    )
  }, [])

  // the 3D night drive, loaded after first paint and only where it will run well
  useEffect(() => {
    const stopScroll = startScroll()
    let w: HeroWorld | null = null
    let disposed = false
    const onResize = () => {
      w?.layout()
      frame()
    }
    // without 3D (or if it is very slow to arrive) the captions still cycle, after the headline has come in
    const fallback = window.setTimeout(() => setReady(true), canRun3D() ? 8000 : 900)
    if (canRun3D()) {
      import('../webgl/HeroWorld')
        .then(({ HeroWorld }) => {
          if (disposed) return
          w = new HeroWorld(
            canvas.current!,
            {
              onFirstFrame: () => {
                setLive3d(true)
                const intro = w?.intro(scrollY > innerHeight * 0.5)
                // start the clock once the opening sweep has brought the first car fully into view
                if (!intro || intro.duration() === 0) setReady(true)
                else intro.eventCallback('onComplete', () => setReady(true))
              },
              onFail: () => {
                setLive3d(false)
                setReady(true)
              },
            },
            // if the captions already moved on (slow load), start on the car they are showing
            STYLES[activeRef.current].car,
          )
          world.current = w
          frame()
        })
        .catch(() => {
          setLive3d(false)
          setReady(true)
        })
    }
    addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    if (zone.current) ro.observe(zone.current)
    // the visitor will most likely press "Find my car" next
    whenIdle(() => void import('./Wizard'))
    return () => {
      disposed = true
      clearTimeout(fallback)
      removeEventListener('resize', onResize)
      ro.disconnect()
      stopScroll()
      w?.dispose()
      world.current = null
    }
  }, [frame])

  // stop the show (and the GPU) when the hero is scrolled away
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      const on = e.intersectionRatio > 0.15
      setOffscreen(!on)
      world.current?.setVisible(on)
    }, { threshold: [0, 0.15, 0.5] })
    if (hero.current) io.observe(hero.current)
    return () => io.disconnect()
  }, [])

  // the caption follows the car
  useLayoutEffect(() => {
    if (reducedMotion || !card.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.sc-anim', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out', delay: 0.1 })
    }, card)
    return () => ctx.revert()
  }, [active])

  useEffect(() => setupReveals(root.current!), [])
  useEffect(() => setupCounts(root.current!, 0.6), [])

  // swipe the stage on touch screens
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const onDown = (e: PointerEvent) => void (swipe.current = { x: e.clientX, y: e.clientY })
  const onUp = (e: PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.5) (dx < 0 ? next : prev)()
  }
  const onTabKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
    else return
    e.preventDefault()
    requestAnimationFrame(() => card.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus())
  }

  const st = STYLES[active]
  return (
    <div className="landing" ref={root}>
      {/* hero: the cars change right here, no scrolling needed */}
      <section className="hero" ref={hero}>
        <div className={`hero-poster ${live3d ? 'gone' : ''}`} aria-hidden>
          <div className="poster-road" />
          <div className="poster-bar" />
        </div>
        <canvas ref={canvas} className={`hero-canvas ${live3d ? 'on' : ''}`} aria-hidden />
        <div className="hero-vignette" aria-hidden />

        <div className="wrap hero-wrap">
          <div className="hero-text">
            <div className="eyebrow hero-in">India’s free, unbiased car advisor</div>
            <h1 className="hero-title">
              <span data-hero>The right car.</span>
              <span data-hero className="grad">Honestly.</span>
            </h1>
            <p className="hero-sub hero-in">
              No dealer leads. No sponsored rankings.{' '}
              <span className="more">
                Nine quick questions about your life, and SahiScore ranks every car, fuel and variant on what it will really cost you, how safe it
                is, and whether it fits your roads and your family.
              </span>
              <span className="less">Nine quick questions, and SahiScore finds the car that fits your life.</span>
            </p>
            <div className="hero-cta hero-in">
              <Link to="/sahifit" className="btn btn-primary">
                Find my car in 2 minutes <Icon name="arrow" />
              </Link>
              {done ? (
                <Link to="/results" className="btn btn-ghost">See my matches</Link>
              ) : (
                <Link to="/explore" className="btn btn-ghost">Explore {summary.cars} cars</Link>
              )}
            </div>
            <div className="hero-stats hero-in">
              <div><b data-count={summary.cars}>{summary.cars}</b><span>models scored</span></div>
              <div><b data-count={summary.variants}>{summary.variants}</b><span>variants costed</span></div>
              <div><b data-count={summary.brands}>{summary.brands}</b><span>brands</span></div>
              <div><b data-count={summary.upcoming}>{summary.upcoming}</b><span>launches tracked</span></div>
            </div>
          </div>

          {/* the stage: the car fills .car-zone; the card says what you're looking at */}
          <div className="stage hero-in" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
            <div className="car-zone" ref={zone} onPointerDown={onDown} onPointerUp={onUp} aria-hidden />
            <div className={`style-card ${paused ? 'paused' : ''}`} ref={card} aria-roledescription="carousel" aria-label="Body styles">
              <div className="sc-tabs" role="tablist" aria-label="Body style" onKeyDown={onTabKey}>
                {STYLES.map((s, i) => (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={i === active}
                    tabIndex={i === active ? 0 : -1}
                    className={`sc-tab ${i === active ? 'on' : ''} ${i < active ? 'past' : ''}`}
                    onClick={() => i !== active && go(i, i > active ? 1 : -1)}
                  >
                    <span className="sc-tab-label">
                      <span className="long">{s.kicker}</span>
                      <span className="short">{s.short}</span>
                    </span>
                    <span className="sc-tab-bar">
                      {i === active && !reducedMotion && (
                        <span key={cycle} className="sc-tab-fill" style={{ animationDuration: `${DWELL}s` }} onAnimationEnd={next} />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <div className="sc-body" role="tabpanel" aria-live="polite" key={st.key}>
                <div className="sc-head sc-anim">
                  <h2 className="sc-kicker grad">{st.kicker}</h2>
                  <div className="sc-nav">
                    <button className="icon-btn" aria-label="Previous style" onClick={prev}><Icon name="back" size={16} /></button>
                    <button className="icon-btn" aria-label="Next style" onClick={next}><Icon name="arrow" size={16} /></button>
                  </div>
                </div>
                <p className="sc-line sc-anim">{st.line}</p>
                <div className="sc-facts sc-anim">
                  {styleFacts(st.key).map((f) => (
                    <div key={f.l}><b>{f.v}</b><span>{f.l}</span></div>
                  ))}
                </div>
                <div className="sc-foot sc-anim">
                  <span className="mono dim small">Best for · {st.best}</span>
                  <Link to={`/explore?${st.explore}`} className="link-arrow small">See all {summary.styles[st.key].models} <Icon name="arrow" size={14} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="how">
        <div className="wrap">
          <div className="eyebrow" data-reveal>How SahiScore works</div>
          <h2 className="section-title" data-split>A car advisor that does the maths.</h2>
          <div className="how-grid" data-stagger>
            {STEPS.map((s, i) => (
              <div key={s.h} className="how-card card">
                <div className="how-n mono">0{i + 1}</div>
                <div className="how-i"><Icon name={s.i} size={22} /></div>
                <h3>{s.h}</h3>
                <p className="muted">{s.p}</p>
              </div>
            ))}
          </div>
          <div className="formula card" data-reveal>
            <div className="mono small dim">the SahiScore, simplified</div>
            <div className="formula-eq">
              <span>SahiScore</span> = Σ <span className="c">weight</span><sub>you</sub> × <span className="g">fit</span><sub>car</sub> × <span className="a">deal-breakers</span>
            </div>
            <div className="formula-dims">
              {['5-yr cost', 'Fuel match', 'Safety', 'Space', 'Roads', 'Easy to drive', 'Budget fit', 'Features', 'Ownership', 'Performance', 'Future-proof'].map((d) => (
                <span key={d} className="chip">{d}</span>
              ))}
            </div>
            <Link to="/about" className="link-arrow">Read the full method <Icon name="arrow" size={14} /></Link>
          </div>
        </div>
      </section>

      {/* why us */}
      <section className="versus">
        <div className="wrap">
          <div className="eyebrow" data-reveal id="promise">Our no-bias promise</div>
          <h2 className="section-title" data-split>Car portals sell you. We don’t.</h2>
          <p className="section-sub muted" data-reveal>
            Most car sites earn when you fill a lead form or click a sponsored listing. SahiCar has no dealer deals, no paid placements, and
            never asks for your phone number.
          </p>
          <div className="vs card" data-reveal>
            <div className="vs-row vs-head">
              <span />
              <span className="dim">Typical car portal</span>
              <span className="grad">SahiCar</span>
            </div>
            {VERSUS.map(([k, them, us]) => (
              <div key={k} className="vs-row">
                <span className="muted">{k}</span>
                <span className="dim">{them}</span>
                <span><Icon name="check" size={16} /> {us}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* buy or wait */}
      {/* a hook into the EMI calculator, after the USPs */}
      <section className="emi-home">
        <div className="wrap">
          <EmiTeaser />
        </div>
      </section>

      <section className="soon">
        <div className="wrap">
          <div className="eyebrow" data-reveal>Buy now or wait?</div>
          <h2 className="section-title" data-split>Don’t buy last year’s car by accident.</h2>
          <p className="section-sub muted" data-reveal>We track {summary.upcoming} upcoming launches and facelifts, and flag them on every recommendation.</p>
          <div className="soon-grid" data-stagger>
            {summary.soon.map((u) => {
              const m = monthsUntil(u.expected) ?? 0
              return (
                <div key={u.id} className="soon-card card">
                  <div className="soon-when mono">{m <= 0 ? 'this month' : `~${m} mo`} · {expectedLabel(u.expected)}</div>
                  <div className="dim small">{u.brand}</div>
                  <h3>{u.model}</h3>
                  <div className="chips">
                    <span className={`chip ${u.status === 'confirmed' ? 'green' : 'amber'}`}>{u.status}</span>
                    {u.price && <span className="chip">from {lakh(u.price.min)}</span>}
                  </div>
                </div>
              )
            })}
          </div>
          <Link to="/upcoming" className="link-arrow" data-reveal>All upcoming cars <Icon name="arrow" size={14} /></Link>
        </div>
      </section>

      {/* final call */}
      <section className="final">
        <div className="wrap final-in">
          <h2 className="section-title" data-split>Two minutes. Three honest answers.</h2>
          <p className="muted" data-reveal>Free forever. No sign-up needed to see your results.</p>
          <Link to="/sahifit" className="btn btn-primary btn-xl" data-reveal>
            Start SahiFit <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  )
}
