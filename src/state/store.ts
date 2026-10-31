// App state: the SahiFit answers, the garage (saved cars) and the compare tray. Kept in this browser, and
// mirrored to Firestore when the user is signed in.
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_ANSWERS, type Answers } from '../engine/answers'

interface Store {
  answers: Answers
  /** true once the wizard has been completed at least once */
  done: boolean
  garage: string[]
  compare: string[]
  setAnswers: (patch: Partial<Answers>) => void
  finish: () => void
  reset: () => void
  toggleGarage: (id: string) => boolean
  setGarage: (ids: string[]) => void
  toggleCompare: (id: string) => void
  clearCompare: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      answers: DEFAULT_ANSWERS,
      done: false,
      garage: [],
      compare: [],
      setAnswers: (patch) => set({ answers: { ...get().answers, ...patch } }),
      finish: () => set({ done: true }),
      reset: () => set({ answers: DEFAULT_ANSWERS, done: false }),
      toggleGarage: (id) => {
        const has = get().garage.includes(id)
        set({ garage: has ? get().garage.filter((x) => x !== id) : [...get().garage, id] })
        return !has
      },
      setGarage: (ids) => set({ garage: ids }),
      toggleCompare: (id) => {
        const c = get().compare
        set({ compare: c.includes(id) ? c.filter((x) => x !== id) : [...c, id].slice(-3) })
      },
      clearCompare: () => set({ compare: [] }),
    }),
    {
      name: 'sahicar',
      version: 1,
      merge: (saved, cur) => {
        const s = saved as Partial<Store>
        return { ...cur, ...s, answers: { ...DEFAULT_ANSWERS, ...s.answers, priorities: { ...DEFAULT_ANSWERS.priorities, ...s.answers?.priorities } } }
      },
    },
  ),
)
