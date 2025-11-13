import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Actions/Other buttons/Filter button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const Filter = {
  render: args => html ` <wpp-filter-button-v3-3-1
      .disabled="${args.disabled}"
      .counter="${args.counter}"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.text}
    </wpp-filter-button-v3-3-1>`,
  args: {
    text: 'Filters',
    disabled: false,
    counter: 3,
  },
};
