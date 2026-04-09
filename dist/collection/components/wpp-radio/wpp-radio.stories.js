import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Radio',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  disabled: {
    options: [true, false],
    control: { type: 'boolean' },
  },
  checked: {
    options: [true, false],
    control: { type: 'boolean' },
  },
};
export const NoLabel = (args) => html ` <wpp-radio-v3-6-0
    @wppChange="${(event) => console.log('wppChange => ', event.detail.value)}"
    .name="${args.name}"
    .value="${args.value}"
    .disabled="${args.disabled}"
    .checked="${args.checked}"
  />`;
NoLabel.args = {
  name: 'contact',
  value: 'email',
  disabled: false,
  checked: false,
};
export const WithLabel = (args) => html ` <wpp-radio-v3-6-0
    @wppChange="${(event) => console.log('wppChange => ', event.detail.value)}"
    .name="${args.name}"
    .value="${args.value}"
    .disabled="${args.disabled}"
    .checked="${args.checked}"
    .required="${args.required}"
    .labelConfig="${args.labelConfig}"
  />`;
WithLabel.args = {
  name: 'contact',
  value: 'email',
  disabled: false,
  checked: false,
  required: true,
  labelConfig: {
    icon: '',
    text: 'Label',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
