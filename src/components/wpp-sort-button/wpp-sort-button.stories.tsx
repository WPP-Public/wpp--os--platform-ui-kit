import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Actions/Other buttons/Sort button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta<Components.WppSortButton>

type WppSortButtonTypes = Components.WppFilterButton & { text: string }

export const Sort: StoryObj<WppSortButtonTypes> = (args: WppSortButtonTypes) =>
  html` <wpp-sort-button-v3-2-0 .disabled="${args.disabled}" @click="${() => console.log('Button clicked')}">
    ${args.text}
  </wpp-sort-button-v3-2-0>`

Sort.args = {
  text: 'Sort',
  disabled: false,
}
