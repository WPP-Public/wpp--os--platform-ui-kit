import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppCheckboxGroup } from './wpp-checkbox-group'

export default {
  title: 'Design System/Components/Selection and input/Checkbox Group',
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
    value: {
      control: 'array',
      description: 'The selected values for the checkbox group',
    },
    direction: {
      options: ['column', 'row'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppCheckboxGroup>

export const CheckboxGroup: StoryObj<Components.WppCheckboxGroup> = {
  render: args => html`
    <wpp-checkbox-group-v3-3-0
      .value="${args.value}"
      .required=${args.required}
      .labelConfig=${args.labelConfig}
      .maxMessageLength="${args.maxMessageLength}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .direction="${args.direction}"
    >
      <wpp-checkbox-v3-3-0
        .required=${true}
        .value="${'option-1'}"
        .labelConfig=${{ text: 'Option-1' }}
        .name=${'option 1'}
      ></wpp-checkbox-v3-3-0>
      <wpp-checkbox-v3-3-0
        .required=${true}
        .value="${'option-2'}"
        .labelConfig=${{ text: 'Option-2' }}
        .name=${'option 2'}
      ></wpp-checkbox-v3-3-0>
      <wpp-checkbox-v3-3-0
        .required=${true}
        .value="${'option-3'}"
        .labelConfig=${{ text: 'Option-3' }}
        .name=${'option 3'}
      ></wpp-checkbox-v3-3-0>
      <wpp-checkbox-v3-3-0
        .required=${true}
        .value="${'option-4'}"
        .labelConfig=${{ text: 'Option-4' }}
        .name=${'option 4'}
      ></wpp-checkbox-v3-3-0>
    </wpp-checkbox-group-v3-3-0>
  `,
  args: {
    value: ['option-1', 'option-2'],
    message: 'Error message',
    messageType: 'error',
    required: true,
    direction: 'column',
    maxMessageLength: 10,
    labelConfig: { text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' },
  },
}
