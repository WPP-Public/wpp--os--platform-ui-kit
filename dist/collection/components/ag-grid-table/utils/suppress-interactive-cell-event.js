const focusableSelector = [
  '[data-grid-focusable]',
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');
const textFieldSelector = 'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
const getGridCell = (event) => {
  const target = event.target;
  if (target instanceof HTMLElement) {
    const closestCell = target.closest('.ag-cell');
    if (closestCell)
      return closestCell;
  }
  const composedPath = 'composedPath' in event ? event.composedPath() : [];
  for (const layer of composedPath) {
    if (layer instanceof HTMLElement) {
      const cell = layer.closest('.ag-cell');
      if (cell)
        return cell;
    }
  }
  return null;
};
const getFocusableControls = (gridCell) => Array.from(gridCell.querySelectorAll(focusableSelector)).filter(control => {
  if (control.disabled)
    return false;
  const isCheckbox = control.matches('input[type="checkbox"]');
  return isCheckbox ? !control.closest('[aria-disabled="true"]') : true;
});
const getSelectionCheckbox = (gridCell) => gridCell.querySelector('.ag-selection-checkbox input[type="checkbox"]');
const focusControl = (control) => {
  if (control.setFocus) {
    void control.setFocus(true);
    return;
  }
  control.focus();
};
export const suppressInteractiveCellKeyboardEvent = (params) => {
  const { event } = params;
  const gridCell = getGridCell(event);
  if (!gridCell)
    return false;
  const eventOrigin = event.composedPath()[0] ?? event.target;
  // Leave editing keys (arrows, Home/End, Enter...) to text fields, as outside the grid.
  if (eventOrigin instanceof HTMLElement && eventOrigin !== gridCell && eventOrigin.matches(textFieldSelector)) {
    return true;
  }
  const isGridCellFocused = document.activeElement === gridCell;
  const controls = getFocusableControls(gridCell);
  const selectionCheckbox = getSelectionCheckbox(gridCell);
  const isSelectionCheckboxFocused = Boolean(selectionCheckbox) && document.activeElement === selectionCheckbox;
  if (selectionCheckbox && event.key === 'Enter' && (isGridCellFocused || isSelectionCheckboxFocused)) {
    event.preventDefault();
    // Use AG Grid's mouse click path so Enter selects exactly like clicking the checkbox.
    if (!event.repeat && !selectionCheckbox.disabled) {
      selectionCheckbox.focus();
      selectionCheckbox.click();
    }
    return true;
  }
  if (isGridCellFocused && ['Enter', 'F2'].includes(event.key)) {
    const control = event.shiftKey ? controls.at(-1) : controls[0];
    if (!control)
      return false;
    event.preventDefault();
    focusControl(control);
    return true;
  }
  return false;
};
// Keep AG Grid from selecting the row and refocusing the cell when an interactive control is activated.
export const suppressInteractiveCellMouseEvent = ({ event, }) => event.composedPath().some(layer => layer instanceof HTMLElement && layer.hasAttribute('data-grid-focusable'));
