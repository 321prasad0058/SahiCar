// Home page band for the app: what you get, two install badges, a QR code on computers, and the real app in a phone.
import { openGetApp, platform, standalone } from '../lib/install'
import { Icon } from './Icon'
import { LogoMark } from './Logo'

const PERKS = [
  { i: 'bolt', t: 'Opens in a blink', d: 'Full screen, from your home screen' },
  { i: 'offline', t: 'Works on a weak signal', d: 'Your garage and last results stay with you' },
  { i: 'shield', t: 'Nothing to sign up for', d: 'No store account, no phone number' },
]

export function AppPromo({ page = false }: { page?: boolean }) {
  if (standalone && !page) return null
  return (
    <section className={`app-home ${page ? 'app-page' : ''}`}>
      <div className="wrap">
        <div className="app-band">
          <div className="app-copy">
            <div className="eyebrow" data-reveal>The SahiCar app</div>
            <h2 className="section-title" data-split>Your honest car advisor, one tap away.</h2>
            <p className="section-sub muted" data-reveal>
              Install it free in seconds — no Play Store or App Store needed. Check an EMI in the showroom, or a car’s real 5-year cost before you sign.
            </p>

            <ul className="app-perks" data-stagger>
              {PERKS.map((p) => (
                <li key={p.t}>
                  <span className="app-perk-i" aria-hidden><Icon name={p.i} size={18} /></span>
                  <span><b>{p.t}</b><span className="muted small">{p.d}</span></span>
                </li>
              ))}
            </ul>

            <div className="app-cta" data-reveal>
              <div className="app-badges">
                <button className={`app-badge ${platform === 'android' ? 'mine' : ''}`} onClick={() => openGetApp('home', 'android')}>
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
                    <path d="M17.6 9.48l1.84-3.18a.38.38 0 00-.66-.38l-1.86 3.22A11.4 11.4 0 0012 8.1c-1.77 0-3.43.38-4.92 1.04L5.22 5.92a.38.38 0 00-.66.38L6.4 9.48A10.8 10.8 0 001 18h22a10.8 10.8 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                  </svg>
                  <span><small>Get it for</small><b>Android</b></span>
                </button>
                <button className={`app-badge ${platform === 'ios' ? 'mine' : ''}`} onClick={() => openGetApp('home', 'ios')}>
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <rect x="6" y="2.5" width="12" height="19" rx="3" />
                    <path d="M9.5 7.5h.01M12 7.5h.01M14.5 7.5h.01M9.5 10.5h.01M12 10.5h.01M14.5 10.5h.01M10.5 18.5h3" strokeWidth="2.4" />
                  </svg>
                  <span><small>Get it for</small><b>iPhone</b></span>
                </button>
              </div>
              {platform === 'desktop' && (
                <button className="app-qr-mini" onClick={() => openGetApp('home-qr')} aria-label="Show the QR code to install on your phone">
                  <img src="/app-qr.svg" alt="" width={64} height={64} />
                  <span className="small"><b>On a computer?</b><span className="muted">Scan to install on your phone</span></span>
                </button>
              )}
            </div>
          </div>

          {/* the real app on a phone: a screenshot of the home screen, framed */}
          <div className="app-visual" aria-hidden>
            <div className="app-glow" />
            <div className="app-phone">
              <div className="app-screen">
                <span className="app-status"><span>9:41</span><i /></span>
                <img src="/app/phone-home.webp" alt="" width={390} height={844} loading="lazy" decoding="async" />
              </div>
              <span className="app-notch" />
            </div>
            <div className="app-float app-float-a">
              <LogoMark size={30} />
              <span><b>SahiCar</b><span className="dim">Added to Home Screen</span></span>
              <span className="app-tick"><Icon name="check" size={14} stroke={3} /></span>
            </div>
            <div className="app-float app-float-b">
              <Icon name="download" size={16} />
              <span>Free · no app store</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
