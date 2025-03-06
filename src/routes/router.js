import AccountInfoLayout from '@/layouts/AccountInfoLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AccountInfosEdit from '@/pages/AccountInfos/AccountInfosEdit'
import AccountInfos from '@/pages/AccountInfos/AccountInfosView'
import BoardPage from '@/pages/Projects/BoardPage'

export const routes = [
  {
    path: '/',
    element: DashboardLayout,
    children: [
      {
        index: true,
        path: '/',
        element: BoardPage
      },
      {
        path: '/board',
        element: AccountInfos
      }
    ]
  },
  {
    path: '/account-info',
    element: AccountInfoLayout,
    children: [
      {
        index: true,
        path: '',
        element: AccountInfos
      },
      {
        index: false,
        path: 'edit',
        element: AccountInfosEdit
      }
    ]
  }
]
