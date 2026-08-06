import { html } from 'lit-html';
import { transformToVersionedTag } from '../../utils/utils';
export default {
  title: 'Design System/Components/AI/Side Panel',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    open: { control: { type: 'boolean' } },
    panelTitle: { control: { type: 'text' } },
    actionsConfig: { control: { type: 'object' } },
    locales: { control: { type: 'object' } },
    ariaProps: { control: { type: 'object' } },
  },
};
const getPanelHandlers = () => {
  let panel = null;
  document.addEventListener('DOMContentLoaded', () => (panel = document.querySelector(transformToVersionedTag('wpp-side-panel'))));
  const handleOpenPanel = () => panel?.openPanel();
  const handleClosePanel = () => panel?.closePanel();
  return { handleOpenPanel, handleClosePanel };
};
export const SidePanel = (args) => {
  const { handleOpenPanel, handleClosePanel } = getPanelHandlers();
  return html `
    <div style="height: 1200px">
      <wpp-button-v4-3-0 @click=${handleOpenPanel}>Open Side Panel</wpp-button-v4-3-0>

      <wpp-side-panel-v4-3-0
        @wppSidePanelClose=${() => {
    console.log('Called wppSidePanelClose');
    handleClosePanel();
  }}
        @wppSidePanelOpenStart=${() => console.log('Open start')}
        @wppSidePanelOpenComplete=${() => console.log('Open complete')}
        @wppSidePanelCloseStart=${() => console.log('Close start')}
        @wppSidePanelCloseComplete=${() => console.log('Close complete')}
        @wppSidePanelResize=${(event) => console.log('Resized', event.detail)}
        .open=${args.open}
        .panelTitle=${args.panelTitle}
        .actionsConfig=${args.actionsConfig}
        .locales=${args.locales}
        .ariaProps=${args.ariaProps}
      >
        <wpp-typography type="s-body">
          This is the body of the side panel. It is placed in the default slot and its container has 16px padding. Drag
          the handle on the left edge to resize the panel between 280px and 440px.
        </wpp-typography>
      </wpp-side-panel-v4-3-0>
    </div>
  `;
};
SidePanel.args = {
  open: false,
  panelTitle: 'Title',
  actionsConfig: [
    {
      label: 'Cancel',
      onClick: () => alert('Cancel clicked'),
      name: 'cancel-btn',
    },
    {
      label: 'Save',
      onClick: () => alert('Save clicked'),
      name: 'save-btn',
    },
  ],
  locales: {
    closeIconLabel: 'Close side panel',
    resizeHandleLabel: 'Resize handle',
  },
  ariaProps: {
    role: 'complementary',
    label: 'Side Panel example',
  },
};
