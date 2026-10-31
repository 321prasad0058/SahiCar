// Official manufacturer images, self-hosted.
//
//   node scripts/official-images.mjs collect [id …]   visit each car's official page in headless Chrome and list candidate images
//   node scripts/official-images.mjs pick [id …]      download candidates, score them, and write the best to public/cars/
//   node scripts/official-images.mjs sheet            contact sheets of the picks (scratch/sheets) for a human check
//
// The scorer prefers studio renders: the transparent-background cut-outs carmakers use in their colour pickers,
// then plain studio backdrops, then everything else. research/official-overrides.json pins a candidate URL
// (or null to skip a car) when the scorer gets it wrong. Images stay © their manufacturers and are credited.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const R = (p) => join(root, p)
const readJson = (p, d) => (existsSync(R(p)) ? JSON.parse(readFileSync(R(p), 'utf8')) : d)
const cars = readJson('src/data/cars.json', [])
const pages = readJson('research/official-pages.json', {}) // id → model page, when cars.json only has a homepage
const overrides = readJson('research/official-overrides.json', {})
const [cmd, ...only] = process.argv.slice(2)
const chosen = only.length ? cars.filter((c) => only.includes(c.id)) : cars
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
// identify ourselves honestly; sites that refuse automated visits just keep the Wikimedia photo
const UA = 'SahiCarImageBot/0.1 (+https://github.com/; official press images, credited)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ── collect

async function collect() {
  const { default: puppeteer } = await import('puppeteer-core')
  let browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
  const out = readJson('research/official-candidates.json', {})
  const queue = [...chosen]
  const worker = async () => {
    for (let car; (car = queue.shift()); ) {
      if (!process.argv.includes('--force') && out[car.id]?.candidates?.length >= 5) continue // already collected (--force to redo)
      let page
      try {
        page = await browser.newPage()
      } catch {
        // the browser crashed (heavy pages do that): start a fresh one and carry on
        await browser.close().catch(() => {})
        browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
        page = await browser.newPage()
      }
      await page.setViewport({ width: 1440, height: 900 })
      const seen = new Map()
      page.on('response', (r) => {
        const type = r.headers()['content-type'] ?? ''
        if (type.startsWith('image/') && !type.includes('svg') && !type.includes('gif')) seen.set(r.url(), { url: r.url(), from: 'net', len: Number(r.headers()['content-length'] ?? 0) })
      })
      try {
        let url = pages[car.id] ?? car.oemUrl
        const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => null)
        const missing = !res || res.status() >= 400 || /not found|404/i.test(await page.title().catch(() => ''))
        if (missing && !pages[car.id]) {
          url = new URL(url).origin + '/'
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {})
        }
        // a homepage (or a page for a different model): follow the link that names this model
        const words = slug(car.model).split('-').filter((w) => w.length > 1 && w !== 'ev')
        if (!pages[car.id] && (missing || new URL(url).pathname.replace(/\/(en|in)?\/?$/, '') === '' || !words.every((w) => url.toLowerCase().includes(w)))) {
          const href = await page.evaluate((words) => {
            const as = [...document.querySelectorAll('a[href]')]
            const hit = as.find((a) => words.every((w) => a.href.toLowerCase().includes(w))) ?? as.find((a) => words.every((w) => (a.href + ' ' + a.textContent).toLowerCase().includes(w)))
            return hit?.href ?? null
          }, words)
          if (href) {
            url = href
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {})
          }
        }
        // walk down the page so lazy images and colour pickers load
        for (let i = 0; i < 14; i++) {
          await page.evaluate(() => window.scrollBy(0, innerHeight * 0.9))
          await sleep(450)
        }
        const found = await page.evaluate(() => {
          const abs = (u) => { try { return new URL(u, location.href).href } catch { return null } }
          const list = []
          const meta = (p) => document.querySelector(`meta[property="${p}"], meta[name="${p}"]`)?.getAttribute('content')
          for (const p of ['og:image', 'twitter:image']) if (meta(p)) list.push({ url: abs(meta(p)), from: 'og' })
          for (const img of document.querySelectorAll('img')) {
            const srcs = [img.currentSrc, img.src, img.dataset.src, img.dataset.lazy, ...(img.srcset || img.dataset.srcset || '').split(',').map((s) => s.trim().split(' ')[0])]
            for (const s of srcs) if (s) list.push({ url: abs(s), from: 'img', w: img.naturalWidth, h: img.naturalHeight, alt: img.alt })
          }
          for (const s of document.querySelectorAll('source[srcset]')) for (const p of s.srcset.split(',')) list.push({ url: abs(p.trim().split(' ')[0]), from: 'img' })
          for (const el of document.querySelectorAll('[style*="background"]')) {
            const m = el.style.backgroundImage.match(/url\(["']?([^"')]+)/)
            if (m) list.push({ url: abs(m[1]), from: 'bg' })
          }
          return list.filter((x) => x.url && /^https?:/.test(x.url))
        })
        const all = new Map([...seen])
        for (const f of found) all.set(f.url, { ...all.get(f.url), ...f })
        out[car.id] = { page: url, candidates: [...all.values()].filter((c) => !/\.(svg|gif)(\?|$)/i.test(c.url)).slice(0, 160) }
        console.log(`${car.id}: ${out[car.id].candidates.length} candidates from ${url}`)
      } catch (e) {
        console.log(`${car.id}: failed (${e.message})`)
      } finally {
        await page.close().catch(() => {})
      }
      writeFileSync(R('research/official-candidates.json'), JSON.stringify(out, null, 1))
    }
  }
  await Promise.all([worker(), worker(), worker()])
  await browser.close()
}

// ── pick

const BAD = /logo|icon|favicon|sprite|badge|flag|whatsapp|facebook|instagram|youtube|twitter|linkedin|offer|emi|finance|dealer|interior|dashboard|cabin|seat|steering|console|infotainment|screen|boot-space|engine|charging|charger|app|banner-mob|mobile|thumb|placeholder|loader|blank|pixel|tracking|1x1|award|ncap|rating|warranty|service|accessor|wheel-?cover|alloy-close|key|map|people|family|driver/i
const GOOD = /colou?r|exterior|side|front|three-?quarter|3-4|34|360|hero|car-?image|vehicle|variant|model|studio|packshot|cutout|png/i

function heuristic(c, car) {
  const u = c.url.toLowerCase()
  let s = 0
  if (BAD.test(u) || BAD.test(c.alt ?? '')) s -= 40
  if (GOOD.test(u)) s += 12
  for (const w of slug(car.model).split('-')) if (w.length > 2 && u.includes(w)) s += 8
  if (/\.png(\?|$)/.test(u) || /format=png|fm=png/.test(u)) s += 10
  if (c.from === 'og') s += 4
  if (c.w && c.w >= 800) s += 8
  if (c.len && c.len > 60000) s += 6
  if (c.len && c.len < 15000) s -= 15
  return s
}

async function analyse(buf) {
  const img = sharp(buf, { failOn: 'none' })
  const meta = await img.metadata()
  const { width: W = 0, height: H = 0 } = meta
  if (W < 480 || H < 240) return null
  const small = await img.clone().resize(96, Math.max(2, Math.round((96 * H) / W)), { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { data, info } = small
  const px = (x, y) => data.subarray((y * info.width + x) * 4, (y * info.width + x) * 4 + 4)
  // border: transparency and colour uniformity
  let alphaBorder = 0, n = 0, sum = [0, 0, 0], sq = 0
  const border = []
  for (let x = 0; x < info.width; x++) border.push(px(x, 0), px(x, info.height - 1))
  for (let y = 0; y < info.height; y++) border.push(px(0, y), px(info.width - 1, y))
  for (const p of border) { alphaBorder += p[3]; n++; sum[0] += p[0]; sum[1] += p[1]; sum[2] += p[2] }
  const mean = sum.map((v) => v / n)
  for (const p of border) sq += (p[0] - mean[0]) ** 2 + (p[1] - mean[1]) ** 2 + (p[2] - mean[2]) ** 2
  const borderStd = Math.sqrt(sq / n / 3)
  let opaque = 0
  for (let i = 3; i < data.length; i += 4) if (data[i] > 200) opaque++
  const coverage = opaque / (data.length / 4)
  return { W, H, aspect: W / H, transparent: meta.hasAlpha && alphaBorder / n < 10 && coverage > 0.12 && coverage < 0.85, borderStd, coverage }
}

function score(a) {
  let s = 0
  if (a.transparent) s += 60
  else if (a.borderStd < 10) s += 32 // plain studio backdrop
  else if (a.borderStd < 22) s += 12
  if (a.aspect >= 1.3 && a.aspect <= 2.6) s += 16
  else if (a.aspect < 1) s -= 25
  if (a.W >= 1000) s += 10
  if (a.W >= 1600) s += 4
  return s
}

async function fetchBuf(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'image/avif,image/webp,image/png,image/*' } })
  if (!res.ok) throw new Error(String(res.status))
  return Buffer.from(await res.arrayBuffer())
}

async function save(id, buf, a, info) {
  mkdirSync(R('public/cars'), { recursive: true })
  let base = sharp(buf, { failOn: 'none' })
  if (a.transparent) base = base.trim({ threshold: 4 })
  else {
    // frame non-cutouts as 16:10 around the centre
    const h = Math.min(a.H, Math.round(a.W / 1.6))
    const w = Math.round(h * 1.6)
    base = base.extract({ left: Math.max(0, Math.round((a.W - w) / 2)), top: Math.max(0, Math.round((a.H - h) / 2)), width: Math.min(w, a.W), height: h })
  }
  const lg = await base.clone().resize({ width: 1100, withoutEnlargement: true }).webp({ quality: 78, alphaQuality: 85, effort: 5 }).toBuffer()
  const sm = await sharp(lg).resize({ width: 520 }).webp({ quality: 74, alphaQuality: 80, effort: 5 }).toBuffer()
  writeFileSync(R(`public/cars/${id}.webp`), lg)
  writeFileSync(R(`public/cars/${id}-sm.webp`), sm)
  return { src: `/cars/${id}.webp`, sm: `/cars/${id}-sm.webp`, transparent: a.transparent, page: info.page, source: info.url, kb: Math.round((lg.length + sm.length) / 1024) }
}

async function pick() {
  const cands = readJson('research/official-candidates.json', {})
  const result = readJson('research/official-images.json', {})
  for (const car of chosen) {
    const entry = cands[car.id]
    if (car.id in overrides && overrides[car.id] === null) { delete result[car.id]; continue }
    if (!entry && !overrides[car.id]) continue
    const pinned = overrides[car.id]
    const list = pinned ? [{ url: pinned }] : entry.candidates.map((c) => ({ ...c, h0: heuristic(c, car) })).filter((c) => c.h0 > -20).sort((x, y) => y.h0 - x.h0).slice(0, 22)
    let best = null
    for (const c of list) {
      try {
        const buf = await fetchBuf(c.url)
        const a = await analyse(buf)
        if (!a) continue
        const s = score(a) + (c.h0 ?? 0) * 0.6 + (pinned ? 1000 : 0)
        if (!best || s > best.s) best = { s, buf, a, c }
      } catch { /* dead link or blocked */ }
      await sleep(80)
    }
    if (!best) { console.log(`${car.id}: no usable image`); continue }
    result[car.id] = { ...(await save(car.id, best.buf, best.a, { page: entry?.page ?? car.oemUrl, url: best.c.url })), brand: car.brand }
    console.log(`${car.id}: ${best.a.transparent ? 'cut-out' : best.a.borderStd < 10 ? 'studio' : 'photo'} ${best.a.W}×${best.a.H} score ${best.s.toFixed(0)} · ${result[car.id].kb} KB`)
    writeFileSync(R('research/official-images.json'), JSON.stringify(result, null, 1))
  }
}

// ── contact sheets

async function sheet() {
  const result = readJson('research/official-images.json', {})
  const ids = Object.keys(result).filter((id) => !only.length || only.includes(id))
  const dir = process.env.SHEET_DIR ?? R('research/sheets')
  mkdirSync(dir, { recursive: true })
  const cols = 5, cw = 300, ch = 210, per = 30
  for (let p = 0; p * per < ids.length; p++) {
    const chunk = ids.slice(p * per, p * per + per)
    const rows = Math.ceil(chunk.length / cols)
    const tiles = await Promise.all(chunk.map(async (id, i) => {
      const img = await sharp(R(`public${result[id].sm}`)).resize(cw - 10, ch - 34, { fit: 'contain', background: '#1b2733' }).flatten({ background: '#1b2733' }).toBuffer()
      const label = Buffer.from(`<svg width="${cw - 10}" height="24"><rect width="100%" height="100%" fill="#000"/><text x="6" y="17" font-size="14" font-family="Helvetica" fill="${result[id].transparent ? '#3cf06e' : '#fff'}">${id}</text></svg>`)
      return [
        { input: img, left: (i % cols) * cw + 5, top: Math.floor(i / cols) * ch + 5 },
        { input: label, left: (i % cols) * cw + 5, top: Math.floor(i / cols) * ch + ch - 30 },
      ]
    }))
    await sharp({ create: { width: cols * cw, height: rows * ch, channels: 3, background: '#0b1118' } }).composite(tiles.flat()).jpeg({ quality: 80 }).toFile(join(dir, `sheet-${p + 1}.jpg`))
  }
  console.log(`sheets in ${dir}`)
}

if (cmd === 'collect') await collect()
else if (cmd === 'pick') await pick()
else if (cmd === 'sheet') await sheet()
else console.log('usage: node scripts/official-images.mjs collect|pick|sheet [id …]')
