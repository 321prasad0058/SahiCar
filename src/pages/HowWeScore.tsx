// How we score: the pledge first, then the weights SahiScore would use for this visitor, in plain words, and the
// public code behind them. Trust is the product; this page is the proof.
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { cars } from '../data'
import { DIM_HOW } from '../engine/method'
import { DIM_LABEL, weightsFor, type Dim } from '../engine/sahiscore'
import { track } from '../lib/track'
import { useStore } from '../state/store'

const CODE = 'https://github.com/321prasad0058/SahiCar/blob/main/src/engine/sahiscore.ts'

const PLEDGE = [
  ['No carmaker or dealer pays us', 'Not for placement, not for a badge, not for a “sponsored” slot. There are none.'],
  ['Rankings are never for sale', 'Your top three come from the SahiScore formula and your answers — nothing else. The same answers always give the same result.'],
  ['We show the catches', 'Every pick lists what’s wrong with it: low crash ratings, a small boot, a new model coming soon.'],
  ['We tell you to wait when you should', 'If the car’s new generation is months away, we say so — even if that means you don’t buy today.'],
  ['Anything paid will be labelled', 'If SahiCar ever earns money, it will never come from a carmaker or a dealer and will never change a score.'],
]

export default function HowWeScore() {
  const answers = useStore((s) => s.answers)
  const done = useStore((s) => s.done)
  const w = weightsFor(answers)
  const dims = (Object.keys(w) as Dim[]).sort((a, b) => w[b] - w[a])
  const max = w[dims[0]]
  useEffect(() => track('how_we_score_view', { quiz_done: done ? 1 : 0 }), [done])

  return (
    <div className="page about hws">
      <div className="wrap narrow">
        <div className="eyebrow">How we score</div>
        <h1>No carmaker pays us. <span className="grad">Rankings are never for sale.</span></h1>
        <p className="lead">
          Most car sites earn from the brands they review. SahiCar doesn’t. Here is our promise, the exact weights behind your SahiScore,
          and the code anyone can read.
        </p>

        <section className="hws-pledge card pad" aria-label="Our pledge">
          {PLEDGE.map(([h, p]) => (
            <div key={h} className="hws-item">
              <span className="hws-tick"><Icon name="check" size={16} /></span>
              <div>
                <b>{h}</b>
                <p className="muted small">{p}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="h-sec">{done ? 'The weights behind your SahiScore' : 'The weights SahiScore starts from'}</h2>
          <p className="muted">
            Every car gets eleven fit scores from 0 to 100. Your answers decide how much each one counts.{' '}
            {done ? 'These are yours, from your SahiFit answers.' : <>Take <Link to="/sahifit" className="link-arrow">SahiFit</Link> and they change to fit your life.</>}
          </p>
          <div className="hws-weights card pad">
            {dims.map((d) => (
              <details key={d} className="hws-w">
                <summary>
                  <span className="hws-name">{DIM_LABEL[d]}</span>
                  <span className="hws-bar"><span style={{ width: `${(w[d] / max) * 100}%` }} /></span>
                  <span className="mono hws-pct">{w[d].toFixed(0)}%</span>
                </summary>
                <p className="small muted">{DIM_HOW[d]}</p>
              </details>
            ))}
          </div>
          <p className="dim small">Tap any row to see how it’s measured.</p>
        </section>

        <section>
          <h2 className="h-sec">Then the deal-breakers</h2>
          <div className="card pad">
            <ul className="reasons">
              <li><Icon name="check" size={16} /> <span><b>Hard filters</b> drop what can never work for you: over budget, too few seats, a missing must-have, a fuel or gearbox you ruled out.</span></li>
              <li><Icon name="check" size={16} /> <span><b>Penalties multiply</b> the score, so one fatal flaw can’t be averaged away: an EV with nowhere to charge, ground clearance far below your roads, an untested car with kids on board, an EMI that would squeeze your month.</span></li>
              <li><Icon name="check" size={16} /> <span><b>Three real choices</b>, not three clones: the best version of each model, and a different body or fuel in third place if it’s close.</span></li>
            </ul>
          </div>
        </section>

        <section className="hws-code card pad">
          <Icon name="cube" size={22} />
          <div>
            <b>Read every line yourself</b>
            <p className="muted small">The SahiScore engine that ranks all {cars.length} models is public on GitHub. If a number looks wrong, it’s our bug — tell us.</p>
          </div>
          <a href={CODE} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">See the code <Icon name="external" size={14} /></a>
        </section>

        <div className="about-cta">
          <Link to={done ? '/results' : '/sahifit'} className="btn btn-primary">{done ? 'Back to my matches' : 'Find my car in 2 minutes'} <Icon name="arrow" /></Link>
          <Link to="/about#data" className="btn btn-ghost">Where our data comes from</Link>
        </div>
      </div>
    </div>
  )
}
