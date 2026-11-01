// Data retention (DPDP Act): delete accounts nobody has signed in to for six months, and strip fields we no
// longer keep (the profile photo). Firebase's free plan has no scheduled jobs, so run this now and then:
//
//   npm run privacy:cleanup            show what would be deleted (changes nothing)
//   npm run privacy:cleanup -- --apply delete it
//
// It acts as you, through your Firebase CLI login (`npx firebase login` as an owner of the project).
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import api from 'firebase-tools/lib/api.js'

const PROJECT = JSON.parse(readFileSync(new URL('../.firebaserc', import.meta.url), 'utf8')).projects.default
const INACTIVE_DAYS = 183
const apply = process.argv.includes('--apply')

async function token() {
  const cfg = JSON.parse(readFileSync(join(homedir(), '.config/configstore/firebase-tools.json'), 'utf8'))
  const refresh = cfg.tokens?.refresh_token
  if (!refresh) throw new Error('Not logged in: run `npx firebase login` first.')
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ refresh_token: refresh, client_id: api.clientId(), client_secret: api.clientSecret(), grant_type: 'refresh_token' }),
  })
  const j = await r.json()
  if (!j.access_token) throw new Error(`Couldn't get a token (${r.status}). Run \`npx firebase login --reauth\`.`)
  return j.access_token
}

const H = { Authorization: `Bearer ${await token()}`, 'content-type': 'application/json' }
const FS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`
const call = async (url, init = {}) => {
  const r = await fetch(url, { ...init, headers: H })
  if (!r.ok) throw new Error(`${init.method ?? 'GET'} ${url} → ${r.status} ${await r.text()}`)
  return r.status === 204 ? null : r.json()
}

// every account, with its last sign-in
const accounts = []
for (let next = ''; ; ) {
  const j = await call(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:batchGet?maxResults=500${next ? `&nextPageToken=${next}` : ''}`)
  accounts.push(...(j.users ?? []))
  if (!(next = j.nextPageToken)) break
}
const cutoff = Date.now() - INACTIVE_DAYS * 864e5
const stale = accounts.filter((u) => Number(u.lastLoginAt ?? u.createdAt) < cutoff)

// profile documents still holding a photo
const docs = []
for (let next = ''; ; ) {
  const j = await call(`${FS}/users?pageSize=300${next ? `&pageToken=${next}` : ''}`)
  docs.push(...(j.documents ?? []))
  if (!(next = j.nextPageToken)) break
}
const withPhoto = docs.filter((d) => d.fields && 'photo' in d.fields)

console.log(`${accounts.length} accounts · ${stale.length} inactive for 6 months · ${withPhoto.length} profiles still holding a photo`)
if (!apply) {
  if (stale.length || withPhoto.length) console.log('Dry run: nothing changed. Add --apply to delete.')
  process.exit(0)
}

for (const u of stale) {
  const garage = await call(`${FS}/users/${u.localId}/garage?pageSize=300`)
  for (const d of garage.documents ?? []) await call(`https://firestore.googleapis.com/v1/${d.name}`, { method: 'DELETE' })
  await call(`${FS}/users/${u.localId}`, { method: 'DELETE' })
  await call(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:delete`, { method: 'POST', body: JSON.stringify({ localId: u.localId }) })
  console.log(`deleted inactive account ${u.localId.slice(0, 6)}…`)
}
// patching a field that isn't in the body removes it
for (const d of withPhoto) {
  await call(`https://firestore.googleapis.com/v1/${d.name}?updateMask.fieldPaths=photo`, { method: 'PATCH', body: JSON.stringify({ fields: {} }) })
  console.log(`removed photo from ${d.name.split('/').pop().slice(0, 6)}…`)
}
console.log('done')
