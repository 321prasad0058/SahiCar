// Someone opened a friend's shared match (/?m=tata-nexon&s=87): show whose car it was and invite them to find theirs.
// The tags are read on arrival (lib/entry) and are already gone from the address bar.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { carById } from '../data'
import { sharedMatch } from '../lib/entry'
import { track } from '../lib/track'
import { Icon } from './Icon'

// closed once, it stays closed for the visit
let dismissed = false

export function SharedInvite() {
  const car = carById.get(sharedMatch?.car ?? '')
  const score = sharedMatch?.score ?? 0
  const [open, setOpen] = useState(!dismissed)
  useEffect(() => void (car && track('shared_visit', { car: car.id })), [car])
  if (!car || !open) return null
  return (
    <aside className="invite card" aria-label="A friend’s SahiCar match">
      <button className="icon-btn invite-x" aria-label="Close" onClick={() => { dismissed = true; setOpen(false) }}><Icon name="close" size={16} /></button>
      <span className="dim small">A friend’s right car</span>
      <b>
        {car.brand} {car.model}
        {score > 0 && score <= 100 ? <span className="invite-score"> · SahiScore {Math.round(score)}</span> : null}
      </b>
      <p className="muted small">Theirs fits their life. Two minutes, and you’ll know yours — free, no phone number, no dealer calls.</p>
      <Link to="/sahifit" className="btn btn-primary btn-sm" onClick={() => track('shared_start', { car: car.id })}>
        Find my car <Icon name="arrow" size={16} />
      </Link>
    </aside>
  )
}
