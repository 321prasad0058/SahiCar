import { coarsePointer, reducedMotion } from './perf'
import { ScrollTrigger, SplitText, gsap } from './scroll'

/** Scroll-triggered reveals for everything marked up with data-split / data-reveal / data-stagger. */
export function setupReveals(root: HTMLElement) {
  const ctx = gsap.context(() => {
    if (reducedMotion) return
    root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words,chars', mask: 'words' })
      gsap.from(split.chars, { yPercent: 110, rotate: 5, duration: 1, ease: 'expo.out', stagger: 0.018, scrollTrigger: { trigger: el, start: 'top 86%' } })
    })
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 44, autoAlpha: 0, filter: 'blur(8px)', duration: 1, ease: 'power3.out', clearProps: 'filter', scrollTrigger: { trigger: el, start: 'top 88%' } })
    })
    root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((el) => {
      gsap.from(el.children, { y: 28, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
  }, root)
  return () => ctx.revert()
}

/** Count-ups on [data-count]. */
export function setupCounts(root: HTMLElement, delay = 0) {
  const triggers: ScrollTrigger[] = []
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count)
    const suf = el.dataset.suffix ?? ''
    const fmt = (v: number) => `${Math.round(v).toLocaleString('en-IN')}${suf}`
    if (reducedMotion) {
      el.textContent = fmt(to)
      return
    }
    el.textContent = fmt(0)
    const o = { v: 0 }
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        once: true,
        onEnter: () => gsap.to(o, { v: to, duration: 1.8, delay, ease: 'power3.out', onUpdate: () => void (el.textContent = fmt(o.v)) }),
      }),
    )
  })
  return () => triggers.forEach((t) => t.kill())
}

/** Buttons that lean toward the pointer. */
export function setupMagnetic(root: HTMLElement) {
  if (coarsePointer || reducedMotion) return () => {}
  const move = (e: PointerEvent) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-magnetic]')
    if (!el) return
    const r = el.getBoundingClientRect()
    gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.5, ease: 'power3.out' })
  }
  const out = (e: PointerEvent) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-magnetic]')
    if (el && !el.contains(e.relatedTarget as Node)) gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
  }
  root.addEventListener('pointermove', move)
  root.addEventListener('pointerout', out)
  return () => {
    root.removeEventListener('pointermove', move)
    root.removeEventListener('pointerout', out)
  }
}

/** Card tilt toward the pointer, for [data-tilt]. */
export function setupTilt(root: HTMLElement) {
  if (coarsePointer || reducedMotion) return () => {}
  const move = (e: PointerEvent) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-tilt]')
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, { rotateY: x * 7, rotateX: -y * 7, transformPerspective: 900, duration: 0.5, ease: 'power3.out' })
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const out = (e: PointerEvent) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-tilt]')
    if (el && !el.contains(e.relatedTarget as Node)) gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' })
  }
  root.addEventListener('pointermove', move)
  root.addEventListener('pointerout', out)
  return () => {
    root.removeEventListener('pointermove', move)
    root.removeEventListener('pointerout', out)
  }
}
