import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  StaticNumberedMarker2GIS as StaticNumberedMarker2GISComponent,
  StaticNumberedMarker2GISProps,
} from '../StaticNumberedMarker2GIS'
import { POINT_COORDS_IN_MOSCOW } from './constants'

export default {
  title: 'Example/StaticApi/Static numbered marker',
  parameters: {
    docs: {
      description: {
        component: 'Статичная карта с нумерованным маркером на ней.',
      },
    },
  },
  argTypes: {
    mapWidth: {
      description: 'Ширина карты, от 120 до 1280 пикселей.',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    mapHeight: {
      description: 'Высота карты, от 90 до 1280 пикселей.',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    center: {
      description: 'Центр карты в географических координатах ([долгота, широта]).',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'object' },
    },
    scale: {
      description: 'Модификатор размера (1x - по умолчанию; 2x - HiDPI).',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { control: { type: 'range', min: 1, max: 2, step: 1 } },
    },
    zoom: {
      description: 'Масштаб карты, от 1 до 18.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { control: { type: 'range', min: 1, max: 18, step: 1 } },
    },
    markerOptions: {
      description: 'Опции маркера.',
      table: {
        type: {
          summary: 'Array<StaticNumberedMarkerOptions>',
        },
      },
      control: { type: 'object' },
    },
    fallback: {
      description: 'Fallback для случая если URL картинки вернет ошибку.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} as unknown as Meta

export const StaticNumberedMarker2GIS: Story<StaticNumberedMarker2GISProps> = (args) => (
  <StaticNumberedMarker2GISComponent {...args} />
)

StaticNumberedMarker2GIS.args = {
  mapWidth: 200,
  mapHeight: 400,
  scale: 2,
  fallback: <code>error</code>,
  markerOptions: [
    {
      coords: POINT_COORDS_IN_MOSCOW,
      number: 77,
    },
  ],
}

StaticNumberedMarker2GIS.storyName = 'Static numbered marker'
