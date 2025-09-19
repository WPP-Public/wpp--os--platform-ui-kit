import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppCheckbox } from './wpp-checkbox'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Selection and input/Checkbox',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppCheckbox>

export const NoLabel: Story<Components.WppCheckbox> = (args: Components.WppCheckbox) => html` <wpp-checkbox-v3-1-1
  @click="${() => console.log('checkbox clicked')}"
  .disabled="${args.disabled}"
  .checked="${args.checked}"
  .indeterminate="${args.indeterminate}"
  .name="${args.name}"
  .message="${args.message}"
  .messageType="${args.messageType}"
></wpp-checkbox-v3-1-1>`

NoLabel.args = {
  disabled: false,
  checked: false,
  indeterminate: false,
  name: 'checkbox',
  message: '',
}

export const WithLabel: Story<Components.WppCheckbox> = (args: Components.WppCheckbox) => html` <wpp-checkbox-v3-1-1
  @click="${() => console.log('checkbox clicked')}"
  .disabled="${args.disabled}"
  .checked="${args.checked}"
  .indeterminate="${args.indeterminate}"
  .name="${args.name}"
  .required="${args.required}"
  .message="${args.message}"
  .messageType="${args.messageType}"
  .labelConfig="${args.labelConfig}"
></wpp-checkbox-v3-1-1>`

WithLabel.args = {
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
}
