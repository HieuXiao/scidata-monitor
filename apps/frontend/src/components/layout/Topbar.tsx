import { Link } from 'react-router-dom'

export function Topbar() {
  return (
    <header className="sdm-topbar">
      <div className="sdm-topbar-left">
        <input
          className="sdm-search-input"
          type="search"
          placeholder="Search papers, institutions, topics..."
        />
      </div>
      <div className="sdm-topbar-right">
        <div className="sdm-topbar-meta">
          <span className="sdm-badge-live">LIVE</span>
          <span className="sdm-topbar-timestamp">
            Sun, 15 Mar 2026 &bull; 07:23:00 UTC
          </span>
        </div>
        <Link to="/settings" className="sdm-user-avatar">
          <span className="sdm-user-initials">SC</span>
        </Link>
      </div>
    </header>
  )
}

