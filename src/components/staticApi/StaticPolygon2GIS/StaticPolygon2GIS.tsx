import React, { FC, ImgHTMLAttributes, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { StaticImage } from '../common/StaticImage/StaticImage'
import { useMapUrl } from '../hooks/useMapUrl'
import { StaticMapOptions } from '../StaticMap2GIS'
import { StaticPolygonOptions } from './models'
import { getStaticPolygonUrl } from './utils'

export interface StaticPolygon2GISProps extends StaticMapOptions, ImgHTMLAttributes<HTMLImageElement> {
  /** Опции полигона **/
  polygonOptions: Array<StaticPolygonOptions>
  /** fallback для случая если url картинки вернет ошибку **/
  fallback?: ReactNode
}

/**
 * Картинка со статичной картой и полигоном/ами в ней.
 */
const StaticPolygon2GISComponent: FC<StaticPolygon2GISProps> = (props) => {
  const { mapWidth, mapHeight, scale, center, zoom, polygonOptions, fallback, onError, ...imgProps } = props

  const [polygonUrl, setPolygonUrl] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState<boolean>(false)

  const mapUrl = useMapUrl(mapWidth, mapHeight, scale, center, zoom)

  useEffect(() => {
    if (!mapUrl) {
      return
    }

    setPolygonUrl(getStaticPolygonUrl(mapUrl, polygonOptions))
    setHasError(false)
  }, [mapUrl, polygonOptions])

  const errorHandle = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setHasError(true)

      onError?.(event)
    },
    [onError],
  )

  return (
    <StaticImage src={polygonUrl} imgProps={imgProps} hasError={hasError} onError={errorHandle} fallback={fallback} />
  )
}

/**
 * Картинка со статичной картой и полигоном/ами в ней.
 */
export const StaticPolygon2GIS = memo(StaticPolygon2GISComponent)
