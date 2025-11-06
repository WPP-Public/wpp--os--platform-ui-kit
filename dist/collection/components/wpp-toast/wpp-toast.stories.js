import { html } from 'lit-html';
import ToastReadme from './readme.md';
import ToastContainerReadme from './components/wpp-toast-container/readme.md';
export default {
  title: 'Design System/Components/Feedback/Toast',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: ToastContainerReadme, Items: ToastReadme },
  },
  argTypes: {
    message: { type: 'string' },
    header: { type: 'string' },
    type: {
      options: ['warning', 'error', 'information', 'success'],
      control: { type: 'select' },
    },
  },
};
const primaryBtn = {
  label: 'Button',
  variant: 'inverted',
  disabled: false,
  loading: false,
  onClick: () => alert('Some action'),
};
export const ActionOff = (args) => html `
  <wpp-toast-v2-22-0
    .message="${args.message}"
    .icon="${args.icon}"
    .maxMessageLines="${args.maxMessageLines}"
    .header="${args.header}"
    .type="${args.type}"
    .duration="${60000000}"
  />
`;
ActionOff.args = {
  message: 'Successful message',
  icon: {
    name: '',
    url: '',
    styles: {},
  },
  maxMessageLines: 2,
  header: 'Title',
  type: 'success',
};
export const ActionOn = (args) => html `
  <wpp-toast-v2-22-0
    .message="${args.message}"
    .icon="${args.icon}"
    .maxMessageLines="${args.maxMessageLines}"
    .header="${args.header}"
    .type="${args.type}"
    .primaryBtn="${primaryBtn}"
    .duration="${30000}"
  >
  </wpp-toast-v2-22-0>
`;
ActionOn.args = {
  message: 'Warning message',
  icon: {
    name: '',
    url: '',
    styles: {},
  },
  maxMessageLines: 2,
  header: 'Title',
  type: 'warning',
};
