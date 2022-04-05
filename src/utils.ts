/**
 * Обработчики событий в пропсах имеют вид "onEventname", а 2ГИС слушает события типа "eventname",
 * Функция преобразует имя пропса в формат 2ГИС ("onEventname" -> "eventname")
 */
export const get2GISEventName = <T>(propName: string): keyof T => propName.substring(2).toLowerCase() as keyof T

/**
 * Принимает строку (имя пропса).
 * Возвращает true, если строка начинается с "on" (считаем что это обработчик события)
 */
export const isReactHandlerKey = (propName: string) => propName.startsWith('on')

/**
 * Проверка ключа пропса на принадлежность к опциям объекта карты
 */
export const isOptionsKey = (propName: string) => !isReactHandlerKey(propName)

/**
 * Сравнение двух массивов.
 */
export const isArraysEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a === b) {
    return true
  }

  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

/**
 * Возвращает объект, который содержит только опции объекта, все лишние пропсы будут отброшены.
 * @param props Пропсы компонента
 * @param isOptionsKey Функция проверки ключа пропса
 */
export const getOptions = <OptionsType, PropsType, KeyType>(
  props: PropsType,
  isOptionsKey: (key: KeyType) => boolean,
): OptionsType => {
  const result = {}

  for (const key in props) {
    if (isOptionsKey(key as unknown as KeyType)) {
      if (props[key] === undefined) {
        continue
      }

      // не удается вывести конкретный тип для props[key]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[key] = props[key]
    }
  }

  return result as OptionsType
}

/**
 * Возвращает функцию, которая вызовет функцию func, если от последнего вызова прошло wait мс.
 */
export const defer = <T extends (...args: any) => any>(func: T, wait?: number) => {
  let timerId: number

  return function (...args: any[]) {
    clearTimeout(timerId)
    timerId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args)
    }, wait)
  }
}
