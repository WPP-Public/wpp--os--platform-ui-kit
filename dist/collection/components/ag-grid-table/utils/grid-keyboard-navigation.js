const viewportSelector = [
  '.ag-viewport',
  '.ag-body-viewport',
  '.ag-body-horizontal-scroll-viewport',
  '.ag-body-vertical-scroll-viewport',
].join(', ');
const focusableSelector = [
  '[tabindex]',
  '[data-grid-focusable]',
  viewportSelector,
  'button',
  'input',
  'select',
  'textarea',
  'a[href]',
  '[contenteditable="true"]',
  'summary',
].join(', ');
const cellSelector = '.ag-cell, .ag-header-cell';
const getRowBounds = (api) => {
  const pageSize = api.paginationGetPageSize();
  const firstRow = api.getGridOption('pagination') ? api.paginationGetCurrentPage() * pageSize : 0;
  const lastRow = api.getGridOption('pagination')
    ? Math.min(firstRow + pageSize, api.getDisplayedRowCount()) - 1
    : api.getDisplayedRowCount() - 1;
  return { firstRow, lastRow };
};
export const setupGridKeyboardNavigation = (container, getApi) => {
  let entry = null;
  let tabEntry = null;
  let hasFocused = false;
  let lastCell = null;
  let leaving = false;
  let restoring = false;
  let exitTimer;
  const observer = new MutationObserver(syncTabStops);
  function syncTabStops() {
    observer.disconnect();
    if (!hasFocused || !entry || !container.contains(entry)) {
      entry =
        container.querySelector('.ag-cell') ?? container.querySelector('.ag-header-cell');
    }
    const centerViewport = container.querySelector('.ag-center-cols-viewport');
    // Keep the single tab stop inside the scrollable region, even when focus is in a pinned column.
    tabEntry = centerViewport?.contains(entry)
      ? entry
      : (centerViewport?.querySelector('.ag-cell') ?? entry);
    const visit = (root) => {
      root.querySelectorAll('*').forEach(element => {
        if (element.matches(focusableSelector)) {
          const tabIndex = element === tabEntry && !leaving ? 0 : -1;
          // Scrollers inherit keyboard access from cells; suppress automatic tab stops only during Tab exit.
          if (!leaving && element.matches(viewportSelector)) {
            element.removeAttribute('tabindex');
          }
          else if (element.getAttribute('tabindex') !== String(tabIndex)) {
            element.tabIndex = tabIndex;
          }
        }
        if (element.shadowRoot)
          visit(element.shadowRoot);
      });
      observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['tabindex'] });
    };
    visit(container);
  }
  const onFocusIn = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement))
      return;
    if (target.matches(viewportSelector)) {
      entry?.focus();
      return;
    }
    const cell = target.closest(cellSelector);
    if (!cell)
      return;
    hasFocused = true;
    const isEntering = !(event.relatedTarget instanceof Node && container.contains(event.relatedTarget));
    leaving = false;
    clearTimeout(exitTimer);
    const row = cell.closest('.ag-row');
    const rowIndex = row?.getAttribute('row-index');
    const column = cell.getAttribute('col-id');
    if (isEntering &&
      cell === tabEntry &&
      lastCell &&
      (Number(rowIndex) !== lastCell.rowIndex || column !== lastCell.column) &&
      !restoring) {
      const api = getApi();
      if (api) {
        const { firstRow, lastRow } = getRowBounds(api);
        const lastColumn = lastCell.column;
        const restoredColumn = api.getAllDisplayedColumns().find(item => item.getColId() === lastColumn);
        if (lastRow < firstRow || !restoredColumn) {
          lastCell = null;
          entry = cell;
          syncTabStops();
          return;
        }
        lastCell = { ...lastCell, rowIndex: Math.max(firstRow, Math.min(lastRow, lastCell.rowIndex)) };
        restoring = true;
        api.ensureIndexVisible(lastCell.rowIndex);
        api.ensureColumnVisible(lastCell.column);
        api.setFocusedCell(lastCell.rowIndex, lastCell.column, lastCell.rowPinned);
        restoring = false;
        syncTabStops();
        return;
      }
    }
    if (isEntering && cell === tabEntry && entry && cell !== entry) {
      entry.focus();
      return;
    }
    entry = cell;
    lastCell =
      rowIndex !== null && rowIndex !== undefined && column
        ? {
          rowIndex: Number(rowIndex),
          column,
          rowPinned: row?.closest('.ag-floating-top') ? 'top' : row?.closest('.ag-floating-bottom') ? 'bottom' : null,
        }
        : null;
    syncTabStops();
  };
  const onKeyDown = (event) => {
    if (event.key === 'Tab') {
      // Remove even the current stop before native Tab navigation, so Shift+Tab cannot land on its parent cell.
      leaving = true;
      event.stopPropagation();
      syncTabStops();
      exitTimer = setTimeout(() => {
        leaving = false;
        syncTabStops();
      });
      return;
    }
    const target = event.target;
    const cell = target instanceof HTMLElement ? target.closest(cellSelector) : null;
    const isHeaderCell = cell?.matches('.ag-header-cell');
    if (cell &&
      (isHeaderCell || cell.matches('.ag-cell')) &&
      event.composedPath()[0] === cell &&
      (event.key === 'Home' || event.key === 'End') &&
      !event.altKey) {
      const api = getApi();
      const columns = api?.getAllDisplayedColumns();
      const column = event.key === 'Home' ? columns?.[0] : columns?.at(-1);
      if (!api || !column)
        return;
      event.preventDefault();
      event.stopPropagation();
      if ((event.ctrlKey || event.metaKey) && event.key === 'Home') {
        api.ensureColumnVisible(column);
        api.setFocusedHeader(column);
        return;
      }
      if (isHeaderCell && !event.ctrlKey && !event.metaKey) {
        api.ensureColumnVisible(column);
        api.setFocusedHeader(column);
        return;
      }
      let rowIndex = Number(cell.closest('.ag-row')?.getAttribute('row-index'));
      if (event.ctrlKey || event.metaKey) {
        const { firstRow, lastRow } = getRowBounds(api);
        rowIndex = event.key === 'Home' ? firstRow : lastRow;
      }
      api.ensureIndexVisible(rowIndex);
      api.ensureColumnVisible(column);
      api.setFocusedCell(rowIndex, column);
      return;
    }
    if (event.key === 'Escape' && cell && event.composedPath()[0] !== cell) {
      event.preventDefault();
      event.stopPropagation();
      cell.focus();
    }
  };
  const onPointerDown = (event) => {
    lastCell = null;
    if (event.target instanceof HTMLElement) {
      const cell = event.target.closest(cellSelector);
      const active = document.activeElement;
      const activeCell = active instanceof HTMLElement ? active.closest(cellSelector) : null;
      // AG Grid focuses the clicked cell via script, which inherits :focus-visible from a keyboard-focused cell or editor.
      if (cell && activeCell && (active === activeCell ? activeCell.matches(':focus-visible') : activeCell !== cell)) {
        ;
        active.blur();
      }
      entry = cell ?? entry;
    }
  };
  container.addEventListener('focusin', onFocusIn);
  container.addEventListener('keydown', onKeyDown, true);
  container.addEventListener('pointerdown', onPointerDown, true);
  syncTabStops();
  return () => {
    clearTimeout(exitTimer);
    observer.disconnect();
    container.removeEventListener('focusin', onFocusIn);
    container.removeEventListener('keydown', onKeyDown, true);
    container.removeEventListener('pointerdown', onPointerDown, true);
  };
};
