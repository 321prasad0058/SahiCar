# SahiCar: strategy, algorithm and roadmap

_Last updated 30 Oct 2026. The detailed research behind this document is in [`research/competitors.md`](../research/competitors.md),
[`research/onroad.json`](../research/onroad.json), [`research/upcoming.json`](../research/upcoming.json) and the car datasets `research/cars-*.json`._

---

## 1. What SahiCar is

**SahiCar is a free, unbiased car advisor for India.** Car portals answer "which cars exist?". SahiCar answers "which car should *I* buy, which variant, which fuel, and should I buy it now or wait?"

| | |
|---|---|
| **Promise** | The right car, honestly. |
| **For** | First-time and repeat buyers (₹4 L to ₹50 L), across metros, cities, small towns and villages, and the families who decide with them |
| **Job to be done** | "I have a budget, a family, a commute and bad roads. Tell me what to buy and why, without a dealer calling me." |
| **How** | The 2-minute **SahiFit** quiz feeds the **SahiScore** engine. It returns the top 3 picks with the exact variant, the 5-year cost, the reasons, the catches and a buy-or-wait verdict |
| **Why trust us** | No lead forms, no sponsored rankings, no phone number asked, all the working shown, free forever |
| **Personality** | A straight-talking friend who knows cars, not a salesman. Plain words, Indian context (lakh, on-road, ghats, waterlogging, CNG queues) |

**The gap.** The research found that every large Indian car-research brand is now owned by a company that earns from your purchase:
- CarDekho and ZigWheels: dealer leads, insurance and loans.
- CarWale: OEM advertising and leads.
- Team-BHP: owned by Cars24 since April 2025.
- Autocar India: owned by Spinny since March 2025.
- ACKO Drive: owned by insurer ACKO.

None of them shows a total cost of ownership, says which variant to skip, or advises waiting for a new model. An advisor with no conflict of interest is an open niche.

---

## 2. Ten brand names to choose from

All are local, easy to say in any Indian language, and short. **Before choosing, check availability yourself.** Domain availability has not been checked. Run a free trademark search at [IP India](https://ipindiaonline.gov.in/tmrpublicsearch/) in class 35 (advertising and business) and class 42 (software).

| # | Name | Meaning / why it works | Tagline idea |
|---|---|---|---|
| 1 | **SahiCar** _(current, recommended)_ | *Sahi* means right and honest. It says the promise in one word, and the logo already exists | The right car, honestly. |
| 2 | **KaunsiCar** | "Which car?": the exact question every buyer asks family and friends | Kaunsi lein? We'll tell you. |
| 3 | **GaadiGuru** | *Gaadi* (car) + *guru* (trusted advisor) | Your car guru, minus the commission. |
| 4 | **CarSaarthi** | *Saarthi* is a charioteer or guide, as Krishna was to Arjuna | The guide for your next drive. |
| 5 | **PakkaGaadi** | *Pakka* means certain and settled: the car you're sure about | Pakka decision. Pakka car. |
| 6 | **Parakh** | Expert judgement or appraisal, as in *heere ki parakh* (an eye for diamonds) | Car ki sahi parakh. |
| 7 | **TolMol** | The Indian habit of weighing and haggling before buying | We do the tol-mol for you. |
| 8 | **GaadiMitra** | *Mitra* means friend: an advisor on your side | A friend who knows cars. |
| 9 | **Nirnay** | "Decision" in Hindi, Marathi and Sanskrit | One decision, made right. |
| 10 | **SachchiSawari** | *Sachchi* (true) + *sawari* (ride) | The true ride for you. |

**Recommendation: keep SahiCar.** It is the shortest and clearest of the ten, it carries the honesty promise, it works in Hindi, Marathi, Gujarati and Punjabi, and the logo and app icon already exist. KaunsiCar is the strongest backup.

---

## 3. Competitor teardown (summary)

The full table, with each site's revenue model, parameters, strengths, biases and likely tech stack, is in `research/competitors.md`.

| Site | Earns from | Best at | Where it falls short for buyers |
|---|---|---|---|
| CarDekho / ZigWheels | Dealer leads, InsuranceDekho, Rupyy loans, ads | Breadth, SEO, every variant | Lead forms everywhere; on-road price hidden behind "get offers" |
| CarWale / CarTrade | OEM ads, leads, used listings | Editorial reviews, compare tool | Rarely says "don't buy" |
| Cars24 (+ Team-BHP) | Used-car margin, loans | Slick used-car UX | House-inventory pricing |
| Spinny (+ Autocar India) | Used-car retail, finance | Trust and returns policy | Now owns a "neutral" magazine |
| V3Cars | Ads, YouTube | Which-variant-to-buy content | Content, not a tool |
| ACKO Drive | ACKO insurance, dealer deals | Transparent price | Insurance tie-in |
| Droom | Marketplace, Orange Book Value pricing | Used-car valuation | Shrinking marketplace |
| Maruti True Value, Mahindra First Choice | Certified pre-owned margin | Inspections, network | Single brand or franchise |
| OLX Autos | Defunct since Oct 2023 (CarTrade) | n/a | n/a |

### Parameters SahiCar shows, and the ones only SahiCar has

| | SahiCar | Big portals |
|---|---|---|
| Ex-showroom and variant ladder | ✓ | ✓ |
| On-road breakdown for 13 states, with no lead form | ✓ | Behind a form |
| Engine, power, torque, gearbox, claimed mileage | ✓ | ✓ |
| **Real-world mileage estimate** for *your* city/highway mix | ✓ | Some user-reported figures |
| Dimensions, ground clearance, boot, airbags, ADAS, NCAP | ✓ | ✓ |
| **5-year total cost** (fuel + service + insurance + EMI interest − resale) | ✓ | ✗ |
| **Personal ranking with reasons and catches** | ✓ | ✗ |
| **Which variant to buy**, chosen from your budget and must-haves | ✓ | Editorial only |
| **Buy now or wait**, linked to 52 tracked launches | ✓ | Separate news page |
| 360° view | Illustrative 3D at true proportions, plus a link to the OEM's official 360° | Photographed 360° spins |
| User reviews, dealer locator, test-drive booking | Later (phase 3) | ✓ |

### Where the portals get their data, and what we can legally use

| Source | Free? | Can SahiCar use it? |
|---|---|---|
| OEM websites, brochures, price lists | Free | **Yes**, as facts. Don't copy their text or images |
| Bharat NCAP (bharatncap.gov.in), Global NCAP | Free | **Yes** |
| State road-tax notifications, IRDAI third-party premiums | Free | **Yes** |
| PPAC fuel prices, state electricity tariffs | Free | **Yes** |
| VAHAN dashboard (registrations), FADA monthly sales | Free | **Yes**, by manual lookup; VAHAN blocks scraping |
| Wikimedia Commons photos | Free, with credit | **Yes**, credited on every image |
| JATO Dynamics and similar spec databases | Paid | No |
| CarDekho / CarWale databases, reviews, photos, 360 spins | Copyrighted, and their terms forbid scraping | **No.** Never copy them |
| How 360° views are made | Turntable photo sets of 24–72 frames, interior panoramas, OEM CGI | Phase 4: shoot our own at dealer partners, or link to the OEM's |

### About the `rea` tool (github.com/morluto/rea)

`rea` is a local MCP server and CLI that helps AI agents reverse-engineer software: binaries, Android and .NET apps, JS bundles, network captures and websites. For websites it attaches to *your own* Chrome over the DevTools Protocol and passively records page structure, scripts and network metadata. It can also analyse a site's JS bundles without running them, to find the framework, routes and API endpoints.

- **Legitimate use for us:** study competitors' *public front-end architecture* while browsing normally. That means framework, rendering strategy, page weight, third-party trackers, and which page sections and data kinds each page shows. That's how the parameter list above was confirmed.
- **Don't:**
  - Export their data or replay their private APIs.
  - Use its "build an environment from recorded API traffic" feature on competitor sites.
  - Get around bot protection.

  Compiled databases are protected in India and every competitor's terms forbid scraping. Wappalyzer, BuiltWith and Lighthouse answer most of the same questions with less risk.

---

## 4. The SahiScore algorithm

```
SahiFit answers ─┐
                 ▼
  1. EXPAND   each model → every fuel × gearbox configuration
              → choose the trim you'd buy (must-haves + feature appetite),
                stepping down the price ladder until on-road ≤ budget × (1 + stretch)
                 ▼
  2. FILTER   budget · seats · must-have features · refused fuel/gearbox/brand/body
              (each car is dropped for one stated reason: "68 over budget, e.g. …")
                 ▼
  3. SCORE    11 fit dimensions, each 0–100:
              5-yr TCO · Fuel match · Safety · Space · Road & terrain · Easy to drive
              Budget fit · Features · Ownership · Performance · Future-proof
                 ▼
  4. WEIGHT   base weights × 2^((priority − 3)/2) × context
              (kids → safety ×1.3, >15k km/yr → cost ×1.25, rough roads → terrain ×1.6,
               small town → ownership ×1.4, heavy traffic → drive ×1.3, elders/5+ → space ×1.2)
                 ▼
  5. PENALISE multiplicative deal-breakers so one flaw can't be averaged away
              (EV without charging ×0.78, ground clearance >20 mm short ×0.85, over budget,
               forced lower trim ×0.95, untested car with kids ×0.95, no CNG nearby ×0.8)
                 ▼
  6. RANK     best configuration per model → top 3 with a diversity rule
              (the 3rd slot goes to a different body or fuel if within 4 points) + badges
                 ▼
  7. TIME     buy / consider waiting / wait, from 52 tracked launches
              + stretch hint (re-run at +12% budget; flag a clearly better car)
```

Key India-specific modelling choices, all in `src/engine/`:
- **On-road price:**
  - Road tax by state, fuel and price slab; Rajasthan slabs by engine size.
  - EV waivers (Delhi 0% up to ₹30 L; Karnataka 5/8/10%; Telangana 0% until 31 Dec 2026).
  - 1% TCS above ₹10 L, shown in the price but left out of the cost because it can be reclaimed in your tax return.
  - FASTag and first-year insurance by segment.
- **Real-world efficiency:**
  - Claimed figures are adjusted for the city/highway mix: petrol 68–85%, diesel 75–87%, CNG 75–85%, strong hybrid 88% in the city falling to 78% on highways, EV range 78% falling to 68%.
  - CNG cars are assumed to run about 10% of the time on petrol.
  - EV charging adds about 12% in losses and is costed at home, office or public DC rates.
- **Fuel match:**
  - Diesel needs more than about 10–15k km a year and is penalised for Delhi-NCR's 10-year rule.
  - CNG needs a pump nearby, takes boot space (Tata and Hyundai twin-cylinder setups keep more of it) and loses power in the ghats.
  - EVs need somewhere to charge, real range of at least 1.4× the daily distance, and fewer long trips.
- **Safety:**
  - Bharat NCAP adult plus child stars, with child stars counting double when there are kids.
  - Pre-2022 Global NCAP results are discounted 15%.
  - Untested cars get a cautious score from their airbags and ESC.
  - ADAS earns a small bonus that grows with highway driving.
- **Terrain:**
  - Ground clearance targets: 160 mm for smooth roads, 172 mixed, 185 rough, 200 unpaved, plus 10 mm in waterlogging areas.
  - Power-to-weight counts for the hills.
- **Resale:** 0.88 × 0.86^years, adjusted for the brand's resale strength, an EV discount, the NCR diesel rule and high mileage.

The engine runs in about 1–5 ms for 142 models, entirely in the browser. That means no server and no cost, and the answers never leave the device unless the user signs in. `npm run test:engine` runs seven buyer personas and checks the results make sense.

---

## 5. Product flow

```
Landing (3D night drive, GSAP)
   │  "Find my car in 2 minutes"
   ▼
SahiFit wizard (9 screens, live "N of 142 cars fit" + blurred "leading so far")
   budget & loan → state & place → km & highway % → roads → family → city driving
   → charging & CNG → priorities (1–5) → must-haves & body style
   ▼
Results ── Top 3 podium (exact variant · on-road · EMI · ₹/km · reasons · catches · buy/wait)
   │       Why #1 wins (11 weighted bars) · stretch hint · ranks 4–15 · what we ruled out
   ├──► Car page: photo / 3D 360° studio · specs · variant ladder with on-road per state
   │              · on-road breakdown · 5-yr cost bars · safety · rivals · upcoming
   ├──► Compare (up to 3, best value in each row highlighted)
   ├──► Garage (saved cars; synced to the user's account when signed in)
   └──► Upcoming (timeline + dates that move prices)
Sign-in (optional): Google or email, through Firebase Auth; Firestore keeps answers and garage
```

---

## 6. Roadmap

**Rule for every phase: no paid subscriptions.** Use only free tiers: Firebase Spark, GitHub, Wikimedia and public government data.

### Phase 0: MVP (built, in this repo)
- [x] Landing page with a three.js and GSAP night drive, scroll-driven body-style morph and bloom.
- [x] SahiFit wizard, SahiScore engine, buy/wait engine, stretch hint.
- [x] 142 models from 20 brands, 1,200+ variants, 13 state tax tables, 52 upcoming launches, 9 pricing events.
- [x] Car pages with a 3D studio at true proportions, on-road and 5-year cost, compare, explore, garage.
- [x] Firebase Auth (Google and email) and Firestore rules; works fully without sign-in.

### Phase 0.5: real cars and official images (built)
- [x] Five body-style cars for the landing page: electric SUV, hatchback, sedan, SUV and MPV. Each is modelled on a popular car by tracing side, front and rear photos on a calibrated grid. The site never names them, and no logos are modelled. Car pages use the exact model for those cars and an illustrative body style, at real size, for every other car.
- [x] An optional slot for licensed exact 3D models (`src/webgl/cars/models.ts`), the route to photo-identical cars.
- [x] Studio lighting baked from procedural softboxes (no HDR download), wrap-around lamp signatures, Indian plates (green for EVs).
- [x] Performance guards for slow devices and connections: static first paint, adaptive resolution, static fallback, service worker. Measured at 60 fps with the CPU throttled 6×, and the headline shows in 1.8 s on slow 3G.
- [x] Official-image pipeline (`scripts/official-images.mjs`), ready to run. Before going public, get permission from each brand's press office.

### Phase 1: launch and data trust (weeks 1–4)
1. Create the Firebase project on the Spark plan, enable Google and email sign-in, `npm run deploy`.
2. **Data QA pass:**
   - Prices the research agents flagged: Victoris top trims, e Vitara dual-tone, Alcazar, Fortuner, XUV 7XO, VF7.
   - BNCAP adult/child splits recorded as 5/5: Altroz, Nexon, Seltos, Syros, BE 6, XEV 9e.
   - Missing ground clearance (about 60 cars) and boot space.
   - Decide on the Nissan X-Trail, which may be leftover stock only.
3. Add a "Report a wrong number" button that writes to a moderated Firestore collection (free tier).
4. **SEO:** pre-render `/car/:id` pages to static HTML at build time with a small script, and add a sitemap. Free, and the biggest source of traffic.
5. Free privacy-friendly analytics, such as GA4 or Firebase Analytics, tracking only funnel steps.
6. Watch the Spark hosting limit (about 360 MB a day of transfer, roughly 300–400 first visits). If traffic outgrows it, move static hosting to Cloudflare Pages (free, generous bandwidth) and keep Firebase Auth and Firestore free.

### Phase 2: depth (months 2–3)
- Per-variant feature matrix, so the "which trim" step is exact, plus a "skip this variant" verdict.
- All 36 states and union territories, plus city-level fuel prices; refresh monthly with a GitHub Actions cron (free) that rebuilds the data and redeploys.
- EV charger density near the user from the OpenChargeMap API (free), feeding the EV fuel-match score.
- Hindi, then Marathi, Tamil, Telugu, Kannada and Bengali.
- Shareable result cards (a client-side canvas image) and WhatsApp share, the main growth loop in India.
- A "what changes if…" mode: sliders on the results page re-rank live (the engine is fast enough).

### Phase 3: community and ownership (months 4–6)
- Owner-reported real mileage and service bills (Firestore, moderated), used to calibrate the correction factors.
- A free negotiation sheet PDF, generated in the browser: fair on-road price, the variant, offers to ask for, what to refuse (extended warranty mark-ups, "handling charges").
- Test-drive checklist tailored to the user's answers, plus a dealer visit plan.
- Post-purchase companion: fuel and service log, insurance renewal reminder, resale tracker.

### Phase 4: intelligence and reach (months 6–12)
- SahiScore v2: tune weights against what users actually buy and their satisfaction after 6 months (collected with consent).
- Used-car mode, scored on the same engine, with resale curves from community data rather than scraped listings.
- Push alerts for "your car is launching" and price drops through Firebase Cloud Messaging (free), triggered from the GitHub Actions cron.
- An installable PWA (manifest already shipped). A Play Store listing through TWA is optional: it costs a one-time $25 fee, not a subscription.
- Our own 360° spins: a phone on a turntable, 36 frames, shot at friendly dealerships, credited and owned by us.

### Earning money without bias (optional, later)
The brief mentions dealer lead matching, negotiation dossiers and loan or insurance affiliates. If you ever switch these on, keep the promise:
- Only after the recommendation is shown.
- Always labelled.
- Never an input to SahiScore. The engine has no field for it, and it should stay that way.
- Core advice stays free; paid dossiers would conflict with "100% free", so keep any extras optional.

---

## 7. Tech stack (same as `port`, plus Firebase as in Kosha)

| Layer | Choice | Cost |
|---|---|---|
| Build | Vite 8, TypeScript 6, React 19, react-router 7 | Free |
| Motion and 3D | GSAP 3 (ScrollTrigger, SplitText), Lenis, three.js (UnrealBloom, RoomEnvironment, OrbitControls) | Free |
| State | zustand (persisted to localStorage) | Free |
| Auth and DB | Firebase Auth (Google, email) and Firestore, Spark plan, rules in `firestore.rules` | Free |
| Hosting | Firebase Hosting (Spark) | Free |
| Data | `research/*.json`, built into `src/data` by `scripts/build-data.mjs` | Free |
| Images | Wikimedia Commons via the Wikipedia REST API (`scripts/fetch-images.mjs`), credited | Free |
| Fonts | Google Fonts (Sora, Manrope, JetBrains Mono) | Free |

Avoid anything that needs the Blaze (pay-as-you-go) plan, such as Cloud Functions, phone/SMS auth or scheduled functions. Use GitHub Actions for scheduled jobs.
