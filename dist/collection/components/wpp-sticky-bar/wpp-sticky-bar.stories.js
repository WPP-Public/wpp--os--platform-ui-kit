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
      options: ['one-line', 'two-lines', 'two-lines-with-tabs'],
      control: { type: 'select' },
    },
    barTitle: { type: 'string' },
    withBackButton: { control: { type: 'boolean' } },
    scrollTreshold: { type: 'number' },
    offsetFromTop: { type: 'number' },
  },
};
export const StickyBar = (args) => html `
    <div class="wpp" style="position: sticky; top: 0; z-index: 900; height: 63px; background-color: #ffffff; border-bottom: 1px solid black">
      <header style="height: 100%">
        <wpp-typography-v3-5-0 type="2xl-heading">OS-bar</wpp-typography-v3-5-0>
      </header>
    </div>
    <wpp-sticky-bar-v3-5-0
      .variant=${args.variant}
      .barTitle=${args.barTitle}
      .withBackButton=${args.withBackButton}
      .scrollTreshold=${args.scrollTreshold}
      .buttons=${args.buttons}
      .tabs=${args.tabs}
      .offsetFromTop=${args.offsetFromTop}
    ></wpp-sticky-bar-v3-5-0>
    <div style="width: 100%; height: 1400px; display: flex; flex-direction: column; align-items: center; padding: 50px; box-sizing: border-box">
        <div style="width: 70%; height: 100%; display: flex; align-items: center; flex-direction: column; box-sizing: border-box; padding: 50px; background: rgb(173 216 230); border: 4px dashed gray; border-radius: 50px; opacity: 0.5">
            <wpp-typography-v3-5-0 type="2xl-heading">Additional space on page</wpp-typography-v3-5-0>
        </div>
    </<div>

  `;
StickyBar.args = {
  variant: 'one-line',
  barTitle: 'Page Title',
  withBackButton: true,
  scrollTreshold: 200,
  offsetFromTop: undefined,
  buttons: [
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
  ],
  tabs: [
    {
      text: 'Tab 1',
      value: 'tab1',
    },
    {
      text: 'Tab 2',
      value: 'tab2',
    },
    {
      text: 'Tab 3',
      value: 'tab3',
    },
    {
      text: 'Tab 4',
      value: 'tab4',
    },
    {
      text: 'Tab 5',
      value: 'tab5',
    },
  ],
};
