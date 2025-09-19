import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppToast } from './wpp-toast'
import ToastReadme from './readme.md'
import ToastContainerReadme from './components/wpp-toast-container/readme.md'

export default {
  title: 'Design System/Components/Feedback/Toast',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: ToastContainerReadme, Items: ToastReadme },
  },
  argTypes: {
    message: { type: 'string' },
    header: { type: 'string' },
    type: {
      options: ['warning', 'error', 'information', 'success'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppToast>

const primaryBtn = {
  label: 'Button',
  variant: 'inverted' as const,
  disabled: false,
  loading: false,
  onClick: () => alert('Some action'),
}

export const ActionOff: Story<Components.WppToast> = (args: Components.WppToast) => html`
  <wpp-toast-v3-1-1
    .message="${args.message}"
    .icon="${args.icon}"
    .maxMessageLines="${args.maxMessageLines}"
    .header="${args.header}"
    .type="${args.type}"
    .duration="${60000000}"
  />
`

ActionOff.args = {
  message: 'Successful message',
  icon: {
    name: '',
    url: '',
    styles: {},
  },
  maxMessageLines: 2,
  header: 'Title',
  type: 'success',
}

export const ActionOn: Story<Components.WppToast> = (args: Components.WppToast) => html`
  <wpp-toast-v3-1-1
    .message="${args.message}"
    .icon="${args.icon}"
    .maxMessageLines="${args.maxMessageLines}"
    .header="${args.header}"
    .type="${args.type}"
    .primaryBtn="${primaryBtn}"
    .duration="${30000}"
    .ariaProps="${args.ariaProps}"
  >
  </wpp-toast-v3-1-1>
`

ActionOn.args = {
  message: 'Warning message',
  icon: {
    name: '',
    url: '',
    styles: {},
  },
  maxMessageLines: 2,
  header: 'Title',
  type: 'warning',
  ariaProps: {
    label: 'Button',
  },
}
