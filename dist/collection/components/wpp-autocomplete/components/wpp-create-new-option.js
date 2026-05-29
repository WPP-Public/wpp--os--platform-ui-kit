import { h } from '@stencil/core';
export function renderCreateNewOptionComponent() {
  if (this.loading ||
    !this.showCreateNewElement ||
    this.searchText.length === 0 ||
    (this.displayBtnWhenListEmpty && this.visibleOptionsLength))
    return;
  const handleCreateNewOptionClick = () => {
    this.wppCreateNewOption.emit(this.searchText);
    this.handleBlur(undefined, { force: true });
  };
  return (h("div", { class: "wpp-dropdown-actions" }, h("wpp-divider-v4-1-0", null), h("wpp-list-item-v4-1-0", { onClick: handleCreateNewOptionClick }, h("wpp-typography-v4-1-0", { type: "s-strong", class: "wpp-create-new-option", slot: "label" }, this._locales.createNewElement(this.searchText)))));
}
