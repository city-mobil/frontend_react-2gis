import { ControlOptions, ZoomControl } from '@2gis/mapgl/global'
import { FC, memo, useEffect } from 'react'

import { useControl, useInstance } from '../../hooks'
import { useMapContext } from '../Map2GIS'

export type ZoomControl2GISProps = ControlOptions

const ZoomControl2GISComponent: FC<ZoomControl2GISProps> = ({ position }) => {
  const { mapGLBundle, mapInstance } = useMapContext()
  const [getInstance, setInstance] = useInstance<ZoomControl>()
  const getOptions = useControl<ZoomControl>(getInstance, { position })

  // создаем инстанс
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    if (!mapGLBundle || !mapInstance) {
      return
    }

    const options = getOptions()
    const instance = new mapGLBundle.ZoomControl(mapInstance, options)

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
 * Базовый элемент управления с двумя кнопками для увеличения и уменьшения масштаба.
 */
export const ZoomControl2GIS = memo(ZoomControl2GISComponent)
