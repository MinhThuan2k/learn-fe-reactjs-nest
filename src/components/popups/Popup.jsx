import clsx from 'clsx'
import { Star } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import { ChevronDown } from 'lucide-react'

export default memo(function Popup({ ...props }) {
  const { title, width, isOpenProp } = props
  const [isOpen, setIsOpen] = useState(isOpenProp)
  const dropdownRef = useRef(null)

  const projects = [
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className='relative z-100 min-w-36h-full bg-blue px-2'
      ref={dropdownRef}
      hidden={!isOpen}
    >
      <div
        className={clsx(
          'absolute min-w-36 mt-1 py-2 bg-white shadow-2xl z-110',
          { 'max-w-max': !width }
        )}
        style={width ? { width: width } : null}
      >
        <span className='text-xs text-[#42526E] ml-5'>{title}</span>
        <div className='flex flex-col items-center cursor-pointer w-60 mt-2'>
          {projects.map((item) => (
            <Link
              className='group flex items-center justify-between gap-2 w-full min-w-max pb-2 text-[#42526E] hover:bg-gray-200'
              to={`/projects/${item.code}`}
              key={item.code}
            >
              <div className='h-6 w-full flex items-center pl-5 mt-2 gap-2'>
                <img
                  src={item.image}
                  alt='img-project'
                  className='h-full object-cover'
                />
                <div className='flex flex-col gap-0'>
                  <span className='text-xs'>{item.code}</span>
                  <span className='text-xs text-[#8a92a0]'>
                    {item.sub_name}
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
        <div className='mt-2 pt-2 text-sm text-[#42526E] font-semibold border-t-2 border-gray-200'>
          <span className='w-full py-1 pl-4 text-xs text-left'>
            INCLUDED FREE WITH YOUR PLAN
          </span>
          <div
            className='flex items-center justify-between gap-2 w-full min-w-max pb-2 mt-3 text-[#42526E] hover:bg-gray-200'
            href='#'
            hidden={!isOpen}
          >
            <div className='h-6 w-full flex items-center mt-2 pl-5 gap-2'>
              <img
                src='https://mekshipteam.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10408?size=xxlarge'
                alt='img-project'
                className='h-full object-cover'
              />
              <div className='flex flex-col gap-0'>
                <span className='text-xs'>VTH-WMS</span>
                <span className='text-xs text-[#8a92a0]'>Software project</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-2 pt-2 text-sm text-[#42526E] font-semibold border-t-2 border-gray-200'>
          <button className='w-full py-1 pl-4 text-left hover:bg-gray-200'>
            View all projects
          </button>
          <button className='w-full py-1 pl-4 text-left hover:bg-gray-200'>
            Create project
          </button>
        </div>
      </div>
    </div>
  )
})
