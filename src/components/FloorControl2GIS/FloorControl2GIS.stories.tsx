import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { FloorControl2GIS as FloorControl2GISComponent, FloorControl2GISProps } from './FloorControl2GIS'

export default {
  title: 'Example/Controls/Floor control',
  parameters: {
    docs: {
      description: {
        component: 'Элемент управления для изменения уровня слоя пола на карте.',
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

export const FloorControl2GIS: Story<FloorControl2GISProps> = (args) => (
  <Map2GIS
    {...(Map2GIS.args as unknown as Map2GISProps)}
    initialMapOptions={{
      ...(Map2GIS.args as unknown as Map2GISProps).initialMapOptions,
      center: [55.31878, 25.23584],
    }}
  >
    <FloorControl2GISComponent {...args} />
  </Map2GIS>
)

FloorControl2GIS.args = {
  position: 'centerLeft',
}

FloorControl2GIS.storyName = 'Floor control'
