import { useCallback, useRef } from 'react'

type Instance<T = unknown> = T | null
export type GetInstance<T extends Instance> = () => Instance<T>
export type SetInstance<T extends Instance> = (instance: Instance<T>) => void

/**
 * Хук для работы с экземпляром
 * Возвращает мемоизированные функции (геттер и сеттер).
 * Тем самым при добавлении их в список зависимостей избегаем лишних срабатываний эффекта
 */
export const useInstance = <T>(): [GetInstance<T>, SetInstance<T>] => {
  const instanceRef = useRef<Instance<T>>(null)

  const getInstance = useCallback(() => instanceRef.current, [])

  const setInstance = useCallback((instance: Instance<T>) => {
    instanceRef.current = instance
  }, [])

  return [getInstance, setInstance]
}
