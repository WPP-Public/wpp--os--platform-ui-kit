import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Feedback/Progress Indicator',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range' },
      options: [0, 100, 1],
    },
    width: {
      type: 'number',
    },
    isShowPercentage: { control: { type: 'boolean' } },
    forceIntermediateEmptyState: { control: { type: 'boolean' } },
  },
} as Meta<Components.WppProgressIndicator>

export const Bar: StoryObj<Components.WppProgressIndicator> = (args: Components.WppProgressIndicator) => html`
  <wpp-progress-indicator-v3-3-0
    .value=${args.value}
    .isShowPercentage=${args.isShowPercentage}
    .width=${args.width}
    .forceIntermediateEmptyState=${args.forceIntermediateEmptyState}
    .ariaProps=${args.ariaProps}
    style="margin-right: 50px"
  />
`

Bar.args = {
  value: 0,
  width: 0,
  isShowPercentage: false,
  forceIntermediateEmptyState: false,
  ariaProps: {
    label: 'Default Progress Indicator',
  },
}

export const Circle: StoryObj<Components.WppProgressIndicator> = (args: Components.WppProgressIndicator) =>
  html` <wpp-progress-indicator-v3-3-0
    variant="circle"
    .isShowPercentage=${args.isShowPercentage}
    .width=${args.width}
    .value=${args.value}
    .forceIntermediateEmptyState=${args.forceIntermediateEmptyState}
    .ariaProps=${args.ariaProps}
  />`

Circle.args = {
  value: 0,
  width: 0,
  isShowPercentage: false,
  forceIntermediateEmptyState: false,
  ariaProps: {
    label: 'Circle Progress Indicator',
  },
}
