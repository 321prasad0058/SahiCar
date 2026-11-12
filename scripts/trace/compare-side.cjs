// Score a traced model against its side photo: render the dev viewer's near-orthographic side shot, align it to
// the levelled photo cut-out at the ground and the bumpers, and colour the difference.
//   green = both · red = only in the photo (model too small there) · blue = only in the model (too big there)
// Prints IoU (overlap ÷ union) over the whole silhouette and over the upper half (roof, glass, pillars).
//
// usage: node scripts/trace/compare-side.cjs <car-id> <cutout.png> <out.jpg> [nose=left|right] [port=5181]
const puppeteer = require('puppeteer-core')
const sharp = require('sharp')
const [car, cut, out, nose = 'left', port = '5181'] = process.argv.slice(2)

async function maskFromAlpha(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  return { W: info.width, H: info.height, on: (x, y) => data[(y * info.width + x) * 4 + 3] > 128 }
}
async function maskFromBg(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  // the dev viewer background is cleared to pure white below; anything darker than near-white is car
  return { W: info.width, H: info.height, on: (x, y) => { const i = (y * info.width + x) * 3; return data[i] + data[i + 1] + data[i + 2] < 705 } }
}
// level the photo on its two tyre contacts, then crop it to the car
async function levelled(file) {
  const m = await maskFromAlpha(await sharp(file).toBuffer())
  const low = (xa, xb) => { let best = null; for (let x = xa; x < xb; x++) for (let y = m.H - 1; y >= 0; y--) if (m.on(x, y)) { if (!best || y > best.y) best = { x, y }; break } return best }
  const a = low(0, Math.round(m.W * 0.4)), b = low(Math.round(m.W * 0.6), m.W)
  const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
  return sharp(file).rotate(-deg, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).trim({ threshold: 1 }).png().toBuffer()
}
function bbox(M) {
  let x0 = M.W, x1 = 0, y0 = M.H, y1 = 0
  for (let y = 0; y < M.H; y++) for (let x = 0; x < M.W; x++) if (M.on(x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
  return { x0, x1, y0, y1 }
}

;(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] })
  const p = await b.newPage()
  await p.setViewport({ width: 1800, height: 900 })
  await p.goto(`http://localhost:${port}/dev/cars?car=${car}&shot=side&fov=11&mask=1`, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 2200))
  let shot = await p.screenshot()
  await b.close()
  // the dev shot shows the nose to the right; mirror it when the photo's nose is on the left
  if (nose === 'right') shot = await sharp(shot).flop().toBuffer() // the dev side shot has the nose on the left

  const R = await maskFromBg(shot), rb = bbox(R)
  const photo = await levelled(cut)
  const F = await maskFromAlpha(photo), fb = bbox(F)
  // work on a common canvas: both scaled so bumper-to-bumper = 1000 px, aligned at the ground (lowest pixel)
  const S = 1000, pad = 40
  const sr = S / (rb.x1 - rb.x0), sf = S / (fb.x1 - fb.x0)
  const Hc = Math.round(Math.max((rb.y1 - rb.y0) * sr, (fb.y1 - fb.y0) * sf)) + 2 * pad, Wc = S + 2 * pad
  const at = (M, b0, s, X, Y) => { const x = Math.round(b0.x0 + (X - pad) / s), y = Math.round(b0.y1 - (Hc - pad - Y) / s); return x >= 0 && y >= 0 && x < M.W && y < M.H && M.on(x, y) }
  const img = Buffer.alloc(Wc * Hc * 3, 255)
  let both = 0, onlyF = 0, onlyR = 0, bothU = 0, uni = 0
  const half = Hc - pad - ((fb.y1 - fb.y0) * sf) / 2
  for (let Y = 0; Y < Hc; Y++) for (let X = 0; X < Wc; X++) {
    const f = at(F, fb, sf, X, Y), r = at(R, rb, sr, X, Y), i = (Y * Wc + X) * 3
    if (f && r) { both++; img[i] = 120; img[i + 1] = 200; img[i + 2] = 140 } else if (f) { onlyF++; img[i] = 230; img[i + 1] = 60; img[i + 2] = 60 } else if (r) { onlyR++; img[i] = 60; img[i + 1] = 110; img[i + 2] = 230 }
    if (Y < half && (f || r)) { uni++; if (f && r) bothU++ }
  }
  const iou = both / (both + onlyF + onlyR)
  await sharp(img, { raw: { width: Wc, height: Hc, channels: 3 } }).jpeg({ quality: 88 }).toFile(out)
  console.log(JSON.stringify({ car, iou: +iou.toFixed(4), upperIou: +(bothU / uni).toFixed(4), photoOnlyPct: +((100 * onlyF) / (both + onlyF)).toFixed(2), modelOnlyPct: +((100 * onlyR) / (both + onlyR)).toFixed(2), renderAspect: +((rb.x1 - rb.x0) / (rb.y1 - rb.y0)).toFixed(3), photoAspect: +((fb.x1 - fb.x0) / (fb.y1 - fb.y0)).toFixed(3) }))
})()
