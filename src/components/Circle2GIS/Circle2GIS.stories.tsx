import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { Circle2GIS as Circle2GISComponent, Circle2GISProps } from './Circle2GIS'

export default {
  title: 'Example/Circle',
  parameters: {
    docs: {
      description: {
        component: 'Окружность на карте.',
      },
    },
  },
  argTypes: {
    coordinates: {
      description: 'Географические координаты центра круга: [долгота, широта].',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number[]',
        },
      },
    },
    radius: {
      description: 'Радиус окружности в метрах.',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number',
        },
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
    zIndex: {
      description: 'Z-index.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    color: {
      description: 'Цвет заливки в шестнадцатеричном формате RGB (#ff0000) или RGBA (#ff0000ff).',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    strokeColor: {
      description: 'Цвет обводки в шестнадцатеричном формате RGB (#ff0000) или RGBA (#ff0000ff).',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    strokeWidth: {
      description: 'Ширина обводки в пикселях.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    interactive: {
      description:
        'Позволяет ломаной линии генерировать события (например, при наведении курсора мыши). По умолчанию true.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
      control: { type: 'boolean' },
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
    onClick: {
      description: 'Обработчик события "click".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'click'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMousemove: {
      description: 'Обработчик события "mousemove".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'mousemove'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMouseover: {
      description: 'Обработчик события "mouseover".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'mouseover'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMouseout: {
      description: 'Обработчик события "mouseout".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'mouseout'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMousedown: {
      description: 'Обработчик события "mousedown".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'mousedown'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMouseup: {
      description: 'Обработчик события "mouseup".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'mouseup'>",
        },
      },
      control: {
        type: null,
      },
    },
    onTouchstart: {
      description: 'Обработчик события "touchstart".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'touchstart'>",
        },
      },
      control: {
        type: null,
      },
    },
    onTouchend: {
      description: 'Обработчик события "touchend".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'touchend'>",
        },
      },
      control: {
        type: null,
      },
    },
  },
} as unknown as Meta

export const Circle2GIS: Story<Circle2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <Circle2GISComponent {...args} />
  </Map2GIS>
)

Circle2GIS.args = {
  coordinates: [37.68770929, 55.72069944],
  radius: 500,
}

Circle2GIS.storyName = 'Circle'
