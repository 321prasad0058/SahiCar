// The reveal before the results: the quiz fades to night, two headlight beams flicker on and sweep in to light up
// "Your right car is…", the light flares, and the top car (or the top three, for a signed-in person) is dealt onto
// a cream stage with "Your right car is the Nexon." The cards then fly onto the real cards of the results page,
// which has been rendering unseen behind the night, and the page takes over.
//
// The cars come from the results page itself (its photos, names and how many it shows), so the reveal always shows
// exactly what the page shows: one car to a signed-out visitor, up to three to a signed-in one.
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { resultsReady, setRevealPhase } from '../lib/reveal'

const MIN_LIT = 0.8 // seconds the lit line stays before the flare, so it can be read
const MAX_WAIT = 9 // on a slow connection the headlights simply hold longer; never longer than this
const FLIGHT = 0.75 // the cards' flight onto the page (Results.tsx fades its cards in as they land)

interface Pick {
  src: string
  name: string
  target: DOMRect
  radius: string
  fit: string
  pos: string
  bg: string
}

/** The cards the results page is showing, read from the page behind the reveal. */
function readPicks(): Pick[] {
  return [...document.querySelectorAll<HTMLElement>('.pick-card:not(.unlock)')].slice(0, 3).flatMap((card) => {
    const media = card.querySelector<HTMLElement>('.pick-media')
    const img = media?.querySelector('img')
    // a photo still downloading on a slow connection is left out rather than shown blank
    if (!media || !img?.currentSrc || !img.complete || !img.naturalWidth) return []
    const cs = getComputedStyle(img)
    const box = getComputedStyle(media.querySelector('.car-img') ?? media)
    return [{
      src: img.currentSrc,
      name: card.querySelector('.pick-name')?.textContent?.trim() ?? '',
      target: media.getBoundingClientRect(),
      radius: getComputedStyle(card).borderTopLeftRadius,
      fit: cs.objectFit,
      pos: cs.objectPosition,
      bg: box.backgroundColor,
    }]
  })
}

/**
 * Wait for the results page behind the night: the page, the top car's photo and, if they arrive within a little
 * longer, the other cars' photos. On a slow connection the headlights simply hold; never longer than maxMs.
 */
function waitForResults(maxMs: number): Promise<void> {
  return new Promise((done) => {
    const t0 = performance.now()
    let topAt = 0
    const loaded = (i: HTMLImageElement) => i.complete && i.naturalWidth > 0
    const check = () => {
      const now = performance.now()
      const imgs = [...document.querySelectorAll<HTMLImageElement>('.pick-card:not(.unlock) .pick-media img')]
      if (resultsReady() && imgs.length === 0 && document.querySelector('.results')) return done() // nothing matched
      if (resultsReady() && imgs.length && loaded(imgs[0])) {
        topAt ||= now
        if (imgs.every(loaded) || now - topAt > 2500) return done()
      }
      if (now - t0 > maxMs) return done()
      setTimeout(check, 80)
    }
    check()
  })
}

export default function Reveal() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current!
    const q = gsap.utils.selector(el)
    const [beamL, beamR] = q('.rv-beam')
    const stage = q('.rv-cards')[0] as HTMLElement
    const finalLine = q('.rv-final')[0] as HTMLElement
    let alive = true
    let litAt = 0
    const tls: gsap.core.Timeline[] = []

    // 1 · night falls over the quiz, then the route changes unseen; 2 · the headlights find the line
    const night = gsap
      .timeline()
      .set(el, { autoAlpha: 1 })
      .fromTo(q('.rv-night'), { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.inOut' })
      .call(() => {
        setRevealPhase('hold')
        window.scrollTo(0, 0)
      })
      .set([beamL, beamR], { opacity: 0 })
      .set(beamL, { rotation: 38 })
      .set(beamR, { rotation: -38 })
      .to([beamL, beamR], { opacity: 1, duration: 0.05, repeat: 3, yoyo: true }, '+=0.2')
      .to([beamL, beamR], { opacity: 1, duration: 0.05 })
      .to(beamL, { rotation: 11, duration: 0.85, ease: 'power3.inOut' })
      .to(beamR, { rotation: -11, duration: 0.85, ease: 'power3.inOut' }, '<')
      .fromTo(q('.rv-brand'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, '<0.3')
      .fromTo(q('.rv-word'), { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '<0.1')
      .fromTo(q('.rv-dot'), { autoAlpha: 0.15 }, { autoAlpha: 1, duration: 0.3, stagger: { each: 0.18, repeat: -1, yoyo: true } }, '>-0.1')
      .call(() => {
        litAt = performance.now()
        void reveal()
      }, [], '<')
    tls.push(night)

    // 3 · the flare, the cards, and their flight onto the page
    async function reveal() {
      await waitForResults(MAX_WAIT * 1000)
      const lit = (performance.now() - litAt) / 1000
      if (lit < MIN_LIT) await new Promise((r) => setTimeout(r, (MIN_LIT - lit) * 1000))
      if (!alive) return

      const picks = readPicks()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const phone = vw < 720
      // the winner in front, the other two fanned behind it (only when the page shows them)
      const w = Math.min(picks.length > 1 ? 520 : 600, vw * (phone ? (picks.length > 1 ? 0.6 : 0.84) : 0.42))
      // the same shape as the page's photo boxes, so the flight is a plain move-and-scale (no stretching, no layout)
      const t0 = picks[0]?.target
      const h = w * (t0 && t0.width > 0 ? t0.height / t0.width : 0.62)
      const cx = vw / 2
      const cy = vh * (phone ? 0.4 : 0.42)
      const fan = [
        { x: 0, y: 0, r: 0, s: 1, z: 3 },
        { x: -w * (phone ? 0.36 : 0.62), y: h * (phone ? 0.2 : 0.14), r: -7, s: 0.78, z: 2 },
        { x: w * (phone ? 0.36 : 0.62), y: h * (phone ? 0.2 : 0.14), r: 7, s: 0.78, z: 1 },
      ]
      const cards = picks.map((p, i) => {
        const c = document.createElement('div')
        c.className = 'rv-card'
        const land = p.target.width > 0 ? p.target.width / w : 1
        c.style.cssText = `left:${cx - w / 2}px;top:${cy - h / 2}px;width:${w}px;height:${h}px;z-index:${fan[i].z};border-radius:calc(${p.radius} / ${land});background:${p.bg}`
        const img = document.createElement('img')
        img.src = p.src
        img.alt = ''
        img.style.objectFit = p.fit
        img.style.objectPosition = p.pos
        c.appendChild(img)
        stage.appendChild(c)
        return c
      })
      // the flare starts now; behind it, wait (briefly) until the cards' photos are decoded, so none is ever blank
      const flare = gsap.to(q('.rv-flash'), { opacity: 1, duration: 0.3, ease: 'power2.in' })
      tls.push(gsap.timeline().add(flare))
      await Promise.all([
        new Promise((r) => setTimeout(r, 300)),
        Promise.race([Promise.all(cards.map((c) => c.querySelector('img')!.decode().catch(() => {}))), new Promise((r) => setTimeout(r, 900))]),
      ])
      if (!alive) return

      const top = picks[0]?.name
      if (top) finalLine.querySelector('.rv-car')!.textContent = top
      else finalLine.style.display = 'none'
      gsap.set(finalLine, { top: cy + h / 2 + (phone ? 28 : 36) })

      const tl = gsap
        .timeline()
        .set(q('.rv-flash'), { opacity: 1 })
        .set([q('.rv-night'), beamL, beamR, q('.rv-text')], { autoAlpha: 0 })
        .set(q('.rv-cream'), { opacity: 1 })
        .to(q('.rv-flash'), { opacity: 0, duration: 0.55, ease: 'power2.out' })
      cards.forEach((c, i) =>
        tl.fromTo(
          c,
          { x: 0, y: vh * 0.08, rotation: 0, scale: 0.4, opacity: 0 },
          { x: fan[i].x, y: fan[i].y, rotation: fan[i].r, scale: fan[i].s, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' },
          i === 0 ? '<0.05' : '<0.08',
        ),
      )
      tl.fromTo(finalLine, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')

      // 4 · hand over: the page appears and each card lands on its real card
      tl.call(() => setRevealPhase('opening'), [], '+=0.85')
        .to(finalLine, { autoAlpha: 0, y: -10, duration: 0.3, ease: 'power2.in' }, '<')
        .to(q('.rv-cream'), { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, '<0.1')
      picks.forEach((p, i) => {
        const t = p.target
        const onScreen = t.width > 0 && t.top < vh && t.bottom > 0
        tl.to(
          cards[i],
          onScreen
            ? { x: t.left + t.width / 2 - cx, y: t.top + t.height / 2 - cy, rotation: 0, scale: t.width / w, duration: FLIGHT, ease: 'power3.inOut' }
            : { opacity: 0, scale: 0.9, duration: 0.4 },
          i === 0 ? '<-0.1' : '<0.05',
        )
      })
      tl.to(el, { autoAlpha: 0, duration: 0.2 }, `>+0.05`).call(() => setRevealPhase('idle'))
      tls.push(tl)
    }

    // torn down early (the person navigated away): stop, and never leave the results waiting
    return () => {
      alive = false
      tls.forEach((t) => t.kill())
      setRevealPhase('idle')
    }
  }, [])

  return (
    <div className="rv" ref={root} aria-live="polite">
      <div className="rv-night" />
      <div className="rv-beam rv-beam-l" aria-hidden="true" />
      <div className="rv-beam rv-beam-r" aria-hidden="true" />
      <div className="rv-text">
        <div className="rv-brand">
          <img src="/logo.svg" alt="" width="40" height="40" />
          <span className="logo-word">Sahi<span>Car</span></span>
        </div>
        <p className="rv-line">
          {['Your', 'right', 'car', 'is'].map((w) => (
            <span className="rv-mask" key={w}><span className="rv-word">{w}</span></span>
          ))}
          <span className="rv-dots"><span className="rv-dot">.</span><span className="rv-dot">.</span><span className="rv-dot">.</span></span>
        </p>
      </div>
      <div className="rv-cream" />
      <div className="rv-cards" />
      <p className="rv-final">Your right car is the <span className="rv-car" />.</p>
      <div className="rv-flash" />
    </div>
  )
}
