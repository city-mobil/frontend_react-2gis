import { Meta, Story } from '@storybook/react'
import React from 'react'

import { StaticMap2GIS as StaticMap2GISComponent, StaticMap2GISProps } from './StaticMap2GIS'

export default {
  title: 'Example/StaticApi/Static map',
  parameters: {
    docs: {
      description: {
        component: 'Статичная карта.',
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
    geoJSON: {
      description:
        'Объекты на карте по спецификации GeoJSON (https://docs.2gis.com/ru/api/map/static/reference#nav-lvl1--GeoJSON).',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'string' },
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

export const StaticMap2GIS: Story<StaticMap2GISProps> = (args) => <StaticMap2GISComponent {...args} />

StaticMap2GIS.args = {
  mapWidth: 200,
  mapHeight: 400,
  scale: 2,
  center: [55.731426, 37.608879],
  zoom: 13,
  fallback: <code>error</code>,
}

StaticMap2GIS.storyName = 'Static map'
