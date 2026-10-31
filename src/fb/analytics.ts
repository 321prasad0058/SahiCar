// Google Analytics for Firebase, loaded only after the page is up and idle so it never slows the first paint.
// Page views on route changes are recorded by GA's enhanced measurement (browser history events).
import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

const env = import.meta.env

export async function startAnalytics() {
  if (!env.VITE_FIREBASE_MEASUREMENT_ID || !(await isSupported())) return
  const app =
    getApps()[0] ??
    initializeApp({
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
    })
  getAnalytics(app)
}
