import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Foundations/Typography',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    type: {
      options: [
        '5xl-display',
        '4xl-display',
        '3xl-heading',
        '2xl-heading',
        'xl-heading',
        'l-strong',
        'l-midi',
        'l-body',
        'm-strong',
        'm-midi',
        'm-body',
        's-strong',
        's-midi',
        's-body',
        'xs-strong',
        'xs-midi',
        'xs-body',
        '2xs-strong',
      ],
      control: { type: 'select' },
    },
    tag: {
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
};
export const Typography = (args) => html ` <wpp-typography-v2-22-0 .type="${args.type}" .tag="${args.tag}">Preview Heading</wpp-typography-v2-22-0>`;
Typography.args = {
  type: '3xl-heading',
  tag: 'span',
};
