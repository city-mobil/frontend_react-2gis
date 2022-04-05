import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Map2GISProps } from '../Map2GIS'
import { Map2GIS } from '../Map2GIS/Map2GIS.stories'
import { Clusterer2GIS as Clusterer2GISComponent, Clusterer2GISProps } from './Clusterer2GIS'

export default {
  title: 'Example/Clusterer',
  parameters: {
    docs: {
      description: {
        component: 'Кластеризация.',
      },
    },
  },
  argTypes: {
    radius: {
      description: 'Радиус кластеризации в пикселях.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    clusterStyle: {
      description:
        'Стиль кластера (переопределение оригинального clusterStyle). Этот параметр принимает объект или функцию. При задании объекта один и тот же стиль будет применяться ко всем кластерам. Передайте функцию для гибкой стилизации отдельного кластера.',
      table: {
        type: {
          summary: 'ClusterStyleFnOverride | ClusterStyleOverride',
        },
      },
    },
    disableClusteringAtZoom: {
      description: 'При этом уровне масштабирования и выше маркеры не будут сгруппированы.',
      table: {
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number' },
    },
    inputHtmlMarkers: {
      description: 'Данные html маркеров.',
      table: {
        type: {
          summary: 'InputHtmlMarker[]',
        },
      },
      control: { type: 'object' },
    },
    inputWebglMarkers: {
      description: 'Данные webgl маркеров.',
      table: {
        type: {
          summary: 'InputWebglMarker[]',
        },
      },
      control: { type: 'object' },
    },
    htmlMarkerStyle: {
      description: 'Функция стилизация, возвращает конфиг html маркера.',
      table: {
        type: {
          summary: 'HtmlMarkerStyle',
        },
      },
    },
    webglMarkerStyle: {
      description: 'Функция стилизации, возвращает конфиг webgl маркера.',
      table: {
        type: {
          summary: 'HtmlMarkerStyle',
        },
      },
    },
    renderHtmlMarker: {
      description: 'Рендер функция html маркера.',
      table: {
        type: {
          summary: 'RenderMarker',
        },
      },
    },
    onClick: {
      description: 'Обработчик события "click". Генерируется при щелчке на маркер/кластер.',
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
    onMousemove: {
      description: 'Обработчик события "mousemove". Генерируется, если курсор перемещается по маркеру/кластеру.',
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
      description: 'Обработчик события "mouseover". Генерируется, когда пользователь наводит курсор на маркер/кластер.',
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
      description: 'Обработчик события "mouseout". Генерируется, когда пользователь убирает курсор с маркера/кластера.',
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
      description:
        'Обработчик события "mousedown". Генерируется, когда пользователь нажимает кнопку мыши над маркером/кластером.',
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
      description:
        'Обработчик события "mouseup". Генерируется, когда пользователь отпускает кнопку мыши над маркером/кластером.',
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
      description: 'Обработчик события "touchstart". Испускается, когда пользователь нажимает на маркер/кластер.',
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
      description: 'Обработчик события "touchend". Испускается, когда пользователь убирает палец с маркера/кластера.',
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
  },
} as unknown as Meta

export const Clusterer2GIS: Story<Clusterer2GISProps> = (args) => (
  <Map2GIS
    {...(Map2GIS.args as unknown as Map2GISProps)}
    initialMapOptions={{
      ...(Map2GIS.args as unknown as Map2GISProps).initialMapOptions,
      center: [55.27887, 25.21001],
      zoom: 17,
      styleZoom: 17,
      lang: 'ru',
    }}
  >
    <Clusterer2GISComponent {...args} />
  </Map2GIS>
)

Clusterer2GIS.args = {
  inputHtmlMarkers: [{ coordinates: [55.35266, 25.24382], userData: true }],
  inputWebglMarkers: [
    { coordinates: [55.27887, 25.21001] },
    { coordinates: [55.55459, 25.156798] },
    { coordinates: [55.30771, 25.20314] },
  ],
  renderHtmlMarker: (_coordinates) => <div style={{ color: 'red' }}>Test html marker</div>,
  disableClusteringAtZoom: 17,
  radius: 80,
  clusterStyle: (pointsCount) => {
    return {
      type: 'html',
      children: <div>{`PointsCount = ${pointsCount}`}</div>,
      preventMapInteractions: false,
    }
  },
  onClick: () => console.info('click'),
}

Clusterer2GIS.storyName = 'Clusterer'
