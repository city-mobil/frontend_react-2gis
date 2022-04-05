import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { TrafficControl2GIS as TrafficControl2GISComponent, TrafficControl2GISProps } from './TrafficControl2GIS'

export default {
  title: 'Example/Controls/Traffic control',
  parameters: {
    docs: {
      description: {
        component: 'Элемент управления для включения слоя трафика на карте.',
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

export const TrafficControl2GIS: Story<TrafficControl2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <TrafficControl2GISComponent {...args} />
  </Map2GIS>
)

TrafficControl2GIS.args = {
  position: 'topCenter',
}

TrafficControl2GIS.storyName = 'Traffic control'
