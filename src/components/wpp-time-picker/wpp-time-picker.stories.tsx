import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import readme from './readme.md'

export default {
  title: 'Design System/Components/Selection and input/Time Picker',
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
      options: ['m', 's'],
      control: { type: 'select' },
    },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    minutesInterval: {
      options: [1, 5, 10, 15],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppTimePicker>

export const TimePicker: StoryObj<Components.WppTimePicker> = (args: Components.WppTimePicker) =>
  html`<wpp-time-picker-v3-2-0
    .size="${args.size}"
    .messageType="${args.messageType}"
    .minutesInterval="${args.minutesInterval}"
    .disabled="${args.disabled}"
    .message="${args.message}"
    .labelConfig="${args.labelConfig}"
    .required="${args.required}"
    .placeholder="${args.placeholder}"
    .width="${args.width}"
    .name="${args.name}"
    @wppChange="${(e: any) => console.log('onWppClick', e)}"
    @wppClear="${(e: any) => console.log('onWppClear', e)}"
    ></wpp-time-picker-v3-2-0
    `

TimePicker.args = {
  size: 'm',
  disabled: false,
  minutesInterval: 15,
  message: 'Helper text',
  labelConfig: {
    icon: '',
    text: 'Label',
    description: '',
  },
  name: 'time-picker',
  required: false,
  placeholder: 'hh:mm',
  width: '198px',
}
