import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/perf'
import { gsap } from '../lib/scroll'

/** SahiScore out of 100, drawn as a ring that fills and counts up. */
export function ScoreRing({ score, size = 88, delay = 0 }: { score: number; size?: number; delay?: number }) {
  const arc = useRef<SVGCircleElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const r = 42
  const C = 2 * Math.PI * r
  useEffect(() => {
    const o = { v: 0 }
    const draw = () => {
      if (arc.current) arc.current.style.strokeDashoffset = String(C * (1 - o.v / 100))
      if (num.current) num.current.textContent = o.v.toFixed(0)
    }
    if (reducedMotion) {
      o.v = score
      draw()
      return
    }
    const t = gsap.to(o, { v: score, duration: 1.6, delay, ease: 'power3.out', onUpdate: draw })
    return () => void t.kill()
  }, [score, delay, C])
  const hue = score >= 75 ? 'var(--green)' : score >= 60 ? 'var(--cyan)' : 'var(--amber)'
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} className="ring-bg" />
        <circle ref={arc} cx="50" cy="50" r={r} className="ring-fg" style={{ stroke: hue, strokeDasharray: C, strokeDashoffset: C }} />
      </svg>
      <span className="ring-num" ref={num}>0</span>
      <span className="ring-label">SahiScore</span>
    </div>
  )
}
