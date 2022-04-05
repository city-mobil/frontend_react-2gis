import React, { FC, ImgHTMLAttributes, ReactNode, SyntheticEvent } from 'react'

interface StaticImageProps {
  src: string | undefined
  imgProps: ImgHTMLAttributes<HTMLImageElement>
  hasError: boolean
  onError: (event: SyntheticEvent<HTMLImageElement>) => void
  fallback?: ReactNode
}

/**
 * Общий компонент для отрисовки картинки
 */
export const StaticImage: FC<StaticImageProps> = ({ src, imgProps, hasError, onError, fallback }) => {
  if (hasError && fallback) {
    return <>{fallback}</>
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={src} {...imgProps} onError={onError} />
}
