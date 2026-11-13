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
- Number plates are blank (the user's rule): no registration number or lettering on them.
- Harrier: a body-coloured D-pillar made by letting `top` climb beside the tailgate glass (1.27 → 1.38 m over 25 cm) dented
  the tail corner and left glass shards, with or without `followBody`; a flat tail `top` and the glasshouse starting at the
  tail face (u0 0.02) read clean. A rear 'glass' decal for an inset tailgate glass sliced into slats until `rakedEnds`.
- A `shoulder` crease on a car whose belt and bonnet fall fast at the ends rippled both the front wing and the tail corner;
  without it (and without `bonnetRidge`) both are smooth for no IoU change.
- Parametric grilles (staggered short bars): generate rows of small `satin` rrects (~56 × 12 mm, pitch ~0.11 m, every other
  row offset half a pitch); 'silver' read paper-white. `twin` + `rimTone: 'dark'` is the closest to all-black alloys.
- Innova Hycross (raked tailgate glass, wide body-coloured D-pillar whose front edge leans forward): a body-coloured `pillars`
  entry over a glasshouse that wraps round the tail tore at the spoiler corners. What worked: the Wagon R layout — the body
  climbs the raked tail to the roof and runs flat to the quarter glass, a short cliff to the belt, the glasshouse starting at
  that cliff, the tailgate glass as a `rear` gloss decal (with `rakedEnds`, 0.3 m deep was fine). To blend the body's roof
  block into the glass roof: tail-only `shoulder.inset` (~0.13, line just above the lamps, above `top` elsewhere), a less
  tumbled glasshouse (0.88) so the two widths match, the body's flat top run 3 mm higher and overlapping the glasshouse's first
  station (a gap shows the glass end cap as a dark seam), and `followBody` past u0 so its foot doesn't poke out as flaps.
- `sunroof` adds ~2 cm on top of the roof in the side silhouette (a step where it ends); leave it out when the photo's roof is flush.
- The 'hex' grille material reads as a white honeycomb from any distance: a dark grille wants `gloss` + `mesh` inside the chrome ring.
- Headlamps that sweep back along the wing: start the `side` decal at u ≈ 0.996 and push the front decal to ~1.5 cm inside the
  end face, or a gap at the corner splits the lamp in two.
- XUV 7XO: `both(smooth(half))` smooths the half outline as a closed shape, cutting its centre-line edge into a V notch
  (grille, intake); smooth the mirrored outline instead: `smooth(both(half), 1)`.
- A pale ellipse on a gloss end decal that moves with the camera is the studio softbox reflected in the clearcoat, not a hole:
  `dropSlivers`, `rakedEnds` and raising `top` don't change it.
- On a big blunt SUV nose a `side` headlamp wrap read as a second lamp on the wing (the corner roll between them stays body
  colour); dropped. At the tail a wider end face (`width` 0.93 at u = 0) let the lamp columns reach 0.82 m without fraying,
  so the side lamp wrap nearly meets them.
- Close gallery camera again: a uniform 1.5 cm blue band over roof and bonnet; lowering both by it took IoU 0.955 → 0.962.
- Exter (2026 facelift): the listing gallery had no side view; another portal's gallery had a studio side render (served as
  WebP, convert before cutout; Python urllib hung on that CDN, plain curl with only a browser User-Agent worked). It read
  1.69 m over the rails with the axles 4.5 % apart: heights × 0.972, axles at the official wheelbase, and cladding, doors
  and handles mapped piecewise-linearly with the axles (silhouette kept in photo u). IoU 0.961 / upper 0.960.
- Tail lamps and the black strip between them broke into horizontal stripes while the tail `top` at u = 0 was the profile's
  rounded corner (0.8 m); starting `top` at the lamp tops (1.1) made them clean for −0.001 IoU.
- Paired machined spokes with a dark groove and black pockets: `blade` with no `rimTone` ('twin' was too thin; 'split' +
  'dark' went all gunmetal).
- A body-coloured D-pillar over a dark tailgate-glass wrap: `pillars` with `black: false`, a near-zero belt range, the top
  range starting exactly on `roof.u0`, and a curved `rearEdge`; a top starting past `roof.u0` left a torn patch at the roof.
- Carens Clavis (raked MPV tail under a roof spoiler, Hycross layout): end decals only land within 0.3 m of the end (`endZone`), so the
  tailgate glass decal stopped where the tail `top` passed 0.3 m in (1.45 of 1.57 m). Steepening the raked run so the glass top sits
  inside 0.3 m filled it (−0.3 % IoU). A side 'gloss' wrap of the tail glass over the climbing body crumpled; the photo's D-pillar was
  body colour with only a thin glass strip at the edge, so it was dropped.
- Even a long-lens side photo (1.714 m, wheelbase within 0.5 %) gave a uniform 2.2 cm blue band over roof and bonnet in the overlay;
  lowering both by it took IoU 0.956 → 0.969. A bumpy bonnet `top` (uneven steps from the −crown shift) shows as ripples: refit it
  as one smooth curve.
- Tail-only `shoulder.inset`: start the line a few cm above the tail lamps and climb it gradually across the quarter-glass cliff, or
  the tail corner wrinkles. Black double spokes with silver wedges at the rim: `split` + `rimTone: 'dark'` was closest.
- Hyryder (Grand Vitara body, Toyota ends): the listing gallery had no true side; another portal's studio side renders cut out
  cleanly but were squeezed sideways (1.745 m tall at the official length): stretch the cut-out × 1.061 to the official height
  before extract-side and compare-side. The listing's 360° viewer (object2vr) serves its frames as `images/img_0_0_<n>.jpg`
  next to the config XML named in its HTML; those frames were too close for profiles but fine for details.
- That close studio camera put the sill and bonnet ~4 cm above the GV trace and the axles 7 % apart: raising sill and bonnet and
  splitting the overhangs in the photo's ratio (doors, pillars, handles mapped with the axles) took IoU 0.928 → 0.953.
- A dark upper grille right under a rounded bonnet lip read as a thin strip with a body band over it: the `topRadius` roll ate
  its top. Raise the nose `top` ~5 cm above the grille (1.03 vs 0.955) with `topRadius` 0.08.
- Tail lamps running lower than the GV's light bar (down to 1.04 m) striped on the raked strip under `top(0)` = 0.98: start the
  tail `top` at the lamp tops (1.152), as on the Exter.
- Curvv: the listing's studio side render read 1.72 m against 1.63 (aspect 2.50 vs L/H 2.64) and capped IoU at 0.93 once scaled
  to the official height; a road photo from another portal's gallery (1.648 m, axles 2 % apart) cut out cleanly: IoU 0.965.
- A body-coloured sail behind the rear door glass under a coupe's glass strip: a `pillars` entry, with `step: 0.004` (new,
  opt-in) or its edges saw-tooth on the rolled glasshouse. The pillar stops 7.5 cm under the glass top (ghTop − 0.075), so
  start its belt range where the glasshouse is taller than that (Curvv u 0.095); running it into the low ducktail tore it.
  A rear edge at f ≈ 0.55–0.75 lets the tailgate glass wrap down the sides like the photo and frays less than f = 1.
- Tail light bar: its gloss housing vanished in a band at |z| 0.5–0.6 while the red line stayed (body poking through the
  thin housing); housing at `layer` 2 with `depth` 0.012 and the red line at `layer` 3 / `depth` 0.016 fixed it. A separate
  red chevron over the housing's corner also tore it: draw the red line as one bent outline instead. With `crown` the
  face's sides sit lower, so keep the tail `top` at u = 0 ~8 cm over the bar (Curvv 1.262 vs bar top 1.185).
- i20 (rain-wet gallery side photo, tyres in short grass): extract-side read 1.498 m against 1.505 with the axles only 0.6 % apart, so
  no scaling; a uniform 1.5 cm blue band on the bonnet still came off for +0.003 IoU.
- `cladding` with `flare: 0` for a low black side skirt leaves a 1 cm skin sliver round each arch edge (speckled arches, even with
  `flareU`): a `trim` side decal (bottom ~2 cm above the sill, `depth` 0.004) plus a chrome line reads clean.
- A steep belt kick under a pointed quarter glass (13 cm over 30 cm) frays the glass/body seam at the tail, and a body-coloured
  D-pillar decal there tore; a gentler kick (~9 cm) and no D-pillar decal read clean. `followBody` made that seam worse.
- Tail lamps and the black band up at the tail's `top(0)` (rakedEnds): raising `top(0)` above them broke them up (they land on the
  top roll); keeping `top(0)` at the lamp tops and making the first 3 % of the tail climb steeply put them back. Lamp housings
  that still lost their upper half came back whole on `layer: 1` (guides 2, chrome strip 3).
- Wrap-around tail lamp: `width` 0.92 at u = 0 lets the end-face lamp reach 0.80 m on a 1.775 m car, and the `side` wedge starting
  at u = 0.005 meets it with no gap. Headlamp: the side wedge can start at u = 0.999 to meet a front lamp kept 3.5 cm inside the face.
- A `gloss` headlamp housing on a raked nose reads body-grey (it mirrors the softbox); `trim` keeps it dark.
- Kylaq (body-coloured D-pillar beside a raked tailgate glass): a `pillars` body decal whose belt edge reached the tail (u 0.02)
  tore along the glasshouse foot round the tail; starting it at u 0.075 (a small glass wedge behind it) with its top on `roof.u0`
  read clean. Moving `roof.u0` two stations back (roof paint forming the spoiler over the glass) eased the far-side crumple.
- Tail lamps: a `reflector` housing (red, no glow) with `tail` guides and a `silver` reversing panel reads like the photo's red lens;
  a `gloss` housing disappeared into the black strip joining the lamps. Upright butterfly-grille ribs: `trim` (depth 0.014) on
  `gloss` gives dark-grey ribs; `chrome` ribs went paper-white.
- The studio adds roughly 55 of grey to every channel: Lava Blue (studio photo ~31,61,86) needed #00395c (no red at all).
- Fortuner (white, road side photo 1.788 m over low rails, axles 1.7 % apart): chrome decals on light paint (grille fangs, the
  strip joining the tail lamps) vanish, as chrome mirrors the white studio: use `satin` for chrome on the body, chrome only over black.
- A deep wheel gap (archGap 0.13) showed the body's own paint wall at the arch edges speckling through the cladding inside the
  wells; `wellInset: 0.05` (new, opt-in) puts black end walls just inside each arch. They hang a little below the sill (reads as mud flaps).
- A grille "hat" centred on z = 0 read as a badge; keep raised pattern elements off the centre line.
- Safari (dark-edition gallery car, close camera: 1.89 m measured, axles 6 % apart): another portal's long-lens Cosmic Gold side photo
  (served as WebP; convert before cutout) read 1.798 m over the rails with the axles 1.5 % apart once the roof antenna was erased.
- Stepped roof over the third row (Hycross layout): the body climbs the raked tail to a flat D-pillar block, cliffs down along the
  pillar's leaning front edge, and the glasshouse starts at the cliff. Starting the glass roof *below* the block's top and rising out
  of it over ~3 cm of u (the step) stopped the roof paint tearing at the joint; a black `pillars` strip over the cliff (top range up
  to 0.15) hid most of the edge-on glass slivers there (the top 7.5 cm of the glass stays uncovered and shows a faint line).
- A front decal band whose lower part sat between the grille top and the light bar didn't show (body colour gap); running the band
  down behind the grille (layer 1 over it, bricks on 2) closed the gap. Fine black ribs on a raised satin skid plate read as holes: left out.
- Windsor EV (black gallery car, close camera: 1.718 m measured, axles 1.3 % apart): heights × 0.976 left a uniform red band over
  the roof and round the tyres in the overlay, IoU 0.948; kept at the official height rather than chasing the photo's perspective.
  On black paint `paintTop` is noise: a per-column luminance scan of the levelled cut-out (chrome belt line = the bright run
  under the glass) read the belt to ±1 cm.
- A stepped bonnet lip (`top` dropping 7 cm in 1 cm over the light bar) rippled the whole wing in the side view; one smooth curve
  from the cowl through the light bar to the nose (the bar then sits on the sloping face, `rakedEnds`) read clean for −0.1 % IoU.
  A belt that dips and climbs again into the windscreen base also ripples the wing: keep it nearly level into the cowl.
- The mirror sits at `greenhouse.u1 − 0.04`; with a long screen running into the bonnet that put it on top of the cowl, so
  `mirrorU` (new, opt-in) places it on the door. Mostly-silver alloys with narrow dark slots: `wheel.style: 'petal'` (new).
- City (2026 New City, black gallery car on a dark background): cutout.swift still cut it cleanly; paint-based belt finding was
  noise, so belt, glass, shut lines and handles came off a brightened `gridify` of the cut-out. The photo read 1.514 m with the
  axles 3 % apart: heights × 0.983 through a small per-car helper (`cityK`), then a 2.5 cm bonnet band and a 2.5 cm front sill
  band came off for IoU 0.958 → 0.963.
- A full-width light bar on a raked sedan nose (Dzire-style `top` falling to 0.6 at u = 1, `rakedEnds`) grew a double vertical
  mark above the bar at the centre line; raising the nose `top` at 0.95–1 to ~2 cm over the lamps removed it for no IoU cost.
- Honeycomb grilles: rows of small hexagon `trim` cells (`cityHoney`) over a `gloss` panel read right; `gloss` cells on a `trim`
  diffuser read as white dots, so the rear diffuser is a `mesh` panel instead.
- Smoked tail lamps with red light guides: a `trim` housing plus thin `tail` guides; a `reflector` housing read as solid red.
- Black spokes with thin machined edges: `split` + `rimTone: 'dark'` (`blade` was mostly silver; `blade` + dark was flat grey).
- Syros: no gallery side view on either listing site, but the maker's site has a 72-frame 360° viewer (`/content/dam/…/360vr/<car>/<code>/exterior/<paint>/NN-d.png`,
  frame 1 = front, 19 = left side at 5° a frame). The PNGs carry alpha, including a soft black ground shadow: keep alpha ≥ 250 (or > 140 and not
  pure black) for a clean cut-out. It read 1.724 m with the axles 3.5 % apart: squeeze the cut-out to the official height, then map every traced u
  piecewise-linearly so the photo's axles land on the official wheelbase (a `syrosU` helper applied to top, sill, glasshouse, cladding, doors, decals).
- A headlamp on the corner (Syros front view: lamps out to 0.87 m of 0.90): side decals on a 45° chamfer and a DRL kick past the face both frayed.
  A blunt nose (`width` 0.96 at u = 1) with the whole lamp as a front decal kept ~3 cm inside the face's half-width read clean; the black corner
  behind it is cladding raised to the lamp tops at u 0.955–0.978.
- A lower tail lamp that wraps the rear corner: rear decal to ~1 cm inside the face plus a side copy starting at u 0.002 reads as one unit; a side copy
  starting 5 cm forward read as a second lamp. Low skid frames/intakes at both ends need `sill` at u = 0 / 1 below them (0.25), or their bottoms fray.
- Alcazar (gallery side photo, tyres in grass patched): 1.78 m measured over the rails, axles 2.9 % apart. Heights × 0.965 also
  brought the photo's tyre to the official 215/55 R18, a handy check for the scale factor. A 1.5 cm roof bump back up to the
  official height still left a thin red band in the overlay (IoU 0.951 / upper 0.934); kept the official height.
- Tailgate glass reading as a grey "pickup bed" from behind: the glasshouse's first stations rose too gently (traced off the
  D-pillar corner, not the glass). Starting the glasshouse lower and closer to the tail (u0 0.03) and steepening the first
  6 % made the glass read upright, for −0.1 % IoU. A skid plate made with `smooth()` of a rectangle sagged at its top
  corners; `rrect()` keeps the straight top edge.
- Altroz (2025 facelift): the gallery side photo's shark-fin antenna read 1.537 m; erasing it from the cut-out (clear alpha above
  the roof line over the fin's columns) gave 1.509 against 1.523 with the fin, so heights × 0.99. An EXACT spec with a SHOWCASE id
  overrides it in SPEC_BY_ID (EXACT entries come last); /car/<id> shows the new model with no other change.
- A beige ledge between a piano-black tail panel and the tailgate glass = the body's flat top between the tail face and
  `greenhouse.u0`: start the glasshouse at the tail face (u0 0.015, its top = `top(0)`) and keep the black panel up to `top(0)`.
- Headlamp wrap along the wing (Altroz): the side decal running back to u 0.81 on the bonnet roll tore into shards; stopping it at
  u 0.91, `topRadius` 0.08 and the nose `top` ~5 cm over the lamps read clean. A bonnet shut line on that roll looked like a crack.
- A side tail-lamp wedge just under a climbing tail `top` frayed along its top edge: keep it ≥ 4 cm under `top(u)` there, `step`
  0.003, `depth` 0.002. Black alloys with thin machined edges: `twin` + `rimTone: 'dark'` (split/turbine read silver/grey).
- Verna (black gallery car, long lens: 1.470 m, axles 0.2 % apart) still showed a uniform 2 cm band (model high over roof and
  bonnet, photo low under the sill); a `VERNA_DY` shift on every traced height and decal (`vernaY`/`vernaD`) took IoU 0.945 → 0.965.
  On black paint a gamma-brightened metric grid of the levelled cut-out (u lines every 0.01, y every 2 cm) read belt, shut lines,
  handles and lamps cleanly.
- A boot-lid wing on a short deck: no `spoiler` (that one sits over tailgate glass); lift the tail `top` to the wing's top at the
  face and put the wing as a `rear` gloss decal on the raked strip, with the deck behind it ~2 cm lower than the wing.
- Fastback C-pillar beside a raked rear glass: a body `pillars` entry frayed along the glass edge and specked the far side even
  with `step: 0.004`; on a black car the glass alone reads right, so it was dropped.
- A wide front (lamp clusters at the bumper corners): `width` 0.9 at u = 1 with `noseSweep` 0.12 put lamps, light bar and grille at
  their photo widths; a side wrap of the corner lamp read as a dark blob on the wing and was dropped. A full-width light bar on a
  crowned nose bends down at its ends from the front: draw it as a `band()` rising ~1 cm at the ends.
- Victoris (gallery side photo, tyres in grass): the cut-out ended above the tyre bottoms, so extend its canvas ~40 px and paint a
  dark disc per wheel (hub and radius off a grid of the wheel) before extract-side. It read 1.673 m with the axles 4.9 % apart:
  heights × 0.989 and every traced u mapped onto the official wheelbase (`victorisP`). IoU 0.952 / upper 0.951.
- A bright vertical strip down the tail in the side view is the tail-sweep Fresnel band (as at the nose): `tailSweep` 0.06.
- Light-bar end that turns down the rear corner into a smoked wedge on the flank: rear decal to ~1.4 cm inside the face (`width`
  0.92 at u = 0) and the side wedge starting at u 0.003 read as one lamp; its red guide is a `sideBand` along the wedge's top edge.
- Twisted gunmetal spokes with machined silver wedges: `swirl` + `rimTone: 'dark'` (split + dark went almost all grey).
- Sierra / Sierra.ev (one body, two cars): the gallery cut-out of the petrol car lost its black sill into the shadow on sand (sill read
  0.37 m, IoU 0.917); filling the cut-out's alpha down to the sill line read off the photo (`patch-sill`: find the cut-out's offset in
  the photo, copy the photo's pixels back in between the wheels) gave 0.954. Trace the shared body from the cleaner photo, then score
  each car against its own; a per-car height factor (`sierraK`, every y in the spec incl. decals) took up the uniform 1–3 cm roof and
  bonnet band (EV 0.988, petrol 0.978 for its 3.5 cm lower official height).
- Rails run over every listed `greenhouse.top` point within 6 cm of the peak: keep the windscreen header points below that, or the
  rails reach onto the header and the overlay shows a 5 cm bump.
- `alpine` glass on the roof edge reads as a white band from behind (it reflects the sky); on a black roof leave it out.
- Spoiler "ears" on the quarter glass: a `side` 'body' decal above `top(u)` lands on the glasshouse; keep its top ~3 cm under the roof
  line or it smears across the top of the tail glass. Black `side` wraps at a blunt nose corner read as a separate strip: dropped.
- Grand i10 Nios / Aura (hatch + sedan pair): gallery side photos read 1.554 / 1.562 m with the axles 4–5 % apart; `niosK`/`auraK`
  scale heights to the official 1.52 and `niosU`/`auraU` map doors, handles, fuel lid and lamp wraps onto the official wheelbase
  (silhouette kept in photo u): IoU 0.962 / 0.968. The Aura spreads `...GRAND_I10_NIOS` and reuses its headlamp decals.
- Stray "||" marks on the nose centre with no front decals at all = a `side` decal above `top(u) − 0.01` near u = 1 (a headlamp
  wrap traced past the nose). Keep side lamp wraps at u ≤ 0.985 and under the nose `top`.
- Lowering `noseSweep`/`tailSweep` (0.3/0.24 → 0.12) lengthened the side render (aspect 2.515 → 2.533) and cost 0.9 % IoU; the
  white glare on the end faces in the side shot stayed, so it isn't the sweep. Kept the sweeps.
- Red tail lamps on red paint: a `reflector` housing disappears into the paint; a `trim` housing with a `tail` lens over its upper
  part and a small `silver` reversing block reads like the photo. Lamps striped across the whole tailgate while `top(0)` sat 40 cm
  under them on a raked hatch tail; starting `top(0)` 3 cm over the lamp tops cleaned them for −0.1 % IoU.
- Five bright triangular spokes on black pockets (Nios): `blade` was closest (swirl/turbine read all silver, petal a disc).
- Celerio / Alto K10 (round hatches, body-coloured D-pillars beside a raked tailgate glass): the Wagon R layout (body climbs the
  tail to the roof, cliff at the D-pillar's front edge, tail-only `shoulder.inset`) reads right from behind, but the glass top
  sat 0.36–0.43 m in from the tail, past the 0.3 m end zone. `endReach: [tail, nose]` (new, opt-in) widens it per end.
- The Celerio gallery had no side view; another portal's long-lens road photo (1.571 m, axles 1.6 % apart) cut out cleanly.
  The Alto's gallery studio render read 2 % tall with the axles 3.6 % apart (photo tyre matched the official size, so the
  length scale was right): heights × 0.979 via `altoK`, side details mapped with the axles via `altoU`; IoU 0.954.
- Satin/silver side decals on a nose corner speckled (fine black/white noise) at any depth; a dark `trim` housing with a
  `gloss` inner read clean. A side decal starting at u = 1 smeared across the nose face: start it at 0.998.
- Centre-line blobs over a grille on a raked nose went away once the nose `top` at 0.98–1 stood above the lamps (again).
- Twins (Glanza/Baleno, Taisor/Fronx): `{ ...SIBLING, ... }` keeps the shared body; override only what the twin's own photos
  disagree on, copying arrays from the sibling (never edit the sibling). Both twins' gallery side views refitted the sibling:
  Glanza IoU 0.937 → 0.960, Taisor 0.933 → 0.960.
- Glanza (2026 facelift): every studio side render (three portals) read the axles 7 % apart with tyres 10 % big (one CGI camera);
  squeezing the cut-out to the official height and keeping the Baleno's axles still fitted (IoU 0.960). Its raked face with a
  jutting lip cost the decals: a raked nose `top` (0.42 at u = 1) frayed the chrome X-frame and lamps into hooks; a near-upright
  face up to the bonnet bar (0.845 at u = 1) made them clean for no IoU change.
- Black bumper corners on a twin that inherits a body-coloured face: cladding raised only over u 0.966–0.984 (back to 0.1 at the
  face) blacks the corners; raised up to u = 1 it covered the whole lower face, hiding the red lip.
- Honeycomb cells under the number plate show through it: skip cells inside the plate's outline.
- Taisor: a long-lens road side photo (1.557 m over the rails, axles 1 % apart) put the Fronx's roof 3.5 cm and bonnet 7 cm
  high (the Fronx trace came from a close camera); the axles moved 4 cm forward with the cladding/doors (`taisorS`). Heights
  read off a straight front photo came out 3 cm low against the side photo's DRL height; lift them together (`taisorUp`).
- A white vertical band down the nose and tail in the side view at `noseSweep` 0.3 / `tailSweep` 0.22 went away at 0.15 / 0.14.
- Bolero Neo / Bolero: the official 3995 mm is to the rear bumper, not over the tailgate spare. Scaling the side photo's bumper-to-bumper
  span to 3.995 gave the official wheelbase and height (within 2 % / 0.7 %), so `L` is the length over the spare (Neo 4.169, Bolero 4.25)
  read off the photo at that scale; the comment says so.
- Body ahead of the spare (u 0 … tail face) must still exist: a narrow, low "tow step" block (width 0.26, under the spare) read right on
  the Neo. A sliver with a sharp height jump to the bumper lofted into a black ramp / slab over the plate; keep transitions height-similar.
- Rear decals only land on rings within 0.3 m of u = 0, and with a spare that includes the spare's depth: on the Bolero a tail face at
  0.32 m from the end lost every rear decal. Keep the tailgate face ≤ ~0.29 m from the spare's outer face.
- `spare.z` (new, opt-in) puts the spare wheel off-centre (Bolero +0.19 m, the right side seen from behind, like rear decal z).
- `wellInset` walls showed as a solid black slab under a high rear bumper (Bolero bumper bottom 0.6 m); on black paint there's nothing to
  hide, so it was dropped. Black pillars on dark glass read better with `mat: 'trim'` (plain black came out grey).
- EV twins (Nexon.ev, Punch.ev): start from the sibling with `...SIBLING` and override, but trace the side again: the Nexon.ev
  photo put the axles 3.3 % apart with a different overhang split than the ICE trace (front 0.90 m vs 0.79 m), so its top,
  glasshouse, doors and side decals go through a photo-u → official-u map (`nexonEvU`) like the Syros.
- Grey unpainted plastic (Punch.ev cladding and bumpers): `cladding.color` (new, opt-in) and the `clad` decal material (new)
  in the same grey, for ribbed grille panels and bumper faces.
- A swept nose/tail (`noseSweep`/`tailSweep`) bends the cladding's flat end cap as one fan, so the finely tessellated body
  pokes through it in two patches either side of the centre; a `clad` (or `trim`) decal over the bumper face covers it.
  Cutting the sweep instead made the upper corners the car's ends and cost ~1 % IoU (the model scales down to the photo).
- Rear decals stand ~3 cm proud: on a tail whose bumper barely leads, an upright tail face up to the light bar became the
  rearmost point and shrank the whole overlay; a raked `top` at u 0–0.015 with `rakedEnds` puts the bar back on the slope.
- A gloss tail bar that "turns body colour" from behind is the red glow sprites over it, not a hole: check with a `satin` swap.
- Tyres hidden in grass that the cut-out crops off: pad the canvas, paint dark discs at the hubs, and clear grass by colour
  only where it can't be pale paint (Empowered Oxide is grey-green: a plain g > b test ate the doors).
- Thar (3-door, 2026 update): the gallery side photo's bumper-to-bumper span at the official 3.995 m gave 1.865 m tall over a 4.125 m
  length over the spare (Bolero rule again); axles 2.3 % apart, so side details go through `thar3U`. The current grille has five
  slots, not six or seven: count them in the photo. A uniform 1.5 cm blue band on roof and bonnet came off for IoU 0.959 → 0.967.
- Round headlamps on an upright face frayed into white hooks at the ring tops while the pod reached the face's `top`; a face `top`
  ~4.5 cm over the pods, one straight (collinear) raked run down to the bumper and `rakedEnds` made them clean.
- Red streaks either side of the spare on a black rear bumper were the body poking through the swept cladding end cap: a full-width
  `trim` rear decal over the bumper face (satin and reflectors on layer 1) covered it. Wide flat 5-spoke machined alloys: `blade`.
- Thar review: the shared `satin` read near-white on the bumper centres from every angle; `satinColor` (new, opt-in per spec,
  Thar '#5c6166') gives a mid-grey satin. Two-tone Y-spoke alloys: `split` + `rimTone: 'dark'` (plain `blade` read light silver).
  Rear decals land only on body rings, never on the glasshouse, so a framed window on a hard top's rear face can't be drawn.
- Kiger / Magnite (CMF-A+ pair, separate bodies): Kiger gallery side read 1.658 m (rails + antenna, close camera, axles 2 % apart);
  heights × 0.968 (`kigerK`, which also brought the photo tyre to 195/60 R16) cost a uniform red roof band, and lifting the roof
  2 cm (photo m) back to the official height took IoU 0.942 → 0.962. Magnite's side photo read 1.581 m: × 0.994, IoU 0.964.
- Low side decals (door garnish under ~0.4 m) land on the body's bottom roll and read thinner than traced from the shot camera;
  a thin body-coloured line on top of such a garnish made it read as a single line, so it was dropped.
- A cowl peak in `top` (windscreen base above the belt and the bonnet) rippled the wing; a monotonic rise belt → cowl → bonnet fixed it.
- Big hex grille (Magnite): staggered six-sided `trim` blocks on a `gloss` panel inside a `trim` surround, chrome side frames as `band()`s.
  A swept headlamp whose face part rides the top corner reads tiny: keep the front part ≤ the photo's nose height (side photo), not the
  straight-front read, and let the `side` wedge carry the sweep back along the wing.
- `satinColor` (new, opt-in, build.ts) darkens one car's 'satin' decals: big skid plates read near-white at the default #9da2a7;
  #62676c reads as silver plastic (Kiger, Magnite). Lowering `sill` at the ends to fit low skid plates exposes paint under the
  bumper: run the black bumper decal down to the new sill. A raised decal (mesh depth 0.012) under a flat plate on a swept nose
  pokes through the plate's centre as specks; 0.008 cleared it.
