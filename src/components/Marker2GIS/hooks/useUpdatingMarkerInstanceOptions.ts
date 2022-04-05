import { MarkerOptions } from '@2gis/mapgl/global'
import { Marker } from '@2gis/mapgl/types'
import { useEffect, useRef } from 'react'

/**
 * Установка экземпляру маркера возможных свойств.
 * @param instance Метод получения экземпляра маркера
 * @param options Опции маркера
 */
export const useUpdatingMarkerInstanceOptions = (instance: Marker | null, options: MarkerOptions) => {
  const { coordinates, icon, size, anchor, rotation, hoverIcon, hoverSize, hoverAnchor, label } = options

  const instanceRef = useRef<Marker | null>(instance)

  useEffect(() => {
    instanceRef.current = instance
  }, [instance])

  // Установка новых координат в инстанс.
  useEffect(() => {
    if (!instanceRef.current) {
      return
    }

    instanceRef.current.setCoordinates(coordinates)
  }, [coordinates])

  // Установка новой иконки в инстанс.
  useEffect(() => {
    if (!instanceRef.current) {
      return
    }

    if (icon || size || anchor) {
      instanceRef.current.setIcon({
        // если icon === undefined, то добавим пустую строку (иконки не будет)
        icon: icon || '',
        size: size,
        anchor: anchor,
      })
    }
  }, [anchor, icon, size])

  // Установка новой иконки наведения в инстанс.
  useEffect(() => {
    if (!instanceRef.current) {
      return
    }

    if (hoverIcon || hoverSize || hoverAnchor) {
      instanceRef.current.setIcon({
        // если hoverIcon === undefined, то добавим пустую строку (иконки не будет)
        icon: hoverIcon || '',
        size: hoverSize,
        anchor: hoverAnchor,
      })
    }
  }, [hoverIcon, hoverSize, hoverAnchor])

  // Установка поворота маркера в инстанс
  useEffect(() => {
    if (!instanceRef.current) {
      return
    }

    if (rotation !== undefined) {
      instanceRef.current.setRotation(rotation)
    }
  }, [rotation])

  // Установка метки маркера в инстанс
  useEffect(() => {
    if (!instanceRef.current) {
      return
    }

    instanceRef.current.setLabel(label)
  }, [label])
}
