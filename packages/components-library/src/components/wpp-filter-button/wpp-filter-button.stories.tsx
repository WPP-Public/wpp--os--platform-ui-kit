import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppFilterButton } from './wpp-filter-button'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Actions/Other buttons',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
} as Meta<typeof WppFilterButton>

type WppFilterButtonTypes = Components.WppFilterButton & { text: string }

export const Filter: Story<WppFilterButtonTypes> = (args: WppFilterButtonTypes) => html` <wpp-filter-button-v3-1-1
  .disabled="${args.disabled}"
  .counter="${args.counter}"
  @click="${() => console.log('Button clicked')}"
>
  ${args.text}
</wpp-filter-button-v3-1-1>`

Filter.args = {
  text: 'Filters',
  disabled: false,
  counter: 3,
}
