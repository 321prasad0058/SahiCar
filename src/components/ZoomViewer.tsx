// Full-screen photo viewer for a car page: pinch, scroll or double-tap to zoom (up to 5×) around the point
// you aim at, drag to look around, swipe or use the arrow keys between photos, Esc or × to close.
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

export type ZoomShot = { src: string; alt: string; caption?: string; hd?: string }

const MAX = 5
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export function ZoomViewer({ shots, start, onClose }: { shots: ZoomShot[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const [t, setT] = useState({ s: 1, x: 0, y: 0 })
  const [lowres, setLowres] = useState<Record<string, true>>({})
  const stage = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const pts = useRef(new Map<number, { x: number; y: number }>())
  const gesture = useRef<{ d0: number; s0: number; cx: number; cy: number; x0: number; y0: number; moved: boolean; sx: number; sy: number; t0: number } | null>(null)
  const lastTap = useRef(0)
  const n = shots.length

  // keep the picture covering the screen edges once zoomed: no panning into empty space
  const fit = useCallback((s: number, x: number, y: number) => {
    const el = img.current, st = stage.current
    if (!el || !st) return { s, x, y }
    s = clamp(s, 1, MAX)
    const w = el.clientWidth * s, h = el.clientHeight * s, W = st.clientWidth, H = st.clientHeight
    const mx = Math.max(0, (w - W) / 2), my = Math.max(0, (h - H) / 2)
    return { s, x: clamp(x, -mx, mx), y: clamp(y, -my, my) }
  }, [])
  // zoom to scale s keeping the point (px, py) — relative to the stage centre — still under the finger
  const zoomAt = useCallback((s: number, px: number, py: number) => {
    setT((p) => {
      const k = clamp(s, 1, MAX) / p.s
      return fit(p.s * k, px - (px - p.x) * k, py - (py - p.y) * k)
    })
  }, [fit])
  const centre = (cx: number, cy: number) => {
    const r = stage.current!.getBoundingClientRect()
    return [cx - r.left - r.width / 2, cy - r.top - r.height / 2] as const
  }
  const go = useCallback((d: number) => { setI((v) => (v + d + n) % n); setT({ s: 1, x: 0, y: 0 }) }, [n])

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && n > 1) go(1)
      else if (e.key === 'ArrowLeft' && n > 1) go(-1)
      else if (e.key === '+' || e.key === '=') setT((p) => fit(p.s * 1.5, p.x * 1.5, p.y * 1.5))
      else if (e.key === '-') setT((p) => fit(p.s / 1.5, p.x / 1.5, p.y / 1.5))
    }
    addEventListener('keydown', key)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [go, onClose, n, fit])

  // wheel / trackpad pinch (ctrlKey) zooms around the cursor; registered non-passive so the page doesn't scroll
  useEffect(() => {
    const st = stage.current
    if (!st) return
    const wheel = (e: WheelEvent) => {
      e.preventDefault()
      const [px, py] = centre(e.clientX, e.clientY)
      setT((p) => {
        const k = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025))
        const s = clamp(p.s * k, 1, MAX), kk = s / p.s
        return fit(s, px - (px - p.x) * kk, py - (py - p.y) * kk)
      })
    }
    st.addEventListener('wheel', wheel, { passive: false })
    return () => st.removeEventListener('wheel', wheel)
  }, [fit])

  const down = (e: React.PointerEvent) => {
    stage.current!.setPointerCapture(e.pointerId)
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const p = [...pts.current.values()]
    const cx = p.reduce((a, q) => a + q.x, 0) / p.length, cy = p.reduce((a, q) => a + q.y, 0) / p.length
    const d0 = p.length > 1 ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) : 0
    gesture.current = { d0, s0: t.s, cx, cy, x0: t.x, y0: t.y, moved: false, sx: e.clientX, sy: e.clientY, t0: Date.now() }
  }
  const move = (e: React.PointerEvent) => {
    if (!pts.current.has(e.pointerId) || !gesture.current) return
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current, p = [...pts.current.values()]
    const cx = p.reduce((a, q) => a + q.x, 0) / p.length, cy = p.reduce((a, q) => a + q.y, 0) / p.length
    if (Math.hypot(e.clientX - g.sx, e.clientY - g.sy) > 6) g.moved = true
    if (p.length > 1 && g.d0) {
      // pinch: scale by the change in finger distance, around the starting midpoint, and follow the midpoint
      const s = clamp(g.s0 * (Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) / g.d0), 1, MAX)
      const [px, py] = centre(g.cx, g.cy), k = s / g.s0
      setT(fit(s, px - (px - g.x0) * k + (cx - g.cx), py - (py - g.y0) * k + (cy - g.cy)))
    } else if (t.s > 1) {
      setT(fit(t.s, g.x0 + (cx - g.cx), g.y0 + (cy - g.cy)))
    }
  }
  const up = (e: React.PointerEvent) => {
    const g = gesture.current
    pts.current.delete(e.pointerId)
    if (pts.current.size > 0) {
      // one finger left after a pinch: carry on panning from where things are now
      const q = [...pts.current.values()][0]
      gesture.current = { d0: 0, s0: t.s, cx: q.x, cy: q.y, x0: t.x, y0: t.y, moved: true, sx: q.x, sy: q.y, t0: Date.now() }
      return
    }
    gesture.current = null
    if (!g) return
    const dx = e.clientX - g.sx, dy = e.clientY - g.sy
    // a quick horizontal swipe while not zoomed changes photo
    if (t.s === 1 && n > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - g.t0 < 600) { go(dx < 0 ? 1 : -1); return }
    if (!g.moved) {
      const now = Date.now()
      if (now - lastTap.current < 300) {
        lastTap.current = 0
        const [px, py] = centre(e.clientX, e.clientY)
        if (t.s > 1) setT({ s: 1, x: 0, y: 0 })
        else zoomAt(2.5, px, py)
      } else lastTap.current = now
    }
  }

  const shot = shots[i]
  return createPortal(
    <div className="zv" role="dialog" aria-modal="true" aria-label={`${shot.alt}, photo ${i + 1} of ${n}`}>
      <div
        className={`zv-stage ${t.s > 1 ? 'zoomed' : ''}`}
        ref={stage}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <img
          ref={img}
          key={shot.src}
          src={shot.hd && !lowres[shot.src] ? shot.hd : shot.src}
          // a sharper copy for zooming when one exists; the page's own size otherwise
          onError={() => shot.hd && setLowres((m) => ({ ...m, [shot.src]: true }))}
          alt={shot.alt}
          draggable={false}
          style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})` }}
          className={gesture.current ? 'live' : ''}
        />
      </div>
      <div className="zv-top">
        <span className="zv-count">{n > 1 ? `${i + 1} / ${n}` : ''}{shot.caption ? ` · ${shot.caption}` : ''}</span>
        <button className="zv-btn" aria-label="Close" onClick={onClose}><Icon name="close" size={18} /></button>
      </div>
      {n > 1 && (
        <>
          <button className="zv-btn zv-nav prev" aria-label="Previous photo" onClick={() => go(-1)}><Icon name="back" size={18} /></button>
          <button className="zv-btn zv-nav next" aria-label="Next photo" onClick={() => go(1)}><Icon name="arrow" size={18} /></button>
        </>
      )}
      <div className="zv-bottom">
        <button className="zv-btn" aria-label="Zoom out" disabled={t.s <= 1} onClick={() => setT((p) => fit(p.s / 1.5, p.x / 1.5, p.y / 1.5))}>−</button>
        <span className="zv-hint">{t.s > 1 ? `${t.s.toFixed(1)}×` : 'Pinch or double-tap to zoom'}</span>
        <button className="zv-btn" aria-label="Zoom in" disabled={t.s >= MAX} onClick={() => setT((p) => fit(p.s * 1.5, p.x * 1.5, p.y * 1.5))}>+</button>
      </div>
    </div>,
    document.body,
  )
}
