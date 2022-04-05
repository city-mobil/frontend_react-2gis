import { NON_HTML_MARKER_OPTIONS, NonHtmlMarkerOptions } from './constants'

/**
 * Проверяет ключ пропса на принадлежность к опциям html маркера.
 */
export const checkOptionsKey = (key: NonHtmlMarkerOptions) => !NON_HTML_MARKER_OPTIONS.includes(key)
