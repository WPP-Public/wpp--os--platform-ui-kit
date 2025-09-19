import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'
import wppTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/themes/wpp.css'
import '../versioned-components/version'

// This will call "defineCustomElement<WppComponent>" for each component
// found in "../components/index.js". This is needed so storybook will recognize
// the elements in its environment.
import * as Components from '../components'
Object.keys(Components)
  .filter(key => key.startsWith('defineCustomElementWpp'))
  .forEach(key => {
    Components[key]() // Call each defineCustomElement function
  })

import '!style-loader!css-loader!../src/reset.css'
import '!style-loader!css-loader!../src/global.css'
import '!style-loader!css-loader!../src/global.css'
import '!style-loader!css-loader!../src/shared/styles/grid.css'

export const parameters = {
  options: {
    storySort: {
      order: ['Guidelines', ['Welcome', 'Changelog', 'Installation guides', 'Theming', 'FAQ'], 'Design System'],
      method: 'alphabetical',
    },
    showPanel: true,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  previewTabs: {
    docs: {
      hidden: false,
    },
    canvas: {
      title: 'Story',
      hidden: false,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssVariables: {
    files: {
      WPP: wppTheme,
    },
    defaultTheme: 'WPP',
  },
}

export const decorators = [cssVariablesTheme]
