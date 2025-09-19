import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppTabs } from './wpp-tabs'
import TabsReadme from './readme.md'
import TabReadme from './components/wpp-tab/readme.md'

export default {
  title: 'Design System/Components/Navigation/Tabs',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: TabsReadme, Items: TabReadme },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppTabs>

export const Tabs: Story<Components.WppTab> = (args: Components.WppTab) => html`
  <wpp-tabs-v3-1-1 value="houses" .size="${args.size}">
    <wpp-tab-v3-1-1 value="houses">Houses</wpp-tab-v3-1-1>
    <wpp-tab-v3-1-1 .disabled="${args.disabled}" .counter="${args.counter}" value="cars"
      >A Bit Longer Text</wpp-tab-v3-1-1
    >
    <wpp-tab-v3-1-1 value="food">Food</wpp-tab-v3-1-1>
    <wpp-tab-v3-1-1 value="drinks">Drinks</wpp-tab-v3-1-1>
  </wpp-tabs-v3-1-1>
`

Tabs.args = {
  disabled: false,
  counter: 0,
  size: 'm',
}
