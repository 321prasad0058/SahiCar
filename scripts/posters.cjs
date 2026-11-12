// Loading posters for the 3D studio: the exact opening frame of each modelled car (full detail, default paint, on a
// transparent background), shown instantly on the car page while the live 3D builds. Run after any change to a
// car's spec, a new car in READY, or a studio lighting/camera change:
//
//   npx vite --port 5181 &   then   node scripts/posters.cjs [car-id …]   (no ids = every modelled car)
//
// Writes public/3d/<id>.<hash>.<w|m>.webp (w = 16:10 desktop stage, m = 4:3 phone stage; the hash changes with the
// picture, so caches never serve a stale one) and src/data/posters.json, which the page reads.
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const puppeteer = require('puppeteer-core')

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'public/3d')
const MANIFEST = path.join(ROOT, 'src/data/posters.json')
const PORT = process.env.PORT || 5181
const SHAPES = { w: { width: 1280, height: 900, deviceScaleFactor: 1.5 }, m: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } }

// every car with its own model: the page's SHOWCASE_IDS list
function readyIds() {
  const src = fs.readFileSync(path.join(ROOT, 'src/pages/CarDetail.tsx'), 'utf8')
  return JSON.parse(src.match(/const SHOWCASE_IDS = (\[[^\]]*\])/)[1].replace(/'/g, '"'))
}

;(async () => {
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : readyIds()
  fs.mkdirSync(OUT, { recursive: true })
  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {}
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] })
  for (const id of ids) {
    const entry = {}
    for (const [shape, vp] of Object.entries(SHAPES)) {
      const p = await b.newPage()
      await p.setViewport(vp)
      // the opening frame, not a moment into the turntable spin
      await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
      await p.goto(`http://localhost:${PORT}/car/${id}?perf=high`, { waitUntil: 'networkidle2' })
      await p.evaluate(() => [...document.querySelectorAll('button')].find((x) => x.textContent.includes('3D'))?.click())
      await p.waitForSelector('.studio.ready', { timeout: 30000 })
      const url = await p.evaluate(async () => {
        const s = window.__studio
        await s.upgradeNow()
        return s.poster()
      })
      await p.close()
      const buf = Buffer.from(url.split(',')[1], 'base64')
      const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8)
      for (const f of fs.readdirSync(OUT)) if (f.startsWith(`${id}.`) && f.endsWith(`.${shape}.webp`)) fs.unlinkSync(path.join(OUT, f))
      const file = `${id}.${hash}.${shape}.webp`
      fs.writeFileSync(path.join(OUT, file), buf)
      entry[shape] = `/3d/${file}`
      console.log(`${file}  ${(buf.length / 1024).toFixed(1)} KB`)
    }
    manifest[id] = entry
  }
  await b.close()
  fs.writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 1) + '\n')
})()
