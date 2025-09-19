import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppTypography } from './wpp-typography'
import readme from './readme.md'

export default {
  title: 'Design System/Foundations/Typography',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    type: {
      options: [
        '5xl-display',
        '4xl-display',
        '3xl-heading',
        '2xl-heading',
        'xl-heading',
        'l-strong',
        'l-midi',
        'l-body',
        'm-strong',
        'm-midi',
        'm-body',
        's-strong',
        's-midi',
        's-body',
        'xs-strong',
        'xs-midi',
        'xs-body',
        '2xs-strong',
      ],
      control: { type: 'select' },
    },
    tag: {
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppTypography>

export const Typography: Story<Components.WppTypography> = (args: Components.WppTypography) =>
  html` <wpp-typography-v3-1-1 .type="${args.type}" .tag="${args.tag}">Preview Heading</wpp-typography-v3-1-1>`

Typography.args = {
  type: '3xl-heading',
  tag: 'span',
}
