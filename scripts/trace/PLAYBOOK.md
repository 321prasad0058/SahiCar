# Modelling a car from photos: the playbook

Every 3D car is a `CarSpec` (src/webgl/cars/exact.ts) built by src/webgl/cars/build.ts. Shapes come from
photos, sizes come from the spec sheet. Follow these steps in order; each one has a tool.

## 0. Pick the car and its numbers
- Official **length, width, height, wheelbase** (cars.json `dims`) and **tyre size** (brochure).
- Tyre radius `tyreR` = rim inches × 0.0127 + width × aspect (195/60 R16 → 0.2032 + 0.117 = 0.320).
  `rim` = rim radius ÷ tyreR (0.2032 / 0.32 = 0.635). `tyreW` = width in m.

## 1. Reference photos (internal only — never published, deleted after tracing)
Folder: a scratch folder, or `~/Desktop/SahiCar-renders/3d/<car>/`. Wanted: **side** (true profile),
**front three-quarter**, **rear three-quarter**, a **straight rear** if any, and close-ups of
**headlamp, tail lamp, wheel, grille**.
- Listing-site gallery: list the exact image paths from the model's pictures page into `names.txt`
  (`<angle-name> <path>` per line), then download them with a plain Python `urllib` request (normal
  browser User-Agent, no referer tricks), trying sizes 1920x1080 → 930x620 → 630x420. Angle names that
  matter: `side-view-(left)-90`, `front-left-side-47`, `rear-right-side-48`, `headlight-43`,
  `taillight-44`, `wheel-42`, `front-grill---logo-98`. Not every model lists every angle.
- Official reveal images (press articles) often have the straight rear / front.

## 2. Measure the side profile
```
swift ~/Desktop/SahiCar-content/shorts/tools/cutout.swift side.jpg side-cut.png
node scripts/trace/extract-side.cjs side-cut.png <L> <H> left > profile.json
```
It levels the car on its tyres, scales to the official length, and gives per-u (0 tail … 1 nose):
`top` (silhouette), `bottom` (sill/bumpers), `paintTop` (belt line), `paintLow` (cladding top).
Check: `measuredHeight` should be within ~1% of official; if not, the photo isn't a true side view.

## 3. Write the spec (map profile → fields)
- `axles`: official wheelbase, overhangs split in the photo's ratio (photo axles are ~3% too far apart
  from perspective — never use them directly).
- `sill` ← `bottom` with the tyres taken out; `top` ← bonnet/boot silhouette outside the glass and
  `paintTop` (belt) under it; **the tail's top must reach the tail-lamp/light-bar height** or rear
  lamps have no body to sit on.
- `greenhouse.top` ← silhouette over the glass (keep roof rails out: they add ~5 cm on their own).
- `cladding.top` ← `paintLow`; `pillars`, `doors` ← read off the side photo.
- `front`/`rear` decals as [z −1…1, height m] from the three-quarter / straight photos and close-ups.
- `rimTone: 'dark'` for gunmetal alloys; `sunroof`, `rails`, `spoiler`, `roof.black` as seen.

## 4. Score it
```
npx vite --port 5181 &                 # dev server
node scripts/trace/compare-side.cjs <car-id> side-cut.png cmp.jpg left
node scripts/trace/ncmp.cjs <car-id> ncmp.jpg f34=front34.jpg r34=rear34.jpg rear=rear.jpg
```
`compare-side` renders a level, near-orthographic black silhouette (`/dev/cars?…&mask=1`) and prints
IoU; green = match, red = photo only (model too small), blue = model only (too big).
Targets: **IoU ≥ 0.94 whole, ≥ 0.90 upper half**. A uniform thin band is photo perspective — stop there.
`ncmp` puts the model next to the photos at the same angles for lamps, grille, colour and wheels.

## 5. Ship it
Add the id to `READY` in src/webgl/cars/specs.ts **and** to `SHOWCASE_IDS` in src/pages/CarDetail.tsx
(its caption) only after both checks pass, check /car/<id> → 3D 360°, then delete the reference photos.

## Lessons so far
- Tan seats seen through glass match some paints: the belt line must be the paint run that contains
  the door's middle (extract-side does this).
- The side camera must be level (`shoot('side')` uses dir y = 0); looking down 6° adds ~16 cm of roof.
- Studio lights wash paint out: pick the paint ~15% darker than the photo's mid-tone.
- Lamps, grilles and trim get real relief by default (build.ts `RELIEF`: lens 14 mm, housings 6 mm, skid
  plates 10 mm, grille lip 4 mm + solid slats for `slats`). Override per decal with `depth`.
- Keep end decals (front/rear) inside the end face (|z| ≲ 0.8): parts that wrap onto the sides break up.
- Round the plan-view corners with a hard `width` taper over the last 2–3 % at each end plus `noseSweep`
  ~0.2 / `tailSweep` ~0.12 — without it a small SUV reads as a van.
- The cladding shell now follows the body's own cross-section; a torn cladding edge means a builder bug.
- Sculpting knobs: `shoulder` (character line + inset), `haunch` (~0.03: swell over the wheels, pinch at the
  doors), `archSquare` (also squares the cladding flares), `bonnetRidge` (~0.012 m twin creases).
- After rounding the corners, the nose face is narrower than the car: keep front parts within the end face's
  half-width (≈ width(1) × W/2 … the taper value), or they stripe as they wrap.
- A gallery side photo shot from closer than a studio's makes the near tyres look big: the overlay (aligned at the
  lowest pixel) then shows a uniform band — model high on top, photo low under the sill. Lower sill, belt and roof
  together by that band (Swift: ~2 cm) instead of growing the tyres.
- Read side heights off the cut-out's alpha columns or extract-side, not by eye from a grid of the raw photo.
- End decals land on the lofted strip between rings, so lamps on a raked tail no longer stair-step; plates are
  tessellated and follow the nose/tail sweep (a flat plate sank behind the grille at the centre).
- If cars.json lists the dual-tone paints separately ("… with Black Roof"), set `roof.black: false`: those paints
  bring their own roof colour. Black pillars alone still give the floating-roof look.
- Deep blues read purple under the studio lights: keep the photo's green-to-blue ratio when darkening the paint.
- A good side IoU can still read as a van: check the f34/r34 sheet for plan rounding (hard `width` taper to ~0.68 at
  both ends, noseSweep ~0.3), tumble (~0.62 for a small hatch), haunch (~0.06) and bulge (~0.04). None move the score.
- Side decals must stay below `top(u) − 0.01`: above it they project onto the glasshouse, and outside the glasshouse's
  u range that lands on the centre line (stray marks in the middle of the tail).
- Thin lines (shut lines) need ≥ 12 mm height or the decal grid breaks them into dashes.
