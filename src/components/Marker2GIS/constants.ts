import { MarkerOptions } from '@2gis/mapgl/global'

/** Ключи пропсов (опции маркера), для которых у инстанса отсутствуют сеттеры **/
export const SETTERLESS_PROPS_KEYS: Array<keyof Partial<MarkerOptions>> = [
  'interactive',
  'minZoom',
  'maxZoom',
  'userData',
  'zIndex',
]
