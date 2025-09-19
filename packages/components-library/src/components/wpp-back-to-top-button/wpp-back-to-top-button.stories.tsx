import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppBackToTopButton } from './wpp-back-to-top-button'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Actions/Other buttons',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
} as Meta<typeof WppBackToTopButton>

export const BackToTop: Story<Components.WppBackToTopButton> = () =>
  html`<wpp-back-to-top-button-v3-1-1 @click="${() => console.log('Button clicked')}" />`

BackToTop.args = {}
