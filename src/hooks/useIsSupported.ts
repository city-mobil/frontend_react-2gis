import { MapSupportOptions } from '@2gis/mapgl/global'
import { useEffect, useRef } from 'react'

import { MapGLBundle } from '../models'

/**
 * Хук для проверки поддержки карты устройством
 */
export const useIsSupported = (mapGLBundle: MapGLBundle | null, isSupportedOptions?: MapSupportOptions) => {
  const notSupportMapGLRef = useRef<boolean>(false)

  useEffect(() => {
    if (mapGLBundle) {
      notSupportMapGLRef.current = !mapGLBundle.isSupported(isSupportedOptions)
    }
  }, [mapGLBundle, isSupportedOptions])

  return notSupportMapGLRef.current
}
