import { html, render } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Selection and input/Slider',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    inputWidth: { type: 'string' },
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
  let rerenderCount = 0;
  const setupSlider = () => {
    requestAnimationFrame(() => {
      const container = document.getElementById('slider-container');
      if (container) {
        render(html `
            <wpp-slider-v2-22-0
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
              .labelConfig="${args.labelConfig}"
            ></wpp-slider-v2-22-0>
          `, container);
      }
      if (rerenderCount < 10) {
        rerenderCount++;
        setTimeout(() => setupSlider(), 100);
      }
    });
  };
  setupSlider();
  return html `<div id="slider-container"></div>`;
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
export const Range = (args) => html `<wpp-slider-v2-22-0
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
></wpp-slider-v2-22-0> `;
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
export const RangeWithInputsAndMask = (args) => html `<wpp-slider-v2-22-0
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
></wpp-slider-v2-22-0> `;
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
  inputWidth: undefined,
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
      precision: 2,
      decimalSeparator: '.',
      thousandSeparator: ',',
      prefix: '$',
    },
    {
      precision: 2,
      decimalSeparator: '.',
      thousandSeparator: ',',
      postfix: '%',
    },
  ],
};
RangeWithInputsAndMask.parameters = {
  controls: { exclude: ['withInput', 'continuous'] },
};
