import { html } from 'lit-html';
import ListItemReadme from './../../../wpp-list-item/readme.md';
import SingleSelectReadme from './../../readme.md';
export default {
  title: 'Design System/Components/Selection and input/Combined Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: SingleSelectReadme, Items: ListItemReadme },
  },
  argTypes: {
    placeholder: { type: 'string' },
    message: { control: { type: 'text' } },
    caption: { control: { type: 'text' } },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    dropdownConfig: { control: 'object' },
  },
};
export const CombinedInput = (args) => html `
  <wpp-select-v2-22-0
    type="combined"
    name="combined-select"
    .message=${args.message}
    .messageType=${args.messageType}
    .size=${args.size}
    .placeholder=${args.placeholder}
    .disabled=${args.disabled}
    .dropdownConfig=${args.dropdownConfig}
    .value=${args.value}
    .inputValue=${args.inputValue}
    .required=${args.required}
    .labelConfig="${args.labelConfig}"
    .dropdownWidth="${args.dropdownWidth}"
  >
    <wpp-list-item-v2-22-0 .value=${''}>
      <p slot="label">None</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 value="uah">
      <p slot="label">UAH</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 value="usd">
      <p slot="label">USD</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 value="eur">
      <p slot="label">EUR</p>
    </wpp-list-item-v2-22-0>
  </wpp-select-v2-22-0>
`;
CombinedInput.args = {
  value: 'usd',
  inputValue: '100',
  message: '',
  size: 'm',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
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
CombinedInput.parameters = {
  controls: { exclude: ['placeholder', 'caption', 'withSearch'] },
};
