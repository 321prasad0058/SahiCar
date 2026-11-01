import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { cars, upcoming, states } from '../data'
import { DEFAULT_ANSWERS } from '../engine/answers'
import { DIM_LABEL, weightsFor, type Dim } from '../engine/sahiscore'

const DIM_HOW: Record<Dim, string> = {
  tco: 'On-road price for your state + fuel or charging at real-world mileage + service, tyres and insurance renewals + loan interest − resale value, over the years you’ll keep it. Scored against the cheapest car you could actually buy.',
  safety: 'Bharat NCAP adult and child stars (child stars count double if you have kids). Older, easier Global NCAP results are discounted. Untested cars get a cautious score from airbags and ESC. ADAS adds a little, more if you drive highways.',
  space: 'Wheelbase against how many people ride, boot against your luggage (CNG cylinders eat boot space), cabin height for elderly passengers, and a third row if you sometimes need one.',
  fuel: 'Does the fuel suit your life? EVs need home or office charging and enough real range for your day. Diesel needs high mileage, and Delhi-NCR’s 10-year rule counts against it. CNG needs a pump nearby and suffers in the hills. Strong hybrids shine in city traffic.',
  budget: 'Cars that use 80–100% of your budget score highest. Much cheaper cars score a little lower (you said you could spend more), and anything in your “stretch” zone loses points steadily.',
  drive: 'Gearbox against your traffic (a torque-converter, CVT or DCT beats an AMT, which beats a manual in jams), length against your parking, turning circle, and a bonus for compact, forgiving cars if it’s your first.',
  ownership: 'Resale strength, service cost and how far the service network reaches — weighted more heavily if you live in a small town or village.',
  terrain: 'Ground clearance against what your roads need: about 160 mm for smooth roads, 172 for mixed, 185 for rough, 200 for unpaved, +10 mm if your area floods. Power-to-weight counts if you drive in the hills.',
  features: 'How well equipped the car is, scaled by how far up the trim ladder your budget reaches.',
  performance: 'Power-to-weight, plus torque if you spend a lot of time on highways.',
  fresh: 'How recently the car was launched or updated. An old design is likelier to be replaced soon.',
}

export default function About() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])
  const w = weightsFor(DEFAULT_ANSWERS)
  const dims = (Object.keys(w) as Dim[]).sort((a, b) => w[b] - w[a])

  return (
    <div className="page about">
      <div className="wrap narrow">
        <div className="eyebrow">What SahiCar is</div>
        <h1>An honest car advisor for India. <span className="grad">Free, and on your side.</span></h1>
        <p className="lead">
          <b>Sahi</b> means right, and honest. SahiCar is a free advisor that answers one question: <i>which car should I buy?</i> It doesn’t answer
          “which cars exist?” — we score {cars.length} models against your budget, your city, your roads and your family, and give you three answers
          with the reasons and the catches.
        </p>

        <section id="promise" className="promise card pad">
          <h2 className="h-sec">The no-bias promise</h2>
          <ul className="reasons">
            <li><Icon name="check" /> No dealer or carmaker pays for placement. Rankings come from the SahiScore formula and nothing else.</li>
            <li><Icon name="check" /> We never ask for your phone number, and never sell a “lead”.</li>
            <li><Icon name="check" /> Every number shows its working: on-road tax, real-world mileage, the 5-year cost.</li>
            <li><Icon name="check" /> If a better or updated car is about to launch, we say so — even if that means you don’t buy today.</li>
            <li><Icon name="check" /> Free forever, no subscription, no sign-up needed to see results.</li>
          </ul>
        </section>

        <section id="method">
          <h2 className="h-sec">How SahiScore picks your car</h2>
          <ol className="steps">
            <li><b>Every configuration, not just every model.</b> Each car is split into its fuel × gearbox combinations, and for each one we pick the trim you’d actually buy. That’s the trim your must-haves and feature appetite call for, stepped down the price list until the on-road price fits your budget.</li>
            <li><b>Hard filters.</b> Over budget (plus the stretch you allowed), too few seats, a missing must-have, a fuel or gearbox you ruled out. You’ll see exactly how many cars each rule removed.</li>
            <li><b>Eleven fit scores, 0–100.</b> Listed below, each tuned to Indian conditions.</li>
            <li><b>Your weights.</b> Each starts from a balanced base. Your 1–5 priorities scale it (each step is ×√2), then your situation nudges it: kids raise safety, long commutes raise running cost, bad roads raise terrain, a small town raises the weight of the service network.</li>
            <li><b>Deal-breaker multipliers.</b> An EV with nowhere to charge, ground clearance far below your roads, going over budget, an untested car with kids aboard. These <i>multiply</i> the score, so one fatal flaw can’t be averaged away.</li>
            <li><b>Top three, not three clones.</b> The best configuration of each model is kept. The third slot goes to a different body style or fuel if it’s within 4 points, so you see a real alternative.</li>
            <li><b>Buy or wait.</b> Each pick is checked against {upcoming.length} upcoming launches. If its own new generation is under six months away, we say <i>wait</i>. If a strong rival is coming, we say <i>consider waiting</i>.</li>
            <li><b>Stretch hint.</b> We re-run the scoring with 12% more budget. If that unlocks a clearly better car, we tell you how much more it would take.</li>
          </ol>

          <div className="dims">
            {dims.map((d) => (
              <div key={d} className="dim-card card">
                <div className="dim-head">
                  <b>{DIM_LABEL[d]}</b>
                  <span className="mono dim small">base {w[d].toFixed(0)}%</span>
                </div>
                <p className="small muted">{DIM_HOW[d]}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="data">
          <h2 className="h-sec">Where our data comes from</h2>
          <div className="card pad">
            <ul className="src-list">
              <li><b>Specs and prices:</b> carmakers’ own websites, brochures and price lists, cross-checked against public listings. Ex-showroom Delhi prices after the September 2025 GST change, verified October 2026.</li>
              <li><b>Crash ratings:</b> Bharat NCAP (bharatncap.gov.in) and Global NCAP published results.</li>
              <li><b>On-road price:</b> state road tax rules for {states.length} states by fuel and price slab, the 1% TCS above ₹10 lakh, registration, FASTag, and typical first-year insurance.</li>
              <li><b>Fuel and power prices:</b> public city prices for petrol, diesel and CNG (PPAC and the oil companies), and state electricity tariffs.</li>
              <li><b>Real-world mileage:</b> correction factors from claimed (ARAI/MIDC) figures by fuel type and city/highway mix.</li>
              <li><b>Upcoming launches:</b> carmaker announcements and well-sourced automotive news. Each one is marked confirmed, testing or rumoured.</li>
              <li><b>Photos:</b> openly licensed photos from Wikimedia Commons, credited to their photographers on every image. Where no free photo of the current model exists, we show an outline rather than an older model. 3D views are illustrative body styles built at each car’s real proportions.</li>
            </ul>
            <p className="small dim">We don’t copy reviews, photos or databases from other car portals. If you spot a wrong number, it’s our bug — tell us.</p>
          </div>
        </section>

        <section id="privacy">
          <h2 className="h-sec">Your data and privacy</h2>
          <div className="card pad">
            <ul className="src-list">
              <li><b>Without an account:</b> your quiz answers, garage and compare list stay in this browser. We record anonymous page views and product events (for example “quiz finished” or “no car matched”, with the choices but never your name or email) to improve SahiCar.</li>
              <li><b>With a free account:</b> we store your name, email, quiz answers and saved cars in Google Firebase, in Mumbai, so they sync across your devices. Your activity is linked to a random account ID, not your email.</li>
              <li><b>How long we keep it:</b> for as long as you use your account. If you don’t sign in for two years, we delete the account and everything in it.</li>
              <li><b>What we never do:</b> sell your data, or share it with dealers, lenders, insurers or advertisers. No sales calls, ever.</li>
              <li><b>Your rights:</b> you can see and change your answers and saved cars any time, and delete your account and all its data from your garage in one step, under India’s Digital Personal Data Protection Act, 2023.</li>
            </ul>
          </div>
        </section>

        <div className="about-cta">
          <Link to="/sahifit" className="btn btn-primary">Try SahiFit <Icon name="arrow" /></Link>
        </div>
      </div>
    </div>
  )
}
