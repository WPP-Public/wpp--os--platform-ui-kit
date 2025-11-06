import { html } from 'lit-html';
import readme from './readme.md';
import { debugLevels } from '../../types';
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
  argTypes: {
    debug: {
      options: debugLevels,
      control: { type: 'select' },
    },
  },
};
export const View = (args) => html `
  <wpp-richtext-view-v2-22-0 value=${value} preserve-whitespace=${args.preserveWhitespace} debug=${args.debug} />
`;
View.args = {
  preserveWhitespace: false,
  debug: 'warn',
};
