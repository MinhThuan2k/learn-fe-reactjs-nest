import React, { useEffect, useRef } from 'react'

/**
 * Hook to detect clicks outside a specified component.
 *
 * @param {function} callback - The callback function to call when the click is outside.
 * @returns {React.RefObject} - The ref to attach to the component to track outside clicks.
 */
export function hookOutsideClick(
  callback: () => void
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [callback])

  return ref
}
