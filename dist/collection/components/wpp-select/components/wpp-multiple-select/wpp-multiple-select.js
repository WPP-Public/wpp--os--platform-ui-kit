import { Fragment, h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
export function renderMultipleSelect(isBaseComponent = true) {
  const wrapperCssClasses = () => ({
    wrapper: true,
    disabled: this.disabled,
    'bottom-margin': isBaseComponent && !!this.message,
    'trigger-element': true,
  });
  const hostCssClasses = () => ({
    'wpp-multiple-select': true,
  });
  const menuCssClasses = () => ({
    'wpp-list': true,
    'with-search': this.shouldShowSearch(),
    'with-scroll': this.withScroll,
    'with-folder': this.withFolder && !this.isEmpty,
  });
  const inputWrapperCssClasses = () => {
    let classes = {
      'multiple-select-input': true,
      'with-icon-start': this.hasIconStartSlot,
      'input-wrapper': true,
      disabled: this.disabled,
      [`${this.messageType}`]: !!this.messageType,
      'tab-focus': this.focusType.input === FOCUS_TYPE.TAB && this.focusType.listItem !== FOCUS_TYPE.TAB,
    };
    if (isBaseComponent) {
      classes = { ...classes, [`size-${this.size}`]: !!this.size };
    }
    else {
      classes = { ...classes, 'size-m': true };
    }
    return classes;
  };
  const inputTextCssClasses = () => ({
    'input-text': true,
    'input-text-multiple': true,
    'input-value': Boolean(this.textToDisplay && this.selectedItemsTextList.length),
    'input-filled': this.isInputFilled,
    'placeholder-active': !this.textToDisplay && !this.selectedItemsTextList.length,
    'disabled-text': this.disabled,
  });
  const textWrapCssClasses = () => ({
    'text-wrap': true,
    disabled: this.disabled,
  });
  const clearButtonCssClasses = () => ({
    'multiple-select-clear-button': true,
    visible: !!this.activeItems.length,
  });
  const getSelectPlaceholder = () => {
    if (!this.selectedItemsTextList.length) {
      return this.placeholder;
    }
    if (this.isAllSelected && this.showSelectAllText) {
      return h("span", { class: "selected-item-text" }, this.locales.allSelectedText);
    }
    return (h(Fragment, null, this.selectedItemsTextList.map((selectedText, index) => (h("p", { key: selectedText, class: "selected-item" }, h("span", { class: "selected-item-text-wrapper" }, h("span", { class: "selected-item-text" }, selectedText)), (this.selectedItemsTextList.length - 1 !== index || !!this.textToDisplay) && (h("span", { class: "select-item-divider" }, ","))))), !!this.textToDisplay && h("span", null, "+", this.textToDisplay)));
  };
  const getListWrapperClasses = () => ({
    'list-wrapper': true,
    'empty-list': this.isEmpty,
    'list-loading': this.loading || this.isInfiniteLoading,
  });
  const handleSelectOptionSearch = (e) => {
    const value = e.detail.value || '';
    this.handleSearch(value);
  };
  const RootTag = isBaseComponent ? Host : Fragment;
  return (h(RootTag, { class: hostCssClasses(), "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "label, wrapper, body, multiple-select-input, placeholder-wrap, placeholder, input, total-text, icon-chevron, message, options-list, search-wrapper, search-divider, input-search, list-wrapper, list-slot, empty-text, folder, folder-divider, folder-buttons, clear-all-button, select-all-button" }, this.labelConfig?.text && isBaseComponent && (h("wpp-label-v2-22-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleLabelClick, part: "label" })), h("wpp-menu-list-v2-22-0", { shouldCloseOnOutsideClick: this.handleShouldCloseOnOutsideClick, dropdownConfig: {
      ...this.dropdownConfig,
      onHide: this.handleMenuListHide,
      onShow: (instance) => {
        this.getDropdownWidth(instance);
        this.handleMenuListShow(instance);
      },
      onMount: (instance) => {
        setTimeout(() => {
          if (this.shouldShowSearch() && this.inputSearchRef) {
            this.inputSearchRef.setFocus();
          }
        }, 0);
        if (this.dropdownConfig?.onMount) {
          this.dropdownConfig.onMount(instance);
        }
      },
      showOnCreate: this.autoFocus,
    }, tabIndex: 0, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), part: "wrapper" }, h("div", { ref: ref => (this.triggerEl = ref), class: wrapperCssClasses(), slot: "trigger-element", tabIndex: -1, part: "body" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("div", { ref: el => (this.inputRef = el), class: inputWrapperCssClasses(), tabIndex: -1, role: "button", part: "multiple-select-input" }, h("div", { class: textWrapCssClasses(), part: "placeholder-wrap" }, h("p", { class: inputTextCssClasses(), part: "placeholder" }, getSelectPlaceholder()), this.isInputFilled && (h("span", { class: "selected-total-text", part: "total-text" }, this.activeItems.length, " ", this.locales.selectLabel))), h("input", { class: "input", type: "text", name: this.name, value: this.textToDisplay, required: this.required, "aria-hidden": "true", disabled: this.disabled, placeholder: this.placeholder, tabIndex: -1, "aria-label": this.ariaProps.label, part: "input", title: "" }), h("wpp-icon-chevron-v2-22-0", { direction: "down", part: "icon-chevron", color: "" })), !!this.message && isBaseComponent && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))), h("div", { ref: ref => (this.menuRef = ref), class: menuCssClasses(), tabindex: -1, role: "menu", part: "options-list", onScroll: this.handleOptionsScroll }, this.shouldShowSearch() && (h("div", { class: "search-wrapper", part: "search-wrapper" }, h("wpp-input-v2-22-0", { ref: ref => (this.inputSearchRef = ref), type: "search", value: this.searchText, size: "m", placeholder: this.locales.searchInputPlaceholder, onWppChange: handleSelectOptionSearch, part: "input-search", name: this.name && `${this.name}-search-input` }), h("wpp-divider-v2-22-0", { part: "search-divider" }))), this.shouldShowSearch() ? (h("div", { ref: ref => (this.listWrapperRef = ref), class: getListWrapperClasses(), part: "list-wrapper" }, h("slot", { onSlotchange: this.handleSlotChange, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'listItem'), part: "list-slot" }))) : (h("slot", { onSlotchange: this.handleSlotChange, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'listItem'), part: "list-slot" })), this.isEmpty && !this.loading && !this.isInfiniteLoading && (h("p", { class: "empty-select-text", part: "empty-text" }, this.locales.emptyText)), (this.isInfiniteLoading || this.loading) && (h("div", { class: "infinite-loader" }, h("wpp-spinner-v2-22-0", null))), this.withFolder && !this.isEmpty && (h("div", { class: "multiple-select-folder", part: "folder" }, this.withScroll && h("wpp-divider-v2-22-0", { part: "folder-divider" }), h("div", { class: "multiple-select-folder-buttons", part: "folder-buttons" }, h("wpp-action-button-v2-22-0", { variant: "secondary", disabled: !this.canSelectAll(), onClick: this.handleSelectAll, part: "select-all-button" }, this.locales.selectAllText), h("wpp-action-button-v2-22-0", { variant: "secondary", disabled: !this.anyClearable(), class: clearButtonCssClasses(), onClick: this.handleClearAll, part: "clear-all-button" }, this.locales.clearAllText))))))));
}
