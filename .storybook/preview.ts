import type { Preview } from '@storybook/web-components-vite'

import '../src/themes/wpp.css'
import '../src/reset.css'
import '../src/global.css'
import '../src/shared/styles/grid.css'

// Register all web components so Storybook recognizes them
import * as Components from '../components'
Object.keys(Components)
  .filter(key => key.startsWith('defineCustomElementWpp'))
  .forEach(key => {
    Components[key]() // Call each defineCustomElement function
  })

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        method: 'alphabetical',
      },
      showPanel: true,
    },

    actions: { argTypesRegex: '^on[A-Z].*' },
    previewTabs: {
      canvas: {
        title: 'Story',
        hidden: false,
      },
    },
  },
}

export default preview
