import App from '@/App'
import AccountInfoLayout from '@/layouts/AccountInfoLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AccountInfosEdit from '@/pages/AccountInfos/AccountInfosEdit'
import AccountInfos from '@/pages/AccountInfos/AccountInfosView'
import BoardPage from '@/pages/Projects/BoardPage'
import { createBrowserRouter } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    Component: App
  },
  {
    path: '/projects',
    Component: DashboardLayout,
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
    path: '/account-info',
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
