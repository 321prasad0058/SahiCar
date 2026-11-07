// App icons from the logo: 192 and 512 px for Android, and a "maskable" one whose mark sits inside the safe zone,
// so Android can crop it to a circle, squircle or teardrop without cutting the road.
import { readFile } from 'node:fs/promises'
import sharp from 'sharp'

const logo = (await readFile('public/logo.svg', 'utf8')).trim()
const inner = logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<rect[^>]*\/>/, '')
// full-bleed brand green; the mark scaled to 64% so it stays inside the 80% safe circle
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0b6b4f"/><g transform="translate(11.5 11.5) scale(0.64)">${inner}</g></svg>`

await sharp(Buffer.from(logo)).resize(192, 192).png().toFile('public/icon-192.png')
await sharp(Buffer.from(maskable)).resize(512, 512).png().toFile('public/icon-maskable.png')
console.log('public/icon-192.png, public/icon-maskable.png')
