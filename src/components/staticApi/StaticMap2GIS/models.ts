/** Опции карты **/
export interface StaticMapOptions {
  /**
   * ширина карты, от 120 до 1280 пикселей
   * (текущее ограничение 2ГИС см. доку https://docs.2gis.com/ru/api/map/static/reference#nav-lvl1--%D0%9A%D0%B0%D1%80%D1%82%D0%B0)
   */
  mapWidth: number
  /**
   * высота карты, от 90 до 1280 пикселей
   * (текущее ограничение 2ГИС см. доку https://docs.2gis.com/ru/api/map/static/reference#nav-lvl1--%D0%9A%D0%B0%D1%80%D1%82%D0%B0)
   */
  mapHeight: number
  /** Центр карты в географических координатах ([долгота, широта]). **/
  center?: number[]
  /** модификатор размера (1x - по умолчанию; 2x - HiDPI). **/
  scale?: StaticMapScaleOption
  /** масштаб карты, от 1 до 18 **/
  zoom?: StaticMapZoomOption
}

/** тип модификатора размера **/
export type StaticMapScaleOption = 1 | 2

/** Масштаб **/
export type StaticMapZoomOption = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18
