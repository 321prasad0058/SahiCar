import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
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

export default function Login() {
  const nav = useNavigate()
  const { user, enabled, google, login, signup, reset } = useAuth()
  const [mode, setMode] = useState<'in' | 'up'>('in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [note, setNote] = useState('')

  if (user) return <Navigate to="/garage" replace />

  const run = async (f: () => Promise<void>) => {
    setBusy(true)
    setError('')
    try {
      await f()
      nav('/garage')
    } catch (e) {
      setError(msg(e))
    } finally {
      setBusy(false)
    }
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(() => (mode === 'in' ? login(email, password) : signup(name, email, password)))
  }

  return (
    <div className="page auth">
      <div className="auth-card card">
        <Logo size={40} />
        <h1>{mode === 'in' ? 'Welcome back' : 'Create your free account'}</h1>
        <p className="muted small">Keep your SahiFit answers and garage on every device. We never share your details with dealers.</p>
        {!enabled ? (
          <p className="chip amber">Sign-in isn’t configured on this deployment yet — everything still works and saves in this browser.</p>
        ) : (
          <>
            <button className="btn btn-ghost full" disabled={busy} onClick={() => run(google)}>
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
