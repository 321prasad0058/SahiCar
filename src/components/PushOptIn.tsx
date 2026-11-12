// "Get alerts" card: launches, price changes and news on saved cars, by push. Shown on the Garage and Upcoming pages.
// On an iPhone that hasn't added SahiCar to the home screen, it points to the install steps first (Apple only lets
// home-screen web apps send notifications).
import { useEffect, useState } from 'react'
import { openGetApp } from '../lib/install'
import { disablePush, enablePush, pushState, syncPushCars, type PushState } from '../lib/push'
import { track } from '../lib/track'
import { useStore } from '../state/store'
import { Icon } from './Icon'
import { toast } from './Toast'

export function PushOptIn({ from, title, text }: { from: string; title: string; text: string }) {
  const [st, setSt] = useState<PushState>(() => pushState())
  const [busy, setBusy] = useState(false)
  const garage = useStore((s) => s.garage)
  // price alerts follow the garage
  useEffect(() => void syncPushCars(garage), [garage])
  if (st === 'unsupported') return null

  const turnOn = async () => {
    setBusy(true)
    try {
      const next = await enablePush(garage)
      setSt(next)
      track('push_' + next, { from })
      if (next === 'on') toast('Alerts are on')
    } catch {
      toast('Couldn’t turn alerts on. Try again in a moment.')
    } finally {
      setBusy(false)
    }
  }
  const turnOff = async () => {
    setBusy(true)
    setSt(await disablePush().catch(() => pushState()))
    track('push_off', { from })
    setBusy(false)
    toast('Alerts are off')
  }

  return (
    <div className={`card push-optin ${st}`}>
      <span className="push-ico" aria-hidden><Icon name="bell" size={20} /></span>
      <div className="push-copy">
        <b>{st === 'on' ? 'Alerts are on' : title}</b>
        <p className="muted small">
          {st === 'needs-install'
            ? 'On iPhone, alerts work once SahiCar is on your Home Screen. Add it (free, 10 seconds), then turn alerts on from there.'
            : st === 'blocked'
              ? 'Notifications are blocked for this site. Allow them in your browser or phone settings to get alerts.'
              : st === 'on'
                ? 'You’ll hear about launches, price changes and news on the cars you’ve saved. A few a month, never spam.'
                : text}
        </p>
      </div>
      {st === 'off' && <button className="btn btn-primary btn-sm" disabled={busy} onClick={turnOn}>Turn on alerts</button>}
      {st === 'on' && <button className="btn btn-ghost btn-sm" disabled={busy} onClick={turnOff}>Turn off</button>}
      {st === 'needs-install' && <button className="btn btn-primary btn-sm" onClick={() => openGetApp('push', 'ios')}>Add to Home Screen</button>}
    </div>
  )
}
