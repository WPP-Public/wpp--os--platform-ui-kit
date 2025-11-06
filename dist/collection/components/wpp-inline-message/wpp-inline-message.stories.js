import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Feedback/Inline Message',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
    },
    type: {
      options: ['warning', 'error', 'information', 'success'],
      control: { type: 'select' },
    },
    maxMessageLength: {
      control: { type: 'select' },
      options: [50, 120, 'auto'],
      disable: true,
      defaultValue: 50,
    },
  },
};
export const Warning = (args) => html ` <wpp-inline-message-v2-22-0
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`;
Warning.args = {
  size: 'l',
  message: 'Warning message',
  type: 'warning',
  titleText: 'Title',
  actionBtnText: 'Action',
};
Warning.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
};
export const Error = (args) => html ` <wpp-inline-message-v2-22-0
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`;
Error.args = {
  size: 'l',
  message: 'Error message',
  type: 'error',
  titleText: 'Title',
  actionBtnText: 'Action',
};
Error.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
};
export const Informational = (args) => html ` <wpp-inline-message-v2-22-0
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`;
Informational.args = {
  size: 'l',
  message: 'Info message',
  type: 'information',
  titleText: 'Title',
  actionBtnText: 'Action',
};
Informational.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
};
export const Success = (args) => html ` <wpp-inline-message-v2-22-0
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`;
Success.args = {
  size: 'l',
  message: 'Success message',
  type: 'success',
  titleText: 'Title',
  actionBtnText: 'Action',
};
Success.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
};
export const WithInput = (args) => html `
  <div style="max-width: 500px; width: 100%;">
    <wpp-input-v2-22-0
      .size="${args.size}"
      .message="${args.message}"
      .messageType="${args.type}"
      .maxMessageLength="${args.maxMessageLength}"
      .tooltipConfig="${args.tooltipConfig}"
    />
  </div>
`;
WithInput.args = {
  size: 's',
  message: 'Probably, one of the longest and detailed warning messages ever met in the User Interface.',
  type: 'warning',
  maxMessageLength: 'auto',
  tooltipConfig: {},
};
