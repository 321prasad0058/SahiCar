// Turns the research files into the app's data: validates and normalises every car, drops what can't be
// trusted, and writes src/data/*.json. Run with `npm run data` (the build runs it too).
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const research = join(root, 'research')
const out = join(root, 'src/data')
const read = (p) => JSON.parse(readFileSync(p, 'utf8'))
const warn = []

const BODIES = ['hatchback', 'sedan', 'compact-suv', 'suv', 'mpv', 'pickup', 'coupe']
const FUELS = ['petrol', 'diesel', 'cng', 'mild-hybrid', 'strong-hybrid', 'ev']
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : typeof v === 'string' && v.trim() && !Number.isNaN(Number(v)) ? Number(v) : null)
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function fuelOf(f) {
  const s = String(f ?? '').toLowerCase()
  if (FUELS.includes(s)) return s
  if (s.includes('electric') || s === 'bev') return 'ev'
  if (s.includes('strong') || s.includes('phev') || s.includes('plug')) return 'strong-hybrid'
  if (s.includes('mild')) return 'mild-hybrid'
  if (s.includes('cng')) return 'cng'
  if (s.includes('diesel')) return 'diesel'
  if (s.includes('hybrid')) return 'strong-hybrid'
  return 'petrol'
}

function bodyOf(b, length) {
  const s = String(b ?? '').toLowerCase()
  if (BODIES.includes(s)) return s
  if (s.includes('hatch')) return 'hatchback'
  if (s.includes('sedan')) return 'sedan'
  if (s.includes('mpv') || s.includes('muv')) return 'mpv'
  if (s.includes('pick')) return 'pickup'
  if (s.includes('coupe') || s.includes('roadster') || s.includes('convertible')) return 'coupe'
  if (s.includes('suv') || s.includes('crossover')) return length && length <= 4000 ? 'compact-suv' : 'suv'
  return 'suv'
}

// one name per maker, whatever the research wrote
const BRANDS = { 'tata motors': 'Tata', 'tata.ev': 'Tata', tata: 'Tata', 'jsw mg': 'MG', 'mg motor': 'MG', 'jsw mg motor': 'MG', maruti: 'Maruti Suzuki', 'mercedes': 'Mercedes-Benz' }
const brandOf = (b) => BRANDS[String(b).toLowerCase().trim()] ?? String(b).trim()

function car(c) {
  const dims = c.dims ?? {}
  const length = num(dims.length)
  const powertrains = (c.powertrains ?? []).map((p) => ({
    fuel: fuelOf(p.fuel),
    engine: p.engine ?? null,
    cc: num(p.cc),
    powerPs: num(p.powerPs),
    torqueNm: num(p.torqueNm),
    transmissions: (Array.isArray(p.transmissions) ? p.transmissions : [p.transmissions]).filter(Boolean).map(String),
    efficiency: num(p.efficiency),
    batteryKwh: num(p.batteryKwh),
    priceFrom: num(p.priceFrom),
  }))
  const variants = (c.variants ?? [])
    .map((v) => ({ name: String(v.name ?? ''), fuel: fuelOf(v.fuel ?? powertrains[0]?.fuel), transmission: String(v.transmission ?? 'MT'), price: num(v.price) }))
    .filter((v) => v.name && v.price && v.price > 100000)
  const prices = variants.map((v) => v.price)
  const min = num(c.price?.min) ?? (prices.length ? Math.min(...prices) : null)
  const max = num(c.price?.max) ?? (prices.length ? Math.max(...prices) : min)
  const sf = c.safety ?? {}
  const agency = String(sf.agency ?? 'none')
  const stars = (v) => { const n = num(v); return n != null && n >= 0 && n <= 5 ? n : null }
  return {
    id: slug(c.id ?? `${c.brand}-${c.model}`),
    brand: brandOf(c.brand),
    model: String(c.model),
    body: bodyOf(c.body, length),
    segment: String(c.segment ?? 'B'),
    launched: c.launched ?? null,
    lastUpdate: c.lastUpdate ?? null,
    price: { min, max: Math.max(min ?? 0, max ?? 0) },
    seats: (Array.isArray(c.seats) ? c.seats : [c.seats ?? 5]).map(num).filter(Boolean),
    dims: {
      length, width: num(dims.width), height: num(dims.height), wheelbase: num(dims.wheelbase),
      groundClearance: num(dims.groundClearance), boot: num(dims.boot), kerbWeight: num(dims.kerbWeight),
      fuelTank: num(dims.fuelTank), turningRadius: num(dims.turningRadius),
    },
    safety: {
      agency: ['BNCAP', 'GNCAP', 'ANCAP', 'EuroNCAP'].includes(agency) ? agency : agency.toLowerCase().includes('bharat') ? 'BNCAP' : agency.toLowerCase().includes('global') ? 'GNCAP' : agency.toLowerCase().includes('euro') ? 'EuroNCAP' : 'none',
      adult: stars(sf.adult), child: stars(sf.child), year: num(sf.year),
      airbagsStd: num(sf.airbagsStd), airbagsMax: num(sf.airbagsMax) ?? num(sf.airbagsStd),
      esc: typeof sf.esc === 'boolean' ? sf.esc : null,
      adas: ['L1', 'L2'].includes(sf.adas) ? sf.adas : 'none',
    },
    powertrains,
    variants,
    features: (c.features ?? []).map((f) => slug(f)),
    highlights: (c.highlights ?? []).slice(0, 6),
    weaknesses: (c.weaknesses ?? []).slice(0, 6),
    serviceCost: num(c.serviceCost) ?? 3,
    resale: num(c.resale) ?? 3,
    network: num(c.network) ?? 3,
    wiki: c.wiki ?? null,
    oemUrl: c.oemUrl ?? null,
    sources: (c.sources ?? []).slice(0, 6),
    verifiedOn: c.verifiedOn ?? '2026-10',
  }
}

// ── cars
const files = existsSync(research) ? readdirSync(research).filter((f) => /^cars-.*\.json$/.test(f)).sort() : []
const seen = new Map()
for (const f of files) {
  let list
  try { list = read(join(research, f)) } catch (e) { warn.push(`${f}: invalid JSON (${e.message})`); continue }
  for (const raw of list) {
    try {
      const c = car(raw)
      if (!c.price.min || !c.powertrains.length) { warn.push(`${c.id}: no price or powertrain, dropped`); continue }
      if (!c.seats.length) c.seats = [5]
      if (c.safety.adult == null) c.safety.agency = 'none'
      if (seen.has(c.id)) warn.push(`${c.id}: duplicate, kept the later one`)
      seen.set(c.id, c)
    } catch (e) {
      warn.push(`${raw?.id ?? '?'}: ${e.message}`)
    }
  }
}

// free images resolved by scripts/fetch-images.mjs
const imgPath = join(research, 'images.json')
const images = existsSync(imgPath) ? read(imgPath) : {}
// `false` marks a photo we know is the wrong generation: show the body outline, and skip the live Wikipedia lookup
for (const c of seen.values()) {
  c.image = images[c.id] || null
  if (images[c.id] === false) c.wiki = null
}

// paint colours offered in India, named as the maker names them; a car with no verified list gets none
const colPath = join(research, 'colours.json')
const colours = existsSync(colPath) ? read(colPath) : {}
for (const c of seen.values()) {
  const list = colours[c.id]?.colours ?? []
  c.colours = list.map(({ name, hex, roof }) => (roof ? { name, hex, roof } : { name, hex }))
}

// official manufacturer images, self-hosted by scripts/official-images.mjs (preferred when present)
const offPath = join(research, 'official-images.json')
const official = existsSync(offPath) ? read(offPath) : {}
for (const c of seen.values()) {
  const o = official[c.id]
  c.official = o && existsSync(join(root, 'public', o.src)) ? { src: o.src, sm: o.sm, transparent: !!o.transparent, page: o.page, brand: o.brand ?? c.brand } : null
}

const cars = [...seen.values()].sort((a, b) => a.brand.localeCompare(b.brand) || a.price.min - b.price.min)
writeFileSync(join(out, 'cars.json'), JSON.stringify(cars))

// ── upcoming, timing events, on-road
const copy = (name, fallback) => {
  const p = join(research, name)
  let v = fallback
  if (existsSync(p)) try { v = read(p) } catch (e) { warn.push(`${name}: invalid JSON (${e.message})`) }
  return v
}
const upcoming = copy('upcoming.json', []).map((u) => ({
  ...u,
  brand: brandOf(u.brand),
  id: slug(u.id ?? `${u.brand}-${u.model}`),
  body: bodyOf(u.body),
  fuels: (u.fuels ?? []).map(fuelOf),
  rivals: (u.rivals ?? []).map(slug),
  price: u.price?.min ? { min: u.price.min, max: u.price.max ?? u.price.min } : null,
  image: images[`upcoming:${slug(u.id ?? `${u.brand}-${u.model}`)}`] || null,
  ...(images[`upcoming:${slug(u.id ?? `${u.brand}-${u.model}`)}`] === false ? { wiki: null } : {}),
}))
writeFileSync(join(out, 'upcoming.json'), JSON.stringify(upcoming))
writeFileSync(join(out, 'timing.json'), JSON.stringify(copy('timing-events.json', [])))
const onroad = copy('onroad.json', null) ?? read(join(root, 'scripts/defaults/onroad.json'))
writeFileSync(join(out, 'onroad.json'), JSON.stringify({ states: onroad.states, tcsPctAbove10L: onroad.tcsPctAbove10L, fastag: onroad.fastag, insurancePct: onroad.insurancePct, sources: onroad.sources ?? [] }))

// a small summary for the landing page, so it never downloads the whole car database
const STYLES = { hatchback: ['hatchback'], sedan: ['sedan'], suv: ['suv', 'compact-suv'], mpv: ['mpv'] }
const pct = (arr, q) => arr[Math.min(arr.length - 1, Math.floor(arr.length * q))]
const styleFacts = (pick) => {
  const list = cars.filter(pick)
  const prices = list.map((c) => c.price.min).sort((a, b) => a - b)
  return {
    models: list.length,
    priceLow: pct(prices, 0.1),
    priceHigh: pct(prices, 0.9),
    fiveStar: Math.round((100 * list.filter((c) => (c.safety.adult ?? 0) >= 5).length) / Math.max(1, list.length)),
  }
}
const nowM = (() => { const d = new Date(); return d.getFullYear() * 12 + d.getMonth() })()
const monthsTo = (e) => {
  const m = String(e).match(/^(\d{4})(?:-(\d{2})|-Q([1-4])|-H([12]))?/)
  if (!m) return 99
  const month = m[2] ? Number(m[2]) : m[3] ? Number(m[3]) * 3 - 1 : m[4] ? (m[4] === '1' ? 4 : 10) : 7
  return Number(m[1]) * 12 + month - 1 - nowM
}
const summary = {
  cars: cars.length,
  variants: cars.reduce((n, c) => n + Math.max(c.variants.length, c.powertrains.length), 0),
  brands: new Set(cars.map((c) => c.brand)).size,
  upcoming: upcoming.filter((u) => u.status !== 'launched-recently').length,
  soon: upcoming
    .filter((u) => (u.status === 'confirmed' || u.status === 'testing') && monthsTo(u.expected) >= 0)
    .sort((a, b) => monthsTo(a.expected) - monthsTo(b.expected))
    .slice(0, 6)
    .map((u) => ({ id: u.id, brand: u.brand, model: u.model, expected: u.expected, status: u.status, price: u.price })),
  // the landing page shows body styles, never named cars: facts are across every model of that style
  styles: {
    ...Object.fromEntries(Object.entries(STYLES).map(([k, bodies]) => [k, styleFacts((c) => bodies.includes(c.body))])),
    ev: styleFacts((c) => c.powertrains.some((p) => p.fuel === 'ev')),
  },
}
writeFileSync(join(out, 'summary.json'), JSON.stringify(summary))

const by = (k) => Object.entries(cars.reduce((m, c) => ((m[c[k]] = (m[c[k]] ?? 0) + 1), m), {})).map(([x, n]) => `${x} ${n}`).join(', ')
console.log(`cars: ${cars.length} (${by('brand')})`)
console.log(`bodies: ${by('body')}`)
console.log(`upcoming: ${upcoming.length}, images: ${cars.filter((c) => c.image).length}/${cars.length}, official: ${cars.filter((c) => c.official).length}`)
if (warn.length) console.log(`warnings (${warn.length}):\n  ${warn.slice(0, 30).join('\n  ')}`)
