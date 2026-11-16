// Reading and writing a signed-in user's answers and garage.
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import type { Answers } from '../engine/answers'
import { db } from './firebase'

export async function saveProfile(u: User, answers?: Answers) {
  if (!db) return
  // take-home pay stays in this browser: it is only used for the affordability check
  if (answers) answers = { ...answers, income: 0 }
  await setDoc(
    doc(db, 'users', u.uid),
    // no profile photo: we keep only what the features need (DPDP data minimisation)
    { name: u.displayName ?? '', email: u.email ?? '', ...(answers ? { answers } : {}), updatedAt: serverTimestamp() },
    { merge: true },
  )
}

/** One car from the results the user saw: enough to tell which car and trim, nothing about the person. */
export interface SavedPick {
  car: string
  variant: string
  fuel: string
  gear: string
  score: number
  onRoad: number
}

/**
 * The top matches from their latest results, so we can see which cars SahiFit recommends to signed-in users.
 * Saved on its own: if this write is refused, the answers saved by saveProfile are not affected.
 */
export async function savePicks(uid: string, picks: SavedPick[], fits: number) {
  if (!db) return
  await setDoc(doc(db, 'users', uid), { picks: picks.slice(0, 3), fits, picksAt: serverTimestamp() }, { merge: true })
}

/** How many finished quizzes we keep per person; older ones are deleted. */
export const RUNS_KEPT = 10

/**
 * Log one finished quiz: the answers (take-home pay removed) and the top 3 it gave, so we can see how people change
 * their answers and which cars they end up with. Keeps only the latest RUNS_KEPT.
 */
export async function addRun(uid: string, answers: Answers, picks: SavedPick[], fits: number) {
  if (!db) return
  const runs = collection(db, 'users', uid, 'runs')
  await addDoc(runs, { answers: { ...answers, income: 0 }, picks: picks.slice(0, 3), fits, at: serverTimestamp() })
  const all = await getDocs(query(runs, orderBy('at', 'desc')))
  await Promise.all(all.docs.slice(RUNS_KEPT).map((d) => deleteDoc(d.ref)))
}

export async function loadProfile(uid: string) {
  if (!db) return null
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data() as { answers?: Answers }) : null
}

export async function loadGarage(uid: string) {
  if (!db) return []
  const snap = await getDocs(collection(db, 'users', uid, 'garage'))
  return snap.docs.map((d) => d.data() as { carId: string; score?: number })
}

export async function saveCar(uid: string, carId: string, score?: number) {
  if (!db) return
  await setDoc(doc(db, 'users', uid, 'garage', carId), { carId, score: score ?? null, savedAt: serverTimestamp() })
}

export async function removeCar(uid: string, carId: string) {
  if (!db) return
  await deleteDoc(doc(db, 'users', uid, 'garage', carId))
}
