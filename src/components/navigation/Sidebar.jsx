import clsx from 'clsx'
import { useState } from 'react'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isHover, setIsHover] = useState(false)
  const handleClickOpen = () => setIsOpen(!isOpen)
  const handleHover = () => setIsHover(true)
  const handleHoverOut = () => setIsHover(false)

  return (
    <div className='relative h-screen flex items-center mr-0'>
      <div
        className={clsx(
          'flex flex-col items-center h-full overflow-y-auto text-gray-700 bg-white rounded',
          isOpen ? 'w-40' : 'w-full'
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseOver={handleHover}
        onMouseOut={handleHoverOut}
      >
        <div
          className='absolute top-0 right-0 mt-11 -mr-2 z-100'
          hidden={!isHover}
        >
          <button
            className='flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full'
            onClick={handleClickOpen}
          >
            <i
              className={clsx(
                isOpen ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right'
              )}
            />
          </button>
        </div>
        <a className='flex items-center w-full px-3 mt-3' href='#'>
          <svg
            className='w-8 h-8 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z'></path>
          </svg>
          <span className='ml-2 text-sm font-bold' hidden={!isOpen}>
            The App
          </span>
        </a>
        <div className='w-full px-2'>
          <div className='flex flex-col items-center w-full mt-3 border-t border-gray-300'>
            <a
              className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Dashboard
              </span>
            </a>
            <a
              className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Search
              </span>
            </a>
            <a
              className='flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Insights
              </span>
            </a>
            <a
              className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Docs
              </span>
            </a>
          </div>
          <div className='flex flex-col items-center w-full mt-2 border-t border-gray-300'>
            <a
              className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Products
              </span>
            </a>
            <a
              className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Settings
              </span>
            </a>
            <a
              className='relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
              href='#'
            >
              <svg
                className='w-6 h-6 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                ></path>
              </svg>
              <span className='ml-2 text-sm font-medium' hidden={!isOpen}>
                Messages
              </span>
              <span className='absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full'></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
