import { isOptionsKey } from '../../utils'
import { NON_CLUSTERER_OPTIONS, NonClustererOptions } from './constants'

/**
 * Проверяет ключ пропса на принадлежность к опциям кластеризации.
 */
export const checkOptionsKey = (key: NonClustererOptions) =>
  NON_CLUSTERER_OPTIONS.includes(key) ? false : isOptionsKey(key)

/**
 * Возвращает base64-svg на основе svg строки.
 */
export const getIcon = (icon: string) => `data:image/svg+xml;base64,${btoa(icon)}`
