import { Polygon, PolygonOptions } from '@2gis/mapgl/global'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { useDynamicObjectEventHandlers } from '../../hooks'
import { DynamicObjectEventHandlerTable } from '../../models'
import { getOptions, isArraysEqual, isOptionsKey } from '../../utils'
import { useMapContext } from '../Map2GIS'

export interface Polygon2GISProps extends PolygonOptions, Partial<DynamicObjectEventHandlerTable> {}

const Polygon2GISComponent: FC<Polygon2GISProps> = (props) => {
  const [polygonInstance, setPolygonInstance] = useState<Polygon | null>(null)
  const [forceReCreateInstance, setForceReCreateInstance] = useState<boolean>(false)
  const polygonOptionsRef = useRef<PolygonOptions>({ coordinates: props.coordinates })
  const prevPolygonOptionsValues = useRef<Array<PolygonOptions[keyof PolygonOptions]>>([])

  const { mapGLBundle, mapInstance } = useMapContext()

  // формируем реф с опциями полигона и проверяем значения пропсов
  useEffect(() => {
    polygonOptionsRef.current = getOptions<PolygonOptions, Polygon2GISProps, string>(props, isOptionsKey)

    const optionsValues = Object.values(polygonOptionsRef.current)

    // Проверяем изменились ли у нас значения пропсов с опциями полигона
    if (!isArraysEqual(optionsValues, prevPolygonOptionsValues.current)) {
      setForceReCreateInstance((current) => !current)
    }

    prevPolygonOptionsValues.current = optionsValues
  }, [props])

  // создаем инстанс полигона
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.Polygon(mapInstance, polygonOptionsRef.current)

    setPolygonInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setPolygonInstance, forceReCreateInstance])

  useDynamicObjectEventHandlers<Polygon2GISProps>(polygonInstance, props)

  return null
}

/**
 * Полигон для 2ГИС карты.
 */
export const Polygon2GIS = memo(Polygon2GISComponent)
