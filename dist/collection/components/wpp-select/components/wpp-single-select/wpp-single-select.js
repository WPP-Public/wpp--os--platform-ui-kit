import { Fragment, h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
export function renderSingleSelect(isBaseComponent = true, customSize) {
  const wrapperCssClasses = () => ({
    wrapper: true,
    disabled: this.disabled,
    'bottom-margin': isBaseComponent && !!this.message,
    'trigger-element': true,
  });
  const hostCssClasses = () => ({
    'wpp-single-select': true,
  });
  const menuCssClasses = () => ({
    'wpp-list': true,
    'with-search': this.shouldShowSearch(),
    'with-scroll': this.withScroll,
    hidden: !this.areOptionsProvided(),
  });
  const inputWrapperCssClasses = () => {
    let classes = {
      'single-select-input': true,
      'input-wrapper': true,
      'with-icon-start': this.hasIconStartSlot,
      disabled: this.disabled,
      [`${this.messageType}`]: !!this.messageType,
      'tab-focus': this.focusType.input === FOCUS_TYPE.TAB && this.focusType.listItem !== FOCUS_TYPE.TAB,
    };
    if (isBaseComponent || !!customSize) {
      classes = { ...classes, [`size-${this.size}`]: !!this.size };
    }
    else {
      classes = { ...classes, 'size-m': true };
    }
    return classes;
  };
  const inputTextCssClasses = () => ({
    'input-text': true,
    'input-value': !!this.textToDisplay,
    'placeholder-active': !this.textToDisplay && !this.displayValue,
    'disabled-text': this.disabled,
  });
  const textWrapCssClasses = () => ({
    'text-wrap': true,
    disabled: this.disabled,
  });
  const getSelectPlaceholder = () => {
    if (isBaseComponent) {
      return this.displayValue || this.textToDisplay || this.placeholder;
    }
    return this.textToDisplay;
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
  return (h(RootTag, { class: hostCssClasses(), "aria-disabled": this.disabled, onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), exportparts: "label, wrapper, body, single-select-input, placeholder-wrap, placeholder, input, icon-chevron, message, options-list, search-wrapper, search-divider, input-search, list-wrapper, list-slot, empty-text" }, this.labelConfig?.text && isBaseComponent && (h("wpp-label-v2-22-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleLabelClick, part: "label" })), h("wpp-menu-list-v2-22-0", { shouldCloseOnOutsideClick: this.handleShouldCloseOnOutsideClick, dropdownConfig: {
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
    }, tabIndex: 0, exportparts: "input", part: "wrapper" }, h("div", { class: wrapperCssClasses(), slot: "trigger-element", tabIndex: -1, part: "body", ref: ref => (this.triggerEl = ref) }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("div", { ref: el => (this.inputRef = el), class: inputWrapperCssClasses(), role: "button", part: "single-select-input" }, h("div", { class: textWrapCssClasses(), part: "placeholder-wrap" }, h("p", { class: inputTextCssClasses(), part: "placeholder" }, getSelectPlaceholder())), h("input", { class: "input", type: "text", name: this.name, value: this.value, required: this.required, "aria-hidden": "true", disabled: this.disabled, placeholder: this.placeholder, "aria-label": this.ariaProps.label, tabIndex: -1, onFocus: this.onFocus, part: "input", title: "" }), h("wpp-icon-chevron-v2-22-0", { direction: "down", part: "icon-chevron", color: "" })), !!this.message && isBaseComponent && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))), h("div", { ref: ref => (this.menuRef = ref), class: menuCssClasses(), onKeyUp: (event) => this.onKeyUp(event, 'listItem'), onScroll: this.handleOptionsScroll }, this.shouldShowSearch() && (h("div", { class: "search-wrapper", part: "search-wrapper" }, h("wpp-input-v2-22-0", { name: this.name && `${this.name}-search-input`, ref: ref => (this.inputSearchRef = ref), type: "search", value: this.searchText, size: customSize, placeholder: this.locales.searchInputPlaceholder, onWppChange: handleSelectOptionSearch, part: "input-search" }), h("wpp-divider-v2-22-0", { part: "search-divider" }))), this.shouldShowSearch() ? (h("div", { ref: ref => (this.listWrapperRef = ref), class: getListWrapperClasses(), part: "list-wrapper" }, h("slot", { onSlotchange: this.handleSlotChange, part: "list-slot" }))) : (h("slot", { onSlotchange: this.handleSlotChange, part: "list-slot" })), this.isEmpty && !this.loading && !this.isInfiniteLoading && (h("p", { class: "empty-select-text", part: "empty-text" }, this.locales.emptyText)), (this.isInfiniteLoading || this.loading) && (h("div", { class: "infinite-loader" }, h("wpp-spinner-v2-22-0", null)))))));
}
