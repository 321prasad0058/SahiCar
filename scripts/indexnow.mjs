// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing also feeds ChatGPT search, Copilot and DuckDuckGo)
// about every page in the sitemap, right after a deploy. Google does not use IndexNow (it reads the sitemap instead).
// The key file public/<key>.txt proves we own the site; it must be live before this runs.
//   node scripts/indexnow.mjs            submit every URL in public/sitemap.xml
import { readFileSync, readdirSync } from 'node:fs'

const SITE = (process.env.SITE ?? 'https://sahicar-in.web.app').replace(/\/$/, '')
const host = new URL(SITE).host
const keyFile = readdirSync(new URL('../public/', import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
if (!keyFile) throw new Error('no IndexNow key file in public/')
const key = keyFile.slice(0, -4)
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${SITE}/${keyFile}`, urlList }),
})
// 200 OK and 202 Accepted both mean the list was taken; 403 means the key file isn't live yet
console.log(`IndexNow: ${urlList.length} URLs → ${res.status} ${res.statusText}`)
if (![200, 202].includes(res.status)) process.exitCode = 1
