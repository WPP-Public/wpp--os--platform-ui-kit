import { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../../../components'

// @ts-ignore Can't find file
import value from '../../test/test-value.html?raw'

export default {
  title: 'Design System/Components/Selection and input/Rich Text/HTML View',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta<Components.WppRichtextHtml>

export const HTMLView: StoryObj<Components.WppRichtextHtml> = {
  render: () => html` <wpp-richtext-html-v3-2-0 .value=${value} /> `,
}
