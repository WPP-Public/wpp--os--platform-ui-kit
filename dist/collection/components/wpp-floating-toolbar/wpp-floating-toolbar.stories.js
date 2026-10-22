import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Surfaces/Floating toolbar',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    actionButtonsConfig: {
      control: false,
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    selectable: { control: { type: 'boolean' } },
    length: {
      control: { type: 'number', min: 1, max: 7 },
    },
  },
};
const actionButtonsConfigConst = [
  {
    icon: 'wpp-icon-add',
    onClick: () => console.log('Add button clicked'),
    ariaProps: { label: 'Add button' },
  },
  {
    icon: 'wpp-icon-edit',
    onClick: () => console.log('Edit button clicked'),
    ariaProps: { label: 'Edit button' },
  },
  {
    icon: 'wpp-icon-bookmark',
    onClick: () => console.log('Bookmark button clicked'),
    ariaProps: { label: 'Bookmark button' },
  },
  {
    icon: 'wpp-icon-info',
    onClick: () => console.log('Info button clicked'),
    ariaProps: { label: 'Info button' },
  },
  {
    icon: 'wpp-icon-link',
    onClick: () => console.log('Link button clicked'),
    ariaProps: { label: 'Link button' },
  },
  {
    icon: 'wpp-icon-search',
    onClick: () => console.log('Search button clicked'),
    ariaProps: { label: 'Search button' },
  },
  {
    icon: 'wpp-icon-filter',
    onClick: () => console.log('Filter button clicked'),
    ariaProps: { label: 'Filter button' },
  },
];
export const FloatingToolbar = {
  render: args => html `<wpp-floating-toolbar-v4-6-0
      .actionButtonsConfig="${args.actionButtonsConfig.slice(0, args.length)}"
      .orientation="${args.orientation}"
      .selectable="${args.selectable}"
    />`,
  args: {
    actionButtonsConfig: actionButtonsConfigConst,
    orientation: 'horizontal',
    length: 2,
    selectable: false,
  },
};
export const TextActions = {
  render: args => html `<wpp-floating-toolbar-v4-6-0
      .actionButtonsConfig="${args.actionButtonsConfig}"
      .orientation="${args.orientation}"
      .selectable="${args.selectable}"
    />`,
  args: {
    // A text action needs no icon; its accessible name contains the visible text
    actionButtonsConfig: [
      { id: 'zoom-out', icon: 'wpp-icon-remove', ariaProps: { label: 'Zoom out' } },
      { id: 'zoom-level', label: '100%', ariaProps: { label: '100%, reset zoom' } },
      { id: 'zoom-in', icon: 'wpp-icon-add', ariaProps: { label: 'Zoom in' } },
    ],
    orientation: 'horizontal',
    selectable: false,
  },
};
export const SingleAction = {
  render: TextActions.render,
  args: {
    actionButtonsConfig: [{ id: 'upload', icon: 'wpp-icon-upload', ariaProps: { label: 'Upload' } }],
    orientation: 'horizontal',
    selectable: false,
  },
};
