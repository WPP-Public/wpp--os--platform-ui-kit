import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Utilities/Divider',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    vertical: { control: { type: 'boolean' } },
    resizable: { control: { type: 'boolean' } },
  },
} as Meta<Components.WppDivider>

type DividerStoryArgs = Components.WppDivider

export const Divider: StoryObj<DividerStoryArgs> = {
  render: args => {
    const style = args.vertical ? 'height: 150px;' : ''

    return html` <wpp-divider-v3-2-0
      .vertical="${args.vertical}"
      .resizable="${args.resizable}"
      style="${style}"
    ></wpp-divider-v3-2-0>`
  },
  args: {
    vertical: false,
    resizable: false,
  },
}
