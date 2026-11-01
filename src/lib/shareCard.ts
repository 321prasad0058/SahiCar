// Share cards: a 1080 × 1350 picture of a SahiFit match, drawn in the browser, for WhatsApp, Instagram and the rest.
// Never anything personal on the card: the car, its SahiScore and why it fits — no name, pay or answers.
import type { Body, Car } from '../data/types'
import { silPath } from '../components/CarImage'
import { DASHES, ROAD } from '../components/Logo'

export const SITE = 'https://sahicar-in.web.app'

export interface CardData {
  eyebrow: string
  title: string
  sub: string
  body: Body
  photo?: { src: string; credit: string } | null
  score: number
  lines: string[]
}

const W = 1080
const H = 1350
const C = { bg: '#f5f3ee', surface: '#ffffff', ink: '#15171b', muted: '#5d6168', dim: '#8c8f95', line: '#e4e0d7', accent: '#0b6b4f', soft: '#e4f1eb' }
const font = (w: number, px: number) => `${w} ${px}px "Instrument Sans", "Helvetica Neue", Arial, sans-serif`

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((ok) => {
    const img = new Image()
    // Commons sends CORS headers; without crossOrigin the canvas could not be exported
    img.crossOrigin = 'anonymous'
    img.onload = () => ok(img)
    img.onerror = () => ok(null)
    img.src = src
  })
}

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number, lines: number) {
  const out: string[] = []
  let cur = ''
  for (const w of text.split(' ')) {
    const t = cur ? `${cur} ${w}` : w
    if (ctx.measureText(t).width > max && cur) {
      out.push(cur)
      cur = w
    } else cur = t
  }
  out.push(cur)
  if (out.length > lines) {
    out.length = lines
    while (ctx.measureText(out[lines - 1] + '…').width > max) out[lines - 1] = out[lines - 1].slice(0, -1)
    out[lines - 1] += '…'
  }
  return out
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

export async function drawCard(d: CardData): Promise<Blob> {
  await Promise.all([font(600, 40), font(700, 40), font(500, 40)].map((f) => document.fonts?.load(f).catch(() => null)))
  const photo = d.photo ? await loadImage(d.photo.src) : null

  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, W, H)

  // the logo mark and word
  ctx.save()
  ctx.translate(60, 56)
  ctx.fillStyle = C.accent
  roundRect(ctx, 0, 0, 64, 64, 15)
  ctx.fill()
  ctx.translate(1.16, -2.05)
  ctx.fillStyle = '#fff'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 1.4
  ctx.lineJoin = 'round'
  const road = new Path2D(ROAD)
  ctx.fill(road)
  ctx.stroke(road)
  ctx.fillStyle = C.accent
  ctx.fill(new Path2D(DASHES))
  ctx.restore()
  ctx.font = font(700, 40)
  ctx.fillStyle = C.ink
  ctx.textBaseline = 'middle'
  ctx.fillText('Sahi', 140, 89)
  const sahi = ctx.measureText('Sahi').width
  ctx.fillStyle = C.accent
  ctx.fillText('Car', 140 + sahi, 89)
  ctx.font = font(500, 26)
  ctx.fillStyle = C.dim
  ctx.textAlign = 'right'
  ctx.fillText('India’s free, unbiased car advisor', W - 60, 89)
  ctx.textAlign = 'left'

  // eyebrow, title, sub
  ctx.textBaseline = 'alphabetic'
  ctx.font = font(600, 34)
  ctx.fillStyle = C.accent
  ctx.fillText(d.eyebrow, 60, 236)
  ctx.font = font(700, 92)
  ctx.fillStyle = C.ink
  const title = wrap(ctx, d.title, W - 120, 2)
  title.forEach((t, i) => ctx.fillText(t, 60, 330 + i * 96))
  let y = 330 + (title.length - 1) * 96 + 58
  ctx.font = font(500, 34)
  ctx.fillStyle = C.muted
  ctx.fillText(wrap(ctx, d.sub, W - 120, 1)[0], 60, y)

  // the photo panel
  y += 40
  const ph = { x: 60, y, w: W - 120, h: 470 }
  ctx.save()
  roundRect(ctx, ph.x, ph.y, ph.w, ph.h, 28)
  ctx.fillStyle = C.surface
  ctx.fill()
  ctx.clip()
  if (photo) {
    const s = Math.max(ph.w / photo.width, ph.h / photo.height)
    const w = photo.width * s
    const h = photo.height * s
    ctx.drawImage(photo, ph.x + (ph.w - w) / 2, ph.y + (ph.h - h) / 2, w, h)
  } else {
    const s = 5.4
    ctx.translate(ph.x + (ph.w - 150 * s) / 2, ph.y + (ph.h - 80 * s) / 2 + 10)
    ctx.scale(s, s)
    ctx.strokeStyle = '#b5afa3'
    ctx.lineWidth = 1.2
    ctx.lineJoin = 'round'
    ctx.stroke(new Path2D(silPath(d.body)))
  }
  ctx.restore()
  ctx.strokeStyle = C.line
  ctx.lineWidth = 2
  roundRect(ctx, ph.x, ph.y, ph.w, ph.h, 28)
  ctx.stroke()
  if (photo && d.photo?.credit) {
    ctx.font = font(500, 18)
    const t = wrap(ctx, d.photo.credit, ph.w - 280, 1)[0]
    const tw = ctx.measureText(t).width
    ctx.fillStyle = 'rgba(21,23,27,.55)'
    roundRect(ctx, ph.x + 16, ph.y + ph.h - 46, tw + 24, 30, 8)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.fillText(t, ph.x + 28, ph.y + ph.h - 25)
  }

  // the score ring, overlapping the panel's bottom-right corner
  {
    const cx = W - 160
    const cy = ph.y + ph.h - 10
    ctx.beginPath()
    ctx.arc(cx, cy, 104, 0, Math.PI * 2)
    ctx.fillStyle = C.surface
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = C.line
    ctx.stroke()
    ctx.lineWidth = 14
    ctx.lineCap = 'round'
    ctx.strokeStyle = C.soft
    ctx.beginPath()
    ctx.arc(cx, cy, 84, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = C.accent
    ctx.beginPath()
    ctx.arc(cx, cy, 84, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * Math.max(0, Math.min(100, d.score))) / 100)
    ctx.stroke()
    ctx.textAlign = 'center'
    ctx.fillStyle = C.ink
    ctx.font = font(700, 68)
    ctx.fillText(String(Math.round(d.score)), cx, cy + 14)
    ctx.font = font(600, 20)
    ctx.fillStyle = C.muted
    ctx.fillText('SahiScore', cx, cy + 46)
    ctx.textAlign = 'left'
  }

  // the reasons
  y = ph.y + ph.h + 134
  ctx.font = font(500, 34)
  for (const line of d.lines.slice(0, 3)) {
    // the headline of each reason: the part before a dash or a bracket
    const t = wrap(ctx, line.split(/ — | \(|; /)[0], W - 190, 1)[0]
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(66, y - 12)
    ctx.lineTo(80, y + 1)
    ctx.lineTo(104, y - 26)
    ctx.stroke()
    ctx.fillStyle = C.ink
    ctx.fillText(t, 130, y)
    y += 62
  }

  // the footer
  ctx.fillStyle = C.line
  ctx.fillRect(60, H - 150, W - 120, 2)
  ctx.font = font(700, 36)
  ctx.fillStyle = C.accent
  ctx.fillText('Find yours free → sahicar-in.web.app', 60, H - 90)
  ctx.font = font(500, 25)
  ctx.fillStyle = C.muted
  ctx.fillText('No carmaker pays us. Rankings are never for sale.', 60, H - 50)

  return new Promise((ok, fail) => cv.toBlob((b) => (b ? ok(b) : fail(new Error('canvas'))), 'image/png'))
}

/** The car's photo for a card, with the credit its licence needs. */
export function cardPhoto(car: Car): CardData['photo'] {
  if (car.official) return { src: car.official.src, credit: `Image: ${car.official.brand}` }
  const img = car.image as { src: string; artist?: string; license?: string } | null | undefined
  if (!img?.src) return null
  return { src: img.src, credit: img.artist ? `Photo: ${img.artist} · ${img.license ?? 'Wikimedia Commons'}` : 'Photo: Wikimedia Commons' }
}

/** A link back to SahiCar that Analytics can attribute to the share. */
export function shareUrl(path: string, campaign: string, extra: Record<string, string> = {}) {
  const u = new URL(path, SITE)
  for (const [k, v] of Object.entries(extra)) u.searchParams.set(k, v)
  u.searchParams.set('utm_source', 'share')
  u.searchParams.set('utm_medium', 'social')
  u.searchParams.set('utm_campaign', campaign)
  return u.toString()
}
