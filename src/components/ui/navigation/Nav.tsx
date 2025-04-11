import '@fortawesome/fontawesome-free/css/all.min.css'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Popup from '../popups/Popup'
import { useState, useCallback } from 'react'
import { ChevronRight, Star } from 'lucide-react'
import { useOutsideClick } from '@/hooks/hooks'

interface NavData {
  title: string
  path: string
  props?: any[]
}

interface Project {
  code: string
  sub_name: string
  image: string
}

export default function Nav() {
  const location = useLocation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false)

  const navData: NavData[] = [
    { title: 'Your word', path: '/your-word' },
    { title: 'Projects', path: '/projects', props: [] },
    { title: 'Filter', path: '/filter' },
    { title: 'Dashboards', path: '/dashboard' },
    { title: 'Teams', path: '/teams' },
    { title: 'Apps', path: '/' }
  ]

  const projects: Project[] = [
    {
      code: 'VTH-WMS',
      sub_name: 'Software project',
      image:
        'https://mekshipteam.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10408?size=xxlarge'
    },
    {
      code: 'VTH-TMS',
      sub_name: 'Software project',
      image:
        'https://mekshipteam.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10408?size=xxlarge'
    }
  ]

  const dropdownRef = useOutsideClick(() => setIsMoreOpen(false))

  const handleToggleMore = useCallback(() => {
    setIsMoreOpen((prevState) => !prevState)
  }, [])

  return (
    <div className='w-screen mx-auto flex'>
      <div className='w-full'>
        <div className='flex items-center justify-between gap-1 px-5 text-[#42526E] rounded-tl-lg rounded-tr-lg border-b-2 shadow-xs border-b-gray-200 font-medium'>
          <div className='flex gap-1 items-center'>
            <span className='px-2 cursor-pointer'>
              <i className='fa-solid fa-list inline'></i>
            </span>
            <span className='cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded py-2 pr-2'>
              <svg
                fill='none'
                height='24'
                viewBox='0 0 77 32'
                focusable='false'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='#357DE8'
                  d='M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z'
                ></path>
                <path
                  fill='var(--ds-text, #253858)'
                  d='M65.023 17.874c0 3.68 1.472 5.52 4.202 5.52 2.36 0 4.477-1.503 4.477-4.907V17.26c0-3.404-1.932-4.906-4.17-4.906-2.975 0-4.509 1.962-4.509 5.52m8.679 7.666v-2.76c-.981 2.024-2.821 3.067-5.183 3.067-4.078 0-6.133-3.465-6.133-7.973 0-4.324 2.147-7.974 6.44-7.974 2.239 0 3.956 1.012 4.876 3.006v-2.699h2.637V25.54zM55.91 16.493v9.047h-2.577V10.207h2.576v2.698c.89-1.809 2.423-3.097 5.428-2.913v2.576c-3.373-.337-5.428.675-5.428 3.925M46.224 6.159c0-1.165.767-1.84 1.84-1.84s1.84.675 1.84 1.84-.767 1.84-1.84 1.84-1.84-.675-1.84-1.84m.49 19.381V10.207h2.638V25.54zm-6.427-5.95V5.393h2.76v14.015c0 3.71-1.626 6.256-5.428 6.256-1.442 0-2.546-.246-3.312-.522v-2.668c.828.338 1.84.522 2.852.522 2.33 0 3.128-1.41 3.128-3.404'
                ></path>
              </svg>
            </span>

            <div className='relative'>
              <button
                className='lg:hidden cursor-pointer text-white text-sm px-2 py-1 bg-gray-400 rounded-xs whitespace-nowrap'
                onClick={handleToggleMore}
              >
                More +
              </button>
              <div
                className={clsx(
                  'absolute bg-gray-50 z-50 shadow-2xl lg:relative lg:flex min-w-max',
                  { hidden: !isMoreOpen }
                )}
                ref={dropdownRef}
              >
                {navData.map((item, index) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path)
                  const isOpen = openIndex === index

                  return (
                    <div
                      className={clsx(
                        'py-2 max-lg:py-1',
                        isActive
                          ? 'border-b-3 border-blue-700 font-semibold text-blue-700 min-h-max max-lg:border-none max-lg:text-gray-600'
                          : 'text-gray-600'
                      )}
                      key={index}
                    >
                      <div
                        className='w-full flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:bg-gray-200 p-1 py-0'
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span
                          className={clsx(
                            'w-full text-[13px] font-medium block py-1.5'
                          )}
                        >
                          {item.title}
                        </span>
                        <ChevronRight size={20} className='pl-1 font-medium' />
                      </div>
                      <Popup isOpenProp={isOpen}>
                        <span className='text-xs text-[#42526E] ml-5'>
                          Recent
                        </span>
                        <div className='flex flex-col items-center cursor-pointer w-60 mt-2'>
                          {projects.map((project) => (
                            <Link
                              className='group flex items-center justify-between gap-2 w-full min-w-max pb-2 text-[#42526E] hover:bg-gray-200'
                              to={`/projects/${project.code}`}
                              key={project.code}
                            >
                              <div className='h-6 w-full flex items-center pl-5 mt-2 gap-2'>
                                <img
                                  src={project.image}
                                  alt='img-project'
                                  className='h-full object-cover'
                                />
                                <div className='flex flex-col gap-0'>
                                  <span className='text-xs'>
                                    {project.code}
                                  </span>
                                  <span className='text-xs text-[#8a92a0]'>
                                    {project.sub_name}
                                  </span>
                                </div>
                              </div>
                              <Star
                                size={18}
                                className='mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                              />
                            </Link>
                          ))}
                        </div>
                      </Popup>
                    </div>
                  )
                })}
              </div>
            </div>

            <span className='cursor-pointer text-white text-sm py-2'>
              <button className='py-1 px-2 bg-blue-600 rounded-xs'>
                Create
              </button>
            </span>
          </div>
          <div className='w-auto flex flex-row items-center gap-2 float-right cursor-pointer'>
            <div className='relative text-[#6B778C]'>
              <input
                type='text'
                placeholder='Search'
                className='max-w-40 border border-[#6B778C] rounded-xs pl-6 p-1 text-sm focus:outline-none focus:border-blue-700 transition-all duration-200'
              />
              <i className='fa-solid fa-magnifying-glass absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-[#6B778C]'></i>
            </div>
            <span className='relative float-right cursor-pointer hover:text-gray-700'>
              <i className='text-lg fas fa-bell p-2' />
              <span className='absolute -right-2 top-0 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full'>
                3
              </span>
            </span>
            <span className='cursor-pointer'>
              <i className='text-lg fa-solid fa-circle-question p-2' />
            </span>
            <span className='cursor-pointer'>
              <i className='text-lg fa-solid fa-gear p-2' />
            </span>
            <a className='w-6 h-6 rounded-full bg-green-600 text-[10px] text-white text-center p-1 cursor-pointer'>
              TL
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
