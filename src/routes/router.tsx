import DashboardLayout from '@/components/layouts/DashboardLayout'
import { AuthMiddleware } from '@/core/middleware/AuthMiddleware'
import { GuestMiddleware } from '@/core/middleware/GuestMiddleware'
import AccountInfosEdit from '@/pages/AccountInfos/AccountInfosEdit'
import AccountInfos from '@/pages/AccountInfos/AccountInfosView'
import { LoginPage } from '@/pages/auth/LoginPage'
import BoardPage from '@/pages/Projects/BoardPage'
import { createBrowserRouter } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    Component: () => (
      <GuestMiddleware>
        <LoginPage />
      </GuestMiddleware>
    )
  },
  {
    path: 'projects',
    Component: () => (
      <AuthMiddleware>
        <DashboardLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        index: true,
        path: ':projectId',
        Component: BoardPage
      },
      {
        path: 'board',
        Component: AccountInfos
      }
    ]
  },
  {
    path: 'account-info',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        path: '',
        Component: AccountInfos
      },
      {
        index: false,
        path: 'edit',
        Component: AccountInfosEdit
      }
    ]
  }
]

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
})
