# SahiCar

**The right car, honestly.** SahiCar is a free, unbiased car advisor for India. You answer the 2-minute **SahiFit** quiz and the
**SahiScore** engine ranks every car, fuel, gearbox and variant on its 5-year cost, safety, your roads and your family. It then
tells you whether to buy now or wait for a launch.

**Live:** [sahicar-in.web.app](https://sahicar-in.web.app)

The strategy, competitor research, 10 name options, a full description of the algorithm and the roadmap are in [docs/STRATEGY.md](docs/STRATEGY.md).

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
```

Everything works without Firebase: sign-in is hidden and the garage is kept in the browser.

## Data

```
research/cars-*.json        researched car data (see research/SCHEMA.md)
research/upcoming.json      upcoming launches         research/timing-events.json  dates that move prices
research/onroad.json        state road tax, fuel prices, insurance %
research/images.json        Wikimedia photo cache     research/competitors.md      competitor & data-source research
        │
        └─ npm run data  →  src/data/*.json   (validates, normalises brands/fuels, drops bad rows; runs on every build)
```

- `npm run images` resolves free Wikimedia Commons photos for new cars. Run `npm run data` afterwards.
- `npm run test:engine` runs SahiScore for seven typical Indian buyers and prints their top 3, so you can check behaviour after changing data or weights.

To update prices, edit the research JSON (or have an agent re-research a brand) and rebuild. Keep `verifiedOn` and `sources` honest.

## Official car images

`scripts/official-images.mjs` visits each car's official page in headless Chrome, scores the candidate images and
self-hosts the best as small WebP files in `public/cars/`. It prefers the studio cut-outs used in colour pickers,
then plain studio backdrops. The app uses them automatically, on a studio backdrop with a reflection, and falls back to the Wikimedia photo.

```bash
npm run official:collect          # all cars (resumes; --force to redo), or pass ids: npm run official:collect -- tata-altroz
npm run official:pick             # download, score, convert to WebP
npm run official:sheet            # contact sheets in research/sheets/ to check the picks by eye
npm run data                      # rebuild the app data
```

- **Wrong pick:** pin the right image URL in `research/official-overrides.json` (`{ "car-id": "https://…" }`, or `null` to skip a car).
  When `cars.json` only knows a homepage, add the model page to `research/official-pages.json`.
- **Tata pages:** in Oct 2026 `cars.tatamotors.com` and `ev.tatamotors.com` served an expired TLS certificate. The script does not bypass
  certificate checks, so for Tata use press-release pages on `www.tatamotors.com`; the Altroz and Sierra pages are already listed.
- **Permission:** manufacturer images are copyrighted. Credit stays on every image, but get permission from each brand's
  press office before going public, or delete `research/official-images.json` to go back to the free Wikimedia photos.

## Firebase (free Spark plan)

1. Create a project at console.firebase.google.com (Spark plan) and add a Web app.
2. In Authentication, enable the **Google** and **Email/Password** sign-in methods, and add your domain to authorised domains.
3. Create a **Firestore** database in production mode.
4. Copy `.env.example` to `.env.local` and fill in `VITE_FIREBASE_*`.
5. Put your project id in `.firebaserc`, then run:

```bash
npx firebase login
npm run deploy         # builds, then deploys hosting + firestore rules
```

To develop against the local emulators, set `VITE_FIREBASE_EMULATORS=1` and `VITE_FIREBASE_PROJECT_ID=demo-sahicar` in `.env.development.local`, then run `npm run emulators`.

Firestore holds only `users/{uid}` (name, email, SahiFit answers) and `users/{uid}/garage/{carId}`. Only the owner can read or write them; see [firestore.rules](firestore.rules).

## Code map

| Path | What |
|---|---|
| `src/engine/sahiscore.ts` | The recommendation engine: configurations, filters, 11 sub-scores, weights, penalties, top-3 |
| `src/engine/costs.ts` | On-road price, real-world efficiency, EMI, resale, 5-year total cost |
| `src/engine/timing.ts` | Buy now / consider waiting / wait |
| `src/engine/answers.ts` | SahiFit questions' shape and defaults |
| `src/webgl/cars/loft.ts` | Lofted car bodies: side profile, plan-view taper and rounded sections, tagged paint/cladding/roof/pillar/glass |
| `src/webgl/cars/specs.ts` | The five showcase cars, traced from side/front/rear photos on a pixel grid and calibrated to published dimensions (see the file header for the method) |
| `src/webgl/cars/models.ts` | Optional slot for licensed exact `.glb` models; they replace the procedural car once downloaded |
| `src/webgl/cars/build.ts` | Turns a spec into a car: lofted body with shoulder crease and plan-view nose curve, raked pillars, cladding, traced lamp/grille outlines projected onto the body, wheels, Indian plates; merged by material |
| `src/webgl/HeroWorld.ts` | Landing hero: five body-style cars cycling in place every 2 s (SUV → Sedan → EV → Hatchback → MPV), framed inside the measured stage on any screen, adaptive quality, stops when scrolled away |
| `src/webgl/Studio.ts`, `env.ts` | The 3D 360° studio on car pages, and procedural studio/night lighting (no HDR download) |
| `/dev/cars?car=…&shot=side\|front\|rear\|f34` | Dev-only long-lens shots for comparing a model against its reference photos |
| `src/pages/*` | Landing, Wizard, Results, CarDetail, Explore, Compare, Upcoming, Garage, Login, About |
| `src/fb/*`, `src/state/*` | Firebase (lazy-loaded), auth, persisted app state |

## Performance and reliability

- **Instant first paint:** `index.html` contains a static hero, so the headline shows before any JavaScript arrives (about 1.8 s on slow 3G).
- **Small first download:** about 15 KB of app JavaScript. three.js and the car database load only with the pages that need them.
- **3D gating:**
  - The 3D starts after first paint. It is skipped on Save-Data or 2G connections and when WebGL is missing; a CSS poster shows instead.
  - It loads no models, textures or HDRs: everything is procedural, and there is no post-processing.
  - Cars beyond the first are built when the browser is idle.
- **Adaptive quality:** resolution follows the frame rate. If a device still can't keep up, the scene stops animating and renders only when the car changes. The 3D stops entirely once the hero is scrolled away.
- **Failure handling:** rendering pauses in background tabs, and a lost WebGL context falls back to the poster.
- **Service worker:** repeat visits are instant and work offline.
- **Overrides:** `?perf=low` and `?3d=0` force the low tier or no 3D, for testing.

## Disclaimer

Prices are ex-showroom Delhi, verified October 2026, and on-road figures are estimates. Confirm with the dealer before paying. Crash ratings come from
Bharat NCAP and Global NCAP. Photos are from Wikimedia Commons under their licences (or the manufacturer's own, credited). The landing page's five body-style cars are our own procedural likenesses of popular models, unnamed and without logos; other cars' 3D views are illustrative body styles at their real size.
