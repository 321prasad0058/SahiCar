// Writes public/sitemap.xml (every page and every car) and public/robots.txt for search engines.
// SITE can point it at a custom domain later: SITE=https://sahicar.in npm run build
import { readFileSync, writeFileSync } from 'node:fs'

const SITE = (process.env.SITE ?? 'https://sahicar-in.web.app').replace(/\/$/, '')
const cars = JSON.parse(readFileSync(new URL('../src/data/cars.json', import.meta.url), 'utf8'))
const today = new Date().toISOString().slice(0, 10)

const pages = [
  ['/', '1.0'],
  ['/sahifit', '0.9'],
  ['/explore', '0.8'],
  ['/emi', '0.8'],
  ['/how-we-score', '0.7'],
  ['/upcoming', '0.7'],
  ['/compare', '0.5'],
  ['/about', '0.5'],
  ...cars.map((c) => [`/car/${c.id}`, '0.8']),
]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, pr]) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(
  new URL('../public/robots.txt', import.meta.url),
  `User-agent: *\nAllow: /\nDisallow: /garage\nDisallow: /login\nDisallow: /results\nDisallow: /dev/\n\nSitemap: ${SITE}/sitemap.xml\n`,
)
console.log(`sitemap: ${pages.length} urls → public/sitemap.xml, robots.txt`)
