import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div>
          <Logo size={30} />
          <p className="muted small">India’s free, unbiased car advisor. No dealer leads, no sponsored rankings, no selling your number.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Decide</h4>
            <Link to="/sahifit">SahiFit quiz</Link>
            <Link to="/explore">All cars</Link>
            <Link to="/compare">Compare</Link>
            <Link to="/upcoming">Upcoming</Link>
          </div>
          <div>
            <h4>Trust</h4>
            <Link to="/how-we-score">How we score</Link>
            <Link to="/about">How SahiScore works</Link>
            <Link to="/about#data">Where our data comes from</Link>
            <Link to="/about#promise">Our no-bias promise</Link>
          </div>
        </div>
      </div>
      <div className="wrap footer-fine dim">
        Prices are ex-showroom Delhi and on-road estimates; confirm with the dealer before you pay. Crash ratings from Bharat NCAP and Global NCAP.
        Photos from Wikimedia Commons under their licences, or the manufacturer’s own (credited). 3D cars are SahiCar’s own models, without logos.
      </div>
    </footer>
  )
}
