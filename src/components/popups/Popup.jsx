import { useOutsideClick } from '@/hooks/hooks'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'

export default memo(function Popup({ children, ...props }) {
  const { width, isOpenProp } = props
  const [isOpen, setIsOpen] = useState(isOpenProp)

  const dropdownRef = useOutsideClick(() => setIsOpen(false))

  useEffect(() => setIsOpen(isOpenProp), [isOpenProp])

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
        {children}
      </div>
    </div>
  )
})
