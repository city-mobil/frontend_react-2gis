import { useCallback, useEffect, useRef } from 'react'

import { RAFCallback } from './models'

/**
 * RequestAnimationFrame
 *
 * @param callback Коллбек RAF.
 * @param FPS Кол-во кадров в секунду.
 */
export const useRAF = (callback: RAFCallback, FPS = 60) => {
  const fpsInterval = useRef(1000 / FPS)
  const now = useRef(0)
  const then = useRef(window.performance.now())
  const elapsed = useRef(0)
  const callbackRef = useRef(callback)

  useEffect(() => {
    if (callback) {
      callbackRef.current = callback
    }
  }, [callback])

  useEffect(() => {
    if (FPS) {
      fpsInterval.current = 1000 / FPS
    }
  }, [FPS])

  const animate = useCallback((newTime: number) => {
    const ref = requestAnimationFrame(animate)

    now.current = newTime
    elapsed.current = now.current - then.current

    if (elapsed.current > fpsInterval.current) {
      then.current = now.current - (elapsed.current % fpsInterval.current)

      callbackRef.current(elapsed.current)
    }

    return ref
  }, [])

  useEffect(() => {
    const ref = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(ref)
  }, [animate])
}
