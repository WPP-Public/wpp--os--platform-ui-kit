import { html } from 'lit-html';
import readme from './readme.md';
/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore Can't find file
import value from '!raw-loader!../../test/test-value.html';
export default {
  title: 'Design System/Components/Selection and input/Rich Text',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
};
export const HTMLView = () => html ` <wpp-richtext-html-v2-22-0 value=${value} /> `;
