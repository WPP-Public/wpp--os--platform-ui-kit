import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppSortButton } from './wpp-sort-button'
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
} as Meta<typeof WppSortButton>

type WppSortButtonTypes = Components.WppFilterButton & { text: string }

export const Sort: Story<WppSortButtonTypes> = (args: WppSortButtonTypes) => html` <wpp-sort-button-v3-1-1
  .disabled="${args.disabled}"
  @click="${() => console.log('Button clicked')}"
>
  ${args.text}
</wpp-sort-button-v3-1-1>`

Sort.args = {
  text: 'Sort',
  disabled: false,
}
