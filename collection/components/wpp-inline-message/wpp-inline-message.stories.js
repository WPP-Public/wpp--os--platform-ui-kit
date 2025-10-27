import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Feedback/Inline Message',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
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
    showTooltipFrom: {
      control: { type: 'select' },
      options: [50, 120, '"auto"'],
      defaultValue: 50,
    },
    maxMessageLength: {
      control: { type: 'select' },
      options: [50, 120, 'auto'],
      disable: true,
      defaultValue: 50,
    },
  },
};
export const Warning = {
  render: args => html ` <wpp-inline-message-v3-3-0
      .titleText="${args.titleText}"
      .actionBtnText="${args.actionBtnText}"
      .size="${args.size}"
      .message="${args.message}"
      .type="${args.type}"
      .showTooltipFrom="${args.showTooltipFrom}"
    />`,
  args: {
    size: 'l',
    message: 'Warning message',
    type: 'warning',
    titleText: 'Title',
    actionBtnText: 'Action',
    showTooltipFrom: 50,
  },
};
Warning.parameters = {
  controls: {
    exclude: ['maxMessageLength'],
  },
};
export const Error = {
  render: args => html ` <wpp-inline-message-v3-3-0
      .titleText="${args.titleText}"
      .actionBtnText="${args.actionBtnText}"
      .size="${args.size}"
      .message="${args.message}"
      .type="${args.type}"
      .showTooltipFrom="${args.showTooltipFrom}"
    />`,
  args: {
    size: 'l',
    message: 'Error message',
    type: 'error',
    titleText: 'Title',
    actionBtnText: 'Action',
    showTooltipFrom: 50,
  },
};
Error.parameters = {
  controls: {
    exclude: ['maxMessageLength'],
  },
};
export const Informational = {
  render: args => html ` <wpp-inline-message-v3-3-0
      .titleText="${args.titleText}"
      .actionBtnText="${args.actionBtnText}"
      .size="${args.size}"
      .message="${args.message}"
      .type="${args.type}"
      .showTooltipFrom="${args.showTooltipFrom}"
    />`,
  args: {
    size: 'l',
    message: 'Info message',
    type: 'information',
    titleText: 'Title',
    actionBtnText: 'Action',
    showTooltipFrom: 50,
  },
};
Informational.parameters = {
  controls: {
    exclude: ['maxMessageLength'],
  },
};
export const Success = {
  render: args => html ` <wpp-inline-message-v3-3-0
      .titleText="${args.titleText}"
      .actionBtnText="${args.actionBtnText}"
      .size="${args.size}"
      .message="${args.message}"
      .type="${args.type}"
      .showTooltipFrom="${args.showTooltipFrom}"
    />`,
  args: {
    size: 'l',
    message: 'Success message',
    type: 'success',
    titleText: 'Title',
    actionBtnText: 'Action',
    showTooltipFrom: 50,
  },
};
Success.parameters = {
  controls: {
    exclude: ['maxMessageLength'],
  },
};
export const WithInput = (args) => html `
  <div style="max-width: 500px; width: 100%;">
    <wpp-input-v3-3-0
      .size="${args.size}"
      .labelConfig="${args.labelConfig}"
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
  labelConfig: { text: 'Input Label' },
  tooltipConfig: {},
};
WithInput.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
};
