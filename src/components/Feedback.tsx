// The feedback form: was the pick right, what kind of problem, and a comment. Sent anonymously to Firestore.
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { Rating, Topic } from '../fb/feedback'
import { closeFeedback, useFeedback } from '../lib/feedback'
import { track } from '../lib/track'
import { fb } from '../state/auth'
import { useStore } from '../state/store'
import { Icon } from './Icon'

const RATINGS: { v: Rating; label: string }[] = [
  { v: 'yes', label: 'Spot on' },
  { v: 'partly', label: 'Partly' },
  { v: 'no', label: 'Not really' },
]
const TOPICS: { v: Topic; label: string }[] = [
  { v: 'pick', label: 'Wrong car picked' },
  { v: 'data', label: 'Wrong price or spec' },
  { v: 'bug', label: 'Something broke' },
  { v: 'idea', label: 'An idea' },
]

export default function FeedbackSheet() {
  const start = useFeedback()
  const { pathname } = useLocation()
  const fromResults = pathname === '/results'
  const [rating, setRating] = useState<Rating | null>(start.rating)
  const [topic, setTopic] = useState<Topic | null>(start.rating === 'no' ? 'pick' : null)
  const [text, setText] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && closeFeedback()
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])

  const ready = Boolean(rating || text.trim())
  const send = async () => {
    if (!ready || state === 'busy') return
    setState('busy')
    // enough to reproduce a result, nothing that identifies the person (never their pay)
    const a = useStore.getState().answers
    const ctx: Record<string, string | number> = fromResults
      ? { budget_lakh: Math.round(a.budget / 10000) / 10, people: a.people, daily_km: a.dailyKm, state: a.state, payment: a.payment, bodies: a.bodies.join(',') || 'any', must_haves: a.mustHave.join(',') || 'none' }
      : {}
    try {
      const m = await fb()
      await m.sendFeedback({ rating, topic, text: text.trim().slice(0, 1000), page: pathname.slice(0, 120), car: start.car, ctx })
      track('feedback', { rating: rating ?? 'none', topic: topic ?? 'none', page: pathname.slice(0, 60) })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="share-veil" onClick={closeFeedback}>
      <div className="share-sheet card fb-sheet" role="dialog" aria-modal="true" aria-label="Send feedback" onClick={(e) => e.stopPropagation()}>
        <div className="share-top">
          <b>{state === 'sent' ? 'Thank you' : fromResults ? 'Did we get your car right?' : 'Send feedback'}</b>
          <button className="icon-btn" aria-label="Close" onClick={closeFeedback}><Icon name="close" /></button>
        </div>
        {state === 'sent' ? (
          <>
            <p className="muted">Every note is read. If something was wrong, it’s our bug — we’ll fix it.</p>
            <button className="btn btn-primary" onClick={closeFeedback}>Done</button>
          </>
        ) : (
          <>
            {fromResults && (
              <div className="fb-group" role="radiogroup" aria-label="How good was the match">
                {RATINGS.map((r) => (
                  <button key={r.v} role="radio" aria-checked={rating === r.v} className={`pick ${rating === r.v ? 'on' : ''}`} onClick={() => setRating(r.v)}>{r.label}</button>
                ))}
              </div>
            )}
            <div className="fb-group" role="radiogroup" aria-label="What is it about">
              {TOPICS.map((t) => (
                <button key={t.v} role="radio" aria-checked={topic === t.v} className={`pick ${topic === t.v ? 'on' : ''}`} onClick={() => setTopic(topic === t.v ? null : t.v)}>{t.label}</button>
              ))}
            </div>
            <textarea
              className="input fb-text"
              rows={4}
              maxLength={1000}
              placeholder={rating === 'no' || topic === 'pick' ? 'Which car did you expect, and why?' : 'What’s wrong, missing or confusing?'}
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Your feedback"
            />
            <p className="dim small fb-note">Anonymous. Please don’t include your name, phone number or email.</p>
            {state === 'error' && <p className="small fb-err">Couldn’t send — check your connection and try again.</p>}
            <button className="btn btn-primary" disabled={!ready || state === 'busy'} onClick={send}>
              {state === 'busy' ? 'Sending…' : 'Send feedback'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
