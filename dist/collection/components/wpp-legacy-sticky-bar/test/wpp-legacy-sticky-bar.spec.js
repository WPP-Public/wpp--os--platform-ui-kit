import { newSpecPage } from '@stencil/core/testing';
import { WppLegacyStickyBar } from '../wpp-legacy-sticky-bar';
import { h } from '@stencil/core';
describe('wpp-legacy-sticky-bar', () => {
  it('render one-line sticky bar', async () => {
    const page = await newSpecPage({
      components: [WppLegacyStickyBar],
      template: () => h("wpp-legacy-sticky-bar-v4-7-0", { variant: "one-line", barTitle: "Page Title" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('render two-lines sticky bar with custom content', async () => {
    const page = await newSpecPage({
      components: [WppLegacyStickyBar],
      template: () => (h("wpp-legacy-sticky-bar-v4-7-0", { variant: "two-lines", barTitle: "Page Title", buttons: [
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
        ] }, h("div", { slot: "content" }, h("wpp-typography-v4-7-0", { type: "m-body" }, "Body Content")))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('render two-lines-with-tabs sticky bar', async () => {
    const page = await newSpecPage({
      components: [WppLegacyStickyBar],
      template: () => (h("wpp-legacy-sticky-bar-v4-7-0", { variant: "two-lines-with-tabs", barTitle: "Page Title", buttons: [
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
describe('wpp-legacy-sticky-bar back button name', () => {
  const backButton = (page) => page.root?.shadowRoot?.querySelector('wpp-action-button');
  it('names the icon-only back button, from locales when given', async () => {
    const page = await newSpecPage({
      components: [WppLegacyStickyBar],
      template: () => h("wpp-legacy-sticky-bar-v4-7-0", { barTitle: "Report", variant: "one-line", withBackButton: true }),
    });
    expect(backButton(page).ariaProps.label).toBe('Back');
    page.root.locales = { backButtonLabel: 'Back to reports' };
    await page.waitForChanges();
    expect(backButton(page).ariaProps.label).toBe('Back to reports');
  });
});
