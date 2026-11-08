// Weekly inventory update, run by .github/workflows/weekly-update.yml (or by hand: GEMINI_API_KEY=… npm run weekly).
//
// Asks Gemini, with Google Search, three questions about the Indian car market and applies only what comes back with a
// source link:
//   1. Which tracked upcoming cars have now launched? Launched ones leave research/upcoming.json; if the car isn't in
//      the car list yet, Gemini drafts its entry (unknown specs stay null, never guessed).
//   2. Which new launches were announced or confirmed this week? They join research/upcoming.json.
//   3. Are this week's slice of car prices still right? (A different ~15 cars each week, so every car is checked
//      about every two months.)
// Everything it changed, with sources, goes to weekly-summary.md, which becomes the pull request description.
// Nothing reaches the live site until a person reads that pull request and merges it.
//
// Flags: --dry-run  ask Gemini and print the summary, but write nothing
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const R = (p) => join(root, p)
const DRY = process.argv.includes('--dry-run')
const KEY = process.env.GEMINI_API_KEY?.trim() // a pasted secret often carries a newline or a space
if (!KEY) {
  console.error('weekly-update: GEMINI_API_KEY is not set')
  process.exit(1)
}
// the first model that answers wins. On the free plan only gemini-2.5-flash may use Google Search (the newer ones
// answer, but refuse search with a quota error), so it goes first; the others are there in case that changes.
const MODELS = (process.env.GEMINI_MODEL ?? 'gemini-2.5-flash,gemini-3.8-flash,gemini-3.5-flash,gemini-flash-latest').split(',')
const today = new Date().toISOString().slice(0, 10)
const month = today.slice(0, 7)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const lakh = (v) => (v == null ? '—' : `₹${(v / 100000).toFixed(2)} L`)

// ── data, written back with each file's own indentation so diffs stay small

function load(path) {
  const text = readFileSync(R(path), 'utf8')
  // one level of indentation = how far the first entry of the top-level list is indented
  const indent = /^\[\r?\n( +)\{/.exec(text)?.[1].length ?? 2
  return { path, text, indent, eol: text.endsWith('\n') ? '\n' : '', data: JSON.parse(text) }
}
const save = (f) => !DRY && writeFileSync(R(f.path), JSON.stringify(f.data, null, f.indent) + f.eol)

const carsA = load('research/cars-a.json')
const carsB = load('research/cars-b.json')
const allCars = () => [...carsA.data, ...carsB.data]
const carId = (c) => c.id ?? slug(`${c.brand}-${c.model}`)
const upPath = 'research/upcoming.json'
let upText = readFileSync(R(upPath), 'utf8')
const upcoming = JSON.parse(upText)
const upId = (u) => slug(u.id ?? `${u.brand}-${u.model}`)

/** research/upcoming.json is laid out by hand: remove and add entries as text so the rest of the file is untouched. */
function upcomingSpans(src) {
  const spans = []
  let depth = 0, start = 0, inStr = false, esc = false
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (inStr) {
      if (esc) esc = false
      else if (ch === '\\') esc = true
      else if (ch === '"') inStr = false
    } else if (ch === '"') inStr = true
    else if (ch === '{' && ++depth === 1) start = i
    else if (ch === '}' && --depth === 0) spans.push(src.slice(start, i + 1))
  }
  return spans
}
function writeUpcoming(removeIds, add) {
  const keep = upcomingSpans(upText).filter((s) => !removeIds.has(upId(JSON.parse(s))))
  const added = add.map((u) => JSON.stringify(u, null, 2).replace(/\n/g, '\n  '))
  upText = `[\n  ${[...keep, ...added].join(',\n  ')}\n]\n`
  JSON.parse(upText) // never write a broken file
  if (!DRY) writeFileSync(R(upPath), upText)
}

// ── Gemini with Google Search; answers must be JSON inside a ```json block

async function ask(prompt) {
  let lastErr
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      console.error(`  asking ${model}${attempt ? ` (retry ${attempt})` : ''}…`)
      let res
      try {
        res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            tools: [{ google_search: {} }],
            generationConfig: { temperature: 0.1 },
          }),
          signal: AbortSignal.timeout(120000), // a search-backed answer takes seconds; never wait forever
        })
      } catch (e) {
        lastErr = `${model}: ${e.name === 'TimeoutError' ? 'timed out' : e.message}`
        continue
      }
      console.error(`  ${model}: HTTP ${res.status}`)
      if (res.status === 404) break // this model isn't available to the key: try the next
      if (res.status === 429 || res.status >= 500) {
        const body = await res.text()
        lastErr = `${model}: HTTP ${res.status}`
        // "exceeded your current quota" is a plan limit, not a busy minute: waiting won't help, try the next model
        if (res.status === 429 && /current quota|limit: 0/i.test(body)) break
        await sleep(20000 * (attempt + 1)) // busy or rate-limited for a minute: back off and retry
        continue
      }
      const j = await res.json()
      if (j.error) throw new Error(`${model}: ${j.error.message}`)
      const text = (j.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? '').join('')
      const block = /```json\s*([\s\S]*?)```/.exec(text)?.[1] ?? text
      try {
        return await realUrls(JSON.parse(block.trim()))
      } catch {
        lastErr = `${model}: answer was not JSON`
        break
      }
    }
  }
  throw new Error(`Gemini unavailable (${lastErr ?? 'no model answered'})`)
}

/** Search answers cite Google redirect links that hide the site and expire; follow each one to the real page. */
async function realUrls(v) {
  if (typeof v === 'string' && /^https:\/\/vertexaisearch\.cloud\.google\.com\//.test(v)) {
    try {
      const r = await fetch(v, { redirect: 'manual', signal: AbortSignal.timeout(15000) })
      return r.headers.get('location') ?? v
    } catch {
      return v
    }
  }
  if (Array.isArray(v)) return Promise.all(v.map(realUrls))
  if (v && typeof v === 'object') return Object.fromEntries(await Promise.all(Object.entries(v).map(async ([k, x]) => [k, await realUrls(x)])))
  return v
}

const RULES = `Today is ${today}. Use Google Search. Only report facts you found on a reliable Indian automotive source (manufacturer site or press release, Autocar India, CarDekho, CarWale, ZigWheels, Rushlane, Team-BHP, Overdrive, Evo India) and give that page's URL. Prices are ex-showroom in rupees as plain integers (₹11.49 lakh = 1149000). If you are not sure, leave the item out. Reply with ONLY a JSON code block.`
const isUrl = (s) => typeof s === 'string' && /^https?:\/\/\S+\.\S+/.test(s) && !s.includes('vertexaisearch.cloud.google.com')

// ── the run

const summary = { launched: [], newCars: [], announced: [], prices: [], review: [] }

// 1. launches: upcoming cars due by now or within a month
const monthIndex = (y, m) => Number(y) * 12 + Number(m)
const now = monthIndex(month.slice(0, 4), month.slice(5, 7))
const due = upcoming.filter((u) => {
  const e = String(u.expected ?? '')
  if (u.status === 'launched-recently') return true
  const m = /^(\d{4})-(\d{2})/.exec(e)
  if (m) return monthIndex(m[1], m[2]) <= now + 1 // overdue, this month or next
  const q = /^(\d{4})-(Q[1-4]|H[12])/.exec(e) // "2026-Q4", "2027-H1": check once the period has started
  if (!q) return false
  const first = { Q1: 1, Q2: 4, Q3: 7, Q4: 10, H1: 1, H2: 7 }[q[2]]
  return monthIndex(q[1], first) <= now
})
const removeIds = new Set()
if (due.length) {
  const list = due.map((u) => `${upId(u)}: ${u.brand} ${u.model} (expected ${u.expected})`).join('\n')
  const ans = await ask(`${RULES}
For each car below, has it been LAUNCHED in India (prices announced, on sale or bookings with prices)? Unveilings without prices don't count.
${list}
Answer: \`\`\`json
[{"id": "<id from the list>", "launched": true|false, "date": "YYYY-MM-DD", "priceMin": 0, "priceMax": 0, "source": "<url>"}]
\`\`\``).catch((e) => (summary.review.push(`Launch check failed: ${e.message}`), []))

  for (const a of Array.isArray(ans) ? ans : []) {
    const u = due.find((x) => upId(x) === a.id)
    if (!u || !a.launched || !isUrl(a.source)) continue
    removeIds.add(a.id)
    const existing = allCars().find((c) => carId(c) === a.id)
    if (existing) {
      existing.lastUpdate = (a.date ?? today).slice(0, 7)
      summary.launched.push({ name: `${u.brand} ${u.model}`, date: a.date, price: [a.priceMin, a.priceMax], source: a.source, note: 'already in the car list; removed from upcoming' })
      continue
    }
    // a brand-new car: Gemini drafts the entry in our schema; unknowns stay null
    await sleep(6000)
    const example = carsB.data.find((c) => carId(c) === 'kia-ev9') ?? carsB.data[0]
    const entry = await ask(`${RULES}
Write the Indian-market car entry for the ${u.brand} ${u.model}, launched ${a.date}, using EXACTLY this JSON shape (same keys; use null for anything you could not confirm, never guess; prices in rupees; dims in mm; efficiency in kmpl, or km of claimed range for EVs; fuel is one of petrol, diesel, cng, strong-hybrid, mild-hybrid, ev; body is one of hatchback, sedan, suv, compact-suv, mpv, coupe, pickup). Put every page you used in "sources".
Example of the shape: ${JSON.stringify(example)}
Answer: \`\`\`json { ...the entry... } \`\`\``).catch((e) => (summary.review.push(`Couldn't draft ${u.brand} ${u.model}: ${e.message}`), null))
    const ok = entry && entry.brand && entry.model && entry.body && entry.price?.min > 0 && entry.powertrains?.length && entry.variants?.length && entry.sources?.some(isUrl)
    if (!ok) {
      summary.review.push(`${u.brand} ${u.model} launched (${a.source}) but its car entry needs to be written by hand; it was left in upcoming.`)
      removeIds.delete(a.id)
      continue
    }
    entry.id = a.id
    entry.launched = (a.date ?? today).slice(0, 7)
    entry.verifiedOn = month
    entry.wiki = entry.wiki ?? u.wiki ?? null
    carsB.data.push(entry)
    summary.newCars.push({ name: `${u.brand} ${u.model}`, date: a.date, price: [entry.price.min, entry.price.max], sources: entry.sources.filter(isUrl) })
  }
}

// 2. new announcements not tracked yet
await sleep(6000)
const known = [...upcoming.map(upId), ...allCars().map(carId)].join(', ')
const news = await ask(`${RULES}
Which NEW cars were officially announced, confirmed or revealed for an Indian launch in the last 7 days? Leave out anything whose id is already in this list: ${known}
Answer: \`\`\`json
[{"id": "brand-model", "brand": "", "model": "", "body": "suv", "expected": "YYYY-MM", "price": {"min": 0, "max": null}, "fuels": ["petrol"], "status": "confirmed|testing|rumoured", "rivals": ["<ids from the list above>"], "waitAdvice": "one sentence for a buyer", "notes": "what was announced, with dates", "sources": ["<url>"]}]
\`\`\``).catch((e) => (summary.review.push(`New-launch check failed: ${e.message}`), []))
const knownIds = new Set(known.split(', '))
const brandKey = (b) => slug(b).split('-')[0] // "JSW Motors" and "JSW" are the same maker
const GENERIC = new Set(['ev', 'suv', 'new', 'facelift', 'next', 'gen', 'electric', 'hybrid', 'phev', 'based', 'the', 'and', 'india', 'model', 'seater'])
const words = (m) => slug(m).split('-').filter((w) => w.length >= 2 && !GENERIC.has(w))
const tracked = [...upcoming, ...allCars()].map((x) => ({ brand: brandKey(x.brand), words: new Set(words(x.model)) }))
const isTracked = (n) => tracked.some((t) => t.brand === brandKey(n.brand) && words(n.model).some((w) => t.words.has(w)))
const add = []
for (const n of Array.isArray(news) ? news : []) {
  if (!n.brand || !n.model || !n.sources?.some(isUrl)) continue
  const id = slug(n.id || `${n.brand}-${n.model}`)
  if (knownIds.has(id) || add.some((x) => x.id === id) || isTracked(n)) continue
  const entry = { id, brand: n.brand, model: n.model, body: n.body ?? 'suv', expected: n.expected ?? null, price: n.price?.min ? n.price : null, fuels: n.fuels ?? [], status: ['confirmed', 'testing', 'rumoured'].includes(n.status) ? n.status : 'rumoured', rivals: (n.rivals ?? []).filter((r) => knownIds.has(r)), waitAdvice: n.waitAdvice ?? '', notes: n.notes ?? '', sources: n.sources.filter(isUrl) }
  add.push(entry)
  summary.announced.push({ name: `${n.brand} ${n.model}`, expected: entry.expected, status: entry.status, sources: entry.sources })
}

// 3. prices: this week's slice of the car list
await sleep(6000)
const cars = allCars()
const week = Math.floor(Date.now() / (7 * 864e5))
const per = 15
const start = (week * per) % cars.length
const slice = [...cars, ...cars].slice(start, start + per)
const priced = await ask(`${RULES}
What is the current ex-showroom price range (lowest and highest variant) in India of each car below?
${slice.map((c) => `${carId(c)}: ${c.brand} ${c.model} (we have ${c.price.min}–${c.price.max})`).join('\n')}
Answer: \`\`\`json
[{"id": "<id>", "min": 0, "max": 0, "source": "<url>"}]
\`\`\``).catch((e) => (summary.review.push(`Price check failed: ${e.message}`), []))
for (const p of Array.isArray(priced) ? priced : []) {
  const c = slice.find((x) => carId(x) === p.id)
  if (!c || !isUrl(p.source) || !(p.min > 0) || !(p.max >= p.min)) continue
  const off = Math.abs(p.min - c.price.min) / c.price.min > 0.01 || Math.abs(p.max - c.price.max) / c.price.max > 0.01
  if (!off) continue
  // a swing over 25% is more likely a wrong page than a price change: flag it, don't apply it
  if (Math.abs(p.min - c.price.min) / c.price.min > 0.25 || Math.abs(p.max - c.price.max) / c.price.max > 0.25) {
    summary.review.push(`${c.brand} ${c.model}: Gemini says ${lakh(p.min)}–${lakh(p.max)}, we have ${lakh(c.price.min)}–${lakh(c.price.max)}. Not applied; check ${p.source}`)
    continue
  }
  summary.prices.push({ name: `${c.brand} ${c.model}`, from: [c.price.min, c.price.max], to: [p.min, p.max], source: p.source })
  c.price = { min: p.min, max: p.max }
  c.verifiedOn = month
  c.sources = [...new Set([...(c.sources ?? []), p.source])]
}

// ── write and summarise

const changed = summary.launched.length + summary.newCars.length + summary.announced.length + summary.prices.length
if (changed) {
  save(carsA)
  save(carsB)
  if (removeIds.size || add.length) writeUpcoming(removeIds, add)
}

const md = [`## Weekly inventory update · ${today}`, '', 'Researched by Gemini with Google Search. **Check each source before merging** — merging deploys the site.', '']
const src = (u) => `[source](${u})`
if (summary.launched.length || summary.newCars.length) {
  md.push('### Launched (moved out of Upcoming)')
  for (const l of summary.launched) md.push(`- **${l.name}** — ${l.date ?? ''} ${l.price[0] ? `from ${lakh(l.price[0])}` : ''} · ${l.note} · ${src(l.source)}`)
  for (const n of summary.newCars) md.push(`- **${n.name}** — NEW car page, from ${lakh(n.price[0])} · ${n.sources.map(src).join(' ')} · ⚠️ check every spec; it needs a photo (render pack)`)
  md.push('')
}
if (summary.announced.length) {
  md.push('### Newly announced (added to Upcoming)')
  for (const a of summary.announced) md.push(`- **${a.name}** — expected ${a.expected ?? '?'}, ${a.status} · ${a.sources.map(src).join(' ')}`)
  md.push('')
}
if (summary.prices.length) {
  md.push('### Price changes')
  for (const p of summary.prices) md.push(`- **${p.name}**: ${lakh(p.from[0])}–${lakh(p.from[1])} → **${lakh(p.to[0])}–${lakh(p.to[1])}** · ${src(p.source)} (variant prices not updated: check them)`)
  md.push('')
}
if (summary.review.length) {
  md.push('### Needs a person')
  for (const r of summary.review) md.push(`- ${r}`)
  md.push('')
}
if (!changed) md.push('No changes this week.')
md.push('', `Prices checked this week: ${slice.map((c) => c.model).join(', ')}.`)
writeFileSync(R('weekly-summary.md'), md.join('\n') + '\n')
console.log(md.join('\n'))
console.log(`\nweekly-update: ${changed} change(s)${DRY ? ' (dry run, nothing written)' : ''}`)
