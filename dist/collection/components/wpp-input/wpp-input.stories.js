import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    type: {
      options: ['text', 'password', 'search', 'number', 'decimal'],
      control: { type: 'select' },
    },
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    messageType: {
      options: [undefined, 'warning', 'error'],
      control: { type: 'select' },
    },
    autocomplete: {
      options: ['on', 'off'],
      control: { type: 'select' },
    },
    showIconStart: { control: { type: 'boolean' } },
    showIconEnd: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' }, if: { arg: 'type', eq: 'search' } },
  },
};
export const Regular = (args) => html ` <wpp-input-v3-3-1
    .type="${args.type}"
    .name="${args.name}"
    .value="${args.value}"
    .size="${args.size}"
    .disabled="${args.disabled}"
    .required="${args.required}"
    .readOnly="${args.readOnly}"
    .placeholder="${args.placeholder}"
    .messageType="${args.messageType}"
    .message="${args.message}"
    .labelConfig="${args.labelConfig}"
    .autocomplete="${args.autocomplete}"
  >
    ${args.showIconStart
  ? html `
          <wpp-icon-search-v3-3-1
            slot="icon-start"
            @click="${(e) => {
    e.stopPropagation();
    console.log('Left icon clicked');
  }}"
          ></wpp-icon-search-v3-3-1>
        `
  : null}
    ${args.showIconEnd
  ? html `
          <wpp-icon-ordered-list-v3-3-1
            slot="icon-end"
            @click="${(e) => {
    e.stopPropagation();
    console.log('Right icon clicked');
  }}"
          ></wpp-icon-ordered-list-v3-3-1>
        `
  : null}
  </wpp-input-v3-3-1>`;
Regular.args = {
  type: 'text',
  size: 'm',
  name: 'text-input',
  placeholder: 'Text',
  value: '',
  message: '',
  disabled: false,
  required: true,
  readOnly: false,
  showIconStart: false,
  showIconEnd: false,
  autocomplete: 'off',
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
Regular.parameters = {};
export const Search = (args) => html ` <wpp-input-v3-3-1
    type="search"
    .name="${args.name}"
    .value="${args.value}"
    .size="${args.size}"
    .disabled="${args.disabled}"
    .required="${args.required}"
    .placeholder="${args.placeholder}"
    .messageType="${args.messageType}"
    .message="${args.message}"
    .labelConfig="${args.labelConfig}"
    .autocomplete="${args.autocomplete}"
    .loading="${args.loading}"
  ></wpp-input-v3-3-1>`;
Search.args = {
  size: 'm',
  name: 'text-input',
  placeholder: 'Search',
  value: '',
  message: '',
  disabled: false,
  required: true,
  loading: false,
  autocomplete: 'off',
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
Search.parameters = {
  controls: { exclude: ['type', 'showIconStart', 'showIconEnd'] },
};
export const DecimalWithLimits = (args) => html ` <wpp-input-v3-3-1
      type="decimal"
      .name="${args.name}"
      .value="${args.value}"
      .size="${args.size}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .placeholder="${args.placeholder}"
      .messageType="${args.messageType}"
      .message="${args.message}"
      .labelConfig="${args.labelConfig}"
      .autocomplete="${args.autocomplete}"
      .minLength=${args.minLength}
      .maxLength=${args.maxLength}
    ></wpp-input-v3-3-1>
    <br />
    <wpp-input-v3-3-1
      type="decimal"
      .name="${args.name}"
      .value="${args.value}"
      .size="${args.size}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .placeholder="${args.placeholder}"
      .messageType="${args.messageType}"
      .message="${args.message}"
      .labelConfig="${{
  icon: '',
  text: 'Decimal input with minLength and maxLength props and error messages provided by the user',
  description: '',
  locales: {
    optional: 'Optional',
  },
}}"
      .minLength=${args.minLength}
      .maxLength=${args.maxLength}
      .locales=${args.locales}
    ></wpp-input-v3-3-1>`;
DecimalWithLimits.args = {
  type: 'decimal',
  size: 'm',
  name: 'text-input',
  placeholder: '123,123',
  value: '',
  message: '',
  disabled: false,
  required: true,
  labelConfig: {
    icon: '',
    text: 'Decimal input with minLength and maxLength props',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  minLength: 3,
  autocomplete: 'off',
  maxLength: 8,
  locales: {
    minLengthErrorMessage: minLength => `Minimum ${minLength} characters`,
    maxLengthErrorMessage: maxLength => `Maximum ${maxLength} characters`,
  },
};
DecimalWithLimits.parameters = {
  controls: { exclude: ['type', 'size', 'showIconStart', 'showIconEnd'] },
};
export const DecimalWithMask = (args) => html `
  <wpp-input-v3-3-1
    type=${args.type}
    .name="${args.name}"
    .value="${args.value}"
    size="${args.size}"
    .disabled="${args.disabled}"
    .autocomplete="${args.autocomplete}"
    .required="${args.required}"
    .placeholder="${args.placeholder}"
    .messageType="${args.messageType}"
    .message="${args.message}"
    .labelConfig="${args.labelConfig}"
    .maskOptions="${args.maskOptions}"
  ></wpp-input-v3-3-1>
`;
DecimalWithMask.args = {
  type: 'decimal',
  size: 'm',
  name: 'text-input',
  placeholder: '123.123,123',
  value: '',
  message: '',
  disabled: false,
  required: true,
  autocomplete: 'off',
  labelConfig: {
    icon: '',
    text: 'Decimal Input with custom mask pattern',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  maskOptions: {
    decimalPatternOptions: {
      decimalSeparator: ',',
      thousandSeparator: '.',
      precision: 3,
    },
  },
};
DecimalWithMask.parameters = {
  controls: { exclude: ['type', 'size', 'showIconStart', 'showIconEnd'] },
};
export const TextWithMask = (args) => html `
  <wpp-input-v3-3-1
    type=${args.type}
    .name="${args.name}"
    .value="${args.value}"
    .size="${args.size}"
    .disabled="${args.disabled}"
    .autocomplete="${args.autocomplete}"
    .required="${args.required}"
    .placeholder="${args.placeholder}"
    .messageType="${args.messageType}"
    .message="${args.message}"
    .labelConfig="${args.labelConfig}"
    .maskOptions="${args.maskOptions}"
  ></wpp-input-v3-3-1>
`;
TextWithMask.args = {
  type: 'text',
  size: 'm',
  name: 'text-input',
  placeholder: 'Enter credit card number: xxxx xxxx xxxx xxxx',
  value: '',
  message: '',
  disabled: false,
  autocomplete: 'off',
  required: true,
  labelConfig: {
    icon: '',
    text: 'Text Input with credit card mask pattern',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  maskOptions: {
    maskPlaceholder: 'xxxx xxxx xxxx xxxx',
    customPatternOptions: {
      mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    },
  },
};
TextWithMask.parameters = {
  controls: { exclude: ['type', 'size', 'showIconStart', 'showIconEnd'] },
};
export const TelWithMask = (args) => html `
  <wpp-input-v3-3-1
    type=${args.type}
    .name="${args.name}"
    .size="${args.size}"
    .disabled="${args.disabled}"
    .required="${args.required}"
    .autocomplete="${args.autocomplete}"
    .placeholder="${args.placeholder}"
    .messageType="${args.messageType}"
    .labelConfig="${args.labelConfig}"
    .maskOptions="${args.maskOptions}"
  ></wpp-input-v3-3-1>
`;
TelWithMask.args = {
  type: 'tel',
  size: 'm',
  autocomplete: 'off',
  name: 'text-input',
  placeholder: '+1 (xxx) xxx-xxxx',
  disabled: false,
  required: true,
  labelConfig: {
    icon: '',
    text: 'Tel Input with US phone mask pattern',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  maskOptions: {
    maskPlaceholder: '+1 (xxx) xxx-xxxx',
    telPatternOptions: {
      countryPhoneCode: '+1',
      mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    },
  },
};
TelWithMask.parameters = {
  controls: { exclude: ['type', 'size', 'showIconStart', 'showIconEnd', 'messageType'] },
};
