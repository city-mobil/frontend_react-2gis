import { CircleMarker, CircleMarkerOptions } from '@2gis/mapgl/global'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { useDynamicObjectEventHandlers, useReCreateInstance } from '../../hooks'
import { DynamicObjectEventHandlerTable } from '../../models'
import { getOptions, isOptionsKey } from '../../utils'
import { useMapContext } from '../Map2GIS'

export interface CircleMarker2GISProps extends CircleMarkerOptions, Partial<DynamicObjectEventHandlerTable> {}

const CircleMarker2GISComponent: FC<CircleMarker2GISProps> = (props) => {
  const { coordinates, radius } = props

  const circleMarkerOptionsRef = useRef<CircleMarkerOptions>({ coordinates, radius })

  const { mapGLBundle, mapInstance } = useMapContext()
  const [circleMarkerInstance, setCircleMarkerInstance] = useState<CircleMarker | null>(null)

  // формируем реф с опциями окружности и проверяем значения пропсов
  useEffect(() => {
    circleMarkerOptionsRef.current = getOptions<CircleMarkerOptions, CircleMarker2GISProps, string>(props, isOptionsKey)
  }, [props])

  const forceReCreateInstance = useReCreateInstance<CircleMarkerOptions>(circleMarkerOptionsRef.current)

  // создаем инстанс окружности
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.CircleMarker(mapInstance, circleMarkerOptionsRef.current)

    setCircleMarkerInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setCircleMarkerInstance, forceReCreateInstance])

  useDynamicObjectEventHandlers<CircleMarker2GISProps>(circleMarkerInstance, props)

  return null
}

/**
 * Круглый маркер для 2ГИС карты.
 * CircleMarker отличается от Circle тем, что имеет радиус в пикселях,
 * поэтому его экземпляр отображается одинаково при любом уровне масштабирования.
 */
export const CircleMarker2GIS = memo(CircleMarker2GISComponent)
