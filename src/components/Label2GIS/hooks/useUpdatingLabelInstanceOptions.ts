import { Label, LabelOptions } from '@2gis/mapgl/global'
import { useEffect } from 'react'

import { GetInstance } from '../../../hooks'

/**
 * Установка экземпляру метки возможных свойств.
 * @param getInstance Метод получения экземпляра
 * @param options Опции
 */
export const useUpdatingLabelInstanceOptions = (getInstance: GetInstance<Label>, options: LabelOptions) => {
  const { coordinates } = options

  // Установка новых координат в инстанс.
  useEffect(() => {
    const instance = getInstance()

    // если нет инстанса, то выходим
    if (!instance) {
      return
    }

    instance.setCoordinates(coordinates)
  }, [getInstance, coordinates])
}
