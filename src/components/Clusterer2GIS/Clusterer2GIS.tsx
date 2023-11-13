import React, { FC, memo, ReactNode, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { useForceUpdate } from '../../hooks'
import { ClustererEventHandlerTable } from '../../models'
import { defer } from '../../utils'
import { ClustererBase2GIS } from './ClustererBase2GIS'
import {
  ClustererOptionsOverride,
  ClusterStyleFn,
  ClusterStyleFnOverride,
  ClusterStyleOverride,
  HtmlInputMarker2GIS,
  HtmlMarkerStyle,
  InputHtmlMarker,
  InputMarker2GIS,
  InputWebglMarker,
  RenderMarker,
  WebglInputMarker2GIS,
  WebglMarkerStyle,
} from './models'

/** Конфиг для создания портала html маркера/кластера **/
interface PortalConfig {
  children: ReactNode
  container: Element
  key?: null | string
}

/** Пропсы компонента кластеризации **/
export interface Clusterer2GISProps extends ClustererOptionsOverride, Partial<ClustererEventHandlerTable> {
  /** Данные html маркеров **/
  inputHtmlMarkers?: InputHtmlMarker[]
  /** Данные webgl маркеров **/
  inputWebglMarkers?: InputWebglMarker[]
  /** Функция стилизации, возвращает конфиг html маркера **/
  htmlMarkerStyle?: HtmlMarkerStyle
  /** Функция стилизации, возвращает конфиг webgl маркера **/
  webglMarkerStyle?: WebglMarkerStyle
  /** Рендер функция html маркера **/
  renderHtmlMarker?: RenderMarker
}

const Clusterer2GISComponent: FC<Clusterer2GISProps> = (props) => {
  const {
    inputHtmlMarkers,
    inputWebglMarkers,
    htmlMarkerStyle,
    webglMarkerStyle,
    renderHtmlMarker,
    clusterStyle,
    radius,
    disableClusteringAtZoom,
    ...handlers
  } = props

  const [inputMarkers, setInputMarkers] = useState<InputMarker2GIS[]>([])
  const [isUpdatedMarkerStyle, setIsUpdatedMarkerStyle] = useReducer(() => Date.now(), Date.now())

  const inputWebglMarkersRef = useRef<WebglInputMarker2GIS[]>([])
  const inputHtmlMarkersRef = useRef<HtmlInputMarker2GIS[]>([])

  const clusterStyleFnRef = useRef<ClusterStyleFnOverride | null>(null)
  const clusterStyleRef = useRef<ClusterStyleOverride | null>(null)

  const htmlClusterPortalsCfgRef = useRef<PortalConfig[]>([])
  const htmlMarkerPortalsCfgRef = useRef<PortalConfig[]>([])

  const forceUpdate = useForceUpdate()
  const forceUpdateDeferred = useMemo(() => defer(forceUpdate, 300), [forceUpdate])

  // анализируем стилизацию кластера
  useEffect(() => {
    // сбрасываем рефы стилизации кластера
    clusterStyleFnRef.current = null
    clusterStyleRef.current = null
    // также сбрасываем реф с порталами кластера
    htmlClusterPortalsCfgRef.current = []

    if (!clusterStyle) {
      return
    }

    if (typeof clusterStyle === 'function') {
      clusterStyleFnRef.current = clusterStyle
    } else {
      clusterStyleRef.current = clusterStyle
    }
  }, [clusterStyle])

  // формируем реф массив html маркеров
  useEffect(() => {
    // сбрасываем массив html маркеров
    inputHtmlMarkersRef.current = []
    // сбрасываем конфиг маркерных порталов
    htmlMarkerPortalsCfgRef.current = []

    if (!inputHtmlMarkers?.length) {
      return
    }

    for (let i = 0; i < inputHtmlMarkers.length; i++) {
      const inputMarker = inputHtmlMarkers[i]
      const { coordinates, userData } = inputMarker
      const container = document.createElement('span')
      const key = coordinates.join()
      const children = renderHtmlMarker?.(coordinates, userData)
      const markerStyleCfg = htmlMarkerStyle?.(coordinates, userData)

      // реф для портала
      htmlMarkerPortalsCfgRef.current.push({
        children,
        container,
        key,
      })

      inputHtmlMarkersRef.current.push({
        ...(markerStyleCfg || {}),
        type: 'html',
        html: container,
        coordinates,
        userData,
      })

      // обновляем признак, чтобы отработал эффект с setInputMarkers
      setIsUpdatedMarkerStyle()
    }
  }, [inputHtmlMarkers, htmlMarkerStyle, renderHtmlMarker])

  // формируем реф массив webgl маркеров
  useEffect(() => {
    // сбрасываем массив webgl маркеров
    inputWebglMarkersRef.current = []

    if (!inputWebglMarkers?.length) {
      return
    }

    for (let i = 0; i < inputWebglMarkers.length; i++) {
      const inputMarker = inputWebglMarkers[i]
      const markerStyleCfg = webglMarkerStyle?.(inputMarker.coordinates, inputMarker.userData)

      inputWebglMarkersRef.current.push({
        type: 'webgl',
        ...(markerStyleCfg || {}),
        ...inputMarker,
      })

      // обновляем признак, чтобы отработал эффект с setInputMarkers
      setIsUpdatedMarkerStyle()
    }
  }, [inputWebglMarkers, webglMarkerStyle])

  // обновляем стейт с маркерами
  useEffect(() => {
    // если поменялись данные, то сбрасываем порталы кластера
    htmlClusterPortalsCfgRef.current = []

    setInputMarkers([...inputHtmlMarkersRef.current, ...inputWebglMarkersRef.current])

    // проверяем, чтобы не ругалось правило хуков
    if (isUpdatedMarkerStyle === undefined) {
      return
    }

    // реагируем на изменение пропсов с данными
  }, [inputHtmlMarkers, inputWebglMarkers, isUpdatedMarkerStyle])

  // формируем функцию стилизации кластера
  const clusterStyleFn = useCallback<ClusterStyleFn>(
    (pointsCount, target) => {
      const clusterStyleCfg = clusterStyleRef.current || clusterStyleFnRef.current?.(pointsCount, target)

      if (!clusterStyleCfg) {
        return {}
      }

      const { type } = clusterStyleCfg

      if (type === 'webgl') {
        return clusterStyleCfg
      } else {
        const container = document.createElement('span')
        const { children, ...restStyle } = clusterStyleCfg

        const htmlClusterStyle = {
          ...restStyle,
          html: container,
        }

        htmlClusterPortalsCfgRef.current.push({
          children,
          container,
          key: String(target.id),
        })

        forceUpdateDeferred()

        return htmlClusterStyle
      }
    },

    [forceUpdateDeferred],
  )

  return (
    <>
      <ClustererBase2GIS
        inputMarkers={inputMarkers}
        radius={radius}
        disableClusteringAtZoom={disableClusteringAtZoom}
        clusterStyle={clusterStyleFn}
        {...handlers}
      />
      {htmlClusterPortalsCfgRef.current.map(({ children, container, key }) =>
        ReactDOM.createPortal(children, container, key),
      )}
      {htmlMarkerPortalsCfgRef.current.map(({ children, container, key }) =>
        ReactDOM.createPortal(children, container, key),
      )}
    </>
  )
}

/**
 * Кластеризатор 2ГИС
 */
export const Clusterer2GIS = memo(Clusterer2GISComponent)
