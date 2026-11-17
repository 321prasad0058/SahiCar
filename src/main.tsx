// first: read and tidy the share and campaign tags before the router sees the address
import './lib/entry'
// catch the browser's one-time install offer before anything else runs
import './lib/install'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { bootLoader, playLoaderExit } from './components/PageLoader'
import { reloadOnce } from './lib/reload'
import { isLiveSite } from './lib/seo'
import { afterHero } from './lib/perf'
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

// An app-only page starts on the SahiCar loader from index.html. React would wipe it the moment it renders, so keep a
// copy on screen until the page has real content, then let it drop away. (Under 200 ms it was never visible: skip it.)
const boot = !pre.dataset.pre ? pre.querySelector<HTMLElement>('.scl') : null
if (boot && performance.now() > 200) {
  const copy = boot.cloneNode(true) as HTMLElement
  copy.classList.add('scl-still')
  copy.classList.remove('page-loading')
  document.body.appendChild(copy)
  bootLoader.el = copy
  const done = () => {
    if (!bootLoader.el) return
    bootLoader.el = null
    seen.disconnect()
    playLoaderExit(copy)
    copy.remove()
  }
  const seen = new MutationObserver(() => {
    const main = document.querySelector('#root main')
    if (main?.childElementCount && !main.querySelector('.page-loading')) requestAnimationFrame(done)
  })
  seen.observe(pre, { childList: true, subtree: true })
  setTimeout(done, 10000)
}

// The homepage keeps the road loader (bottom sheet on phones, full scene on desktop) until its 3D cars are moving,
// and never longer than 15 s; taps pass through it meanwhile.
const heroLoader = document.querySelector<HTMLElement>('#hero-loader .scl')
if (heroLoader) {
  const down = () => {
    if (!heroLoader.isConnected) return
    // it only becomes visible 160 ms after first paint: before that, just remove it
    if (performance.now() > 200) playLoaderExit(heroLoader)
    heroLoader.parentElement?.remove()
  }
  addEventListener('sc:hero-done', down, { once: true })
  setTimeout(down, 15000)
}

// After a deploy, a tab opened earlier asks for page code that no longer exists. Reload once to get the new version,
// instead of leaving a blank page.
addEventListener('vite:preloadError', (e) => {
  if (reloadOnce()) e.preventDefault()
})

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
    afterHero(() => ('requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 4000 }) : setTimeout(go, 2000)))
  })
}

// Microsoft Clarity (heatmaps and anonymous session replays; it masks what people type), same rules as Analytics
if (import.meta.env.PROD && isLiveSite() && !navigator.webdriver) {
  addEventListener('load', () => {
    const go = () => {
      const w = window as Window & { clarity?: { (...a: unknown[]): void; q?: unknown[][] } }
      w.clarity = w.clarity || Object.assign((...a: unknown[]) => { (w.clarity!.q = w.clarity!.q || []).push(a) }, {})
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://www.clarity.ms/tag/zewx67v5ot?ref=bwt'
      document.head.appendChild(s)
    }
    afterHero(() => ('requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 4000 }) : setTimeout(go, 2000)))
  })
}
