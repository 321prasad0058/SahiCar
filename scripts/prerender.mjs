// Pre-render every public page into its own static HTML file, so search engines (and slow phones) get the real page —
// its own title, description, canonical address, structured data and content — without running the app first.
// Runs after `vite build` (see package.json "build"). For each URL in dist/sitemap.xml it opens the built app in
// headless Chrome, waits until the page has drawn, and writes dist/<path>.html (dist/index.html for the home page).
//   dist/shell.html  the plain app shell, served for app-only pages (garage, results, login, …) by firebase.json
//   dist/404.html  the "Wrong turn" page; Firebase serves it with status 404 for any unknown address
// The app takes over each page in the browser as usual (src/main.tsx swaps in without a flash).
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const puppeteer = require('puppeteer-core')
const DIST = new URL('../dist/', import.meta.url).pathname
const PORT = Number(process.env.PRERENDER_PORT || 4179)
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4)

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')
if (shell.includes('data-pre="1"')) throw new Error('dist/index.html is already pre-rendered: run vite build first')
writeFileSync(join(DIST, 'shell.html'), shell)

// a tiny static server over dist/ with the app shell as the fallback, like the live site before this step
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.json': 'application/json', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.mp4': 'video/mp4', '.glb': 'model/gltf-binary' }
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let file = join(DIST, path)
  if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory() || path === '/' || path === '/index.html') file = join(DIST, 'shell.html')
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
  res.end(readFileSync(file))
})
await new Promise((r) => server.listen(PORT, r))

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
const jobs = [...paths.map((p) => [p, p]), ['/__not-found', '/404']]

const chrome = process.env.CHROME_PATH || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium-browser'].find((p) => existsSync(p))
const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })

// the head tags the page sets for itself replace the shell's generic ones
const SEO_TAG = /^\s*(<title>.*<\/title>|<meta (name|property)="(description|og:title|og:description|og:url|og:image|twitter:title|twitter:description|twitter:image|robots)"[^>]*>|<link rel="canonical"[^>]*>)\s*$/
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Each page: wait for its own content to be drawn (not for the network to fall silent, which a slow font or image can
// delay), then give late requests a moment to finish. The 3D scene is switched off (lib/perf canRun3D): it isn't saved,
// and on a build server without a graphics chip it is drawn in software and can stall the home page for minutes.
async function newPage() {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.evaluateOnNewDocument(() => { window.__SC_PRERENDER__ = true })
  return page
}

async function render(page, path) {
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  // polled on a timer: the default re-checks on animation frames, which tabs in the background never get
  await page.waitForFunction(() => !document.querySelector('[data-pre]') && document.querySelector('#root main')?.childElementCount && !document.querySelector('.page-loading'), { timeout: 45000, polling: 250 })
  await page.waitForNetworkIdle({ idleTime: 400, timeout: 10000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 300))
  return page.evaluate(() => {
    const q = (s) => document.head.querySelector(s)
    const root = document.getElementById('root').cloneNode(true)
    root.querySelectorAll('canvas, script, .toast').forEach((el) => el.remove())
    // Headlines mid-animation are split into one hidden box per letter (GSAP SplitText), which a crawler reads as
    // "T h e r i g h t c a r". Save them as the plain words SplitText keeps in aria-label; the app re-splits them live.
    root.querySelectorAll('[aria-label]').forEach((el) => {
      const label = el.getAttribute('aria-label')
      if (!el.querySelector(':scope > [aria-hidden="true"]') || el.textContent.replace(/\s/g, '') !== label.replace(/\s/g, '')) return
      el.textContent = label
      el.removeAttribute('aria-label')
    })
    return {
      title: document.title,
      metas: [...document.head.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]')].map((m) => [m.hasAttribute('name') ? 'name' : 'property', m.getAttribute('name') || m.getAttribute('property'), m.content]),
      canonical: q('link[rel="canonical"]')?.href ?? null,
      ld: q('script#ld')?.textContent ?? null,
      body: root.innerHTML,
    }
  })
}

// the SahiCar road loader, as index.html has it (minus page-loading, which the app reads as "a page is still loading")
const LOADER = (shell.match(/<div id="root">(<div class="page-loading scl".*)<\/div>\s*$/m)?.[1] ?? '').replace('page-loading scl', 'scl')

// The homepage's 3D files start downloading while the page itself loads, not after the app has started. Only where the
// 3D will run (WebGL, Data Saver off), so other phones don't pay for it. The list comes from Vite's build manifest.
const MANIFEST = join(DIST, '.vite', 'manifest.json')
let heroPreload = ''
if (existsSync(MANIFEST)) {
  const m = JSON.parse(readFileSync(MANIFEST, 'utf8'))
  const files = new Set()
  const walk = (key) => { const e = m[key]; if (!e || files.has('/' + e.file)) return; files.add('/' + e.file); (e.imports || []).forEach(walk) }
  walk('src/webgl/HeroWorld.ts')
  const entry = Object.values(m).find((e) => e.isEntry)
  const already = new Set(['/' + entry?.file, ...(entry?.imports || []).map((k) => '/' + m[k]?.file)])
  const list = [...files].filter((f) => !already.has(f))
  // on phones that can't run the 3D (or with Data Saver on) the homepage road loader is hidden straight away
  if (list.length) heroPreload = `<script>(function(){var ok=0;try{var c=navigator.connection;if(!(c&&c.saveData)&&!(/^(localhost|127\\.0\\.0\\.1|192\\.168\\.)/.test(location.hostname)&&/[?&]3d=0/.test(location.search))){var x=document.createElement('canvas');ok=!!(x.getContext('webgl2')||x.getContext('webgl'))}}catch(e){}if(!ok){document.documentElement.classList.add('no-hero3d');return}${JSON.stringify(list)}.forEach(function(h){var l=document.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.fetchPriority='low';l.href=h;document.head.appendChild(l)})})()</script><style>.no-hero3d #hero-loader{display:none}</style>`
  rmSync(join(DIST, '.vite'), { recursive: true, force: true })
  console.log(`prerender: homepage preloads ${list.length} 3D files`)
}

function bake(r, notFound, path = '') {
  const head = [
    `<title>${esc(notFound ? 'Page not found · SahiCar' : r.title)}</title>`,
    ...(notFound ? ['<meta name="description" content="That page doesn’t exist on SahiCar. Find the right car for you, free and unbiased." />'] : r.metas.map(([a, k, v]) => `<meta ${a}="${k}" content="${esc(v)}" />`)),
    ...(notFound ? ['<meta name="robots" content="noindex" />'] : []),
    ...(r.canonical && !notFound ? [`<link rel="canonical" href="${esc(r.canonical)}" />`] : []),
    ...(r.ld && !notFound ? [`<script type="application/ld+json" id="ld">${r.ld.replace(/</g, '\\u003c')}</script>`] : []),
    ...(path === '/' && heroPreload ? [heroPreload] : []),
  ].map((l) => '    ' + l)
  const lines = shell.split('\n').filter((l) => !SEO_TAG.test(l) && !/^\s*<meta (name|property)="(og:title|og:description|og:url|og:image|twitter:image)"/.test(l))
  const at = lines.findIndex((l) => l.includes('name="viewport"')) + 1
  lines.splice(at, 0, ...head)
  const html = lines.join('\n')
  const a = html.indexOf('<div id="root">'), b = html.indexOf('<noscript>')
  if (a < 0 || b < 0) throw new Error('unexpected index.html: no #root / <noscript>')
  // the homepage keeps the road loader up until its 3D cars are moving (main.tsx takes it down)
  const loader = path === '/' && heroPreload && LOADER ? `<div id="hero-loader">${LOADER}</div>\n    ` : ''
  return html.slice(0, a) + loader + `<div id="root" data-pre="1">${r.body}</div>\n    ` + html.slice(b)
}

let done = 0, failed = []
const queue = [...jobs]
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  let page = await newPage()
  while (queue.length) {
    const [path, out] = queue.shift()
    try {
      // one retry in a fresh tab before a page counts as failed (a busy build server can stall a single load)
      const r = await render(page, path).catch(async (e) => {
        console.log(`prerender: retrying ${path} (${e.message.split('\n')[0]})`)
        await page.close().catch(() => {})
        page = await newPage()
        return render(page, path)
      })
      const file = out === '/' ? join(DIST, 'index.html') : join(DIST, out.slice(1) + '.html')
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, bake(r, out === '/404', out))
      if (++done % 25 === 0) console.log(`prerender: ${done}/${jobs.length}`)
    } catch (e) { failed.push(`${path}: ${e.message.split('\n')[0]}`) }
  }
  await page.close()
}))
await browser.close(); server.close()
console.log(`prerender: ${done}/${jobs.length} pages written${failed.length ? `, ${failed.length} failed:\n  ` + failed.join('\n  ') : ''}`)
if (failed.length) process.exit(1)
