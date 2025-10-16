import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Selection and input/Toggle',
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
} as Meta<Components.WppToggle>

export const NoLabel: StoryObj<Components.WppToggle> = (args: Components.WppToggle) =>
  html` <wpp-toggle-v3-2-0
    @wppChange="${(event: any) => console.log('wppChange => ', event.detail.value)}"
    .name="${args.name}"
    .value="${args.value}"
    .disabled="${args.disabled}"
    .checked="${args.checked}"
    .ariaProps="${{ label: 'Contact method' }}"
  />`

NoLabel.args = {
  name: 'contact',
  value: 'email',
  disabled: false,
  checked: false,
  ariaProps: { label: 'Contact method' },
}

export const WithLabel: StoryObj<Components.WppToggle> = (args: Components.WppToggle) =>
  html` <wpp-toggle-v3-2-0
    @wppChange="${(event: any) => console.log('wppChange => ', event.detail.value)}"
    .name="${args.name}"
    .value="${args.value}"
    .disabled="${args.disabled}"
    .checked="${args.checked}"
    .required="${args.required}"
    .labelConfig="${args.labelConfig}"
  />`

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
}
