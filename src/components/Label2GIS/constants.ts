import { LabelOptions } from '@2gis/mapgl/global'

/** Ключи пропсов (опции метки), для которых у инстанса отсутствуют сеттеры **/
export const SETTERLESS_PROPS_KEYS: Array<keyof Partial<LabelOptions>> = [
  'text',
  'image',
  'minZoom',
  'maxZoom',
  'color',
  'fontSize',
  'haloRadius',
  'haloColor',
  'letterSpacing',
  'lineHeight',
  'anchor',
  'offset',
  'relativeAnchor',
  'zIndex',
  'userData',
]
