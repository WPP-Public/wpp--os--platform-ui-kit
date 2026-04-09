import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import { transformToVersionedTag } from '../../utils/utils';
export default {
  title: 'Design System/Components/Surfaces/Modal',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    open: { control: { type: 'boolean' } },
    disableOutsideClick: { control: { type: 'boolean' } },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
  },
};
const getModalHandlers = () => {
  let modal = null;
  document.addEventListener('DOMContentLoaded', () => (modal = document.querySelector(transformToVersionedTag('wpp-modal'))));
  const handleOpenModal = () => {
    modal?.openModal();
  };
  const handleCloseModal = () => {
    modal?.closeModal();
  };
  const handleActionModal = () => {
    handleCloseModal();
    alert('Submit');
  };
  return { handleOpenModal, handleCloseModal, handleActionModal };
};
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    minWidth: '0',
    marginRight: '12px',
  },
  iconButton: {
    cursor: 'pointer',
  },
};
export const Regular = (args) => {
  const { handleOpenModal, handleCloseModal, handleActionModal } = getModalHandlers();
  return html ` <wpp-button-v4-0-0 @click=${handleOpenModal}>Open Modal</wpp-button-v4-0-0>
    <wpp-modal-v4-0-0
      @wppModalClose=${() => {
    console.log('Called: wppModalClose');
    handleCloseModal();
  }}
      @wppModalOpenStart=${() => console.log('Open start')}
      @wppModalOpenComplete=${() => console.log('Open complete')}
      @wppModalCloseStart=${() => console.log('Close start')}
      @wppModalCloseComplete=${() => console.log('Close complete')}
      .open=${args.open}
      .size=${args.size}
      .disableOutsideClick=${args.disableOutsideClick}
    >
      ${args.withCrossButton
    ? html `<div slot="header" style=${styleMap(styles.header)}>
            <h3>Title</h3>
            <wpp-action-button-v4-0-0
              variant="secondary"
              @click=${handleCloseModal}
              style=${styleMap(styles.iconButton)}
            >
              <wpp-icon-cross-v4-0-0 slot="icon-start"></wpp-icon-cross-v4-0-0>
            </wpp-action-button-v4-0-0>
          </div>`
    : html `<div slot="header">Title</div>`}
      <p
        slot="body"
        style="display: flex;
        flex-direction: column;
        height: 44px;
      "
      ></p>
      <div slot="actions" style="display:flex; justify-content: flex-end;">
        <wpp-button-v4-0-0 variant="secondary" size="s" style="margin-right: 12px" @click=${handleCloseModal}>
          Cancel
        </wpp-button-v4-0-0>
        <wpp-button-v4-0-0 variant="primary" size="s" @click=${handleActionModal}>Action</wpp-button-v4-0-0>
      </div>
    </wpp-modal-v4-0-0>`;
};
Regular.args = {
  open: false,
  disableOutsideClick: false,
  size: 's',
  withCrossButton: true,
};
export const Destructive = (args) => {
  const { handleOpenModal, handleCloseModal, handleActionModal } = getModalHandlers();
  return html ` <wpp-button-v4-0-0 @click=${handleOpenModal}>Open Destructive Modal</wpp-button-v4-0-0>
    <wpp-modal-v4-0-0
      @wppModalClose=${() => {
    console.log('Called: wppModalClose');
    handleCloseModal();
  }}
      @wppModalOpenStart=${() => console.log('Open start')}
      @wppModalOpenComplete=${() => console.log('Open complete')}
      @wppModalCloseStart=${() => console.log('Close start')}
      @wppModalCloseComplete=${() => console.log('Close complete')}
      .open=${args.open}
      .size=${args.size}
      .disableOutsideClick=${args.disableOutsideClick}
    >
      ${args.withCrossButton
    ? html `<div slot="header" style=${styleMap(styles.header)}>
            <h3>This is a destructive message</h3>
            <wpp-action-button-v4-0-0
              variant="secondary"
              @click=${handleCloseModal}
              style=${styleMap(styles.iconButton)}
            >
              <wpp-icon-cross-v4-0-0 slot="icon-start"></wpp-icon-cross-v4-0-0>
            </wpp-action-button-v4-0-0>
          </div>`
    : html `<div slot="header">This is a destructive message</div>`}
      <p
        slot="body"
        style="display: flex;
        flex-direction: column;
        height: 44px;
      "
      ></p>
      <div slot="actions" style="display:flex; justify-content: flex-end;">
        <wpp-button-v4-0-0 variant="secondary" size="s" style="margin-right: 12px;" @click=${handleCloseModal}>
          Cancel
        </wpp-button-v4-0-0>
        <wpp-button-v4-0-0 variant="destructive" size="s" @click=${handleActionModal}>Action</wpp-button-v4-0-0>
      </div>
    </wpp-modal-v4-0-0>`;
};
Destructive.args = {
  open: false,
  disableOutsideClick: false,
  size: 's',
  withCrossButton: true,
};
