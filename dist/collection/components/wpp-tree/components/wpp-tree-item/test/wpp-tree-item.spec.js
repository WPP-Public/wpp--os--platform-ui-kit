import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTreeItem } from '../wpp-tree-item';
describe('wpp-tree-item', () => {
  let debugSpy;
  let timeoutSpy;
  beforeAll(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 0;
    });
  });
  afterAll(() => {
    timeoutSpy.mockRestore();
  });
  beforeEach(() => {
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => { });
  });
  afterEach(() => {
    debugSpy.mockRestore();
  });
  const baseItem = {
    id: 'x',
    title: 'Node',
    open: false,
    hidden: false,
    selected: false,
    disabled: false,
    loadingChildren: false,
    children: [],
  };
  it('renders switcher when item.hasChildren is true (even without children)', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: { ...baseItem, hasChildren: true, open: false }, level: 1, multiple: false, search: "", highlightOptions: {}, disableOpenCloseAnimation: true })),
    });
    const switcher = page.root.shadowRoot.querySelector('.switcher');
    expect(switcher).toBeTruthy();
  });
  it('emits wppTreeItemOpenChange with toggled open when switcher is triggered', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: { ...baseItem, hasChildren: true, open: false }, level: 1, multiple: false, search: "", highlightOptions: {}, disableOpenCloseAnimation: true })),
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
      template: () => (h("wpp-tree-item-v3-6-0", { item: { ...baseItem, hasChildren: true, open: true, loadingChildren: true }, level: 1, multiple: false, search: "", highlightOptions: {}, disableOpenCloseAnimation: true })),
    });
    expect(page.root.getAttribute('aria-busy')).toBe('true');
    const btn = page.root.shadowRoot.querySelector('wpp-action-button');
    expect(btn?.hasAttribute('disabled')).toBe(true);
  });
  it('onItemChange – open/loading/children/hidden branches', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem, disableSearchHighlight: true }),
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'releaseAncestorHeights');
    jest.spyOn(instance, 'updateParentHeight');
    instance.onItemChange({ ...baseItem, open: true, loadingChildren: true, hidden: true }, { ...baseItem, open: false });
    expect(instance.shouldRecalculateItemHeight).toBe(true);
    expect(instance.releaseAncestorHeights).toHaveBeenCalled();
    expect(page?.root?.style.height).toBe('auto');
    expect(instance.updateParentHeight).toHaveBeenCalled();
  });
  it('componentDidUpdate – recalculates height', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem, disableSearchHighlight: true }),
    });
    const instance = page.rootInstance;
    instance.shouldRecalculateItemHeight = true;
    instance.item = { ...baseItem, open: true, loadingChildren: true };
    instance.componentDidUpdate();
    expect(page?.root?.style.height).toBe('auto');
  });
  it('addHeightToHost – sets px height', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem, disableSearchHighlight: true }),
    });
    Object.defineProperty(page.root, 'scrollHeight', { value: 150 });
    page.rootInstance.addHeightToHost();
    expect(page?.root?.style.height).toBe('150px');
  });
  it('updateParentHeight – resets px height', () => {
    const parent = document.createElement('div');
    parent.slot = 'content';
    parent.style.height = '40px';
    const instance = new WppTreeItem();
    instance.updateParentHeight(parent);
    expect(parent.style.height).toBe('auto');
  });
  it('handleSwitcherClick – emits open change', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem, disableSearchHighlight: true }),
    });
    const instance = page.rootInstance;
    instance.wppTreeItemOpenChange = { emit: jest.fn() };
    instance.handleSwitcherClick();
    expect(instance.wppTreeItemOpenChange.emit).toHaveBeenCalled();
  });
  it('handleItemClick – toggles selection', () => {
    const instance = new WppTreeItem();
    instance.item = baseItem;
    instance.multiple = false;
    instance.wppTreeItemSelectChange = { emit: jest.fn() };
    jest.spyOn(instance, 'isSwitcherTarget').mockReturnValue(false);
    const event = { composedPath: () => [] };
    instance.handleItemClick(event);
    expect(instance.wppTreeItemSelectChange.emit).toHaveBeenCalled();
  });
  it('handleTransitionEnd – resets height and flag', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem, disableSearchHighlight: true }),
    });
    const instance = page.rootInstance;
    page.root.style.height = '100px';
    instance.handleTransitionEnd();
    expect(page?.root?.style.height).toBe('auto');
    expect(instance.isCollapseTransitionEnd).toBe(true);
  });
  it('onSwitcherClick – stops propagation, sets timestamp, calls handleSwitcherClick', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem }),
    });
    const instance = page.rootInstance;
    const stopPropagation = jest.fn();
    jest.spyOn(instance, 'handleSwitcherClick');
    const event = { stopPropagation };
    instance.onSwitcherClick(event);
    expect(stopPropagation).toHaveBeenCalled();
    expect(instance.lastSwitcherClickTs).toBeGreaterThan(0);
    expect(instance.handleSwitcherClick).toHaveBeenCalled();
  });
  it('isSwitcherTarget – returns true when switcher in composedPath', () => {
    const instance = new WppTreeItem();
    const switcher = document.createElement('div');
    switcher.classList.add('switcher');
    const event = {
      composedPath: () => [switcher],
    };
    expect(instance.isSwitcherTarget(event)).toBe(true);
  });
  it('isSwitcherTarget – skips invalid elements and returns false', () => {
    const instance = new WppTreeItem();
    const event = {
      composedPath: () => [null, {}],
    };
    expect(instance.isSwitcherTarget(event)).toBe(false);
  });
  it('updateParentHeight – returns early for invalid element', () => {
    const instance = new WppTreeItem();
    const el = document.createElement('div');
    instance.updateParentHeight(el);
    expect(el.style.height).toBe('');
  });
  it('updateParentHeight – converts px height to auto', () => {
    const instance = new WppTreeItem();
    const el = document.createElement('div');
    el.slot = 'content';
    el.style.height = '50px';
    instance.updateParentHeight(el);
    expect(el.style.height).toBe('auto');
  });
  it('updateSlotData – sets icon slot flags correctly', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: baseItem }, h("span", { slot: "icon-start" }), h("span", { slot: "icon-end" }), h("div", { class: "wpp-menu-context" }))),
    });
    const instance = page.rootInstance;
    instance.updateSlotData();
    expect(instance.hasIconStartSlot).toBe(true);
    expect(instance.hasIconEndSlot).toBe(true);
    expect(instance.hasIconEndContextMenu).toBe(true);
  });
  it('handleMouseDown – does nothing when item is disabled', () => {
    const instance = new WppTreeItem();
    instance.item = { ...baseItem, disabled: true };
    instance.handleMouseDown();
    expect(instance.isMouseOnIconEnd).toBe(false);
  });
  it('handleMouseDown – sets isMouseOnIconEnd when enabled', () => {
    const instance = new WppTreeItem();
    instance.item = { ...baseItem, disabled: false };
    instance.handleMouseDown();
    expect(instance.isMouseOnIconEnd).toBe(true);
  });
  it('handleMouseLeave – resets isMouseOnIconEnd', () => {
    const instance = new WppTreeItem();
    instance.isMouseOnIconEnd = true;
    instance.handleMouseLeave();
    expect(instance.isMouseOnIconEnd).toBe(false);
  });
  it('handleCheckboxClick – indeterminate + disabled children', () => {
    const instance = new WppTreeItem();
    instance.item = {
      ...baseItem,
      indeterminate: true,
      children: [{ disabled: true }],
    };
    instance.wppTreeItemSelectChange = { emit: jest.fn() };
    instance.handleCheckboxClick();
    expect(instance.wppTreeItemSelectChange.emit).toHaveBeenCalledWith(expect.objectContaining({ selected: false, indeterminate: false }));
  });
  it('handleCheckboxClick – not selected + disabled children', () => {
    const instance = new WppTreeItem();
    instance.item = {
      ...baseItem,
      selected: false,
      indeterminate: false,
      children: [{ disabled: true }],
    };
    instance.wppTreeItemSelectChange = { emit: jest.fn() };
    instance.handleCheckboxClick();
    expect(instance.wppTreeItemSelectChange.emit).toHaveBeenCalledWith(expect.objectContaining({ selected: false, indeterminate: true }));
  });
  it('handleCheckboxClick – normal toggle path', () => {
    const instance = new WppTreeItem();
    instance.item = {
      ...baseItem,
      selected: false,
      indeterminate: false,
      children: [],
    };
    instance.wppTreeItemSelectChange = { emit: jest.fn() };
    instance.handleCheckboxClick();
    expect(instance.wppTreeItemSelectChange.emit).toHaveBeenCalledWith(expect.objectContaining({ selected: true, indeterminate: false }));
  });
  it('componentDidUpdate – sets fixed height when item is closed', async () => {
    // Mock requestAnimationFrame to execute callback synchronously
    const originalRAF = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => {
      cb(0);
      return 0;
    };
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem }),
    });
    const instance = page.rootInstance;
    instance.shouldRecalculateItemHeight = true;
    instance.disableOpenCloseAnimation = false;
    instance.item = { ...baseItem, open: false };
    jest.spyOn(instance, 'releaseAncestorHeights');
    instance.componentDidUpdate();
    expect(instance.isCollapseTransitionEnd).toBe(false);
    expect(page?.root?.style.height).toBe(instance.getItemHeight());
    global.requestAnimationFrame = originalRAF;
  });
  it('componentDidUpdate – schedules addHeightToHost when open and not loading', async () => {
    // Mock requestAnimationFrame to execute callback synchronously
    const originalRAF = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => {
      cb(0);
      return 0;
    };
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => h("wpp-tree-item-v3-6-0", { item: baseItem }),
    });
    const instance = page.rootInstance;
    instance.shouldRecalculateItemHeight = true;
    instance.disableOpenCloseAnimation = false;
    instance.item = { ...baseItem, open: true, loadingChildren: false };
    const spy = jest.spyOn(instance, 'addHeightToHost');
    instance.componentDidUpdate();
    expect(spy).toHaveBeenCalled();
    expect(instance.shouldRecalculateItemHeight).toBe(false);
    global.requestAnimationFrame = originalRAF;
  });
  it('renderEndContent – renders text', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: baseItem, endContent: {
          contentType: 'text',
          props: { text: 'Hello' },
        } })),
    });
    expect(page?.root?.shadowRoot.querySelector('[part="tree-item-end-text"]')).not.toBeNull();
  });
  it('renderEndContent – renders tag with icon', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: baseItem, endContent: {
          contentType: 'tag',
          props: { label: 'Tag', icon: 'wpp-icon-check' },
        } })),
    });
    expect(page?.root?.shadowRoot.querySelector('[part="tree-item-end-tag"]')).not.toBeNull();
    expect(page?.root?.shadowRoot.querySelector('[slot="icon-start"]')).not.toBeNull();
  });
  it('renderEndContent – renders avatar', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: baseItem, endContent: {
          contentType: 'avatar',
          props: { src: 'x.png' },
        } })),
    });
    expect(page?.root?.shadowRoot.querySelector('[part="tree-item-end-avatar"]')).not.toBeNull();
  });
  it('renderEndContent – renders avatarGroup', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: baseItem, endContent: {
          contentType: 'avatarGroup',
          props: {},
        } })),
    });
    expect(page?.root?.shadowRoot.querySelector('[part="tree-item-end-avatar-group"]')).not.toBeNull();
  });
  it('renderEndContent – returns null for unknown contentType', async () => {
    const page = await newSpecPage({
      components: [WppTreeItem],
      template: () => (h("wpp-tree-item-v3-6-0", { item: baseItem, endContent: {
          contentType: 'unknown',
          props: {},
        } })),
    });
    expect(page?.root?.shadowRoot.querySelector('[part^="tree-item-end"]')).toBeNull();
  });
});
