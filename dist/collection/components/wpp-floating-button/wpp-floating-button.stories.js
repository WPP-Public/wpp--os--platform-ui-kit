import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Actions/Other buttons/Floating button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const Floating = {
  render: args => html ` <wpp-floating-button-v3-4-0
      .disabled="${args.disabled}"
      .loading="${args.loading}"
      .ariaProps="${args.ariaProps}"
      @click="${() => console.log('Button clicked')}"
    />`,
  args: {
    disabled: false,
    loading: false,
    ariaProps: { label: 'Add another category' },
  },
};
