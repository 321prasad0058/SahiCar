// Studio renders made in Gemini (Nano Banana), for cars with no free photo of the current model.
// Each approved render goes in research/ai-renders/<car-id>.(webp|png|jpg); this crops it to the card's 16:10,
// writes public/cars/ai/<car-id>.webp and records it in research/images.json marked ai, so the Wikipedia photo
// script leaves it alone. Only the renders live in the repo; reference photos never do.
// Usage: npm run ai-renders  (then npm run data)
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'research/ai-renders')
const out = join(root, 'public/cars/ai')
const cachePath = join(root, 'research/images.json')
const cache = JSON.parse(readFileSync(cachePath, 'utf8'))
const cars = new Set(JSON.parse(readFileSync(join(root, 'src/data/cars.json'), 'utf8')).map((c) => c.id))
const upcoming = new Set(JSON.parse(readFileSync(join(root, 'src/data/upcoming.json'), 'utf8')).map((u) => u.id))
mkdirSync(out, { recursive: true })

let n = 0
for (const f of existsSync(src) ? readdirSync(src) : []) {
  if (!/\.(webp|png|jpe?g)$/i.test(f)) continue
  const id = parse(f).name
  const key = cars.has(id) ? id : upcoming.has(id) ? `upcoming:${id}` : null
  if (!key) {
    console.warn(`ai-renders: ${f} matches no car or upcoming id, skipped`)
    continue
  }
  // the car sits in the middle of a 16:9 studio frame: trim the sides to 16:10, no upscaling
  const img = sharp(join(src, f))
  const { width, height } = await img.metadata()
  const w = Math.min(width, Math.round((height * 16) / 10))
  const h = Math.round((w * 10) / 16)
  await img
    .extract({ left: Math.round((width - w) / 2), top: Math.round((height - h) / 2), width: w, height: h })
    .resize({ width: Math.min(w, 1280), withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(join(out, `${id}.webp`))
  cache[key] = { src: `/cars/ai/${id}.webp`, page: '', ai: true }
  n++
}
writeFileSync(cachePath, JSON.stringify(cache, null, 1))
console.log(`ai-renders: ${n} written to public/cars/ai`)
