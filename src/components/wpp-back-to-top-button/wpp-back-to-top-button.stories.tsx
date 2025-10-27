import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Actions/Other buttons/Back to top button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta<Components.WppBackToTopButton>

export const BackToTop: StoryObj<Components.WppBackToTopButton> = {
  render: () => html`<wpp-back-to-top-button-v3-3-0 @click="${() => console.log('Button clicked')}" />`,
}
