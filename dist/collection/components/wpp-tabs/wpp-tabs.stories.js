import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Navigation/Tabs',
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
  },
};
export const Tabs = (args) => html `
  <wpp-tabs-v3-3-1 value="houses" .size="${args.size}">
    <wpp-tab-v3-3-1 value="houses" icon="wpp-icon-pie-chart" .counter="${args.counter}">Houses</wpp-tab-v3-3-1>
    <wpp-tab-v3-3-1 icon="wpp-icon-bar-chart" .counter="${args.counter}" value="cars">A Bit Longer Text</wpp-tab-v3-3-1>
    <wpp-tab-v3-3-1 value="food" .counter="${args.counter}">Food</wpp-tab-v3-3-1>
    <wpp-tab-v3-3-1 value="drinks" .counter="${args.counter}">Drinks</wpp-tab-v3-3-1>
  </wpp-tabs-v3-3-1>
`;
Tabs.args = {
  counter: 0,
  size: 'm',
};
