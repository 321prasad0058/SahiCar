// /app: the SahiCar app on a page of its own, opened from the phone menu.
import { useEffect, useRef } from 'react'
import { AppPromo } from '../components/AppPromo'
import { setupReveals } from '../lib/motion'

export default function AppPage() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => setupReveals(root.current!), [])
  return (
    <div ref={root}>
      <AppPromo page />
    </div>
  )
}
