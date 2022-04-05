import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../../Map2GIS'
import { Map2GIS } from '../../Map2GIS/Map2GIS.stories'
import { Control2GIS as Control2GISComponent, Control2GISProps } from '../Control2GIS'
import s from './Control2GIS.module.scss'

export default {
  title: 'Example/Controls/Control',
  parameters: {
    docs: {
      description: {
        component: 'Элемент управления картой.',
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

export const Control2GIS: Story<Control2GISProps> = (args) => (
  <Map2GIS {...(Map2GIS.args as unknown as Map2GISProps)}>
    <Control2GISComponent {...args}>
      <button className={s.Control}>Some text</button>
    </Control2GISComponent>
  </Map2GIS>
)

Control2GIS.args = {
  position: 'topLeft',
}

Control2GIS.storyName = 'Control'
