import {
  StaticCustomBase64MarkerOptions,
  StaticCustomUrlMarkerOptions,
  StaticMarkerOptions,
  StaticNumberedMarkerOptions,
} from './models'

/**
 * Маркер
 */
export const getStaticMarkerUrl = (mapUrl: string, options: Array<StaticMarkerOptions>): string => {
  const url = new URL(mapUrl)
  const { searchParams } = url

  for (const { coords, kind, color, size } of options) {
    let pointValue = coords.join()

    if (kind) {
      pointValue += `~k:${kind}`
    }

    if (color) {
      pointValue += `~c:${color}`
    }

    if (size) {
      pointValue += `~s:${size}`
    }

    searchParams.append('pt', pointValue)
  }

  return url.href
}

/**
 * Нумерованный маркер
 */
export const getStaticNumberedMarkerUrl = (mapUrl: string, options: Array<StaticNumberedMarkerOptions>): string => {
  const url = new URL(mapUrl)
  const { searchParams } = url

  for (const { coords, number, kind } of options) {
    let pointValue = coords.join()

    pointValue += `~n:${number}`

    if (kind) {
      pointValue += `~k:${kind}`
    }

    searchParams.append('pt', pointValue)
  }

  return url.href
}

/**
 * Возвращает url для получения картинки с кастомным маркером в формате PNG.
 */
export const getStaticCustomMarkerUrl = (
  mapUrl: string,
  options: Array<StaticCustomUrlMarkerOptions | StaticCustomBase64MarkerOptions>,
): string => {
  const markerUrl = new URL(mapUrl)
  const { searchParams } = markerUrl

  for (const option of options) {
    const { coords, x, y } = option
    let pointValue = coords.join()

    if ((option as StaticCustomBase64MarkerOptions).base64) {
      pointValue += `~b:${(option as StaticCustomBase64MarkerOptions).base64}`
    }

    if ((option as StaticCustomUrlMarkerOptions).url) {
      pointValue += `~u:${(option as StaticCustomUrlMarkerOptions).url}`
    }

    if (x && y) {
      pointValue += `~a:${x},${y}`
    }

    searchParams.append('pt', pointValue)
  }

  return markerUrl.href
}
