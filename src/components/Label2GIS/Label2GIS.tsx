import { Label, LabelOptions } from '@2gis/mapgl/global'
import { FC, memo, useEffect, useRef } from 'react'

import { useInstance, useReCreateInstanceWithSetterlessProps } from '../../hooks'
import { getOptions } from '../../utils'
import { useMapContext } from '../Map2GIS'
import { SETTERLESS_PROPS_KEYS } from './constants'
import { useUpdatingLabelInstanceOptions } from './hooks/useUpdatingLabelInstanceOptions'

export type Label2GISProps = LabelOptions

const Label2GISComponent: FC<Label2GISProps> = (props) => {
  const { coordinates, text } = props

  const labelOptionsRef = useRef<LabelOptions>({ coordinates, text })

  const { mapGLBundle, mapInstance } = useMapContext()
  const [getInstance, setInstance] = useInstance<Label>()

  // формируем реф с опциями
  useEffect(() => {
    labelOptionsRef.current = getOptions<LabelOptions, Label2GISProps, string>(props, () => true)
  }, [props])

  // Обновляем опции через сеттеры инстанса
  useUpdatingLabelInstanceOptions(getInstance, labelOptionsRef.current)

  const forceReCreateInstance = useReCreateInstanceWithSetterlessProps<LabelOptions>(
    labelOptionsRef.current,
    SETTERLESS_PROPS_KEYS,
  )

  // создаем инстанс
  useEffect(() => {
    // если нет бандла карты или нет инстанса карты, то выходим
    // (добавил в условие forceReCreateInstance, чтобы линтер не выпилил его из списка зависимостей)
    if (!mapGLBundle || !mapInstance || forceReCreateInstance === undefined) {
      return
    }

    const instance = new mapGLBundle.Label(mapInstance, labelOptionsRef.current)

    setInstance(instance)

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [mapGLBundle, mapInstance, setInstance, forceReCreateInstance])

  return null
}

/**
 * Метка (надпись) для 2ГИС карты.
 */
export const Label2GIS = memo(Label2GISComponent)
