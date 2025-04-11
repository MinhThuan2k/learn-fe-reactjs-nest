import { useOutsideClick } from '@/hooks/hooks'
import clsx from 'clsx'
import { memo, useEffect, useState, ReactNode } from 'react'

interface PopupProps {
  children: ReactNode
  width?: string
  isOpenProp: boolean
  [key: string]: any
}

export default memo(function Popup({
  children,
  width,
  isOpenProp,
  ...props
}: PopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenProp)

  const dropdownRef = useOutsideClick(() => setIsOpen(false))

  useEffect(() => setIsOpen(isOpenProp), [isOpenProp])

  return (
    isOpen && (
      <div
        className='relative z-100 min-w-36 bg-blue px-2'
        ref={dropdownRef}
        {...props}
      >
        <div
          className={clsx(
            'absolute min-w-36 mt-1 py-2 bg-white shadow-2xl z-110',
            { 'max-w-max': !width }
          )}
          style={width ? { width } : {}}
        >
          {children}
        </div>
      </div>
    )
  )
})
