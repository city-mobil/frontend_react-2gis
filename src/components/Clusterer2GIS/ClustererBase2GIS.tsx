import { Clusterer, ClustererOptions } from '@2gis/mapgl-clusterer'
import { FC, memo, useEffect, useRef, useState } from 'react'

import { useReCreateInstance } from '../../hooks'
import { ClustererEventHandlerTable } from '../../models'
import { getOptions } from '../../utils'
import { useMapContext } from '../Map2GIS'
import { NonClustererOptions } from './constants'
import { useClustererEventHandlers } from './hooks/useClustererEventHandlers'
import { InputMarker2GIS } from './models'
import { checkOptionsKey } from './utils'

export interface ClustererBase2GISProps extends ClustererOptions, Partial<ClustererEventHandlerTable> {
  /** Массив с данными для маркеров **/
  inputMarkers: InputMarker2GIS[]
}

const ClustererBase2GISComponent: FC<ClustererBase2GISProps> = (props) => {
  const { inputMarkers } = props

  const [clustererInstance, setClustererInstance] = useState<Clusterer | null>(null)
  const optionsRef = useRef<ClustererOptions>({})

  const { mapInstance } = useMapContext()

  // формируем реф с опциями маркера
  useEffect(() => {
    optionsRef.current = getOptions<ClustererOptions, ClustererBase2GISProps, NonClustererOptions>(
      props,
      checkOptionsKey,
    )
  }, [props])

  const forceReCreateInstance = useReCreateInstance<ClustererOptions>(optionsRef.current)

  // грузим данные
  useEffect(() => {
    if (!clustererInstance) {
      return
    }

    clustererInstance.load(inputMarkers)
  }, [clustererInstance, inputMarkers])

  // создаем инстанс кластеризации
  useEffect(() => {
    // если нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new Clusterer(mapInstance, optionsRef.current)

    setClustererInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapInstance, forceReCreateInstance])

  useClustererEventHandlers(clustererInstance, props)

  return null
}

/**
 * Базовый компонент кластеризации маркеров для карт 2ГИС
 */
export const ClustererBase2GIS = memo(ClustererBase2GISComponent)
