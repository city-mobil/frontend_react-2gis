import { Map } from '@2gis/mapgl/global'
import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

import { useIsUnmounted } from './useInUnmounted'

/**
 * Хук слушает изменение размеров контейнера карты и обновляет размер карты.
 * @param mapInstance инстанс карты
 */
export const useInvalidateSize = <T extends HTMLElement = HTMLElement>(
  mapInstance: Map | null,
): MutableRefObject<T | null> => {
  const ref = useRef<T>(null)

  const isUnmounted = useIsUnmounted()

  const invalidateSize = useCallback(() => {
    if (mapInstance) {
      mapInstance.invalidateSize()
    }
  }, [mapInstance])

  useEffect(() => {
    if (isUnmounted()) {
      return
    }

    if (!window || typeof window.ResizeObserver === 'undefined') {
      return
    }

    const element = ref.current

    if (!element) {
      return
    }

    const resizeObserver = new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (isUnmounted()) {
        return
      }

      // Используем RAF, чтобы не поймать ошибку "Превышение предела цикла изменения размера" (ResizeObserver loop limit exceeded)
      // Эта ошибка означает, что ResizeObserver не смог обработать все наблюдения в одном кадре анимации.
      // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
      requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return
        }

        invalidateSize()
      })
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [invalidateSize, isUnmounted])

  return ref
}
