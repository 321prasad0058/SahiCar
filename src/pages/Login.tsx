import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { finishPending } from '../lib/gate'
import { track } from '../lib/track'
import { useAuth } from '../state/auth'

const MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'That email and password don’t match.',
  'auth/email-already-in-use': 'An account with this email already exists — sign in instead.',
  'auth/weak-password': 'Use at least 6 characters.',
  'auth/invalid-email': 'That doesn’t look like an email address.',
  'auth/popup-closed-by-user': 'The Google window was closed.',
  'auth/too-many-requests': 'Too many attempts. Try again in a few minutes.',
}
const msg = (e: unknown) => MESSAGES[(e as { code?: string }).code ?? ''] ?? (e as Error).message ?? 'Something went wrong.'

// why the gate sent them here, in their words
const WHY: Record<string, string> = {
  results: 'Sign in free to see your full SahiScore ranking — your #2 and #3 picks and every car that fits.',
  save: 'Sign in free to save cars to your garage, on every device.',
  compare: 'Sign in free to compare cars side by side.',
}

export default function Login() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  // only ever return to a page on this site
  const next = (params.get('next') ?? '').startsWith('/') && !params.get('next')!.startsWith('//') ? params.get('next')! : '/garage'
  const why = WHY[params.get('why') ?? '']
  const { user, enabled, google, login, signup, reset } = useAuth()
  const [mode, setMode] = useState<'in' | 'up'>('in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [note, setNote] = useState('')

  if (user) return <Navigate to={next} replace />

  const run = async (f: () => Promise<void>, method: 'google' | 'email', isNew: boolean) => {
    setBusy(true)
    setError('')
    try {
      await f()
      const u = useAuth.getState().user
      // Google sign-ins are new accounts when created and last-signed-in times match
      const created = isNew || (u?.metadata.creationTime != null && u.metadata.creationTime === u.metadata.lastSignInTime)
      track(created ? 'sign_up' : 'login', { method, from: params.get('why') ?? 'direct' })
      finishPending()
      nav(next, { replace: true })
    } catch (e) {
      setError(msg(e))
    } finally {
      setBusy(false)
    }
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(() => (mode === 'in' ? login(email, password) : signup(name, email, password)), 'email', mode === 'up')
  }

  return (
    <div className="page auth">
      <div className="auth-card card">
        <Logo size={40} />
        <h1>{mode === 'in' ? 'Welcome back' : 'Create your free account'}</h1>
        <p className="muted small">{why ?? 'Keep your SahiFit answers and garage on every device. We never share your details with dealers.'}</p>
        {!enabled ? (
          <p className="chip amber">Sign-in isn’t configured on this deployment yet — everything still works and saves in this browser.</p>
        ) : (
          <>
            <button className="btn btn-ghost full" disabled={busy} onClick={() => run(google, 'google', false)}>
              <Icon name="google" /> Continue with Google
            </button>
            <div className="or dim small"><span>or with email</span></div>
            <form onSubmit={submit} className="auth-form">
              {mode === 'up' && <input className="input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />}
              <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete={mode === 'in' ? 'current-password' : 'new-password'} />
              {error && <div className="form-error small">{error}</div>}
              {note && <div className="form-note small">{note}</div>}
              <button className="btn btn-primary full" disabled={busy}>{busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : 'Create account'}</button>
            </form>
            <p className="consent dim small">
              By continuing you agree that SahiCar stores your name, email, quiz answers and saved cars to keep them in sync across your
              devices and to understand how the site is used. We never sell them or share them with dealers or advertisers, and you can
              delete your account and data at any time from your garage. <Link to="/about#privacy">Privacy</Link>
            </p>
            <div className="auth-links small">
              <button onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setError('') }}>
                {mode === 'in' ? 'New here? Create an account' : 'Have an account? Sign in'}
              </button>
              {mode === 'in' && (
                <button onClick={() => (email ? reset(email).then(() => setNote('Password reset email sent.'), (e) => setError(msg(e))) : setError('Enter your email first.'))}>
                  Forgot password?
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
