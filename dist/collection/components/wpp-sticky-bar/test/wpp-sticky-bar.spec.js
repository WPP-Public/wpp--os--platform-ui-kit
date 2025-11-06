import { newSpecPage } from '@stencil/core/testing';
import { WppStickyBar } from '../wpp-sticky-bar';
import { h } from '@stencil/core';
describe('wpp-sticky-bar', () => {
  it('render one-line sticky bar', async () => {
    const page = await newSpecPage({
      components: [WppStickyBar],
      template: () => h("wpp-sticky-bar-v2-22-0", { variant: "one-line", barTitle: "Page Title" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('render two-lines sticky bar with custom content', async () => {
    const page = await newSpecPage({
      components: [WppStickyBar],
      template: () => (h("wpp-sticky-bar-v2-22-0", { variant: "two-lines", barTitle: "Page Title", buttons: [
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
        ] }, h("div", { slot: "content" }, h("wpp-typography-v2-22-0", { type: "m-body" }, "Body Content")))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('render two-lines-with-tabs sticky bar', async () => {
    const page = await newSpecPage({
      components: [WppStickyBar],
      template: () => (h("wpp-sticky-bar-v2-22-0", { variant: "two-lines-with-tabs", barTitle: "Page Title", buttons: [
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
        ], tabs: [
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
        ] })),
    });
    expect(page.root).toMatchSnapshot();
  });
});
