import { ControlOptions, TrafficControl } from '@2gis/mapgl/global'
import { FC, memo, useEffect } from 'react'

import { useControl, useInstance } from '../../hooks'
import { useMapContext } from '../Map2GIS'

export type TrafficControl2GISProps = ControlOptions

const TrafficControl2GISComponent: FC<TrafficControl2GISProps> = ({ position }) => {
  const { mapGLBundle, mapInstance } = useMapContext()
  const [getInstance, setInstance] = useInstance<TrafficControl>()
  const getOptions = useControl<TrafficControl>(getInstance, { position })

  // создаем инстанс
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    if (!mapGLBundle || !mapInstance) {
      return
    }

    const options = getOptions()
    const instance = new mapGLBundle.TrafficControl(mapInstance, options)

    setInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setInstance, getOptions])

  return null
}

/**
 * Элемент управления для включения слоя трафика на карте.
 */
export const TrafficControl2GIS = memo(TrafficControl2GISComponent)
