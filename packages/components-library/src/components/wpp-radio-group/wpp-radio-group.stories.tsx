import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppRadioGroup } from './wpp-radio-group'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Selection and input/Radio',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppRadioGroup>

export const RadioGroup: Story<Components.WppRadioGroup> = (args: Components.WppRadioGroup) => html`
  <wpp-radio-group-v3-1-1
    .required=${args.required}
    .labelConfig=${args.labelConfig}
    .maxMessageLength="${args.maxMessageLength}"
    .message="${args.message}"
    .messageType="${args.messageType}"
    style="display: inline-flex; flex-direction: column; height: 80px; justify-content: space-between"
  >
    <wpp-radio-v3-1-1
      .required=${true}
      name="contact"
      value="email"
      .labelConfig=${{ text: 'Email' }}
    ></wpp-radio-v3-1-1>
    <wpp-radio-v3-1-1 .required=${true} name="contact" value="mail" .labelConfig=${{ text: 'Mail' }}></wpp-radio-v3-1-1>
    <wpp-radio-v3-1-1
      .required=${true}
      name="contact"
      value="phone"
      .labelConfig=${{ text: 'Phone' }}
    ></wpp-radio-v3-1-1>
  </wpp-radio-group-v3-1-1>
`

RadioGroup.args = {
  required: true,
  message: 'Error message',
  messageType: 'error',
  maxMessageLength: 10,
  labelConfig: { text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' },
}
