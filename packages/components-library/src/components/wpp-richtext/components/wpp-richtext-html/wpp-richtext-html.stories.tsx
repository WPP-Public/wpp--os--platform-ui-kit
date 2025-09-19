import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../../../components'

import { WppRichtextHtml } from './wpp-richtext-html'
import readme from './readme.md'

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
} as Meta<typeof WppRichtextHtml>

export const HTMLView: Story<Components.WppRichtextHtml> = () => html` <wpp-richtext-html-v3-1-1 value=${value} /> `
