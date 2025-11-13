import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data display/Tag',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    label: {
      type: 'string',
    },
    variant: {
      options: [
        'neutral',
        'warning',
        'positive',
        'negative',
        'Cat-1',
        'Cat-2',
        'Cat-3',
        'Cat-4',
        'Cat-5',
        'Cat-6',
        'Cat-7',
        'Cat-8',
        'Cat-9',
      ],
      control: { type: 'select' },
    },
  },
};
export const Tag = (args) => html `
  <style>
    .wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .wrapper > * {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  </style>

  <div class="wrapper">
    <wpp-tag-v3-3-1 .label="${args.label}" .variant=${args.variant}></wpp-tag-v3-3-1>
    <wpp-tag-v3-3-1 .label="${args.label}" .variant=${args.variant}>
      ${args.showIconStart ? html ` <wpp-icon-premium-v3-3-1 slot="icon-start"></wpp-icon-premium-v3-3-1> ` : null}
    </wpp-tag-v3-3-1>
  </div>
`;
Tag.args = {
  label: 'Title',
  variant: 'neutral',
  showIconStart: true,
};
