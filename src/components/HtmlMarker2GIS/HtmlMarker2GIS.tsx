import { HtmlMarker, HtmlMarkerOptions } from '@2gis/mapgl/global'
import { FC, memo, ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { useInstance, useReCreateInstanceWithSetterlessProps } from '../../hooks'
import { getOptions } from '../../utils'
import { useMapContext } from '../Map2GIS'
import { NonHtmlMarkerOptions, SETTERLESS_PROPS_KEYS } from './constants'
import { useUpdatingHtmlMarkerInstanceOptions } from './hooks/useUpdatingHtmlMarkerInstanceOptions'
import { checkOptionsKey } from './utils'

export type HtmlMarkerOptionsWithoutHtml = Omit<HtmlMarkerOptions, 'html'>

export interface HtmlMarker2GISProps extends HtmlMarkerOptionsWithoutHtml {
  /** контент маркера **/
  children: ReactNode
  /** Дополнительные css классы **/
  className?: string
}

const HtmlMarker2GISComponent: FC<HtmlMarker2GISProps> = (props) => {
  const { coordinates, children, className } = props

  const htmlMarkerOptionsRef = useRef<HtmlMarkerOptionsWithoutHtml>({ coordinates })
  const container = useRef<HTMLSpanElement>(document.createElement('span'))

  const { mapGLBundle, mapInstance } = useMapContext()
  const [getInstance, setInstance] = useInstance<HtmlMarker>()

  // формируем реф с опциями html маркера
  useEffect(() => {
    htmlMarkerOptionsRef.current = getOptions<HtmlMarkerOptionsWithoutHtml, HtmlMarker2GISProps, NonHtmlMarkerOptions>(
      props,
      checkOptionsKey,
    )
  }, [props])

  // Обновляем опции через сеттеры инстанса
  useUpdatingHtmlMarkerInstanceOptions(getInstance, htmlMarkerOptionsRef.current)

  const forceReCreateInstance = useReCreateInstanceWithSetterlessProps<HtmlMarkerOptionsWithoutHtml>(
    htmlMarkerOptionsRef.current,
    SETTERLESS_PROPS_KEYS,
  )

  // создаем инстанс
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.HtmlMarker(mapInstance, {
      ...htmlMarkerOptionsRef.current,
      html: container.current,
      preventMapInteractions: Boolean(htmlMarkerOptionsRef.current.preventMapInteractions),
    })

    setInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setInstance, forceReCreateInstance])

  // Обновляем класс на контейнере при изменениях класса
  useEffect(() => {
    if (!container.current) {
      return
    }

    if (className) {
      container.current.setAttribute('class', className)
    } else {
      container.current.removeAttribute('class')
    }
  }, [className])

  return ReactDOM.createPortal(children, container.current)
}

/**
 * HTML маркер для 2ГИС карты.
 */
export const HtmlMarker2GIS = memo(HtmlMarker2GISComponent)
