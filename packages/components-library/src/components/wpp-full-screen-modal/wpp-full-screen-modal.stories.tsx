import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map.js'

import { Components } from '../../components'
import { transformToVersionedTag } from '../../utils/utils'

import { WppFullScreenModal } from './wpp-full-screen-modal'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Surfaces/Full Screen Modal',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    open: { control: { type: 'boolean' } },
    disableOutsideClick: { control: { type: 'boolean' } },
    withTitle: { control: { type: 'boolean' } },
    withActionBar: { control: { type: 'boolean' } },
  },
} as Meta<typeof WppFullScreenModal>

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '44px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    minWidth: '0',
    marginRight: '12px',
  },
  iconButton: {
    cursor: 'pointer',
  },
}

const getModalHandlers = () => {
  let fullScreenModal: HTMLWppFullScreenModalElement | null = null

  document.addEventListener(
    'DOMContentLoaded',
    () => (fullScreenModal = document.querySelector(transformToVersionedTag('wpp-full-screen-modal'))),
  )

  const handleFullScreenModalOpen = () => {
    fullScreenModal?.openFullScreenModal()
  }

  const handleFullScreenModalClose = () => {
    fullScreenModal?.closeFullScreenModal()
  }

  const handleFullScreenModalAction = () => {
    handleFullScreenModalClose()
    alert('Submit')
  }

  return { handleFullScreenModalOpen, handleFullScreenModalClose, handleFullScreenModalAction }
}

type FullScreenModalStoryArgs = Components.WppFullScreenModal & {
  withTitle: boolean
} & { withActionBar: boolean }

export const FullScreenModal: Story<FullScreenModalStoryArgs> = (args: FullScreenModalStoryArgs) => {
  const { handleFullScreenModalOpen, handleFullScreenModalClose, handleFullScreenModalAction } = getModalHandlers()

  return html` <wpp-button-v3-1-1 @click=${handleFullScreenModalOpen}>Open Full Screen Modal</wpp-button-v3-1-1>
    <wpp-full-screen-modal-v3-1-1
      @wppFullScreenModalClose=${() => {
        console.log('Called wppFullScreenModalClose')
        handleFullScreenModalClose()
      }}
      @wppFullScreenModalOpenStart=${() => console.log('Open start')}
      @wppFullScreenModalOpenComplete=${() => console.log('Open complete')}
      @wppFullScreenModalCloseStart=${() => console.log('Close start')}
      @wppFullScreenModalCloseComplete=${() => console.log('Close complete')}
      .open=${args.open}
      .disableOutsideClick=${args.disableOutsideClick}
    >
      <div slot="header" style=${styleMap(styles.header)}>
        ${args.withTitle
          ? html` <wpp-typography-v3-1-1 type="2xl-heading" style=${styleMap(styles.title)}
              >Title</wpp-typography-v3-1-1
            >`
          : null}
      </div>
      <p slot="body" style=${styleMap(styles.body)}></p>
      ${args.withActionBar
        ? html`<div slot="actions" style=${styleMap(styles.actions)}>
            <wpp-button-v3-1-1 variant="secondary" style="margin-right: 12px" @click=${handleFullScreenModalClose}>
              Cancel
            </wpp-button-v3-1-1>
            <wpp-button-v3-1-1 variant="primary" @click=${handleFullScreenModalAction}>Action</wpp-button-v3-1-1>
          </div>`
        : null}
    </wpp-full-screen-modal-v3-1-1>`
}

FullScreenModal.args = {
  open: false,
  disableOutsideClick: false,
  withTitle: true,
  withActionBar: true,
}
