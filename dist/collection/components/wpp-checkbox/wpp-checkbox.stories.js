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
    disabled: { control: { type: 'boolean' } },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};
export const NoLabel = (args) => html ` <wpp-checkbox-v2-22-0
  @click="${() => console.log('checkbox clicked')}"
  .disabled="${args.disabled}"
  .checked="${args.checked}"
  .indeterminate="${args.indeterminate}"
  .name="${args.name}"
  .message="${args.message}"
  .messageType="${args.messageType}"
></wpp-checkbox-v2-22-0>`;
NoLabel.args = {
  disabled: false,
  checked: false,
  indeterminate: false,
  name: 'checkbox',
  message: '',
};
export const WithLabel = (args) => html ` <wpp-checkbox-v2-22-0
  @click="${() => console.log('checkbox clicked')}"
  .disabled="${args.disabled}"
  .checked="${args.checked}"
  .indeterminate="${args.indeterminate}"
  .name="${args.name}"
  .required="${args.required}"
  .message="${args.message}"
  .messageType="${args.messageType}"
  .labelConfig="${args.labelConfig}"
></wpp-checkbox-v2-22-0>`;
WithLabel.args = {
  disabled: false,
  checked: false,
  indeterminate: false,
  required: true,
  name: 'checkbox',
  message: '',
  labelConfig: {
    icon: '',
    text: 'Label',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
