import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { reducedMotion } from './perf'

gsap.registerPlugin(ScrollTrigger, SplitText)

export let lenis: Lenis | null = null

/** Smooth scrolling driven by GSAP's ticker, so the page, ScrollTrigger and the 3D world share one clock. */
export function startScroll(onFrame: () => void = () => {}) {
  if (!reducedMotion) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1.4 })
    lenis.on('scroll', ScrollTrigger.update)
  }
  const tick = (time: number) => {
    lenis?.raf(time * 1000)
    onFrame()
  }
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export { gsap, ScrollTrigger, SplitText }
