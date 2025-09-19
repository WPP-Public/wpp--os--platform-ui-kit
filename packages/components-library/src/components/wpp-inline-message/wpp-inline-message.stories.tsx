import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppInlineMessage } from './wpp-inline-message'
import readme from './readme.md'

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
} as Meta<typeof WppInlineMessage>

export const Warning: Story<Components.WppInlineMessage> = (args: Components.WppInlineMessage) =>
  html` <wpp-inline-message-v3-1-1
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`

Warning.args = {
  size: 'l',
  message: 'Warning message',
  type: 'warning',
  titleText: 'Title',
  actionBtnText: 'Action',
}

Warning.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
}

export const Error: Story<Components.WppInlineMessage> = (args: Components.WppInlineMessage) =>
  html` <wpp-inline-message-v3-1-1
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`

Error.args = {
  size: 'l',
  message: 'Error message',
  type: 'error',
  titleText: 'Title',
  actionBtnText: 'Action',
}

Error.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
}

export const Informational: Story<Components.WppInlineMessage> = (args: Components.WppInlineMessage) =>
  html` <wpp-inline-message-v3-1-1
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`

Informational.args = {
  size: 'l',
  message: 'Info message',
  type: 'information',
  titleText: 'Title',
  actionBtnText: 'Action',
}

Informational.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
}

export const Success: Story<Components.WppInlineMessage> = (args: Components.WppInlineMessage) =>
  html` <wpp-inline-message-v3-1-1
    .titleText="${args.titleText}"
    .actionBtnText="${args.actionBtnText}"
    .size="${args.size}"
    .message="${args.message}"
    .type="${args.type}"
  />`

Success.args = {
  size: 'l',
  message: 'Success message',
  type: 'success',
  titleText: 'Title',
  actionBtnText: 'Action',
}

Success.parameters = {
  controls: {
    exclude: ['showTooltipFrom'],
  },
}

export const WithInput = (args: Components.WppInput) => html`
  <div style="max-width: 500px; width: 100%;">
    <wpp-input-v3-1-1
      .size="${args.size}"
      .message="${args.message}"
      .messageType="${args.type}"
      .maxMessageLength="${args.maxMessageLength}"
      .tooltipConfig="${args.tooltipConfig}"
    />
  </div>
`

WithInput.args = {
  size: 's',
  message: 'Probably, one of the longest and detailed warning messages ever met in the User Interface.',
  type: 'warning',
  maxMessageLength: 'auto',
  tooltipConfig: {},
}
