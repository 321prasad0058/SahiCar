// first: read and tidy the share and campaign tags before the router sees the address
import './lib/entry'
// catch the browser's one-time install offer before anything else runs
import './lib/install'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { isLiveSite } from './lib/seo'
import './styles/base.css'
import './styles/app.css'
import './styles/landing.css'
import './styles/wizard.css'
import './styles/pages.css'
import './styles/emi.css'
import './styles/growth.css'
import './styles/app-install.css'

// A pre-rendered page (scripts/prerender.mjs) is already on screen with real content. Draw the app into a hidden
// twin and swap only once it shows the same page (its route code loaded, no spinner), so there is no flash.
const pre = document.getElementById('root')!
let mount = pre
if (pre.dataset.pre) {
  mount = document.createElement('div')
  mount.style.display = 'none'
  pre.after(mount)
  const swap = () => {
    if (!pre.isConnected) return
    pre.remove()
    mount.id = 'root'
    mount.style.display = ''
    obs.disconnect()
  }
  const obs = new MutationObserver(() => {
    if (mount.querySelector('main')?.childElementCount && !mount.querySelector('.page-loading')) requestAnimationFrame(swap)
  })
  obs.observe(mount, { childList: true, subtree: true })
  setTimeout(swap, 6000)
}

createRoot(mount).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// offline support and instant repeat visits (production only; the dev server must never be cached)
if (import.meta.env.PROD && 'serviceWorker' in navigator && !navigator.webdriver) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}

// analytics after load, when the browser is idle (production only)
// (only on the real site address, never from localhost, preview copies or the pre-render browser)
if (import.meta.env.PROD && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID && isLiveSite() && !navigator.webdriver) {
  addEventListener('load', () => {
    const go = () => import('./fb/analytics').then((m) => m.startAnalytics()).catch(() => {})
    'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 4000 }) : setTimeout(go, 2000)
  })
}
