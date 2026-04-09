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
    messageInTooltip: { control: { type: 'boolean' } },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    dropdownConfig: { control: 'object' },
  },
};
const SAMPLE_LIST_COMBINED = [
  {
    id: 1,
    label: 'None',
    value: '',
  },
  {
    id: 2,
    label: 'UAH',
    value: 'uah',
  },
  {
    id: 3,
    label: 'USD',
    value: 'usd',
  },
  {
    id: 4,
    label: 'EUR',
    value: 'eur',
  },
];
export const CombinedInput = (args) => {
  const handleChange = (event) => {
    console.log('Event:', event);
  };
  return html `
    <wpp-select-v3-6-0
      type="combined"
      name="combined-select"
      .message=${args.message}
      .messageType=${args.messageType}
      .size=${args.size}
      .messageInTooltip=${args.messageInTooltip}
      .placeholder=${args.placeholder}
      .disabled=${args.disabled}
      .dropdownConfig=${args.dropdownConfig}
      .value=${args.value}
      .inputValue=${args.inputValue}
      .required=${args.required}
      .labelConfig=${args.labelConfig}
      .dropdownWidth=${args.dropdownWidth}
      .list=${SAMPLE_LIST_COMBINED}
      @wppChange=${handleChange}
    >
    </wpp-select-v3-6-0>
  `;
};
CombinedInput.args = {
  value: 'usd',
  inputValue: '100',
  message: '',
  size: 'm',
  messageInTooltip: false,
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
