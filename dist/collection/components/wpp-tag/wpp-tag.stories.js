import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Data display/Tag',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    label: {
      type: 'string',
    },
    variant: {
      options: [undefined, 'neutral', 'warning', 'positive', 'negative'],
      control: { type: 'select' },
    },
    categoricalColorIndex: {
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
      <wpp-tag-v2-22-0
        .label="${args.label}"
        variant=${args.variant}
        .categoricalColorIndex="${args.categoricalColorIndex}"
      ></wpp-tag-v2-22-0>
      <wpp-tag-v2-22-0
        .label="${args.label}"
        variant=${args.variant}
        .categoricalColorIndex="${args.categoricalColorIndex}"
      >
        ${args.showIconStart ? html ` <wpp-icon-premium-v2-22-0 slot="icon-start"></wpp-icon-premium-v2-22-0> ` : null}
      </wpp-tag-v2-22-0>
    </div>
  `;
Tag.args = {
  label: 'Title',
  variant: undefined,
  categoricalColorIndex: undefined,
  showIconStart: true,
};
