import { html, render } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Slider',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    inputWidth: {
      options: ['100px', '200px', '10ch', '20ch'],
      control: { type: 'select' },
    },
    name: { type: 'string' },
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
    continuous: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    withInput: { control: { type: 'boolean' } },
    withValue: { control: { type: 'boolean' } },
    value: { control: { type: 'object' } },
    marks: { control: { type: 'object' } },
    labelConfig: { control: { type: 'object' } },
  },
};
export const Single = (args) => {
  const container = document.createElement('div');
  render(html `
      <wpp-slider-v4-0-0
        type="single"
        .name=${args.name}
        .value=${args.value}
        .marks=${args.marks}
        .min=${args.min}
        .max=${args.max}
        .step=${args.step}
        .continuous=${args.continuous}
        .disabled=${args.disabled}
        .required=${args.required}
        .withInput=${args.withInput}
        .withValue=${args.withValue}
        .size=${args.size}
        .labelConfig=${args.labelConfig}
      ></wpp-slider-v4-0-0>
    `, container);
  return container;
};
Single.args = {
  name: 'slider-single',
  min: 1,
  max: 5,
  step: 1,
  continuous: false,
  disabled: false,
  withInput: false,
  withValue: false,
  required: true,
  value: 1,
  size: 'm',
  marks: [
    {
      label: 'Low',
      value: 1,
    },
    {
      label: 'Medium',
      value: 2,
    },
    {
      label: 'High',
      value: 3,
    },
    {
      label: 'Very High',
      value: 4,
    },
    {
      label: 'Extremely High',
      value: 5,
    },
  ],
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
export const Range = (args) => {
  const container = document.createElement('div');
  render(html `<wpp-slider-v4-0-0
      type="range"
      .name=${args.name}
      .value=${args.value}
      .marks=${args.marks}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .disabled=${args.disabled}
      .continuous=${args.continuous}
      .required=${args.required}
      .withInput=${args.withInput}
      .withValue=${args.withValue}
      .size=${args.size}
      .labelConfig=${args.labelConfig}
    ></wpp-slider-v4-0-0> `, container);
  return container;
};
Range.args = {
  name: 'slider-range',
  value: [3, 5],
  min: 1,
  max: 9,
  step: 2,
  continuous: false,
  disabled: false,
  withInput: false,
  withValue: false,
  required: true,
  marks: true,
  size: 'm',
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
export const RangeWithInputsAndMask = (args) => html `<wpp-slider-v4-0-0
    type="range"
    .name=${args.name}
    .value=${args.value}
    .inputWidth=${args.inputWidth}
    .marks=${args.marks}
    .min=${args.min}
    .max=${args.max}
    .step=${args.step}
    .disabled=${args.disabled}
    .continuous=${args.continuous}
    .required=${args.required}
    .withInput=${args.withInput}
    .withValue=${args.withValue}
    .size=${args.size}
    .labelConfig=${args.labelConfig}
    .maskOptions=${args.maskOptions}
  ></wpp-slider-v4-0-0> `;
RangeWithInputsAndMask.args = {
  name: 'slider-range',
  value: [3, 5],
  min: 1,
  max: 999,
  step: 2,
  continuous: true,
  disabled: false,
  withInput: true,
  withValue: false,
  required: true,
  marks: true,
  inputWidth: '68px',
  size: 'm',
  labelConfig: {
    icon: '',
    text: 'Range Slider with inputs that have mask.',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  maskOptions: [
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      decimalSeparator: '.',
      thousandSeparator: ',',
      prefix: '$',
    },
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      decimalSeparator: '.',
      thousandSeparator: ',',
      postfix: '%',
    },
  ],
};
RangeWithInputsAndMask.parameters = {
  controls: { exclude: ['withInput', 'continuous', 'withValue'] },
};
export const MiddleRange = (args) => html `<wpp-slider-v4-0-0
    type="middle-range"
    .name=${args.name}
    .value=${args.value}
    .marks=${args.marks}
    .min=${args.min}
    .max=${args.max}
    .step=${args.step}
    .disabled=${args.disabled}
    .required=${args.required}
    .withValue=${args.withValue}
    .size=${args.size}
    .labelConfig=${args.labelConfig}
    .maskOptions=${args.maskOptions}
  ></wpp-slider-v4-0-0> `;
MiddleRange.args = {
  name: 'slider-range',
  value: 3,
  min: 1,
  max: 5,
  step: 1,
  disabled: false,
  withValue: false,
  required: true,
  marks: [
    { label: 'Very low', value: 1 },
    { label: 'Low', value: 2 },
    { label: 'Medium', value: 3 },
    { label: 'High', value: 4 },
    { label: 'Very High', value: 5 },
  ],
  size: 'm',
  labelConfig: {
    icon: '',
    text: 'Middle-range Slider',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
MiddleRange.parameters = {
  controls: { exclude: ['inputWidth', 'continuous', 'withInput'] },
};
export const MiddleRangeContinuous = (args) => html `<wpp-slider-v4-0-0
    type="middle-range"
    .name=${args.name}
    .value=${args.value}
    .inputWidth=${args.inputWidth}
    .marks=${args.marks}
    .min=${args.min}
    .withInput=${true}
    .max=${args.max}
    .step=${args.step}
    .disabled=${args.disabled}
    .continuous=${true}
    .required=${args.required}
    .size=${args.size}
    .labelConfig=${args.labelConfig}
    .maskOptions=${args.maskOptions}
  ></wpp-slider-v4-0-0> `;
MiddleRangeContinuous.args = {
  name: 'slider-range',
  value: 3,
  min: -5,
  max: 5,
  step: 1,
  disabled: false,
  required: true,
  marks: true,
  inputWidth: '68px',
  size: 'm',
  labelConfig: {
    icon: '',
    text: 'Continuous middle-range slider with input',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
MiddleRangeContinuous.parameters = {
  controls: { exclude: ['continuous', 'withValue', 'withInput'] },
};
