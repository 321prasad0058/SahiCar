import { Link, useLocation } from 'react-router-dom'
import { carById } from '../data'
import { useStore } from '../state/store'
import { Icon } from './Icon'

export function CompareTray() {
  const all = useStore((s) => s.compare)
  const ids = all.filter((id) => carById.has(id)) // ignore cars dropped from the data since they were added
  const { pathname } = useLocation()
  if (!ids.length || pathname === '/compare' || pathname === '/sahifit') return null
  return (
    <div className="tray card">
      <div className="tray-cars">
        {ids.map((id) => {
          const c = carById.get(id)
          return c ? (
            <button key={id} className="chip cyan" onClick={() => useStore.getState().toggleCompare(id)}>
              {c.model} <Icon name="close" size={12} />
            </button>
          ) : null
        })}
      </div>
      <Link to="/compare" className="btn btn-primary btn-sm">Compare {ids.length}</Link>
    </div>
  )
}
