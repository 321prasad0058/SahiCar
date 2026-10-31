// Reading and writing a signed-in user's answers and garage.
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import type { Answers } from '../engine/answers'
import { db } from './firebase'

export async function saveProfile(u: User, answers?: Answers) {
  if (!db) return
  await setDoc(
    doc(db, 'users', u.uid),
    { name: u.displayName ?? '', email: u.email ?? '', photo: u.photoURL ?? '', ...(answers ? { answers } : {}), updatedAt: serverTimestamp() },
    { merge: true },
  )
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
