import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Feedback/Spinner',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    color: {
      options: ['var(--wpp-grey-color-800)', 'var(--wpp-primary-color-500)', 'var(--wpp-primary-color-100)'],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
    },
  },
};
export const Spinner = (args) => html ` <wpp-spinner-v2-22-0 .color="${args.color}" .size="${args.size}" />`;
Spinner.args = {
  color: 'var(--wpp-primary-color-500)',
  size: 's',
};
