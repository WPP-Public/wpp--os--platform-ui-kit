import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppLabel } from './wpp-label'
import readme from './readme.md'
import internalLabel from './components/wpp-internal-label/readme.md'

export default {
  title: 'Design System/Components/Data display/Label',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { 'wpp-label': readme, 'wpp-internal-label': internalLabel },
  },
  argTypes: {
    optional: { control: { type: 'boolean' } },
    typography: {
      options: ['s-body', 's-strong'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppLabel>

export const Label: Story<Components.WppLabel> = (args: Components.WppLabel) => html` <wpp-label-v3-1-1
  .optional="${args.optional}"
  .typography="${args.typography}"
  .config="${args.config}"
  .tooltipConfig="${args.tooltipConfig}"
>
</wpp-label-v3-1-1>`

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
