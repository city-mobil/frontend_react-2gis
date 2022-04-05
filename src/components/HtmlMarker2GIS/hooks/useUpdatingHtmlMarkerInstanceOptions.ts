import { HtmlMarker } from '@2gis/mapgl/global'
import { useEffect } from 'react'

import { GetInstance } from '../../../hooks'
import { HtmlMarkerOptionsWithoutHtml } from '../HtmlMarker2GIS'

/**
 * Установка экземпляру html маркера возможных свойств.
 * @param getInstance Метод получения экземпляра html маркера
 * @param options Опции html маркера (без свойства html)
 */
export const useUpdatingHtmlMarkerInstanceOptions = (
  getInstance: GetInstance<HtmlMarker>,
  options: HtmlMarkerOptionsWithoutHtml,
) => {
  const { coordinates, anchor } = options

  // Установка новых координат в инстанс.
  useEffect(() => {
    const instance = getInstance()

    // если нет инстанса маркера, то выходим
    if (!instance) {
      return
    }

    instance.setCoordinates(coordinates)
  }, [getInstance, coordinates])

  // Установка якоря в инстанс
  useEffect(() => {
    const instance = getInstance()

    if (!instance || anchor === undefined) {
      return
    }

    instance.setAnchor(anchor)
  }, [anchor, getInstance])
}
