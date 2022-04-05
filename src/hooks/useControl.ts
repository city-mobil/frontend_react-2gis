import { ControlOptions } from '@2gis/mapgl/global'
import { ControlPosition } from '@2gis/mapgl/types/types'
import { useCallback, useEffect, useRef } from 'react'

import { GetInstance } from './useInstance'

interface InstanceCommon {
  /** Устанавливает положение элемента управления. **/
  setPosition(position: ControlPosition): void
}

/**
 * Хук для контролов (элементы управления) карты.
 * Создает реф с опциями и обновляет позицию.
 * Возвращает мемоизированную функцию с опциями.
 */
export const useControl = <ControlType extends InstanceCommon>(
  getInstance: GetInstance<ControlType>,
  options: ControlOptions,
) => {
  const { position } = options

  const controlOptionsRef = useRef<ControlOptions>({ position })

  // формируем реф с опциями
  useEffect(() => {
    controlOptionsRef.current.position = position
  }, [position])

  // Установка нового положения в инстанс.
  useEffect(() => {
    const instance = getInstance()

    // если нет инстанса маркера, то выходим
    if (!instance) {
      return
    }

    instance.setPosition(position)
  }, [getInstance, position])

  return useCallback(() => controlOptionsRef.current, [])
}
