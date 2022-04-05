import { load } from '@2gis/mapgl'
import { useEffect, useState } from 'react'

import { MapGLBundle } from '../models'

const loadBundleWrapper = () => {
  let bundle: MapGLBundle | null = null
  let promise: Promise<MapGLBundle> | null = null

  return async (): Promise<MapGLBundle> => {
    if (bundle) {
      return bundle
    }

    if (!promise) {
      promise = new Promise((resolve, reject) => void load().then(resolve).catch(reject))
    }

    bundle = await promise

    return bundle
  }
}

const loadBundle = loadBundleWrapper()

/**
 * Хук загрузки бандля карты.
 */
export const use2GISBundle = () => {
  const [bundle, setBundle] = useState<MapGLBundle | null>(null)

  useEffect(() => {
    loadBundle()
      .then((mapglAPI) => {
        setBundle(mapglAPI)
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('Cannot load 2GIS bundle')
      })
  }, [])

  return bundle
}
