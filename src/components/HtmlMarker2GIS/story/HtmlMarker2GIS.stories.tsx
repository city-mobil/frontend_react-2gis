import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../../Map2GIS'
import { Map2GIS } from '../../Map2GIS/Map2GIS.stories'
import { HtmlMarker2GIS as HtmlMarker2GISComponent, HtmlMarker2GISProps } from '../HtmlMarker2GIS'
import s from './HtmlMarker2GIS.module.scss'

export default {
  title: 'Example/HTML Marker',
  parameters: {
    docs: {
      description: {
        component: 'HTML-маркер на карте.',
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
    anchor: {
      description: 'Положение в пикселях «кончика» HTML-маркера относительно его верхнего левого угла.',
      table: {
        type: {
          summary: 'number[]',
        },
      },
      control: { type: 'object' },
    },
    minZoom: {
      description: 'Минимальный масштаб отображения HTML-маркера.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    maxZoom: {
      description: 'Максимальный масштаб отображения HTML-маркера.',
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
    preventMapInteractions: {
      description:
        'Захватить события, если установлено. В противном случае события будут передаваться на карту. По умолчанию true.',
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
    children: {
      description: 'Контент маркера.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: null,
    },
    className: {
      description: 'Дополнительные CSS-классы.',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: null,
      },
    },
  },
} as unknown as Meta

export const HTMLMarker2GIS: Story<HtmlMarker2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <HtmlMarker2GISComponent {...args}>
      <div className={s.Marker} />
    </HtmlMarker2GISComponent>
  </Map2GIS>
)

HTMLMarker2GIS.args = {
  coordinates: [37.618879, 55.751426],
}

HTMLMarker2GIS.storyName = 'HTML Marker'
