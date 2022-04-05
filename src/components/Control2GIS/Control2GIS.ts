import { Control, ControlOptions } from '@2gis/mapgl/global'
import { FC, memo, ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { useControl, useInstance } from '../../hooks'
import { useMapContext } from '../Map2GIS'

export interface Control2GISProps extends ControlOptions {
  /** Дополнительные css классы **/
  className?: string
  /** контент **/
  children: ReactNode
}

export const Control2GISComponent: FC<Control2GISProps> = (props) => {
  const { position, className, children } = props

  const container = useRef<HTMLSpanElement>(document.createElement('span'))

  const { mapGLBundle, mapInstance } = useMapContext()
  const [getInstance, setInstance] = useInstance<Control>()
  const getOptions = useControl<Control>(getInstance, { position })

  // создаем инстанс
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    if (!mapGLBundle || !mapInstance) {
      return
    }

    const options = getOptions()
    const instance = new mapGLBundle.Control(mapInstance, container.current.outerHTML, options)

    setInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setInstance, getOptions])

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
 * Элемент управления картой
 */
export const Control2GIS = memo(Control2GISComponent)
