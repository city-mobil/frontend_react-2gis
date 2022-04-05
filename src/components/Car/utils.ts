import { CarClass, CarIcons } from '../../models'

/**
 * Возвращает base64-svg на основе типа машины, её цвета и набора иконок.
 *
 * @param {CarClass} type Тип машины.
 * @param {string} color Цвет в формате, пригодном для SVG. CSS-переменные не работают, работают их значения.
 * @param {CarIcons} icons Набор иконок для различных классов.
 * @param width ширина иконки.
 * @param height высота иконки.
 */
export const getCarIcon = (type: CarClass, color: string, icons: CarIcons, width?: number, height?: number): string => {
  const icon = icons[type]
  let changedIcon = icon.replace(/currentColor/g, color)

  let size = ''

  if (width) {
    size += ` width="${width}" `
  }

  if (height) {
    size += ` height="${height}" `
  }

  if (size.length) {
    changedIcon = changedIcon.replace(/fill="none"/g, `${size} fill="none"`)
  }

  return `data:image/svg+xml;base64,${btoa(changedIcon)}`
}
