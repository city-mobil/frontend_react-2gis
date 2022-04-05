import { Clusterer } from '@2gis/mapgl-clusterer'
import { ClustererEventTable } from '@2gis/mapgl-clusterer/dist/types/types'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ClustererEventHandlerTable, ClustererHandler } from '../../../models'
import { get2GISEventName, isReactHandlerKey } from '../../../utils'
import { ClustererBase2GISProps } from '../ClustererBase2GIS'

/**
 * Хук вешает обработчики на экземпляр кластеризации
 */
export const useClustererEventHandlers = (instance: Clusterer | null, props: ClustererBase2GISProps) => {
  const [forceReSubscribeEvents, setForceReSubscribeEvents] = useState<boolean>(false)
  const eventHandlersRef = useRef<Partial<ClustererEventHandlerTable>>({})
  const prevEventHandlersKeysRef = useRef<Array<keyof Partial<ClustererEventHandlerTable>>>([])

  // Формируем из пропсов реф с обработчиками кластеризации
  useEffect(() => {
    eventHandlersRef.current = {}

    for (const currentKey in props) {
      if (isReactHandlerKey(currentKey)) {
        const key = currentKey as keyof ClustererEventHandlerTable

        if (props[key] === undefined) {
          continue
        }

        // не удается указать конкретный тип для key
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eventHandlersRef.current[key] = props[key]
      }
    }

    const handlersKeys = Object.keys(eventHandlersRef.current) as Array<keyof Partial<ClustererEventHandlerTable>>

    // Пренебрегаем сортировкой массива, т.к. сортировка может оказаться тяжелой операцией.
    // В «for…in» не целочисленные ключи располагаются в порядке создания,
    // но если поменяется порядок пропсов (<Comp prop1 prop2 prop3 /> -> <Comp prop3 prop1 prop2 />)
    // произойдет лишней ререндер
    if (prevEventHandlersKeysRef.current.join() !== handlersKeys.join()) {
      setForceReSubscribeEvents((current) => !current)
    }

    prevEventHandlersKeysRef.current = handlersKeys
  }, [props])

  // Обработчик событий кластеризации. Для каждого события создается единожды
  const eventHandler = useCallback(
    (key: keyof ClustererEventHandlerTable) => (event: ClustererEventTable[keyof ClustererEventTable]) => {
      const handler = eventHandlersRef.current[key]

      if (handler) {
        // не удается указать конкретный тип для аргумента event
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handler(event)
      }
    },
    [],
  )

  // Подписываемся на события кластеризации
  useEffect(() => {
    // добавил в условие forceReSubscribeEvents, чтобы линтер не выпилил его из списка зависимостей
    if (!instance || forceReSubscribeEvents === undefined) {
      return
    }

    for (const currentKey in eventHandlersRef.current) {
      const key = currentKey as keyof ClustererEventHandlerTable
      const eventName = get2GISEventName<ClustererEventTable>(key)

      instance.on(eventName, eventHandler(key) as ClustererHandler<typeof eventName>)
    }

    const eventHandlersRefValue = { ...eventHandlersRef.current }

    return () => {
      for (const currentKey in eventHandlersRefValue) {
        const key = currentKey as keyof ClustererEventHandlerTable
        const eventName = get2GISEventName<ClustererEventTable>(key)

        instance.off(eventName, eventHandler(key) as ClustererHandler<typeof eventName>)
      }
    }
  }, [instance, eventHandler, forceReSubscribeEvents])
}
