import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { OverviewPage } from '../pages/OverviewPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ResearchFeedPage } from '../pages/ResearchFeedPage'
import { GlobalMapPage } from '../pages/GlobalMapPage'
import { TopicExplorerPage } from '../pages/TopicExplorerPage'
import { DatasetsPage } from '../pages/DatasetsPage'
import { ModelsPage } from '../pages/ModelsPage'
import { InstitutionsPage } from '../pages/InstitutionsPage'
import { BreakthroughsPage } from '../pages/BreakthroughsPage'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { SavedItemsPage } from '../pages/SavedItemsPage'
import { ResearchTrackerPage } from '../pages/ResearchTrackerPage'
import { SettingsPage } from '../pages/SettingsPage'

export const appRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <OverviewPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/feed', element: <ResearchFeedPage /> },
      { path: '/map', element: <GlobalMapPage /> },
      { path: '/topics', element: <TopicExplorerPage /> },
      { path: '/datasets', element: <DatasetsPage /> },
      { path: '/models', element: <ModelsPage /> },
      { path: '/institutions', element: <InstitutionsPage /> },
      { path: '/breakthroughs', element: <BreakthroughsPage /> },
      { path: '/analytics', element: <AnalyticsPage /> },
      { path: '/saved', element: <SavedItemsPage /> },
      { path: '/tracker', element: <ResearchTrackerPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
]

