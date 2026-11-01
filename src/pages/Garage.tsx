import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { toast } from '../components/Toast'
import { carById } from '../data'
import { fb, useAuth } from '../state/auth'
import { useStore } from '../state/store'

export default function Garage() {
  const ids = useStore((s) => s.garage)
  const { user, enabled, logout } = useAuth()

  // mirror additions and removals to the account
  useEffect(() => {
    if (!user) return
    return useStore.subscribe((s, prev) => {
      const added = s.garage.filter((x) => !prev.garage.includes(x))
      const removed = prev.garage.filter((x) => !s.garage.includes(x))
      if (!added.length && !removed.length) return
      fb().then((m) => {
        for (const id of added) m.saveCar(user.uid, id).catch(() => {})
        for (const id of removed) m.removeCar(user.uid, id).catch(() => {})
      })
    })
  }, [user])

  const list = ids.map((id) => carById.get(id)).filter((c) => c != null)
  return (
    <div className="page garage">
      <div className="wrap">
        <div className="eyebrow">My garage</div>
        <h1>{user ? `${user.displayName?.split(' ')[0] ?? 'Your'}’s shortlist` : 'Your shortlist'}</h1>
        {enabled && !user && (
          <div className="card sync">
            <p className="muted">Saved in this browser only. Sign in (free) to keep your garage and SahiFit answers on every device.</p>
            <Link to="/login" className="btn btn-primary btn-sm">Sign in</Link>
          </div>
        )}
        {user && (
          <div className="card sync">
            <p className="muted">Signed in as {user.email}. Your garage and answers sync automatically.</p>
            <button className="btn btn-ghost btn-sm" onClick={() => logout()}>Sign out</button>
            <DeleteAccount />
          </div>
        )}
        {list.length ? (
          <div className="card-grid">{list.map((c) => <CarCard key={c.id} car={c} />)}</div>
        ) : (
          <div className="card empty-res">
            <p className="muted">Nothing saved yet. Tap the heart on any car to keep it here.</p>
            <Link to="/sahifit" className="btn btn-primary">Find my car</Link>
          </div>
        )}
      </div>
    </div>
  )
}

/** Two-step delete, so a stray tap can't erase an account. */
function DeleteAccount() {
  const [step, setStep] = useState<'idle' | 'confirm' | 'busy'>('idle')
  const [error, setError] = useState('')
  const run = async () => {
    setStep('busy')
    setError('')
    try {
      await (await fb()).deleteAccount()
      useStore.getState().reset()
      useStore.getState().setGarage([])
      toast('Your account and data have been deleted')
    } catch (e) {
      setStep('confirm')
      setError((e as { code?: string }).code === 'auth/requires-recent-login' ? 'For your safety, sign out, sign in again, then delete.' : 'Couldn’t delete just now. Please try again.')
    }
  }
  if (step === 'idle') return <button className="btn btn-ghost btn-sm" onClick={() => setStep('confirm')}>Delete my account</button>
  return (
    <div className="delete-confirm small">
      <span>This permanently deletes your account, saved cars and quiz answers.</span>
      <button className="btn btn-sm danger" disabled={step === 'busy'} onClick={run}>{step === 'busy' ? 'Deleting…' : 'Yes, delete everything'}</button>
      <button className="btn btn-ghost btn-sm" onClick={() => { setStep('idle'); setError('') }}>Cancel</button>
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
