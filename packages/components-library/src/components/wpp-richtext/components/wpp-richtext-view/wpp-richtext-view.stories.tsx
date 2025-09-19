import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../../../components'

import { WppRichtextView } from './wpp-richtext-view'
import readme from './readme.md'
import { debugLevels } from '../../types'

/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore Can't find file
import value from '!raw-loader!../../test/test-value.html'

export default {
  title: 'Design System/Components/Selection and input/Rich Text',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    debug: {
      options: debugLevels,
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppRichtextView>

export const View: Story<Components.WppRichtextView> = (args: Components.WppRichtextView) => html`
  <wpp-richtext-view-v3-1-1 value=${value} preserve-whitespace=${args.preserveWhitespace} debug=${args.debug} />
`
View.args = {
  preserveWhitespace: false,
  debug: 'warn',
}
