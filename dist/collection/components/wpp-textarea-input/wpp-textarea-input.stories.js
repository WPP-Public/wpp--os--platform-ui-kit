import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Selection and input/Text Area',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    name: { type: 'string' },
    placeholder: { type: 'string' },
    message: { type: 'string' },
    value: { type: 'string' },
    charactersLimit: { type: 'number' },
    warningThreshold: { type: 'number' },
    maxMessageLength: { type: 'number' },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
  },
};
export const WithinLimit = (args) => html ` <wpp-textarea-input-v2-22-0
  @click="${() => console.log('textarea clicked')}"
  .name="${args.name}"
  .placeholder="${args.placeholder}"
  .charactersLimit="${args.charactersLimit}"
  .warningThreshold="${args.warningThreshold}"
  .required="${args.required}"
  .disabled="${args.disabled}"
  .messageType="${args.messageType}"
  .maxMessageLength="${args.maxMessageLength}"
  .message="${args.message}"
  .rows="${args.rows}"
  .value="${args.value}"
  .locales="${args.locales}"
  .labelConfig="${args.labelConfig}"
/>`;
WithinLimit.args = {
  name: 'textarea-input',
  placeholder: 'Textarea',
  value: '',
  message: '',
  rows: 0,
  charactersLimit: 400,
  warningThreshold: 5,
  maxMessageLength: 220,
  disabled: false,
  required: true,
  locales: {
    charactersEntered: 'Characters',
  },
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
WithinLimit.parameters = {
  controls: { exclude: ['value'] },
};
export const LimitExceeded = (args) => html ` <wpp-textarea-input-v2-22-0
  @click="${() => console.log('textarea clicked')}"
  .name="${args.name}"
  .placeholder="${args.placeholder}"
  .required="${args.required}"
  .value="${args.value}"
  .rows="${args.rows}"
  .charactersLimit="${args.charactersLimit}"
  .warningThreshold="${args.warningThreshold}"
  .disabled="${args.disabled}"
  .locales="${args.locales}"
  .labelConfig="${args.labelConfig}"
/>`;
LimitExceeded.args = {
  name: 'textarea-input',
  placeholder: 'Textarea',
  value: 'Textarea',
  rows: 0,
  required: true,
  disabled: false,
  charactersLimit: 8,
  warningThreshold: 5,
  locales: {
    charactersEntered: 'Characters',
  },
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
LimitExceeded.parameters = {
  controls: { exclude: ['value', 'message', 'messageType', 'maxMessageLength'] },
};
export const NoneLimit = (args) => html ` <wpp-textarea-input-v2-22-0
  @click="${() => console.log('textarea clicked')}"
  .name="${args.name}"
  .placeholder="${args.placeholder}"
  .disabled="${args.disabled}"
  .required="${args.required}"
  .messageType="${args.messageType}"
  .maxMessageLength="${args.maxMessageLength}"
  .message="${args.message}"
  .value="${args.value}"
  .rows="${args.rows}"
  .labelConfig="${args.labelConfig}"
/>`;
NoneLimit.args = {
  name: 'textarea',
  placeholder: 'Textarea',
  message: '',
  rows: 0,
  value: '',
  maxMessageLength: 220,
  disabled: false,
  required: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
NoneLimit.parameters = {
  controls: { exclude: ['charactersLimit', 'warningThreshold'] },
};
