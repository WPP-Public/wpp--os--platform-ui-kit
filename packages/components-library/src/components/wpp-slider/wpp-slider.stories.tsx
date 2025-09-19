import { Story, Meta } from '@storybook/web-components'
import { html, render } from 'lit-html'

import { Components } from '../../components'

import { WppSlider } from './wpp-slider'
import readme from './readme.md'

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
} as Meta<typeof WppSlider>

export const Single: Story = args => {
  const container = document.createElement('div')

  render(
    html`
      <wpp-slider-v3-1-1
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
      ></wpp-slider-v3-1-1>
    `,
    container,
  )

  return container
}

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
}

export const Range: Story<Components.WppSlider> = (args: Components.WppSlider) => {
  const container = document.createElement('div')

  render(
    html`<wpp-slider-v3-1-1
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
    ></wpp-slider-v3-1-1> `,
    container,
  )

  return container
}

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
}

export const RangeWithInputsAndMask: Story<Components.WppSlider> = (
  args: Components.WppSlider,
) => html`<wpp-slider-v3-1-1
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
></wpp-slider-v3-1-1> `

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
}

RangeWithInputsAndMask.parameters = {
  controls: { exclude: ['withInput', 'continuous', 'withValue'] },
}
