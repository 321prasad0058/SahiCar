// The share sheet: a preview of the card, then the phone's own share menu (the picture goes straight into
// WhatsApp or Instagram), WhatsApp with the link, a download, or the link copied.
import { useEffect, useState } from 'react'
import { drawCard, type CardData } from '../lib/shareCard'
import { track } from '../lib/track'
import { Icon } from './Icon'
import { toast } from './Toast'

export function ShareSheet({ card, text, url, kind, item, onClose }: { card: CardData; text: string; url: string; kind: 'match'; item: string; onClose: () => void }) {
  const [blob, setBlob] = useState<Blob | null>(null)
  const [src, setSrc] = useState('')
  useEffect(() => {
    let live = true
    let made = ''
    drawCard(card).then((b) => {
      if (!live) return
      made = URL.createObjectURL(b)
      setBlob(b)
      setSrc(made)
    }).catch(() => {})
    return () => { live = false; if (made) URL.revokeObjectURL(made) }
  }, [card])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [onClose])

  const file = blob ? new File([blob], `sahicar-${item}.png`, { type: 'image/png' }) : null
  const native = Boolean(file && navigator.canShare?.({ files: [file] }))
  const done = (method: string) => track('share', { content_type: kind, item_id: item, method })

  const shareNative = async () => {
    if (!file) return
    try {
      await navigator.share({ files: [file], text: `${text} ${url}` })
      done('native')
    } catch { /* cancelled */ }
  }
  const download = () => {
    if (!src) return
    const a = document.createElement('a')
    a.href = src
    a.download = `sahicar-${item}.png`
    a.click()
    done('download')
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast('Link copied')
      done('copy')
    } catch { toast('Couldn’t copy — long-press the link instead') }
  }

  return (
    <div className="share-veil" onClick={onClose}>
      <div className="share-sheet card" role="dialog" aria-modal="true" aria-label="Share" onClick={(e) => e.stopPropagation()}>
        <div className="share-top">
          <b>Share your match</b>
          <button className="icon-btn" aria-label="Close" onClick={onClose}><Icon name="close" /></button>
        </div>
        <div className="share-preview">{src ? <img src={src} alt="Your SahiCar share card" /> : <span className="spinner" />}</div>
        <div className={`share-actions ${native ? 'three' : ''}`}>
          {native && <button className="btn btn-primary" onClick={shareNative}><Icon name="share" size={16} /> Share picture</button>}
          <a className={`btn ${native ? 'btn-ghost' : 'btn-primary'}`} href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`} target="_blank" rel="noopener" onClick={() => done('whatsapp')}>
            WhatsApp
          </a>
          <button className="btn btn-ghost" onClick={download} disabled={!src}><Icon name="download" size={16} /> Save image</button>
          <button className="btn btn-ghost" onClick={copy}><Icon name="link" size={16} /> Copy link</button>
        </div>
        <p className="dim small share-note">The card shows your result only — never your name, salary or answers.</p>
      </div>
    </div>
  )
}
