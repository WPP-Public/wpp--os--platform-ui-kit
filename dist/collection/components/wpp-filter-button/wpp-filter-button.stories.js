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
export const Filter = (args) => html ` <wpp-filter-button-v2-22-0
  .disabled="${args.disabled}"
  .counter="${args.counter}"
  @click="${() => console.log('Button clicked')}"
>
  ${args.text}
</wpp-filter-button-v2-22-0>`;
Filter.args = {
  text: 'Filters',
  disabled: false,
  counter: 3,
};
