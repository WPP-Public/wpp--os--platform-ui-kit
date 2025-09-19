export const clickOnElementsWithHandlers = (e: MouseEvent) => {
  const innerElementsWithHandlers = ['wpp-checkbox', 'wpp-menu-context', 'wpp-icon', 'wpp-action-button']

  return e
    .composedPath()
    ?.some(elem =>
      Array.from((elem as any).classList || []).some(className =>
        innerElementsWithHandlers.includes(className as string),
      ),
    )
}
export const clickOnSwitcher = (e: MouseEvent) =>
  e
    .composedPath()
    ?.some(elem =>
      Array.from((elem as any).classList || []).some(className => ['switcher'].includes(className as string)),
    )
