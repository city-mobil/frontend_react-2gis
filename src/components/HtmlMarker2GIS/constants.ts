import { HtmlMarkerOptions } from '@2gis/mapgl/global'

import { HtmlMarker2GISProps, HtmlMarkerOptionsWithoutHtml } from './HtmlMarker2GIS'

export type NonHtmlMarkerOptions = Exclude<keyof HtmlMarker2GISProps, keyof HtmlMarkerOptions>

/** Массив с пропсами html маркера, которые не относятся к его параметрам **/
export const NON_HTML_MARKER_OPTIONS: Array<NonHtmlMarkerOptions> = ['children', 'className']

/** Ключи пропсов (опции html маркера), для которых у инстанса отсутствуют сеттеры **/
export const SETTERLESS_PROPS_KEYS: Array<keyof Partial<HtmlMarkerOptionsWithoutHtml>> = [
  'maxZoom',
  'minZoom',
  'preventMapInteractions',
  'userData',
  'zIndex',
]
