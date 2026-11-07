// After the sheet: an arrow pointing at the browser's own button, and the one-time "add it" card on an iPhone.
import { useEffect } from 'react'
import { endCoach, endNudge, iosFlow, openGetApp, useInstall } from '../lib/install'
import { track } from '../lib/track'
import { Icon } from './Icon'
import { LogoMark } from './Logo'

const COACH: Record<typeof iosFlow, string> = {
  menu: 'Tap ⋯ below, then Share → Add to Home Screen',
  bar: 'Tap Share below, then Add to Home Screen',
  top: 'Tap Share up here, then Add to Home Screen',
}

export default function AppCoach() {
  const coach = useInstall((s) => s.coach)
  const nudge = useInstall((s) => s.nudge)

  // the arrow stays long enough to follow, then gets out of the way
  useEffect(() => {
    if (!coach) return
    const t = setTimeout(endCoach, 20000)
    return () => clearTimeout(t)
  }, [coach])

  if (coach) {
    return (
      <button className={`coach coach-${iosFlow}`} onClick={endCoach} aria-label="Hide the hint">
        <span className="coach-text">{COACH[iosFlow]}</span>
        <span className="coach-arrow" aria-hidden><Icon name="arrow" size={20} stroke={2.6} /></span>
      </button>
    )
  }
  if (!nudge) return null
  const why = nudge === 'results' ? 'Keep your matches one tap away' : 'Keep this EMI calculator one tap away'
  return (
    <div className="nudge card" role="dialog" aria-label="Add SahiCar to your Home Screen">
      <LogoMark size={44} />
      <div className="nudge-copy">
        <b>{why}</b>
        <span className="muted small">Add SahiCar to your Home Screen. Free, and it opens like an app.</span>
        <div className="nudge-actions">
          <button className="btn btn-primary btn-sm" onClick={() => { endNudge(); openGetApp(`nudge-${nudge}`, 'ios') }}>Show me how</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { endNudge(); track('app_nudge_dismiss', { reason: nudge }) }}>Not now</button>
        </div>
      </div>
      <button className="icon-btn nudge-x" aria-label="Close" onClick={endNudge}><Icon name="close" size={16} /></button>
    </div>
  )
}
