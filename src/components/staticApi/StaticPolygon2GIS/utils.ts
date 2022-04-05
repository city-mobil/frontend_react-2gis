import { StaticPolygonOptions } from './models'

/**
 * Многоугольник
 */
export const getStaticPolygonUrl = (mapUrl: string, options: Array<StaticPolygonOptions>): string | undefined => {
  const url = new URL(mapUrl)
  const { searchParams } = url

  for (const { coords, weight, color, fill } of options) {
    let polygonValue = coords.join()

    if (weight) {
      polygonValue += `~w:${weight}`
    }

    if (color) {
      polygonValue += `~c:${color}`
    }

    if (fill) {
      polygonValue += `~f:${fill}`
    }

    searchParams.append('pn', polygonValue)
  }

  return url.href
}
