// Google Analytics for Firebase, loaded only after the page is up and idle so it never slows the first paint.
// Page views on route changes are recorded by GA's enhanced measurement (browser history events).
// The first page view uses the arrival address (lib/entry), since its share and campaign tags are removed on load.
// Every visitor carries an app_mode user property, 'installed' (opened from the home-screen app) or 'browser', so GA
// can split app and website use by operating system (custom dimension "App or website" in GA Admin).
import { getApps, initializeApp } from 'firebase/app'
import { initializeAnalytics, isSupported, logEvent, setUserId, setUserProperties, type Analytics } from 'firebase/analytics'
import { entryUrl } from '../lib/entry'

const env = import.meta.env
let ready: Promise<Analytics | null> | null = null

/** How this visit was opened: the installed app runs standalone (Android, desktop) or as an iPhone home-screen app. */
const appMode = () =>
  matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true ? 'installed' : 'browser'

export function startAnalytics() {
  return (ready ??= (async () => {
    if (!env.VITE_FIREBASE_MEASUREMENT_ID || !(await isSupported())) return null
    const app =
      getApps()[0] ??
      initializeApp({
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        appId: env.VITE_FIREBASE_APP_ID,
        measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
      })
    // the first page as it arrived, tags included, so shares and campaigns are credited after the address is tidied
    // app_mode goes with the very first page view, and stays on every later event
    const mode = appMode()
    const a = initializeAnalytics(app, { config: { page_location: entryUrl, user_properties: { app_mode: mode } } })
    setUserProperties(a, { app_mode: mode })
    return a
  })())
}

export async function log(name: string, params: Record<string, string | number>) {
  const a = await startAnalytics()
  if (a) logEvent(a, name, params)
}

/** Tie this browser's events to the signed-in account (Firebase's random uid, never an email). */
export async function identify(uid: string | null) {
  const a = await startAnalytics()
  if (a) setUserId(a, uid)
}
