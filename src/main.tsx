import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/base.css'
import './styles/app.css'
import './styles/landing.css'
import './styles/wizard.css'
import './styles/pages.css'
import './styles/emi.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// offline support and instant repeat visits (production only; the dev server must never be cached)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}

// analytics after load, when the browser is idle (production only)
if (import.meta.env.PROD && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  addEventListener('load', () => {
    const go = () => import('./fb/analytics').then((m) => m.startAnalytics()).catch(() => {})
    'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 4000 }) : setTimeout(go, 2000)
  })
}
