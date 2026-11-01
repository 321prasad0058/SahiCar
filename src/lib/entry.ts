// The address the visitor arrived on. Share and campaign tags (?m=…&s=…&utm_…) are read once here, kept for
// Analytics (as the first page's location) and for the friend's-match card, then removed from the address bar
// so only the clean link shows and nobody copies the tags along.
const TAGS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'm', 's']

export const entryUrl = location.href

const u = new URL(entryUrl)
const car = u.searchParams.get('m')

/** A friend's shared match, when the visitor came from a share link. */
export const sharedMatch = car ? { car, score: Number(u.searchParams.get('s')) || 0 } : null

if (TAGS.some((k) => u.searchParams.has(k))) {
  for (const k of TAGS) u.searchParams.delete(k)
  history.replaceState(history.state, '', u.pathname + u.search + u.hash)
}
