import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Actions/Regular button/Icon button',
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
} as Meta<Components.WppIconButton>

export const Icon: StoryObj<Components.WppIconButton> = {
  render: args => html`
    <wpp-typography-v3-2-0 style="display: block; margin-bottom: 10px;" type="xl-heading"
      >WppIconButton is deprecated. Use WppActionButton instead.</wpp-typography-v3-2-0
    >
    <wpp-icon-button-v3-2-0
      @click="${() => console.log('button clicked')}"
      .size="${args.size}"
      .disabled="${args.disabled}"
      .loading="${args.loading}"
    >
      <wpp-icon-more-v3-2-0 direction="horizontal" />
    </wpp-icon-button-v3-2-0>
  `,
  args: {
    size: 'm',
    disabled: false,
    loading: false,
  },
}
