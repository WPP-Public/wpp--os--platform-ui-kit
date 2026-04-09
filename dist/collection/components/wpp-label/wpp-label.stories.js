import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data display/Label',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    optional: { control: { type: 'boolean' } },
    typography: {
      options: ['s-body', 's-strong'],
      control: { type: 'select' },
    },
  },
};
export const Label = (args) => html ` <wpp-label-v3-6-0
    .optional="${args.optional}"
    .typography="${args.typography}"
    .config="${args.config}"
    .tooltipConfig="${args.tooltipConfig}"
  >
  </wpp-label-v3-6-0>`;
Label.args = {
  typography: 's-strong',
  config: {
    icon: 'wpp-icon-info',
    text: 'Label title',
    description: 'Your email will be used to send you a confirmation number',
    locales: {
      optional: 'Optional',
    },
  },
  tooltipConfig: {
    trigger: 'mouseenter',
  },
  optional: false,
};
