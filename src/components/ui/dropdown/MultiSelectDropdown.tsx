import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
// import { ChevronDown } from 'lucide-react'

interface Option {
  [key: string]: any
}

interface MultiSelectDropdownProps {
  fieldValue: string
  fieldTitle: string
  options: Option[]
  defaultValue?: []
  onChange: any
  title: string
  width?: string
  icon?: React.ReactNode
  styleTitle?: string
}

export default function MultiSelectDropdown({
  fieldValue,
  fieldTitle,
  options = [],
  defaultValue = [],
  onChange,
  title,
  width,
  icon,
  styleTitle
}: MultiSelectDropdownProps) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hoveredText, setHoveredText] = useState<any>('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: Option
  ) => {
    const isChecked = e.target.checked

    setSelectedOptions((prevSelected) => {
      let newSelectedOptions
      if (isChecked) {
        newSelectedOptions = [...prevSelected, option]
      } else {
        newSelectedOptions = prevSelected.filter(
          (item) =>
            (fieldValue ? item[fieldValue] : item) !==
            (fieldValue ? option[fieldValue] : option)
        )
      }

      onChange(newSelectedOptions)
      return newSelectedOptions
    })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative w-full h-full' ref={dropdownRef}>
      <div
        className={clsx(
          'cursor-pointer font-medium min-w-max h-full px-2 py-1 flex items-center justify-between',
          {
            'bg-blue-100 text-blue-700': isOpen,
            'hover:bg-gray-100': !isOpen
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styleTitle}>{title}</span>
        {icon ? icon : <i className='fa-solid fa-angle-down pl-1' />}
      </div>
      {isOpen && options.length > 0 && (
        <div
          className={clsx(
            'absolute min-w-36 mt-1 pb-2 bg-white z-10 max-h-48 overflow-y-auto shadow-2xl',
            { 'max-w-40': !width }
          )}
        >
          {options.map((option, index) => (
            <label
              key={index}
              className='flex items-center p-2 pl-3 hover:bg-gray-100 cursor-pointer relative border-l-2 border-transparent hover:border-blue-700'
              onMouseEnter={() => setHoveredText(option)}
              onMouseLeave={() => setHoveredText('')}
            >
              <input
                type='checkbox'
                checked={
                  selectedOptions.some(
                    (option1) =>
                      (fieldValue ? option1[fieldValue] : option1) ===
                      (fieldValue ? option[fieldValue] : option)
                  ) || false
                }
                onChange={(e) => handleChange(e, option)}
                value={fieldValue ? option[fieldValue] : option}
                className='mr-2 focus:outline-none focus:ring-0 focus:ring-blue-500'
              />
              <span className='truncate max-w-48'>
                {fieldTitle ? option[fieldTitle] : option}
                {hoveredText === option && (
                  <div className='absolute right-0 bg-gray-700 text-white text-xs px-2 py-1'>
                    {fieldTitle ? option[fieldTitle] : option}
                  </div>
                )}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
