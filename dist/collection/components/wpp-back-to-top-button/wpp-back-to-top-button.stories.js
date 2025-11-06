import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Actions/Other buttons',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
};
export const BackToTop = () => html `<wpp-back-to-top-button-v2-22-0 @click="${() => console.log('Button clicked')}" />`;
BackToTop.args = {};
