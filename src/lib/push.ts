// Alerts by web push: launches, price changes, and news about the cars you saved. Standard Web Push (VAPID), so it
// works in Chrome/Edge/Firefox on Android and computers, and on iPhone (iOS 16.4+) once SahiCar is on the home
// screen. The subscription (an address only this browser's push service can deliver to, plus the saved car ids) is
// kept in Firestore under a hash of that address: anyone can add or remove their own, nobody can read them from the
// app. scripts/push-send.mjs sends the messages after a data update goes live.
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../fb/firebase'

const KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined
const STORE = 'sc-push'

export type PushState = 'unsupported' | 'needs-install' | 'blocked' | 'off' | 'on'

const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const standalone = matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true

export function pushState(): PushState {
  if (!KEY || !db || !('serviceWorker' in navigator)) return 'unsupported'
  // iPhone only offers push to web apps added to the home screen
  if (!('PushManager' in window) || !('Notification' in window)) return ios && !standalone ? 'needs-install' : 'unsupported'
  if (Notification.permission === 'denied') return 'blocked'
  return Notification.permission === 'granted' && localStorage.getItem(STORE) ? 'on' : 'off'
}

const b64 = (s: string) => {
  const raw = atob((s + '='.repeat((4 - (s.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(raw, (c) => c.charCodeAt(0))
}
async function idOf(endpoint: string) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint))
  return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, '0')).join('')
}

async function save(sub: PushSubscription, cars: string[]) {
  const j = sub.toJSON()
  const id = await idOf(sub.endpoint)
  await setDoc(doc(db!, 'push', id), {
    sub: { endpoint: sub.endpoint, keys: { p256dh: j.keys?.p256dh ?? '', auth: j.keys?.auth ?? '' } },
    cars: cars.slice(0, 50),
    topics: ['launches', 'prices'],
    platform: ios ? 'ios' : /Android/.test(navigator.userAgent) ? 'android' : 'desktop',
    at: serverTimestamp(),
  })
  localStorage.setItem(STORE, id)
}

/** Ask for permission (call from a tap) and subscribe. Returns the new state. */
export async function enablePush(cars: string[]): Promise<PushState> {
  const st = pushState()
  if (st === 'unsupported' || st === 'needs-install') return st
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return perm === 'denied' ? 'blocked' : 'off'
  const reg = await navigator.serviceWorker.ready
  const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(KEY!) }))
  await save(sub, cars)
  return 'on'
}

/** Keep the saved-car list on the subscription in step with the garage, so price alerts follow it. */
export async function syncPushCars(cars: string[]) {
  if (pushState() !== 'on') return
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) await save(sub, cars)
  } catch { /* offline: the next change syncs it */ }
}

export async function disablePush(): Promise<PushState> {
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    // remove the stored subscription by the id saved when alerts were turned on (and by the current one, if different)
    const ids = new Set([localStorage.getItem(STORE), sub ? await idOf(sub.endpoint) : null].filter(Boolean) as string[])
    for (const id of ids) await deleteDoc(doc(db!, 'push', id)).catch(() => {})
    await sub?.unsubscribe()
  } finally {
    localStorage.removeItem(STORE)
  }
  return pushState()
}
