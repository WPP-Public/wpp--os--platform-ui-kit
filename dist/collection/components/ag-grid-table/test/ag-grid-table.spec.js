import { setupGridKeyboardNavigation } from '../utils/grid-keyboard-navigation';
import { suppressInteractiveCellKeyboardEvent, suppressInteractiveCellMouseEvent, } from '../utils/suppress-interactive-cell-event';
describe('AG Grid keyboard navigation', () => {
  let container;
  let firstCell;
  let secondCell;
  let headerCell;
  let cleanup;
  let notifyMutation;
  let htmlElementDescriptor;
  let nodeDescriptor;
  const flushMutations = () => new Promise(resolve => setTimeout(resolve, 0));
  const focusCell = (cell) => cell.dispatchEvent(new Event('focusin', { bubbles: true }));
  const createApi = (pagination = false) => ({
    ensureIndexVisible: jest.fn(),
    ensureColumnVisible: jest.fn(),
    setFocusedCell: jest.fn(),
    setFocusedHeader: jest.fn(),
    getAllDisplayedColumns: jest.fn().mockReturnValue([{ getColId: () => 'name' }, { getColId: () => 'selected' }]),
    getDisplayedRowCount: jest.fn().mockReturnValue(35),
    getGridOption: jest.fn().mockReturnValue(pagination),
    paginationGetCurrentPage: jest.fn().mockReturnValue(2),
    paginationGetPageSize: jest.fn().mockReturnValue(10),
  });
  beforeEach(() => {
    // Stencil's mock DOM does not deliver MutationObserver notifications.
    jest.spyOn(global, 'MutationObserver').mockImplementation(callback => {
      const observer = { observe: jest.fn(), disconnect: jest.fn(), takeRecords: () => [] };
      notifyMutation = () => callback([], observer);
      return observer;
    });
    container = document.createElement('div');
    htmlElementDescriptor = Object.getOwnPropertyDescriptor(global, 'HTMLElement');
    nodeDescriptor = Object.getOwnPropertyDescriptor(global, 'Node');
    Object.defineProperty(global, 'HTMLElement', { configurable: true, value: container.constructor });
    Object.defineProperty(global, 'Node', { configurable: true, value: container.constructor });
    container.innerHTML = `
      <div class="ag-tab-guard" tabindex="0"></div>
      <div role="grid">
        <div class="ag-header-cell" col-id="name" tabindex="-1"><button>Sort</button></div>
        <div class="ag-viewport"></div>
        <div class="ag-body-horizontal-scroll-viewport"></div>
        <div class="ag-row" row-index="0" tabindex="0">
          <div class="ag-cell" col-id="name" tabindex="-1"><input aria-label="Name"></div>
          <div class="ag-cell" col-id="selected" tabindex="-1"><input type="checkbox"></div>
        </div>
      </div>
      <div class="ag-tab-guard" tabindex="0"></div>
    `;
    document.body.appendChild(container);
    firstCell = container.querySelectorAll('.ag-cell')[0];
    secondCell = container.querySelectorAll('.ag-cell')[1];
    headerCell = container.querySelector('.ag-header-cell');
    cleanup = setupGridKeyboardNavigation(container, () => undefined);
  });
  afterEach(() => {
    cleanup();
    container.remove();
    jest.restoreAllMocks();
    Object.defineProperty(global, 'HTMLElement', htmlElementDescriptor);
    Object.defineProperty(global, 'Node', nodeDescriptor);
  });
  it('creates one stop on the first cell, excluding headers, controls, rows and scroll viewports', () => {
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(firstCell.tabIndex).toBe(0);
    container.querySelectorAll('.ag-tab-guard, .ag-row, input, button, .ag-viewport').forEach(element => {
      expect(element.tabIndex).toBe(-1);
    });
    container.querySelectorAll('.ag-viewport, .ag-body-horizontal-scroll-viewport').forEach(viewport => {
      expect(viewport.hasAttribute('tabindex')).toBe(false);
    });
  });
  it.each([
    'ag-viewport',
    'ag-body-viewport',
    'ag-body-horizontal-scroll-viewport',
    'ag-body-vertical-scroll-viewport',
  ])('preserves presentation semantics for %s after tabindex mutations', className => {
    const viewport = document.createElement('div');
    viewport.className = className;
    viewport.setAttribute('role', 'presentation');
    viewport.tabIndex = 0;
    container.querySelector('[role="grid"]').appendChild(viewport);
    notifyMutation();
    expect(viewport.hasAttribute('tabindex')).toBe(false);
    expect(viewport.getAttribute('role')).toBe('presentation');
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    viewport.tabIndex = -1;
    notifyMutation();
    expect(viewport.hasAttribute('tabindex')).toBe(false);
    expect(firstCell.tabIndex).toBe(0);
  });
  it('roves to the focused cell without adding its checkbox to the tab sequence', () => {
    focusCell(secondCell);
    expect(firstCell.tabIndex).toBe(-1);
    expect(secondCell.tabIndex).toBe(0);
    focusCell(secondCell.querySelector('input'));
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(secondCell.querySelector('input').tabIndex).toBe(-1);
  });
  it('redirects browser-generated scroll viewport focus to the last cell without adding tabindex', () => {
    focusCell(secondCell);
    const viewport = container.querySelector('.ag-body-horizontal-scroll-viewport');
    const focus = jest.spyOn(secondCell, 'focus');
    focusCell(viewport);
    expect(focus).toHaveBeenCalledTimes(1);
    expect(viewport.hasAttribute('tabindex')).toBe(false);
    expect(secondCell.tabIndex).toBe(0);
  });
  describe('Scrollable center viewport', () => {
    let viewport;
    beforeEach(() => {
      viewport = document.createElement('div');
      viewport.className = 'ag-viewport ag-center-cols-viewport';
      viewport.setAttribute('role', 'rowgroup');
      const row = firstCell.closest('.ag-row').cloneNode(false);
      row.appendChild(secondCell);
      viewport.appendChild(row);
      container.querySelector('[role="grid"]').appendChild(viewport);
      notifyMutation();
    });
    it('keeps one tabbable cell inside the scrollable region while retaining the first pinned cell on entry', () => {
      expect(secondCell.tabIndex).toBe(0);
      expect(firstCell.tabIndex).toBe(-1);
      expect(viewport.tabIndex).toBe(-1);
      expect(viewport.hasAttribute('tabindex')).toBe(false);
      expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      const focus = jest.spyOn(firstCell, 'focus');
      focusCell(secondCell);
      expect(focus).toHaveBeenCalledTimes(1);
    });
    it.each(['pinned cell', 'header'])('restores the last focused %s through the center tab stop', target => {
      const cell = target === 'header' ? headerCell : firstCell;
      focusCell(cell);
      const focus = jest.spyOn(cell, 'focus');
      focusCell(secondCell);
      expect(focus).toHaveBeenCalledTimes(1);
      expect(secondCell.tabIndex).toBe(0);
      expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    });
    it('removes tabindex mutations without changing rowgroup semantics or cell tab stops', () => {
      for (const tabIndex of [0, -1]) {
        viewport.tabIndex = tabIndex;
        notifyMutation();
        expect(viewport.hasAttribute('tabindex')).toBe(false);
        expect(viewport.getAttribute('role')).toBe('rowgroup');
        expect(secondCell.tabIndex).toBe(0);
        expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      }
    });
    it('lets a mouse click focus the center cell instead of redirecting to the pinned cell', () => {
      const focus = jest.spyOn(firstCell, 'focus');
      secondCell.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      focusCell(secondCell);
      expect(focus).not.toHaveBeenCalled();
      expect(secondCell.tabIndex).toBe(0);
    });
    it('does not redirect arrow navigation from a pinned cell into the center', () => {
      const focus = jest.spyOn(firstCell, 'focus');
      const event = new Event('focusin', { bubbles: true });
      Object.defineProperty(event, 'relatedTarget', { value: firstCell });
      secondCell.dispatchEvent(event);
      expect(focus).not.toHaveBeenCalled();
      expect(secondCell.tabIndex).toBe(0);
    });
    it('falls back to the remaining cell when the center cell is removed', () => {
      secondCell.remove();
      notifyMutation();
      expect(firstCell.tabIndex).toBe(0);
      expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    });
  });
  it.each([false, true])('lets native Tab navigation leave the grid (shift=%s)', async (shiftKey) => {
    focusCell(secondCell);
    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
    secondCell.querySelector('input').dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(event.cancelBubble).toBe(true);
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(0);
    await flushMutations();
    expect(secondCell.tabIndex).toBe(0);
  });
  it('suppresses automatic scroll-region tab stops only during native Tab exit', async () => {
    const viewport = container.querySelector('.ag-viewport');
    viewport.setAttribute('role', 'presentation');
    notifyMutation();
    expect(viewport.hasAttribute('tabindex')).toBe(false);
    headerCell.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(viewport.getAttribute('tabindex')).toBe('-1');
    await flushMutations();
    expect(viewport.hasAttribute('tabindex')).toBe(false);
    expect(firstCell.tabIndex).toBe(0);
  });
  it('does not intercept AG Grid navigation keys', () => {
    const gridKeyHandler = jest.fn();
    firstCell.addEventListener('keydown', gridKeyHandler);
    for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown']) {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      firstCell.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    }
    expect(gridKeyHandler).toHaveBeenCalledTimes(6);
  });
  it.each([
    ['Home', false, false, 0, 0],
    ['End', false, false, 0, 1],
    ['End', true, false, 34, 1],
    ['End', true, true, 29, 1],
  ])('navigates %s (ctrl=%s, pagination=%s) to row %s', (key, ctrlKey, pagination, row, column) => {
    cleanup();
    const api = createApi(pagination);
    cleanup = setupGridKeyboardNavigation(container, () => api);
    const event = new KeyboardEvent('keydown', { key, ctrlKey, bubbles: true, cancelable: true });
    firstCell.dispatchEvent(event);
    expect(api.setFocusedCell).toHaveBeenCalledWith(row, api.getAllDisplayedColumns()[column]);
    expect(event.defaultPrevented).toBe(true);
  });
  it('moves Ctrl+Home from a body cell to the first column header', () => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    const event = new KeyboardEvent('keydown', { key: 'Home', ctrlKey: true, bubbles: true, cancelable: true });
    firstCell.dispatchEvent(event);
    expect(api.ensureColumnVisible).toHaveBeenCalledWith(api.getAllDisplayedColumns()[0]);
    expect(api.setFocusedHeader).toHaveBeenCalledWith(api.getAllDisplayedColumns()[0]);
    expect(api.setFocusedCell).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });
  it.each([
    ['Home', false, 0],
    ['End', false, 1],
    ['Home', true, 0],
  ])('moves header %s (ctrl=%s) to column %s', (key, ctrlKey, column) => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    const event = new KeyboardEvent('keydown', { key, ctrlKey, bubbles: true, cancelable: true });
    headerCell.dispatchEvent(event);
    expect(api.ensureColumnVisible).toHaveBeenCalledWith(api.getAllDisplayedColumns()[column]);
    expect(api.setFocusedHeader).toHaveBeenCalledWith(api.getAllDisplayedColumns()[column]);
    expect(api.setFocusedCell).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });
  it('moves Ctrl+End from a header to the last body cell', () => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    const event = new KeyboardEvent('keydown', { key: 'End', ctrlKey: true, bubbles: true, cancelable: true });
    headerCell.dispatchEvent(event);
    expect(api.setFocusedCell).toHaveBeenCalledWith(34, api.getAllDisplayedColumns()[1]);
    expect(api.setFocusedHeader).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });
  it('does not override Home/End while editing an input', () => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    firstCell.querySelector('input').dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(api.setFocusedCell).not.toHaveBeenCalled();
  });
  it.each(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter'])('leaves %s to a text field being edited inside a cell', key => {
    const input = firstCell.querySelector('input');
    let isSuppressed;
    firstCell.addEventListener('keydown', event => (isSuppressed = suppressInteractiveCellKeyboardEvent({ event })));
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    input.dispatchEvent(event);
    expect(isSuppressed).toBe(true);
    expect(event.defaultPrevented).toBe(false);
  });
  it('suppresses AG Grid mouse handling only for interactive cell controls', () => {
    const copyButton = document.createElement('button');
    copyButton.setAttribute('data-grid-focusable', '');
    firstCell.appendChild(copyButton);
    const createEvent = (path) => ({ composedPath: () => path });
    expect(suppressInteractiveCellMouseEvent({ event: createEvent([copyButton, firstCell]) })).toBe(true);
    expect(suppressInteractiveCellMouseEvent({ event: createEvent([firstCell]) })).toBe(false);
  });
  it('restores a virtualized last cell through the public grid API on keyboard re-entry', () => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    focusCell(secondCell);
    secondCell.remove();
    notifyMutation();
    focusCell(firstCell);
    expect(api.ensureIndexVisible).toHaveBeenCalledWith(0);
    expect(api.ensureColumnVisible).toHaveBeenCalledWith('selected');
    expect(api.setFocusedCell).toHaveBeenCalledWith(0, 'selected', null);
  });
  it('lets a mouse click select a different cell instead of restoring the previous cell', () => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    focusCell(secondCell);
    secondCell.remove();
    notifyMutation();
    firstCell.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    focusCell(firstCell);
    expect(api.setFocusedCell).not.toHaveBeenCalled();
    expect(firstCell.tabIndex).toBe(0);
  });
  describe('Mouse click after keyboard focus', () => {
    let active;
    let activeElementDescriptor;
    beforeEach(() => {
      activeElementDescriptor = Object.getOwnPropertyDescriptor(document, 'activeElement');
      Object.defineProperty(document, 'activeElement', { configurable: true, get: () => active });
    });
    afterEach(() => {
      if (activeElementDescriptor) {
        Object.defineProperty(document, 'activeElement', activeElementDescriptor);
      }
      else {
        Reflect.deleteProperty(document, 'activeElement');
      }
    });
    it.each([
      ['a keyboard-focused cell', () => firstCell, () => secondCell, true],
      ['a mouse-focused cell', () => firstCell, () => secondCell, false],
      ['an editor in another cell', () => firstCell.querySelector('input'), () => secondCell, true],
      ['an editor in the clicked cell', () => firstCell.querySelector('input'), () => firstCell, false],
    ])('blurs %s so the clicked cell does not inherit :focus-visible', (_, getActive, getTarget, shouldBlur) => {
      active = getActive();
      const matches = firstCell.matches.bind(firstCell);
      jest
        .spyOn(firstCell, 'matches')
        .mockImplementation(selector => (selector === ':focus-visible' ? shouldBlur : matches(selector)));
      const blur = jest.spyOn(active, 'blur');
      getTarget().dispatchEvent(new Event('pointerdown', { bubbles: true }));
      expect(blur).toHaveBeenCalledTimes(shouldBlur ? 1 : 0);
    });
  });
  it('clamps the saved row to the current page on re-entry after pagination changes', () => {
    cleanup();
    const api = createApi(true);
    cleanup = setupGridKeyboardNavigation(container, () => api);
    focusCell(secondCell);
    secondCell.remove();
    firstCell.closest('.ag-row').setAttribute('row-index', '20');
    notifyMutation();
    focusCell(firstCell);
    expect(api.setFocusedCell).toHaveBeenCalledWith(20, 'selected', null);
  });
  it('keeps the available entry cell when the saved column has been removed', () => {
    cleanup();
    const api = createApi();
    cleanup = setupGridKeyboardNavigation(container, () => api);
    focusCell(secondCell);
    secondCell.remove();
    api.getAllDisplayedColumns.mockReturnValue([{ getColId: () => 'name' }]);
    notifyMutation();
    focusCell(firstCell);
    expect(api.setFocusedCell).not.toHaveBeenCalled();
    expect(firstCell.tabIndex).toBe(0);
  });
  it('returns from a cell control to its cell with Escape', () => {
    const input = firstCell.querySelector('input');
    const focus = jest.spyOn(firstCell, 'focus');
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    input.dispatchEvent(event);
    expect(focus).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });
  it('normalizes new controls and Shadow DOM controls after rendering', () => {
    const host = document.createElement('div');
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>Action</button>';
    secondCell.appendChild(host);
    notifyMutation();
    expect(shadow.querySelector('button').tabIndex).toBe(-1);
    shadow.querySelector('button').tabIndex = 0;
    notifyMutation();
    expect(shadow.querySelector('button').tabIndex).toBe(-1);
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
  });
  it('uses the header as a stop for an empty grid and switches to cells when rows appear', () => {
    cleanup();
    const row = container.querySelector('.ag-row');
    row.remove();
    cleanup = setupGridKeyboardNavigation(container, () => undefined);
    expect(container.querySelector('.ag-header-cell').getAttribute('tabindex')).toBe('0');
    container.querySelector('[role="grid"]').appendChild(row);
    notifyMutation();
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(firstCell.tabIndex).toBe(0);
  });
  it('stops observing and handling keys on cleanup', async () => {
    cleanup();
    const input = firstCell.querySelector('input');
    input.tabIndex = 0;
    await flushMutations();
    expect(input.tabIndex).toBe(0);
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    firstCell.dispatchEvent(event);
    expect(firstCell.tabIndex).toBe(0);
  });
  describe('Validation indicator focus', () => {
    let indicator;
    let activeElementDescriptor;
    beforeEach(() => {
      indicator = document.createElement('span');
      indicator.setAttribute('data-grid-focusable', '');
      indicator.setAttribute('role', 'img');
      indicator.setAttribute('aria-label', 'Warning');
      indicator.tabIndex = -1;
      firstCell.appendChild(indicator);
      activeElementDescriptor = Object.getOwnPropertyDescriptor(document, 'activeElement');
      Object.defineProperty(document, 'activeElement', { configurable: true, get: () => firstCell });
      const querySelector = firstCell.querySelector.bind(firstCell);
      const querySelectorAll = firstCell.querySelectorAll.bind(firstCell);
      jest
        .spyOn(firstCell, 'querySelector')
        .mockImplementation(selector => selector === '.ag-selection-checkbox input[type="checkbox"]' ? null : querySelector(selector));
      jest
        .spyOn(firstCell, 'querySelectorAll')
        .mockImplementation(selector => selector.startsWith('[data-grid-focusable],')
        ? querySelectorAll('[data-grid-focusable], input')
        : querySelectorAll(selector));
      firstCell.addEventListener('keydown', event => suppressInteractiveCellKeyboardEvent({ event }));
    });
    afterEach(() => {
      if (activeElementDescriptor) {
        Object.defineProperty(document, 'activeElement', activeElementDescriptor);
      }
      else {
        Reflect.deleteProperty(document, 'activeElement');
      }
    });
    it.each(['Enter', 'F2'])('focuses the warning with %s when it is the only cell control', key => {
      firstCell.querySelector('input').remove();
      const focus = jest.spyOn(indicator, 'focus');
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      firstCell.dispatchEvent(event);
      expect(focus).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
      expect(indicator.tabIndex).toBe(-1);
    });
    it('reaches the warning with Shift+Enter while retaining Enter for the input', () => {
      const input = firstCell.querySelector('input');
      const inputFocus = jest.spyOn(input, 'focus');
      const warningFocus = jest.spyOn(indicator, 'focus');
      firstCell.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(inputFocus).toHaveBeenCalledTimes(1);
      expect(warningFocus).not.toHaveBeenCalled();
      firstCell.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true }));
      expect(warningFocus).toHaveBeenCalledTimes(1);
    });
    it('focuses the indicator when the accompanying input is disabled', () => {
      firstCell.querySelector('input').disabled = true;
      const focus = jest.spyOn(indicator, 'focus');
      firstCell.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(focus).toHaveBeenCalledTimes(1);
    });
    it('does not add the warning to the page tab sequence or consume native Tab', () => {
      focusCell(indicator);
      notifyMutation();
      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
      indicator.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
      expect(indicator.tabIndex).toBe(-1);
      expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(0);
    });
  });
});
