import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppMoreButton } from './wpp-more-button'
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
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppMoreButton>

export const MoreButton: Story<Components.WppMoreButton> = (
  args: Components.WppMoreButton,
) => html` <wpp-more-button-v3-1-1
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
