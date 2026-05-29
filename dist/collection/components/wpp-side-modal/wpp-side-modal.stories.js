import { html } from 'lit-html';
import { transformToVersionedTag } from '../../utils/utils';
export default {
  title: 'Design System/Components/Surfaces/Side Modal',
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
      options: ['s', 'm', 'l', 'xl', '2xl'],
      control: { type: 'select' },
    },
    actionsConfig: { control: { type: 'object' } },
    headerActionsConfig: { control: { type: 'object' } },
  },
};
const getModalHandlers = () => {
  let modal = null;
  document.addEventListener('DOMContentLoaded', () => (modal = document.querySelector(transformToVersionedTag('wpp-side-modal'))));
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
export const SideModal = (args) => {
  const { handleOpenModal, handleCloseModal, handleActionModal } = getModalHandlers();
  return html `
    <div style="height: 1200px">
      <wpp-button-v4-1-0 @click=${handleOpenModal}> Open Side Modal </wpp-button-v4-1-0>

      <wpp-side-modal-v4-1-0
        @wppSideModalClose=${() => {
    console.log('Called wppSideModalClose');
    handleCloseModal();
  }}
        @wppSideModalBackButtonClick=${() => {
    console.log('Back button clicked');
  }}
        @wppSideModalOpenStart=${() => console.log('Open start')}
        @wppSideModalOpenComplete=${() => console.log('Open complete')}
        @wppSideModalCloseStart=${() => console.log('Close start')}
        @wppSideModalCloseComplete=${() => console.log('Close complete')}
        .open=${args.open}
        .withBackButton=${args.withBackButton}
        .size=${args.size}
        .disableOutsideClick=${args.disableOutsideClick}
        .backdropVisible=${args.backdropVisible}
      >
        <div slot="header">Title</div>

        ${args.withActions
    ? html `
              <div slot="actions" style="display: flex; justify-content: flex-end;">
                <wpp-button-v4-1-0
                  variant="secondary"
                  style="margin-right: 12px;"
                  .width=${'86px'}
                  @click=${handleCloseModal}
                >
                  Close
                </wpp-button-v4-1-0>

                <wpp-button-v4-1-0 variant="primary" .width=${'86px'} @click=${handleActionModal}>
                  Action
                </wpp-button-v4-1-0>
              </div>
            `
    : null}
      </wpp-side-modal-v4-1-0>
    </div>
  `;
};
SideModal.args = {
  open: false,
  disableOutsideClick: false,
  withBackButton: false,
  size: 'm',
  withActions: true,
  backdropVisible: true,
};
export const SideModalWithActionsConfig = (args) => {
  const { handleOpenModal, handleCloseModal } = getModalHandlers();
  return html `
    <div style="height: 1200px">
      <wpp-button-v4-1-0 @click=${handleOpenModal}>Open Side Modal with Actions Config</wpp-button-v4-1-0>
      <wpp-side-modal-v4-1-0
        @wppSideModalClose=${() => {
    console.log('Called wppSideModalClose');
    handleCloseModal();
  }}
        @wppSideModalOpenStart=${() => console.log('Open start')}
        @wppSideModalOpenComplete=${() => console.log('Open complete')}
        @wppSideModalCloseStart=${() => console.log('Close start')}
        @wppSideModalCloseComplete=${() => console.log('Close complete')}
        .open=${args.open}
        .size=${args.size}
        .disableOutsideClick=${args.disableOutsideClick}
        .actionsConfig=${args.actionsConfig}
        .backdropVisible=${args.backdropVisible}
      >
        <div slot="header">Title</div>
        <p slot="body">This side modal demonstrates the use of actionsConfig to dynamically render buttons.</p>
      </wpp-side-modal-v4-1-0>
    </div>
  `;
};
SideModalWithActionsConfig.argTypes = {
  open: { control: { type: 'boolean' } },
  disableOutsideClick: { control: { type: 'boolean' } },
  size: {
    options: ['s', 'm', 'l', 'xl', '2xl'],
    control: { type: 'select' },
  },
  actionsConfig: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
SideModalWithActionsConfig.args = {
  open: false,
  disableOutsideClick: false,
  size: 'm',
  backdropVisible: true,
  actionsConfig: [
    {
      label: 'Cancel',
      variant: 'secondary',
      onClick: () => {
        alert('Cancel clicked');
      },
      name: 'close-secondary-btn',
      ariaProps: { label: 'close btn' },
    },
    {
      label: 'Submit',
      variant: 'primary',
      onClick: () => {
        alert('Submit clicked');
      },
      type: 'submit',
      name: 'submit-primary-btn',
      ariaProps: { label: 'remove btn' },
    },
    {
      label: 'Remove',
      variant: 'destructive',
      onClick: () => {
        console.log('Remove click');
      },
      icon: 'wpp-icon-remove-circle',
      name: 'remove-destructive-btn',
      ariaProps: { label: 'remove btn' },
    },
  ],
};
export const SideModalWithHeaderActionsConfig = (args) => {
  const { handleOpenModal, handleCloseModal } = getModalHandlers();
  return html `
    <div style="height: 1200px">
      <wpp-button-v4-1-0 @click=${handleOpenModal}>Open Side Modal Header with Actions Config</wpp-button-v4-1-0>
      <wpp-side-modal-v4-1-0
        @wppSideModalClose=${() => {
    console.log('Called wppSideModalClose');
    handleCloseModal();
  }}
        @wppSideModalOpenStart=${() => console.log('Open start')}
        @wppSideModalOpenComplete=${() => console.log('Open complete')}
        @wppSideModalCloseStart=${() => console.log('Close start')}
        @wppSideModalCloseComplete=${() => console.log('Close complete')}
        .open=${args.open}
        .size=${args.size}
        .disableOutsideClick=${args.disableOutsideClick}
        .headerActionsConfig=${args.headerActionsConfig}
        .backdropVisible=${args.backdropVisible}
      >
        <div slot="header">Title</div>
        <p slot="body">This side modal demonstrates the use of actionsConfig to dynamically render buttons.</p>
      </wpp-side-modal-v4-1-0>
    </div>
  `;
};
SideModalWithHeaderActionsConfig.argTypes = {
  open: { control: { type: 'boolean' } },
  disableOutsideClick: { control: { type: 'boolean' } },
  size: {
    options: ['s', 'm', 'l', 'xl', '2xl'],
    control: { type: 'select' },
  },
  headerActionsConfig: {
    icon: { control: 'text' },
    ariaLabel: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};
SideModalWithHeaderActionsConfig.args = {
  open: false,
  disableOutsideClick: false,
  size: 'm',
  backdropVisible: true,
  headerActionsConfig: [
    {
      icon: 'wpp-icon-info',
      ariaLabel: 'Info',
      onClick: () => alert('Info action clicked'),
    },
    {
      icon: 'wpp-icon-plus',
      ariaLabel: 'Plus',
      onClick: () => alert('Plus action clicked'),
    },
    {
      icon: 'wpp-icon-arrow',
      ariaLabel: 'Arrow',
      onClick: () => alert('Arrow action clicked'),
    },
    {
      icon: 'wpp-icon-search',
      ariaLabel: 'Search',
      onClick: () => alert('Search action clicked'),
    },
  ],
};
