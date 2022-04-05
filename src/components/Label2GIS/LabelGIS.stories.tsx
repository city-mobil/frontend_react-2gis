import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { Label2GIS as Label2GISComponent, Label2GISProps } from './Label2GIS'

export default {
  title: 'Example/Label',
  parameters: {
    docs: {
      description: {
        component: 'Метка (надпись) на карте.',
      },
    },
  },
  argTypes: {
    coordinates: {
      description: 'Географические координаты центра метки: [долгота, широта].',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number[]',
        },
      },
    },
    text: {
      description: 'Текст метки.',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    image: {
      description: 'Фоновое изображение метки.',
      table: {
        type: {
          summary: 'LabelImage',
        },
      },
      control: {
        type: null,
      },
    },
    minZoom: {
      description: 'Минимальный масштаб отображения',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    maxZoom: {
      description: 'Максимальный масштаб отображения',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    color: {
      description: 'Цвет текста в шестнадцатеричном формате RGB (#ff0000) или RGBA (#ff0000ff).',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    fontSize: {
      description: 'Размер текста.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    haloRadius: {
      description: 'Используйте haloRadius, чтобы добавить фон за каждой буквой.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    haloColor: {
      description: 'Цвет фона букв (если указан haloRadius). Тот же формат, что и для цвета.',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    letterSpacing: {
      description: 'Пробел между каждой буквой.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    lineHeight: {
      description: 'Для многострочной метки lineHeight указывает интервал между строками.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    offset: {
      description:
        'Расстояние смещения текстового поля от его relativeAnchor. Положительные значения указывают вправо и вниз, а отрицательные значения указывают влево и вверх.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'text' },
    },
    relativeAnchor: {
      description:
        'Координаты (от 0 до 1 в каждом измерении) «конца» текстового поля относительно его левого верхнего угла, например: значение [0, 0] — левый верхний угол, [0,5, 0,5] — центральная точка, а [ 1, 1] — правый нижний угол окна. Метка будет размещена таким образом, чтобы географические координаты этой точки соответствовали абсолютному смещению.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'text' },
    },
    zIndex: {
      description: 'Z-index.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    userData: {
      description: 'Пользовательские данные.',
      table: {
        type: {
          summary: 'any',
        },
      },
      control: { type: 'text' },
    },
  },
} as unknown as Meta

export const Label2GIS: Story<Label2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <Label2GISComponent {...args} />
  </Map2GIS>
)

Label2GIS.args = {
  coordinates: [37.68770929, 55.72069944],
  text: 'There is hope',
  color: '#ff0000',
  fontSize: 24,
}

Label2GIS.storyName = 'Label'
