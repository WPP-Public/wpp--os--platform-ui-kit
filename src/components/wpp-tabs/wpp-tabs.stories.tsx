import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Navigation/Tabs',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppTabs>

export const Tabs: StoryObj<Components.WppTab> = (args: Components.WppTab) => html`
  <wpp-tabs-v3-3-0 value="houses" .size="${args.size}">
    <wpp-tab-v3-3-0 value="houses" icon="wpp-icon-pie-chart" .counter="${args.counter}">Houses</wpp-tab-v3-3-0>
    <wpp-tab-v3-3-0 icon="wpp-icon-bar-chart" .counter="${args.counter}" value="cars">A Bit Longer Text</wpp-tab-v3-3-0>
    <wpp-tab-v3-3-0 value="food" .counter="${args.counter}">Food</wpp-tab-v3-3-0>
    <wpp-tab-v3-3-0 value="drinks" .counter="${args.counter}">Drinks</wpp-tab-v3-3-0>
  </wpp-tabs-v3-3-0>
`

Tabs.args = {
  counter: 0,
  size: 'm',
}
