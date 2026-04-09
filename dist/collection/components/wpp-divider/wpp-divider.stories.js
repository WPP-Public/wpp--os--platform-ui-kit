import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Utilities/Divider',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    vertical: { control: { type: 'boolean' } },
    resizable: { control: { type: 'boolean' } },
  },
};
export const Divider = {
  render: args => {
    const style = args.vertical ? 'height: 150px;' : '';
    return html ` <wpp-divider-v4-0-0
      .vertical="${args.vertical}"
      .resizable="${args.resizable}"
      style="${style}"
    ></wpp-divider-v4-0-0>`;
  },
  args: {
    vertical: false,
    resizable: false,
  },
};
