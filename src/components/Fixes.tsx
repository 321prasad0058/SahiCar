// The one-tap changes that bring cars back when nothing fits.
import type { Relaxation } from '../engine/sahiscore'
import { useStore } from '../state/store'

export function Fixes({ fixes }: { fixes: Relaxation[] }) {
  const setAnswers = useStore((s) => s.setAnswers)
  if (!fixes.length) return <p className="dim small">Try a bigger budget or fewer must-haves.</p>
  return (
    <div className="fixes">
      {fixes.map((f) => (
        <button key={f.label} className="fix" onClick={() => setAnswers(f.patch)}>
          <span>{f.label}</span>
          <span className="mono dim">{f.fits} {f.fits === 1 ? 'car' : 'cars'}</span>
        </button>
      ))}
    </div>
  )
}
