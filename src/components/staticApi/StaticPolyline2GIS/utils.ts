import { StaticPolylineOptions } from './models'

/**
 * Ломанная линия
 */
export const getStaticPolylineUrl = (mapUrl: string, options: Array<StaticPolylineOptions>): string | undefined => {
  const url = new URL(mapUrl)
  const { searchParams } = url

  for (const { coords, weight, color } of options) {
    let lineValue = coords.join()

    if (weight) {
      lineValue += `~w:${weight}`
    }

    if (color) {
      lineValue += `~c:${color}`
    }

    searchParams.append('ls', lineValue)
  }

  return url.href
}
