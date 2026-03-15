import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'

export function MainLayout() {
  return (
    <div className="sdm-app-shell">
      <Sidebar />
      <div className="sdm-app-main">
        <Topbar />
        <main className="sdm-app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

