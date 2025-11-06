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
export const Floating = (args) => html ` <wpp-floating-button-v2-22-0
  .disabled="${args.disabled}"
  .loading="${args.loading}"
  @click="${() => console.log('Button clicked')}"
/>`;
Floating.args = {
  disabled: false,
  loading: false,
};
