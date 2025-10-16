import { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../../../components'

// @ts-ignore Can't find file
import value from '../../test/test-value.html?raw'

export default {
  title: 'Design System/Components/Selection and input/Rich Text/View',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as Meta<Components.WppRichtextView>

export const View: StoryObj<Components.WppRichtextView> = {
  render: (args: Components.WppRichtextView) => html`
    <wpp-richtext-view-v3-2-0 .value=${value} preserve-whitespace=${args.preserveWhitespace} debug=${args.debug} />
  `,
  args: {
    preserveWhitespace: false,
  },
}
