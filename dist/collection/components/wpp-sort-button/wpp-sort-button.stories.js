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
export const Sort = (args) => html ` <wpp-sort-button-v2-22-0
  .disabled="${args.disabled}"
  @click="${() => console.log('Button clicked')}"
>
  ${args.text}
</wpp-sort-button-v2-22-0>`;
Sort.args = {
  text: 'Sort',
  disabled: false,
};
