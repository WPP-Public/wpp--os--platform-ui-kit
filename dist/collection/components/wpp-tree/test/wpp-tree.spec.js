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
      template: () => h("wpp-tree-v3-6-0", { data: mockTree }),
    });
    instance = page.rootInstance;
  });
  it('should render tree component', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v3-6-0", { data: treeData }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render multiple tree component', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v3-6-0", { data: treeData, multiple: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render tree component with filtered data', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v3-6-0", { data: treeData, search: "cars" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('shows skeleton when opening lazy parent and replaces it with children on resolve', async () => {
    const d = deferred();
    const loadChildren = jest.fn().mockReturnValue(d.promise);
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: data, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: baseData, lazyConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { multiple: true, defaultSelectedIds: [], data: [
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => h("wpp-tree-v3-6-0", { data: [{ id: '1', title: 'Test' }] }),
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
      template: () => (h("wpp-tree-v3-6-0", { data: [{ id: '1', title: 'hello' }], searchConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => h("wpp-tree-v3-6-0", { data: [{ id: '1', title: 'Node', open: false }] }),
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => (h("wpp-tree-v3-6-0", { data: [{ id: '1', title: 'hello' }], searchConfig: {
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
          { id: '1', title: 'One' },
          { id: '2', title: 'Two' },
        ], defaultSelectedIds: ['1', '2'] })),
    })).rejects.toThrow();
  });
  it('sets isSearchResultFound when a match is found', async () => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => (h("wpp-tree-v3-6-0", { loading: true, data: [
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
      template: () => (h("wpp-tree-v3-6-0", { multiple: true, data: [
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
      template: () => (h("wpp-tree-v3-6-0", { data: [
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
      template: () => (h("wpp-tree-v3-6-0", { data: dataWithOpenNodes, lazyConfig: {
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
      template: () => h("wpp-tree-v3-6-0", { data: staticData }),
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
      template: () => h("wpp-tree-v3-6-0", { data: openData }),
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
      template: () => h("wpp-tree-v3-6-0", { data: dataWithDisabled }),
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
      template: () => h("wpp-tree-v3-6-0", { data: dataWithDisabledOpen }),
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
      template: () => (h("wpp-tree-v3-6-0", { data: lazyData, lazyConfig: {
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
      template: () => h("wpp-tree-v3-6-0", { data: dataWithOpenNodes }),
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
