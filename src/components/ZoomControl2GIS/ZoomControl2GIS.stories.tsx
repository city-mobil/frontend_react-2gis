import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { ZoomControl2GIS as ZoomControl2GISComponent, ZoomControl2GISProps } from './ZoomControl2GIS'

export default {
  title: 'Example/Controls/Zoom control',
  parameters: {
    docs: {
      description: {
        component: 'Базовый элемент управления с двумя кнопками для увеличения и уменьшения масштаба.',
      },
    },
  },
  argTypes: {
    position: {
      description: 'Положение элемента управления.',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'ControlPosition',
        },
      },
      control: {
        type: null,
      },
    },
  },
} as unknown as Meta

export const ZoomControl2GIS: Story<ZoomControl2GISProps> = (args) => (
  <Map2GIS
    {...(Map2GIS.args as unknown as Map2GISProps)}
    initialMapOptions={{
      ...(Map2GIS.args as unknown as Map2GISProps).initialMapOptions,
      zoomControl: false,
    }}
  >
    <ZoomControl2GISComponent {...args} />
  </Map2GIS>
)

ZoomControl2GIS.args = {
  position: 'bottomCenter',
}

ZoomControl2GIS.storyName = 'Zoom control'
