import { html } from 'lit-html';
// @ts-ignore Can't find file
import value from '../../test/test-value.html?raw';
export default {
  title: 'Design System/Components/Selection and input/Rich Text/HTML View',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const HTMLView = {
  render: () => html ` <wpp-richtext-html-v3-4-0 .value=${value} /> `,
};
