import React, { FC, ImgHTMLAttributes, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { StaticImage } from '../common/StaticImage/StaticImage'
import { useMapUrl } from '../hooks/useMapUrl'
import { StaticMapOptions } from '../StaticMap2GIS'
import { StaticNumberedMarkerOptions } from './models'
import { getStaticNumberedMarkerUrl } from './utils'

export interface StaticNumberedMarker2GISProps extends StaticMapOptions, ImgHTMLAttributes<HTMLImageElement> {
  /** Опции нумерованного маркера **/
  markerOptions: Array<StaticNumberedMarkerOptions>
  /** fallback для случая если url картинки вернет ошибку **/
  fallback?: ReactNode
}

/**
 * Картинка со статичной картой и нумерованным маркером/ами в ней.
 */
const StaticNumberedMarker2GISComponent: FC<StaticNumberedMarker2GISProps> = (props) => {
  const { mapWidth, mapHeight, scale, center, zoom, markerOptions, fallback, onError, ...imgProps } = props

  const [markerUrl, setMarkerUrl] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState<boolean>(false)

  const mapUrl = useMapUrl(mapWidth, mapHeight, scale, center, zoom)

  useEffect(() => {
    if (!mapUrl) {
      return
    }

    setMarkerUrl(getStaticNumberedMarkerUrl(mapUrl, markerOptions))
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
 * Картинка со статичной картой и нумерованным маркером/ами в ней.
 */
export const StaticNumberedMarker2GIS = memo(StaticNumberedMarker2GISComponent)
