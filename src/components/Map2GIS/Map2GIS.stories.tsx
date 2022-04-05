import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GIS as Map2GISComponent, Map2GISProps } from './index'

export default {
  title: 'Example/Map',
  parameters: {
    docs: {
      description: {
        component: '2ГИС карта.',
      },
    },
  },
  argTypes: {
    initialMapOptions: {
      description: 'Опции инициализации карты.',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'MapOptions',
        },
      },
    },
    isSupportedOptions: {
      description: 'Параметры для метода Map.isSupported (https://docs.2gis.com/ru/mapgl/reference/MapSupportOptions).',
      table: {
        type: {
          summary: 'MapSupportOptions',
        },
      },
      control: null,
    },
    fallback: {
      description:
        'Fallback, если isSupported возвращает false. (https://docs.2gis.com/ru/mapgl/reference/isSupported)',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: {
        type: null,
      },
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
    children: {
      description: 'Дополнительные элементы.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: null,
    },
    onMount: {
      description: 'Обработчик события "mount".',
      table: {
        category: 'Custom Events',
        type: {
          summary: '() => void',
        },
      },
      control: {
        type: null,
      },
    },
    onUnmount: {
      description: 'Обработчик события "unMount".',
      table: {
        category: 'Custom Events',
        type: {
          summary: '() => JSX.Element',
        },
      },
      control: {
        type: null,
      },
    },
    onMove: {
      description: 'Обработчик события "move".',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'move'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMovestart: {
      description: 'Обработчик события "movestart".',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'movestart'>",
        },
      },
      control: {
        type: null,
      },
    },
    onMoveend: {
      description: 'Обработчик события "moveend".',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'moveend'>",
        },
      },
      control: {
        type: null,
      },
    },
    onCenter: {
      description: 'Обработчик события изменения центра карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'center'>",
        },
      },
      control: {
        type: null,
      },
    },
    onCenterstart: {
      description: 'Обработчик события перед изменением центра карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'centerstart'>",
        },
      },
      control: {
        type: null,
      },
    },
    onCenterend: {
      description: 'Обработчик события после изменением центра карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'centerend'>",
        },
      },
      control: {
        type: null,
      },
    },
    onZoom: {
      description: 'Обработчик события изменения уровня масштабирования.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'zoom'>",
        },
      },
      control: {
        type: null,
      },
    },
    onZoomstart: {
      description: 'Обработчик события перед изменением уровня масштабирования.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'zoomstart'>",
        },
      },
      control: {
        type: null,
      },
    },
    onZoomend: {
      description: 'Обработчик события после изменения уровня масштабирования.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'zoomend'>",
        },
      },
      control: {
        type: null,
      },
    },
    onRotation: {
      description: 'Обработчик события поворота карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'rotation'>",
        },
      },
      control: {
        type: null,
      },
    },
    onRotationstart: {
      description: 'Обработчик события перед поворотом карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'rotationstart'>",
        },
      },
      control: {
        type: null,
      },
    },
    onRotationend: {
      description: 'Обработчик события после поворота карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'rotationend'>",
        },
      },
      control: {
        type: null,
      },
    },
    onPitch: {
      description: 'Обработчик события наклона карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'pitch'>",
        },
      },
      control: {
        type: null,
      },
    },
    onPitchstart: {
      description: 'Обработчик события перед наклоном карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'pitchstart'>",
        },
      },
      control: {
        type: null,
      },
    },
    onPitchend: {
      description: 'Обработчик события после наклона карты.',
      table: {
        category: 'Events',
        type: {
          summary: "MapEventHandler<'pitchend'>",
        },
      },
      control: {
        type: null,
      },
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
    onContextmenu: {
      description: 'Обработчик события "contextmenu".',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'contextmenu'>",
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
    onIdle: {
      description:
        'Обработчик события, когда карта становится бездействующей после некоторого взаимодействия (перетаскивание, масштабирование и т. д.).',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'idle'>",
        },
      },
      control: {
        type: null,
      },
    },
    onResize: {
      description: 'Обработчик события изменения размера карты.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'resize'>",
        },
      },
      control: {
        type: null,
      },
    },
    onTrafficshow: {
      description: 'Обработчик события отображения слоя трафика на карте.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'trafficshow'>",
        },
      },
      control: {
        type: null,
      },
    },
    onTraffichide: {
      description: 'Обработчик события скрытия слоя трафика на карте.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'traffichide'>",
        },
      },
      control: {
        type: null,
      },
    },
    onTrafficscore: {
      description: 'Обработчик события обновления текущей оценки трафика.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'trafficscore'>",
        },
      },
      control: {
        type: null,
      },
    },
    onFloorplanshow: {
      description: 'Обработчик события отображения плана этажа на карте.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'floorplanshow'>",
        },
      },
      control: {
        type: null,
      },
    },
    onFloorplanhide: {
      description: 'Обработчик события скрытия плана этажа на карте.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'floorplanhide'>",
        },
      },
      control: {
        type: null,
      },
    },
    onFloorlevelchange: {
      description: 'Обработчик события изменения уровня плана этажа.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'floorlevelchange'>",
        },
      },
      control: {
        type: null,
      },
    },
    onStyleload: {
      description: 'Обработчик события загрузки стиля карты.',
      table: {
        category: 'Events',
        type: {
          summary: "DynamicObjectEventHandler<'styleload'>",
        },
      },
      control: {
        type: null,
      },
    },
  },
} as unknown as Meta

export const Map2GIS: Story<Map2GISProps> = (args) => (
  <div style={{ height: '100vh', boxSizing: 'border-box', paddingBottom: 30 }}>
    <Map2GISComponent {...args} />
  </div>
)

Map2GIS.args = {
  initialMapOptions: {
    key: '03d9d960-33e1-11eb-94e9-47013678fee9',
    center: [37.618879, 55.751426],
    styleZoom: 10,
  },
}

Map2GIS.storyName = 'Map'
