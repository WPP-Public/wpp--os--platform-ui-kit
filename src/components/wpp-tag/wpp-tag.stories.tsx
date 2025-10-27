import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Data display/Tag',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    label: {
      type: 'string',
    },
    variant: {
      options: [
        'neutral',
        'warning',
        'positive',
        'negative',
        'Cat-1',
        'Cat-2',
        'Cat-3',
        'Cat-4',
        'Cat-5',
        'Cat-6',
        'Cat-7',
        'Cat-8',
        'Cat-9',
      ],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppTag>

type WppTagTypes = Components.WppTag & { showIconStart: boolean; color?: string }

export const Tag: StoryObj<WppTagTypes> = (args: WppTagTypes) => html`
  <style>
    .wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .wrapper > * {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  </style>

  <div class="wrapper">
    <wpp-tag-v3-3-0 .label="${args.label}" .variant=${args.variant}></wpp-tag-v3-3-0>
    <wpp-tag-v3-3-0 .label="${args.label}" .variant=${args.variant}>
      ${args.showIconStart ? html` <wpp-icon-premium-v3-3-0 slot="icon-start"></wpp-icon-premium-v3-3-0> ` : null}
    </wpp-tag-v3-3-0>
  </div>
`

Tag.args = {
  label: 'Title',
  variant: 'neutral',
  showIconStart: true,
}
