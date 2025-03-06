import '@fortawesome/fontawesome-free/css/all.min.css'
export default function Nav() {
  return (
    <div className='w-screen mx-auto flex flex-wrap'>
      <div className='w-full'>
        <div className='p-3 text-gray-900 bg-white rounded-tl-lg rounded-tr-lg shadow-lg font-medium capitalize'>
          <span className='px-2 mr-2 border-r border-gray-800'>
            <img
              src='https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png'
              alt='alt placeholder'
              className='w-8 h-8 -mt-1 inline mx-auto'
            />
          </span>
          <span className='px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded mb-5'>
            <i className='w-8 fas fa-stream p-2 bg-gray-200 rounded-full' />
            <span className='mx-1'>categories</span>
          </span>
          <span className='px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded mb-5'>
            <i className='w-8 fas fa-th p-2 bg-gray-200 rounded-full' />
            <span className='mx-1'>menu</span>
          </span>
          <span className='px-1 cursor-pointer hover:text-gray-700'>
            <i className='fas fa-search p-2 bg-gray-200 rounded-full' />
          </span>
          <span className='px-1 cursor-pointer hover:text-gray-700'>
            <i className='w-8 fas fa-calendar-alt p-2 bg-gray-200 rounded-full' />
          </span>
          <div className='w-auto flex flex-row float-right cursor-pointer'>
            <span className='w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700'>
              <i className='w-8 fas fa-bell p-2 bg-gray-200 rounded-full' />
              <span className='absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full'>
                3
              </span>
            </span>
            <span className='w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700'>
              <i className='w-8 fas fa-user p-2 bg-gray-200 rounded-full' />
              <span className='absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full'>
                3
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
