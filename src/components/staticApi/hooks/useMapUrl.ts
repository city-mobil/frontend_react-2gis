import { useEffect, useState } from 'react'

import { getStaticMapUrl, StaticMapScaleOption, StaticMapZoomOption } from '../StaticMap2GIS'

/**
 * Хук возвращает url для получения картинки
 */
export const useMapUrl = (
  mapWidth: number,
  mapHeight: number,
  scale?: StaticMapScaleOption,
  center?: number[],
  zoom?: StaticMapZoomOption,
) => {
  const [url, setUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    setUrl(getStaticMapUrl({ mapWidth, mapHeight, scale, center, zoom }))
  }, [mapWidth, mapHeight, scale, center, zoom])

  return url
}
