// One automatic reload when the site's code changed under an open tab (a deploy). Never loops: at most once a minute.
const KEY = 'sc-reloaded-at'

export function reloadOnce(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) ?? 0)
    if (Date.now() - last < 60_000) return false
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch {
    return false // storage blocked: don't risk a reload loop
  }
  location.reload()
  return true
}

/** A failed page-code download: reload once for the new version; if that already happened, let the error show. */
export const isChunkError = (e: unknown) =>
  /dynamically imported module|Importing a module script failed|error loading dynamically|Failed to fetch|ChunkLoadError/i.test(String((e as Error)?.message ?? e))
