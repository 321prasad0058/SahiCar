import { useEffect, useState } from 'react'

type T = { id: number; text: string }
let push: (t: string) => void = () => {}
export const toast = (text: string) => push(text)

export function Toasts() {
  const [list, setList] = useState<T[]>([])
  useEffect(() => {
    push = (text) => {
      const id = Date.now() + Math.random()
      setList((l) => [...l, { id, text }])
      setTimeout(() => setList((l) => l.filter((x) => x.id !== id)), 2600)
    }
  }, [])
  return (
    <div className="toasts" role="status" aria-live="polite">
      {list.map((t) => <div key={t.id} className="toast">{t.text}</div>)}
    </div>
  )
}
