import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map'

import { Components } from '../../components'

import { WppActionButton } from './wpp-action-button'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Actions/Action button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
} as Meta<typeof WppActionButton>

type WppActionButtonTypes = Components.WppActionButton & { showIconStart: boolean; showIconEnd: boolean; text: string }

export const Primary: Story<WppActionButtonTypes> = (args: WppActionButtonTypes) => html` <wpp-action-button-v3-1-1
  .disabled="${args.disabled}"
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
        <wpp-icon-plus-v3-1-1
          slot="icon-end"
          @click="${(e: any) => {
            e.stopPropagation()
            console.log('Right icon clicked')
          }}"
        ></wpp-icon-plus-v3-1-1>
      `
    : null}
</wpp-action-button-v3-1-1>`

Primary.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
}

export const Secondary: Story<WppActionButtonTypes> = (args: WppActionButtonTypes) => html` <wpp-action-button-v3-1-1
  .disabled="${args.disabled}"
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
        <wpp-icon-plus-v3-1-1
          slot="icon-end"
          @click="${(e: any) => {
            e.stopPropagation()
            console.log('Right icon clicked')
          }}"
        ></wpp-icon-plus-v3-1-1>
      `
    : null}
</wpp-action-button-v3-1-1>`

Secondary.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
}

export const Inverted: Story<WppActionButtonTypes> = (args: WppActionButtonTypes) => html` <div
  style=${styleMap({
    backgroundColor: 'var(--wpp-grey-color-800)',
    padding: '24px',
  })}
>
  <wpp-action-button-v3-1-1
    .disabled="${args.disabled}"
    .loading="${args.loading}"
    variant="inverted"
    @click="${() => console.log('Button clicked')}"
  >
    ${args.text}
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
    ${args.showIconEnd
      ? html`
          <wpp-icon-plus-v3-1-1
            slot="icon-end"
            @click="${(e: any) => {
              e.stopPropagation()
              console.log('Right icon clicked')
            }}"
          ></wpp-icon-plus-v3-1-1>
        `
      : null}
  </wpp-action-button-v3-1-1>
</div>`

Inverted.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
}

export const Destructive: Story<WppActionButtonTypes> = (args: WppActionButtonTypes) => html` <wpp-action-button-v3-1-1
  .disabled="${args.disabled}"
  .loading="${args.loading}"
  variant="destructive"
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
        <wpp-icon-plus-v3-1-1
          slot="icon-end"
          @click="${(e: any) => {
            e.stopPropagation()
            console.log('Right icon clicked')
          }}"
        ></wpp-icon-plus-v3-1-1>
      `
    : null}
</wpp-action-button-v3-1-1>`

Destructive.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
}
