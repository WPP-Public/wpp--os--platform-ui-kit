export const DEFAULT_POPOVER_LOCALES = {
  searchInputPlaceholder: 'Search',
  clearText: 'Clear',
  closeText: 'Close popover',
  actionsText: 'Popover actions',
};
export const NATIVE_INTERACTIVE_SELECTOR = 'button, a[href], input, select, textarea, summary';
// Elements that can be the trigger control themselves, as opposed to wrappers around it (e.g. `wpp-tooltip`)
export const TRIGGER_CONTROL_SELECTOR = `${NATIVE_INTERACTIVE_SELECTOR}, [tabindex]:not([tabindex="-1"])`;
// Dropdown roles that `aria-haspopup` can announce on the trigger
export const ARIA_HASPOPUP_ROLES = ['menu', 'listbox', 'tree', 'grid', 'dialog'];
