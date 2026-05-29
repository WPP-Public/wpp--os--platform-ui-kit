import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Surfaces/Overlay',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
  },
};
export const Overlay = (args) => html `
  <div>
    <wpp-typography-v4-1-0 type="xl-heading">The WppOverlay will render inside the "Body"</wpp-typography-v4-1-0>
    <div
      style="width: 100%; height: 300px; display: flex; justify-content: center; align-items: center; margin-top: 20px;"
    >
      <div
        style="width: 70%; height: 100%; background-color: #F8F9FB; border-radius: 8px; overflow: hidden; border: 1px solid #E0E0E0; position: relative;"
      >
        <div
          style="height: 50px; padding-left: 20px; box-sizing: border-box; border-bottom: 1px solid #E0E0E0; padding-top: 13px;"
        >
          <wpp-typography-v4-1-0 type="s-body">Header</wpp-typography-v4-1-0>
        </div>
        <div style="height: 100%; padding-left: 20px; box-sizing: border-box; position: relative; padding-top: 20px;">
          <wpp-typography-v4-1-0 type="s-body">Body</wpp-typography-v4-1-0>
          <wpp-overlay-v4-1-0 .isVisible="${args.isVisible}" @wppClick="${() => console.log('Overlay clicked')}" />
        </div>
      </div>
    </div>
  </div>
`;
Overlay.args = {
  isVisible: true,
};
