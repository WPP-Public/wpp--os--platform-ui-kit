import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Feedback/Spinner',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    color: {
      options: ['var(--wpp-primary-color-500)', 'var(--wpp-grey-color-800)', 'var(--wpp-grey-color-000)'],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
    },
  },
};
export const Spinner = (args) => html ` <div
    style="padding: 10px; background-color: ${args.color === 'var(--wpp-grey-color-000)' ? '#697077' : 'white'}"
  >
    <wpp-spinner-v3-5-0 .color="${args.color}" .size="${args.size}" .ariaProps="${args.ariaProps}" />
  </div>`;
Spinner.args = {
  color: 'var(--wpp-primary-color-500)',
  size: 's',
  ariaProps: { label: 'Loading...' },
};
