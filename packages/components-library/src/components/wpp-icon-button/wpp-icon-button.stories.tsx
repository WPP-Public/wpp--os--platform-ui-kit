import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppIconButton } from './wpp-icon-button'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Actions/Regular button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppIconButton>

export const Icon: Story<Components.WppIconButton> = (args: Components.WppIconButton) => html`
  <wpp-typography-v3-1-1 style="display: block; margin-bottom: 10px;" type="xl-heading"
    >WppIconButton is deprecated. Use WppActionButton instead.</wpp-typography-v3-1-1
  >
  <wpp-icon-button-v3-1-1
    @click="${() => console.log('button clicked')}"
    .size="${args.size}"
    .disabled="${args.disabled}"
    .loading="${args.loading}"
  >
    <wpp-icon-more-v3-1-1 direction="horizontal" />
  </wpp-icon-button-v3-1-1>
`

Icon.args = {
  size: 'm',
  disabled: false,
  loading: false,
}
