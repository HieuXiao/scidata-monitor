import { useState, useEffect } from 'react'

function useLiveClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

interface TopbarProps {
  onToggleSidebar: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const now = useLiveClock()
  const formatted = now.toUTCString().replace('GMT', 'UTC')

  return (
    <header className="sdm-topbar">
      {/* Left: toggle + brand */}
      <div className="sdm-topbar-left">
        <button className="sdm-icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="6" y1="1.5" x2="6" y2="16.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <div className="sdm-topbar-brand">
          <div className="sdm-logo-circle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polyline points="1,11 4,7 7,9 10,4 13,7 15,5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="sdm-logo-text">
            <span className="sdm-logo-title">SciData Monitor</span>
            <span className="sdm-logo-subtitle">GLOBAL RESEARCH INTELLIGENCE</span>
          </div>
        </div>
      </div>

      {/* Center: search */}
      <div className="sdm-topbar-search-wrap">
        <svg className="sdm-search-icon-inline" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.3" stroke="#9ca3af" strokeWidth="1.4"/>
          <line x1="9.3" y1="9.3" x2="13" y2="13" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <input
          className="sdm-search-input"
          type="search"
          placeholder="Search papers, institutions, topics..."
        />
        <kbd className="sdm-search-kbd">⌘K</kbd>
      </div>

      {/* Right: live, timestamp, bells, sign in */}
      <div className="sdm-topbar-right">
        <div className="sdm-topbar-meta">
          <span className="sdm-badge-live">
            <span className="sdm-live-dot" />
            LIVE
          </span>
          <span className="sdm-topbar-timestamp">{formatted}</span>
        </div>

        <button className="sdm-icon-btn sdm-icon-btn-rel" aria-label="Notifications">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5v2.5l1.2 2H2.3L3.5 8.5V6A4.5 4.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          <span className="sdm-notif-dot" />
        </button>

        <button className="sdm-icon-btn" aria-label="Toggle dark mode">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 9.5A5.5 5.5 0 1 1 6.5 2.5a4.5 4.5 0 0 0 7 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
        </button>

        <a href="#" className="sdm-signin-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 7h7M9 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sign in
        </a>
      </div>
    </header>
  )
}

