import { ClustererOptions } from '@2gis/mapgl-clusterer'
import {
  ClusterStyle,
  ClusterTarget,
  HtmlClusterStyle,
  HtmlInputMarker,
  WebglClusterStyle,
  WebglInputMarker,
} from '@2gis/mapgl-clusterer/dist/types/types'
import { ReactNode } from 'react'

/**
 * Удаление индекса у типа.
 * https://stackoverflow.com/a/66252656/2122734
 */
export type RemoveIndex<T> = {
  [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P]
}

/** Конфиг html маркера для кластеризации **/
export interface HtmlInputMarker2GIS extends RemoveIndex<HtmlInputMarker> {
  userData?: unknown
}

/** Конфиг webgl маркера для кластеризации **/
export interface WebglInputMarker2GIS extends RemoveIndex<WebglInputMarker> {
  userData?: unknown
}

/** Маркер для кластеризации. **/
export type InputMarker2GIS = WebglInputMarker2GIS | HtmlInputMarker2GIS

/**
 * Функция стилизации кластера (здесь и далее под кластером подразумевается точка на карте, объединяющая в себе n-ое кол-во маркеров).
 * Вызывается один раз при создании кластера. Позволяет гибко стилизовать кластер.
 */
export type ClusterStyleFn = (pointsCount: number, target: ClusterTarget) => ClusterStyle

/** Переопределенный стиль html кластера **/
export interface HtmlClusterStyleOverride extends Omit<HtmlClusterStyle, 'html'> {
  /** реакт узел иконки html кластера **/
  children: ReactNode
}

/** Переопределенный стиль webgl кластера **/
export interface WebglClusterStyleOverride extends WebglClusterStyle {
  type: 'webgl'
}

/** Переопределенный стиль кластера **/
export type ClusterStyleOverride = HtmlClusterStyleOverride | WebglClusterStyleOverride

/** Переопределенная функция стилизации кластера см. {@link ClusterStyleFn}. **/
export type ClusterStyleFnOverride = (pointsCount: number, target: ClusterTarget) => ClusterStyleOverride

/** Переопределенные параметры инициализации кластеризации. **/
export interface ClustererOptionsOverride extends Omit<ClustererOptions, 'clusterStyle'> {
  /**
   * Стиль кластера (переопределение оригинального clusterStyle). Этот параметр принимает объект или функцию.
   * При задании объекта один и тот же стиль будет применяться ко всем кластерам.
   * Передайте функцию для гибкой стилизации отдельного кластера.
   */
  clusterStyle?: ClusterStyleFnOverride | ClusterStyleOverride
}

/** Данные html маркеров **/
export type InputHtmlMarker = Pick<HtmlInputMarker2GIS, 'coordinates' | 'userData'>

/** Данные webgl маркеров **/
export type InputWebglMarker = Pick<WebglInputMarker2GIS, 'coordinates' | 'userData'>

/** Функция стилизация html маркера **/
export type HtmlMarkerStyle<UserData = unknown> = (
  coordinates: number[],
  userData?: UserData,
) => Omit<HtmlInputMarker2GIS, 'coordinates' | 'userData' | 'type' | 'html'> | undefined

/** Функция стилизация webgl маркера **/
export type WebglMarkerStyle = (
  coordinates: number[],
  userData?: unknown,
) => Omit<WebglInputMarker2GIS, 'coordinates' | 'userData' | 'type'> | undefined

/** Рендер функция html маркера **/
export type RenderMarker = (coordinates: number[], userData?: unknown) => ReactNode
