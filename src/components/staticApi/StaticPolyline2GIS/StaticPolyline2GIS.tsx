import React, { FC, ImgHTMLAttributes, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { StaticImage } from '../common/StaticImage/StaticImage'
import { useMapUrl } from '../hooks/useMapUrl'
import { StaticMapOptions } from '../StaticMap2GIS'
import { StaticPolylineOptions } from './models'
import { getStaticPolylineUrl } from './utils'

export interface StaticPolyline2GISProps extends StaticMapOptions, ImgHTMLAttributes<HTMLImageElement> {
  /** Опции полигона **/
  polylineOptions: Array<StaticPolylineOptions>
  /** fallback для случая если url картинки вернет ошибку **/
  fallback?: ReactNode
}

/**
 * Картинка со статичной картой и ломанной линией/ями в ней.
 */
const StaticPolyline2GISComponent: FC<StaticPolyline2GISProps> = (props) => {
  const { mapWidth, mapHeight, scale, center, zoom, polylineOptions, fallback, onError, ...imgProps } = props

  const [polylineUrl, setPolylineUrl] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState<boolean>(false)

  const mapUrl = useMapUrl(mapWidth, mapHeight, scale, center, zoom)

  useEffect(() => {
    if (!mapUrl) {
      return
    }

    setPolylineUrl(getStaticPolylineUrl(mapUrl, polylineOptions))
    setHasError(false)
  }, [mapUrl, polylineOptions])

  const errorHandle = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setHasError(true)

      onError?.(event)
    },
    [onError],
  )

  return (
    <StaticImage src={polylineUrl} imgProps={imgProps} hasError={hasError} onError={errorHandle} fallback={fallback} />
  )
}

/**
 * Картинка со статичной картой и ломанной линией/ями в ней.
 */
export const StaticPolyline2GIS = memo(StaticPolyline2GISComponent)
