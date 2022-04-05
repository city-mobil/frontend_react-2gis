import { ClustererOptions } from '@2gis/mapgl-clusterer'

import { ClustererBase2GISProps } from './ClustererBase2GIS'

export type NonClustererOptions = Exclude<keyof ClustererBase2GISProps, keyof ClustererOptions>

/** Массив с ключами пропсов кластеризации, которые не относятся к его параметрам **/
export const NON_CLUSTERER_OPTIONS: Array<NonClustererOptions> = ['inputMarkers']
