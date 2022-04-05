import { useCallback, useEffect, useRef } from 'react'

/**
 * Хук возвращает текущее состояние "компонент размонтирован"?
 */
export const useIsUnmounted = () => {
  const unmounted = useRef(false)

  useEffect(() => {
    return () => {
      unmounted.current = true
    }
  }, [])

  return useCallback(() => unmounted.current, [])
}
