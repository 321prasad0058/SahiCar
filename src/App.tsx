import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Toasts } from './components/Toast'
import { useFeedback } from './lib/feedback'
import { maybeNudge, useInstall } from './lib/install'
import { setGateNavigator } from './lib/gate'
import { useStore } from './state/store'
import Landing from './pages/Landing'
import { SITE, crumbs, setSeo } from './lib/seo'

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
const Emi = lazy(() => import('./pages/Emi'))
const AppPage = lazy(() => import('./pages/AppPage'))
const HowWeScore = lazy(() => import('./pages/HowWeScore'))
const FeedbackSheet = lazy(() => import('./components/Feedback'))
const GetApp = lazy(() => import('./components/GetApp'))
const AppCoach = lazy(() => import('./components/AppCoach'))
const DevCars = import.meta.env.DEV ? lazy(() => import('./pages/DevCars')) : null

// search title + description for each fixed page (car pages set their own in CarDetail)
const PAGES: Record<string, [string, string]> = {
  '/': ['SahiCar · The right car, honestly', "SahiCar is India's free, unbiased car advisor. Answer a 2-minute SahiFit quiz and the SahiScore engine ranks every car, variant and fuel on 5-year cost, Bharat NCAP safety, your roads and your family — and tells you whether to buy now or wait."],
  '/sahifit': ['Which car should I buy? Free 2-minute car finder · SahiCar', 'Answer 9 quick questions about your budget, family, city and driving. SahiScore ranks every new car in India for you — free, no dealer calls.'],
  '/results': ['Your SahiCar matches', 'Your ranked list of the right cars for your budget, family and roads.'],
  '/explore': ['All new cars in India: prices, on-road cost and scores · SahiCar', 'Every new car on sale in India with ex-showroom and on-road prices, 5-year running cost, Bharat NCAP safety and SahiScore. Filter by budget, body type and fuel.'],
  '/compare': ['Compare cars side by side · SahiCar', 'Compare new cars in India on price, on-road cost, mileage, safety, features and 5-year running cost — free and unbiased.'],
  '/upcoming': ['Upcoming cars in India: launch dates and expected prices · SahiCar', 'New cars launching soon in India, with expected prices and launch timing, so you know whether to buy now or wait.'],
  '/garage': ['My garage · SahiCar', 'Your saved cars and price alerts on SahiCar.'],
  '/login': ['Sign in · SahiCar', 'Sign in to save cars and get price alerts on SahiCar.'],
  '/about': ["About SahiCar: India's unbiased car advisor", 'No dealer leads and no sponsored rankings. How SahiCar works, where the data comes from and why it is free.'],
  '/emi': ['Car loan EMI calculator India · SahiCar', 'Calculate your car loan EMI, down payment and total interest for any new car in India, and check what your salary can comfortably afford.'],
  '/app': ['Get the SahiCar app · free, no app store', 'Install SahiCar on your phone in one tap: free, no app store, works offline.'],
  '/how-we-score': ['How SahiScore works · SahiCar', 'How SahiCar scores every car: 5-year cost of ownership, Bharat NCAP safety and fit for your roads and family, explained in plain words.'],
}

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => setGateNavigator(navigate), [navigate])
  useEffect(() => {
    window.scrollTo(0, 0)
    const pg = PAGES[pathname]
    if (pg) setSeo({ title: pg[0], description: pg[1], path: pathname, ld: pathname === '/' ? [{ '@type': 'WebSite', name: 'SahiCar', url: SITE + '/', publisher: { '@id': SITE + '/#org' } }] : [crumbs([['Home', '/'], [pg[0].split(' · ')[0], pathname]])] })
  }, [pathname])
  const dev = pathname.startsWith('/dev/')
  const bare = pathname === '/sahifit' || dev
  const comparing = useStore((st) => st.compare.length > 0)
  const feedback = useFeedback((f) => f.open)
  const getApp = useInstall((i) => i.open)
  const coaching = useInstall((i) => i.coach || i.nudge !== null)
  // on an iPhone, offer the app once, a little after the person has got something worth coming back to
  useEffect(() => {
    const reason = pathname === '/results' ? 'results' : pathname === '/emi' ? 'emi' : null
    if (!reason) return
    const t = setTimeout(() => maybeNudge(reason), 8000)
    return () => clearTimeout(t)
  }, [pathname])

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
            <Route path="/emi" element={<Emi />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/how-we-score" element={<HowWeScore />} />
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
      {feedback && (
        <Suspense fallback={null}>
          <FeedbackSheet />
        </Suspense>
      )}
      {getApp && (
        <Suspense fallback={null}>
          <GetApp />
        </Suspense>
      )}
      {coaching && (
        <Suspense fallback={null}>
          <AppCoach />
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
