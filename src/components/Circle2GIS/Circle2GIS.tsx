import { Circle, CircleOptions } from '@2gis/mapgl/global'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { useDynamicObjectEventHandlers, useReCreateInstance } from '../../hooks'
import { DynamicObjectEventHandlerTable } from '../../models'
import { getOptions, isOptionsKey } from '../../utils'
import { useMapContext } from '../Map2GIS'

export interface Circle2GISProps extends CircleOptions, Partial<DynamicObjectEventHandlerTable> {}

const Circle2GISComponent: FC<Circle2GISProps> = (props) => {
  const { coordinates, radius } = props

  const [circleInstance, setCircleInstance] = useState<Circle | null>(null)
  const circleOptionsRef = useRef<CircleOptions>({ coordinates, radius })

  const { mapGLBundle, mapInstance } = useMapContext()

  // формируем реф с опциями окружности и проверяем значения пропсов
  useEffect(() => {
    circleOptionsRef.current = getOptions<CircleOptions, Circle2GISProps, string>(props, isOptionsKey)
  }, [props])

  const forceReCreateInstance = useReCreateInstance<CircleOptions>(circleOptionsRef.current)

  // создаем инстанс окружности
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.Circle(mapInstance, circleOptionsRef.current)

    setCircleInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setCircleInstance, forceReCreateInstance])

  useDynamicObjectEventHandlers<Circle2GISProps>(circleInstance, props)

  return null
}

/**
 * Окружность для 2ГИС карты.
 */
export const Circle2GIS = memo(Circle2GISComponent)
