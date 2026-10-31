import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/base.css'
import './styles/app.css'
import './styles/landing.css'
import './styles/wizard.css'
import './styles/pages.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// offline support and instant repeat visits (production only; the dev server must never be cached)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
