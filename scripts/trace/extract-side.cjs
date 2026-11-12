// Measure a car's side profile from a cut-out side photo (transparent background, as made by cutout.swift).
//
// usage: node scripts/trace/extract-side.cjs <cutout.png> <length m> <height m> [nose=left|right] > profile.json
//
// 1. Levels the car: the lowest point under each tyre is a ground contact; the line through them is the road.
// 2. Scales it: the bumper-to-bumper width in pixels = the official length (perspective makes near-side wheels
//    look a few % big, so sizes come from the spec sheet, shapes from the photo). Height is reported as a check.
// 3. Reads, per position u (0 = tail … 1 = nose), in metres above the road:
//    top      the upper silhouette (roof, then bonnet / boot where there is no glasshouse)
//    bottom   the lower edge of the body (sill, bumpers), with the tyres taken out
//    paintTop the highest painted pixel (= belt line under the windows, where the paint meets the black frame)
//    paintLow the lowest painted pixel (= top of the black lower cladding)
//    axles    tyre centres from the ground contacts; tyreR from the tyre's visible width
// Paint is sampled from the middle of the doors, so it works for any colour that differs from black trim.
const sharp = require('sharp')
const [file, Ls, Hs, nose = 'left'] = process.argv.slice(2)
const L = +Ls, H = +Hs

;(async () => {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, Ht = info.height
  const A = (x, y) => data[(y * W + x) * 4 + 3]
  const C = (x, y) => [data[(y * W + x) * 4], data[(y * W + x) * 4 + 1], data[(y * W + x) * 4 + 2]]
  const on = (x, y) => A(x, y) > 128

  // ── level: the lowest opaque pixel in the left and right thirds are the tyre contacts
  const low = (xa, xb) => { let best = null; for (let x = xa; x < xb; x++) for (let y = Ht - 1; y >= 0; y--) if (on(x, y)) { if (!best || y > best.y) best = { x, y }; break } return best }
  const c1 = low(0, Math.round(W * 0.4)), c2 = low(Math.round(W * 0.6), W)
  const ang = Math.atan2(c2.y - c1.y, c2.x - c1.x)
  // rotate a point into the levelled frame (about c1)
  const lev = (x, y) => { const dx = x - c1.x, dy = y - c1.y, c = Math.cos(-ang), s = Math.sin(-ang); return [c1.x + dx * c - dy * s, c1.y + dx * s + dy * c] }

  // ── collect opaque pixels in the levelled frame, column-binned
  const cols = new Map()
  let xmin = Infinity, xmax = -Infinity
  for (let y = 0; y < Ht; y++) for (let x = 0; x < W; x++) {
    if (!on(x, y)) continue
    const [X, Y] = lev(x, y), k = Math.round(X)
    if (!cols.has(k)) cols.set(k, [])
    cols.get(k).push([Y, x, y])
    xmin = Math.min(xmin, X); xmax = Math.max(xmax, X)
  }
  const ground = c1.y // after levelling, both contacts sit on this row
  const ppm = (xmax - xmin) / L
  const toU = (X) => (nose === 'left' ? 1 - (X - xmin) / (xmax - xmin) : (X - xmin) / (xmax - xmin))
  const toM = (Y) => +((ground - Y) / ppm).toFixed(4)

  // ── tyre contacts → axles; tyre radius from the dark tyre's widest span near the ground
  const [lx1] = lev(c1.x, c1.y), [lx2] = lev(c2.x, c2.y)

  const tyreSpan = (cx) => {
    // the bottom profile dips to the ground across the tyre's footprint; walk out until it rises above 18% of the tyre
    let a = cx, b = cx
    const bot = (k) => { const c = cols.get(k); return c ? c.reduce((m, p) => Math.max(m, p[0]), -Infinity) : -Infinity }
    while (bot(a - 1) > ground - 0.12 * ppm) a--
    while (bot(b + 1) > ground - 0.12 * ppm) b++
    return [a, b]
  }

  // ── paint colour: median of the door area (40–60 % along, 45–60 % up)
  const samp = []
  for (let X = Math.round(xmin + 0.4 * (xmax - xmin)); X < xmin + 0.6 * (xmax - xmin); X += 2) for (const [Y, x, y] of cols.get(X) ?? []) { const h = (ground - Y) / ppm; if (h > H * 0.45 && h < H * 0.6) samp.push(C(x, y)) }
  const med = (i) => samp.map((c) => c[i]).sort((a, b) => a - b)[samp.length >> 1]
  const paint = [med(0), med(1), med(2)]
  const isPaint = (c) => Math.hypot(c[0] - paint[0], c[1] - paint[1], c[2] - paint[2]) < 95 && Math.max(...c) > 60

  // ── per-column profiles, sampled at 101 stations
  const out = { top: [], bottom: [], paintTop: [], paintLow: [] }
  const N = 100
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const X = Math.round(nose === 'left' ? xmax - u * (xmax - xmin) : xmin + u * (xmax - xmin))
    const c = (cols.get(X) ?? cols.get(X + 1) ?? cols.get(X - 1) ?? []).slice().sort((a, b) => a[0] - b[0])
    if (!c.length) continue
    out.top.push([+u.toFixed(3), toM(c[0][0])])
    out.bottom.push([+u.toFixed(3), toM(c[c.length - 1][0])])
    // the painted run that contains the door's middle height: walk up and down from there until the paint stops
    // for 3 px (so seats seen through the glass, or paint-coloured trim elsewhere, can't join it)
    const mid = ground - H * 0.5 * ppm
    let k = c.findIndex((q) => q[0] >= mid)
    if (k < 0) k = c.length - 1
    let probe = k
    while (probe < c.length && !isPaint(C(c[probe][1], c[probe][2]))) probe++
    if (probe < c.length && Math.abs(c[probe][0] - mid) < 0.25 * ppm) {
      let a = probe, b = probe, miss = 0
      for (let j = probe; j >= 0 && miss < 3; j--) { if (isPaint(C(c[j][1], c[j][2]))) { a = j; miss = 0 } else miss++ }
      miss = 0
      for (let j = probe; j < c.length && miss < 3; j++) { if (isPaint(C(c[j][1], c[j][2]))) { b = j; miss = 0 } else miss++ }
      out.paintTop.push([+u.toFixed(3), toM(c[a][0])]); out.paintLow.push([+u.toFixed(3), toM(c[b][0])])
    }
  }
  const spans = [tyreSpan(Math.round(lx1)), tyreSpan(Math.round(lx2))]
  // a tyre's centre is the middle of its footprint, not its single lowest pixel
  const axU = spans.map(([a, b]) => toU((a + b) / 2)).sort((a, b) => a - b)
  const res = {
    file, L, H,
    levelDeg: +((ang * 180) / Math.PI).toFixed(2),
    pxPerM: +ppm.toFixed(1),
    measuredHeight: +((ground - [...cols.values()].reduce((m, c) => c.reduce((mm, p) => Math.min(mm, p[0]), m), Infinity)) / ppm).toFixed(3),
    axles: axU.map((u) => +u.toFixed(4)),
    wheelbase: +(Math.abs(axU[1] - axU[0]) * L).toFixed(3),
    footprints: spans.map(([a, b]) => +(((b - a) / ppm)).toFixed(3)),
    tyreR: spans.map(([a, b]) => { const c = (b - a) / ppm, h = 0.12; return +((c / 2) ** 2 / (2 * h) + h / 2).toFixed(3) }),
    paint,
    ...out,
  }
  console.log(JSON.stringify(res))
})()
