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

    .section-title {
      width: 100%;
      margin: 16px 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .section-title:first-child {
      margin-top: 0;
    }
  </style>

  <div class="wrapper">
    <div class="section-title">Default</div>
    <wpp-tag-v4-1-0 .label="${args.label}" .variant=${args.variant}></wpp-tag-v4-1-0>
    <wpp-tag-v4-1-0 .label="${args.label}" .variant=${args.variant}>
      ${args.showIconStart ? html ` <wpp-icon-premium-v4-1-0 slot="icon-start"></wpp-icon-premium-v4-1-0> ` : null}
    </wpp-tag-v4-1-0>

    <div class="section-title">Width-based Truncation (hover for tooltip)</div>
    <wpp-tag-v4-1-0
      style="max-width: ${args.maxWidth}"
      .label="${args.truncatedLabel}"
      .variant=${args.variant}
    ></wpp-tag-v4-1-0>
    <wpp-tag-v4-1-0 style="max-width: ${args.maxWidth}" .label="${args.truncatedLabel}" .variant=${args.variant}>
      <wpp-icon-premium-v4-1-0 slot="icon-start"></wpp-icon-premium-v4-1-0>
    </wpp-tag-v4-1-0>
  </div>
`;
Tag.args = {
  label: 'Title',
  variant: 'neutral',
  showIconStart: true,
  truncatedLabel: 'This is a very long tag label that will be truncated',
  maxWidth: '150px',
};
Tag.argTypes = {
  maxWidth: {
    control: { type: 'text' },
    description: 'The maximum width for truncated tags (CSS value)',
  },
  truncatedLabel: {
    control: { type: 'text' },
    description: 'Label text for the truncated tag examples',
  },
};
