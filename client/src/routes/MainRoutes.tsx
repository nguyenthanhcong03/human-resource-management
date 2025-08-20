import { lazy } from 'react'

// project imports
import Loadable from '@/components/Loadable'
import DashboardLayout from '@/layout/Dashboard'
import ProtectedRoute from './guards/ProtectedRoute'
import EmployeePage from '@/pages/dashboard/employee/EmployeePage'
import Login from '@/pages/auth/Login'
import path from 'path'

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('@/pages/dashboard/default')))

// render - color
const Color = Loadable(lazy(() => import('@/pages/component-overview/color')))
const Typography = Loadable(lazy(() => import('@/pages/component-overview/typography')))
const Shadow = Loadable(lazy(() => import('@/pages/component-overview/shadows')))

// render - sample page
const SamplePage = Loadable(lazy(() => import('@/pages/extra-pages/sample-page')))
const CreateEmployee = Loadable(lazy(() => import('@/pages/dashboard/employee/components/CreateEmployee')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute requireAuth roles={['admin', 'manager', 'employee']}>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'employee',
      element: <EmployeePage />
    },
    {
      path: 'employee/create',
      element: <CreateEmployee />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
}

export default MainRoutes
