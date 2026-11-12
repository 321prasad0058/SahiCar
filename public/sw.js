// SahiCar service worker: instant repeat visits and a working app offline.
// - hashed build files (/assets/*), 3D loading posters (/3d/*, hashed names) and car images are cache-first: their URLs change when their content does;
// - pages are network-first with a cached fallback, so a deploy shows up at once but offline still works.
const VERSION = 'sahicar-v5'
const ASSETS = `${VERSION}-assets`
const PAGES = `${VERSION}-pages`
const IMAGES = `${VERSION}-images`

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => c.addAll(['/', '/manifest.webmanifest', '/favicon.png', '/logo.svg'])).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})

async function trim(name, max) {
  const c = await caches.open(name)
  const keys = await c.keys()
  for (const k of keys.slice(0, Math.max(0, keys.length - max))) await c.delete(k)
}

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // app shell pages: network first, cache as fallback
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(PAGES).then((c) => c.put('/', copy))
          return res
        })
        .catch(() => caches.match('/')),
    )
    return
  }

  const sameOrigin = url.origin === location.origin
  const isAsset = sameOrigin && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/cars/') || url.pathname.startsWith('/3d/'))
  const isPhoto = url.hostname === 'upload.wikimedia.org'
  // videos stream in byte ranges, which a cache can't store: let the browser fetch them directly
  if ((!isAsset && !isPhoto) || url.pathname.endsWith('.mp4')) return

  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone()
            const bucket = isAsset ? ASSETS : IMAGES
            caches.open(bucket).then((c) => c.put(req, copy).then(() => trim(bucket, isAsset ? 120 : 200)))
          }
          return res
        }),
    ),
  )
})

// ── alerts (web push, sent by scripts/push-send.mjs): { title, body, url, tag, image }
self.addEventListener('push', (e) => {
  let m = {}
  try { m = e.data ? e.data.json() : {} } catch { m = { body: e.data ? e.data.text() : '' } }
  e.waitUntil(
    self.registration.showNotification(m.title || 'SahiCar', {
      body: m.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: m.tag || undefined,
      image: m.image || undefined, // the car's photo, shown large on Android and computers
      data: { url: m.url || '/' },
    }),
  )
})

// tapping an alert opens its page, reusing an open SahiCar window when there is one
self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const url = new URL(e.notification.data?.url || '/', location.origin).href
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const w = list.find((c) => new URL(c.url).origin === location.origin)
      if (w) return w.navigate(url).then((c) => (c || w).focus())
      return self.clients.openWindow(url)
    }),
  )
})
