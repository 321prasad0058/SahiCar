// If a page crashes or its code can't load, show a way forward instead of a blank white page.
import { Component, type ReactNode } from 'react'
import { isChunkError, reloadOnce } from '../lib/reload'
import { track } from '../lib/track'

interface State {
  error: unknown
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: unknown): State {
    return { error }
  }

  componentDidCatch(error: unknown) {
    const chunk = isChunkError(error)
    track('app_error', { kind: chunk ? 'chunk' : 'render', page: location.pathname.slice(0, 80) })
    // new site version under an open tab: one reload fixes it
    if (chunk) reloadOnce()
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="page app-error">
        <div className="wrap">
          <div className="card app-error-card">
            <img src="/logo.svg" alt="" width="48" height="48" />
            <h1>This page didn’t load properly</h1>
            <p className="muted">It’s usually a weak connection or a new version of SahiCar arriving. Reloading fixes it.</p>
            <div className="app-error-actions">
              <button className="btn btn-primary" onClick={() => location.reload()}>Reload</button>
              <a className="btn btn-ghost" href="/">Go home</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
