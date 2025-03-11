import Nav from '@/components/navigation/Nav'
import SideBar from '@/components/navigation/Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className='w-screen h-screen m-0 flex flex-col overflow-hidden'>
      <div className='fixed w-full z-10'>
        <Nav />
      </div>
      <div className='flex flex-1 overflow-hidden pt-14 bg-white'>
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}
