// Opens the feedback form from anywhere (footer, results), optionally with a rating already chosen.
import { create } from 'zustand'
import type { Rating } from '../fb/feedback'

interface FeedbackState {
  open: boolean
  rating: Rating | null
  car: string | null
}

export const useFeedback = create<FeedbackState>(() => ({ open: false, rating: null, car: null }))

export const openFeedback = (rating: Rating | null = null, car: string | null = null) => useFeedback.setState({ open: true, rating, car })
export const closeFeedback = () => useFeedback.setState({ open: false })
