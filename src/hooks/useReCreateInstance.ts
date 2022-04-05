import { useEffect, useRef, useState } from 'react'

import { isArraysEqual } from '../utils'

/**
 * Хук определяет необходимость пересоздания экземпляра объекта карты в зависимости от изменения пропсов компонента,
 * использующего его.
 * @param options Опции объекта карты
 */
export const useReCreateInstance = <OptionsType>(options: OptionsType) => {
  const [state, setState] = useState<boolean>(false)
  const prevOptionsValues = useRef<Array<OptionsType[keyof OptionsType]>>([])

  // Смотрим, изменились ли значения пропсов для которых у инстанса отсутствуют сеттеры
  useEffect(() => {
    const optionsValues = Object.values(options)

    // Проверяем изменились ли у нас значения пропсов с опциями
    if (!isArraysEqual(optionsValues, prevOptionsValues.current)) {
      setState((current) => !current)
    }

    prevOptionsValues.current = optionsValues as Array<OptionsType[keyof OptionsType]>
  }, [options])

  return state
}
