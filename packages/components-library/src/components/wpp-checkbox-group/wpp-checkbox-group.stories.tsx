import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppCheckboxGroup } from './wpp-checkbox-group'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Selection and input/Checkbox',
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
    value: {
      control: 'array',
      description: 'The selected values for the checkbox group',
    },
  },
} as Meta<typeof WppCheckboxGroup>

export const CheckboxGroup: Story<Components.WppCheckboxGroup> = (args: Components.WppCheckboxGroup) => html`
  <wpp-checkbox-group-v3-1-1
    .value="${args.value}"
    .required=${args.required}
    .labelConfig=${args.labelConfig}
    .maxMessageLength="${args.maxMessageLength}"
    .message="${args.message}"
    .messageType="${args.messageType}"
  >
    <wpp-checkbox-v3-1-1
      .required=${true}
      .value="${'option-1'}"
      .labelConfig=${{ text: 'Option-1' }}
      .name=${'option 1'}
    ></wpp-checkbox-v3-1-1>
    <wpp-checkbox-v3-1-1
      .required=${true}
      .value="${'option-2'}"
      .labelConfig=${{ text: 'Option-2' }}
      .name=${'option 2'}
    ></wpp-checkbox-v3-1-1>
    <wpp-checkbox-v3-1-1
      .required=${true}
      .value="${'option-3'}"
      .labelConfig=${{ text: 'Option-3' }}
      .name=${'option 3'}
    ></wpp-checkbox-v3-1-1>
    <wpp-checkbox-v3-1-1
      .required=${true}
      .value="${'option-4'}"
      .labelConfig=${{ text: 'Option-4' }}
      .name=${'option 4'}
    ></wpp-checkbox-v3-1-1>
  </wpp-checkbox-group-v3-1-1>
`

CheckboxGroup.args = {
  value: ['option-1', 'option-2'],
  message: 'Error message',
  messageType: 'error',
  required: true,
  maxMessageLength: 10,
  labelConfig: { text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' },
}
