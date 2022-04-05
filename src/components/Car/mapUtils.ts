import distance from '@turf/distance'
import { point } from '@turf/helpers'
import { bearing, destination } from '@turf/turf'

import { Map2GISCoords } from '../../models'

/**
 * Возвращает расстояние между двумя точками в километрах.
 *
 * @param pointA Точка А.
 * @param pointB Точка Б.
 */
export const getDistance = (pointA: Map2GISCoords, pointB: Map2GISCoords): number => {
  return distance(point(pointA), point(pointB))
}

/**
 * Получить направление из точки А в Б.
 *
 * @param pointFrom Точка А.
 * @param pointTo Точка Б.
 */
export const getDirection = (pointFrom: Map2GISCoords, pointTo: Map2GISCoords): number => {
  const from = point(pointFrom)
  const to = point(pointTo)

  return bearing(from, to)
}

/**
 * Получить точку между двумя, удаленную на долю (число от 0 до 1) от А в сторону Б.
 *
 * @param pointA Точка А.
 * @param pointB Точка Б.
 * @param fraction Доля от А до Б.
 */
export const travel = (pointA: Map2GISCoords, pointB: Map2GISCoords, fraction: number): Map2GISCoords => {
  const A = point(pointA)

  const distance = getDistance(pointA, pointB)
  const bearing = getDirection(pointA, pointB)

  const result = destination(A, distance * fraction, bearing)

  return result.geometry.coordinates
}
