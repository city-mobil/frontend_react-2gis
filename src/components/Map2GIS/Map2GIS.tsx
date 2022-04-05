import { Map, MapEventTable, MapOptions, MapSupportOptions } from '@2gis/mapgl/global'
import React, { FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { use2GISBundle, useInvalidateSize, useIsSupported } from '../../hooks'
import { MapEventHandler, MapEventHandlerTable } from '../../models'
import { get2GISEventName, isReactHandlerKey } from '../../utils'
import { CUSTOM_EVENTS } from './constants'
import { Map2GISContext } from './Map2GISContext'
import { MapContainer } from './MapContainer/MapContainer'
import { MapCustomEvents } from './models'

export interface Map2GISProps extends Partial<MapEventHandlerTable>, MapCustomEvents {
  /** Опции инициализации карты **/
  initialMapOptions: MapOptions
  /** Параметры для метода Map.isSupported (https://docs.2gis.com/ru/mapgl/reference/isSupported). **/
  isSupportedOptions?: MapSupportOptions
  /**
   * fallback для случая если isSupported = false.
   * Если ничего не передать (undefined), то независимо от ответа isSupported пытаемся нарисовать карту.
   */
  fallback?: ReactNode
  /** Дополнительные css классы **/
  className?: string
  /** Дополнительные элементы **/
  children?: ReactNode
}

const Map2GISComponent: FC<Map2GISProps> = (props) => {
  const { initialMapOptions, isSupportedOptions, fallback, onMount, onUnmount, className, children } = props

  const [mapInstance, setMapInstance] = useState<Map | null>(null)
  const [forceReSubscribeEvents, setForceReSubscribeEvents] = useState<boolean>(false)
  const initialMapOptionsRef = useRef<MapOptions>(initialMapOptions)
  const eventHandlersRef = useRef<Partial<MapEventHandlerTable>>({})
  const prevEventHandlersKeysRef = useRef<Array<keyof Partial<MapEventHandlerTable>>>([])
  const onMountRef = useRef<MapCustomEvents['onMount']>(onMount)
  const onUnmountRef = useRef<MapCustomEvents['onUnmount']>(onUnmount)

  const mapGLBundle = use2GISBundle()
  const notSupportMapGL = useIsSupported(mapGLBundle, isSupportedOptions)
  const containerRef = useInvalidateSize<HTMLDivElement>(mapInstance)

  // Обновление onMount
  useEffect(() => {
    onMountRef.current = onMount
  }, [onMount])

  // Обновление onUnmount
  useEffect(() => {
    onUnmountRef.current = onUnmount
  }, [onUnmount])

  // Формируем из пропсов реф с обработчиками карты
  useEffect(() => {
    eventHandlersRef.current = {}

    for (const currentKey in props) {
      if (
        isReactHandlerKey(currentKey) &&
        !CUSTOM_EVENTS.includes(currentKey as keyof (MapCustomEvents & Partial<MapEventHandlerTable>))
      ) {
        const key = currentKey as keyof MapEventHandlerTable

        if (props[key] === undefined) {
          continue
        }

        // не удается указать конкретный тип для key
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eventHandlersRef.current[key] = props[key]
      }
    }

    const handlersKeys = Object.keys(eventHandlersRef.current) as Array<keyof Partial<MapEventHandlerTable>>

    // Пренебрегаем сортировкой массива, т.к. сортировка может оказаться тяжелой операцией.
    // В «for…in» не целочисленные ключи располагаются в порядке создания,
    // но если поменяется порядок пропсов (<Comp prop1 prop2 prop3 /> -> <Comp prop3 prop1 prop2 />)
    // произойдет лишней ререндер
    if (prevEventHandlersKeysRef.current.join() !== handlersKeys.join()) {
      setForceReSubscribeEvents((current) => !current)
    }

    prevEventHandlersKeysRef.current = handlersKeys
  }, [props])

  // Создаем экземпляр карты
  useEffect(() => {
    // если контейнера нет в DOM или нет бандла - то выходим
    if (!containerRef.current || !mapGLBundle) {
      return
    }

    const instance = new mapGLBundle.Map(containerRef.current, initialMapOptionsRef.current)

    setMapInstance(instance)

    if (typeof onMountRef.current === 'function') {
      onMountRef.current(instance)
    }

    return () => {
      setMapInstance(null)

      if (typeof onUnmountRef.current === 'function') {
        onUnmountRef.current()
      }

      if (instance) {
        // Здесь под капотом еще и убираются обработчики событий
        instance.destroy()
      }
    }
  }, [containerRef, mapGLBundle])

  // Обработчик событий карты. Для каждого события создается единожды
  const eventHandler = useCallback(
    (key: keyof MapEventHandlerTable) => (event: MapEventTable[keyof MapEventTable]) => {
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

  // Подписываемся на события карты
  useEffect(() => {
    // добавил в условие forceReSubscribeEvents, чтобы линтер не выпилил его из списка зависимостей
    if (!mapInstance || forceReSubscribeEvents === undefined) {
      return
    }

    for (const currentKey in eventHandlersRef.current) {
      const key = currentKey as keyof MapEventHandlerTable
      const eventName = get2GISEventName<MapEventTable>(key)

      mapInstance.on(eventName, eventHandler(key) as MapEventHandler<typeof eventName>)
    }

    const eventHandlersRefValue = { ...eventHandlersRef.current }

    return () => {
      if (mapInstance) {
        for (const currentKey in eventHandlersRefValue) {
          const key = currentKey as keyof MapEventHandlerTable
          const eventName = get2GISEventName<MapEventTable>(key)

          mapInstance.off(eventName, eventHandler(key) as MapEventHandler<typeof eventName>)
        }
      }
    }
  }, [mapInstance, eventHandler, forceReSubscribeEvents])

  const containerCallbackRef = useCallback(
    (container: HTMLDivElement) => {
      containerRef.current = container
    },
    [containerRef],
  )

  // Мемоизация значения для контекста
  const map2GISContextValue = useMemo(
    () => ({
      mapGLBundle,
      mapInstance,
    }),
    [mapInstance, mapGLBundle],
  )

  if (notSupportMapGL && fallback !== undefined) {
    return <>{fallback}</>
  }

  return (
    <Map2GISContext.Provider value={map2GISContextValue}>
      <MapContainer ref={containerCallbackRef} className={className} />
      {children}
    </Map2GISContext.Provider>
  )
}

/**
 * 2ГИС карта.
 */
export const Map2GIS = memo(Map2GISComponent)
