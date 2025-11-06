import { Host, h } from '@stencil/core';
import { renderSingleSelect } from '../wpp-single-select/wpp-single-select';
export function renderCombinedSelect() {
  const combinedInputWrapperCssClasses = () => {
    let classes = {
      'wpp-combined-select': true,
      'combined-input-wrapper': true,
      focused: this.isFocused,
    };
    if (this.messageType) {
      classes = { ...classes, [this.messageType]: true };
    }
    return classes;
  };
  return (h(Host, { "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur, class: { focused: this.isFocused }, exportparts: "label, content, inner" }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: this.labelCssClasses(), htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleLabelClick, part: "label" })), h("div", { class: combinedInputWrapperCssClasses(), tabIndex: 0, part: "input-wrapper" }, renderSingleSelect.call(this, false, this.size), h("wpp-input-v2-22-0", { onWppChange: this.handleInputChange, value: this.inputValue, disabled: this.disabled, messageType: this.messageType, placeholder: this.placeholder, size: this.size, tabIndex: -1, part: "input" })), this.message && (h("wpp-inline-message-v2-22-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
}
