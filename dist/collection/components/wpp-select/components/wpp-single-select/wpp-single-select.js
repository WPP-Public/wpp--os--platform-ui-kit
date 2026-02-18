import { Fragment, h, Host } from '@stencil/core';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { FOCUS_TYPE } from '../../../../types/common';
export function renderSingleSelect(isBaseComponent = true, customSize, isRenderMessageInTooltip) {
  const getAnchorCSSClasses = () => ({
    anchor: true,
    [`size-${customSize || this.size}`]: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'with-errors': this.hasErrorsOrWarnings('error'),
    'with-warnings': this.hasErrorsOrWarnings('warning'),
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    'anchor-button': this.anchorButton,
  });
  const getSelectPlaceholder = () => {
    if (isBaseComponent) {
      return this.displayValue || this.renderedText || this.placeholder;
    }
    return this.renderedText;
  };
  const getInlineMessage = () => (h(Fragment, null, this.message && isBaseComponent && (h("wpp-inline-message-v4-0-0", { class: !this.messageType ? 'default-message' : '', showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType || 'information', tooltipConfig: this.tooltipConfig }))));
  const renderAnchor = () => (h("div", { class: getAnchorCSSClasses(), ref: el => (this.anchorRef = el), tabIndex: this.disabled ? -1 : 0, onClick: () => this.handleClick() }, this.anchorButton ? (h("slot", { name: "anchor-button", onSlotchange: this.updateSlotData })) : (h(Fragment, null, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("div", { class: "overflow-container", ref: refEl => (this.overflowContainerRef = refEl) }, this.textOverflows ? (h("wpp-tooltip-v4-0-0", { text: getSelectPlaceholder() }, h("p", null, getSelectPlaceholder()))) : (h("p", null, getSelectPlaceholder()))), h("input", { class: "input", ref: refEl => (this.inputRef = refEl), type: "text", name: this.name, onChange: () => this.checkIfTextOverflows(), disabled: this.disabled, value: getSelectPlaceholder(), tabIndex: -1, readonly: true, "aria-label": this.ariaProps.label, title: "", style: { width: this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto' }, required: this.required }), h("wpp-icon-chevron-v4-0-0", { class: this.isOpen || this.isDropdownOpen ? 'isOpen' : '', direction: 'down' })))));
  const RootTag = isBaseComponent ? Host : Fragment;
  return (h(RootTag, { onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, class: "wpp-single-select", "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur }, this.labelConfig?.text && isBaseComponent && (h("wpp-label-v4-0-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: () => this.handleClick() })), h("div", { class: "anchor-container" }, isRenderMessageInTooltip ? (h("wpp-tooltip-v4-0-0", { text: this.message, error: this.messageType === 'error', warning: this.messageType === 'warning', config: this.tooltipConfig }, renderAnchor())) : (renderAnchor())), h("div", null, !isRenderMessageInTooltip && getInlineMessage()), h("div", { class: "wpp-select-portal", onKeyDown: this.onKeyDownPortal, ref: el => (this.portalRef = el) }, this.shouldShowSearch && (h(Fragment, null, h("wpp-input-v4-0-0", { type: "search", class: "select-portal-search-input", value: this.searchText, onWppChange: this.handleSearch, name: this.name && `${this.name}-search-input`, placeholder: this._locales.searchInputPlaceholder }), h("wpp-divider-v4-0-0", { color: "var(--wpp-grey-color-300)" }))), h("div", { class: "list" }, this.renderList()))));
}
