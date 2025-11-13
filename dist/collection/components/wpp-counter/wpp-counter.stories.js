import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Counter',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    name: { type: 'string' },
    value: { type: 'number' },
    message: { type: 'string' },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    min: { type: 'number' },
    max: { type: 'number' },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    withButtons: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    required: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
};
export const Counter = {
  render: args => html ` <wpp-counter-v3-3-1
      .name="${args.name}"
      .value="${args.value}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .messageType="${args.messageType}"
      .size="${args.size}"
      .message="${args.message}"
      .min="${args.min}"
      .max="${args.max}"
      .labelConfig="${args.labelConfig}"
      .withButtons="${args.withButtons}"
    >
    </wpp-counter-v3-3-1>`,
  args: {
    name: 'counter',
    value: 1,
    message: '',
    min: 1,
    max: 100,
    size: 'm',
    disabled: false,
    withButtons: true,
    required: true,
    labelConfig: {
      icon: '',
      text: '',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
  },
};
