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
        <div className='flex flex-1 flex-col overflow-hidden border-l border-gray-200'>
          <div className='w-full h-40 bg-white'></div>
          <div className='flex-1 flex overflow-auto bg-white'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
