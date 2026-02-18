import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Actions/Regular button/Icon button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
};
export const Icon = {
  render: args => html `
    <wpp-typography-v3-5-0 style="display: block; margin-bottom: 10px;" type="xl-heading"
      >WppIconButton is deprecated. Use WppActionButton instead.</wpp-typography-v3-5-0
    >
    <wpp-icon-button-v3-5-0
      @click="${() => console.log('button clicked')}"
      .size="${args.size}"
      .disabled="${args.disabled}"
      .loading="${args.loading}"
    >
      <wpp-icon-more-v3-5-0 direction="horizontal" />
    </wpp-icon-button-v3-5-0>
  `,
  args: {
    size: 'm',
    disabled: false,
    loading: false,
  },
};
