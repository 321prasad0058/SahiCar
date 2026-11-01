# Tracing an exact 3D model

How the Tata Nexon was traced (Nov 2026), and the mistakes made on the way, so the next model takes a fraction
of the time. Exact models live in `src/webgl/cars/exact.ts`; a model only goes live after it is added to
`READY` in `src/webgl/cars/specs.ts` and its id to `SHOWCASE_IDS` in `src/pages/CarDetail.tsx`.

## The spec in one paragraph

A car is a `CarSpec`: a lofted body built from curves along its length. `u` runs **0 at the tail → 1 at the
nose**; heights are **metres from the ground**. `sill` is the body's underside line, `top` the bonnet → belt →
tailgate line, `greenhouse.top` the roof line between `u0` (rear end of the glass) and `u1` (windscreen base).
`pillars` are four-sided patches on the glass (`bottom` u-range at the belt, `top` u-range under the roof edge),
black or body-coloured. `front` / `rear` decals use **x across the width (−1…1)** and heights in metres; `side`
decals use `(u, height)`. `cladding.top` is the top edge of the black lower body; `flare` is the arch flare.

## Method

1. **References (private, never published).** You need a *straight* studio side view on a white background, plus
   front and rear views. CarWale's image pages have them with fixed angle names:
   `imgd.aeplcdn.com/1920x1080/n/cw/ec/<id>/<model>-exterior-left-side-view-<n>.jpeg` (also `front-view`,
   `rear-view`, `left-front-three-quarter`). Find the URLs in the HTML of `carwale.com/<brand>-cars/<model>/images/`.
   Use a neutral User-Agent — never personal details. Commons rarely has a clean current-gen side view.
2. **Grid it.** `node scripts/trace/gridify.cjs ref.jpg out.png left top width height scale` overlays a labelled
   pixel grid. Read the side in three crops (front / middle / rear) at ~1× zoom: wheel hubs, nose and tail tips,
   bumper tops and bottoms, bonnet line, windscreen base, roof, spoiler, window line, door shut lines, pillars,
   cladding, handles. Grid the front view for the fascia (light bars, lamps, grille, skid plate, plate).
3. **Scale.** Convert pixels with *one* consistent rule (see mistakes 1–2):
   - `u = 1 − (x − noseX) / (tailX − noseX)` straight from the photo (nose on the left).
   - heights: pick the px-per-metre that makes the **tyre radius** match the real tyre size *and* the roof match the
     official height; check both before tracing everything.
   - front decals: `x = (px − centre) / halfWidthPx`, heights on the front view's own scale.
4. **Write the spec** in `exact.ts` (copy NEXON as the template), add it to `EXACT`.
5. **Compare, overlay, fix** (dev server on :5181):
   - `node scripts/trace/ncmp.cjs <id> out.jpg side=ref/side.jpg front=ref/front.jpg f34=ref/f34.jpg rear=ref/rear.jpg`
     renders each angle from `/dev/cars?car=<id>&shot=…` next to its photo.
   - `node scripts/trace/overlay.cjs <id> ref/side.jpg out.jpg` draws the render's outline in red over the side
     photo — the fastest way to see what's off.
   - Iterate until the outline sits on the photo; then check the front three-quarter (it shows glasshouse lean,
     `tumble`) and the rear.
6. **Go live:** add the id to `READY` and `SHOWCASE_IDS`, run `npx tsc --noEmit -p .`, then open
   `/car/<id>` → 3D 360° on desktop and phone and confirm there are no console errors.

## Mistakes to avoid (all made on the Nexon)

1. **Forcing official length *and* wheelbase onto a photo.** Studio renders aren't measured drawings; the Nexon's
   photo implies a 2.71 m wheelbase at its 3.995 m length (official 2.498 m). Forcing both stretched the body and it
   looked like a wagon. Take **positions along the car from the photo**, keep the official length, and keep heights
   on the scale that matches the official height and real tyre size.
2. **Scaling by the bounding box.** The ground shadow and light-grey pixels widen the box; measure length above the
   bottom ~12% of the car, and confirm the scale against the tyre size.
3. **Automatic sill/tyre detection.** Black arch cladding merges with the tyre, so detected tyre radii were ~25% too
   big. Read wheel hubs and the sill off the grid by eye.
4. **Comparing mirrored images.** The side render is not flipped; the ref and render both show the nose on the
   left. A flip hid the real differences for two rounds.
5. **The glass running to the tail.** On most modern SUVs the side glass stops behind the rear door; add the
   body-coloured C-pillar as a `pillars` entry with `black: false`, plus the black wedge.
6. **Body-coloured decals that don't draw.** They use the paint material; it must be `side: DoubleSide` (now fixed
   in `build.ts`) or they're culled on one side of the glasshouse.
7. **The dev camera being refitted.** `Studio.layout()` refits the camera on resize unless `userMoved` is set; the
   photo camera (`shoot()`) now sets it. If renders look zoomed in, check this first.
8. **A `const` used before its declaration** in `specs.ts` broke *every* car page's 3D (temporal dead zone).
   After touching `specs.ts`, open a normal car page's 3D, not just the dev viewer.
9. **Checking only the side.** The side can match while the front three-quarter still looks boxy — tune `tumble`
   (glasshouse lean; Nexon 0.72) and the shoulder from that angle.

## Time

With references found and this playbook, a car takes roughly: references 10 min, grid reading 20 min, spec 15 min,
two or three overlay/fix rounds 20 min, live check 5 min.

## Done

| Model | Traced | References |
| --- | --- | --- |
| Tata Nexon (2023 facelift) | Nov 2026 | CarWale studio side + front views, Autocar launch photos (f34, rear-34), Commons rear |
