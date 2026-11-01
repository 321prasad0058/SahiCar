// Home page EMI estimator: three inputs, the monthly figure at the best published rate, and a way into the
// full calculator with the same numbers.
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LENDERS } from '../data/loans'
import { quotes } from '../engine/loan'
import { inr, lakh } from '../lib/format'
import { Icon } from './Icon'

const P_MIN = 300000, P_MAX = 5000000
const toPrice = (i: number) => { const v = P_MIN * (P_MAX / P_MIN) ** (i / 1000); return v < 2000000 ? Math.round(v / 25000) * 25000 : Math.round(v / 100000) * 100000 }
const fromPrice = (v: number) => Math.round((Math.log(v / P_MIN) / Math.log(P_MAX / P_MIN)) * 1000)

export function EmiTeaser() {
  const [price, setPrice] = useState(1000000)
  const [down, setDown] = useState(20)
  const [years, setYears] = useState(5)
  const loan = Math.round(price * (1 - down / 100))
  const top = useMemo(() => quotes({ loan, years, score: 'excellent', ev: false }).find((q) => q.allowed), [loan, years])
  if (!top) return null
  return (
    <div className="emi-teaser card" data-reveal>
      <div className="et-in">
        <div className="et-row">
          <span className="et-label">On-road price</span>
          <b>{lakh(price)}</b>
        </div>
        <input
          type="range"
          aria-label="On-road price"
          min={0}
          max={1000}
          value={fromPrice(price)}
          style={{ ['--fill' as string]: `${fromPrice(price) / 10}%` }}
          onChange={(e) => setPrice(toPrice(Number(e.target.value)))}
        />
        <div className="et-row">
          <span className="et-label">Down payment</span>
          <div className="quick">
            {[10, 20, 30].map((p) => <button key={p} className={`pick ${down === p ? 'on' : ''}`} onClick={() => setDown(p)}>{p}%</button>)}
          </div>
        </div>
        <div className="et-row">
          <span className="et-label">Years</span>
          <div className="quick">
            {[3, 4, 5, 7].map((y) => <button key={y} className={`pick ${years === y ? 'on' : ''}`} onClick={() => setYears(y)}>{y}</button>)}
          </div>
        </div>
      </div>
      <div className="et-out">
        <span className="dim small">EMI from</span>
        <div className="et-big">{inr(top.emi)}<span>/month</span></div>
        <span className="small muted">at {top.rate.toFixed(2)}% · {top.lender.name} · {lakh(loan)} loan</span>
        <Link to={`/emi?price=${price}&down=${down}&years=${years}&from=home`} className="btn btn-primary">
          Compare all {LENDERS.length} lenders <Icon name="arrow" size={16} />
        </Link>
        <span className="dim small">Published rates for a 750+ credit score; yours may differ.</span>
      </div>
    </div>
  )
}
