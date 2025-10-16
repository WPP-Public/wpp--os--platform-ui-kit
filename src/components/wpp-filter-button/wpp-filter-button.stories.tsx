import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Actions/Other buttons/Filter button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta<Components.WppFilterButton>

type WppFilterButtonTypes = Components.WppFilterButton & { text: string }

export const Filter: StoryObj<WppFilterButtonTypes> = {
  render: args =>
    html` <wpp-filter-button-v3-2-0
      .disabled="${args.disabled}"
      .counter="${args.counter}"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.text}
    </wpp-filter-button-v3-2-0>`,
  args: {
    text: 'Filters',
    disabled: false,
    counter: 3,
  },
}
