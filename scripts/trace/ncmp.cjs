// Render a car from the dev viewer at side/front/rear/f34 and put each next to its reference photo.
const puppeteer = require('puppeteer-core')
const sharp = require('sharp')
const [car, out, ...pairs] = process.argv.slice(2) // pairs: shot=refpath
;(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] })
  const p = await b.newPage()
  await p.setViewport({ width: 1200, height: 700 })
  const errs = []
  p.on('pageerror', (e) => errs.push(e.message))
  const W = 640, H = 380, tiles = []
  for (let i = 0; i < pairs.length; i++) {
    const [shot, ref] = pairs[i].split('=')
    await p.goto(`http://localhost:5181/dev/cars?car=${car}&shot=${shot}&fov=10`, { waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 1800))
    const png = await p.screenshot({ clip: { x: 0, y: 60, width: 1200, height: 640 } })
    let rend = sharp(png).resize(W, H, { fit: 'contain', background: '#e9e6df' })
    if (shot === 'side' && process.env.FLOP) rend = rend.flop()
    tiles.push({ input: await sharp(ref, { failOn: 'none' }).resize(W, H, { fit: 'contain', background: '#fff' }).toBuffer(), left: 0, top: i * H })
    tiles.push({ input: await rend.toBuffer(), left: W, top: i * H })
  }
  await sharp({ create: { width: 2 * W, height: pairs.length * H, channels: 3, background: '#000' } }).composite(tiles).jpeg({ quality: 82 }).toFile(out)
  console.log(errs[0] || 'no errors')
  await b.close()
})()
