import mapgl from '@2gis/mapgl/global'
import { DynamicObjectEventTable, MapEventTable } from '@2gis/mapgl/types'
import { ClustererEventTable } from '@2gis/mapgl-clusterer/dist/types/types'

/** Тип бандла **/
export type MapGLBundle = typeof mapgl

/**
 * Функция-обработчик события карты.
 * В аргументах (параметрах) функции "event" - типизирован в соответствии события {@link MapEventTable}, на которое повешан обработчик.
 */
export type MapEventHandler<E extends keyof MapEventTable> = (event: MapEventTable[E]) => void

/**
 * Список возможных обработчиков событий карты (onEventname: (event) => void)
 * Данный тип позволяет нам не описывать руками обработчики + изменения списка событий,
 * которые может генерировать карта, они будут подтягиваться автоматически (обновление пакета @2gis/mapgl).
 * В итоге имеем тип {onEventName: handler} в соответствии с событиями карты {@link MapEventTable}.
 */
export type MapEventHandlerTable = {
  [D in keyof {
    [C in keyof { [B in keyof MapEventTable]: `on${Capitalize<B>}` } as {
      [B in keyof MapEventTable]: `on${Capitalize<B>}`
    }[C]]: { [A in keyof MapEventTable]: A }[C]
  }]: MapEventHandler<
    {
      [C in keyof { [B in keyof MapEventTable]: `on${Capitalize<B>}` } as {
        [B in keyof MapEventTable]: `on${Capitalize<B>}`
      }[C]]: { [A in keyof MapEventTable]: A }[C]
    }[D]
  >
}

/**
 * Функция-обработчик события динамического объекта (маркер, полигон, ломанная линия и тд).
 * В аргументах (параметрах) функции "event" - типизирован в соответствии события {@link DynamicObjectEventTable}, на которое повешан обработчик.
 */
export type DynamicObjectHandler<E extends keyof DynamicObjectEventTable> = (event: DynamicObjectEventTable[E]) => void

/**
 * Список возможных обработчиков событий динамического объекта (маркер, полигон, ломанная линия и тд) (onEventname: (event) => void)
 * Данный тип позволяет нам не описывать руками обработчики + изменения списка событий,
 * которые может генерировать динамический объект, они будут подтягиваться автоматически (обновление пакета @2gis/mapgl).
 * В итоге имеем тип {onEventName: handler} в соответствии с событиями динамического объекта {@link DynamicObjectEventTable}.
 */
export type DynamicObjectEventHandlerTable = {
  [D in keyof {
    [C in keyof { [B in keyof DynamicObjectEventTable]: `on${Capitalize<B>}` } as {
      [B in keyof DynamicObjectEventTable]: `on${Capitalize<B>}`
    }[C]]: { [A in keyof DynamicObjectEventTable]: A }[C]
  }]: DynamicObjectHandler<
    {
      [C in keyof { [B in keyof DynamicObjectEventTable]: `on${Capitalize<B>}` } as {
        [B in keyof DynamicObjectEventTable]: `on${Capitalize<B>}`
      }[C]]: { [A in keyof DynamicObjectEventTable]: A }[C]
    }[D]
  >
}

/**
 * Функция-обработчик события кластера.
 * В аргументах (параметрах) функции "event" - типизирован в соответствии события {@link ClustererEventTable}, на которое повешан обработчик.
 */
export type ClustererHandler<E extends keyof ClustererEventTable> = (event: ClustererEventTable[E]) => void

/**
 * Список возможных обработчиков событий кластеризации маркеров
 */
export type ClustererEventHandlerTable = {
  [D in keyof {
    [C in keyof { [B in keyof ClustererEventTable]: `on${Capitalize<B>}` } as {
      [B in keyof ClustererEventTable]: `on${Capitalize<B>}`
    }[C]]: { [A in keyof ClustererEventTable]: A }[C]
  }]: ClustererHandler<
    {
      [C in keyof { [B in keyof ClustererEventTable]: `on${Capitalize<B>}` } as {
        [B in keyof ClustererEventTable]: `on${Capitalize<B>}`
      }[C]]: { [A in keyof ClustererEventTable]: A }[C]
    }[D]
  >
}

/** Координаты 2ГИС **/
export type Map2GISCoords = number[]

/**
 * Доступные типы машин.
 */
export type CarClass = 'sedan' | 'comfort' | 'comfort_plus' | 'business' | 'minivan'

/**
 * Набор иконок для машин разных классов. Строка - это однострочный, оптимизированный
 * svg, в котором цвета, доступные для замены, используются как currentColor.
 */
export type CarIcons = Record<CarClass, string>
