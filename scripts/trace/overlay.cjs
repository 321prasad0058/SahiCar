// Draw the render's silhouette outline (red) over the reference side photo, aligned at the ground and nose and
// scaled so the render's length matches the photo's body length. usage: overlay car ref out [noseSide]
const puppeteer = require('puppeteer-core')
const sharp = require('sharp')
const [car, ref, out] = process.argv.slice(2)
async function mask(buf, isBg) {
  const { data, info } = await sharp(buf, { failOn: 'none' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height, m = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) m[i] = isBg(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) ? 0 : 1
  let x0 = W, x1 = 0, y0 = H, y1 = 0
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (m[y * W + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y) }
  return { m, W, H, x0, x1, y0, y1 }
}
;(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] })
  const p = await b.newPage()
  await p.setViewport({ width: 1600, height: 800 })
  await p.goto(`http://localhost:5181/dev/cars?car=${car}&shot=side&fov=10`, { waitUntil: 'networkidle2' })
  // plain background so the silhouette separates cleanly; hide the floor ring and chips
  await p.evaluate(() => { document.querySelector('div[style]').style.background = '#ffffff'; document.querySelectorAll('a.chip').forEach((a) => (a.style.display = 'none')) })
  await new Promise((r) => setTimeout(r, 1800))
  const shot = await p.screenshot()
  await b.close()
  // render: anything far from the cleared white/floor counts as car (floor ring is a thin light line)
  const R = await mask(shot, (r, g, bl) => r + g + bl > 600)
  const F = await mask(await sharp(ref, { failOn: 'none' }).toBuffer(), (r, g, bl) => r > 236 && g > 236 && bl > 236)
  // body length in each, measured above the bottom 12% (shadows) — rows between 25% and 75% of height
  const extent = (M) => { let a = M.W, z = 0; const top = M.y0, h = M.y1 - M.y0; for (let y = Math.round(top + 0.25 * h); y < top + 0.88 * h; y++) for (let x = 0; x < M.W; x++) if (M.m[y * M.W + x]) { a = Math.min(a, x); break } ; for (let y = Math.round(top + 0.25 * h); y < top + 0.88 * h; y++) for (let x = M.W - 1; x >= 0; x--) if (M.m[y * M.W + x]) { z = Math.max(z, x); break } ; return [a, z] }
  const [ra, rz] = extent(R), [fa, fz] = extent(F)
  const k = (fz - fa) / (rz - ra)
  // outline of the render mask, mapped into reference pixels (align left edge and bottom)
  let svg = `<svg width="${F.W}" height="${F.H}" xmlns="http://www.w3.org/2000/svg"><g fill="#ff0040">`
  for (let y = 1; y < R.H - 1; y++) for (let x = 1; x < R.W - 1; x++) {
    const i = y * R.W + x
    if (R.m[i] && (!R.m[i - 1] || !R.m[i + 1] || !R.m[i - R.W] || !R.m[i + R.W])) {
      const X = fa + (x - ra) * k, Y = F.y1 - (R.y1 - y) * k
      if (X >= 0 && Y >= 0 && X < F.W && Y < F.H) svg += `<rect x="${X.toFixed(1)}" y="${Y.toFixed(1)}" width="1.6" height="1.6"/>`
    }
  }
  svg += '</g></svg>'
  await sharp(ref, { failOn: 'none' }).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 85 }).toFile(out)
  console.log('scale k', k.toFixed(3), 'render body px', rz - ra, 'ref body px', fz - fa, '| ref height/length', ((F.y1 - F.y0) / (fz - fa)).toFixed(3), 'render', ((R.y1 - R.y0) / (rz - ra)).toFixed(3))
})()
