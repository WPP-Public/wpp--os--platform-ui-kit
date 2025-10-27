import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Data display/Label',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    optional: { control: { type: 'boolean' } },
    typography: {
      options: ['s-body', 's-strong'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppLabel>

export const Label: StoryObj<Components.WppLabel> = (args: Components.WppLabel) =>
  html` <wpp-label-v3-3-0
    .optional="${args.optional}"
    .typography="${args.typography}"
    .config="${args.config}"
    .tooltipConfig="${args.tooltipConfig}"
  >
  </wpp-label-v3-3-0>`

Label.args = {
  typography: 's-strong',
  config: {
    icon: 'wpp-icon-info',
    text: 'Label title',
    description: 'Your email will be used to send you a confirmation number',
    locales: {
      optional: 'Optional',
    },
  },
  tooltipConfig: {
    trigger: 'mouseenter',
  },
  optional: false,
}
