import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Selection and input/Radio/Radio Group',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    direction: {
      options: ['column', 'row'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppRadioGroup>

export const RadioGroup: StoryObj<Components.WppRadioGroup> = (args: Components.WppRadioGroup) => html`
  <wpp-radio-group-v3-2-0
    .required=${args.required}
    .labelConfig=${args.labelConfig}
    .maxMessageLength="${args.maxMessageLength}"
    .direction="${args.direction}"
    .message="${args.message}"
    .messageType="${args.messageType}"
    style="display: inline-flex; flex-direction: column; height: 80px; justify-content: space-between"
  >
    <wpp-radio-v3-2-0
      .required=${true}
      name="contact"
      value="email"
      .labelConfig=${{ text: 'Email' }}
    ></wpp-radio-v3-2-0>
    <wpp-radio-v3-2-0 .required=${true} name="contact" value="mail" .labelConfig=${{ text: 'Mail' }}></wpp-radio-v3-2-0>
    <wpp-radio-v3-2-0
      .required=${true}
      name="contact"
      value="phone"
      .labelConfig=${{ text: 'Phone' }}
    ></wpp-radio-v3-2-0>
  </wpp-radio-group-v3-2-0>
`

RadioGroup.args = {
  required: true,
  message: 'Error message',
  messageType: 'error',
  maxMessageLength: 10,
  direction: 'column',
  labelConfig: { text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' },
}
