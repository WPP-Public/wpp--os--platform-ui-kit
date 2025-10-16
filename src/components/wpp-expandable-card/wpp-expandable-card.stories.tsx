import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Surfaces/Expandable Card',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l', 'xl', '2xl'],
      control: { type: 'select' },
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppExpandableCard>

const handleTypographyType = (size: 's' | 'm' | 'l' | 'xl' | '2xl') => {
  if (size === 's') return 's-strong'
  if (size === 'm') return 'm-strong'
  if (size === 'l') return 'l-strong'
  if (size === 'xl') return 'xl-heading'
  if (size === '2xl') return '2xl-heading'
}

export const Expandable: StoryObj<Components.WppExpandableCard> = {
  render: args => html`
  <wpp-expandable-card-v3-2-0 .size="${args.size}" .variant="${args.variant}">
    <wpp-typography-v3-2-0 type="s-body">
      Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a business
      imperative for ensuring sustainable success.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
      the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of Lorem Ipsum.
    </wpp-typography-v3-2-0>
    <wpp-typography-v3-2-0
      style='overflow: hidden; white-space: nowrap; text-overflow: ellipsis'
      type=${handleTypographyType(args.size)}
      slot="header"
    >${args.header}</wpp-typography-v3-2-0>
    <div slot="actions">
      <wpp-action-button-v3-2-0 variant="secondary">
        Action
        <wpp-icon-plus-v3-2-0 slot="icon-start"></wpp-icon-plus>
      </wpp-action-button-v3-2-0>
    </div>
  </wpp-expandable-card-v3-2-0>
`,
  args: {
    header: 'Governance & Ethics',
    size: 'm',
    variant: 'primary',
  },
}
