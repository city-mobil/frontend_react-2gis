import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { Marker2GIS as Marker2GISComponent, Marker2GISProps } from './Marker2GIS'

export default {
  title: 'Example/Marker',
  parameters: {
    docs: {
      description: {
        component: 'Маркер на карте.',
      },
    },
  },
  argTypes: {
    coordinates: {
      description: 'Географические координаты центра маркера [долгота, широта].',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number[]',
        },
      },
    },
    icon: {
      description: 'URL значка маркера.',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    size: {
      description: 'Размер значка маркера [ширина, высота] в пикселях.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'object' },
    },
    anchor: {
      description: 'Положение в пикселях якоря значка (относительно его верхнего левого угла).',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'object' },
    },
    rotation: {
      description: 'Вращение значка по часовой стрелке в плоскости экрана в градусах.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    hoverIcon: {
      description: 'URL-адрес значка маркера в состоянии наведения.',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    hoverSize: {
      description: 'Размер значка маркера [ширина, высота] в пикселях в состоянии наведения.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'object' },
    },
    hoverAnchor: {
      description: 'Якорь значка в зависшем состоянии.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'object' },
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
      description: 'Минимальный масштаб отображения.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    maxZoom: {
      description: 'Максимальный масштаб отображения.',
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
    label: {
      description: 'Параметры метки маркера.',
      table: {
        type: {
          summary: 'MarkerLabelOptions',
        },
      },
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

export const Marker2GIS: Story<Marker2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <Marker2GISComponent {...args} />
  </Map2GIS>
)

Marker2GIS.args = {
  coordinates: [37.618879, 55.751426],
}

Marker2GIS.storyName = 'Marker'
