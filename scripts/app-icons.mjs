// App icons, every size drawn straight from the vector logo (never upscaled), so they stay sharp.
//
// Android 12+ always shows an installed app's icon inside a circle on the screen that appears when it opens,
// and builds that screen from the manifest. Without a "maskable" icon it shrinks the whole logo onto a white
// disc (small and blurry); with one it shows the icon's own background edge to edge. So the maskable icon is
// full-bleed brand green with the tick as large as the safe zone allows (a circle of 40% radius): the tick
// reaches 45.9% of the tile from its centre, so 0.846 × that keeps it fully inside. 1024 px covers the
// opening screen on high-density phones; 512 and 192 cover the home screen.
import { mkdir, readFile } from 'node:fs/promises'
import sharp from 'sharp'

const logo = (await readFile('public/logo.svg', 'utf8')).trim()
const inner = logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<rect[^>]*\/>/, '')
const GREEN = '#0b6b4f'
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${body}</svg>`
// the original rounded tile (as the logo itself), for "any" icons
const rounded = logo
// full-bleed square tile with the tick at its original size, for iOS (it rounds the corners itself)
const square = svg(`<rect width="64" height="64" fill="${GREEN}"/>${inner}`)
// full-bleed tile, tick scaled about the centre to fill Android's safe circle
const S = 0.846
const maskable = svg(`<rect width="64" height="64" fill="${GREEN}"/><g transform="translate(32 32) scale(${S}) translate(-32 -32)">${inner}</g>`)

const out = async (src, size, file) => {
  await sharp(Buffer.from(src), { density: Math.ceil((72 * size) / 64) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file)
  return file
}
await mkdir('public', { recursive: true })
const made = await Promise.all([
  out(rounded, 192, 'public/icon-192.png'),
  out(rounded, 512, 'public/icon.png'),
  out(rounded, 1024, 'public/icon-1024.png'),
  out(square, 180, 'public/icon-180.png'),
  out(maskable, 512, 'public/icon-maskable.png'),
  out(maskable, 1024, 'public/icon-maskable-1024.png'),
])
console.log(made.join('\n'))
