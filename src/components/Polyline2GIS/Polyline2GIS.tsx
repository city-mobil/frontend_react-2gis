import { Polyline, PolylineOptions } from '@2gis/mapgl/global'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { useDynamicObjectEventHandlers } from '../../hooks'
import { DynamicObjectEventHandlerTable } from '../../models'
import { getOptions, isArraysEqual, isOptionsKey } from '../../utils'
import { useMapContext } from '../Map2GIS'

export interface Polyline2GISProps extends PolylineOptions, Partial<DynamicObjectEventHandlerTable> {}

const Polyline2GISComponent: FC<Polyline2GISProps> = (props) => {
  const [forceReCreateInstance, setForceReCreateInstance] = useState<boolean>(false)
  const polylineOptionsRef = useRef<PolylineOptions>({ coordinates: props.coordinates })
  const prevPolylineOptionsValues = useRef<Array<PolylineOptions[keyof PolylineOptions]>>([])

  const { mapGLBundle, mapInstance } = useMapContext()
  const [polylineInstance, setPolylineInstance] = useState<Polyline | null>(null)

  // формируем реф с опциями полилинии и проверяем значения пропсов
  useEffect(() => {
    polylineOptionsRef.current = getOptions<PolylineOptions, Polyline2GISProps, string>(props, isOptionsKey)

    const optionsValues = Object.values(polylineOptionsRef.current)

    // Проверяем изменились ли у нас значения пропсов с опциями полилинии
    if (!isArraysEqual(optionsValues, prevPolylineOptionsValues.current)) {
      setForceReCreateInstance((current) => !current)
    }

    prevPolylineOptionsValues.current = optionsValues
  }, [props])

  // создаем инстанс полилинии
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.Polyline(mapInstance, polylineOptionsRef.current)

    setPolylineInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setPolylineInstance, forceReCreateInstance])

  useDynamicObjectEventHandlers<Polyline2GISProps>(polylineInstance, props)

  return null
}

/**
 * Полилиния для 2ГИС карты.
 */
export const Polyline2GIS = memo(Polyline2GISComponent)
