import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="sdm-app-shell">
      {sidebarOpen && <Sidebar />}
      <div className="sdm-app-main">
        <Topbar onToggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="sdm-app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

