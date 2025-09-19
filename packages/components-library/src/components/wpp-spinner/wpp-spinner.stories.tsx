import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppSpinner } from './wpp-spinner'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Feedback/Spinner',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    color: {
      options: ['var(--wpp-primary-color-500)', 'var(--wpp-grey-color-800)', 'var(--wpp-grey-color-000)'],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppSpinner>

export const Spinner: Story<Components.WppSpinner> = (args: Components.WppSpinner) => html` <div
  style="padding: 10px; background-color: ${args.color === 'var(--wpp-grey-color-000)' ? '#697077' : 'white'}"
>
  <wpp-spinner-v3-1-1 .color="${args.color}" .size="${args.size}" />
</div>`

Spinner.args = {
  color: 'var(--wpp-primary-color-500)',
  size: 's',
}
