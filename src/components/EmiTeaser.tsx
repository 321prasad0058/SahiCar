// Home page hook into the EMI calculator: one slim bar with a live example and a button, not the calculator itself.
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LENDERS } from '../data/loans'
import { quotes } from '../engine/loan'
import { inr } from '../lib/format'
import { Icon } from './Icon'

// a typical first car: ₹10 lakh on-road, 20% down, 5 years
const EXAMPLE = { price: 1000000, down: 20, years: 5 }

export function EmiTeaser() {
  const top = useMemo(() => quotes({ loan: EXAMPLE.price * (1 - EXAMPLE.down / 100), years: EXAMPLE.years, score: 'excellent', ev: false }).find((q) => q.allowed), [])
  return (
    <Link to="/emi?from=home" className="emi-hook card">
      <span className="eh-icon" aria-hidden><Icon name="wallet" size={22} /></span>
      <span className="eh-text">
        <b>Know your EMI before the showroom tells you.</b>
        <span className="muted small">
          {top ? <>A ₹10 lakh car: from <b className="eh-num">{inr(top.emi)}/month</b> at {top.rate.toFixed(2)}%. </> : null}
          Compare {LENDERS.length} lenders’ published rates for your loan in 30 seconds.
        </span>
      </span>
      <span className="btn btn-primary eh-btn">Calculate my EMI <Icon name="arrow" size={16} /></span>
    </Link>
  )
}
