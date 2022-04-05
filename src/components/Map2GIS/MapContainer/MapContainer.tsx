import React, { forwardRef, memo } from 'react'

/** Пропсы контейнера карты **/
interface MapRenderContainerProps {
  /** Дополнительные css классы **/
  className?: string
}

/**
 * Контейнер с картой
 */
const MapContainerComponent = forwardRef<HTMLDivElement, MapRenderContainerProps>(function MapContainerComponent(
  { className },
  ref?,
) {
  return <div style={{ width: '100%', height: '100%' }} className={className} ref={ref} />
})

// Не ререндерим контейнер, т.к. внутри карта
export const MapContainer = memo(MapContainerComponent)
