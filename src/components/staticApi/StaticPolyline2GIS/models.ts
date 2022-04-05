/** Параметры ломаной линии **/
export interface StaticPolylineOptions {
  /** Массив координат: [firstPoint, secondPoint, ...]. Каждая точка является географической точкой: [долгота, широта]. **/
  coords: number[][]
  /** толщина линии в пикселях **/
  weight?: number
  /** Цвет линии в шестнадцатеричном формате RGB (ff0000). **/
  color?: string
}
