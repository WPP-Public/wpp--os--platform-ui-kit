import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data Visualization/Legend',
  component: 'wpp-legend',
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the legend',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Legend' },
      },
    },
    color: {
      control: 'text',
      description: 'The label of the legend',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--wpp-dataviz-color-cat-neutral-1)' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the legend is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};
export const Default = {
  render: args => html `
    <wpp-legend-v4-0-0 .label="${args.label}" .color="${args.color}" .disabled="${args.disabled}"></wpp-legend-v4-0-0>
  `,
  args: {
    label: 'Label',
    color: 'var(--wpp-dataviz-color-cat-neutral-1)',
    disabled: false,
  },
};
