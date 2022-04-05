import { STATIC_API_BASE_URL } from '../constants'
import { StaticMapOptions } from './models'

/**
 * Возвращает ссылку для получения картинки.
 * @param options Опции карты
 * @param geoJSON Объекты на карте по спецификации GeoJSON (https://docs.2gis.com/ru/api/map/static/reference#nav-lvl1--GeoJSON)
 */
export const getStaticMapUrl = (options: StaticMapOptions, geoJSON?: string): string => {
  const { mapWidth, mapHeight, scale = 1, center, zoom } = options

  const url = new URL(STATIC_API_BASE_URL)
  const { searchParams } = url

  searchParams.append('s', `${mapWidth}x${mapHeight}@${scale}x`)

  if (center) {
    searchParams.append('c', `${center.join()}`)
  }

  if (zoom !== undefined) {
    searchParams.append('z', String(zoom))
  }

  if (geoJSON) {
    searchParams.append('g', geoJSON)
  }

  return url.href
}
