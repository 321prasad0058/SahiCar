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
**Then make its loading poster:** `node scripts/posters.cjs <car-id>` (dev server on 5181). The car page shows it
the instant 3D opens, while the live model builds; re-run it whenever a spec, the studio lights or the camera change
(no ids = every modelled car).

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
- Dark paint (deep green, black) defeats the `paintTop`/`paintLow` finder: read the belt, window line, pillars and
  cladding off the side photo with `gridify.cjs` (metres = (groundY − y) ÷ pxPerM; take groundY from the roof top
  + measuredHeight × pxPerM, the tyre bottoms sit in grass).
- A pillar can take `mat` and a curved `rearEdge`; silver panels on the glasshouse still came out mottled on the
  Creta, so it was dropped — test before relying on it.
- Big silver panels (skid plates) look like white paper in 'silver': use `'satin'`, round their outlines (Chaikin a
  few times) and keep their bottoms above where the end face exists — set `sill` at u = 0 / 1 low enough.
- Very dark paints still render light under the studio lights: the Creta's deep teal needed #0c2a2e.
- Decal skins are pushed out along normals averaged per grid vertex, so skid plates and lamp bars no longer stripe;
  if stripes come back, look for decals running past the end face's half-width.
- Dark paint (Brezza): `paintTop`/`paintLow` are noise. Read belt, cladding top, shut lines and pillars off a
  `gridify` of the cut-out (nose left: u = (x_tail − x) / length_px, y_m = (ground_px − y) / pxPerM).
- When the official height includes roof rails, the greenhouse top is the silhouette minus ~0.05 under the rails.
- Black cladding along the lower doors: set `cladding.cut: true`, or the section's rounded top tucks the band
  under the paint and only a sliver shows.
- A plate over trim or a skid plate: notch those decals round the plate (≈ ±0.25 × 0.11 m) or it gets buried.
- Lamps striping in streaks = they sit above the end face: the nose/tail `top` at u = 1 / 0 must reach the top of
  the lamps (decals above it hop between rings). A boxy car also wants `topRadius` ~0.08 so the face stays flat.
- Same for low skid plates: the `sill` at the ends must sit ~7 cm below them (the bottom corner is rounded).
- Overlapping decals need distinct `layer`s; fine parts on curved ends get `step: 0.005`. Skid plates: `satin`,
  bumper reflectors: `reflector` (no lamp glow). Spoiler shape: `spoiler: { len, thick, tilt }`.
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
- A close gallery camera can spread the photo's axles by 6 % (Fronx), not 3 %: put the axles at the official wheelbase
  (overhangs in the photo's ratio) and map the arch cladding, door lines and handles with them; keep the silhouette.
- A body-coloured D-pillar decal on a steep tailgate glasshouse crumples: raise the belt (`top`) instead so the body
  itself rises round the quarter glass, keeping it just under the glass slope. Thin raked pillar decals saw-tooth
  where the belt falls steeply under them; on dark glass a thin black C-pillar can simply be left out.
- Navy paint reads lavender-grey under the studio lights: Fronx NEXA Blue needed #07204f (saturated, blue-heavy).
- Tail lamps above `top(0)`: keep `top` at the tail up to the lamp band (even at a small IoU cost) or they scatter.
- Sedans (Dzire): `greenhouse.u0` sits where the rear glass meets the boot lid; `top` below it is the flat boot deck, with a
  short ducktail at the tail. The official height includes the shark-fin: the roof traced ~1.45 m against 1.525.
- Glass/roof boundaries (`roof.u0`, `roof.u1`) should sit exactly on a glasshouse station, or the boundary row zigzags
  (each quad's two triangles fall on opposite sides). Stations: u0 + (u1 − u0)·(0.5 − 0.5·cos(πi/140)).
- A flat fin sticking out at the base of the rear glass / A-pillar = the glasshouse's bottom ring is wider than the body's
  rounded top edge. Lower `topRadius` (Dzire: 0.08) so the body edge reaches it.
- Speckled lamps (gloss showing through a lens) on a raked nose don't go away with layers or depth; pull the lamp's outer
  end in (≤ ~0.73 m on a 1.73 m car) and put the wrap-around part on the flank as a `side` decal instead.
- Chrome grille slats: one thin chrome decal per slat (14 mm, `depth` ~0.012) over a gloss grille, instead of `slats`.
- `exact.ts` has `band(path, w)` (thin lines along a path, e.g. a boot-lid shut line) and `both(half)` (mirror a half outline).
- A gallery photo with tyres in grass: patch the hidden tyre bottom in the cut-out before extract-side, or it mis-levels.
- Gallery "colour" side renders can be stretched (Scorpio-N: aspect 2.27 against the spec's 2.51). Check the cut-out's
  aspect against L/H first; the maker's press side view (dark studio background) cut out cleanly and matched.
- On a long car the near-orthographic compare render comes out ~2 % short, so traced heights read ~4 cm high in the
  overlay: fit to the overlay (per-u top/bottom of photo vs model), not to the raw profile.
- Tall lamps climbing the D-pillars of a raked tailgate: let the tail `top` climb to the lamp tops, keep that raked
  run one straight line (collinear `top` points, so the face is one plane), and set `dropSlivers: true` — snapped
  edge cells leave zero-area triangles whose noisy normals fray slanted lamp edges into spikes on a raked end.
- On a raked end keep lamps inside |z| ≲ half-width − topRadius (≈ 0.82 m on the Scorpio-N) and don't wrap them with
  side decals at that corner: both stripe.
- Grille slats and lamps broke into hooks while the nose `top` fell below the grille top; a near-vertical nose face
  up to the lamps fixed it (the bumper's forward bulge costs < 0.5 % IoU).
- Bright machined spokes on dark pockets: 'split' without `rimTone` ('dark' turns the spokes gunmetal).
- Desaturated dark paints read slate grey under the studio lights; deep teal needed a saturated #002b3d.
- No brand logos or lettering on any model (front or rear): every car so far is badge-free.
- Bonnet `crown` raises the centre line above the traced `top`: lower the bonnet `top` by about the crown (Seltos: 1.5 cm)
  or the side silhouette sits high over the whole bonnet.
- Lamps that sit on the corner chamfer (Seltos DRL bars, boomerang tail lamps) go on the flank as `side` decals; the end
  face only carries the parts inside its half-width. A vertical bar on both faces reads as two bars from the rear.
- `rrect()` (rounded rectangle) and `smooth()` (Chaikin) in exact.ts give pods and skirts clean outlines; Chaikin on a plain
  rectangle turns it into a blob. `sideBand()` is `band()` for side decals (u scaled by the length).
- Measure belt/cladding heights per pixel column of the levelled cut-out (light paint vs dark runs) instead of by eye:
  the eye read of the Seltos belt was 3 cm off.
- Check the gallery folder's model year: the Baleno's main folder is the 2026 facelift (three-bar grille), and the site's
  data (ADAS) is the facelift too, so model the front from that folder, not an older lone photo.
- A cut-out from cutout.swift is cropped to the car: to grid the photo in metres, find the cut-out's offset in the photo,
  rotate both by −levelDeg, then u = (x_tail − x) / span, y = (ground − y) / pxPerM.
- A side decal for the headlamp's wrap onto a rounded nose corner smears into a streaky band along the bonnet edge:
  leave it out and keep the front lamp's top ≤ the nose `top` near u = 1 (raising `top` at 0.98–1 gives the lamp room).
- A `spoiler` over a glasshouse that falls quickly behind the roof floats as a bar on legs: drop it and move `roof.u0`
  back a station so the body-coloured roof itself overhangs the tailgate glass.
- Emissive `tail`/`head` over a large area blooms into a flat blob: lamps read better as a `gloss` housing with red
  light guides and a `silver` reversing panel; a projector is a `silver` lens, not a `head` disc.
- Holes through a big headlamp on a rounded nose: the part above the nose `top` near u = 1 lands on a near-grazing strip and
  drops out. Raise `top` at 0.985–1 to the lamps' top (Baleno 0.83–0.85, IoU unchanged), keep the last width step gentle
  (no 6 % taper in the last 3 cm) and use `topRadius` ~0.1; a `silver` projector disc also reads as a hole (use a small `head`).
- `rimTone: 'dark'` turns `split`/`turbine` almost all gunmetal; for a mostly-machined alloy, plain `swirl` (no rimTone)
  gives silver spokes over dark pockets.
- Big off-roader flares (Thar Roxx): use the cladding's own flare with `cladding.flareOut` (lateral reach, e.g. 0.075) — raised
  side decals with a large `depth` tore along the arch edge. `cladding.flareU` keeps the flare off an upright nose: the
  cladding is a full tube, so a flare station in front of the grille face lids the lower grille in black.
- Black bumpers whose top surface must be black: `cladding.cover: true` (and a traced cladding top above the bumper's `top`).
- The wheel-well box reaches `archR` ahead of the axle: on a short-nosed upright face keep axle + archR behind the face, or a
  black slab shows through below the grille (Thar: archGap 0.04, the flare covers the rest of the opening).
- A spare wheel on the tailgate: `spare: { y }` (its outer face at u = 0; the official length includes it). Model the bumper
  under it as a short low `top` and lift `top` to the belt at the tailgate face.
- Body-coloured door frames on a black hard top: pillars with `black: false` plus a 'body' side decal along the window tops
  (kept below ghTop − 0.075, where the black roof band starts). Thin black pillars on the hard top's corners tore at their
  tops; the dark quarter glass alone reads right.
- Venue (raked tail, long roof spoiler): the `spoiler` box floated as a plank over the tailgate glass; dropping it and moving
  `roof.u0` back onto a station (0.1009) so the roof paint covers the glass top read right at a ~0.1 % IoU cost.
- A light bar along the bonnet's leading edge: lift the nose `top` at 0.96–1 just above the bar's top (Venue 0.965 vs 0.95)
  and keep its ends ~1.5 cm inside the end face's half-width, or the bar's ends and the bonnet lip above it fray.
- Small parts inside a raised `satin` skid plate (pods, a lower grille) vanish under its 8 mm relief: give them `depth`
  ≥ 0.012 and their slats a deeper one still (0.016).
- A thin black A-pillar or wide D-pillar on dark glass came out with grey scratches / sawtooth edges; left out, the dark
  glass alone reads right. A side wrap of tail lamps above `top(u) − 0.01` near u = 0 tears into red spikes: leave it out.
- Sonet: `rakedEnds` on a gently raked SUV nose frayed the DRL lines; raising the nose `top` at 0.97–1 to the lamp tops (0.94)
  and dropping `rakedEnds` made them clean for −0.001 IoU.
- A bright Fresnel band down the nose in the side view = the face's swept corners seen edge-on. With a hard `width` taper
  already rounding the plan, keep `noseSweep` ~0.1.
- A side tail-lamp wedge frayed where the `shoulder` crease ran through it: drop the shoulder below the lamp at the tail
  (Sonet: y 0.8 at u = 0, rising to the belt by u = 0.12) and set `dropSlivers`.
- Read `archGap` off the photo's arch opening (top of opening − 2 × photo tyre radius): 0.08 left the wheels sunk in black wells,
  0.045 matched; raise `cladding.flare` by the same amount to keep the flare's outer edge.
- Edit exact.ts per spec: a whole-file string replace of a tyre line also hit the Brezza (same 215/60 R16 line).
- Nexon rework: tyres hidden in grass were patched by painting a dark disc per wheel into the cut-out (hub from the rim
  centre, radius from hub to tyre top) before extract-side; measured height then came out 1.635 against 1.62.
- A dark glasshouse running all the way to the tail read as an estate. The mono-tone Nexon's body-coloured C-pillar
  (`pillars` with `black: false`, a thin black divider ahead of it) gave the sloping window line back.
- Front/rear decals wider than the end face (width(end) × W/2) wrap round the corner as black slabs on the flank: widen
  `width` at the ends (0.86–0.88) and keep end decals within ~0.75 m on a 1.8 m car.
- Black bumper corners (lamp pods, rear lamp surrounds): raise `cladding.top` to the pod tops over the last 2–3 % at each
  end with `cut: true`; without `cut` the paint pokes through in patches.
- A slope break in the last few nose `top` points ripples the bonnet's leading edge; keep them on one smooth curve. A light
  bar's outer ends on the corner rounding (topRadius 0.12) smear into white hooks: stop them ~0.71 m out.
- A uniform 1.5–2.5 cm blue band over bonnet and roof in the overlay (close gallery camera): lowering both by that much took
  the Nexon from IoU 0.957 to 0.969.
- Gallery side photos taken close (Wagon R flex-fuel show car: 1.766 m measured vs 1.675, axles 6 % apart) are useless; the
  listing site's own image gallery on another portal had a long-lens side view (1.677 m) that cut out cleanly.
- Tall-boy tails (Wagon R): the body forms the D-pillar. Let `top` climb the raked tailgate to the roof, run along the roof to
  the D-pillar's front edge, then drop in a steep cliff to the belt; start the glasshouse at that edge. A body-coloured pillar
  decal there crumpled. Make the body's top a hair higher than the glass roof at the joint, or the two z-fight in a seam.
- Tumblehome at the tail only: `shoulder.inset` with the shoulder line placed above the belt elsewhere (y > top turns the inset
  off), and `greenhouse.followBody` (u) so the glass's foot sits on the leaning body edge instead of sticking out as a ledge.
  The inset is reached at each ring's own top, so on a raked tail keep lamps inside what the rings within 0.3 m reach.
- A raked black (or body) A-pillar decal saw-toothed on a steep windscreen; leaving the A-pillar as plain glass reads right.
- Grand Vitara: lamps and the chrome bar under a bonnet lip foreshortened to slivers while the nose `top` (0.955) sat inside the
  `topRadius` roll; raising the nose `top` at 0.965–1 to the bonnet edge (0.98) put them on an upright face for +0.0015 IoU.
- A raked tailgate with a body-coloured D-pillar beside the glass left a ragged dark seam along the glass edge;
  `greenhouse.followBody` up to the quarter glass (0.16) closed it. The roof `spoiler` floated as a plank again: dropped, `roof.u0`
  moved back a station.
- XUV 3XO: erase a roof antenna from the cut-out before extract-side (it read 1.713 m with it, 1.631 without).
- A rear-fender kick in `top` (body rising under a black C-pillar panel) shows from behind as body-coloured "ears" above the
  tail light bar; keep the tail `top` nearly flat and let the dark glass carry the C-pillar.
- Headlamp DRL corners on the face's rounded top corner frayed into white ticks: `topRadius` 0.07, nose `top` a little above
  the lamps, and chamfer the lamp and DRL outer-top corner with a few extra points. Pushing the lamp past the end face's
  half-width (0.805 of 0.83 m) frayed again; a short `side` black pocket (u ≥ 0.958, ending at 0.993) carries the wrap.
- Ertiga: the gallery side photo's rod antenna sat in the cut-out and added 3 cm to the measured height; erase it (clear
  thin runs above the roof per column) before extract-side. Heights were then scaled by 0.975 (photo 3 % tall from the close
  camera) and the overlay still fitted (IoU 0.975).
- A straight front photo taken from above lifts parts set back from the grille (headlamps 0.45 m back read 5 cm high): take
  lamp heights from the side photo and only the across-the-car positions from the front.
- A raked tail with lamps climbing the D-pillars (Ertiga): `rakedEnds` is a must (without it the lamps and glass decal turn
  into horizontal slats); relief on those wedges saw-toothed their outer edges, `depth` 0.002 and `step` 0.003 made them clean.
  `topRadius` 0.07 keeps the tail corners flat enough for the wedges.
- Headlamps that sweep far back along the wing: a `side` decal works only on the flat flank below the fender's top roll
  (keep it under the bonnet `top` − topRadius); the front decal stops ~2 cm inside the corner and the two nearly meet.
- With an EXACT spec whose id is also in SHOWCASE, /dev/cars listed it twice (duplicate React key); the chip list now skips
  SHOWCASE ids that EXACT overrides.
- Tiago (raked hatch, body-coloured D-pillar up to the roof): a full pillar decal crumpled where the glasshouse wraps round
  the tail; letting the body climb the tailgate (Wagon R style, shoulder inset) left a zigzag glass/body seam (body and glass
  stations don't line up on a steep climb), and a rear tailgate-glass decal can't reach past 0.3 m from the end. What worked:
  a Fronx-style belt kick (~1.24 m) plus a short body pillar decal only where the glasshouse still faces sideways (u ≥ 0.13).
- With `cladding` set, decals ride 16 mm out, so sliver normals on a slanted lower edge throw 1.5 cm drips (Tiago side tail
  lamp). Keep that edge horizontal or steep. Arch flares as side decals tear at the opening: keep the cladding for them.
- A shoulder crease where `top` changes fast (belt kick at the mirror/cowl) ripples the front wing: drop the shoulder there.
  Keep the windscreen base (`greenhouse.u1` top) level with the body's `top`, or the wing peaks at the cowl.
- Headlamps tucked under the bonnet edge: with `crown`, the face's sides sit lower than `top`, so raise the nose `top` ~3 cm
  above the lamp tops (Tiago 0.867 vs lamps 0.832) and keep `topRadius` ≤ 0.09, or the lamps' outer ends hook back.
- Front/rear end decals running past the end face's half-width wrap back along the flank and show as spikes in the side view
  (Tiago tail lamps at z 0.705 on a 0.707 face): keep them ~3 cm inside it.
- No number plates on any model (the user's rule): the builder draws none, so never notch bumper or skid-plate decals around a plate.
