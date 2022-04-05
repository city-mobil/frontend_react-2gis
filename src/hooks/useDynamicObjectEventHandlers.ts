import { DynamicObjectEventTable } from '@2gis/mapgl/types/types/events'
import { Evented } from '@2gis/mapgl/types/utils/evented'
import { useCallback, useEffect, useRef, useState } from 'react'

import { DynamicObjectEventHandlerTable, DynamicObjectHandler } from '../models'
import { get2GISEventName, isReactHandlerKey } from '../utils'

type InstanceType = Evented<DynamicObjectEventTable> | null

/**
 * Хук вешает обработчики на "Dynamic Object" экземпляр (маркер, полигон и тд.)
 * @param instance Метод получения экземпляра
 * @param props Пропсы "Dynamic Object" компонента
 */
export const useDynamicObjectEventHandlers = <
  Props extends Partial<DynamicObjectEventHandlerTable>,
  Instance extends InstanceType = InstanceType,
>(
  instance: Instance,
  props: Props,
) => {
  const [forceReSubscribeEvents, setForceReSubscribeEvents] = useState<boolean>(false)
  const eventHandlersRef = useRef<Partial<DynamicObjectEventHandlerTable>>({})
  const prevEventHandlersKeysRef = useRef<Array<keyof Partial<DynamicObjectEventHandlerTable>>>([])

  // Формируем из пропсов реф с обработчиками "Dynamic Object"
  useEffect(() => {
    eventHandlersRef.current = {}

    for (const currentKey in props) {
      if (isReactHandlerKey(currentKey)) {
        const key = currentKey as keyof DynamicObjectEventHandlerTable

        if (props[key] === undefined) {
          continue
        }

        // не удается указать конкретный тип для key
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eventHandlersRef.current[key] = props[key]
      }
    }

    const handlersKeys = Object.keys(eventHandlersRef.current) as Array<keyof Partial<DynamicObjectEventHandlerTable>>

    // Пренебрегаем сортировкой массива, т.к. сортировка может оказаться тяжелой операцией.
    // В «for…in» не целочисленные ключи располагаются в порядке создания,
    // но если поменяется порядок пропсов (<Comp prop1 prop2 prop3 /> -> <Comp prop3 prop1 prop2 />)
    // произойдет лишней ререндер
    if (prevEventHandlersKeysRef.current.join() !== handlersKeys.join()) {
      setForceReSubscribeEvents((current) => !current)
    }

    prevEventHandlersKeysRef.current = handlersKeys
  }, [props])

  // Обработчик событий "Dynamic Object". Для каждого события создается единожды
  const eventHandler = useCallback(
    (key: keyof DynamicObjectEventHandlerTable) => (event: DynamicObjectEventTable[keyof DynamicObjectEventTable]) => {
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

  // Подписываемся на события
  useEffect(() => {
    // добавил в условие forceReSubscribeEvents, чтобы линтер не выпилил его из списка зависимостей
    if (!instance || forceReSubscribeEvents === undefined) {
      return
    }

    for (const currentKey in eventHandlersRef.current) {
      const key = currentKey as keyof DynamicObjectEventHandlerTable
      const eventName = get2GISEventName<DynamicObjectEventTable>(key)

      instance.on(eventName, eventHandler(key) as DynamicObjectHandler<typeof eventName>)
    }

    const eventHandlersRefValue = { ...eventHandlersRef.current }

    return () => {
      if (instance) {
        for (const currentKey in eventHandlersRefValue) {
          const key = currentKey as keyof DynamicObjectEventHandlerTable
          const eventName = get2GISEventName<DynamicObjectEventTable>(key)

          instance.off(eventName, eventHandler(key) as DynamicObjectHandler<typeof eventName>)
        }
      }
    }
  }, [instance, eventHandler, forceReSubscribeEvents])
}
