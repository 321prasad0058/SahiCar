// A swipeable photo carousel for a car page: the car's main photo first, then extra studio photos (src/data/gallery.json).
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from './Icon'

export type Shot = { src: string; caption: string }

export function Gallery({ first, shots, alt }: { first: ReactNode; shots: Shot[]; alt: string }) {
  const [i, setI] = useState(0)
  const n = shots.length + 1
  const go = (d: number) => setI((v) => (v + d + n) % n)
  const x0 = useRef<number | null>(null)
  useEffect(() => setI(0), [shots])
  return (
    <div
      className="gal"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={`${alt} photos`}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (x0.current == null) return
        const dx = e.changedTouches[0].clientX - x0.current
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
        x0.current = null
      }}
    >
      <div className="gal-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        <div className="gal-slide" aria-hidden={i !== 0}>{first}</div>
        {shots.map((s, k) => (
          <div className="gal-slide" key={s.src} aria-hidden={i !== k + 1}>
            <div className="car-img loaded">
              <img src={s.src} alt={`${alt}: ${s.caption}`} loading="lazy" decoding="async" />
            </div>
            <div className="gal-cap">{s.caption}</div>
          </div>
        ))}
      </div>
      <button className="gal-nav prev" aria-label="Previous photo" onClick={() => go(-1)}><Icon name="back" size={16} /></button>
      <button className="gal-nav next" aria-label="Next photo" onClick={() => go(1)}><Icon name="arrow" size={16} /></button>
      <div className="gal-dots">
        {Array.from({ length: n }, (_, k) => (
          <button key={k} className={k === i ? 'on' : ''} aria-label={`Photo ${k + 1} of ${n}`} onClick={() => setI(k)} />
        ))}
      </div>
    </div>
  )
}
