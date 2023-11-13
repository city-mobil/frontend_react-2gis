import { MarkerOptions } from '@2gis/mapgl/global'
import { Marker } from '@2gis/mapgl/types'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'

import { useDynamicObjectEventHandlers, useForceUpdate, useReCreateInstanceWithSetterlessProps } from '../../hooks'
import { DynamicObjectEventHandlerTable } from '../../models'
import { defer, getOptions, isOptionsKey } from '../../utils'
import { useMapContext } from '../Map2GIS'
import { SETTERLESS_PROPS_KEYS } from './constants'
import { useUpdatingMarkerInstanceOptions } from './hooks/useUpdatingMarkerInstanceOptions'

export interface Marker2GISProps extends MarkerOptions, Partial<DynamicObjectEventHandlerTable> {
  /** Показывать или нет маркер **/
  isHidden?: boolean
}

const Marker2GISComponent: FC<Marker2GISProps> = (props) => {
  const isHidden = props.isHidden ?? false

  const [markerInstance, setMarkerInstance] = useState<Marker | null>(null)
  const markerOptionsRef = useRef<MarkerOptions>({ coordinates: props.coordinates })

  const forceUpdate = useForceUpdate()
  const forceUpdateDeferred = useMemo(() => defer(forceUpdate, 300), [forceUpdate])

  const { mapGLBundle, mapInstance } = useMapContext()

  // формируем реф с опциями маркера
  useEffect(() => {
    markerOptionsRef.current = getOptions<MarkerOptions, Marker2GISProps, string>(props, isOptionsKey)

    forceUpdateDeferred()
  }, [forceUpdateDeferred, props])

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

  useEffect(() => {
    if (markerInstance === null) {
      return
    }

    if (isHidden) {
      markerInstance.hide()
    } else {
      markerInstance.show()
    }
  }, [markerInstance, isHidden])

  return null
}

/**
 * Маркер для 2ГИС карты.
 */
export const Marker2GIS = memo(Marker2GISComponent)
