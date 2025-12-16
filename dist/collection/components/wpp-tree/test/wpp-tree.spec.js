import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTree } from '../wpp-tree';
function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
// Helper to find item by id in tree data
function findItemById(tree, id) {
  for (const item of tree) {
    if (item.id === id)
      return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found)
        return found;
    }
  }
  return undefined;
}
const treeData = [
  {
    title: 'Cars',
    id: '0',
    open: true,
    disabled: true,
    children: [
      {
        title: 'Toyota',
        isNotSelectable: true,
        id: '0-0',
        iconsEnd: [
          { icon: `wpp-icon-info`, name: 'remove' },
          { icon: 'wpp-icon-cross', name: 'save' },
        ],
        children: [
          { title: 'Avalon', id: '0-0-0', disabled: true },
          {
            title: 'Prius',
            id: '0-0-1',
            disabled: true,
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
          },
          {
            title: 'Camry Variants',
            id: '0-0-2',
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
            children: [
              { title: 'Camry 3.5', id: '0-0-2-1' },
              { title: 'Camry Hybrid', id: '0-0-2-2' },
            ],
          },
        ],
      },
      {
        title: 'Skoda',
        id: '0-1',
        children: [
          {
            title: 'Kodiaq',
            id: '0-1-0',
            someProps: true,
            iconEnd: { icon: 'wpp-icon-sad', name: 'edit' },
          },
          { title: 'Superb', id: '0-1-1' },
          { title: 'Octavia', id: '0-1-2' },
        ],
      },
      {
        title: 'Volkswagen',
        id: '0-2',
        children: [
          { title: 'Passat', id: '0-2-0' },
          { title: 'Tiguan', id: '0-2-1' },
          { title: 'Touareg', id: '0-2-2' },
        ],
      },
    ],
  },
  { title: 'Motorcycle', id: '1' },
  {
    title: 'Planes',
    id: '2',
    disabled: true,
    children: [
      { title: 'B-52', id: '2-0' },
      { title: 'MIG-21', id: '2-1' },
    ],
  },
];
describe('wpp-tree', () => {
  it('should render tree component', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v3-4-0", { data: treeData }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render multiple tree component', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v3-4-0", { data: treeData, multiple: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render tree component with filtered data', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v3-4-0", { data: treeData, search: "cars" }),
    });
    expect(page.root).toMatchSnapshot();
  });
});
describe('wpp-tree lazy loading', () => {
  const baseData = [
    { title: 'Cars', id: '0', hasChildren: true, open: false },
    { title: 'Motorcycle', id: '1' },
    { title: 'Planes', id: '2', hasChildren: true, open: false },
  ];
  it('shows skeleton when opening lazy parent and replaces it with children on resolve', async () => {
    const d = deferred();
    const loadChildren = jest.fn().mockReturnValue(d.promise);
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
          skeleton: { height: 22, count: 1 },
        } })),
    });
    const openEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openEvent);
    await page.waitForChanges();
    // Check for skeleton items
    const host = page.root;
    const skeletonItems = host.shadowRoot.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBeGreaterThan(0);
    expect(loadChildren).toHaveBeenCalledTimes(1);
    // loadChildren now only receives the item (no cursor parameter)
    expect(loadChildren).toHaveBeenCalledWith(expect.objectContaining({ id: '0' }));
    // Resolve with children
    d.resolve({
      items: [
        { title: 'Toyota', id: '0-0', hasChildren: true },
        { title: 'Skoda', id: '0-1' },
      ],
    });
    await d.promise;
    await page.waitForChanges();
    // Skeleton should be gone
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    expect(cars?.loadingChildren).toBeFalsy();
    expect(cars?.children?.length).toBe(2);
  });
  it('does not call loader when opening a node that already has children', async () => {
    const data = [
      {
        title: 'Cars',
        id: '0',
        hasChildren: true,
        open: true,
        children: [{ title: 'Toyota', id: '0-0' }],
      },
    ];
    const loadChildren = jest.fn();
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: data, lazyConfig: {
          loadChildren,
          skeleton: { height: 22 },
        } })),
    });
    await page.waitForChanges();
    expect(loadChildren).not.toHaveBeenCalled();
    // Verify children are present in the tree
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    expect(cars?.children?.length).toBe(1);
  });
  it('collapses and sets hasChildren=false when loader returns empty array', async () => {
    const loadChildren = jest.fn().mockResolvedValue({ items: [] });
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
        } })),
    });
    const openEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openEvent);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    expect(cars?.open).toBe(false);
    expect(cars?.hasChildren).toBe(false);
  });
  it('loads all children at once (no pagination)', async () => {
    const loadChildren = jest.fn().mockResolvedValue({
      items: Array.from({ length: 100 }, (_, i) => ({ title: `Item ${i + 1}`, id: `0-${i}` })),
    });
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
          skeleton: { height: 32, count: 1 },
        } })),
    });
    const openEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openEvent);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    // All 100 items should be loaded at once
    expect(cars?.children?.length).toBe(100);
    expect(loadChildren).toHaveBeenCalledTimes(1);
  });
  it('emits wppChange only after loading completes', async () => {
    const d = deferred();
    const loadChildren = jest.fn().mockReturnValue(d.promise);
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
        } })),
    });
    page.root.addEventListener('wppChange', changeSpy);
    const openEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openEvent);
    await page.waitForChanges();
    // Should not have emitted yet (loading in progress)
    expect(changeSpy).not.toHaveBeenCalled();
    // Resolve
    d.resolve({
      items: [{ title: 'Toyota', id: '0-0' }],
    });
    await d.promise;
    await page.waitForChanges();
    // Now it should emit once
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: expect.objectContaining({
        reason: 'open',
        currentItem: expect.objectContaining({ id: '0', open: true }),
      }),
    }));
  });
  it('prevents duplicate loads for the same item', async () => {
    const loadChildren = jest.fn().mockImplementation(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({ items: [{ title: 'Toyota', id: '0-0' }] });
      }, 100);
    }));
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
        } })),
    });
    const openEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openEvent);
    page.rootInstance.handleOpenItem(openEvent);
    await page.waitForChanges();
    // Should only call once
    expect(loadChildren).toHaveBeenCalledTimes(1);
    await new Promise(resolve => setTimeout(resolve, 150));
    await page.waitForChanges();
  });
  it('handles load error gracefully', async () => {
    const loadChildren = jest.fn().mockRejectedValue(new Error('Network error'));
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
        } })),
    });
    const openEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openEvent);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    // Should revert to closed with hasChildren true (allow retry)
    expect(cars?.open).toBe(false);
    expect(cars?.hasChildren).toBe(true);
    expect(cars?.loadingChildren).toBe(false);
  });
  it('supports nested lazy loading', async () => {
    // Each node with hasChildren: true can trigger lazy loading when expanded.
    // Children are loaded dynamically at each level.
    const loadChildren = jest.fn().mockImplementation((item) => {
      if (item.id === '0') {
        return Promise.resolve({
          items: [
            { title: 'Toyota', id: '0-0', hasChildren: true },
            { title: 'Honda', id: '0-1' },
          ],
        });
      }
      if (item.id === '0-0') {
        return Promise.resolve({
          items: [
            { title: 'Avalon', id: '0-0-0' },
            { title: 'Camry', id: '0-0-1' },
          ],
        });
      }
      return Promise.resolve({ items: [] });
    });
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-4-0", { data: baseData, lazyConfig: {
          loadChildren,
        } })),
    });
    // Open Cars
    const openCarsEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { ...baseData[0], open: true },
    });
    page.rootInstance.handleOpenItem(openCarsEvent);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(loadChildren).toHaveBeenCalledTimes(1);
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    // Children should be loaded with hasChildren: true for nested lazy loading
    expect(cars?.children?.length).toBe(2);
    expect(cars?.children?.[0].title).toBe('Toyota');
    expect(cars?.children?.[0].hasChildren).toBe(true);
    // Opening Toyota SHOULD trigger another lazy load since it has hasChildren: true
    const openToyotaEvent = new CustomEvent('wppTreeItemOpenChange', {
      detail: { id: '0-0', title: 'Toyota', hasChildren: true, open: true },
    });
    page.rootInstance.handleOpenItem(openToyotaEvent);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    // loadChildren should be called again for Toyota
    expect(loadChildren).toHaveBeenCalledTimes(2);
    const toyota = findItemById(instance.currentTreeData, '0-0');
    expect(toyota?.children?.length).toBe(2);
    expect(toyota?.children?.[0].title).toBe('Avalon');
  });
});
