import React, { FC, ImgHTMLAttributes, memo, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { StaticImage } from '../common/StaticImage/StaticImage'
import { StaticMapOptions } from './models'
import { getStaticMapUrl } from './utils'

export interface StaticMap2GISProps extends StaticMapOptions, ImgHTMLAttributes<HTMLImageElement> {
  /** Объекты на карте по спецификации GeoJSON (https://docs.2gis.com/ru/api/map/static/reference#nav-lvl1--GeoJSON) **/
  geoJSON?: string
  /** fallback для случая если url картинки вернет ошибку **/
  fallback?: ReactNode
}

/**
 * Картинка со статичной картой
 */
const StaticMap2GISComponent: FC<StaticMap2GISProps> = (props) => {
  const { mapWidth, mapHeight, scale, center, zoom, geoJSON, fallback, onError, ...imgProps } = props

  const [mapUrl, setMapUrl] = useState<string | undefined>(undefined)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const url = getStaticMapUrl({ mapWidth, mapHeight, scale, center, zoom }, geoJSON)

    setMapUrl(url)
    setHasError(false)
  }, [mapWidth, mapHeight, scale, center, zoom, geoJSON])

  const errorHandle = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setHasError(true)

      onError?.(event)
    },
    [onError],
  )

  return <StaticImage src={mapUrl} imgProps={imgProps} hasError={hasError} onError={errorHandle} fallback={fallback} />
}

/**
 * Картинка со статичной картой
 */
export const StaticMap2GIS = memo(StaticMap2GISComponent)
