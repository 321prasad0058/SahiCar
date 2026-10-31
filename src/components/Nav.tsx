import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../state/auth'
import { useStore } from '../state/store'
import { Icon } from './Icon'
import { Logo } from './Logo'

export function Nav() {
  const { pathname } = useLocation()
  const user = useAuth((s) => s.user)
  const enabled = useAuth((s) => s.enabled)
  const garage = useStore((s) => s.garage.length)
  const done = useStore((s) => s.done)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(scrollY > 24)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`nav ${scrolled || pathname !== '/' ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-in">
        <Link to="/" aria-label="SahiCar home"><Logo /></Link>
        <nav className="nav-links">
          <NavLink to={done ? '/results' : '/sahifit'}>{done ? 'My matches' : 'Find my car'}</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/upcoming">Upcoming</NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/about">How it works</NavLink>
        </nav>
        <div className="nav-end">
          <Link to="/garage" className="icon-btn" aria-label={`Garage, ${garage} saved`}>
            <Icon name="heart" />
            {garage > 0 && <span className="dot-count">{garage}</span>}
          </Link>
          {enabled &&
            (user ? (
              <Link to="/garage" className="avatar" title={user.email ?? ''}>
                {user.photoURL ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" /> : (user.displayName ?? user.email ?? '?')[0].toUpperCase()}
              </Link>
            ) : (
              <Link to="/login" className="btn btn-ghost btn-sm hide-sm">Sign in</Link>
            ))}
          <Link to="/sahifit" className="btn btn-primary btn-sm hide-sm">Start SahiFit</Link>
          <button className="icon-btn show-sm" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <div className="nav-sheet">
        <NavLink to="/sahifit">Find my car</NavLink>
        {done && <NavLink to="/results">My matches</NavLink>}
        <NavLink to="/explore">Explore all cars</NavLink>
        <NavLink to="/upcoming">Upcoming launches</NavLink>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink to="/garage">My garage</NavLink>
        <NavLink to="/about">How it works</NavLink>
        {enabled && !user && <NavLink to="/login">Sign in</NavLink>}
      </div>
    </header>
  )
}
