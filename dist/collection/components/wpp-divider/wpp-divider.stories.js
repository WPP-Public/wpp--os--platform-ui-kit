import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Utilities/Divider',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    vertical: { control: { type: 'boolean' } },
    resizable: { control: { type: 'boolean' } },
  },
};
export const Divider = (args) => {
  const style = args.vertical ? 'height: 150px;' : '';
  return html ` <wpp-divider-v2-22-0
    .vertical="${args.vertical}"
    .resizable="${args.resizable}"
    style="${style}"
  ></wpp-divider-v2-22-0>`;
};
Divider.args = { vertical: false, resizable: false };
