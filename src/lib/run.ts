// A finished quiz that hasn't been logged yet. Kept in memory only: the results page logs it once the person is
// signed in (straight away, or after they sign in to see all their matches), then clears it.
let pending = false
export const markRun = () => { pending = true }
export const runPending = () => pending
export const clearRun = () => { pending = false }
