import { Map } from '@2gis/mapgl/global'

/** Список пользовательских событий карты **/
export interface MapCustomEvents {
  /** Вызывается в момент успешного создания экземпляра карты. В аргументах созданный экземпляр карты **/
  onMount?: (mapInstance: Map) => void
  /** Вызывается в момент размонтирования карты **/
  onUnmount?: () => void
}
