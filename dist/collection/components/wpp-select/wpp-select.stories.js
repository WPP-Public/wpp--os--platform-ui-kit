import { html } from 'lit-html';
import SingleSelectReadme from './readme.md';
import ListItemReadme from '../wpp-list-item/readme.md';
export default {
  title: 'Design System/Components/Selection and input/Select',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: SingleSelectReadme, Items: ListItemReadme },
  },
  argTypes: {
    placeholder: { type: 'string' },
    message: { control: { type: 'text' } },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
    maximumSelectedItems: {
      options: ['none', '3', '5'],
      control: { type: 'select' },
    },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    withSearch: { control: { type: 'boolean' } },
    showSelectAllText: { control: { type: 'boolean' } },
    dropdownConfig: { control: 'object' },
  },
};
export const Single = (args) => html `
  <wpp-select-v2-22-0
    type="single"
    name="single-select"
    .message=${args.message}
    .messageType=${args.messageType}
    .placeholder=${args.placeholder}
    .size=${args.size}
    .disabled=${args.disabled}
    .required=${args.required}
    .dropdownConfig=${args.dropdownConfig}
    .labelConfig=${args.labelConfig}
    .withSearch=${args.withSearch}
    .maximumSelectedItems=${args.maximumSelectedItems}
    .dropdownWidth=${args.dropdownWidth}
  >
    ${args.showIconStart
  ? html `
          <wpp-icon-clock-v2-22-0
            slot="icon-start"
            @click="${(e) => {
    e.stopPropagation();
    console.log('Left icon clicked');
  }}"
          ></wpp-icon-clock-v2-22-0>
        `
  : null}
    <wpp-list-item-v2-22-0 .value=${1}>
      <p slot="label">Car</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${2} .disabled="${true}">
      <p slot="label">House</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${3}>
      <p slot="label">Some looooooooooooooooong text in the item to test truncate</p>
      <p slot="caption">Text should be truncated</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${4} .disabled="${true}">
      <wpp-icon-plus-v2-22-0 slot="left"></wpp-icon-plus-v2-22-0>
      <p slot="label">Text</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${5}>
      <wpp-icon-plus-v2-22-0 slot="left"></wpp-icon-plus-v2-22-0>
      <p slot="label">Text</p>
      <p slot="caption">Creates a new element</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${6}>
      <wpp-avatar-v2-22-0 name="Rob Adi" slot="left"></wpp-avatar-v2-22-0>
      <p slot="label">Rob Adi</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${7}>
      <p slot="label">Some looooooooooooooooong text in the item to test truncate</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${8}>
      <p slot="label">Item without information</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${9}>
      <p slot="label">Multiple Cars</p>
    </wpp-list-item-v2-22-0>

    <wpp-list-item-v2-22-0 .value=${10}>
      <wpp-avatar-v2-22-0 size="s" name="Ava Subtitle" slot="left"></wpp-avatar-v2-22-0>
      <span slot="subtitle">This is a subtitle</span>
      <p slot="label">Item with Avatar and Subtitle</p>
      <span slot="caption">Optional caption here</span>
      <wpp-tag-v2-22-0 label="Text" variant="positive" slot="right" .disabled="${args.disabled}"> </wpp-tag-v2-22-0>
    </wpp-list-item-v2-22-0>
  </wpp-select-v2-22-0>
`;
Single.args = {
  message: '',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
  size: 'm',
  disabled: false,
  required: true,
  withSearch: false,
  showIconStart: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
Single.parameters = {
  controls: { exclude: ['placeholder'] },
};
export const Multiple = (args) => html `
  <wpp-select-v2-22-0
    type="multiple"
    name="multiple-select"
    .message=${args.message}
    .messageType=${args.messageType}
    .placeholder=${args.placeholder}
    .size=${args.size}
    .disabled=${args.disabled}
    .required=${args.required}
    .dropdownConfig=${args.dropdownConfig}
    .labelConfig=${args.labelConfig}
    .withSearch=${args.withSearch}
    .withFolder=${args.withFolder}
    .showSelectAllText=${args.showSelectAllText}
    .dropdownWidth=${args.dropdownWidth}
    .value=${args.value}
    .maximumSelectedItems="${args.maximumSelectedItems}"
  >
    ${args.showIconStart
  ? html `
          <wpp-icon-clock-v2-22-0
            slot="icon-start"
            @click="${(e) => {
    e.stopPropagation();
    console.log('Left icon clicked');
  }}"
          ></wpp-icon-clock-v2-22-0>
        `
  : null}
    <wpp-list-item-v2-22-0 .value=${1} checkboxName="checkbox-name-1">
      <p slot="label">Car</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${2} checkboxName="checkbox-name-2" .disabled="${true}">
      <p slot="label">House</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${3} checkboxName="checkbox-name-3">
      <p slot="label">Some looooooooooooooooong text in the item to test truncate.</p>
      <p slot="caption">Text should be truncated</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${4} checkboxName="checkbox-name-4" .disabled="${true}">
      <wpp-icon-plus-v2-22-0 slot="left"></wpp-icon-plus-v2-22-0>
      <p slot="label">Text</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${5} checkboxName="checkbox-name-5">
      <wpp-icon-plus-v2-22-0 slot="left"></wpp-icon-plus-v2-22-0>
      <p slot="label">Text</p>
      <p slot="caption">Creates a new element</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${6} checkboxName="checkbox-name-6">
      <wpp-avatar-v2-22-0 name="Rob Adi" slot="left"></wpp-avatar-v2-22-0>
      <p slot="label">Rob Adi</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${7} checkboxName="checkbox-name-7">
      <p slot="label">Some looooooooooooooooong text in the item to test truncate</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${8} checkboxName="checkbox-name-8">
      <p slot="label">Item without info</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${9} checkboxName="checkbox-name-9">
      <p slot="label">Multiple Cars</p>
    </wpp-list-item-v2-22-0>
    <wpp-list-item-v2-22-0 .value=${10} checkboxName="checkbox-name-10">
      <p slot="label">Update information</p>
    </wpp-list-item-v2-22-0>

    <wpp-list-item-v2-22-0 .value=${11} checkboxName="checkbox-name-11">
      <span slot="subtitle">Subtitle in Multiple</span>
      <p slot="label">Item with Avatar and Subtitle (Multiple)</p>
      <span slot="caption">Optional caption in multiple</span>
      <wpp-tag-v2-22-0 label="Text" variant="positive" slot="right" .disabled="${args.disabled}"> </wpp-tag-v2-22-0>
    </wpp-list-item-v2-22-0>
  </wpp-select-v2-22-0>
`;
Multiple.args = {
  message: '',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
  size: 'm',
  disabled: false,
  required: true,
  withSearch: false,
  withFolder: true,
  showSelectAllText: true,
  value: [],
  showIconStart: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
Multiple.parameters = {
  controls: { exclude: ['placeholder'] },
};
export const Text = (args) => html ` <wpp-select-v2-22-0
  .disabled="${args.disabled}"
  .placeholder="${args.placeholder}"
  .dropdownWidth="${args.dropdownWidth}"
  value="long-text"
  type="text"
  name="text-select"
  .dropdownConfig=${args.dropdownConfig}
>
  ${args.showIconStart
  ? html `
        <wpp-icon-clock-v2-22-0
          slot="icon-start"
          @click="${(e) => {
    e.stopPropagation();
    console.log('Left icon clicked');
  }}"
        ></wpp-icon-clock-v2-22-0>
      `
  : null}
  <wpp-list-item-v2-22-0 value="cars">
    <p slot="label">Cars</p>
  </wpp-list-item-v2-22-0>
  <wpp-list-item-v2-22-0 value="houses" .disabled="${true}">
    <p slot="label">Houses</p>
  </wpp-list-item-v2-22-0>
  <wpp-list-item-v2-22-0 value="trains">
    <p slot="label">Trains</p>
  </wpp-list-item-v2-22-0>
  <wpp-list-item-v2-22-0 value="long-text">
    <p slot="label">A Bit Longer Text</p>
  </wpp-list-item-v2-22-0>
  <wpp-list-item-v2-22-0 value="food">
    <p slot="label">Food</p>
  </wpp-list-item-v2-22-0>
  <wpp-list-item-v2-22-0 value="drinks">
    <p slot="label">Drinks</p>
  </wpp-list-item-v2-22-0>
  <wpp-list-item-v2-22-0 value="fruits">
    <p slot="label">Fruits</p>
  </wpp-list-item-v2-22-0>
</wpp-select-v2-22-0>`;
Text.args = {
  placeholder: 'Select option',
  dropdownWidth: 'auto',
  disabled: false,
  showIconStart: true,
};
Text.parameters = {
  controls: { exclude: ['message', 'messageType', 'size', 'withSearch'] },
};
