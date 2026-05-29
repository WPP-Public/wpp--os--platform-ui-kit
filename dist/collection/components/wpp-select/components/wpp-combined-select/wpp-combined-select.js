import { Fragment, Host, h } from '@stencil/core';
import { renderSingleSelect } from '../wpp-single-select/wpp-single-select';
export function renderCombinedSelect() {
  const handleInputChange = (event) => {
    this.inputValue = String(event.detail.value);
    const selectedItems = this.internalList.filter((listItem) => listItem.checked);
    this.wppChange.emit({
      value: this.value,
      selectedItems,
      inputValue: this.inputValue,
      ...(this.name !== undefined && { name: this.name }),
    });
  };
  const onFocusInput = () => {
    if (this.disabled)
      return;
    this.isContainerFocused = true;
    if (this.tippyInstance?.state.isShown) {
      this.handleClick();
    }
  };
  const onBlurInput = () => {
    this.isContainerFocused = false;
  };
  const getInlineMessage = () => (h(Fragment, null, this.message && (h("wpp-inline-message-v4-1-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig }))));
  const combinedInputWrapperCssClasses = () => ({
    'inputs-container': true,
    'with-errors': this.hasErrorsOrWarnings('error'),
    'with-warnings': this.hasErrorsOrWarnings('warning'),
    disabled: this.disabled,
    'is-active': this.isOpen || this.isContainerFocused,
  });
  const getHostCssClasses = () => ({
    'wpp-combined-select': true,
    disabled: this.disabled,
  });
  const renderAnchor = () => (h("div", { class: combinedInputWrapperCssClasses() }, renderSingleSelect.call(this, false, this.size, false), h("wpp-input-v4-1-0", { onWppChange: handleInputChange, value: this.inputValue, disabled: this.disabled, type: this.inputType, maskOptions: this.maskOptions, messageType: this.messageType, placeholder: this.placeholder, size: this.size, tabIndex: -1, onFocus: onFocusInput, onBlur: onBlurInput, onClick: (event) => event.stopPropagation() })));
  return (h(Host, { class: getHostCssClasses(), onKeyUp: this.onKeyUp, "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur }, this.labelConfig?.text && (h("wpp-label-v4-1-0", { class: this.labelCssClasses(), htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: () => this.handleClick() })), h("div", { class: "combined-anchor-container" }, this.isRenderMessageInTooltip ? (h("wpp-tooltip-v4-1-0", { text: this.message, error: this.messageType === 'error', warning: this.messageType === 'warning', config: this.tooltipConfig }, renderAnchor())) : (renderAnchor())), h("div", null, !this.isRenderMessageInTooltip && getInlineMessage())));
}
