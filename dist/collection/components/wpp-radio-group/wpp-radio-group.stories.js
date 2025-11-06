import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Selection and input/Radio',
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
  },
};
export const RadioGroup = (args) => html `
  <wpp-radio-group-v2-22-0
    .required=${args.required}
    .labelConfig=${args.labelConfig}
    .maxMessageLength="${args.maxMessageLength}"
    .message="${args.message}"
    .messageType="${args.messageType}"
    style="display: inline-flex; flex-direction: column; height: 80px; justify-content: space-between"
  >
    <wpp-radio-v2-22-0
      .required=${true}
      name="contact"
      value="email"
      .labelConfig=${{ text: 'Email' }}
    ></wpp-radio-v2-22-0>
    <wpp-radio-v2-22-0
      .required=${true}
      name="contact"
      value="mail"
      .labelConfig=${{ text: 'Mail' }}
    ></wpp-radio-v2-22-0>
    <wpp-radio-v2-22-0
      .required=${true}
      name="contact"
      value="phone"
      .labelConfig=${{ text: 'Phone' }}
    ></wpp-radio-v2-22-0>
  </wpp-radio-group-v2-22-0>
`;
RadioGroup.args = {
  required: true,
  message: 'Error message',
  messageType: 'error',
  maxMessageLength: 10,
  labelConfig: { text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' },
};
