// Resolves a free, openly licensed photo for every car from Wikipedia / Wikimedia Commons (no API key, no cost)
// and caches it in research/images.json. Pages credit the photo and link to its Wikipedia article.
// Usage: npm run images  (then npm run data)
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const cachePath = join(root, 'research/images.json')
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : {}
const cars = JSON.parse(readFileSync(join(root, 'src/data/cars.json'), 'utf8'))
const upcoming = JSON.parse(readFileSync(join(root, 'src/data/upcoming.json'), 'utf8'))
const force = process.argv.includes('--force')

const jobs = [
  ...cars.map((c) => ({ key: c.id, title: c.wiki ?? `${c.brand} ${c.model}`, q: `${c.brand.replace(' Suzuki', '')} ${c.model.replace(/\.ev$/, '')}` })),
  ...upcoming.filter((u) => u.wiki).map((u) => ({ key: `upcoming:${u.id}`, title: u.wiki, q: null })),
]

const UA = { 'User-Agent': 'SahiCar/0.1 (free car advisor; images credited to Wikimedia Commons)' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Wikipedia rate-limits bursts: back off and retry rather than record "no image". */
async function get(url) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: UA })
    if (res.status !== 429) return res
    await sleep(4000 * (i + 1))
  }
  throw new Error('rate limited')
}

/** When the exact title has no article or no lead image, search Wikipedia for the closest car article. */
async function search(q) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srlimit=3&format=json`
  const res = await get(url)
  if (!res.ok) return []
  const j = await res.json()
  return (j.query?.search ?? []).map((r) => r.title)
}

async function resolve(title, fallbackQuery) {
  const direct = await summary(title)
  if (direct || !fallbackQuery) return direct
  const word = fallbackQuery.split(' ').slice(-1)[0].toLowerCase()
  for (const t of await search(fallbackQuery)) {
    if (!t.toLowerCase().includes(word.replace(/\.ev$/, ''))) continue // stay on the right model
    const hit = await summary(t)
    if (hit) return hit
  }
  return null
}

async function summary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}?redirect=true`
  const res = await get(url)
  if (!res.ok) return null
  const j = await res.json()
  const thumb = j.thumbnail?.source ?? j.originalimage?.source
  if (!thumb) return null
  // ask Wikimedia for a 960px rendition of the same file
  const src = thumb.replace(/\/(\d+)px-/, '/960px-')
  return { src, page: j.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}` }
}

let found = 0
for (const job of jobs) {
  if (!force && cache[job.key]) continue
  try {
    cache[job.key] = await resolve(job.title, job.q)
    if (cache[job.key]) found++
  } catch {
    // offline or rate-limited: leave it for the next run
  }
  await sleep(450)
}
writeFileSync(cachePath, JSON.stringify(cache, null, 1))
console.log(`images: ${found} new, ${Object.values(cache).filter(Boolean).length} cached of ${jobs.length}`)
