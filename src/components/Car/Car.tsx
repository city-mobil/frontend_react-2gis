import { Marker, MarkerOptions } from '@2gis/mapgl/types'
import React, { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'

import { useRAF } from '../../hooks'
import { Map2GISCoords } from '../../models'
import { useMapContext } from '../Map2GIS/Map2GISContext'
import {
  DEFAULT_ANIMATION_SPEED_COEF,
  DEFAULT_FPS,
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_ROTATION_ANIMATION_SPEED_COEF,
  DEFAULT_SCALE,
  DEFAULT_SPEED,
  DEFAULT_WIDTH,
  DEFAULT_Z_INDEX,
  FPS_COEF,
} from './constants'
import { getDirection, getDistance, travel } from './mapUtils'

export interface CarProps {
  /** Текущие координаты **/
  position: Map2GISCoords
  /** Начальное направление движения, от -180 до 180, где 180 это 6 часов **/
  initialDirection: number
  /** Иконка автомобиля **/
  icon: string
  /** Ширина иконки в пикселях **/
  width?: number
  /** Высота иконки в пикселях **/
  height?: number
  /** Фпс, с которым крутим анимацию. По умолчанию 60 **/
  fps?: number
  /** Z-index, по умолчанию 0 **/
  zIndex?: number
  /** Максимальный зум видимости машинки. **/
  maxZoom?: number
  /** Минимальный зум видимости машинки. **/
  minZoom?: number
  /** Скейл иконки, по умолчанию 1 **/
  scale?: number
  /** Коэффициент скорости анимации, по умолчанию 1 **/
  animationSpeedCoef?: number
  /** Коэффициент скорости анимации вращения, по умолчанию 1 **/
  rotationAnimationSpeedCoef?: number
  /** Значение смещения для корректного вращения (rotation) иконки **/
  offset?: number
}

/**
 * Машинка на 2ГИС-карте. Анимируется, умеет в разный FPS и zIndex.
 */
const CarComponent: FC<CarProps> = (props) => {
  const {
    position,
    initialDirection,
    icon,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    fps = DEFAULT_FPS,
    zIndex = DEFAULT_Z_INDEX,
    maxZoom,
    minZoom,
    scale = DEFAULT_SCALE,
    animationSpeedCoef = DEFAULT_ANIMATION_SPEED_COEF,
    rotationAnimationSpeedCoef = DEFAULT_ROTATION_ANIMATION_SPEED_COEF,
    offset = DEFAULT_OFFSET,
  } = props
  const { mapInstance, mapGLBundle } = useMapContext()

  // Размер иконки
  const size: [number, number] = useMemo(
    () => [Math.round(width * scale), Math.round(height * scale)],
    [width, height, scale],
  )
  // Якорь, с которым работаем
  const anchor: [number, number] = useMemo(() => [Math.round(size[0] / 2), Math.round(size[1] / 2)], [size])

  // Рефы, чтобы более точечно управлять ререндерами.
  const prevCoordinatesRef = useRef<Map2GISCoords>(position)
  const coordinatesRef = useRef<Map2GISCoords>(position)
  const coordinatesUpdatedAtRef = useRef<number>(Date.now())
  const directionRef = useRef<number>(initialDirection)
  const iconRef = useRef<string>(icon)
  const sizeRef = useRef<[number, number]>(size)
  const anchorRef = useRef<[number, number]>(anchor)
  const offsetRef = useRef<number>(offset)
  const animationSpeedCoefRef = useRef<number>(animationSpeedCoef)
  const rotationAnimationSpeedCoefRef = useRef<number>(rotationAnimationSpeedCoef)
  const animationSpeedRef = useRef<number>(DEFAULT_SPEED)

  // Рефы инстанса и текущих позиции и направления машинки.
  const currentPositionRef = useRef<Map2GISCoords>(position)
  const currentDirectionRef = useRef<number>(initialDirection)
  const instanceRef = useRef<Marker | null>(null)

  /**
   * Обновление смещения.
   */
  useEffect(() => {
    offsetRef.current = offset
  }, [offset])

  /**
   * Обновление коэффициента скорости анимации.
   */
  useEffect(() => {
    animationSpeedCoefRef.current = animationSpeedCoef
  }, [animationSpeedCoef])

  /**
   * Обновление коэффициента скорости анимации вращения.
   */
  useEffect(() => {
    rotationAnimationSpeedCoefRef.current = rotationAnimationSpeedCoef
  }, [rotationAnimationSpeedCoef])

  /**
   * Обновление координат
   */
  useEffect(() => {
    if (position) {
      const dateNow = Date.now()

      prevCoordinatesRef.current = coordinatesRef.current
      coordinatesRef.current = position

      if (coordinatesUpdatedAtRef.current) {
        // разница между обновлениями координат в миллисекундах
        const updatedAtDiff = dateNow - coordinatesUpdatedAtRef.current

        animationSpeedRef.current = updatedAtDiff * DEFAULT_SPEED * animationSpeedCoefRef.current
      }

      coordinatesUpdatedAtRef.current = dateNow
    }
  }, [position])

  /**
   * Обновление направления на основании новых координат.
   */
  useEffect(() => {
    if (position) {
      const distance = getDistance(prevCoordinatesRef.current, coordinatesRef.current)

      // если машинка переместилась на расстояние <= 1 метра, то считаем что позиция не изменилась, поворачивать ничего не нужно
      if (distance <= 0.001) {
        return
      }

      /**
       * Вычисление значения для поворота автомобиля.
       * Устанавливаем, когда пришло новое значение.
       *
       * Направление автомобиля находится в интервале [-180; 180], где
       * -179 - это чуть больше 6 часов, а 179 - чуть меньше 6 часов.
       * Если мы поворачиваем больше, чем на 180 градусов - это означает,
       * что мы повернули, скажем, из 170 в -170 что, по факту, поворот водителя
       * всего на 20 градусов. Анимация поворота на 340 градусов не такая красивая,
       * как поворот на 20, поэтому мы добавляем дифф поворота и так накапливаем градусы.
       */
      const bearing = getDirection(prevCoordinatesRef.current, coordinatesRef.current)
      const prevDirection = directionRef.current
      const coef = bearing > prevDirection ? 1 : -1
      const diff = Math.max(bearing, prevDirection) - Math.min(bearing, prevDirection)

      if (diff < 180) {
        directionRef.current = prevDirection + diff * coef
      } else {
        directionRef.current = prevDirection - (360 - diff) * coef
      }
    }
  }, [position])

  /**
   * Обновление иконки.
   */
  useEffect(() => {
    if (icon) {
      iconRef.current = icon
    }
  }, [icon])

  /**
   * Обновление размера.
   */
  useEffect(() => {
    if (size) {
      sizeRef.current = size
    }
  }, [size])

  /**
   * Обновление якоря.
   */
  useEffect(() => {
    if (anchor) {
      anchorRef.current = anchor
    }
  }, [anchor])

  /**
   * Установка новой иконки в инстанс.
   * Все рефы были установлены/обновлены выше.
   */
  useEffect(() => {
    if (!instanceRef.current) {
      return
    }

    if (icon || size || anchor) {
      instanceRef.current.setIcon({
        icon: iconRef.current,
        size: sizeRef.current,
        anchor: anchorRef.current,
      })
    }
  }, [anchor, icon, size])

  /**
   * Сама анимация.
   * Здесь обновляются позиция и направление машинки.
   */
  const animate = useCallback((delta: number) => {
    if (!delta) {
      return
    }

    if (!instanceRef.current) {
      return
    }

    const movePercent = animationSpeedRef.current * FPS_COEF * delta
    const moveFraction = Math.min(1, movePercent)

    // Обновление координат
    currentPositionRef.current = travel(currentPositionRef.current, coordinatesRef.current, moveFraction)
    instanceRef.current.setCoordinates(currentPositionRef.current)

    // Поворот должен быть в 2 раза быстрее + коэф. ускорения
    const rotatePercent = movePercent * 2 * rotationAnimationSpeedCoefRef.current
    const rotateFraction = Math.min(1, rotatePercent)

    // Обновление направления
    const clockWise = directionRef.current > currentDirectionRef.current
    const dirDelta = clockWise
      ? directionRef.current - currentDirectionRef.current
      : currentDirectionRef.current - directionRef.current

    // Если направление изменилось меньше, чем на один градус - ничего не делаем
    if (Math.abs(dirDelta) < 1) {
      return
    }

    currentDirectionRef.current = clockWise
      ? Math.min(currentDirectionRef.current + dirDelta * rotateFraction, directionRef.current)
      : Math.max(currentDirectionRef.current - dirDelta * rotateFraction, directionRef.current)

    instanceRef.current.setRotation(currentDirectionRef.current + offsetRef.current)
  }, [])

  useRAF(animate, fps)

  /**
   * Создание/пересоздание инстанса маркера.
   */
  useEffect(() => {
    if (mapInstance && mapGLBundle) {
      const options: MarkerOptions = {
        coordinates: coordinatesRef.current,
        icon: iconRef.current,
        size: sizeRef.current,
        anchor: anchorRef.current,
        rotation: currentDirectionRef.current + offsetRef.current,
        zIndex,
        maxZoom,
        minZoom,
        interactive: false,
      }

      instanceRef.current = new mapGLBundle.Marker(mapInstance, options)
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, maxZoom, minZoom, zIndex])

  // Чтобы import React from 'react' был не зря и бандлер подхватывал, что это реакт-компонент и всё такое.
  return <></>
}

export const Car = memo(CarComponent)
