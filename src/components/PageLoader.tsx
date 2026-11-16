// The SahiCar loader while a page's code downloads (Suspense fallback). Same markup as the first-paint loader in
// index.html. React removes a fallback instantly, so on the way out we leave a copy behind that plays the exit: the
// sheet drops away on a phone, the card lifts and fades on a desktop.
import { useLayoutEffect, useRef } from 'react'
import { LOADER_HTML } from '../loader'

/** The first-paint loader from index.html, while it is still on screen (see main.tsx). */
export const bootLoader = { el: null as HTMLElement | null }

export function playLoaderExit(el: HTMLElement) {
  const ghost = el.cloneNode(true) as HTMLElement
  ghost.classList.remove('page-loading', 'scl-still')
  ghost.classList.add('scl-out')
  ghost.removeAttribute('role')
  document.body.appendChild(ghost)
  setTimeout(() => ghost.remove(), 600)
}

export function PageLoader() {
  const box = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = box.current?.firstElementChild as HTMLElement | null
    if (!el) return
    // the first-paint loader is still showing: carry on from it instead of starting again
    const still = bootLoader.el !== null
    if (still) el.classList.add('scl-still')
    const t0 = performance.now()
    return () => {
      // only animate out if it was actually seen (it stays invisible for its first 160 ms)
      if (!still && performance.now() - t0 < 170) return
      if (still && bootLoader.el) return // the first-paint loader plays the exit for both
      playLoaderExit(el)
    }
  }, [])
  return <div style={{ display: 'contents' }} ref={box} dangerouslySetInnerHTML={{ __html: LOADER_HTML }} />
}
