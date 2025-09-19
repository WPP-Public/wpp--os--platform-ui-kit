import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppDivider } from './wpp-divider'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Utilities/Divider',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    vertical: { control: { type: 'boolean' } },
    resizable: { control: { type: 'boolean' } },
  },
} as Meta<typeof WppDivider>

type DividerStoryArgs = Components.WppDivider

export const Divider: Story<DividerStoryArgs> = (args: DividerStoryArgs) => {
  const style = args.vertical ? 'height: 150px;' : ''

  return html` <wpp-divider-v3-1-1
    .vertical="${args.vertical}"
    .resizable="${args.resizable}"
    style="${style}"
  ></wpp-divider-v3-1-1>`
}

Divider.args = { vertical: false, resizable: false }
