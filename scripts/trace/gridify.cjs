// Overlay a labelled pixel grid on a crop of an image, for tracing. usage: gridify in out left top width height [scale]
const sharp = require('sharp')
const [inp, out, l, t, w, h, sc = '1'] = process.argv.slice(2)
;(async () => {
  const L = +l, T = +t, W = +w, H = +h, S = +sc
  const img = await sharp(inp).extract({ left: L, top: T, width: W, height: H }).resize(Math.round(W * S)).toBuffer()
  const WW = Math.round(W * S), HH = Math.round(H * S)
  let svg = `<svg width="${WW}" height="${HH}" xmlns="http://www.w3.org/2000/svg">`
  for (let x = Math.ceil(L / 20) * 20; x < L + W; x += 20) {
    const X = (x - L) * S, major = x % 100 === 0
    svg += `<line x1="${X}" y1="0" x2="${X}" y2="${HH}" stroke="${major ? '#ff0' : '#0ff'}" stroke-opacity="${major ? 0.75 : 0.3}" stroke-width="1"/>`
    if (major) svg += `<text x="${X + 2}" y="12" font-size="11" fill="#ff0" font-family="Helvetica">${x}</text>`
  }
  for (let y = Math.ceil(T / 20) * 20; y < T + H; y += 20) {
    const Y = (y - T) * S, major = y % 100 === 0
    svg += `<line x1="0" y1="${Y}" x2="${WW}" y2="${Y}" stroke="${major ? '#ff0' : '#0ff'}" stroke-opacity="${major ? 0.75 : 0.3}" stroke-width="1"/>`
    if (major) svg += `<text x="2" y="${Y - 2}" font-size="11" fill="#ff0" font-family="Helvetica">${y}</text>`
  }
  svg += '</svg>'
  await sharp(img).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 90 }).toFile(out)
})()
