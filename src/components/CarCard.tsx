import { Link } from 'react-router-dom'
import type { Car } from '../data/types'
import { BODY_LABEL, FUEL_LABEL } from '../data/types'
import { priceRange } from '../lib/format'
import { toggleCompareGated, toggleSave } from '../lib/gate'
import { useStore } from '../state/store'
import { CarImage } from './CarImage'
import { Icon } from './Icon'
import { toast } from './Toast'

export function SafetyStars({ car }: { car: Car }) {
  if (car.safety.adult == null) return <span className="chip">Not crash-tested</span>
  return (
    <span className={`chip ${car.safety.adult >= 5 ? 'green' : car.safety.adult >= 4 ? 'cyan' : 'amber'}`} title={`${car.safety.agency} ${car.safety.year ?? ''}`}>
      {car.safety.adult}★ {car.safety.agency === 'BNCAP' ? 'Bharat NCAP' : car.safety.agency}
    </span>
  )
}

export function CarCard({ car, score }: { car: Car; score?: number }) {
  const saved = useStore((s) => s.garage.includes(car.id))
  const comparing = useStore((s) => s.compare.includes(car.id))
  const fuels = [...new Set(car.powertrains.map((p) => p.fuel))]
  return (
    <article className="car-card card">
      <Link to={`/car/${car.id}`} className="car-card-link" aria-label={`${car.brand} ${car.model}`}>
        <CarImage official={car.official} small image={car.image} wiki={car.wiki} body={car.body} alt={`${car.brand} ${car.model}`} />
        <div className="car-card-body">
          <div className="dim small">{car.brand}</div>
          <h3>{car.model}</h3>
          <div className="price">{priceRange(car.price)}<span className="dim"> ex-showroom</span></div>
          <div className="chips">
            <span className="chip">{BODY_LABEL[car.body]}</span>
            {fuels.map((f) => <span key={f} className={`chip ${f === 'ev' ? 'green' : ''}`}>{FUEL_LABEL[f]}</span>)}
            <SafetyStars car={car} />
          </div>
        </div>
      </Link>
      {score != null && <div className="card-score">{score.toFixed(0)}</div>}
      <div className="card-actions">
        <button
          className={`icon-btn ${saved ? 'on' : ''}`}
          aria-label={saved ? 'Remove from garage' : 'Save to garage'}
          onClick={() => toggleSave(car.id, (on) => toast(on ? `${car.model} saved to your garage` : `${car.model} removed`))}
        >
          <Icon name="heart" />
        </button>
        <button className={`icon-btn ${comparing ? 'on' : ''}`} aria-label="Compare" onClick={() => toggleCompareGated(car.id)}>
          <Icon name="compare" />
        </button>
      </div>
    </article>
  )
}
