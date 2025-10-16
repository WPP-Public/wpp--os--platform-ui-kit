import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

const customViewports = {
  xxLarge: {
    name: 'XXLarge',
    styles: {
      width: '2220px',
      height: '963px',
    },
  },
  xLarge: {
    name: 'XLarge',
    styles: {
      width: '1920px',
      height: '963px',
    },
  },
  large: {
    name: 'Large',
    styles: {
      width: '1440px',
      height: '801px',
    },
  },
  medium: {
    name: 'Medium',
    styles: {
      width: '1366px',
      height: '801px',
    },
  },
  small: {
    name: 'Small',
    styles: {
      width: '1280px',
      height: '801px',
    },
  },
}

export default {
  title: 'Design System/Foundations/Grid/Regular',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    viewport: {
      //👇 The viewports for grid
      viewports: customViewports,
    },
  },
  argTypes: {
    fullWidth: {
      control: { type: 'boolean' },
    },
    fullHeight: {
      control: { type: 'boolean' },
    },
    fluid: {
      control: { type: 'boolean' },
    },
    rowSpacing: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1)],
      control: { type: 'select' },
    },
    columnSpacing: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1)],
      control: { type: 'select' },
    },
    all: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1), 'auto', true],
      control: { type: 'select' },
    },
    sm: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1), 'auto', true],
      control: { type: 'select' },
    },
    md: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1), 'auto', true],
      control: { type: 'select' },
    },
    lg: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1), 'auto', true],
      control: { type: 'select' },
    },
    xl: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1), 'auto', true],
      control: { type: 'select' },
    },
    xxl: {
      options: [null, ...Array.from({ length: 24 }, (_, i) => i + 1), 'auto', true],
      control: { type: 'select' },
    },
    direction: {
      options: ['column', 'row', 'column-reverse', 'row-reverse'],
      control: { type: 'select' },
    },
    justifyContent: {
      options: [null, 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
      control: { type: 'select' },
    },
    alignItems: {
      options: [null, 'flex-start', 'center', 'flex-end', 'baseline', 'normal'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppGrid>

export const Regular: StoryObj<Components.WppGrid> = {
  render: args => {
    const innerList = Array.from(Array(24).keys())

    return html`
      <style>
        .grid-item {
          width: 100%;
          height: 100px;
          margin: 0;
          text-align: center;
          line-height: 50px;
          background: #fff;
          box-shadow:
            0 2px 1px -1px rgb(0 0 0 / 20%),
            0 1px 1px 0 rgb(0 0 0 / 14%),
            0 1px 3px 0 rgb(0 0 0 / 12%);
        }
      </style>

      <wpp-grid-v3-2-0
        .container="${true}"
        .fluid="${args.fluid}"
        .fullWidth="${args.fullWidth}"
        .fullHeight="${args.fullHeight}"
        .rowSpacing="${args.rowSpacing}"
        .columnSpacing="${args.columnSpacing}"
        .justifyContent="${args.justifyContent}"
        .alignItems="${args.alignItems}"
        .direction="${args.direction}"
      >
        ${innerList.map(
          (_, i) =>
            html` <wpp-grid-v3-2-0
              .item="${true}"
              .all="${args.all}"
              .sm="${args.sm}"
              .md="${args.md}"
              .lg="${args.lg}"
              .xl="${args.xl}"
              .xxl="${args.xxl}"
            >
              <p class="grid-item">${i + 1}</p>
            </wpp-grid-v3-2-0>`,
        )}
      </wpp-grid-v3-2-0>
    `
  },
  args: {
    fullHeight: false,
    fullWidth: false,
    fluid: false,
  },
}
