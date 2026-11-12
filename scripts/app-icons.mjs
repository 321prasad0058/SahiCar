// App icons, every size drawn straight from the vector logo (never upscaled), so they stay sharp.
//
// Android 12+ always shows an installed app's icon cropped to a circle on the screen that appears when it opens,
// and uses the manifest's "maskable" icon for it. To keep the original look (the rounded green tile on the cream
// app background, no visible circle), the maskable icon is the cream page colour edge to edge with the rounded
// tile in the middle: the circle crop then falls on cream and disappears. The tile is sized so its corners stay
// inside the 40%-radius safe zone every launcher keeps (a rounded square reaches ~0.61 of its side from the
// centre, so 0.64 of the canvas → 0.39).
//
// Files go under a versioned folder (public/app-icon/v<N>/): Android and Google's app-packaging step cache icons
// by URL, so a new version number is what makes installed apps pick up a change. Bump V for every redesign.
import { mkdir, readFile } from 'node:fs/promises'
import sharp from 'sharp'

const V = 3
const DIR = `public/app-icon/v${V}`
const CREAM = '#f5f3ee' // = manifest background_color, the opening screen's colour
const GREEN = '#0b6b4f'
const TILE = 0.64

const logo = (await readFile('public/logo.svg', 'utf8')).trim()
const inner = logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
const tick = inner.replace(/<rect[^>]*\/>/, '')
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${body}</svg>`
const rounded = logo // the original tile, transparent corners: "any" icons
const square = svg(`<rect width="64" height="64" fill="${GREEN}"/>${tick}`) // iOS rounds the corners itself
const maskable = svg(`<rect width="64" height="64" fill="${CREAM}"/><g transform="translate(32 32) scale(${TILE}) translate(-32 -32)">${inner}</g>`)

const out = async (src, size, file) => {
  await sharp(Buffer.from(src), { density: Math.ceil((72 * size) / 64) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file)
  return file
}
await mkdir(DIR, { recursive: true })
const made = await Promise.all([
  out(rounded, 192, `${DIR}/any-192.png`),
  out(rounded, 512, `${DIR}/any-512.png`),
  out(rounded, 1024, `${DIR}/any-1024.png`),
  out(maskable, 192, `${DIR}/maskable-192.png`),
  out(maskable, 512, `${DIR}/maskable-512.png`),
  out(maskable, 1024, `${DIR}/maskable-1024.png`),
  // fixed names other places use: shortcuts and the weekly email (192), iOS home screen (180)
  out(rounded, 192, 'public/icon-192.png'),
  out(square, 180, 'public/icon-180.png'),
])
console.log(made.join('\n'))
