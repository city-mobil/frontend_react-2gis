import { MarkerOptions } from '@2gis/mapgl/global'
import { Marker } from '@2gis/mapgl/types'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { useDynamicObjectEventHandlers, useReCreateInstanceWithSetterlessProps } from '../../hooks'
import { DynamicObjectEventHandlerTable } from '../../models'
import { getOptions, isOptionsKey } from '../../utils'
import { useMapContext } from '../Map2GIS'
import { SETTERLESS_PROPS_KEYS } from './constants'
import { useUpdatingMarkerInstanceOptions } from './hooks/useUpdatingMarkerInstanceOptions'

export interface Marker2GISProps extends MarkerOptions, Partial<DynamicObjectEventHandlerTable> {}

const Marker2GISComponent: FC<Marker2GISProps> = (props) => {
  const [markerInstance, setMarkerInstance] = useState<Marker | null>(null)
  const markerOptionsRef = useRef<MarkerOptions>({ coordinates: props.coordinates })

  const { mapGLBundle, mapInstance } = useMapContext()

  // формируем реф с опциями маркера
  useEffect(() => {
    markerOptionsRef.current = getOptions<MarkerOptions, Marker2GISProps, string>(props, isOptionsKey)
  }, [props])

  // Обновляем опции через сеттеры инстанса
  useUpdatingMarkerInstanceOptions(markerInstance, markerOptionsRef.current)

  const forceReCreateInstance = useReCreateInstanceWithSetterlessProps<MarkerOptions>(
    markerOptionsRef.current,
    SETTERLESS_PROPS_KEYS,
  )

  // создаем инстанс маркера
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.Marker(mapInstance, markerOptionsRef.current)

    setMarkerInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setMarkerInstance, forceReCreateInstance])

  useDynamicObjectEventHandlers<Marker2GISProps>(markerInstance, props)

  return null
}

/**
 * Маркер для 2ГИС карты.
 */
export const Marker2GIS = memo(Marker2GISComponent)
