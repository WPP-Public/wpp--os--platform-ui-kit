import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map'

import { Components } from '../../components'

import { WppButton } from './wpp-button'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Actions/Regular button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppButton>

type WppButtonTypes = Components.WppButton & { showIconStart: boolean; showIconEnd: boolean; text: string }

export const Primary: Story<WppButtonTypes> = (args: WppButtonTypes) => {
  const divStyles = args.inverted
    ? {
        backgroundColor: 'var(--wpp-grey-color-900)',
        padding: '24px',
      }
    : { padding: '24px' }

  return html` <div style=${styleMap(divStyles)}>
    <wpp-button-v3-1-1
      .size="${args.size}"
      .text="${args.text}"
      .disabled="${args.disabled}"
      .inverted="${args.inverted}"
      .loading="${args.loading}"
      variant="primary"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.showIconStart
        ? html`
            <wpp-icon-plus-v3-1-1
              slot="icon-start"
              @click="${(e: any) => {
                e.stopPropagation()
                console.log('Left icon clicked')
              }}"
            ></wpp-icon-plus-v3-1-1>
          `
        : null}
      ${args.text}
      ${args.showIconEnd
        ? html`
            <wpp-icon-chevron-v3-1-1
              slot="icon-end"
              direction="down"
              @click="${(e: any) => {
                e.stopPropagation()
                console.log('Right icon clicked')
              }}"
            ></wpp-icon-chevron-v3-1-1>
          `
        : null}
    </wpp-button-v3-1-1>
  </div>`
}

Primary.args = {
  text: 'Button',
  size: 'm',
  disabled: false,
  inverted: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
}

export const Secondary: Story<WppButtonTypes> = (args: WppButtonTypes) => {
  const divStyles = args.inverted
    ? {
        backgroundColor: 'var(--wpp-grey-color-900)',
        padding: '24px',
      }
    : { padding: '24px' }

  return html` <div style=${styleMap(divStyles)}>
    <wpp-button-v3-1-1
      .size="${args.size}"
      .disabled="${args.disabled}"
      .inverted="${args.inverted}"
      .loading="${args.loading}"
      variant="secondary"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.showIconStart
        ? html`
            <wpp-icon-plus-v3-1-1
              slot="icon-start"
              @click="${(e: any) => {
                e.stopPropagation()
                console.log('Left icon clicked')
              }}"
            ></wpp-icon-plus-v3-1-1>
          `
        : null}
      ${args.text}
      ${args.showIconEnd
        ? html`
            <wpp-icon-chevron-v3-1-1
              slot="icon-end"
              direction="down"
              @click="${(e: any) => {
                e.stopPropagation()
                console.log('Right icon clicked')
              }}"
            ></wpp-icon-chevron-v3-1-1>
          `
        : null}
    </wpp-button-v3-1-1>
  </div>`
}

Secondary.args = {
  text: 'Button',
  size: 'm',
  disabled: false,
  inverted: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
}

export const Destructive: Story<Components.WppButton & { text: string; secondary: boolean }> = (
  args: Components.WppButton & { text: string; secondary: boolean },
) => html` <wpp-button-v3-1-1
  .size="${args.size}"
  .disabled="${args.disabled}"
  .loading="${args.loading}"
  .variant="${args.secondary ? 'destructive-secondary' : 'destructive'}"
  @click="${() => console.log('Button clicked')}"
  >${args.text}</wpp-button-v3-1-1
>`

Destructive.args = {
  text: 'Button',
  size: 'm',
  disabled: false,
  loading: false,
  secondary: false,
}
