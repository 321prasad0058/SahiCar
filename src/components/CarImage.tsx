// A car's photo from Wikimedia Commons (free, credited), resolved at build time or on demand,
// with a body-style silhouette while it loads or when no photo exists.
import { useEffect, useState } from 'react'
import type { Body, Official } from '../data/types'

// artist and licence are set for photos picked from Wikimedia Commons (CC BY / BY-SA need both credited)
type Img = { src: string; page: string; artist?: string; license?: string } | null
const KEY = 'sc-img-v1'
let memo: Record<string, Img> = {}
try { memo = JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { /* storage blocked */ }
const pending = new Map<string, Promise<Img>>()

function resolve(title: string): Promise<Img> {
  if (title in memo) return Promise.resolve(memo[title])
  if (!pending.has(title)) {
    pending.set(
      title,
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}?redirect=true`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          const t = j?.thumbnail?.source as string | undefined
          const img = t ? { src: t.replace(/\/(\d+)px-/, '/960px-'), page: j.content_urls?.desktop?.page ?? '' } : null
          memo[title] = img
          try { localStorage.setItem(KEY, JSON.stringify(memo)) } catch { /* full or blocked */ }
          return img
        })
        .catch(() => null),
    )
  }
  return pending.get(title)!
}

const SIL: Record<string, string> = {
  hatchback: 'M14 66h10a10 10 0 0120 0h52a10 10 0 0120 0h12c3 0 5-3 5-6v-8c0-4-2-6-6-7l-18-5-14-14c-3-3-6-4-10-4H42c-4 0-7 1-9 4l-9 14-8 3c-3 1-5 3-5 6v11c0 1 1 2 3 2z',
  sedan: 'M8 66h14a10 10 0 0120 0h58a10 10 0 0120 0h16c3 0 4-2 4-5v-7c0-3-2-5-5-6l-24-5-16-13c-3-2-6-3-10-3H58c-4 0-7 1-10 3L34 41l-20 4c-4 1-7 3-7 7v11c0 2 0 3 1 3z',
  suv: 'M10 66h10a11 11 0 0122 0h56a11 11 0 0122 0h14c3 0 4-2 4-5V48c0-4-2-6-6-7l-16-3-12-14c-2-3-5-4-9-4H34c-4 0-6 1-8 4l-6 15-8 2c-3 1-5 3-5 6v14c0 3 1 5 3 5z',
  mpv: 'M10 66h10a11 11 0 0122 0h58a11 11 0 0122 0h12c3 0 4-2 4-5V49c0-4-2-6-6-7l-14-3-18-17c-2-2-5-3-9-3H24c-5 0-8 3-9 7l-3 15c-3 1-5 3-5 6v14c0 3 1 5 3 5z',
}

export function Silhouette({ body }: { body: Body }) {
  const d = SIL[body === 'compact-suv' || body === 'pickup' ? 'suv' : body === 'coupe' ? 'sedan' : body] ?? SIL.suv
  return (
    <svg viewBox="0 0 150 80" className="silhouette" aria-hidden>
      <path d={d} fill="none" stroke="#b5afa3" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

const openCredit = (url: string) => (e: React.SyntheticEvent) => {
  e.preventDefault()
  e.stopPropagation()
  open(url, '_blank', 'noopener')
}

/** The manufacturer's official image on a studio backdrop (cut-outs get a floor and a reflection). */
function OfficialImage({ o, alt, eager, small }: { o: Official; alt: string; eager?: boolean; small?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className={`car-img official ${o.transparent ? 'cutout' : ''} ${loaded ? 'loaded' : ''}`}>
      <img src={small ? o.sm : o.src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
      <span className="credit" role="link" tabIndex={0} onClick={openCredit(o.page)} onKeyDown={(e) => e.key === 'Enter' && openCredit(o.page)(e)}>
        Image: {o.brand}
      </span>
    </div>
  )
}

export function CarImage(props: { image?: Img; official?: Official | null; wiki?: string | null; body: Body; alt: string; eager?: boolean; small?: boolean }) {
  if (props.official) return <OfficialImage o={props.official} alt={props.alt} eager={props.eager} small={props.small} />
  return <WikiImage {...props} />
}

function WikiImage({ image, wiki, body, alt, eager }: { image?: Img; wiki?: string | null; body: Body; alt: string; eager?: boolean }) {
  const [img, setImg] = useState<Img>(image ?? (wiki && wiki in memo ? memo[wiki] : null))
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (image || !wiki) return
    let live = true
    resolve(wiki).then((i) => live && setImg(i))
    return () => void (live = false)
  }, [image, wiki])

  return (
    <div className={`car-img ${loaded ? 'loaded' : ''}`}>
      {!loaded && <Silhouette body={body} />}
      {img && (
        <img
          src={img.src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          // Wikimedia refuses a 960px rendition of a smaller original; fall back to 640px, then the silhouette
          onError={() => setImg(img.src.includes('/960px-') ? { ...img, src: img.src.replace('/960px-', '/640px-') } : null)}
        />
      )}
      {img && loaded && img.page && (
        // a span, not a link: cards are already links, and links can't nest
        <span
          className="credit"
          role="link"
          tabIndex={0}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); open(img.page, '_blank', 'noopener') }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); open(img.page, '_blank', 'noopener') } }}
        >
          {img.artist ? `Photo: ${img.artist} · ${img.license ?? 'Wikimedia'}` : 'Photo: Wikimedia'}
        </span>
      )}
    </div>
  )
}
