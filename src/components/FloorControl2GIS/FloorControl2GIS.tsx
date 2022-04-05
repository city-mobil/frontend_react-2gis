import { ControlOptions, FloorControl } from '@2gis/mapgl/global'
import { FC, memo, useEffect } from 'react'

import { useControl, useInstance } from '../../hooks'
import { useMapContext } from '../Map2GIS'

export type FloorControl2GISProps = ControlOptions

const FloorControl2GISComponent: FC<FloorControl2GISProps> = ({ position }) => {
  const { mapGLBundle, mapInstance } = useMapContext()
  const [getInstance, setInstance] = useInstance<FloorControl>()
  const getOptions = useControl<FloorControl>(getInstance, { position })

  // создаем инстанс
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    if (!mapGLBundle || !mapInstance) {
      return
    }

    const options = getOptions()
    const instance = new mapGLBundle.FloorControl(mapInstance, options)

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
 * Элемент управления для изменения уровня слоя пола на карте.
 */
export const FloorControl2GIS = memo(FloorControl2GISComponent)
