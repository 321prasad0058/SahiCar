// Removes the small four-point sparkle that Gemini stamps in the bottom-right corner of its images.
// It sits at a fixed place (centre ≈ 91% across, 84% down; ~36 px wide on a 1024 × 572 render), always on the
// studio floor, so it is found as the bright blob there that stands out from a smoothed copy of its surroundings,
// and those pixels are filled in from the floor around them (a smooth membrane fill, no visible patch).
import sharp from 'sharp'
import TEMPLATE from './sparkle-mask.json' with { type: 'json' }

/** @returns {Promise<{ buf: Buffer, removed: number }>} PNG of the cleaned image and how many pixels were filled */
export async function unmark(input, opts = {}) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height, C = 3
  const k = W / 1024
  const cx = Math.round(934 * k), cy = Math.round(H * (482 / 572))
  const R = Math.round(60 * k)
  const x0 = Math.max(0, cx - R), y0 = Math.max(0, cy - R), x1 = Math.min(W, cx + R), y1 = Math.min(H, cy + R)
  const w = x1 - x0, h = y1 - y0
  const lum = (x, y) => { const i = (y * W + x) * C; return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2] }
  // background: the window's median-ish level per row band (the floor is a smooth gradient), via a box blur that
  // ignores the brightest pixels
  const L = new Float32Array(w * h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) L[y * w + x] = lum(x0 + x, y0 + y)
  const bg = new Float32Array(w * h)
  const r = Math.round(22 * k)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const vals = []
    for (let yy = Math.max(0, y - r); yy < Math.min(h, y + r + 1); yy += 3) for (let xx = Math.max(0, x - r); xx < Math.min(w, x + r + 1); xx += 3) vals.push(L[yy * w + xx])
    vals.sort((a, b) => a - b)
    bg[y * w + x] = vals[Math.floor(vals.length * 0.4)]
  }
  // the sparkle: pixels clearly brighter than the floor, in the blob nearest the expected centre
  const hot = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) hot[i] = L[i] - bg[i] > 2.2 ? 1 : 0
  const seen = new Uint8Array(w * h)
  let best = null
  for (let i = 0; i < w * h; i++) {
    if (!hot[i] || seen[i]) continue
    const comp = [], stack = [i]
    seen[i] = 1
    while (stack.length) {
      const j = stack.pop(); comp.push(j)
      const jx = j % w, jy = (j / w) | 0
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = jx + dx, ny = jy + dy
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
        const n = ny * w + nx
        if (hot[n] && !seen[n]) { seen[n] = 1; stack.push(n) }
      }
    }
    let sx = 0, sy = 0
    for (const j of comp) { sx += j % w; sy += (j / w) | 0 }
    const d = Math.hypot(sx / comp.length + x0 - cx, sy / comp.length + y0 - cy)
    const size = comp.length / (k * k)
    if (d < 30 * k && size > 60 && size < 2600 && (!best || d < best.d)) best = { comp, d }
  }
  // the mark is always the same shape in the same place: use the fixed outline (TEMPLATE) unless asked to detect
  const mask = new Uint8Array(w * h)
  if (opts.detect) {
    if (!best) return { buf: await sharp(input).png().toBuffer(), removed: 0, points: [] }
    for (const j of best.comp) mask[j] = 1
  } else {
    for (const [dx, dy] of TEMPLATE) { const x = Math.round(cx - x0 + dx * k), y = Math.round(cy - y0 + dy * k); if (x >= 0 && y >= 0 && x < w && y < h) mask[y * w + x] = 1 }
  }
  const grow = Math.max(2, Math.round(4 * k))
  for (let g = 0; g < grow; g++) {
    const m2 = mask.slice()
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) if (!mask[y * w + x] && (mask[y * w + x - 1] || mask[y * w + x + 1] || mask[(y - 1) * w + x] || mask[(y + 1) * w + x])) m2[y * w + x] = 1
    mask.set(m2)
  }
  // membrane fill: each masked pixel becomes the average of its neighbours, repeated until smooth
  const out = Buffer.from(data)
  const px = (x, y, c) => out[((y0 + y) * W + (x0 + x)) * C + c]
  const idx = []
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) if (mask[y * w + x]) idx.push([x, y])
  // start from the floor level so it converges quickly
  for (const [x, y] of idx) for (let c = 0; c < C; c++) out[((y0 + y) * W + (x0 + x)) * C + c] = px(x - 1, y, c)
  for (let it = 0; it < 500; it++) for (const [x, y] of idx) for (let c = 0; c < C; c++) {
    const v = (px(x - 1, y, c) + px(x + 1, y, c) + px(x, y - 1, c) + px(x, y + 1, c)) / 4
    out[((y0 + y) * W + (x0 + x)) * C + c] = Math.round(v)
  }
  // a whisper of grain so the filled patch has the same texture as the floor around it
  let seed = 7
  for (const [x, y] of idx) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; const n = ((seed >> 16) % 3) - 1; for (let c = 0; c < C; c++) { const i = ((y0 + y) * W + (x0 + x)) * C + c; out[i] = Math.max(0, Math.min(255, out[i] + n)) } }
  return { buf: await sharp(out, { raw: { width: W, height: H, channels: C } }).png().toBuffer(), removed: idx.length, points: idx.map(([x, y]) => [x + x0 - cx, y + y0 - cy]) }
}
