import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { Polyline2GIS as Polyline2GISComponent, Polyline2GISProps } from './Polyline2GIS'

export default {
  title: 'Example/Polyline',
  parameters: {
    docs: {
      description: {
        component: 'Ломаная линия на карте.',
      },
    },
  },
  argTypes: {
    coordinates: {
      description:
        'Массив координат ломаной линии: [firstPoint, secondPoint, ...]. Каждая точка - это географическая точка: [долгота, широта].',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number[][]',
        },
      },
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
      description: 'Цвет линии в шестнадцатеричном формате RGB (#ff0000) или RGBA (#ff0000ff).',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    width: {
      description: 'Ширина линии в пикселях.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    gapLength: {
      description: 'Длина разрыва в пикселях. Длина зазора по умолчанию равна длине штриха.',
      table: {
        type: {
          summary: 'number | InterpolateExpression<number>',
        },
      },
      control: { type: 'number' },
    },
    gapColor: {
      description: 'Цвет промежутка в шестнадцатеричном формате RGB (#ff0000) или RGBA (#ff0000ff).',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    dashLength: {
      description: 'Длина штриха в пикселях. Если длина штриха не указана, будет нарисована линия.',
      table: {
        type: {
          summary: 'number | InterpolateExpression<number>',
        },
      },
      control: { type: 'number' },
    },
    interactive: {
      description:
        'Позволяет ломаной линии генерировать события (например, при наведении курсора мыши). по умолчанию true.',
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

export const Polyline2GIS: Story<Polyline2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <Polyline2GISComponent {...args} />
  </Map2GIS>
)

Polyline2GIS.args = {
  coordinates: [
    [37.68770929, 55.72069944],
    [37.68976922, 55.75656786],
    [37.73096795, 55.72007825],
    [37.73302789, 55.75687836],
  ],
}

Polyline2GIS.storyName = 'Polyline'
