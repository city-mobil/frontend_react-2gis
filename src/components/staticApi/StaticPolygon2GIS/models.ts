/** Параметры многоугольника **/
export interface StaticPolygonOptions {
  /** Географические координаты точек многоугольника в формате: [outerEdges,cropEdges1,cropEdges2,...]. **/
  coords: number[][][]
  /** толщина контура в пикселях **/
  weight?: number
  /** Цвет контура в шестнадцатеричном формате RGB (ff0000). **/
  color?: string
  /** Цвет заливки в шестнадцатеричном формате RGB (ff0000) или RGBA (ff0000ff) **/
  fill?: string
}
