import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppRadio } from './wpp-radio'
import readme from './readme.md'

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
  disabled: {
    options: [true, false],
    control: { type: 'boolean' },
  },
  checked: {
    options: [true, false],
    control: { type: 'boolean' },
  },
} as Meta<typeof WppRadio>

export const NoLabel: Story<Components.WppRadio> = (args: Components.WppRadio) => html` <wpp-radio-v3-1-1
  @wppChange="${(event: any) => console.log('wppChange => ', event.detail.value)}"
  .name="${args.name}"
  .value="${args.value}"
  .disabled="${args.disabled}"
  .checked="${args.checked}"
/>`

NoLabel.args = {
  name: 'contact',
  value: 'email',
  disabled: false,
  checked: false,
}

export const WithLabel: Story<Components.WppRadio> = (args: Components.WppRadio) => html` <wpp-radio-v3-1-1
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
