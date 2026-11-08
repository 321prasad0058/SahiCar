// Installing SahiCar as an app, free and without the stores. Android (Chrome, Edge, Samsung Internet) installs it in one
// tap from the browser's own prompt; an iPhone adds it from Safari's Share menu. Both open full screen with an icon.
import { create } from 'zustand'
import { toast } from '../components/Toast'
import { track } from './track'

export type Platform = 'android' | 'ios' | 'desktop'

interface InstallPrompt extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface InstallState {
  open: boolean
  from: string
  /** the phone chosen on the page's own button, if any */
  pick: Platform | null
  /** the browser's install prompt, when it has offered one (Android and desktop Chromium) */
  prompt: InstallPrompt | null
  installed: boolean
  /** the arrow left on screen pointing at the browser's own button, after "Show me where" */
  coach: boolean
  /** the one-time "add to home screen" card, and what the person had just done */
  nudge: 'results' | 'emi' | null
}

const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent
// iPadOS reports itself as a Mac; a touch screen gives it away
const ipad = /Macintosh/.test(ua) && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1

export const platform: Platform = /iPhone|iPad|iPod/.test(ua) || ipad ? 'ios' : /Android/.test(ua) ? 'android' : 'desktop'

/** In-app browsers (Instagram, WhatsApp, Facebook…) can't install anything; the page has to open in the real browser first. */
export const inAppBrowser = /FBAN|FBAV|Instagram|Line\/|WhatsApp|Snapchat|; wv\)|GSA\//.test(ua)
/** On iPhone only Safari (and, from iOS 16.4, Chrome and Edge) can add a site to the home screen. */
export const iosBrowser: 'safari' | 'other' = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua) ? 'other' : 'safari'
// iOS 26 froze the OS number in the user agent (it still says 18_x); Safari's own Version/ number is the true one
const safariMajor = Number(/Version\/(\d+)/.exec(ua)?.[1] ?? 0)
/**
 * Where Share lives on this iPhone. menu: Safari 26 tucks it under the ⋯ button, bottom right. bar: older Safari has it
 * in the bottom toolbar. top: Chrome, Edge and iPad put it by the address bar.
 */
export const iosFlow: 'menu' | 'bar' | 'top' = iosBrowser === 'other' || ipad ? 'top' : safariMajor >= 26 ? 'menu' : 'bar'

/** Already running as the installed app. */
export const standalone =
  typeof window !== 'undefined' &&
  (matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true)

export const useInstall = create<InstallState>(() => ({ open: false, from: '', pick: null, prompt: null, installed: standalone, coach: false, nudge: null }))

export const openGetApp = (from: string, pick: Platform | null = null) => {
  // Android with the browser's install prompt ready: a tap installs straight away, no sheet, no steps.
  // (Not for a scanned QR link: the browser only shows its dialog in answer to a tap.)
  if (platform === 'android' && pick !== 'ios' && from !== 'link' && !inAppBrowser && useInstall.getState().prompt) {
    track('app_direct', { from })
    void installNow().then((ok) => ok && toast('SahiCar is on your home screen'))
    return
  }
  useInstall.setState({ open: true, from, pick })
  track('app_sheet_open', { from, platform, pick: pick ?? 'none' })
}
export const closeGetApp = () => useInstall.setState({ open: false })

/** Close the sheet and leave an arrow on the real button, so nothing has to be remembered. */
export const startCoach = () => {
  useInstall.setState({ open: false, coach: true, nudge: null })
  track('app_coach', { flow: iosFlow })
}
export const endCoach = () => useInstall.setState({ coach: false })

const NUDGE_KEY = 'sahicar-app-nudge'
/** Once ever, on an iPhone that could add the app, at a moment the app is plainly useful. */
export function maybeNudge(reason: 'results' | 'emi') {
  if (platform !== 'ios' || standalone || inAppBrowser) return
  const s = useInstall.getState()
  if (s.open || s.coach || s.nudge || s.installed) return
  try {
    if (localStorage.getItem(NUDGE_KEY)) return
    localStorage.setItem(NUDGE_KEY, String(Date.now()))
  } catch {
    return // no storage: we couldn't keep the promise to ask only once, so don't ask
  }
  useInstall.setState({ nudge: reason })
  track('app_nudge', { reason })
}
export const endNudge = () => useInstall.setState({ nudge: null })

/** Show the browser's install dialog. Resolves true when the person installs. */
export async function installNow(): Promise<boolean> {
  const p = useInstall.getState().prompt
  if (!p) return false
  await p.prompt()
  const { outcome } = await p.userChoice
  track('app_install', { platform, outcome })
  // a prompt can be used once; the browser offers a fresh one later if it was dismissed
  useInstall.setState({ prompt: null })
  return outcome === 'accepted'
}

// listen from the very first moment: the browser fires this once, early, and never again for the page
if (typeof window !== 'undefined') {
  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault() // keep the mini-infobar away; our button opens it
    useInstall.setState({ prompt: e as InstallPrompt })
  })
  addEventListener('appinstalled', () => {
    useInstall.setState({ installed: true, prompt: null })
    track('app_installed', { platform })
  })
  // a scanned QR code (or a shared "get the app" link) opens the sheet straight away
  const q = new URLSearchParams(location.search)
  if (q.has('app') && !standalone) {
    q.delete('app')
    history.replaceState(history.state, '', location.pathname + (q.size ? `?${q}` : '') + location.hash)
    queueMicrotask(() => openGetApp('link'))
  }
}
