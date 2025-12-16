import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTreeItem } from '../wpp-tree-item';
describe('wpp-tree-item', () => {
  let debugSpy;
  beforeEach(() => {
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => { });
  });
  afterEach(() => {
    debugSpy.mockRestore();
  });
  const baseItem = { id: 'x', title: 'Node X' };
  it('renders switcher when item.hasChildren is true (even without children)', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-4-0", { item: { ...baseItem, hasChildren: true, open: false }, level: 1, multiple: false, search: "", highlightOptions: {}, disableOpenCloseAnimation: true })),
    });
    const switcher = page.root.shadowRoot.querySelector('.switcher');
    expect(switcher).toBeTruthy();
  });
  it('emits wppTreeItemOpenChange with toggled open when switcher is triggered', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-4-0", { item: { ...baseItem, hasChildren: true, open: false }, level: 1, multiple: false, search: "", highlightOptions: {}, disableOpenCloseAnimation: true })),
    });
    const spy = jest.fn();
    page.root.addEventListener('wppTreeItemOpenChange', (e) => spy(e.detail));
    page.rootInstance.handleSwitcherClick();
    await page.waitForChanges();
    jest.runOnlyPendingTimers();
    await page.waitForChanges();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 'x', open: true }));
  });
  it('sets aria-busy and disables action button when loadingChildren is true', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-4-0", { item: { ...baseItem, hasChildren: true, open: true, loadingChildren: true }, level: 1, multiple: false, search: "", highlightOptions: {}, disableOpenCloseAnimation: true })),
    });
    expect(page.root.getAttribute('aria-busy')).toBe('true');
    const btn = page.root.shadowRoot.querySelector('wpp-action-button');
    expect(btn?.hasAttribute('disabled')).toBe(true);
  });
});
