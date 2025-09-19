import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppFloatingButton } from './wpp-floating-button'
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
} as Meta<typeof WppFloatingButton>

export const Floating: Story<Components.WppFloatingButton> = (
  args: Components.WppFloatingButton,
) => html` <wpp-floating-button-v3-1-1
  .disabled="${args.disabled}"
  .loading="${args.loading}"
  .ariaProps="${args.ariaProps}"
  @click="${() => console.log('Button clicked')}"
/>`

Floating.args = {
  disabled: false,
  loading: false,
  ariaProps: { label: 'Add another category' },
}
