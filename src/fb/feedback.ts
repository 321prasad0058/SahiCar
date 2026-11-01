// Feedback from the app: a rating, what kind of problem, a comment and the page it came from. Nothing about the
// person — no account, name, email or pay — and only the server can read it (Firebase console → Firestore → feedback).
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export type Rating = 'yes' | 'partly' | 'no'
export type Topic = 'pick' | 'data' | 'bug' | 'idea'

export interface Feedback {
  rating: Rating | null
  topic: Topic | null
  text: string
  page: string
  /** the top match when it came from the results page */
  car: string | null
  /** non-personal context to reproduce a result: budget, people, body styles… */
  ctx: Record<string, string | number>
}

export async function sendFeedback(f: Feedback) {
  if (!db) throw new Error('Feedback is not configured on this deployment.')
  await addDoc(collection(db, 'feedback'), { ...f, at: serverTimestamp() })
}
