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
    length: {
      control: { type: 'number', min: 2, max: 7 },
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
  render: args => html `<wpp-floating-toolbar-v3-5-0
      .actionButtonsConfig="${args.actionButtonsConfig.slice(0, args.length)}"
      .orientation="${args.orientation}"
    />`,
  args: {
    actionButtonsConfig: actionButtonsConfigConst,
    orientation: 'horizontal',
    length: 2,
  },
};
