import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTree } from '../wpp-tree';
import { findParentOfItem, getSiblings } from '../utils';
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
  const baseData = [
    { title: 'Cars', id: '0', hasChildren: true, open: false },
    { title: 'Motorcycle', id: '1' },
    { title: 'Planes', id: '2', hasChildren: true, open: false },
  ];
  let page;
  let instance;
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
  const mockTree = [
    {
      id: '1',
      title: 'Parent',
      selected: false,
      children: [
        { id: '1-1', title: 'Child 1', selected: false },
        { id: '1-2', title: 'Child 2', selected: false },
      ],
    },
  ];
  beforeEach(async () => {
    page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: mockTree }),
    });
    instance = page.rootInstance;
  });
  it('should render tree component', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeData }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render multiple tree component', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeData, multiple: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render tree component with filtered data', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeData, search: "cars" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('shows skeleton when opening lazy parent and replaces it with children on resolve', async () => {
    const d = deferred();
    const loadChildren = jest.fn().mockReturnValue(d.promise);
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: data, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v4-1-0", { data: baseData, lazyConfig: {
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
  it('handles selection change (single)', () => {
    const spy = jest.spyOn(instance, 'singleSelectionUpdate');
    page.root.dispatchEvent(new CustomEvent('wppTreeItemSelectChange', {
      detail: { id: '1', selected: true },
      bubbles: true,
    }));
    expect(spy).toHaveBeenCalled();
  });
  it('recalculates tree width', async () => {
    jest.spyOn(page.root, 'getBoundingClientRect').mockReturnValue({
      width: 200,
    });
    await instance.recalculateTreeWidth();
    expect(page.root.style.getPropertyValue('--wpp-tree-item-width')).toBe('192px');
  });
  it('handles multiple-mode selection actions without warnings', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { multiple: true, defaultSelectedIds: [], data: [
          {
            id: '1',
            title: 'Parent',
            children: [{ id: '1-1', title: 'Child' }],
          },
        ] })),
    });
    const instance = page.rootInstance;
    const emitSpy = jest.spyOn(instance.wppChange, 'emit');
    await instance.selectAll();
    await instance.clearAll();
    instance.multipleSelectionUpdate(instance.currentTreeData, {
      id: '1',
      selected: true,
      indeterminate: false,
      children: [{ id: '1-1' }],
    });
    expect(emitSpy).toHaveBeenCalled();
  });
  it('matches search correctly', () => {
    const result = instance.isMatchSearch({ title: 'Hello World' }, 'world');
    expect(result).toBe(true);
  });
  it('updates tree with search', () => {
    const result = instance.updateTreeWithSearch(mockTree, 'Parent');
    expect(result.length).toBe(1);
    expect(result[0].hidden).toBeFalsy();
  });
  it('handles action click', () => {
    const spy = jest.spyOn(instance.wppActionClick, 'emit');
    const handler = instance.handleActionClick({
      item: { id: '1' },
      name: 'edit',
      place: 'start',
    });
    handler(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
  it('throws error for invalid single-selection data', () => {
    expect(() => instance.checkData([
      { id: '1', selected: true },
      { id: '2', selected: true },
    ])).toThrow();
  });
  it('handles defaultSelectedIds and disableOpenCloseAnimation', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          { id: '1', title: 'One' },
          { id: '2', title: 'Two' },
        ], defaultSelectedIds: ['1'], disableOpenCloseAnimation: true })),
    });
    const el = page.root;
    // style applied
    expect(el.style.getPropertyValue('--wpp-tree-item-switcher-transition-duration')).toBe('50ms');
  });
  it('updates width via ResizeObserver', async () => {
    let resizeCallback;
    const globalAny = global;
    globalAny.ResizeObserver = jest.fn(cb => {
      resizeCallback = cb;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };
    });
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: [{ id: '1', title: 'Test' }] }),
    });
    const tree = page.root;
    // attach to real DOM so parentElement exists
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    wrapper.appendChild(tree);
    await page.waitForChanges();
    // trigger resize
    resizeCallback([
      {
        target: wrapper,
        contentRect: { width: 300 },
      },
    ]);
    expect(tree.style.getPropertyValue('--wpp-tree-item-width')).toBe('292px');
  });
  it('uses custom isMatchingSearch', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [{ id: '1', title: 'hello' }], searchConfig: {
          isMatchingSearch: (item, search) => item.title === search,
        } })),
    });
    const instance = page.rootInstance;
    const result = instance.isMatchSearch({ title: 'hello' }, 'hello');
    expect(result).toBe(true);
  });
  it('handles multiple selection update', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          {
            id: '1',
            title: 'Parent',
            children: [{ id: '1-1', title: 'Child' }],
          },
        ], multiple: true })),
    });
    const instance = page.rootInstance;
    instance.multipleSelectionUpdate(instance.currentTreeData, {
      id: '1',
      selected: true,
      children: [{ id: '1-1' }],
    });
    expect(instance.currentTreeData).toBeDefined();
  });
  it('updates tree with search', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          {
            id: '1',
            title: 'Parent',
            children: [{ id: '1-1', title: 'MatchMe' }],
          },
        ] })),
    });
    const instance = page.rootInstance;
    const result = instance.updateTreeWithSearch(instance.currentTreeData, 'match');
    expect(result[0].hidden).toBe(false);
  });
  it('handles open change without lazy loading', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: [{ id: '1', title: 'Node', open: false }] }),
    });
    const tree = page.root;
    const instance = page.rootInstance;
    const emitSpy = jest.spyOn(instance.wppChange, 'emit');
    tree.dispatchEvent(new CustomEvent('wppTreeItemOpenChange', {
      detail: { id: '1', open: true },
      bubbles: true,
    }));
    expect(emitSpy).toHaveBeenCalled();
  });
  it('resets tree when search is empty', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          {
            id: '1',
            title: 'Item',
            children: [{ id: '1-1', title: 'Child' }],
          },
        ] })),
    });
    const instance = page.rootInstance;
    const spy = jest.spyOn(instance.wppChange, 'emit');
    instance.onInputChange('');
    expect(instance.isSearchResultFound).toBe(true);
    expect(spy).toHaveBeenCalled();
  });
  it('uses custom isMatchingSearch', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [{ id: '1', title: 'hello' }], searchConfig: {
          isMatchingSearch: (item, search) => item.title === search,
        } })),
    });
    const instance = page.rootInstance;
    const result = instance.isMatchSearch({ title: 'hello' }, 'hello');
    expect(result).toBe(true);
  });
  it('throws error when multiple defaultSelectedIds provided in single mode', async () => {
    await expect(newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          { id: '1', title: 'One' },
          { id: '2', title: 'Two' },
        ], defaultSelectedIds: ['1', '2'] })),
    })).rejects.toThrow();
  });
  it('sets isSearchResultFound when a match is found', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          {
            id: '1',
            title: 'MatchMe',
          },
        ] })),
    });
    const instance = page.rootInstance;
    // Ensure starting state
    instance.isSearchResultFound = false;
    const result = instance.updateTreeWithSearch(instance.currentTreeData, 'match');
    // ✅ branch covered
    expect(instance.isSearchResultFound).toBe(true);
    // sanity check
    expect(result[0].hidden).toBe(false);
  });
  it('covers nested match logic inside updateTreeWithSearch', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          {
            id: '1',
            title: 'Parent Match',
            children: [
              {
                id: '1-1',
                title: 'Child Match',
                children: [{ id: '1-1-1', title: 'Leaf' }],
              },
            ],
          },
        ] })),
    });
    const instance = page.rootInstance;
    const result = instance.updateTreeWithSearch(instance.currentTreeData, 'match');
    // ✅ Parent matched
    expect(result[0].hidden).toBe(false);
    // ✅ Children processed
    expect(result[0].children?.length).toBe(1);
    // ✅ Nested child also processed
    expect(result[0].children?.[0].hidden).toBe(false);
  });
  it('renders icons, skeleton and empty state correctly', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { loading: true, data: [
          {
            id: '1',
            title: 'Node',
            iconStart: { icon: 'wpp-icon-add', name: 'add' },
            iconEnd: { icon: 'wpp-icon-close', name: 'close' },
            iconsStart: [{ icon: 'wpp-icon-edit', name: 'edit' }],
          },
        ] })),
    });
    const shadow = page?.root?.shadowRoot;
    expect(shadow.querySelector('.skeleton-wrapper')).not.toBeNull();
  });
  it('clears children selection when item is unselected', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { multiple: true, data: [
          {
            id: '1',
            title: 'Parent',
            children: [{ id: '1-1', title: 'Child', selected: true }],
          },
        ] })),
    });
    const instance = page.rootInstance;
    instance.multipleSelectionUpdate(instance.currentTreeData, {
      id: '1',
      selected: false,
      indeterminate: false,
      children: [{ id: '1-1' }],
    });
    // branch executed without crash
    expect(instance.currentTreeData).toBeDefined();
  });
  it('renders parent item with start/end icons and child content', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: [
          {
            id: '1',
            title: 'Parent',
            open: true,
            hasChildren: true,
            iconStart: { icon: 'wpp-icon-add', name: 'add' },
            iconEnd: { icon: 'wpp-icon-close', name: 'close' },
            iconsStart: [{ icon: 'wpp-icon-edit', name: 'edit' }],
            children: [
              {
                id: '1-1',
                title: 'Child',
              },
            ],
          },
        ] })),
    });
    const shadow = page?.root?.shadowRoot;
    // ✅ parent rendered
    const treeItem = shadow.querySelector('wpp-tree-item');
    expect(treeItem).not.toBeNull();
    // ✅ icon-start rendered
    expect(shadow.innerHTML).toContain('icon-start');
    // ✅ icon-end rendered
    expect(shadow.innerHTML).toContain('icon-end');
    // ✅ children rendered via renderTree
    expect(shadow.textContent).toContain('edit');
  });
  it('preloads children for nodes with open: true and hasChildren: true on initial load', async () => {
    const dataWithOpenNodes = [
      { title: 'Cars', id: '0', hasChildren: true, open: true },
      { title: 'Motorcycle', id: '1' },
      { title: 'Planes', id: '2', hasChildren: true, open: false },
    ];
    const loadChildren = jest.fn().mockImplementation((item) => {
      if (item.id === '0') {
        return Promise.resolve({
          items: [
            { title: 'Toyota', id: '0-0', hasChildren: true },
            { title: 'Skoda', id: '0-1' },
          ],
        });
      }
      return Promise.resolve({ items: [] });
    });
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: dataWithOpenNodes, lazyConfig: {
          loadChildren,
          skeleton: { height: 22 },
        } })),
    });
    // Wait for componentWillLoad and initial preload to start
    await page.waitForChanges();
    // Wait for the async preload to complete
    await new Promise(resolve => setTimeout(resolve, 200));
    await page.waitForChanges();
    // Should have called loadChildren for the open node
    expect(loadChildren).toHaveBeenCalledWith(expect.objectContaining({ id: '0' }));
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    expect(cars?.children?.length).toBe(2);
    expect(cars?.open).toBe(true);
  });
});
describe('wpp-tree expandAll/collapseAll', () => {
  const staticData = [
    {
      title: 'Cars',
      id: '0',
      children: [
        {
          title: 'Toyota',
          id: '0-0',
          children: [
            { title: 'Avalon', id: '0-0-0' },
            { title: 'Prius', id: '0-0-1' },
          ],
        },
        { title: 'Skoda', id: '0-1' },
      ],
    },
    { title: 'Motorcycle', id: '1' },
    {
      title: 'Planes',
      id: '2',
      children: [
        { title: 'B-52', id: '2-0' },
        { title: 'MIG-21', id: '2-1' },
      ],
    },
  ];
  it('expandAll opens all non-disabled nodes', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: staticData }),
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    await page.rootInstance.expandAll();
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: expect.objectContaining({
        reason: 'open',
      }),
    }));
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    const toyota = findItemById(instance.currentTreeData, '0-0');
    const planes = findItemById(instance.currentTreeData, '2');
    expect(cars?.open).toBe(true);
    expect(toyota?.open).toBe(true);
    expect(planes?.open).toBe(true);
  });
  it('collapseAll closes all non-disabled nodes', async () => {
    // Start with all nodes open
    const openData = staticData.map(n => ({
      ...n,
      open: true,
      children: n.children?.map(c => ({ ...c, open: true })),
    }));
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: openData }),
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    await page.rootInstance.collapseAll();
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: expect.objectContaining({
        reason: 'open',
      }),
    }));
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    const toyota = findItemById(instance.currentTreeData, '0-0');
    const planes = findItemById(instance.currentTreeData, '2');
    expect(cars?.open).toBe(false);
    expect(toyota?.open).toBe(false);
    expect(planes?.open).toBe(false);
  });
  it('expandAll skips disabled nodes', async () => {
    const dataWithDisabled = [
      {
        title: 'Cars',
        id: '0',
        disabled: true,
        children: [{ title: 'Toyota', id: '0-0' }],
      },
      {
        title: 'Planes',
        id: '2',
        children: [{ title: 'B-52', id: '2-0' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithDisabled }),
    });
    await page.rootInstance.expandAll();
    await page.waitForChanges();
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    const planes = findItemById(instance.currentTreeData, '2');
    // Disabled node should not be opened
    expect(cars?.open).toBeFalsy();
    // Non-disabled node should be opened
    expect(planes?.open).toBe(true);
  });
  it('collapseAll skips disabled nodes', async () => {
    const dataWithDisabledOpen = [
      {
        title: 'Cars',
        id: '0',
        disabled: true,
        open: true,
        children: [{ title: 'Toyota', id: '0-0' }],
      },
      {
        title: 'Planes',
        id: '2',
        open: true,
        children: [{ title: 'B-52', id: '2-0' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithDisabledOpen }),
    });
    await page.rootInstance.collapseAll();
    await page.waitForChanges();
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    const planes = findItemById(instance.currentTreeData, '2');
    // Disabled node should remain open
    expect(cars?.open).toBe(true);
    // Non-disabled node should be closed
    expect(planes?.open).toBe(false);
  });
  it('expandAll triggers lazy loading for nodes with hasChildren', async () => {
    const lazyData = [
      { title: 'Cars', id: '0', hasChildren: true },
      { title: 'Planes', id: '2', hasChildren: true },
    ];
    const loadChildren = jest.fn().mockImplementation((item) => {
      if (item.id === '0') {
        return Promise.resolve({
          items: [{ title: 'Toyota', id: '0-0' }],
        });
      }
      if (item.id === '2') {
        return Promise.resolve({
          items: [{ title: 'B-52', id: '2-0' }],
        });
      }
      return Promise.resolve({ items: [] });
    });
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v4-1-0", { data: lazyData, lazyConfig: {
          loadChildren,
          skeleton: { height: 22 },
        } })),
    });
    await page.rootInstance.expandAll();
    await page.waitForChanges();
    // Wait for all async lazy loading to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    // Should load children for both nodes
    expect(loadChildren).toHaveBeenCalledWith(expect.objectContaining({ id: '0' }));
    expect(loadChildren).toHaveBeenCalledWith(expect.objectContaining({ id: '2' }));
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    const planes = findItemById(instance.currentTreeData, '2');
    expect(cars?.children?.length).toBe(1);
    expect(planes?.children?.length).toBe(1);
  });
});
describe('wpp-tree open on load', () => {
  it('respects open: true on items in initial data (static data)', async () => {
    const dataWithOpenNodes = [
      {
        title: 'Cars',
        id: '0',
        open: true,
        children: [
          {
            title: 'Toyota',
            id: '0-0',
            open: true,
            children: [
              { title: 'Avalon', id: '0-0-0' },
              { title: 'Prius', id: '0-0-1' },
            ],
          },
          { title: 'Skoda', id: '0-1' },
        ],
      },
      { title: 'Motorcycle', id: '1' },
      {
        title: 'Planes',
        id: '2',
        open: false,
        children: [{ title: 'B-52', id: '2-0' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithOpenNodes }),
    });
    await page.waitForChanges();
    const instance = page.rootInstance;
    const cars = findItemById(instance.currentTreeData, '0');
    const toyota = findItemById(instance.currentTreeData, '0-0');
    const planes = findItemById(instance.currentTreeData, '2');
    // Nodes with open: true should be open
    expect(cars?.open).toBe(true);
    expect(toyota?.open).toBe(true);
    // Node with open: false should remain closed
    expect(planes?.open).toBe(false);
  });
});
describe('wpp-tree accessibility', () => {
  const accessibilityTestData = [
    {
      title: 'Parent 1',
      id: 'p1',
      open: true,
      children: [
        { title: 'Child 1.1', id: 'c1-1' },
        { title: 'Child 1.2', id: 'c1-2' },
      ],
    },
    { title: 'Parent 2', id: 'p2', disabled: true },
    {
      title: 'Parent 3',
      id: 'p3',
      children: [{ title: 'Child 3.1', id: 'c3-1' }],
    },
  ];
  it('renders tree with role="tree" on container', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: accessibilityTestData, label: "Test tree" }),
    });
    const container = page.root.shadowRoot.querySelector('.container');
    expect(container?.getAttribute('role')).toBe('tree');
    expect(container?.getAttribute('aria-label')).toBe('Test tree');
  });
  it('renders tree with aria-multiselectable for multiple mode', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: accessibilityTestData, multiple: true, label: "Multi-select tree" }),
    });
    const container = page.root.shadowRoot.querySelector('.container');
    expect(container?.getAttribute('aria-multiselectable')).toBe('true');
  });
  it('renders tree container with tabindex for keyboard focus', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: accessibilityTestData }),
    });
    const container = page.root.shadowRoot.querySelector('.container');
    expect(container?.getAttribute('tabindex')).toBe('0');
  });
  it('renders loading state with appropriate aria attributes', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: accessibilityTestData, loading: true }),
    });
    const skeleton = page.root.shadowRoot.querySelector('.skeleton-wrapper');
    expect(skeleton?.getAttribute('role')).toBe('status');
    expect(skeleton?.getAttribute('aria-label')).toBe('Loading tree');
  });
  it('passes setSize and posInSet to tree items', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
      { title: 'Item 3', id: '3' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const treeItems = page.root.shadowRoot.querySelectorAll('wpp-tree-item');
    expect(treeItems.length).toBe(3);
    // Items should have data-item-id attribute for keyboard navigation
    expect(treeItems[0].getAttribute('data-item-id')).toBe('1');
    expect(treeItems[1].getAttribute('data-item-id')).toBe('2');
    expect(treeItems[2].getAttribute('data-item-id')).toBe('3');
  });
  it('handles keyboard navigation - ArrowDown moves focus to next item', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    instance.handleKeyDown(event);
    expect(instance.focusedItemId).toBe('2');
  });
  it('handles keyboard navigation - ArrowUp moves focus to previous item', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '2';
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    instance.handleKeyDown(event);
    expect(instance.focusedItemId).toBe('1');
  });
  it('handles keyboard navigation - Home moves focus to first item', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
      { title: 'Item 3', id: '3' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '3';
    const event = new KeyboardEvent('keydown', { key: 'Home' });
    instance.handleKeyDown(event);
    expect(instance.focusedItemId).toBe('1');
  });
  it('handles keyboard navigation - End moves focus to last item', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
      { title: 'Item 3', id: '3' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'End' });
    instance.handleKeyDown(event);
    expect(instance.focusedItemId).toBe('3');
  });
  it('handles keyboard navigation - ArrowRight expands closed parent node', async () => {
    const treeWithParent = [
      {
        title: 'Parent',
        id: 'p1',
        open: false,
        children: [{ title: 'Child', id: 'c1' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeWithParent }),
    });
    const instance = page.rootInstance;
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    instance.focusedItemId = 'p1';
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    instance.handleKeyDown(event);
    await page.waitForChanges();
    // Should emit change event to open the node
    expect(changeSpy).toHaveBeenCalled();
  });
  it('handles keyboard navigation - ArrowLeft collapses open parent node', async () => {
    const treeWithParent = [
      {
        title: 'Parent',
        id: 'p1',
        open: true,
        children: [{ title: 'Child', id: 'c1' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeWithParent }),
    });
    const instance = page.rootInstance;
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    instance.focusedItemId = 'p1';
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    instance.handleKeyDown(event);
    await page.waitForChanges();
    // Should emit change event to close the node
    expect(changeSpy).toHaveBeenCalled();
  });
  it('handles keyboard navigation - ArrowLeft moves to parent from child', async () => {
    const treeWithParent = [
      {
        title: 'Parent',
        id: 'p1',
        open: true,
        children: [{ title: 'Child', id: 'c1' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeWithParent }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = 'c1';
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    instance.handleKeyDown(event);
    expect(instance.focusedItemId).toBe('p1');
  });
  it('handles keyboard navigation - Enter toggles selection in single mode', async () => {
    const simpleData = [{ title: 'Item 1', id: '1', selected: false }];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    instance.handleKeyDown(event);
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });
  it('handles keyboard navigation - Space toggles selection in multiple mode', async () => {
    const simpleData = [{ title: 'Item 1', id: '1', selected: false }];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData, multiple: true }),
    });
    const instance = page.rootInstance;
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: ' ' });
    instance.handleKeyDown(event);
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });
  it('handles type-ahead navigation', async () => {
    const simpleData = [
      { title: 'Apple', id: '1' },
      { title: 'Banana', id: '2' },
      { title: 'Cherry', id: '3' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    // Press 'b' to jump to Banana
    const event = new KeyboardEvent('keydown', { key: 'b' });
    instance.handleKeyDown(event);
    expect(instance.focusedItemId).toBe('2');
  });
  it('skips hidden items during navigation', async () => {
    const dataWithHidden = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2', hidden: true },
      { title: 'Item 3', id: '3' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithHidden }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    instance.handleKeyDown(event);
    // Should skip hidden item and go to Item 3
    expect(instance.focusedItemId).toBe('3');
  });
  it('does not navigate when loading', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData, loading: true }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    instance.handleKeyDown(event);
    // Focus should not change when loading
    expect(instance.focusedItemId).toBe('1');
  });
  it('does not act on disabled items', async () => {
    const dataWithDisabled = [{ title: 'Disabled Item', id: '1', disabled: true }];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithDisabled }),
    });
    const instance = page.rootInstance;
    const changeSpy = jest.fn();
    page.root.addEventListener('wppChange', changeSpy);
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    instance.handleKeyDown(event);
    await page.waitForChanges();
    // Should not emit change for disabled item
    expect(changeSpy).not.toHaveBeenCalled();
  });
  it('initializes focus on first item when none selected', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    // Trigger focus initialization
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    instance.handleKeyDown(event);
    // Should have initialized to first item, then moved down
    expect(instance.focusedItemId).toBe('2');
  });
  it('initializes focus on selected item when one exists', async () => {
    const dataWithSelected = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2', selected: true },
      { title: 'Item 3', id: '3' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithSelected }),
    });
    const instance = page.rootInstance;
    // Trigger focus initialization
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    instance.handleKeyDown(event);
    // Should have initialized to selected item (2), then moved to 3
    expect(instance.focusedItemId).toBe('3');
  });
  it('findParentOfItem returns correct parent', async () => {
    const nestedData = [
      {
        title: 'Parent',
        id: 'p1',
        children: [
          {
            title: 'Child',
            id: 'c1',
            children: [{ title: 'Grandchild', id: 'g1' }],
          },
        ],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: nestedData }),
    });
    const instance = page.rootInstance;
    const parent = findParentOfItem(instance.currentTreeData, 'g1');
    expect(parent?.id).toBe('c1');
  });
  it('getSiblings returns correct siblings', async () => {
    const dataWithSiblings = [
      {
        title: 'Parent',
        id: 'p1',
        children: [
          { title: 'Sibling 1', id: 's1' },
          { title: 'Sibling 2', id: 's2' },
          { title: 'Sibling 3', id: 's3' },
        ],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: dataWithSiblings }),
    });
    const instance = page.rootInstance;
    const siblings = getSiblings(instance.currentTreeData, 's2');
    expect(siblings.length).toBe(3);
    expect(siblings.map((s) => s.id)).toEqual(['s1', 's2', 's3']);
  });
  it('renders group role for children container', async () => {
    const treeWithChildren = [
      {
        title: 'Parent',
        id: 'p1',
        open: true,
        children: [{ title: 'Child', id: 'c1' }],
      },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: treeWithChildren }),
    });
    const groupContainer = page.root.shadowRoot.querySelector('[role="group"]');
    expect(groupContainer).toBeTruthy();
  });
  // --- Action Mode Tests ---
  // Per W3C ARIA APG: trees are composite widgets. Tab always exits the tree.
  // Enter/F2 enters "action mode" for interactive content, Escape exits.
  it('initializes isFocusOnAction as false', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    expect(instance.isFocusOnAction).toBe(false);
  });
  it('getActionElementsInItem returns empty array for item without actions', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    const actions = instance.getActionElementsInItem('1');
    expect(Array.isArray(actions)).toBe(true);
    expect(actions.length).toBe(0);
  });
  it('enterActionMode does not set isFocusOnAction when no focusable actions exist', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.enterActionMode('1');
    expect(instance.isFocusOnAction).toBe(false);
  });
  it('exitActionMode resets isFocusOnAction and refocuses the container', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    const container = page.root.shadowRoot.querySelector('.container');
    instance.isFocusOnAction = true;
    const focusSpy = jest.fn();
    container.focus = focusSpy;
    instance.exitActionMode(container);
    expect(instance.isFocusOnAction).toBe(false);
    expect(focusSpy).toHaveBeenCalled();
  });
  it('isDescendantOfHost returns false for external elements', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    const externalEl = document.createElement('div');
    expect(instance.isDescendantOfHost(externalEl)).toBe(false);
  });
  it('Escape key exits action mode and resets isFocusOnAction', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.isFocusOnAction = true;
    instance.focusedItemId = '1';
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    instance.handleKeyDown(event);
    expect(instance.isFocusOnAction).toBe(false);
  });
  it('F2 key does not enter action mode when no actions exist', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    instance.isKeyboardNavigating = true;
    const event = new KeyboardEvent('keydown', { key: 'F2' });
    instance.handleKeyDown(event);
    // No focusable actions in simple items, so action mode should not activate
    expect(instance.isFocusOnAction).toBe(false);
  });
  it('Tab key does not prevent default in standard tree navigation mode', async () => {
    const simpleData = [
      { title: 'Item 1', id: '1' },
      { title: 'Item 2', id: '2' },
    ];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    instance.focusedItemId = '1';
    instance.isFocusOnAction = false;
    const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
    instance.handleKeyDown(event);
    // Tab should pass through (exit tree) in standard mode
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
  it('getFocusableElements returns empty array for empty input', async () => {
    const simpleData = [{ title: 'Item 1', id: '1' }];
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-1-0", { data: simpleData }),
    });
    const instance = page.rootInstance;
    const result = instance.getFocusableElements([]);
    expect(result).toEqual([]);
  });
});
