import { html } from 'lit-html';
import TabsReadme from './readme.md';
import TabReadme from './components/wpp-tab/readme.md';
export default {
  title: 'Design System/Components/Navigation/Tabs',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: TabsReadme, Items: TabReadme },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
};
export const Tabs = (args) => html `
  <wpp-tabs-v2-22-0 value="houses" .size="${args.size}">
    <wpp-tab-v2-22-0 value="houses">Houses</wpp-tab-v2-22-0>
    <wpp-tab-v2-22-0 .disabled="${args.disabled}" .counter="${args.counter}" value="cars"
      >A Bit Longer Text</wpp-tab-v2-22-0
    >
    <wpp-tab-v2-22-0 value="food">Food</wpp-tab-v2-22-0>
    <wpp-tab-v2-22-0 value="drinks">Drinks</wpp-tab-v2-22-0>
  </wpp-tabs-v2-22-0>
`;
Tabs.args = {
  disabled: false,
  counter: 0,
  size: 'm',
};
