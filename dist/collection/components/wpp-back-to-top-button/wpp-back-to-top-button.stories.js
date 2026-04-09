import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Actions/Other buttons/Back to top button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const BackToTop = {
  render: () => html `<wpp-back-to-top-button-v3-6-0 @click="${() => console.log('Button clicked')}" />`,
};
