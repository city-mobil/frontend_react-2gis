import { MapEventHandlerTable } from '../../models'
import { MapCustomEvents } from './models'

/** Массив с пользовательскими событиями карты **/
export const CUSTOM_EVENTS: Array<keyof (MapCustomEvents & Partial<MapEventHandlerTable>)> = ['onMount', 'onUnmount']
