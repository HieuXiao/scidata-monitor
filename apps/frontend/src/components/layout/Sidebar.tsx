import { NavLink } from 'react-router-dom'

type NavItem = {
  label: string
  to: string
  section: 'main' | 'explore' | 'analytics' | 'personal'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', to: '/', section: 'main' },
  { label: 'Dashboard', to: '/dashboard', section: 'main' },
  { label: 'Research Feed', to: '/feed', section: 'main' },
  { label: 'Global Map', to: '/map', section: 'main' },

  { label: 'Topic Explorer', to: '/topics', section: 'explore' },
  { label: 'Datasets', to: '/datasets', section: 'explore' },
  { label: 'Models', to: '/models', section: 'explore' },
  { label: 'Institutions', to: '/institutions', section: 'explore' },

  { label: 'Breakthroughs', to: '/breakthroughs', section: 'analytics' },
  { label: 'Analytics', to: '/analytics', section: 'analytics' },

  { label: 'Saved Items', to: '/saved', section: 'personal' },
  { label: 'Research Tracker', to: '/tracker', section: 'personal' },
  { label: 'Settings', to: '/settings', section: 'personal' },
]

const SECTION_LABELS: Record<NavItem['section'], string> = {
  main: 'Main',
  explore: 'Explore',
  analytics: 'Analytics',
  personal: 'Personal',
}

export function Sidebar() {
  return (
    <aside className="sdm-sidebar">
      <nav className="sdm-nav">
        {(Object.keys(SECTION_LABELS) as NavItem['section'][]).map((section) => {
          const items = NAV_ITEMS.filter((item) => item.section === section)
          return (
            <div key={section} className="sdm-nav-section">
              <div className="sdm-nav-section-label">{SECTION_LABELS[section]}</div>
              <ul>
                {items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        ['sdm-nav-link', isActive ? 'sdm-nav-link-active' : '']
                          .filter(Boolean)
                          .join(' ')
                      }
                    >
                      <span className="sdm-nav-dot" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

