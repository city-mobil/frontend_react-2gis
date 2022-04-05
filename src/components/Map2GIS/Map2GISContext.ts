import { Map } from '@2gis/mapgl/global'
import React, { useContext } from 'react'

import { MapGLBundle } from '../../models'

/** Значение контекста **/
export type Map2GISContextValue = {
  mapGLBundle: MapGLBundle | null
  mapInstance: Map | null
}

/** Значение по умолчанию **/
const defaultContextValue: Map2GISContextValue = {
  mapGLBundle: null,
  mapInstance: null,
}

/** Контекст **/
export const Map2GISContext = React.createContext<Map2GISContextValue>(defaultContextValue)

/** Хук возвращает текущее значение контекста **/
export const useMapContext = () => {
  return useContext(Map2GISContext)
}
