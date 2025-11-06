import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Actions/Regular button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
};
export const Icon = (args) => html ` <wpp-icon-button-v2-22-0
  @click="${() => console.log('button clicked')}"
  .size="${args.size}"
  .disabled="${args.disabled}"
  .loading="${args.loading}"
>
  <wpp-icon-more-v2-22-0 direction="horizontal" />
</wpp-icon-button-v2-22-0>`;
Icon.args = {
  size: 'm',
  disabled: false,
  loading: false,
};
