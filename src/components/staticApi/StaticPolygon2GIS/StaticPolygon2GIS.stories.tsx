import { Meta, Story } from '@storybook/react'
import React from 'react'

import { StaticPolygon2GIS as StaticPolygonGISComponent, StaticPolygon2GISProps } from './StaticPolygon2GIS'

export default {
  title: 'Example/StaticApi/Static polygon',
  parameters: {
    docs: {
      description: {
        component: 'Статичная карта с полигоном на ней.',
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
    polygonOptions: {
      description: 'Опции маркера.',
      table: {
        type: {
          summary: 'Array<StaticPolygonOptions>',
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

export const StaticPolygonGIS: Story<StaticPolygon2GISProps> = (args) => <StaticPolygonGISComponent {...args} />

StaticPolygonGIS.args = {
  mapWidth: 200,
  mapHeight: 400,
  scale: 2,
  fallback: <code>error</code>,
  polygonOptions: [
    {
      coords: [
        [
          [55.736, 37.632],
          [55.746, 37.632],
          [55.746, 37.642],
        ],
      ],
    },
  ],
}

StaticPolygonGIS.storyName = 'Static polygon'
