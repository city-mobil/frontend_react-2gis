import { useReducer } from 'react'

/**
 * Хук принудительно обновляет компонент.
 */
export const useForceUpdate = () => {
  // используем useReducer, а не useState, чтобы не оборачивать setState((current) => !current) в useCallback
  const [, forceUpdate] = useReducer((current) => !current, true)

  return forceUpdate
}
