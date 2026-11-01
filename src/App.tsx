import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Toasts } from './components/Toast'
import { setGateNavigator } from './lib/gate'
import { useStore } from './state/store'
import Landing from './pages/Landing'

// the compare tray needs the car database; load it only once something is being compared
const CompareTray = lazy(() => import('./components/CompareTray').then((m) => ({ default: m.CompareTray })))
const Wizard = lazy(() => import('./pages/Wizard'))
const Results = lazy(() => import('./pages/Results'))
const CarDetail = lazy(() => import('./pages/CarDetail'))
const Explore = lazy(() => import('./pages/Explore'))
const Compare = lazy(() => import('./pages/Compare'))
const Upcoming = lazy(() => import('./pages/Upcoming'))
const Garage = lazy(() => import('./pages/Garage'))
const Login = lazy(() => import('./pages/Login'))
const About = lazy(() => import('./pages/About'))
const DevCars = import.meta.env.DEV ? lazy(() => import('./pages/DevCars')) : null

const TITLES: Record<string, string> = {
  '/': 'SahiCar · The right car, honestly',
  '/sahifit': 'SahiFit · Find my car',
  '/results': 'Your SahiCar matches',
  '/explore': 'Explore every car · SahiCar',
  '/compare': 'Compare · SahiCar',
  '/upcoming': 'Upcoming cars · SahiCar',
  '/garage': 'My garage · SahiCar',
  '/login': 'Sign in · SahiCar',
  '/about': 'How SahiCar works',
}

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => setGateNavigator(navigate), [navigate])
  useEffect(() => {
    window.scrollTo(0, 0)
    if (TITLES[pathname]) document.title = TITLES[pathname]
  }, [pathname])
  const dev = pathname.startsWith('/dev/')
  const bare = pathname === '/sahifit' || dev
  const comparing = useStore((st) => st.compare.length > 0)

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {!dev && <Nav />}
      <main id="main">
        <Suspense fallback={<div className="page-loading"><span className="spinner" /></div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sahifit" element={<Wizard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            {DevCars && <Route path="/dev/cars" element={<DevCars />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!bare && <Footer />}
      {comparing && (
        <Suspense fallback={null}>
          <CompareTray />
        </Suspense>
      )}
      <Toasts />
    </>
  )
}

function NotFound() {
  return (
    <section className="page wrap empty">
      <h1>Wrong turn.</h1>
      <p className="muted">That page doesn’t exist.</p>
      <a className="btn btn-primary" href="/">Back home</a>
    </section>
  )
}
