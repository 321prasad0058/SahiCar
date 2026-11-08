// The two phone glyphs for the app buttons. The iPhone one is a plain phone, not Apple's logo.
export function AndroidGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18a.38.38 0 00-.66-.38l-1.86 3.22A11.4 11.4 0 0012 8.1c-1.77 0-3.43.38-4.92 1.04L5.22 5.92a.38.38 0 00-.66.38L6.4 9.48A10.8 10.8 0 001 18h22a10.8 10.8 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
    </svg>
  )
}

/** Not Apple's logo (that belongs on App Store badges only): a plain phone with a home-screen grid. */
export function AppleGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M9.5 7.5h.01M12 7.5h.01M14.5 7.5h.01M9.5 10.5h.01M12 10.5h.01M14.5 10.5h.01M10.5 18.5h3" strokeWidth="2.4" />
    </svg>
  )
}
