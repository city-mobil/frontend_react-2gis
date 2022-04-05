import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { Polygon2GIS as Polygon2GISComponent, Polygon2GISProps } from './Polygon2GIS'

export default {
  title: 'Example/Polygon',
  parameters: {
    docs: {
      description: {
        component: 'Многоугольник на карте.',
      },
    },
  },
  argTypes: {
    coordinates: {
      description: `Географические координаты точек многоугольника в формате: [outerEdges, cropEdges1, cropEdges2, ...].

Первый раздел - outerEdges, который описывает массив внешних краев: [firstPoint, secondPoint, ..., firstPoint]. Каждая точка - это географическая точка: [долгота, широта]. Последняя точка должна быть такой же, как и первая.

Затем, при желании, вы можете обрезать несколько полигонов из основного (внешнего), указав cropEdges1, cropEdges2 и так далее. Формат такой же, как и у основного раздела: [firstPoint, secondPoint, ..., firstPoint] каждая точка - [долгота, широта].

Требуется только первый раздел (externalEdges). Может быть много разделов cropEdges.`,
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number[][][]',
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
      description: 'Ширина штриха в пикселях.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    interactive: {
      description: 'Позволяет многоугольнику испускать события (например, наведение курсора мыши). По умолчанию true.',
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

export const Polygon2GIS: Story<Polygon2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <Polygon2GISComponent {...args} />
  </Map2GIS>
)

Polygon2GIS.args = {
  coordinates: [
    [
      [37.69500489, 55.73979952],
      [37.71285768, 55.75175496],
      [37.72676225, 55.73917843],
      [37.71062608, 55.7279982],
      [37.69500489, 55.73979952],
    ],
  ],
}

Polygon2GIS.storyName = 'Polygon'
