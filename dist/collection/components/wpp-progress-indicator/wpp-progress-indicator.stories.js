import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Feedback/Progress Indicator',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    value: {
      control: { type: 'range' },
      options: [0, 100, 1],
    },
    width: {
      type: 'number',
    },
    isShowPercentage: { control: { type: 'boolean' } },
    label: {
      type: 'string',
    },
    forceIntermediateEmptyState: { control: { type: 'boolean' } },
  },
};
export const Bar = (args) => html `
    <wpp-progress-indicator-v2-22-0
      .value=${args.value}
      .isShowPercentage=${args.isShowPercentage}
      .width=${args.width}
      .label=${args.label}
      .forceIntermediateEmptyState=${args.forceIntermediateEmptyState}
      style="margin-right: 50px"
    />
  `;
Bar.args = {
  value: 0,
  width: 0,
  isShowPercentage: false,
  label: '',
  forceIntermediateEmptyState: false,
};
export const Circle = (args) => html ` <wpp-progress-indicator-v2-22-0
    variant="circle"
    .isShowPercentage=${args.isShowPercentage}
    .width=${args.width}
    .value=${args.value}
    .forceIntermediateEmptyState=${args.forceIntermediateEmptyState}
    .label=${args.label}
  />`;
Circle.args = {
  value: 0,
  width: 0,
  isShowPercentage: false,
  label: '',
  forceIntermediateEmptyState: false,
};
