import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Actions/Other buttons/More Button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppMoreButton>

export const MoreButton: StoryObj<Components.WppMoreButton> = (args: Components.WppMoreButton) =>
  html` <wpp-more-button-v3-2-0
    .size="${args.size}"
    .name="${args.name}"
    .disabled="${args.disabled}"
    .loading="${args.loading}"
    .ariaProps=${{ label: 'More items menu' }}
    @click="${() => console.log('Button clicked')}"
  />`

MoreButton.args = {
  size: 'm',
  name: 'More actions',
  disabled: false,
  loading: false,
  ariaProps: {
    label: 'More actions button',
  },
}
