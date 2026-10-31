// Development only: look at each showcase car from fixed angles while tuning its profile.
// /dev/cars?car=tata-sierra-ev&view=side
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SHOWCASE, SPEC_BY_ID } from '../webgl/cars/specs'
import { Studio } from '../webgl/Studio'

export default function DevCars() {
  const [q] = useSearchParams()
  const canvas = useRef<HTMLCanvasElement>(null)
  const id = q.get('car') ?? SHOWCASE[0].id
  const view = q.get('view') ?? 'front'
  const shot = q.get('shot') as 'side' | 'front' | 'rear' | 'f34' | 'r34' | null
  useEffect(() => {
    const s = new Studio(canvas.current!, SPEC_BY_ID[id])
    if (shot) s.shoot(shot, Number(q.get('fov') ?? 14))
    else s.view(view as 'front' | 'side' | 'rear' | 'top')
    return () => s.dispose()
  }, [id, view, shot, q])
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(#132433, #04070b)' }}>
      <canvas ref={canvas} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
        {SHOWCASE.map((s) => <a key={s.id} className="chip" href={`/dev/cars?car=${s.id}&view=${view}`}>{s.name}</a>)}
      </div>
    </div>
  )
}
