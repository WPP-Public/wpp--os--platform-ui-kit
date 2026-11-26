import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Checkbox',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};
export const NoLabel = {
  render: args => html ` <wpp-checkbox-v4-7-0
      @click="${() => console.log('checkbox clicked')}"
      .disabled="${args.disabled}"
      .checked="${args.checked}"
      .indeterminate="${args.indeterminate}"
      .name="${args.name}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .ariaProps="${args.ariaProps}"
    ></wpp-checkbox-v4-7-0>`,
  args: {
    disabled: false,
    checked: false,
    indeterminate: false,
    name: 'checkbox',
    message: '',
    // Without a visible label the checkbox still needs an accessible name.
    ariaProps: { label: 'Checkbox' },
  },
};
export const WithLabel = {
  render: args => html ` <wpp-checkbox-v4-7-0
      @click="${() => console.log('checkbox clicked')}"
      .disabled="${args.disabled}"
      .checked="${args.checked}"
      .indeterminate="${args.indeterminate}"
      .name="${args.name}"
      .required="${args.required}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .labelConfig="${args.labelConfig}"
    ></wpp-checkbox-v4-7-0>`,
  args: {
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
  },
};
