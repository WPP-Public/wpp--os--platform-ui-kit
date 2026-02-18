import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Feedback/Progress Indicator',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
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
    forceIntermediateEmptyState: { control: { type: 'boolean' } },
  },
};
export const Bar = (args) => html `
  <wpp-progress-indicator-v3-5-0
    .value=${args.value}
    .isShowPercentage=${args.isShowPercentage}
    .width=${args.width}
    .forceIntermediateEmptyState=${args.forceIntermediateEmptyState}
    .ariaProps=${args.ariaProps}
    style="margin-right: 50px"
  />
`;
Bar.args = {
  value: 0,
  width: 0,
  isShowPercentage: false,
  forceIntermediateEmptyState: false,
  ariaProps: {
    label: 'Default Progress Indicator',
  },
};
export const Circle = (args) => html ` <wpp-progress-indicator-v3-5-0
    variant="circle"
    .isShowPercentage=${args.isShowPercentage}
    .width=${args.width}
    .value=${args.value}
    .forceIntermediateEmptyState=${args.forceIntermediateEmptyState}
    .ariaProps=${args.ariaProps}
  />`;
Circle.args = {
  value: 0,
  width: 0,
  isShowPercentage: false,
  forceIntermediateEmptyState: false,
  ariaProps: {
    label: 'Circle Progress Indicator',
  },
};
