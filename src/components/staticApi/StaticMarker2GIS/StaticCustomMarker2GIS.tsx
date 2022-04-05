import React, { FC, ImgHTMLAttributes, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { StaticImage } from '../common/StaticImage/StaticImage'
import { useMapUrl } from '../hooks/useMapUrl'
import { StaticMapOptions } from '../StaticMap2GIS'
import { StaticCustomBase64MarkerOptions, StaticCustomUrlMarkerOptions } from './models'
import { getStaticCustomMarkerUrl } from './utils'

export interface StaticCustomMarker2GISProps extends StaticMapOptions, ImgHTMLAttributes<HTMLImageElement> {
  /** Опции кастомного маркера **/
  markerOptions: Array<StaticCustomUrlMarkerOptions | StaticCustomBase64MarkerOptions>
  /** fallback для случая если url картинки вернет ошибку **/
  fallback?: ReactNode
}

/**
 * Картинка со статичной картой и кастомным маркером/ами в ней.
 */
const StaticCustomMarker2GISComponent: FC<StaticCustomMarker2GISProps> = (props) => {
  const { mapWidth, mapHeight, scale, center, zoom, markerOptions, fallback, onError, ...imgProps } = props

  const [markerUrl, setMarkerUrl] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState<boolean>(false)

  const mapUrl = useMapUrl(mapWidth, mapHeight, scale, center, zoom)

  useEffect(() => {
    if (!mapUrl) {
      return
    }

    setMarkerUrl(getStaticCustomMarkerUrl(mapUrl, markerOptions))
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
 * Картинка со статичной картой и кастомным маркером/ами в ней.
 */
export const StaticCustomMarker2GIS = memo(StaticCustomMarker2GISComponent)
