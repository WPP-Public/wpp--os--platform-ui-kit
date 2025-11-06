import { html } from 'lit-html';
import readme from './readme.md';
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
};
export const CheckboxGroup = (args) => html `
  <wpp-checkbox-group-v2-22-0
    .value="${args.value}"
    .required=${args.required}
    .labelConfig=${args.labelConfig}
    .maxMessageLength="${args.maxMessageLength}"
    .message="${args.message}"
    .messageType="${args.messageType}"
  >
    <wpp-checkbox-v2-22-0
      .required=${true}
      .value="${'option-1'}"
      .labelConfig=${{ text: 'Option-1' }}
    ></wpp-checkbox-v2-22-0>
    <wpp-checkbox-v2-22-0
      .required=${true}
      .value="${'option-2'}"
      .labelConfig=${{ text: 'Option-2' }}
    ></wpp-checkbox-v2-22-0>
    <wpp-checkbox-v2-22-0
      .required=${true}
      .value="${'option-3'}"
      .labelConfig=${{ text: 'Option-3' }}
    ></wpp-checkbox-v2-22-0>
    <wpp-checkbox-v2-22-0
      .required=${true}
      .value="${'option-4'}"
      .labelConfig=${{ text: 'Option-4' }}
    ></wpp-checkbox-v2-22-0>
  </wpp-checkbox-group-v2-22-0>
`;
CheckboxGroup.args = {
  value: ['option-1', 'option-2'],
  message: 'Error message',
  messageType: 'error',
  required: true,
  maxMessageLength: 10,
  labelConfig: { text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' },
};
