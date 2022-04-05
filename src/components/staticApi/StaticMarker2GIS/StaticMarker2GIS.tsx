import React, { FC, ImgHTMLAttributes, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { StaticImage } from '../common/StaticImage/StaticImage'
import { useMapUrl } from '../hooks/useMapUrl'
import { StaticMapOptions } from '../StaticMap2GIS'
import { StaticMarkerOptions } from './models'
import { getStaticMarkerUrl } from './utils'

export interface StaticMarker2GISProps extends StaticMapOptions, ImgHTMLAttributes<HTMLImageElement> {
  /** Опции маркера **/
  markerOptions: Array<StaticMarkerOptions>
  /** fallback для случая если url картинки вернет ошибку **/
  fallback?: ReactNode
}

/**
 * Картинка со статичной картой и маркером/ами в ней.
 */
const StaticMarker2GISComponent: FC<StaticMarker2GISProps> = (props) => {
  const { mapWidth, mapHeight, scale, center, zoom, markerOptions, fallback, onError, ...imgProps } = props

  const [markerUrl, setMarkerUrl] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState<boolean>(false)

  const mapUrl = useMapUrl(mapWidth, mapHeight, scale, center, zoom)

  useEffect(() => {
    if (!mapUrl) {
      return
    }

    setMarkerUrl(getStaticMarkerUrl(mapUrl, markerOptions))
    setHasError(false)
  }, [mapUrl, markerOptions])

  const errorHandle = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setHasError(true)

      onError?.(event)
    },
    [onError],
  )

  return (
    <StaticImage src={markerUrl} imgProps={imgProps} hasError={hasError} onError={errorHandle} fallback={fallback} />
  )
}

/**
 * Картинка со статичной картой и маркером/ами в ней.
 */
export const StaticMarker2GIS = memo(StaticMarker2GISComponent)
