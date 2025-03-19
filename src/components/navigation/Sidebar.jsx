import clsx from 'clsx'
import {
  AlignStartVertical,
  BadgeAlert,
  CalendarDays,
  ChartLine,
  ChartNoAxesGantt,
  ChevronLeft,
  ChevronRight,
  Code,
  Columns3,
  FileText,
  Goal,
  Lightbulb,
  List,
  SquareLibrary
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true)
  const [sideBars, setSideBars] = useState([
    {
      title: 'PLANNING',
      open: true,
      children: [
        { title: 'Summary', icon: FileText },
        { title: 'Timeline', icon: ChartNoAxesGantt },
        { title: 'Backlog', icon: AlignStartVertical },
        { title: 'Board', icon: Columns3 },
        { title: 'Calendar', icon: CalendarDays },
        { title: 'List', icon: List },
        { title: 'Reports', icon: ChartLine },
        { title: 'Forms', icon: SquareLibrary },
        { title: 'Goals', icon: Goal },
        { title: 'Issues', icon: BadgeAlert }
      ]
    },
    {
      title: 'DEVELOPMENT',
      open: true,
      children: [
        { title: 'Development', icon: Lightbulb },
        { title: 'Code', icon: Code }
      ]
    }
  ])

  const handleOpenIndex = (index) => {
    setSideBars((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    )
  }

  return (
    <div className='relative h-screen flex items-center border-r-2 shadow-xs overflow-visible z-10 border-r-gray-200 top-1 max-lg:top-0 max-lg:mr-5 max-lg:border-none'>
      <div
        className={clsx(
          'flex flex-col items-center h-full overflow-y-auto text-gray-700 bg-gray-50 rounded transition-all duration-500 z-10 max-lg:rounded-none max-lg:absolute max-lg:overflow-visible max-lg:shadow-xs max-lg:border-r-2 max-lg:border-r-gray-200',
          isOpen ? 'w-48' : 'w-5'
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className='absolute top-5 right-[-12px]'>
          <button
            className='flex items-center justify-center w-6 h-6 bg-white text-gray-400 border border-gray-300 hover:bg-blue-500 hover:text-white rounded-full shadow-md cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronLeft size={18} strokeWidth={3} className='pl-0' />
            ) : (
              <ChevronRight size={18} strokeWidth={3} className='pl-0.5' />
            )}
          </button>
        </div>
        {isOpen ? (
          <div className='w-full'>
            <div className='flex items-center justify-start w-full h-10 px-3 py-10'>
              <img
                src='https://mekshipteam.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10408?size=xxlarge'
                alt='img-project'
                className='w-6'
              />
              <div className='ml-3 mt-2 h-6 whitespace-nowrap'>
                <h2 className='text-xs font-bold leading-0.5'>VTH-WMS</h2>
                <span className='text-xs'>Software project</span>
              </div>
            </div>
            <div className='w-full pl-2 whitespace-nowrap'>
              {sideBars.map((sideBar, sideBarKey) => (
                <div className='w-full mt-3' key={sideBarKey}>
                  <span
                    className='text-[11px] font-medium cursor-pointer'
                    onClick={() => handleOpenIndex(sideBarKey)}
                  >
                    <i className='fa-solid fa-angle-down pl-1' />{' '}
                    {sideBar.title}
                  </span>
                  <div
                    className='flex flex-col items-center'
                    hidden={!sideBar.open}
                  >
                    {sideBar.children.map((child, childKey) => (
                      <Link
                        className='flex items-center w-full h-10 px-3 rounded hover:bg-blue-100'
                        key={childKey}
                        to={'#'}
                      >
                        <child.icon size={20} />
                        <span className='ml-2 text-sm'>{child.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='w-10 h-full px-3 py-10'></div>
        )}
      </div>
    </div>
  )
}
