// SahiCar's YouTube channel. The link asks the visitor to subscribe on arrival (?sub_confirmation=1).
import { track } from '../lib/track'

export const YOUTUBE = 'https://www.youtube.com/@SahiCar?sub_confirmation=1'

/** YouTube's play mark (a link to our own channel, as YouTube's brand guidelines allow). */
const Play = ({ size = 18 }: { size?: number }) => (
  <svg width={size * 1.42} height={size} viewBox="0 0 28.4 20" aria-hidden>
    <rect width="28.4" height="20" rx="5.6" fill="#ff0033" />
    <path d="M11.4 5.7l7.4 4.3-7.4 4.3z" fill="#fff" />
  </svg>
)

export function YouTubeLink({ where, label = 'SahiCar on YouTube', sub }: { where: string; label?: string; sub?: string }) {
  return (
    <a className="yt-link" href={YOUTUBE} target="_blank" rel="noopener noreferrer" onClick={() => track('youtube_open', { where })}>
      <Play />
      <span className="yt-text">
        <b>{label}</b>
        {sub && <span className="yt-sub">{sub}</span>}
      </span>
    </a>
  )
}
