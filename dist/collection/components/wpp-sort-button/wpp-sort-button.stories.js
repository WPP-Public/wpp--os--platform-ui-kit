import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Actions/Other buttons/Sort button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const Sort = (args) => html ` <wpp-sort-button-v3-6-0 .disabled="${args.disabled}" @click="${() => console.log('Button clicked')}">
    ${args.text}
  </wpp-sort-button-v3-6-0>`;
Sort.args = {
  text: 'Sort',
  disabled: false,
};
