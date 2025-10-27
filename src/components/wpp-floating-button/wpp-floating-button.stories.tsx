import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Actions/Other buttons/Floating button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta<Components.WppFloatingButton>

export const Floating: StoryObj<Components.WppFloatingButton> = {
  render: args =>
    html` <wpp-floating-button-v3-3-0
      .disabled="${args.disabled}"
      .loading="${args.loading}"
      .ariaProps="${args.ariaProps}"
      @click="${() => console.log('Button clicked')}"
    />`,
  args: {
    disabled: false,
    loading: false,
    ariaProps: { label: 'Add another category' },
  },
}
