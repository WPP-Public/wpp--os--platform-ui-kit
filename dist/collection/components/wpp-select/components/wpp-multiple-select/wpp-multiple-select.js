import { Fragment, h, Host } from '@stencil/core';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { FOCUS_TYPE } from '../../../../types/common';
export function renderMultipleSelect() {
  const getAnchorCSSClasses = () => ({
    anchor: true,
    [`size-${this.size}`]: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'with-errors': this.hasErrorsOrWarnings('error'),
    'with-warnings': this.hasErrorsOrWarnings('warning'),
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    'anchor-button': this.anchorButton,
  });
  const getRenderedText = () => {
    if (this.internalList.length) {
      if (this.checkedItems === this.internalList.length - this.disabledItems && this.showSelectAllText) {
        // In case all items are checked, we display the "locales.allSelectedText" text.
        return this._locales.allSelectedText;
      }
      if (this.textOverflows) {
        return `${this.checkedItems} ${this._locales.selectLabel}`;
      }
    }
    return this.renderedText || this.placeholder;
  };
  const getInlineMessage = () => (h(Fragment, null, this.message && (h("wpp-inline-message-v4-0-0", { class: !this.messageType ? 'default-message' : '', showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType || 'information', tooltipConfig: this.tooltipConfig }))));
  const renderAnchor = () => (h("div", { class: getAnchorCSSClasses(), ref: el => (this.anchorRef = el), tabIndex: this.disabled ? -1 : 0, onClick: () => this.handleClick() }, this.anchorButton ? (h("slot", { name: "anchor-button", onSlotchange: this.updateSlotData })) : (h(Fragment, null, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("div", { class: "overflow-container", ref: refEl => (this.overflowContainerRef = refEl) }, h("p", null, getRenderedText())), h("input", { class: "input", type: "text", ref: refEl => (this.inputRef = refEl), name: this.name, onChange: () => this.checkIfTextOverflows(), disabled: this.disabled, value: this.renderedText, tabIndex: -1, readonly: true, "aria-label": this.ariaProps.label, title: "", style: { width: this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto' }, required: this.required }), h("wpp-icon-chevron-v4-0-0", { class: this.isOpen ? 'isOpen' : '', direction: 'down' })))));
  return (h(Host, { class: "wpp-multiple-select", onKeyUp: this.onKeyUp, "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur }, this.labelConfig?.text && (h("wpp-label-v4-0-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: () => this.handleClick() })), h("div", { class: "anchor-container" }, this.isRenderMessageInTooltip ? (h("wpp-tooltip-v4-0-0", { text: this.message, error: this.messageType === 'error', warning: this.messageType === 'warning', config: this.tooltipConfig }, renderAnchor())) : (renderAnchor())), h("div", null, !this.isRenderMessageInTooltip && getInlineMessage()), h("div", { class: "wpp-select-portal", ref: el => (this.portalRef = el) }, this.shouldShowSearch && (h(Fragment, null, h("wpp-input-v4-0-0", { type: "search", class: "select-portal-search-input", value: this.searchText, onWppChange: this.handleSearch, name: this.name && `${this.name}-search-input`, placeholder: this._locales.searchInputPlaceholder }), h("wpp-divider-v4-0-0", { color: "var(--wpp-grey-color-300)" }))), h("div", { class: "list list-with-scrollable" }, h("div", { class: "list-scrollable", ref: refEl => (this.listRef = refEl) }, this.withFolder && this.showSelectAllOption && this.isOpen && (h("div", { class: "select-all-section" }, !this.maximumSelectedItems && (h("wpp-list-item-v4-0-0", { multiple: true, checked: this.isSelectAllChecked, indeterminate: this.isSelectAllIndeterminate, disabled: this.isSelectAllDisabled, onWppChangeListItem: e => {
      e.stopPropagation();
      this.handleSelectAllToggle();
    }, class: "select-all-item" }, h("p", { slot: "label" }, this._locales.selectAllText, " (", this.selectAllCount, ")"))), this.renderPinnedItems(), this.filteredPinnedItems.length > 0 && h("wpp-divider-v4-0-0", { color: "var(--wpp-grey-color-300)" }))), this.renderList())), this.withFolder && this.isOpen && (h("div", { class: "multiple-select-folder" }, this.withScroll && h("wpp-divider-v4-0-0", null), this.showSelectAllOption ? (h("div", { class: `multiple-select-folder-buttons select-all-mode${this.withScroll ? ' with-divider' : ''}` }, h("wpp-action-button-v4-0-0", { variant: "secondary", disabled: !this.canClearVisible || this.loading, onClick: this.handleClearAll }, this._locales.clearText), h("wpp-action-button-v4-0-0", { variant: "primary", disabled: this.loading, onClick: this.handleApply }, this._locales.applyText))) : (h("div", { class: `multiple-select-folder-buttons${this.withScroll ? ' with-divider' : ''}` }, h("wpp-action-button-v4-0-0", { variant: "secondary", disabled: !this.canSelectAll || this.loading, onClick: this.handleSelectAll }, this._locales.selectAllText), this.canClearAll && (h("wpp-action-button-v4-0-0", { variant: "secondary", disabled: this.loading, onClick: this.handleClearAll }, this._locales.clearAllText)))))))));
}
