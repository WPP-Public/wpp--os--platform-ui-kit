import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppSkeleton } from './wpp-skeleton'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Feedback/Skeleton',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    variant: {
      options: ['rectangle', 'circle'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppSkeleton>

/**
 * Basic Skeleton Example
 */
export const Skeleton: Story<Components.WppSkeleton> = (args: Components.WppSkeleton) =>
  html` <wpp-skeleton-v3-1-1 .variant="${args.variant}" .width=${args.width} .height=${args.height} /> `

Skeleton.args = {
  variant: 'rectangle',
  width: '',
  height: '',
}
