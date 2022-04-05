import { useEffect, useRef, useState } from 'react'

import { isArraysEqual } from '../utils'

/**
 * Хук определяет необходимость пересоздания экземпляра объекта карты в зависимости от изменения пропсов компонента,
 * использующего его. Отслеживаются только пропсы для которых у инстанса отсутствуют сеттеры.
 * @param setterlessPropsKeys Массив ключей пропсов (опции объекта карты), для которых у инстанса отсутствуют сеттеры (константа)
 * @param options Опции объекта карты
 */
export const useReCreateInstanceWithSetterlessProps = <OptionsType>(
  options: OptionsType,
  setterlessPropsKeys: Array<keyof OptionsType>,
) => {
  const [state, setState] = useState<boolean>(false)
  const prevSetterlessOptionsValues = useRef<Array<OptionsType[keyof OptionsType]>>([])

  // Смотрим, изменились ли значения пропсов для которых у инстанса отсутствуют сеттеры
  useEffect(() => {
    // пропсы для которых у инстанса отсутствуют сетторы
    const setterlessOptionsValues = []

    for (let i = 0; i < setterlessPropsKeys.length; i++) {
      // value имеет тип any, разрешаем это, т.к. не получается вывести корректный тип
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = options[setterlessPropsKeys[i]]

      if (value === undefined) {
        continue
      }

      setterlessOptionsValues.push(value)
    }

    // Проверяем изменились ли у нас значения пропсов для которых у инстанса отсутствуют сеттеры
    if (!isArraysEqual(setterlessOptionsValues, prevSetterlessOptionsValues.current)) {
      setState((current) => !current)
    }

    prevSetterlessOptionsValues.current = setterlessOptionsValues
  }, [options, setterlessPropsKeys])

  return state
}
