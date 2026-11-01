// The mark: a tick drawn as a road running off into the distance — "sahi" is the right road ahead.
export const ROAD = 'M9.69 38.31L27.08 54.86L52.00 14.75L50.00 13.25L25.92 38.14L18.31 29.69Z'
export const DASHES = 'M16.22 37.28L21.22 42.28L22.28 41.22L17.28 36.22ZM29.27 44.00L33.36 38.42L32.38 37.68L28.14 43.15ZM36.43 34.23L39.31 30.29L38.55 29.72L35.56 33.58ZM41.48 27.34L43.53 24.55L42.92 24.09L40.80 26.82ZM45.06 22.46L46.50 20.49L46.00 20.11L44.51 22.04Z'

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="var(--accent)" />
      <g transform="translate(1.16 -2.05)">
        <path d={ROAD} fill="#fff" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        <path d={DASHES} fill="var(--accent)" />
      </g>
    </svg>
  )
}

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        Sahi<span>Car</span>
      </span>
    </span>
  )
}
