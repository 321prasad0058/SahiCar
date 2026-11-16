import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CarCard } from '../components/CarCard'
import { PushOptIn } from '../components/PushOptIn'
import { toast } from '../components/Toast'
import { carById } from '../data'
import type { Run } from '../fb/user'
import { lakh } from '../lib/format'
import { track } from '../lib/track'
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
        <h1>{user?.displayName ? `${user.displayName.split(' ')[0]}’s shortlist` : 'Your shortlist'}</h1>
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
        <PushOptIn from="garage" title="Price alerts for your shortlist" text="Get a notification when a car you saved changes price, gets an update, or a better rival launches." />
        {list.length ? (
          <div className="card-grid">{list.map((c) => <CarCard key={c.id} car={c} />)}</div>
        ) : (
          <div className="card empty-res">
            <p className="muted">Nothing saved yet. Tap the heart on any car to keep it here.</p>
            <Link to="/sahifit" className="btn btn-primary">Find my car</Link>
          </div>
        )}
        {user && <QuizHistory uid={user.uid} />}
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
      <span>This permanently deletes your account, saved cars, quiz answers and quiz history.</span>
      <button className="btn btn-sm danger" disabled={step === 'busy'} onClick={run}>{step === 'busy' ? 'Deleting…' : 'Yes, delete everything'}</button>
      <button className="btn btn-ghost btn-sm" onClick={() => { setStep('idle'); setError('') }}>Cancel</button>
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

const when = (d: Date | null) =>
  d ? d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Just now'

const carLabel = (id: string) => {
  const c = carById.get(id)
  return c ? `${c.brand} ${c.model}` : id.replace(/-/g, ' ')
}

/** The signed-in person's last finished quizzes: what they answered, the top 3 they got, and a way to reopen or delete each. */
function QuizHistory({ uid }: { uid: string }) {
  const [runs, setRuns] = useState<Run[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [confirm, setConfirm] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    let live = true
    fb().then((m) => m.loadRuns(uid)).then((r) => live && setRuns(r)).catch(() => live && setFailed(true))
    return () => { live = false }
  }, [uid])

  const reopen = (r: Run) => {
    const s = useStore.getState()
    // take-home pay was never saved: keep whatever this browser has
    s.setAnswers({ ...r.answers, income: s.answers.income })
    s.finish()
    track('quiz_history_open', { age_days: r.at ? Math.round((Date.now() - r.at.getTime()) / 864e5) : 0 })
    nav('/results')
  }

  const remove = async (r: Run) => {
    setConfirm('')
    setRuns((list) => list?.filter((x) => x.id !== r.id) ?? null)
    try {
      await (await fb()).removeRun(uid, r.id)
      toast('Quiz removed from your history')
    } catch {
      setRuns((list) => (list ? [...list, r].sort((a, b) => (b.at?.getTime() ?? 0) - (a.at?.getTime() ?? 0)) : list))
      toast('Couldn’t remove it just now. Please try again.')
    }
  }

  return (
    <section className="quiz-history" aria-labelledby="qh-title">
      <div className="qh-head">
        <h2 id="qh-title">Your past quizzes</h2>
        <p className="muted small">Your last 10 SahiFit results. Only you can see them, and your salary is never part of them.</p>
      </div>
      {failed ? (
        <p className="card qh-empty muted small">Couldn’t load your quiz history just now. Please refresh to try again.</p>
      ) : runs === null ? (
        <p className="card qh-empty muted small">Loading your quizzes…</p>
      ) : !runs.length ? (
        <div className="card qh-empty">
          <p className="muted small">No quizzes saved yet. Each time you finish SahiFit while signed in, your top 3 cars appear here.</p>
          <Link to="/sahifit" className="btn btn-ghost btn-sm">Take SahiFit</Link>
        </div>
      ) : (
        <ol className="qh-list">
          {runs.map((r, i) => (
            <li key={r.id} className="card qh-item">
              <div className="qh-meta">
                <span className="qh-date">{when(r.at)}</span>
                {i === 0 && <span className="qh-latest">Latest</span>}
              </div>
              <p className="qh-sum muted small">
                Budget {lakh(r.answers.budget)} · {r.answers.people} {r.answers.people === 1 ? 'person' : 'people'} · {r.fits} {r.fits === 1 ? 'car fits' : 'cars fit'}
              </p>
              {r.picks.length > 0 && (
                <ol className="qh-picks">
                  {r.picks.map((p) => (
                    <li key={p.car}>
                      <Link to={`/car/${p.car}`}>{carLabel(p.car)}</Link>
                      <span className="dim small"> · {p.score}</span>
                    </li>
                  ))}
                </ol>
              )}
              <div className="qh-actions">
                <button className="btn btn-primary btn-sm" onClick={() => reopen(r)}>See these results</button>
                {confirm === r.id ? (
                  <>
                    <button className="btn btn-sm danger" onClick={() => remove(r)}>Yes, delete</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setConfirm('')}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn-ghost btn-sm" onClick={() => setConfirm(r.id)}>Delete</button>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
