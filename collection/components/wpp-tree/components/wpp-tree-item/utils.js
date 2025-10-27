export const clickOnElementsWithHandlers = (e) => {
  const innerElementsWithHandlers = ['wpp-checkbox', 'wpp-menu-context', 'wpp-icon', 'wpp-action-button'];
  return e
    .composedPath()
    ?.some(elem => Array.from(elem.classList || []).some(className => innerElementsWithHandlers.includes(className)));
};
export const clickOnSwitcher = (e) => e
  .composedPath()
  ?.some(elem => Array.from(elem.classList || []).some(className => ['switcher'].includes(className)));
