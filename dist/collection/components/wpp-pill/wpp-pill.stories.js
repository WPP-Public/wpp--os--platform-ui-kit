import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Pill',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
};
export const Single = (args) => html `
  <wpp-pill-v4-1-0
    label="${args.label}"
    value="${args.value}"
    size="${args.size}"
    checked="${args.checked}"
    maxLength="${args.maxLength}"
    .disabled="${args.disabled}"
  ></wpp-pill-v4-1-0>
`;
Single.args = {
  disabled: false,
  label: 'Item A',
  value: 'item-a',
  size: 'm',
  checked: false,
  maxLength: 10,
};
export const Multiple = (args) => html `
  <wpp-pill-v4-1-0
    label="${args.label}"
    value="${args.value}"
    type="multiple"
    size="${args.size}"
    checked="${args.checked}"
    maxLength="${args.maxLength}"
    .disabled="${args.disabled}"
  ></wpp-pill-v4-1-0>
`;
Multiple.args = {
  disabled: false,
  label: 'Item A',
  value: 'item-a',
  size: 'm',
  checked: false,
  maxLength: 10,
};
export const Display = (args) => html `
  <wpp-pill-v4-1-0
    label="${args.label}"
    value="${args.value}"
    type="display"
    size="${args.size}"
    removable="${args.removable}"
    maxLength="${args.maxLength}"
    .disabled="${args.disabled}"
  ></wpp-pill-v4-1-0>
`;
Display.args = {
  disabled: false,
  removable: false,
  label: 'Item A',
  value: 'item-a',
  size: 'm',
  maxLength: 10,
};
export const Draggable = (args) => html `
  <wpp-pill-v4-1-0
    label="${args.label}"
    value="${args.value}"
    type="draggable"
    size="${args.size}"
    removable="${args.removable}"
    maxLength="${args.maxLength}"
    .disabled="${args.disabled}"
  ></wpp-pill-v4-1-0>
`;
Draggable.args = {
  disabled: false,
  removable: false,
  label: 'Item A',
  value: 'item-a',
  size: 'm',
  maxLength: 10,
};
