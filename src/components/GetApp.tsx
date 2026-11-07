// "Get the app": pick Android or iPhone, then the quickest honest way onto that phone. Android installs in one tap from
// the browser's own prompt; iPhone gets Safari's three steps; a computer gets a QR code to open this on the phone.
import { useEffect, useState, type ReactNode } from 'react'
import { closeGetApp, inAppBrowser, installNow, iosFlow, platform, startCoach, useInstall, type Platform } from '../lib/install'
import { track } from '../lib/track'
import { Icon } from './Icon'
import { LogoMark } from './Logo'
import { toast } from './Toast'

type Phone = Exclude<Platform, 'desktop'>

const PHONES: { key: Phone; name: string; note: string }[] = [
  { key: 'android', name: 'Android', note: 'One-tap install' },
  { key: 'ios', name: 'iPhone', note: 'Add to Home Screen' },
]

export default function GetApp() {
  const prompt = useInstall((s) => s.prompt)
  const installed = useInstall((s) => s.installed)
  // a phone goes straight to its own steps; a computer chooses first
  const asked = useInstall((s) => s.pick)
  const [pick, setPick] = useState<Phone | null>(asked && asked !== 'desktop' ? asked : platform === 'desktop' ? null : platform)

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && closeGetApp()
    addEventListener('keydown', esc)
    const html = document.documentElement
    html.classList.add('lenis-stopped')
    return () => {
      removeEventListener('keydown', esc)
      html.classList.remove('lenis-stopped')
    }
  }, [])

  const choose = (k: Phone) => {
    setPick(k)
    track('app_platform', { platform: k, device: platform })
  }
  const install = async () => {
    if (await installNow()) {
      toast('SahiCar is on your home screen')
      closeGetApp()
    }
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}/?app=1`)
      toast('Link copied — paste it in your browser')
    } catch {
      toast('Couldn’t copy — use the menu to open in browser')
    }
  }

  return (
    <div className="share-veil ga-veil" onClick={closeGetApp}>
      <div className="ga-sheet card" role="dialog" aria-modal="true" aria-labelledby="ga-title" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn ga-close" aria-label="Close" onClick={closeGetApp}><Icon name="close" /></button>

        <div className="ga-head">
          <span className="ga-icon"><LogoMark size={56} /></span>
          <div>
            <h2 id="ga-title">Get the SahiCar app</h2>
            <p className="muted small">Free. No Play Store or App Store needed. Opens full screen, straight from your home screen.</p>
          </div>
        </div>

        {/* the two choices; on a phone its own is marked and opened */}
        <div className="ga-pick" role="tablist" aria-label="Your phone">
          {PHONES.map((p) => (
            <button key={p.key} role="tab" aria-selected={pick === p.key} className={`ga-opt ${pick === p.key ? 'on' : ''}`} onClick={() => choose(p.key)}>
              <span className="ga-opt-glyph" aria-hidden>{p.key === 'android' ? <AndroidGlyph /> : <AppleGlyph />}</span>
              <span className="ga-opt-text">
                <b>{p.name}</b>
                <span className="small">{p.note}</span>
              </span>
              {platform === p.key && <span className="chip cyan ga-this">This phone</span>}
            </button>
          ))}
        </div>

        {pick && (
          <div className="ga-body" key={pick}>
            {platform === 'desktop' ? (
              <Scan phone={pick} />
            ) : installed ? (
              <p className="ga-done"><Icon name="check" size={18} /> SahiCar is already installed. Open it from your home screen.</p>
            ) : pick !== platform ? (
              <p className="muted small ga-other">
                You’re on {platform === 'ios' ? 'an iPhone' : 'an Android phone'}. Open <b>{location.host}</b> on your {pick === 'ios' ? 'iPhone' : 'Android phone'} and
                tap <b>Get the app</b> there.
              </p>
            ) : inAppBrowser ? (
              <div className="ga-steps">
                <p className="ga-lead">This app’s built-in browser can’t install apps. Open SahiCar in {platform === 'ios' ? 'Safari' : 'Chrome'} first:</p>
                <Step n={1} icon="dots">Tap the <b>⋯</b> menu at the top of this screen</Step>
                <Step n={2} icon="external">Choose <b>Open in {platform === 'ios' ? 'Safari' : 'browser'}</b></Step>
                <button className="btn btn-ghost ga-wide" onClick={copy}><Icon name="link" size={16} /> Or copy the link</button>
              </div>
            ) : pick === 'android' ? (
              prompt ? (
                <div className="ga-steps">
                  <button className="btn btn-primary btn-xl ga-wide ga-install" onClick={install}>
                    <Icon name="download" /> Install SahiCar
                  </button>
                  <p className="dim small ga-fine">Your phone asks once to confirm. The app lands next to your other apps.</p>
                </div>
              ) : (
                <div className="ga-steps">
                  <p className="ga-lead">Three taps in Chrome:</p>
                  <Step n={1} icon="dots">Tap Chrome’s <b>⋮</b> menu, top right</Step>
                  <Step n={2} icon="addsq">Tap <b>Add to Home screen</b> (or <b>Install app</b>)</Step>
                  <Step n={3} icon="check">Tap <b>Install</b></Step>
                </div>
              )
            ) : (
              <IosGuide />
            )}
          </div>
        )}

        {platform === 'desktop' && prompt && (
          <button className="link-arrow small ga-desk" onClick={install}>Or install it on this computer <Icon name="arrow" size={14} /></button>
        )}
      </div>
    </div>
  )
}

function Step({ n, icon, on, children }: { n: number; icon: string; on?: boolean; children: ReactNode }) {
  return (
    <div className={`ga-step ${on ? 'on' : ''}`} style={{ animationDelay: `${n * 70}ms` }}>
      <span className="ga-step-n mono">{n}</span>
      <span className="ga-step-text">{children}</span>
      <span className="ga-step-icon" aria-hidden><Icon name={icon} size={18} /></span>
    </div>
  )
}

/* ── iPhone: the steps play as a little film of Safari, the matching line lights up, and "Show me where" leaves an
   arrow on the real button. Apple allows no install button, so this is as short as the path gets. */

const IOS_STEPS: Record<typeof iosFlow, { icon: string; text: ReactNode; scene: Scene }[]> = {
  menu: [
    { icon: 'more', text: <>Tap <b>⋯</b> at the bottom right</>, scene: 'tap' },
    { icon: 'share', text: <>Tap <b>Share</b></>, scene: 'menu' },
    { icon: 'addsq', text: <>Tap <b>Add to Home Screen</b> <span className="dim">(scroll down if it’s hidden)</span></>, scene: 'sheet' },
    { icon: 'check', text: <>Tap <b>Add</b> — done</>, scene: 'add' },
  ],
  bar: [
    { icon: 'share', text: <>Tap <b>Share</b> in the bar below <span className="dim">(square with an arrow)</span></>, scene: 'tap' },
    { icon: 'addsq', text: <>Tap <b>Add to Home Screen</b> <span className="dim">(scroll down if it’s hidden)</span></>, scene: 'sheet' },
    { icon: 'check', text: <>Tap <b>Add</b> — done</>, scene: 'add' },
  ],
  top: [
    { icon: 'share', text: <>Tap <b>Share</b> at the top, next to the address</>, scene: 'tap' },
    { icon: 'addsq', text: <>Tap <b>Add to Home Screen</b></>, scene: 'sheet' },
    { icon: 'check', text: <>Tap <b>Add</b> — done</>, scene: 'add' },
  ],
}

type Scene = 'tap' | 'menu' | 'sheet' | 'add' | 'home'

function IosGuide() {
  const steps = IOS_STEPS[iosFlow]
  const scenes: Scene[] = [...steps.map((s) => s.scene), 'home']
  const [at, setAt] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setAt((i) => (i + 1) % scenes.length), 1900)
    return () => clearInterval(t)
  }, [scenes.length])

  return (
    <div className="ga-steps">
      <IosFilm scene={scenes[at]} />
      {steps.map((s, i) => (
        <Step key={i} n={i + 1} icon={s.icon} on={i === at}>{s.text}</Step>
      ))}
      <button className="btn btn-primary ga-wide ga-show" onClick={startCoach}>
        <Icon name="arrow" size={16} /> Show me where to tap
      </button>
    </div>
  )
}

/** A drawn Safari (not a screenshot): the bar, the menu, the share sheet, the Add screen, then the icon on a home screen. */
function IosFilm({ scene }: { scene: Scene }) {
  const top = iosFlow === 'top'
  const btn = iosFlow === 'menu' ? <span className="iof-dots">⋯</span> : <Icon name="share" size={15} />
  return (
    <div className={`iof iof-${iosFlow}`} aria-hidden>
      <div className="iof-screen" key={scene}>
        {scene === 'home' ? (
          <div className="iof-home">
            {Array.from({ length: 7 }, (_, i) => <span key={i} className="iof-app" />)}
            <span className="iof-app iof-mine"><LogoMark size={30} /><small>SahiCar</small></span>
          </div>
        ) : scene === 'add' ? (
          <div className="iof-add">
            <div className="iof-add-bar"><span>Cancel</span><b>Add to Home Screen</b><span className="iof-hit">Add</span></div>
            <div className="iof-add-row"><LogoMark size={34} /><span><b>SahiCar</b><small>sahicar-in.web.app</small></span></div>
          </div>
        ) : (
          <>
            <div className="iof-page"><i /><i /><i className="short" /></div>
            {scene === 'menu' && (
              <div className="iof-pop">
                <span className="iof-row iof-hit"><Icon name="share" size={13} /> Share</span>
                <span className="iof-row">Add Bookmark</span>
                <span className="iof-row">Find on Page</span>
              </div>
            )}
            {scene === 'sheet' && (
              <div className="iof-sheet">
                <span className="iof-row">Copy</span>
                <span className="iof-row">Add to Favourites</span>
                <span className="iof-row iof-hit"><Icon name="addsq" size={13} /> Add to Home Screen</span>
              </div>
            )}
            <div className={`iof-bar ${top ? 'iof-bar-top' : ''}`}>
              <span className="iof-url">sahicar-in.web.app</span>
              {iosFlow !== 'bar' && <span className={`iof-btn ${scene === 'tap' ? 'iof-hit iof-tap' : ''}`}>{btn}</span>}
            </div>
            {iosFlow === 'bar' && (
              <div className="iof-tools">
                <i /><i />
                <span className={`iof-btn ${scene === 'tap' ? 'iof-hit iof-tap' : ''}`}>{btn}</span>
                <i /><i />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Scan({ phone }: { phone: Phone }) {
  return (
    <div className="ga-scan">
      <div className="ga-qr">
        <img src="/app-qr.svg" alt={`QR code that opens SahiCar on your ${phone === 'ios' ? 'iPhone' : 'Android phone'}`} width={168} height={168} />
        <span className="ga-qr-mark"><LogoMark size={34} /></span>
      </div>
      <div>
        <b>Scan with your {phone === 'ios' ? 'iPhone' : 'phone'}’s camera</b>
        <p className="muted small">
          SahiCar opens on your phone with the install button ready{phone === 'ios' ? ' — it takes three taps in Safari.' : ' — one tap and it’s installed.'}
        </p>
      </div>
    </div>
  )
}

function AndroidGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18a.38.38 0 00-.66-.38l-1.86 3.22A11.4 11.4 0 0012 8.1c-1.77 0-3.43.38-4.92 1.04L5.22 5.92a.38.38 0 00-.66.38L6.4 9.48A10.8 10.8 0 001 18h22a10.8 10.8 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
    </svg>
  )
}

/** Not Apple's logo (that belongs on App Store badges only): a plain phone with a home-screen grid. */
function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M9.5 7.5h.01M12 7.5h.01M14.5 7.5h.01M9.5 10.5h.01M12 10.5h.01M14.5 10.5h.01M10.5 18.5h3" strokeWidth="2.4" />
    </svg>
  )
}
