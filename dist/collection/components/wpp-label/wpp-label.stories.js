import { html } from 'lit-html';
import readme from './readme.md';
import internalLabel from './components/wpp-internal-label/readme.md';
export default {
  title: 'Design System/Components/Data display/Label',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { 'wpp-label': readme, 'wpp-internal-label': internalLabel },
  },
  argTypes: {
    optional: { control: { type: 'boolean' } },
    typography: {
      options: ['s-body', 's-strong'],
      control: { type: 'select' },
    },
  },
};
export const Label = (args) => html ` <wpp-label-v2-22-0
  .optional="${args.optional}"
  .typography="${args.typography}"
  .config="${args.config}"
  .tooltipConfig="${args.tooltipConfig}"
>
</wpp-label-v2-22-0>`;
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
