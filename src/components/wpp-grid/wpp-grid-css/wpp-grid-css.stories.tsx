import { html } from 'lit-html'

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

const getItemClassName = (breakpoint: string, size: string) => {
  let itemClassStr = 'wpp-grid-item-all'

  if (breakpoint && !size) {
    itemClassStr = `wpp-grid-item-${breakpoint}`
  }

  if (breakpoint && size === 'auto') {
    itemClassStr = `wpp-grid-item-${breakpoint}-auto`
  }

  if (breakpoint && size) {
    itemClassStr = `wpp-grid-item-${breakpoint}-${size}`
  }

  return itemClassStr
}

export default {
  title: 'Design System/Foundations/Grid/CSS',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
    viewport: {
      //👇 The viewports for grid
      viewports: customViewports,
    },
  },
  argTypes: {
    size: {
      options: [...[...new Array(24)].map((_, i) => i + 1), 'auto', null],
      control: { type: 'select' },
    },
    spacing: { type: 'string' },
    breakpoint: {
      options: ['all', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'select' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    fullHeight: {
      control: { type: 'boolean' },
    },
    fluid: {
      control: { type: 'boolean' },
    },
  },
}

export const CSSGrid = (args: any) => {
  const innerList = Array.from(Array(24).keys())

  const wrapperClassName =
    'wpp-grid-container' +
    `${args.fullWidth ? ' full-width' : ''}` +
    `${args.fullHeight ? ' full-height' : ''}` +
    `${args.fluid ? ' fluid' : ''}`
  const itemClassName = getItemClassName(args.breakpoint, args.size)

  return html`
    <style>
      .grid-wrapper {
        width: 100%;
        padding: 8px 0;
      }

      .grid-wrapper-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 8px 0 16px;
      }

      .grid-wrapper-title p {
        text-align: center;
      }

      .grid-item {
        width: 100%;
        height: 150px;
        margin: 0;
        text-align: center;
        line-height: 25px;
        background: #fff;
        box-shadow:
          0 2px 1px -1px rgb(0 0 0 / 20%),
          0 1px 1px 0 rgb(0 0 0 / 14%),
          0 1px 3px 0 rgb(0 0 0 / 12%);
      }

      .grid-item-title {
        margin-bottom: 25px;
      }
    </style>

    <div class="grid-wrapper">
      <div class="grid-wrapper-title">
        <p style="margin-bottom: 4px;">.${wrapperClassName}</p>
        <p>--wpp-grid-row-spacing: ${args.spacing}</p>
        <p>--wpp-grid-column-spacing: ${args.spacing}</p>
      </div>

      <div
        class="${wrapperClassName}"
        style="--wpp-grid-row-spacing: ${args.spacing}; --wpp-grid-column-spacing: ${args.spacing}"
      >
        ${innerList.map(
          (_, i) => html`
            <div class="${itemClassName}">
              <div class="grid-item">
                <p class="grid-item-title">${i}</p>
                <p>.${itemClassName}</p>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `
}

CSSGrid.args = {
  size: '1',
  spacing: '2',
  breakpoint: 'xs',
}
