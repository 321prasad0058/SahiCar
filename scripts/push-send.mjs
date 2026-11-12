// Send SahiCar alerts by web push to everyone who turned them on (Firestore /push, written by src/lib/push.ts).
//
//   node scripts/push-send.mjs --changes <git-rev>   compare the live data with <git-rev> and tell people what changed:
//                                                    a price change on a car they saved comes first, then new launches,
//                                                    then a short "this week" summary. One alert per person per run.
//   node scripts/push-send.mjs --test "Title" "Body" [/url]   one message to everyone (or --only <subscription id>)
//   add --dry to print what would be sent without sending anything.
//
// Credentials, never committed: VAPID_PRIVATE_KEY (+ VAPID_PUBLIC_KEY) from the environment or the local .push-keys
// file; Firestore admin access from FIREBASE_ADMIN_SA (service-account JSON) or GOOGLE_APPLICATION_CREDENTIALS.
// Subscriptions the push service reports as gone (404/410) are deleted.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { createRequire } from 'node:module'

const webpush = createRequire(import.meta.url)('web-push')

const args = process.argv.slice(2)
const flag = (f) => args.includes(f)
const opt = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined)
const dry = flag('--dry')

// ── keys
const local = existsSync('.push-keys') ? JSON.parse(readFileSync('.push-keys', 'utf8')) : {}
const vapidPublic = process.env.VAPID_PUBLIC_KEY || local.publicKey || (readFileSync('.env.production', 'utf8').match(/VITE_VAPID_PUBLIC_KEY=(\S+)/) || [])[1]
const vapidPrivate = process.env.VAPID_PRIVATE_KEY || local.privateKey
if (!vapidPublic || !vapidPrivate) {
  console.log('push-send: no VAPID keys, nothing sent')
  process.exit(0)
}
webpush.setVapidDetails('https://sahicar-in.web.app', vapidPublic, vapidPrivate)
const sa = process.env.FIREBASE_ADMIN_SA
// --dry without credentials: one pretend subscriber (saved cars from --cars a,b), to check the messages
const emulator = process.env.FIRESTORE_EMULATOR_HOST // local testing: npx firebase emulators:start --only firestore
const simulate = dry && !sa && !process.env.GOOGLE_APPLICATION_CREDENTIALS && !emulator
if (!simulate && !sa && !process.env.GOOGLE_APPLICATION_CREDENTIALS && !emulator) {
  console.log('push-send: no Firestore admin credentials (FIREBASE_ADMIN_SA), nothing sent')
  process.exit(0)
}
const fs = simulate ? null : (initializeApp(sa ? { credential: cert(JSON.parse(sa)) } : { projectId: process.env.GCLOUD_PROJECT || 'sahicar-in' }), getFirestore())

// ── what to say
const lakh = (n) => `₹${(n / 1e5).toFixed(n >= 1e7 ? 0 : 2).replace(/\.?0+$/, '')} L`
const read = (rev, path) => {
  try { return JSON.parse(execFileSync('git', ['show', `${rev}:${path}`], { encoding: 'utf8', maxBuffer: 64e6 })) } catch { return [] }
}
function changes(rev) {
  const now = JSON.parse(readFileSync('src/data/cars.json', 'utf8'))
  const before = new Map(read(rev, 'src/data/cars.json').map((c) => [c.id, c]))
  const prices = [], launches = []
  for (const c of now) {
    const b = before.get(c.id)
    if (!b) { launches.push(c); continue }
    if (b.price?.min && c.price?.min && b.price.min !== c.price.min) prices.push({ car: c, from: b.price.min, to: c.price.min })
  }
  return { prices, launches }
}
function messageFor(sub, ch) {
  const mine = ch.prices.filter((p) => sub.cars?.includes(p.car.id))
  if (mine.length) {
    const p = mine[0]
    const down = p.to < p.from
    return {
      title: `${p.car.brand} ${p.car.model}: price ${down ? 'down' : 'up'}`,
      body: `Now from ${lakh(p.to)} (was ${lakh(p.from)})${mine.length > 1 ? ` · ${mine.length - 1} more of your saved cars changed too` : ''}`,
      url: `/car/${p.car.id}?utm_source=push&utm_medium=alert&utm_campaign=price`,
      tag: 'price',
    }
  }
  if (ch.launches.length) {
    const names = ch.launches.slice(0, 2).map((c) => `${c.brand} ${c.model}`).join(' and ')
    return {
      title: ch.launches.length === 1 ? `Just launched: ${names}` : `${ch.launches.length} new cars this week`,
      body: ch.launches.length === 1 ? 'Prices, variants and our honest take are up on SahiCar.' : `${names}${ch.launches.length > 2 ? ' and more' : ''}: prices and our take are up.`,
      url: ch.launches.length === 1 ? `/car/${ch.launches[0].id}?utm_source=push&utm_medium=alert&utm_campaign=launch` : '/explore?utm_source=push&utm_medium=alert&utm_campaign=launch',
      tag: 'launch',
    }
  }
  if (ch.prices.length) {
    return {
      title: `${ch.prices.length} price change${ch.prices.length > 1 ? 's' : ''} this week`,
      body: `Including ${ch.prices.slice(0, 2).map((p) => `${p.car.brand} ${p.car.model}`).join(' and ')}. See what moved.`,
      url: '/explore?utm_source=push&utm_medium=alert&utm_campaign=prices',
      tag: 'prices',
    }
  }
  return null
}

// ── send
const subs = simulate
  ? { size: 1, docs: [{ id: 'simulated-subscriber', data: () => ({ platform: 'android', cars: (opt('--cars') || '').split(',').filter(Boolean) }) }] }
  : await fs.collection('push').get()
let sent = 0, gone = 0, skipped = 0
const ch = opt('--changes') ? changes(opt('--changes')) : null
if (ch) console.log(`push-send: ${ch.prices.length} price changes, ${ch.launches.length} launches since ${opt('--changes')}`)
for (const d of subs.docs) {
  if (opt('--only') && d.id !== opt('--only')) continue
  const s = d.data()
  const msg = ch ? messageFor(s, ch) : flag('--test') ? { title: opt('--test'), body: args[args.indexOf('--test') + 2] || '', url: args[args.indexOf('--test') + 3] || '/', tag: 'test' } : null
  if (!msg) { skipped++; continue }
  if (dry) { console.log(`  ${d.id.slice(0, 8)} (${s.platform}): ${msg.title} — ${msg.body}`); sent++; continue }
  try {
    await webpush.sendNotification(s.sub, JSON.stringify(msg), { TTL: 60 * 60 * 24 * 3, urgency: 'normal' })
    sent++
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) { await d.ref.delete(); gone++ } else console.log(`  ${d.id.slice(0, 8)}: ${e.statusCode || e.message}`)
  }
}
console.log(`push-send: ${sent} ${dry ? 'would be sent' : 'sent'}, ${skipped} with nothing new, ${gone} expired removed (${subs.size} subscribed)`)
