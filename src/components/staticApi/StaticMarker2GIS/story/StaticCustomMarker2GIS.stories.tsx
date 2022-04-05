import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  StaticCustomMarker2GIS as StaticNumberedMarker2GISComponent,
  StaticCustomMarker2GISProps,
} from '../StaticCustomMarker2GIS'
import { POINT_COORDS_IN_MOSCOW } from './constants'

export default {
  title: 'Example/StaticApi/Static custom marker',
  parameters: {
    docs: {
      description: {
        component: 'Статичная карта с кастомным маркером на ней.',
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
          summary: 'Array<StaticCustomUrlMarkerOptions | StaticCustomBase64MarkerOptions>',
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

export const StaticNumberedMarker2GIS: Story<StaticCustomMarker2GISProps> = (args) => (
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
      url: 'https://img.icons8.com/2266EE/search',
    },
  ],
}

StaticNumberedMarker2GIS.storyName = 'Static custom marker'
