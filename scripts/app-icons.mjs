// App icons, every size drawn straight from the vector logo (never upscaled), so they stay sharp.
//
// The "maskable" icon is what Android launchers show on the home screen and in the app list, cut to their own
// shape (circle, squircle…). It is green edge to edge with the white tick in the middle, so whatever shape the
// launcher cuts there are no white or cream corners. The tick is scaled to stay inside the 40%-radius safe zone.
//
// Files go under a versioned folder (public/app-icon/v<N>/): Android and Google's app-packaging step cache icons
// by URL, so a new version number is what makes installed apps pick up a change. Bump V for every redesign.
import { mkdir, readFile } from 'node:fs/promises'
import sharp from 'sharp'

const V = 4
const DIR = `public/app-icon/v${V}`
const GREEN = '#0b6b4f'
const MARK = 0.8 // the tick's farthest point lands ~0.36 from the centre: inside the 0.4 safe zone

const logo = (await readFile('public/logo.svg', 'utf8')).trim()
const inner = logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
const tick = inner.replace(/<rect[^>]*\/>/, '')
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${body}</svg>`
// full green square, no transparent corners (launchers that can't use the maskable icon would back those with
// white); the launcher or iOS rounds it itself
const square = svg(`<rect width="64" height="64" fill="${GREEN}"/>${tick}`)
const maskable = svg(`<rect width="64" height="64" fill="${GREEN}"/><g transform="translate(32 32) scale(${MARK}) translate(-32 -32)">${tick}</g>`)

const out = async (src, size, file) => {
  await sharp(Buffer.from(src), { density: Math.ceil((72 * size) / 64) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file)
  return file
}
await mkdir(DIR, { recursive: true })
const made = await Promise.all([
  out(square, 192, `${DIR}/any-192.png`),
  out(square, 512, `${DIR}/any-512.png`),
  out(square, 1024, `${DIR}/any-1024.png`),
  out(maskable, 192, `${DIR}/maskable-192.png`),
  out(maskable, 512, `${DIR}/maskable-512.png`),
  out(maskable, 1024, `${DIR}/maskable-1024.png`),
  // fixed names other places use: shortcuts and the weekly email (192), iOS home screen (180)
  out(square, 192, 'public/icon-192.png'),
  out(square, 180, 'public/icon-180.png'),
])
console.log(made.join('\n'))
