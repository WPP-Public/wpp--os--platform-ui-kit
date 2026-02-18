import { Fragment, h } from '@stencil/core';
import { isSelected, LIB_COMPONENTS_PREFIX, renderSlotsInListItem } from '../utils';
export function renderDropdownListComponent() {
  const convertValueToKey = (value) => {
    if (typeof value === 'object') {
      return this.getItemKey ? this.getItemKey(value) : undefined;
    }
    return value;
  };
  const renderListOptions = () => {
    this.listItemsRefs = [];
    return (h(Fragment, null, this.internalList.map((item, ndx) => {
      const { label, slots, ...rest } = item;
      return (h("wpp-list-item-v4-0-0", { ref: el => (this.listItemsRefs[ndx] = el), onWppChangeListItem: this.handleClickListItem, key: convertValueToKey(item.value), ...rest, id: item.id !== undefined ? `${LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined, role: "option" }, h("span", { slot: "label" }, label), slots && renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
    }), this.isInfiniteLoading && (h("div", { class: "wpp-dropdown-infinite-loader" }, h("wpp-spinner-v4-0-0", null)))));
  };
  const renderSuggestionOptions = () => {
    this.suggestionsItemsRefs = [];
    return (h(Fragment, null, h("wpp-typography-v4-0-0", { role: "presentation", type: "s-strong", class: "suggestions-heading" }, this._locales.suggestionTitle), this.componentSuggestions?.map((suggestion, ndx) => {
      const { slots, checked, label, ...restProps } = suggestion;
      const isChecked = checked || isSelected(this.value, suggestion, this.getItemKey);
      return (h("wpp-list-item-v4-0-0", { ref: el => (this.suggestionsItemsRefs[ndx] = el), onWppChangeListItem: this.handleClickListItem, key: convertValueToKey(suggestion.value), ...restProps, id: suggestion.id !== undefined ? `${LIB_COMPONENTS_PREFIX}list-item-${suggestion.id}` : undefined, checked: isChecked, class: { 'suggestion-item': true, 'last-item': ndx === this.componentSuggestions.length - 1 }, role: "option" }, h("span", { slot: "label" }, label), slots && renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
    })));
  };
  if (this.loading) {
    return (h("wpp-list-item-v4-0-0", { role: "status", "non-interactive": true }, h("wpp-spinner-v4-0-0", { slot: "left" }), h("span", { slot: "label" }, this._locales.loading)));
  }
  if (!this.visibleOptionsLength && this.searchText.length > 0) {
    return (h("wpp-list-item-v4-0-0", { labelTypography: { color: 'var(--wpp-grey-color-700)', type: 's-body' }, nonInteractive: true }, h("wpp-typography-v4-0-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound)));
  }
  if (!this.searchText.trim().length && !!this.componentSuggestions?.length) {
    return renderSuggestionOptions();
  }
  return renderListOptions();
}
