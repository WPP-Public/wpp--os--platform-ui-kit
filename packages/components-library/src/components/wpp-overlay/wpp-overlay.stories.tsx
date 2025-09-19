import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppOverlay } from './wpp-overlay'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Surfaces/Overlay',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
  },
} as Meta<typeof WppOverlay>

export const Overlay: Story<Components.WppOverlay> = (args: Components.WppOverlay) => html`
  <div>
    <wpp-typography-v3-1-1 type="xl-heading">The WppOverlay will render inside the "Body"</wpp-typography-v3-1-1>
    <div
      style="width: 100%; height: 300px; display: flex; justify-content: center; align-items: center; margin-top: 20px;"
    >
      <div
        style="width: 70%; height: 100%; background-color: #F8F9FB; border-radius: 8px; overflow: hidden; border: 1px solid #E0E0E0; position: relative;"
      >
        <div
          style="height: 50px; padding-left: 20px; box-sizing: border-box; border-bottom: 1px solid #E0E0E0; padding-top: 13px;"
        >
          <wpp-typography-v3-1-1 type="s-body">Header</wpp-typography-v3-1-1>
        </div>
        <div style="height: 100%; padding-left: 20px; box-sizing: border-box; position: relative; padding-top: 20px;">
          <wpp-typography-v3-1-1 type="s-body">Body</wpp-typography-v3-1-1>
          <wpp-overlay-v3-1-1 .isVisible="${args.isVisible}" @wppClick="${() => console.log('Overlay clicked')}" />
        </div>
      </div>
    </div>
  </div>
`

Overlay.args = {
  isVisible: true,
}
