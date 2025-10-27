import { html } from 'lit-html';
// @ts-ignore Can't find file
import value from '../../test/test-value.html?raw';
export default {
  title: 'Design System/Components/Selection and input/Rich Text/View',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const View = {
  render: (args) => html `
    <wpp-richtext-view-v3-3-0 .value=${value} preserve-whitespace=${args.preserveWhitespace} debug=${args.debug} />
  `,
  args: {
    preserveWhitespace: false,
  },
};
