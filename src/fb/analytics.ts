// Google Analytics for Firebase, loaded only after the page is up and idle so it never slows the first paint.
// Page views on route changes are recorded by GA's enhanced measurement (browser history events).
// The first page view uses the arrival address (lib/entry), since its share and campaign tags are removed on load.
import { getApps, initializeApp } from 'firebase/app'
import { initializeAnalytics, isSupported, logEvent, setUserId, type Analytics } from 'firebase/analytics'
import { entryUrl } from '../lib/entry'

const env = import.meta.env
let ready: Promise<Analytics | null> | null = null

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
    return initializeAnalytics(app, { config: { page_location: entryUrl } })
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
