import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import { transformToVersionedTag } from '../../utils/utils';
export default {
  title: 'Design System/Components/Surfaces/Full Screen Modal',
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
    withTitle: { control: { type: 'boolean' } },
  },
};
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
};
const getModalHandlers = () => {
  let fullScreenModal = null;
  document.addEventListener('DOMContentLoaded', () => (fullScreenModal = document.querySelector(transformToVersionedTag('wpp-full-screen-modal'))));
  const handleFullScreenModalOpen = () => {
    fullScreenModal?.openFullScreenModal();
  };
  const handleFullScreenModalClose = () => {
    fullScreenModal?.closeFullScreenModal();
  };
  const handleFullScreenModalAction = () => {
    handleFullScreenModalClose();
    alert('Submit');
  };
  return { handleFullScreenModalOpen, handleFullScreenModalClose, handleFullScreenModalAction };
};
export const FullScreenModal = {
  render: args => {
    const { handleFullScreenModalOpen, handleFullScreenModalClose, handleFullScreenModalAction } = getModalHandlers();
    return html ` <wpp-button-v4-3-0 @click=${handleFullScreenModalOpen}>Open Full Screen Modal</wpp-button-v4-3-0>
      <wpp-full-screen-modal-v4-3-0
        @wppFullScreenModalClose=${() => {
      console.log('Called wppFullScreenModalClose');
      handleFullScreenModalClose();
    }}
        @wppFullScreenModalOpenStart=${() => console.log('Open start')}
        @wppFullScreenModalOpenComplete=${() => console.log('Open complete')}
        @wppFullScreenModalCloseStart=${() => console.log('Close start')}
        @wppFullScreenModalCloseComplete=${() => console.log('Close complete')}
        .open=${args.open}
        .disableOutsideClick=${args.disableOutsideClick}
        .actionsConfig=${{
      primaryButtonConfig: {
        ...args.actionsConfig?.primaryButtonConfig,
        onClick: handleFullScreenModalAction,
      },
      secondaryButtonConfig: {
        ...args.actionsConfig?.secondaryButtonConfig,
        onClick: handleFullScreenModalClose,
      },
    }}
      >
        <div slot="header" style=${styleMap(styles.header)}>
          ${args.withTitle
      ? html ` <wpp-typography-v4-3-0 type="2xl-heading" style=${styleMap(styles.title)}
                >Title</wpp-typography-v4-3-0
              >`
      : null}
        </div>
        <p slot="body" style=${styleMap(styles.body)}></p>
      </wpp-full-screen-modal-v4-3-0>`;
  },
  args: {
    open: false,
    disableOutsideClick: false,
    withTitle: true,
    actionsConfig: {
      primaryButtonConfig: {
        variant: 'primary',
        label: 'Action',
        onClick: () => { },
      },
      secondaryButtonConfig: {
        label: 'Cancel',
        onClick: () => { },
      },
    },
  },
};
