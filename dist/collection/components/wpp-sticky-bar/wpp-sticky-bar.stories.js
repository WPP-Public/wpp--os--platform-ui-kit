import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Surfaces/Sticky Bar',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['small', 'medium', 'with-tabs'],
      control: { type: 'select' },
    },
    barTitle: { type: 'string' },
    withBackButton: { control: { type: 'boolean' } },
    scrollTreshold: { type: 'number' },
    offsetFromTop: {
      control: { type: 'select' },
      options: [50, 63],
    },
    withContent: {
      control: 'boolean',
      if: {
        arg: 'variant',
        eq: 'medium',
      },
    },
    withButtons: {
      control: 'boolean',
      if: {
        arg: 'variant',
        eq: 'small',
      },
    },
    withTabs: {
      control: 'boolean',
      if: {
        arg: 'variant',
        eq: 'with-tabs',
      },
    },
    tabSize: {
      control: 'select',
      options: ['s', 'm'],
      if: {
        arg: 'variant',
        eq: 'with-tabs',
      },
    },
    tabItems: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      if: {
        arg: 'variant',
        eq: 'with-tabs',
      },
    },
  },
};
const BUTTONS = [
  {
    variant: 'primary',
    text: 'Primary',
  },
  {
    variant: 'secondary',
    text: 'Secondary 1',
  },
  {
    variant: 'secondary',
    text: 'Secondary 2',
  },
  {
    variant: 'action-button',
    text: 'Action Btn',
  },
];
const TABS = [
  {
    text: 'Tab 1',
    value: 'tab1',
    counter: 3,
  },
  {
    text: 'Tab 2',
    value: 'tab2',
    icon: 'wpp-icon-pie-chart',
  },
  {
    text: 'Tab 3',
    value: 'tab3',
  },
  {
    text: 'Tab 4',
    value: 'tab4',
    counter: 4,
    icon: 'wpp-icon-bar-chart',
  },
  {
    text: 'Tab 5',
    value: 'tab5',
  },
  {
    text: 'Tab 6',
    value: 'tab6',
  },
  {
    text: 'Tab 7',
    value: 'tab7',
  },
  {
    text: 'Tab 8',
    value: 'tab8',
  },
];
export const StickyBar = (args) => html `
    <div class="wpp" style="position: sticky; top: 0; z-index: 900; height: 63px; background-color: #ffffff; border-bottom: 1px solid black">
      <header style="height: 100%">
        <wpp-typography-v4-0-0 type="2xl-heading">OS-bar</wpp-typography-v4-0-0>
      </header>
    </div>
    <wpp-sticky-bar-v4-0-0
      .variant=${args.variant}
      .barTitle=${args.barTitle}
      .withBackButton=${args.withBackButton}
      .scrollTreshold=${args.scrollTreshold}
      .buttons=${args.withButtons ? BUTTONS : undefined}
      .tabs=${args.withTabs ? TABS.slice(0, args.tabItems) : undefined}
      .offsetFromTop=${args.offsetFromTop}
      .tabSize=${args.tabSize}
    >
      ${args.withContent ? html `<div slot="content"><wpp-typography-v4-0-0 type=${'xl-heading'}>Content</wpp-typography-v4-0-0></div>` : null}
    </wpp-sticky-bar-v4-0-0>
    <div style="width: 100%; height: 1400px; display: flex; flex-direction: column; align-items: center; padding: 50px; box-sizing: border-box">
        <div style="width: 70%; height: 100%; display: flex; align-items: center; flex-direction: column; box-sizing: border-box; padding: 50px; background: rgb(173 216 230); border: 4px dashed gray; border-radius: 50px; opacity: 0.5">
            <wpp-typography-v4-0-0 type="2xl-heading">Additional space on page</wpp-typography-v4-0-0>
        </div>
    </<div>
  `;
StickyBar.args = {
  variant: 'small',
  barTitle: 'Page Title',
  withBackButton: false,
  withContent: false,
  withButtons: false,
  tabSize: 's',
  tabItems: 8,
  withTabs: true,
  scrollTreshold: 200,
  offsetFromTop: 63,
};
