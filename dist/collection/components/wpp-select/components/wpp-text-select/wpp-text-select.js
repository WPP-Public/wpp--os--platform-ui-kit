import { Fragment, h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
import { selectDropdownWidth } from '../../../../utils/utils';
export function renderTextSelect() {
  const textSelectWrapperCssClasses = () => ({
    'text-select-wrapper': true,
    'placeholder-active': !this.textToDisplay,
    'tab-focus': this.focusType.input === FOCUS_TYPE.TAB && this.focusType.listItem !== FOCUS_TYPE.TAB,
    disabled: this.disabled,
  });
  const hostCssClasses = () => ({
    'wpp-text-select': true,
  });
  const triggerElementCssClasses = () => ({
    wrapper: true,
    disabled: this.disabled,
    'trigger-element': true,
    'truncated-text': this.truncate,
    'should-truncate': this.shouldTruncate,
  });
  const renderTriggerText = () => (h(Fragment, null, h("wpp-typography-v2-22-0", { type: "s-body", part: "text" }, this.textToDisplay || this.placeholder), h("wpp-icon-chevron-v2-22-0", { direction: "down", part: "icon-chevron" })));
  const dropdownMaxWidthTextSelect = () => {
    if (this.dropdownWidth === 'auto') {
      if (!this.triggerEl)
        return { '--custom-dropdown-max-width': 'auto' };
      if (this.triggerEl?.clientWidth < 350) {
        return { '--custom-dropdown-max-width': '350px' };
      }
      return { '--custom-dropdown-max-width': `${this.triggerEl.clientWidth}px` };
    }
    return {
      '--custom-dropdown-max-width': `${selectDropdownWidth(this.dropdownWidth, this.triggerEl, this.host)}px`,
    };
  };
  return (h(Host, { class: hostCssClasses(), "aria-disabled": this.disabled, disabled: this.disabled, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), exportparts: "wrapper, body, text-select-wrapper, text, icon-chevron, options-list" }, h("wpp-menu-list-v2-22-0", { shouldCloseOnOutsideClick: this.handleShouldCloseOnOutsideClick, part: "wrapper", exportparts: "trigger, inner, body", dropdownConfig: {
      ...this.dropdownConfig,
      triggerElementWidth: false,
      showOnCreate: this.autoFocus,
      onShow: (instance) => {
        const dropdown = instance.popper.querySelector('.tippy-box');
        if (!dropdown)
          return;
        if (this.dropdownWidth === 'auto') {
          dropdown.style.maxWidth = '350px';
        }
        else {
          dropdown.style.maxWidth = this.dropdownWidth;
          dropdown.style.width = this.dropdownWidth;
        }
        if (this.dropdownConfig?.onShow) {
          return this.dropdownConfig.onShow(instance);
        }
      },
      onHide: (instance) => {
        this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.NONE);
        if (this.dropdownConfig?.onHide) {
          return this.dropdownConfig.onHide(instance);
        }
      },
    } }, h("div", { class: triggerElementCssClasses(), slot: "trigger-element", tabIndex: -1, part: "body" }, h("div", { class: textSelectWrapperCssClasses(), tabIndex: 0, role: "button", ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, part: "text-select-wrapper" }, this.truncate && this.shouldTruncate ? (h("wpp-tooltip-v2-22-0", { text: this.textToDisplay || this.placeholder, config: { placement: 'right' }, class: "tooltip" }, renderTriggerText())) : (renderTriggerText()))), h("ul", { class: "wpp-list", role: "menu", part: "options-list", onMouseDown: this.onMouseDown, style: { ...dropdownMaxWidthTextSelect() }, onKeyUp: (event) => this.onKeyUp(event, 'listItem') }, h("slot", null)))));
}
