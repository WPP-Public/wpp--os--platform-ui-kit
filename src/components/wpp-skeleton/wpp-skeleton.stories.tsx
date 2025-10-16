import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Feedback/Skeleton',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['rectangle', 'circle'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppSkeleton>

/**
 * Basic Skeleton Example
 */
export const Skeleton: StoryObj<Components.WppSkeleton> = (args: Components.WppSkeleton) => html`
  <wpp-skeleton-v3-2-0 .variant="${args.variant}" .width=${args.width} .height=${args.height} />
`

Skeleton.args = {
  variant: 'rectangle',
  width: '',
  height: '',
}
