import { h, Host, Fragment, proxyCustomElement, HTMLElement, createEvent } from '@stencil/core/internal/client';
import { h as highlightWords } from './highlight-words.js';
import { d as isArrayLike_1, e as isArray_1, f as isBuffer_1, g as isTypedArray_1, j as isArguments_1, k as _getTag, l as _isPrototype, n as _baseKeys, i as isEqual_1 } from './menuListConfig.js';
import { s as selectDropdownWidth, g as getSlotEmptyStates, j as transformToVersionedTag, b as isEventTargetContained, m as autoFocusElement, q as setHasFocused } from './utils.js';
import { F as FOCUS_TYPE } from './common.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { d as defineCustomElement$i } from './wpp-action-button2.js';
import { d as defineCustomElement$h } from './wpp-divider2.js';
import { d as defineCustomElement$g } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$f } from './wpp-icon-cross2.js';
import { d as defineCustomElement$e } from './wpp-icon-error2.js';
import { d as defineCustomElement$d } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$c } from './wpp-icon-search2.js';
import { d as defineCustomElement$b } from './wpp-icon-success2.js';
import { d as defineCustomElement$a } from './wpp-icon-warning2.js';
import { d as defineCustomElement$9 } from './wpp-inline-message2.js';
import { d as defineCustomElement$8 } from './wpp-input2.js';
import { d as defineCustomElement$7 } from './wpp-internal-label2.js';
import { d as defineCustomElement$6 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$5 } from './wpp-label2.js';
import { d as defineCustomElement$4 } from './wpp-menu-list2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_1(value) &&
      (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }
  var tag = _getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

var isEmpty_1 = isEmpty;

function renderSingleSelect(isBaseComponent = true, customSize) {
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
  return (h(RootTag, { class: hostCssClasses(), "aria-disabled": this.disabled, onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), exportparts: "label, wrapper, body, single-select-input, placeholder-wrap, placeholder, input, icon-chevron, message, options-list, search-wrapper, search-divider, input-search, list-wrapper, list-slot, empty-text" },
    this.labelConfig?.text && isBaseComponent && (h("wpp-label-v2-22-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleLabelClick, part: "label" })),
    h("wpp-menu-list-v2-22-0", { shouldCloseOnOutsideClick: this.handleShouldCloseOnOutsideClick, dropdownConfig: {
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
      }, tabIndex: 0, exportparts: "input", part: "wrapper" },
      h("div", { class: wrapperCssClasses(), slot: "trigger-element", tabIndex: -1, part: "body", ref: ref => (this.triggerEl = ref) },
        h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }),
        h("div", { ref: el => (this.inputRef = el), class: inputWrapperCssClasses(), role: "button", part: "single-select-input" },
          h("div", { class: textWrapCssClasses(), part: "placeholder-wrap" },
            h("p", { class: inputTextCssClasses(), part: "placeholder" }, getSelectPlaceholder())),
          h("input", { class: "input", type: "text", name: this.name, value: this.value, required: this.required, "aria-hidden": "true", disabled: this.disabled, placeholder: this.placeholder, "aria-label": this.ariaProps.label, tabIndex: -1, onFocus: this.onFocus, part: "input", title: "" }),
          h("wpp-icon-chevron-v2-22-0", { direction: "down", part: "icon-chevron", color: "" })),
        !!this.message && isBaseComponent && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))),
      h("div", { ref: ref => (this.menuRef = ref), class: menuCssClasses(), onKeyUp: (event) => this.onKeyUp(event, 'listItem'), onScroll: this.handleOptionsScroll },
        this.shouldShowSearch() && (h("div", { class: "search-wrapper", part: "search-wrapper" },
          h("wpp-input-v2-22-0", { name: this.name && `${this.name}-search-input`, ref: ref => (this.inputSearchRef = ref), type: "search", value: this.searchText, size: customSize, placeholder: this.locales.searchInputPlaceholder, onWppChange: handleSelectOptionSearch, part: "input-search" }),
          h("wpp-divider-v2-22-0", { part: "search-divider" }))),
        this.shouldShowSearch() ? (h("div", { ref: ref => (this.listWrapperRef = ref), class: getListWrapperClasses(), part: "list-wrapper" },
          h("slot", { onSlotchange: this.handleSlotChange, part: "list-slot" }))) : (h("slot", { onSlotchange: this.handleSlotChange, part: "list-slot" })),
        this.isEmpty && !this.loading && !this.isInfiniteLoading && (h("p", { class: "empty-select-text", part: "empty-text" }, this.locales.emptyText)),
        (this.isInfiniteLoading || this.loading) && (h("div", { class: "infinite-loader" },
          h("wpp-spinner-v2-22-0", null)))))));
}

function renderCombinedSelect() {
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
  return (h(Host, { "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur, class: { focused: this.isFocused }, exportparts: "label, content, inner" },
    this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: this.labelCssClasses(), htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleLabelClick, part: "label" })),
    h("div", { class: combinedInputWrapperCssClasses(), tabIndex: 0, part: "input-wrapper" },
      renderSingleSelect.call(this, false, this.size),
      h("wpp-input-v2-22-0", { onWppChange: this.handleInputChange, value: this.inputValue, disabled: this.disabled, messageType: this.messageType, placeholder: this.placeholder, size: this.size, tabIndex: -1, part: "input" })),
    this.message && (h("wpp-inline-message-v2-22-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
}

function renderMultipleSelect(isBaseComponent = true) {
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
    return (h(Fragment, null,
      this.selectedItemsTextList.map((selectedText, index) => (h("p", { key: selectedText, class: "selected-item" },
        h("span", { class: "selected-item-text-wrapper" },
          h("span", { class: "selected-item-text" }, selectedText)),
        (this.selectedItemsTextList.length - 1 !== index || !!this.textToDisplay) && (h("span", { class: "select-item-divider" }, ","))))),
      !!this.textToDisplay && h("span", null,
        "+",
        this.textToDisplay)));
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
  return (h(RootTag, { class: hostCssClasses(), "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "label, wrapper, body, multiple-select-input, placeholder-wrap, placeholder, input, total-text, icon-chevron, message, options-list, search-wrapper, search-divider, input-search, list-wrapper, list-slot, empty-text, folder, folder-divider, folder-buttons, clear-all-button, select-all-button" },
    this.labelConfig?.text && isBaseComponent && (h("wpp-label-v2-22-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleLabelClick, part: "label" })),
    h("wpp-menu-list-v2-22-0", { shouldCloseOnOutsideClick: this.handleShouldCloseOnOutsideClick, dropdownConfig: {
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
      }, tabIndex: 0, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), part: "wrapper" },
      h("div", { ref: ref => (this.triggerEl = ref), class: wrapperCssClasses(), slot: "trigger-element", tabIndex: -1, part: "body" },
        h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }),
        h("div", { ref: el => (this.inputRef = el), class: inputWrapperCssClasses(), tabIndex: -1, role: "button", part: "multiple-select-input" },
          h("div", { class: textWrapCssClasses(), part: "placeholder-wrap" },
            h("p", { class: inputTextCssClasses(), part: "placeholder" }, getSelectPlaceholder()),
            this.isInputFilled && (h("span", { class: "selected-total-text", part: "total-text" },
              this.activeItems.length,
              " ",
              this.locales.selectLabel))),
          h("input", { class: "input", type: "text", name: this.name, value: this.textToDisplay, required: this.required, "aria-hidden": "true", disabled: this.disabled, placeholder: this.placeholder, tabIndex: -1, "aria-label": this.ariaProps.label, part: "input", title: "" }),
          h("wpp-icon-chevron-v2-22-0", { direction: "down", part: "icon-chevron", color: "" })),
        !!this.message && isBaseComponent && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))),
      h("div", { ref: ref => (this.menuRef = ref), class: menuCssClasses(), tabindex: -1, role: "menu", part: "options-list", onScroll: this.handleOptionsScroll },
        this.shouldShowSearch() && (h("div", { class: "search-wrapper", part: "search-wrapper" },
          h("wpp-input-v2-22-0", { ref: ref => (this.inputSearchRef = ref), type: "search", value: this.searchText, size: "m", placeholder: this.locales.searchInputPlaceholder, onWppChange: handleSelectOptionSearch, part: "input-search", name: this.name && `${this.name}-search-input` }),
          h("wpp-divider-v2-22-0", { part: "search-divider" }))),
        this.shouldShowSearch() ? (h("div", { ref: ref => (this.listWrapperRef = ref), class: getListWrapperClasses(), part: "list-wrapper" },
          h("slot", { onSlotchange: this.handleSlotChange, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'listItem'), part: "list-slot" }))) : (h("slot", { onSlotchange: this.handleSlotChange, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'listItem'), part: "list-slot" })),
        this.isEmpty && !this.loading && !this.isInfiniteLoading && (h("p", { class: "empty-select-text", part: "empty-text" }, this.locales.emptyText)),
        (this.isInfiniteLoading || this.loading) && (h("div", { class: "infinite-loader" },
          h("wpp-spinner-v2-22-0", null))),
        this.withFolder && !this.isEmpty && (h("div", { class: "multiple-select-folder", part: "folder" },
          this.withScroll && h("wpp-divider-v2-22-0", { part: "folder-divider" }),
          h("div", { class: "multiple-select-folder-buttons", part: "folder-buttons" },
            h("wpp-action-button-v2-22-0", { variant: "secondary", disabled: !this.canSelectAll(), onClick: this.handleSelectAll, part: "select-all-button" }, this.locales.selectAllText),
            h("wpp-action-button-v2-22-0", { variant: "secondary", disabled: !this.anyClearable(), class: clearButtonCssClasses(), onClick: this.handleClearAll, part: "clear-all-button" }, this.locales.clearAllText))))))));
}

function renderTextSelect() {
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
  const renderTriggerText = () => (h(Fragment, null,
    h("wpp-typography-v2-22-0", { type: "s-body", part: "text" }, this.textToDisplay || this.placeholder),
    h("wpp-icon-chevron-v2-22-0", { direction: "down", part: "icon-chevron" })));
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
  return (h(Host, { class: hostCssClasses(), "aria-disabled": this.disabled, disabled: this.disabled, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), exportparts: "wrapper, body, text-select-wrapper, text, icon-chevron, options-list" },
    h("wpp-menu-list-v2-22-0", { shouldCloseOnOutsideClick: this.handleShouldCloseOnOutsideClick, part: "wrapper", exportparts: "trigger, inner, body", dropdownConfig: {
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
      } },
      h("div", { class: triggerElementCssClasses(), slot: "trigger-element", tabIndex: -1, part: "body" },
        h("div", { class: textSelectWrapperCssClasses(), tabIndex: 0, role: "button", ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, part: "text-select-wrapper" }, this.truncate && this.shouldTruncate ? (h("wpp-tooltip-v2-22-0", { text: this.textToDisplay || this.placeholder, config: { placement: 'right' }, class: "tooltip" }, renderTriggerText())) : (renderTriggerText()))),
      h("ul", { class: "wpp-list", role: "menu", part: "options-list", onMouseDown: this.onMouseDown, style: { ...dropdownMaxWidthTextSelect() }, onKeyUp: (event) => this.onKeyUp(event, 'listItem') },
        h("slot", null)))));
}

const wppSelectCss = ":host([type=single]){--input-select-min-width:var(--wpp-input-select-min-width, 80px);--input-select-height-m:var(--wpp-input-select-height-m, 40px);--input-select-height-s:var(--wpp-input-select-height-s, 32px);--input-select-padding-size-m:var(\n    --wpp-input-select-padding-size-m,\n    calc(9px - var(--input-select-border-width)) 10px calc(9px - var(--input-select-border-width)) 12px\n  );--input-select-padding-size-s:var(\n    --wpp-input-select-padding-size-s,\n    calc(5px - var(--input-select-border-width)) 10px calc(5px - var(--input-select-border-width)) 12px\n  );--input-select-inline-message-margin:var(--wpp-input-select-inline-message-margin, 4px 0 0 0);--input-select-placeholder-color:var(--wpp-input-select-placeholder-color, var(--wpp-grey-color-1000));--input-select-text-color-disabled:var(--wpp-input-select-text-color-disabled, var(--wpp-text-color-disabled));--input-select-label-margin:var(--wpp-input-select-label-margin, 0 0 8px 0);--input-select-expanded-bg-color:var(--wpp-input-select-expanded-bg-color, var(--wpp-grey-color-000));--input-select-expanded-bg-color-hover:var(--wpp-input-select-expanded-bg-color-hover, var(--wpp-grey-color-000));--input-select-expanded-bg-color-active:var(--wpp-input-select-expanded-bg-color-active, var(--wpp-grey-color-300));--input-select-bg-color:var(--wpp-input-select-bg-color, transparent);--input-select-bg-color-hover:var(--wpp-input-select-bg-color-hover, var(--wpp-grey-color-200));--input-select-bg-color-active:var(--wpp-input-select-bg-color-active, var(--wpp-grey-color-300));--input-select-bg-color-disabled:var(--wpp-input-select-bg-color-disabled, var(--wpp-grey-color-100));--input-select-border-color:var(--wpp-input-select-border-color, var(--wpp-grey-color-500));--input-select-border-color-hover:var(--wpp-input-select-border-color-hover, var(--wpp-grey-color-700));--input-select-border-color-active:var(--wpp-input-select-border-color-active, var(--wpp-grey-color-800));--input-select-border-color-disabled:var(--wpp-input-select-border-color-disabled, var(--wpp-grey-color-400));--input-select-first-border-color-focus:var(--wpp-input-select-first-border-color-focus, var(--wpp-grey-color-000));--input-select-second-border-color-focus:var(--wpp-input-select-second-border-color-focus, var(--wpp-brand-color));--input-select-expanded-border-color:var(\n    --wpp-input-select-expanded-border-color,\n    var(--input-select-border-color-active)\n  );--input-select-expanded-border-color-hover:var(\n    --wpp-input-select-expanded-border-color-hover,\n    var(--input-select-border-color-active)\n  );--input-select-expanded-border-color-active:var(\n    --wpp-input-select-expanded-border-color-active,\n    var(--input-select-border-color-active)\n  );--input-select-icon-color:var(--wpp-input-select-icon-color, var(--wpp-icon-color));--input-select-icon-color-hover:var(--wpp-input-select-icon-color-hover, var(--wpp-icon-color-hover));--input-select-icon-color-active:var(--wpp-input-select-icon-color-active, var(--wpp-icon-color-active));--input-select-icon-color-disabled:var(--wpp-input-select-icon-color-disabled, var(--wpp-icon-color-disabled));--input-select-expanded-icon-color:var(--wpp-input-select-expanded-icon-color, var(--input-select-icon-color));--input-select-expanded-icon-color-hover:var(\n    --wpp-input-select-expanded-icon-color-hover,\n    var(--input-select-icon-color-hover)\n  );--input-select-expanded-icon-color-active:var(\n    --wpp-input-select-expanded-icon-color-active,\n    var(--input-select-icon-color-active)\n  );--input-select-border-width:var(--wpp-input-select-border-width, var(--wpp-border-width-s));--input-select-border-style:var(--wpp-input-select-border-style, solid);--input-select-dropdown-height:var(--wpp-input-select-dropdown-height, auto);--input-select-dropdown-max-height:var(--wpp-input-select-dropdown-max-height, 372px);--input-select-search-list-padding:var(--wpp-input-select-search-list-padding, 0);--input-select-search-list-wrapper-padding:var(--wpp-input-select-search-list-wrapper-padding, 8px);--input-select-search-empty-text-padding:var(--wpp-input-select-search-empty-text-padding, 12px 16px);--input-select-search-input-height:var(--wpp-input-select-search-input-height, 40px);--input-select-search-input-bg-color:var(--wpp-input-select-search-bg-color, var(--wpp-grey-color-000));--input-select-with-icon-padding-m:var(--wpp-input-select-with-icon-padding-m, 38px);--input-select-with-icon-padding-s:var(--wpp-input-select-with-icon-padding-s, 36px);--input-select-icon-start-margin-m:var(--wpp-input-select-icon-start-margin-m, 0 0 0 10px);--input-select-icon-start-margin-s:var(--wpp-input-select-icon-start-margin-s, 0 0 0 8px);--input-select-start-icon-color:var(--wpp-input-select-start-icon-color, var(--wpp-grey-color-600));--input-select-start-icon-color-active:var(--wpp-input-select-start-icon-color-active, var(--wpp-grey-color-600));--input-select-start-icon-color-hover:var(--wpp-input-select-start-icon-color-hover, var(--wpp-grey-color-600));--input-select-start-icon-color-disabled:var(\n    --wpp-input-select-start-icon-color-disabled,\n    var(--wpp-grey-color-400)\n  );--input-select-filled-start-icon-color:var(--wpp-input-select-filled-start-icon-color, var(--wpp-grey-color-800));--input-select-filled-start-icon-color-hover:var(\n    --wpp-input-select-filled-start-icon-color-hover,\n    var(--wpp-grey-color-800)\n  );--input-select-filled-pressed-start-icon-color:var(\n    --wpp-input-select-filled-pressed-start-icon-color,\n    var(--wpp-grey-color-900)\n  );--input-select-filled-active-start-icon-color:var(\n    --wpp-input-select-filled-active-start-icon-color,\n    var(--wpp-grey-color-800)\n  );position:relative;display:block;min-width:var(--input-select-min-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m))}:host([type=single]) .wpp-list{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}:host([type=single]) .wpp-list::-webkit-scrollbar{width:7px}:host([type=single]) .wpp-list::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}:host([type=single]) .wpp-list::-webkit-scrollbar-track{margin-top:8px}:host([type=single]) .wrapper{position:relative}:host([type=single]) .wrapper.disabled{pointer-events:none}:host([type=single]) .wrapper.bottom-margin{margin-bottom:20px}:host([type=single]) .input-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color);border-radius:var(--wpp-border-radius-m);cursor:pointer;background-color:var(--input-select-bg-color)}:host([type=single]) .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color)}:host([type=single]) .input-wrapper.size-m{height:var(--input-select-height-m);padding:var(--input-select-padding-size-m)}:host([type=single]) .input-wrapper.size-m.with-icon-start{padding-left:var(--input-select-with-icon-padding-m)}:host([type=single]) .input-wrapper.size-s{height:var(--input-select-height-s);padding:var(--input-select-padding-size-s)}:host([type=single]) .input-wrapper.size-s.with-icon-start{padding-left:var(--input-select-with-icon-padding-s)}:host([type=single]) .input-wrapper.warning:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=single]) .input-wrapper.error:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=single]) .input-wrapper.disabled{color:var(--input-select-text-color-disabled);background:var(--input-select-bg-color-disabled);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-disabled)}:host([type=single]) .input-wrapper.disabled .wpp-icon-chevron{color:var(--input-select-icon-color-disabled)}:host([type=single]) .input-wrapper:hover{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=single]) .input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=single]) .input-wrapper:active{background-color:var(--input-select-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-active)}:host([type=single]) .input-wrapper:active .wpp-icon-chevron{color:var(--input-select-icon-color-active)}:host([type=single]) .input-wrapper:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color);outline:none}:host([type=single]) .input-wrapper.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--input-select-first-border-color-focus), 0 0 0 2px var(--input-select-second-border-color-focus);box-shadow:0 0 0 1px var(--input-select-first-border-color-focus), 0 0 0 2px var(--input-select-second-border-color-focus);background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=single]) .input-wrapper.tab-focus .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=single]) .input-wrapper.warning,:host([type=single]) .input-wrapper.warning:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=single]) .input-wrapper.warning.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=single]) .input-wrapper.error,:host([type=single]) .input-wrapper.error:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=single]) .input-wrapper.error.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=single]) .input-value{height:20px}:host([type=single]) .label{display:-ms-inline-flexbox;display:inline-flex;margin:var(--input-select-label-margin);cursor:pointer}:host([type=single]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=single]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=single]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.warning{border-color:var(--wpp-warning-color-500)}:host([type=single]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.error{border-color:var(--wpp-danger-color-500)}:host([type=single]) .icon-start{position:absolute;top:50%;display:-ms-flexbox;display:flex;max-width:20px;overflow:hidden;color:var(--input-select-start-icon-color);-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}:host([type=single]) .icon-start ::slotted(*){color:var(--input-select-start-icon-color)}:host([type=single]) .icon-start.size-m{margin:var(--input-select-icon-start-margin-m)}:host([type=single]) .icon-start.size-s{margin:var(--input-select-icon-start-margin-s)}:host([type=single]) .icon-start.disabled{color:var(--input-select-start-icon-color-disabled)}:host([type=single]) .icon-start.disabled ::slotted(*){color:var(--input-select-start-icon-color-disabled)}:host([type=single]) .icon-start.filled{color:var(--input-select-filled-start-icon-color)}:host([type=single]) .icon-start.filled ::slotted(*){color:var(--input-select-filled-start-icon-color)}:host([type=single]) .icon-start.filled:hover{color:var(--input-select-filled-start-icon-color-hover)}:host([type=single]) .icon-start.filled:hover ::slotted(*){color:var(--input-select-filled-start-icon-color-hover)}:host([type=single]) .icon-start.filled-active{color:var(--input-select-filled-active-start-icon-color)}:host([type=single]) .icon-start.filled-active ::slotted(*){color:var(--input-select-filled-active-start-icon-color)}:host([type=single]) .icon-start.filled-pressed{color:var(--input-select-filled-pressed-start-icon-color)}:host([type=single]) .icon-start.filled-pressed ::slotted(*){color:var(--input-select-filled-pressed-start-icon-color)}:host([type=single]) .input-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);position:relative;margin:0;padding-right:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=single]) .placeholder-active{color:var(--input-select-placeholder-color);width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=single]) .placeholder-active::after{left:0}:host([type=single]) .disabled-text{color:var(--input-select-text-color-disabled)}:host([type=single]) .input{position:absolute;bottom:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;opacity:0;pointer-events:none}:host([type=single]) .inline-message{position:absolute;margin:var(--input-select-inline-message-margin)}:host([type=single]) .wrapper>.input-wrapper .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper{border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color);background-color:var(--input-select-expanded-bg-color)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper:hover{background-color:var(--input-select-expanded-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color-hover)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-expanded-icon-color-hover)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper:active{background-color:var(--input-select-expanded-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color-active)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper:active .wpp-icon-chevron{color:var(--input-select-expanded-icon-color-active)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper .wpp-icon-chevron{color:var(--input-select-expanded-icon-color)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper.warning,:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper.warning:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper.warning.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper.error,:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper.error:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper.error.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=single]) .wrapper[aria-expanded=true]>.input-wrapper .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([type=single]) .text-wrap{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;overflow:hidden}:host([type=single]) .text-wrap .input-filled{position:relative;visibility:hidden}:host([type=single]) .text-wrap .selected-total-text{position:absolute;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host([type=single]) .text-wrap.disabled .selected-total-text{color:var(--input-select-text-color-disabled)}:host([type=single]) .wpp-menu-list{outline:none}:host([type=single]) .wpp-list{height:var(--input-select-dropdown-height);max-height:var(--input-select-dropdown-max-height);width:var(--custom-dropdown-width);overflow-y:auto}:host([type=single]) .wpp-list.hidden{display:none}:host([type=single]) .wpp-list.with-search{padding:var(--input-select-search-list-padding);padding-top:var(--input-select-search-input-height)}:host([type=single]) .wpp-list.with-search .search-wrapper{position:absolute;right:0;left:0;top:0;z-index:2}:host([type=single]) .wpp-list.with-search .search-wrapper .wpp-input{--text-input-height-m:var(--input-select-search-input-height);--wpp-border-radius-m:0;--text-input-border-width:0;--text-input-bg-color:var(--input-select-search-input-bg-color);--text-input-second-border-color-focus:transparent;--text-input-first-border-color-focus:transparent}:host([type=single]) .wpp-list.with-search .search-wrapper .wpp-input.size-m::part(input-label){padding-top:9px}:host([type=single]) .wpp-list.with-search .search-wrapper .wpp-input.size-s::part(input-label){padding-top:5px}:host([type=single]) .wpp-list.with-search .list-wrapper{padding:var(--input-select-search-list-wrapper-padding)}:host([type=single]) .wpp-list.with-search .empty-list{padding:0}:host([type=single]) .wpp-list.with-search .list-loading{padding-bottom:0}:host([type=single]) .wpp-list.with-search .empty-select-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);margin:0;padding:var(--input-select-search-empty-text-padding);text-align:left;color:var(--wpp-grey-color-700)}:host([type=multiple]){--input-select-min-width:var(--wpp-input-select-min-width, 80px);--input-select-height-m:var(--wpp-input-select-height-m, 40px);--input-select-height-s:var(--wpp-input-select-height-s, 32px);--input-select-padding-size-m:var(\n    --wpp-input-select-padding-size-m,\n    calc(9px - var(--input-select-border-width)) 10px calc(9px - var(--input-select-border-width)) 12px\n  );--input-select-padding-size-s:var(\n    --wpp-input-select-padding-size-s,\n    calc(5px - var(--input-select-border-width)) 10px calc(5px - var(--input-select-border-width)) 12px\n  );--input-select-inline-message-margin:var(--wpp-input-select-inline-message-margin, 4px 0 0 0);--input-select-placeholder-color:var(--wpp-input-select-placeholder-color, var(--wpp-grey-color-1000));--input-select-text-color-disabled:var(--wpp-input-select-text-color-disabled, var(--wpp-text-color-disabled));--input-select-label-margin:var(--wpp-input-select-label-margin, 0 0 8px 0);--input-select-expanded-bg-color:var(--wpp-input-select-expanded-bg-color, var(--wpp-grey-color-000));--input-select-expanded-bg-color-hover:var(--wpp-input-select-expanded-bg-color-hover, var(--wpp-grey-color-000));--input-select-expanded-bg-color-active:var(--wpp-input-select-expanded-bg-color-active, var(--wpp-grey-color-300));--input-select-bg-color:var(--wpp-input-select-bg-color, transparent);--input-select-bg-color-hover:var(--wpp-input-select-bg-color-hover, var(--wpp-grey-color-200));--input-select-bg-color-active:var(--wpp-input-select-bg-color-active, var(--wpp-grey-color-300));--input-select-bg-color-disabled:var(--wpp-input-select-bg-color-disabled, var(--wpp-grey-color-100));--input-select-border-color:var(--wpp-input-select-border-color, var(--wpp-grey-color-500));--input-select-border-color-hover:var(--wpp-input-select-border-color-hover, var(--wpp-grey-color-700));--input-select-border-color-active:var(--wpp-input-select-border-color-active, var(--wpp-grey-color-800));--input-select-border-color-disabled:var(--wpp-input-select-border-color-disabled, var(--wpp-grey-color-400));--input-select-first-border-color-focus:var(--wpp-input-select-first-border-color-focus, var(--wpp-grey-color-000));--input-select-second-border-color-focus:var(--wpp-input-select-second-border-color-focus, var(--wpp-brand-color));--input-select-expanded-border-color:var(\n    --wpp-input-select-expanded-border-color,\n    var(--input-select-border-color-active)\n  );--input-select-expanded-border-color-hover:var(\n    --wpp-input-select-expanded-border-color-hover,\n    var(--input-select-border-color-active)\n  );--input-select-expanded-border-color-active:var(\n    --wpp-input-select-expanded-border-color-active,\n    var(--input-select-border-color-active)\n  );--input-select-icon-color:var(--wpp-input-select-icon-color, var(--wpp-icon-color));--input-select-icon-color-hover:var(--wpp-input-select-icon-color-hover, var(--wpp-icon-color-hover));--input-select-icon-color-active:var(--wpp-input-select-icon-color-active, var(--wpp-icon-color-active));--input-select-icon-color-disabled:var(--wpp-input-select-icon-color-disabled, var(--wpp-icon-color-disabled));--input-select-expanded-icon-color:var(--wpp-input-select-expanded-icon-color, var(--input-select-icon-color));--input-select-expanded-icon-color-hover:var(\n    --wpp-input-select-expanded-icon-color-hover,\n    var(--input-select-icon-color-hover)\n  );--input-select-expanded-icon-color-active:var(\n    --wpp-input-select-expanded-icon-color-active,\n    var(--input-select-icon-color-active)\n  );--input-select-border-width:var(--wpp-input-select-border-width, var(--wpp-border-width-s));--input-select-border-style:var(--wpp-input-select-border-style, solid);--input-select-dropdown-height:var(--wpp-input-select-dropdown-height, auto);--input-select-dropdown-max-height:var(--wpp-input-select-dropdown-max-height, 372px);--input-select-search-list-padding:var(--wpp-input-select-search-list-padding, 0);--input-select-search-list-wrapper-padding:var(--wpp-input-select-search-list-wrapper-padding, 8px);--input-select-search-empty-text-padding:var(--wpp-input-select-search-empty-text-padding, 12px 16px);--input-select-search-input-height:var(--wpp-input-select-search-input-height, 40px);--input-select-search-input-bg-color:var(--wpp-input-select-search-bg-color, var(--wpp-grey-color-000));--input-select-with-icon-padding-m:var(--wpp-input-select-with-icon-padding-m, 38px);--input-select-with-icon-padding-s:var(--wpp-input-select-with-icon-padding-s, 36px);--input-select-icon-start-margin-m:var(--wpp-input-select-icon-start-margin-m, 0 0 0 10px);--input-select-icon-start-margin-s:var(--wpp-input-select-icon-start-margin-s, 0 0 0 8px);--input-select-start-icon-color:var(--wpp-input-select-start-icon-color, var(--wpp-grey-color-600));--input-select-start-icon-color-active:var(--wpp-input-select-start-icon-color-active, var(--wpp-grey-color-600));--input-select-start-icon-color-hover:var(--wpp-input-select-start-icon-color-hover, var(--wpp-grey-color-600));--input-select-start-icon-color-disabled:var(\n    --wpp-input-select-start-icon-color-disabled,\n    var(--wpp-grey-color-400)\n  );--input-select-filled-start-icon-color:var(--wpp-input-select-filled-start-icon-color, var(--wpp-grey-color-800));--input-select-filled-start-icon-color-hover:var(\n    --wpp-input-select-filled-start-icon-color-hover,\n    var(--wpp-grey-color-800)\n  );--input-select-filled-pressed-start-icon-color:var(\n    --wpp-input-select-filled-pressed-start-icon-color,\n    var(--wpp-grey-color-900)\n  );--input-select-filled-active-start-icon-color:var(\n    --wpp-input-select-filled-active-start-icon-color,\n    var(--wpp-grey-color-800)\n  );position:relative;display:block;min-width:var(--input-select-min-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m));--input-select-folder-height:var(--wpp-input-select-folder-height, 48px);--input-select-folder-padding:var(--wpp-input-select-folder-padding, 8px);--input-select-folder-bg-color:var(--wpp-input-select-folder-bg-color, var(--wpp-grey-color-000));--input-select-dropdown-height:var(--wpp-input-select-dropdown-height, auto);--input-select-dropdown-max-height:var(--wpp-input-select-dropdown-max-height, 412px);--input-select-select-item-text-padding:var(--wpp-input-select-select-item-text-padding, 0 8px 0 0)}:host([type=multiple]) .wpp-list{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}:host([type=multiple]) .wpp-list::-webkit-scrollbar{width:7px}:host([type=multiple]) .wpp-list::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}:host([type=multiple]) .wpp-list::-webkit-scrollbar-track{margin-top:8px}:host([type=multiple]) .wrapper{position:relative}:host([type=multiple]) .wrapper.disabled{pointer-events:none}:host([type=multiple]) .wrapper.bottom-margin{margin-bottom:20px}:host([type=multiple]) .input-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color);border-radius:var(--wpp-border-radius-m);cursor:pointer;background-color:var(--input-select-bg-color)}:host([type=multiple]) .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color)}:host([type=multiple]) .input-wrapper.size-m{height:var(--input-select-height-m);padding:var(--input-select-padding-size-m)}:host([type=multiple]) .input-wrapper.size-m.with-icon-start{padding-left:var(--input-select-with-icon-padding-m)}:host([type=multiple]) .input-wrapper.size-s{height:var(--input-select-height-s);padding:var(--input-select-padding-size-s)}:host([type=multiple]) .input-wrapper.size-s.with-icon-start{padding-left:var(--input-select-with-icon-padding-s)}:host([type=multiple]) .input-wrapper.warning:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=multiple]) .input-wrapper.error:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=multiple]) .input-wrapper.disabled{color:var(--input-select-text-color-disabled);background:var(--input-select-bg-color-disabled);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-disabled)}:host([type=multiple]) .input-wrapper.disabled .wpp-icon-chevron{color:var(--input-select-icon-color-disabled)}:host([type=multiple]) .input-wrapper:hover{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=multiple]) .input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=multiple]) .input-wrapper:active{background-color:var(--input-select-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-active)}:host([type=multiple]) .input-wrapper:active .wpp-icon-chevron{color:var(--input-select-icon-color-active)}:host([type=multiple]) .input-wrapper:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color);outline:none}:host([type=multiple]) .input-wrapper.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--input-select-first-border-color-focus), 0 0 0 2px var(--input-select-second-border-color-focus);box-shadow:0 0 0 1px var(--input-select-first-border-color-focus), 0 0 0 2px var(--input-select-second-border-color-focus);background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=multiple]) .input-wrapper.tab-focus .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=multiple]) .input-wrapper.warning,:host([type=multiple]) .input-wrapper.warning:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=multiple]) .input-wrapper.warning.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=multiple]) .input-wrapper.error,:host([type=multiple]) .input-wrapper.error:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=multiple]) .input-wrapper.error.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=multiple]) .input-value{height:20px}:host([type=multiple]) .label{display:-ms-inline-flexbox;display:inline-flex;margin:var(--input-select-label-margin);cursor:pointer}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.warning{border-color:var(--wpp-warning-color-500)}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.error{border-color:var(--wpp-danger-color-500)}:host([type=multiple]) .icon-start{position:absolute;top:50%;display:-ms-flexbox;display:flex;max-width:20px;overflow:hidden;color:var(--input-select-start-icon-color);-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}:host([type=multiple]) .icon-start ::slotted(*){color:var(--input-select-start-icon-color)}:host([type=multiple]) .icon-start.size-m{margin:var(--input-select-icon-start-margin-m)}:host([type=multiple]) .icon-start.size-s{margin:var(--input-select-icon-start-margin-s)}:host([type=multiple]) .icon-start.disabled{color:var(--input-select-start-icon-color-disabled)}:host([type=multiple]) .icon-start.disabled ::slotted(*){color:var(--input-select-start-icon-color-disabled)}:host([type=multiple]) .icon-start.filled{color:var(--input-select-filled-start-icon-color)}:host([type=multiple]) .icon-start.filled ::slotted(*){color:var(--input-select-filled-start-icon-color)}:host([type=multiple]) .icon-start.filled:hover{color:var(--input-select-filled-start-icon-color-hover)}:host([type=multiple]) .icon-start.filled:hover ::slotted(*){color:var(--input-select-filled-start-icon-color-hover)}:host([type=multiple]) .icon-start.filled-active{color:var(--input-select-filled-active-start-icon-color)}:host([type=multiple]) .icon-start.filled-active ::slotted(*){color:var(--input-select-filled-active-start-icon-color)}:host([type=multiple]) .icon-start.filled-pressed{color:var(--input-select-filled-pressed-start-icon-color)}:host([type=multiple]) .icon-start.filled-pressed ::slotted(*){color:var(--input-select-filled-pressed-start-icon-color)}:host([type=multiple]) .input-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);position:relative;margin:0;padding-right:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=multiple]) .placeholder-active{color:var(--input-select-placeholder-color);width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=multiple]) .placeholder-active::after{left:0}:host([type=multiple]) .disabled-text{color:var(--input-select-text-color-disabled)}:host([type=multiple]) .input{position:absolute;bottom:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;opacity:0;pointer-events:none}:host([type=multiple]) .inline-message{position:absolute;margin:var(--input-select-inline-message-margin)}:host([type=multiple]) .wrapper>.input-wrapper .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper{border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color);background-color:var(--input-select-expanded-bg-color)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper:hover{background-color:var(--input-select-expanded-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color-hover)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-expanded-icon-color-hover)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper:active{background-color:var(--input-select-expanded-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color-active)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper:active .wpp-icon-chevron{color:var(--input-select-expanded-icon-color-active)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper .wpp-icon-chevron{color:var(--input-select-expanded-icon-color)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper.warning,:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper.warning:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper.warning.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper.error,:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper.error:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper.error.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=multiple]) .wrapper[aria-expanded=true]>.input-wrapper .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([type=multiple]) .text-wrap{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;overflow:hidden}:host([type=multiple]) .text-wrap .input-filled{position:relative;visibility:hidden}:host([type=multiple]) .text-wrap .selected-total-text{position:absolute;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host([type=multiple]) .text-wrap.disabled .selected-total-text{color:var(--input-select-text-color-disabled)}:host([type=multiple]) .wpp-menu-list{outline:none}:host([type=multiple]) .wpp-list{height:var(--input-select-dropdown-height);max-height:var(--input-select-dropdown-max-height);width:var(--custom-dropdown-width);overflow-y:auto}:host([type=multiple]) .wpp-list.hidden{display:none}:host([type=multiple]) .wpp-list.with-search{padding:var(--input-select-search-list-padding);padding-top:var(--input-select-search-input-height)}:host([type=multiple]) .wpp-list.with-search .search-wrapper{position:absolute;right:0;left:0;top:0;z-index:2}:host([type=multiple]) .wpp-list.with-search .search-wrapper .wpp-input{--text-input-height-m:var(--input-select-search-input-height);--wpp-border-radius-m:0;--text-input-border-width:0;--text-input-bg-color:var(--input-select-search-input-bg-color);--text-input-second-border-color-focus:transparent;--text-input-first-border-color-focus:transparent}:host([type=multiple]) .wpp-list.with-search .search-wrapper .wpp-input.size-m::part(input-label){padding-top:9px}:host([type=multiple]) .wpp-list.with-search .search-wrapper .wpp-input.size-s::part(input-label){padding-top:5px}:host([type=multiple]) .wpp-list.with-search .list-wrapper{padding:var(--input-select-search-list-wrapper-padding)}:host([type=multiple]) .wpp-list.with-search .empty-list{padding:0}:host([type=multiple]) .wpp-list.with-search .list-loading{padding-bottom:0}:host([type=multiple]) .wpp-list.with-search .empty-select-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);margin:0;padding:var(--input-select-search-empty-text-padding);text-align:left;color:var(--wpp-grey-color-700)}:host([type=multiple]) .wpp-list{height:var(--input-select-dropdown-height);max-height:var(--input-select-dropdown-max-height);width:var(--custom-dropdown-width);overflow-y:auto}:host([type=multiple]) .wpp-list.with-folder{padding-bottom:var(--input-select-folder-height)}:host([type=multiple]) .input-text-multiple{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:calc(100% - 8px)}:host([type=multiple]) .input-text-multiple .selected-item{display:-ms-flexbox;display:flex;padding:var(--input-select-select-item-text-padding);overflow:hidden}:host([type=multiple]) .input-text-multiple .selected-item .selected-item-text-wrapper{min-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=multiple]) .input-text-multiple .selected-item .select-item-divider{margin-left:-0.12em}:host([type=multiple]) .input-text-multiple.disabled .selected-total-text{color:var(--wpp-text-color-disabled)}:host([type=multiple]) .label{display:-ms-inline-flexbox;display:inline-flex;margin:var(--input-select-label-margin);cursor:pointer}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.warning{border-color:var(--wpp-warning-color-500)}:host([type=multiple]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.error{border-color:var(--wpp-danger-color-500)}:host([type=multiple]) .multiple-select-folder{position:absolute;bottom:0;right:0;left:0;background:var(--input-select-folder-bg-color);z-index:2;border-radius:0 0 var(--wpp-border-radius-s) var(--wpp-border-radius-s)}:host([type=multiple]) .multiple-select-folder .multiple-select-folder-buttons{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--input-select-folder-height);padding:var(--input-select-folder-padding)}:host([type=multiple]) .multiple-select-folder .multiple-select-clear-button{display:none}:host([type=multiple]) .multiple-select-folder .multiple-select-clear-button.visible{display:-ms-inline-flexbox;display:inline-flex}:host([type=multiple]) .input-wrapper:hover{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=multiple]) .input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=multiple]) .input-wrapper:active{background-color:var(--input-select-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-active)}:host([type=multiple]) .input-wrapper:active .wpp-icon-chevron{color:var(--input-select-icon-color-active)}:host([type=text]){--text-select-height:var(--wpp-text-select-height, auto);--text-select-padding:var(--wpp-text-select-padding, 1px 6px 1px 8px);--text-select-border-radius:var(--wpp-text-select-border-radius, var(--wpp-border-radius-s));--text-select-first-border-color-focus:var(--wpp-text-select-first-border-color-focus, var(--wpp-grey-color-000));--text-select-second-border-color-focus:var(--wpp-text-select-second-border-color-focus, var(--wpp-brand-color));--text-select-text-color-active:var(--wpp-text-select-text-color-active, var(--wpp-grey-color-1000));--text-select-text-color-disabled:var(--wpp-text-select-text-color-disabled, var(--wpp-text-color-disabled));--text-select-bg-color:var(--wpp-text-select-bg-color, var(--wpp-grey-color-000));--text-select-bg-color-hover:var(--wpp-text-select-bg-color-hover, var(--wpp-grey-color-200));--text-select-bg-color-active:var(--wpp-text-select-bg-color-active, var(--wpp-grey-color-300));--text-select-bg-color-expanded:var(--wpp-text-select-bg-color-expanded, var(--wpp-grey-color-200));--text-select-bg-color-disabled:var(--wpp-text-select-bg-color-disabled, transparent);--text-select-icon-color:var(--wpp-text-select-icon-color, var(--wpp-icon-color));--text-select-icon-color-hover:var(--wpp-text-select-icon-color-hover, var(--wpp-icon-color-hover));--text-select-icon-color-active:var(--wpp-text-select-icon-color-active, var(--wpp-icon-color-active));--text-select-icon-color-disabled:var(--wpp-text-select-icon-color-disabled, var(--wpp-icon-color-disabled));--input-select-min-width:var(--wpp-input-select-min-width, 80px);position:relative;display:-ms-inline-flexbox;display:inline-flex;height:var(--text-select-height);cursor:pointer;min-width:var(--input-select-min-width);max-width:var(--custom-dropdown-max-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m))}:host([type=text]) .wpp-list{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}:host([type=text]) .wpp-list::-webkit-scrollbar{width:7px}:host([type=text]) .wpp-list::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}:host([type=text]) .wpp-list::-webkit-scrollbar-track{margin-top:8px}:host([type=text]) .wpp-menu-list{max-width:100%}:host([type=text]) .wrapper{position:relative}:host([type=text]) .wrapper .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}:host([type=text]) .wrapper[aria-expanded=true] .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([type=text]) .wrapper[aria-expanded=true] .text-select-wrapper{background-color:var(--text-select-bg-color-expanded)}:host([type=text]) .wrapper.disabled{pointer-events:none}:host([type=text]) .wrapper.disabled .text-select-wrapper{cursor:not-allowed}:host([type=text]) .wpp-list{width:var(--custom-dropdown-width)}:host([type=text]) .text-select-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;padding:var(--text-select-padding);background-color:var(--text-select-bg-color);border-radius:var(--text-select-border-radius);outline:none}:host([type=text]) .text-select-wrapper.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--text-select-first-border-color-focus), 0 0 0 2px var(--text-select-second-border-color-focus);box-shadow:0 0 0 1px var(--text-select-first-border-color-focus), 0 0 0 2px var(--text-select-second-border-color-focus);background-color:var(--text-select-bg-color-hover)}:host([type=text]) .text-select-wrapper.tab-focus .wpp-icon-chevron{color:var(--text-select-icon-color-hover)}:host([type=text]) .text-select-wrapper .wpp-typography{padding-right:4px}:host([type=text]) .text-select-wrapper .wpp-icon-chevron{color:var(--text-select-icon-color)}:host([type=text]) .text-select-wrapper:hover{background-color:var(--text-select-bg-color-hover)}:host([type=text]) .text-select-wrapper:hover .wpp-icon-chevron{color:var(--text-select-icon-color-hover)}:host([type=text]) .text-select-wrapper:active{background-color:var(--text-select-bg-color-active)}:host([type=text]) .text-select-wrapper:active .wpp-icon-chevron{color:var(--text-select-icon-color-active)}:host([type=text]) .text-select-wrapper.disabled{background-color:var(--text-select-bg-color-disabled)}:host([type=text]) .text-select-wrapper.placeholder-active .wpp-typography{color:var(--text-select-text-color-active)}:host([type=text]) .truncated-text{max-width:100%;overflow:hidden}:host([type=text]) .truncated-text .text-select-wrapper{max-width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}:host([type=text]) .truncated-text .text-select-wrapper .tooltip{max-width:100%}:host([type=text]) .truncated-text .text-select-wrapper .tooltip::part(anchor){max-width:100%}:host([type=text]) .truncated-text .text-select-wrapper .wpp-typography{white-space:nowrap;text-overflow:ellipsis}:host([type=text]) .should-truncate .text-select-wrapper .wpp-typography{overflow:hidden}:host([type=combined]){--input-select-min-width:var(--wpp-input-select-min-width, 80px);--input-select-height-m:var(--wpp-input-select-height-m, 40px);--input-select-height-s:var(--wpp-input-select-height-s, 32px);--input-select-padding-size-m:var(\n    --wpp-input-select-padding-size-m,\n    calc(9px - var(--input-select-border-width)) 10px calc(9px - var(--input-select-border-width)) 12px\n  );--input-select-padding-size-s:var(\n    --wpp-input-select-padding-size-s,\n    calc(5px - var(--input-select-border-width)) 10px calc(5px - var(--input-select-border-width)) 12px\n  );--input-select-inline-message-margin:var(--wpp-input-select-inline-message-margin, 4px 0 0 0);--input-select-placeholder-color:var(--wpp-input-select-placeholder-color, var(--wpp-grey-color-1000));--input-select-text-color-disabled:var(--wpp-input-select-text-color-disabled, var(--wpp-text-color-disabled));--input-select-label-margin:var(--wpp-input-select-label-margin, 0 0 8px 0);--input-select-expanded-bg-color:var(--wpp-input-select-expanded-bg-color, var(--wpp-grey-color-000));--input-select-expanded-bg-color-hover:var(--wpp-input-select-expanded-bg-color-hover, var(--wpp-grey-color-000));--input-select-expanded-bg-color-active:var(--wpp-input-select-expanded-bg-color-active, var(--wpp-grey-color-300));--input-select-bg-color:var(--wpp-input-select-bg-color, transparent);--input-select-bg-color-hover:var(--wpp-input-select-bg-color-hover, var(--wpp-grey-color-200));--input-select-bg-color-active:var(--wpp-input-select-bg-color-active, var(--wpp-grey-color-300));--input-select-bg-color-disabled:var(--wpp-input-select-bg-color-disabled, var(--wpp-grey-color-100));--input-select-border-color:var(--wpp-input-select-border-color, var(--wpp-grey-color-500));--input-select-border-color-hover:var(--wpp-input-select-border-color-hover, var(--wpp-grey-color-700));--input-select-border-color-active:var(--wpp-input-select-border-color-active, var(--wpp-grey-color-800));--input-select-border-color-disabled:var(--wpp-input-select-border-color-disabled, var(--wpp-grey-color-400));--input-select-first-border-color-focus:var(--wpp-input-select-first-border-color-focus, var(--wpp-grey-color-000));--input-select-second-border-color-focus:var(--wpp-input-select-second-border-color-focus, var(--wpp-brand-color));--input-select-expanded-border-color:var(\n    --wpp-input-select-expanded-border-color,\n    var(--input-select-border-color-active)\n  );--input-select-expanded-border-color-hover:var(\n    --wpp-input-select-expanded-border-color-hover,\n    var(--input-select-border-color-active)\n  );--input-select-expanded-border-color-active:var(\n    --wpp-input-select-expanded-border-color-active,\n    var(--input-select-border-color-active)\n  );--input-select-icon-color:var(--wpp-input-select-icon-color, var(--wpp-icon-color));--input-select-icon-color-hover:var(--wpp-input-select-icon-color-hover, var(--wpp-icon-color-hover));--input-select-icon-color-active:var(--wpp-input-select-icon-color-active, var(--wpp-icon-color-active));--input-select-icon-color-disabled:var(--wpp-input-select-icon-color-disabled, var(--wpp-icon-color-disabled));--input-select-expanded-icon-color:var(--wpp-input-select-expanded-icon-color, var(--input-select-icon-color));--input-select-expanded-icon-color-hover:var(\n    --wpp-input-select-expanded-icon-color-hover,\n    var(--input-select-icon-color-hover)\n  );--input-select-expanded-icon-color-active:var(\n    --wpp-input-select-expanded-icon-color-active,\n    var(--input-select-icon-color-active)\n  );--input-select-border-width:var(--wpp-input-select-border-width, var(--wpp-border-width-s));--input-select-border-style:var(--wpp-input-select-border-style, solid);--input-select-dropdown-height:var(--wpp-input-select-dropdown-height, auto);--input-select-dropdown-max-height:var(--wpp-input-select-dropdown-max-height, 372px);--input-select-search-list-padding:var(--wpp-input-select-search-list-padding, 0);--input-select-search-list-wrapper-padding:var(--wpp-input-select-search-list-wrapper-padding, 8px);--input-select-search-empty-text-padding:var(--wpp-input-select-search-empty-text-padding, 12px 16px);--input-select-search-input-height:var(--wpp-input-select-search-input-height, 40px);--input-select-search-input-bg-color:var(--wpp-input-select-search-bg-color, var(--wpp-grey-color-000));--input-select-with-icon-padding-m:var(--wpp-input-select-with-icon-padding-m, 38px);--input-select-with-icon-padding-s:var(--wpp-input-select-with-icon-padding-s, 36px);--input-select-icon-start-margin-m:var(--wpp-input-select-icon-start-margin-m, 0 0 0 10px);--input-select-icon-start-margin-s:var(--wpp-input-select-icon-start-margin-s, 0 0 0 8px);--input-select-start-icon-color:var(--wpp-input-select-start-icon-color, var(--wpp-grey-color-600));--input-select-start-icon-color-active:var(--wpp-input-select-start-icon-color-active, var(--wpp-grey-color-600));--input-select-start-icon-color-hover:var(--wpp-input-select-start-icon-color-hover, var(--wpp-grey-color-600));--input-select-start-icon-color-disabled:var(\n    --wpp-input-select-start-icon-color-disabled,\n    var(--wpp-grey-color-400)\n  );--input-select-filled-start-icon-color:var(--wpp-input-select-filled-start-icon-color, var(--wpp-grey-color-800));--input-select-filled-start-icon-color-hover:var(\n    --wpp-input-select-filled-start-icon-color-hover,\n    var(--wpp-grey-color-800)\n  );--input-select-filled-pressed-start-icon-color:var(\n    --wpp-input-select-filled-pressed-start-icon-color,\n    var(--wpp-grey-color-900)\n  );--input-select-filled-active-start-icon-color:var(\n    --wpp-input-select-filled-active-start-icon-color,\n    var(--wpp-grey-color-800)\n  );position:relative;display:block;min-width:var(--input-select-min-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m));--combined-select-border-color:var(--wpp-combined-select-border-color, var(--wpp-grey-color-500));--combined-select-border-color-hover:var(--wpp-combined-select-border-color-hover, var(--wpp-grey-color-700));--combined-select-border-color-active:var(--wpp-combined-select-border-color-active, var(--wpp-grey-color-800));--combined-select-first-border-color-focus:var(--wpp-combined-select-first-border-color-focus, var(--wpp-grey-color-000));--combined-select-second-border-color-focus:var(--wpp-combined-select-second-border-color-focus, var(--wpp-brand-color));--combined-select-bg-color:var(--wpp-combined-select-bg-color, var(--wpp-grey-color-100));--combined-select-bg-color-hover:var(--wpp-combined-select-bg-color-hover, var(--wpp-grey-color-200));--combined-select-bg-color-active:var(--wpp-combined-select-bg-color-active, var(--wpp-grey-color-100));--combined-select-icon-color-hover:var(--wpp-combined-select-icon-color-hover, var(--wpp-icon-color-hover));--combined-select-inline-message-margin:var(--wpp-combined-select-inline-message-margin, 4px 0 0 0);--combined-select-option-padding:var(--wpp-combined-select-option-padding, 0 8px 0 0);--combined-select-height:var(--wpp-combined-select-height, 40px);--combined-select-width:var(--wpp-combined-select-width, 260px);--combined-select-menu-width:var(--wpp-combined-select-menu-width, auto);--combined-select-text-input-width:var(--wpp-combined-select-text-input-width, 100%);--combined-select-label-margin:var(--wpp-combined-select-label-margin, 0 0 8px 0);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;width:var(--combined-select-width)}:host([type=combined]) .wpp-list{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}:host([type=combined]) .wpp-list::-webkit-scrollbar{width:7px}:host([type=combined]) .wpp-list::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}:host([type=combined]) .wpp-list::-webkit-scrollbar-track{margin-top:8px}:host([type=combined]) .wrapper{position:relative}:host([type=combined]) .wrapper.disabled{pointer-events:none}:host([type=combined]) .wrapper.bottom-margin{margin-bottom:20px}:host([type=combined]) .input-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color);border-radius:var(--wpp-border-radius-m);cursor:pointer;background-color:var(--input-select-bg-color)}:host([type=combined]) .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color)}:host([type=combined]) .input-wrapper.size-m{height:var(--input-select-height-m);padding:var(--input-select-padding-size-m)}:host([type=combined]) .input-wrapper.size-m.with-icon-start{padding-left:var(--input-select-with-icon-padding-m)}:host([type=combined]) .input-wrapper.size-s{height:var(--input-select-height-s);padding:var(--input-select-padding-size-s)}:host([type=combined]) .input-wrapper.size-s.with-icon-start{padding-left:var(--input-select-with-icon-padding-s)}:host([type=combined]) .input-wrapper.warning:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=combined]) .input-wrapper.error:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=combined]) .input-wrapper.disabled{color:var(--input-select-text-color-disabled);background:var(--input-select-bg-color-disabled);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-disabled)}:host([type=combined]) .input-wrapper.disabled .wpp-icon-chevron{color:var(--input-select-icon-color-disabled)}:host([type=combined]) .input-wrapper:hover{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=combined]) .input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=combined]) .input-wrapper:active{background-color:var(--input-select-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-active)}:host([type=combined]) .input-wrapper:active .wpp-icon-chevron{color:var(--input-select-icon-color-active)}:host([type=combined]) .input-wrapper:focus{border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color);outline:none}:host([type=combined]) .input-wrapper.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--input-select-first-border-color-focus), 0 0 0 2px var(--input-select-second-border-color-focus);box-shadow:0 0 0 1px var(--input-select-first-border-color-focus), 0 0 0 2px var(--input-select-second-border-color-focus);background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=combined]) .input-wrapper.tab-focus .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=combined]) .input-wrapper.warning,:host([type=combined]) .input-wrapper.warning:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=combined]) .input-wrapper.warning.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=combined]) .input-wrapper.error,:host([type=combined]) .input-wrapper.error:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=combined]) .input-wrapper.error.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=combined]) .input-value{height:20px}:host([type=combined]) .label{display:-ms-inline-flexbox;display:inline-flex;margin:var(--input-select-label-margin);cursor:pointer}:host([type=combined]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper{background:var(--input-select-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-border-color-hover)}:host([type=combined]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper .wpp-icon-chevron{color:var(--input-select-icon-color-hover)}:host([type=combined]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.warning{border-color:var(--wpp-warning-color-500)}:host([type=combined]) .label:hover:not(.focused,.disabled)+.wpp-menu-list .trigger-element .input-wrapper.error{border-color:var(--wpp-danger-color-500)}:host([type=combined]) .icon-start{position:absolute;top:50%;display:-ms-flexbox;display:flex;max-width:20px;overflow:hidden;color:var(--input-select-start-icon-color);-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}:host([type=combined]) .icon-start ::slotted(*){color:var(--input-select-start-icon-color)}:host([type=combined]) .icon-start.size-m{margin:var(--input-select-icon-start-margin-m)}:host([type=combined]) .icon-start.size-s{margin:var(--input-select-icon-start-margin-s)}:host([type=combined]) .icon-start.disabled{color:var(--input-select-start-icon-color-disabled)}:host([type=combined]) .icon-start.disabled ::slotted(*){color:var(--input-select-start-icon-color-disabled)}:host([type=combined]) .icon-start.filled{color:var(--input-select-filled-start-icon-color)}:host([type=combined]) .icon-start.filled ::slotted(*){color:var(--input-select-filled-start-icon-color)}:host([type=combined]) .icon-start.filled:hover{color:var(--input-select-filled-start-icon-color-hover)}:host([type=combined]) .icon-start.filled:hover ::slotted(*){color:var(--input-select-filled-start-icon-color-hover)}:host([type=combined]) .icon-start.filled-active{color:var(--input-select-filled-active-start-icon-color)}:host([type=combined]) .icon-start.filled-active ::slotted(*){color:var(--input-select-filled-active-start-icon-color)}:host([type=combined]) .icon-start.filled-pressed{color:var(--input-select-filled-pressed-start-icon-color)}:host([type=combined]) .icon-start.filled-pressed ::slotted(*){color:var(--input-select-filled-pressed-start-icon-color)}:host([type=combined]) .input-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);position:relative;margin:0;padding-right:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=combined]) .placeholder-active{color:var(--input-select-placeholder-color);width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([type=combined]) .placeholder-active::after{left:0}:host([type=combined]) .disabled-text{color:var(--input-select-text-color-disabled)}:host([type=combined]) .input{position:absolute;bottom:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;opacity:0;pointer-events:none}:host([type=combined]) .inline-message{position:absolute;margin:var(--input-select-inline-message-margin)}:host([type=combined]) .wrapper>.input-wrapper .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper{border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color);background-color:var(--input-select-expanded-bg-color)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper:hover{background-color:var(--input-select-expanded-bg-color-hover);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color-hover)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper:hover .wpp-icon-chevron{color:var(--input-select-expanded-icon-color-hover)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper:active{background-color:var(--input-select-expanded-bg-color-active);border:var(--input-select-border-width) var(--input-select-border-style) var(--input-select-expanded-border-color-active)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper:active .wpp-icon-chevron{color:var(--input-select-expanded-icon-color-active)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper .wpp-icon-chevron{color:var(--input-select-expanded-icon-color)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper.warning,:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper.warning:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-warning-color-400)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper.warning.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper.error,:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper.error:hover{border:var(--input-select-border-width) var(--input-select-border-style) var(--wpp-danger-color-400)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper.error.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=combined]) .wrapper[aria-expanded=true]>.input-wrapper .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([type=combined]) .text-wrap{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;overflow:hidden}:host([type=combined]) .text-wrap .input-filled{position:relative;visibility:hidden}:host([type=combined]) .text-wrap .selected-total-text{position:absolute;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host([type=combined]) .text-wrap.disabled .selected-total-text{color:var(--input-select-text-color-disabled)}:host([type=combined]) .wpp-menu-list{outline:none}:host([type=combined]) .wpp-list{height:var(--input-select-dropdown-height);max-height:var(--input-select-dropdown-max-height);width:var(--custom-dropdown-width);overflow-y:auto}:host([type=combined]) .wpp-list.hidden{display:none}:host([type=combined]) .wpp-list.with-search{padding:var(--input-select-search-list-padding);padding-top:var(--input-select-search-input-height)}:host([type=combined]) .wpp-list.with-search .search-wrapper{position:absolute;right:0;left:0;top:0;z-index:2}:host([type=combined]) .wpp-list.with-search .search-wrapper .wpp-input{--text-input-height-m:var(--input-select-search-input-height);--wpp-border-radius-m:0;--text-input-border-width:0;--text-input-bg-color:var(--input-select-search-input-bg-color);--text-input-second-border-color-focus:transparent;--text-input-first-border-color-focus:transparent}:host([type=combined]) .wpp-list.with-search .search-wrapper .wpp-input.size-m::part(input-label){padding-top:9px}:host([type=combined]) .wpp-list.with-search .search-wrapper .wpp-input.size-s::part(input-label){padding-top:5px}:host([type=combined]) .wpp-list.with-search .list-wrapper{padding:var(--input-select-search-list-wrapper-padding)}:host([type=combined]) .wpp-list.with-search .empty-list{padding:0}:host([type=combined]) .wpp-list.with-search .list-loading{padding-bottom:0}:host([type=combined]) .wpp-list.with-search .empty-select-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);margin:0;padding:var(--input-select-search-empty-text-padding);text-align:left;color:var(--wpp-grey-color-700)}:host([type=combined]) .combined-input-wrapper{display:-ms-inline-flexbox;display:inline-flex;outline:none}:host([type=combined]) .combined-input-wrapper:focus-visible{border-radius:var(--wpp-border-radius-m);outline:none;-webkit-box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--combined-select-second-border-color-focus);box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--combined-select-second-border-color-focus)}:host([type=combined]) .combined-input-wrapper:focus-visible .single-select-input,:host([type=combined]) .combined-input-wrapper:focus-visible .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper:focus-visible .wpp-input::part(input-label){border-color:var(--combined-select-border-color);background-color:var(--combined-select-bg-color)}:host([type=combined]) .combined-input-wrapper .single-select-input .input-text{padding:var(--combined-select-option-padding)}:host([type=combined]) .combined-input-wrapper:hover .single-select-input,:host([type=combined]) .combined-input-wrapper:hover .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper:hover .wpp-input::part(input-label){border-color:var(--combined-select-border-color-hover);background-color:var(--combined-select-bg-color-hover)}:host([type=combined]) .combined-input-wrapper.focused:hover .single-select-input,:host([type=combined]) .combined-input-wrapper.focused:hover .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper.focused:hover .wpp-input::part(input-label){background-color:var(--combined-select-bg-color-active)}:host([type=combined]) .combined-input-wrapper.focused:hover .wpp-input::part(input-label){background-color:transparent}:host([type=combined]) .combined-input-wrapper.focused .single-select-input,:host([type=combined]) .combined-input-wrapper.focused .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper.focused .wpp-input::part(input-label){border-color:var(--combined-select-border-color-active)}:host([type=combined]) .combined-input-wrapper.warning:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=combined]) .combined-input-wrapper.warning .single-select-input,:host([type=combined]) .combined-input-wrapper.warning .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper.warning .wpp-input::part(input-label){border-color:var(--wpp-warning-color-400)}:host([type=combined]) .combined-input-wrapper.warning .wpp-menu-list:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-warning-color-400)}:host([type=combined]) .combined-input-wrapper.warning .wpp-menu-list:focus-visible::after{background-color:var(--wpp-warning-color-400)}:host([type=combined]) .combined-input-wrapper.warning:hover .single-select-input,:host([type=combined]) .combined-input-wrapper.warning:hover .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper.warning:hover .wpp-input::part(input-label){border-color:var(--wpp-warning-color-500)}:host([type=combined]) .combined-input-wrapper.error:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=combined]) .combined-input-wrapper.error .single-select-input,:host([type=combined]) .combined-input-wrapper.error .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper.error .wpp-input::part(input-label){border-color:var(--wpp-danger-color-400)}:host([type=combined]) .combined-input-wrapper.error .wpp-menu-list:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--combined-select-first-border-color-focus), 0 0 0 2px var(--wpp-danger-color-400)}:host([type=combined]) .combined-input-wrapper.error .wpp-menu-list:focus-visible::after{background-color:var(--wpp-warning-color-400)}:host([type=combined]) .combined-input-wrapper.error:hover .single-select-input,:host([type=combined]) .combined-input-wrapper.error:hover .wpp-input::part(input),:host([type=combined]) .combined-input-wrapper.error:hover .wpp-input::part(input-label){border-color:var(--wpp-danger-color-500)}:host([type=combined]) .wpp-input{width:var(--combined-select-text-input-width)}:host([type=combined]) .wpp-inline-message{margin:var(--combined-select-inline-message-margin)}:host([type=combined]) .label{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin:var(--combined-select-label-margin)}:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper .single-select-input,:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper .wpp-text-input::part(input),:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper .wpp-input::part(input-label){border-color:var(--combined-select-border-color);background-color:var(--combined-select-bg-color)}:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper.error .single-select-input,:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper.error .wpp-text-input::part(input),:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper.error .wpp-input::part(input-label){border-color:var(--wpp-danger-color-500)}:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper.warning .single-select-input,:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper.warning .wpp-text-input::part(input),:host([type=combined]) .label:hover:not(.disabled)+.combined-input-wrapper.warning .wpp-input::part(input-label){border-color:var(--wpp-warning-color-500)}:host([type=combined]) .single-select-input{border-top-right-radius:0;border-bottom-right-radius:0}:host([type=combined]) .single-select-input:hover{background-color:var(--combined-select-bg-color-active)}:host([type=combined]) .single-select-input:hover .wpp-icon-chevron{color:var(--combined-select-icon-color-hover)}:host([type=combined]) .wpp-input::part(input),:host([type=combined]) .wpp-input::part(input-label){border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host([disabled]:not([disabled=false])):host([type=combined]) .combined-input-wrapper{pointer-events:none}:host([disabled]:not([disabled=false])):host([type=text]) .wpp-icon-chevron{color:var(--text-select-icon-color-disabled)}:host([disabled]:not([disabled=false])):host([type=text]) .wpp-typography{color:var(--text-select-text-color-disabled)}:host([disabled]:not([disabled=false])):host([disabled]:not([disabled=false]):active){pointer-events:none}:host .infinite-loader{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px}:host .wpp-list{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;--list-max-width:var(--wpp-list-max-width, 100%);width:var(--custom-dropdown-width, auto);max-width:var(--list-max-width);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .wpp-list::-webkit-scrollbar{width:8px;height:8px}:host .wpp-list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}:host .wpp-list ::slotted(.wpp-list-item){--li-width:100%;width:100%;margin-bottom:4px}:host([type=text]) .wpp-portal{max-width:var(--custom-dropdown-max-width)}";

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
const MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH = 10;
const TRUNCATION_DELAY = 100;
const SELECT_OPTION_TAG_NAME = 'wpp-list-item';
const MULTIPLE_SELECT_SINGLE_VALUE_ERROR = 'Value should be an Array in the multiple select.';
const getInitFocusInfo = () => ({
  input: FOCUS_TYPE.NONE,
  listItem: FOCUS_TYPE.NONE,
});
const WppSelect = /*@__PURE__*/ proxyCustomElement(class WppSelect extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppSearchValueChange = createEvent(this, "wppSearchValueChange", 1);
    this.totalItems = 0;
    this.multipleSelectDropdownHeight = 412;
    this.singleSelectDropdownHeight = 372;
    this.enabledElements = [];
    this.observers = [];
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.getEnabledItems = () => {
      this.host.childNodes.forEach(el => {
        const item = el;
        if (item.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() && !item.disabled) {
          this.enabledElements.push(item);
        }
      });
    };
    this.disableNonSelectedItems = () => {
      this.enabledElements.forEach(el => {
        if (el.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() && !el.checked) {
          el.disabled = true;
        }
      });
    };
    this.enableListItems = () => {
      this.enabledElements.forEach(el => {
        el.removeAttribute('disabled');
      });
    };
    this.validateMaxSelected = () => {
      if (!this.maximumSelectedItems)
        return;
      this.activeItems.length === this.maximumSelectedItems ? this.disableNonSelectedItems() : this.enableListItems();
    };
    this.isOptionsValueEqual = (leftValue, rightValue) => {
      if (this.withCustomValue) {
        const leftValueArray = Array.isArray(leftValue) ? leftValue : [leftValue];
        const rightValueArray = Array.isArray(rightValue) ? rightValue : [rightValue];
        return isEqual_1(leftValueArray.map(this.getOptionId), rightValueArray.map(this.getOptionId));
      }
      return isEqual_1(leftValue, rightValue);
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.handleInputChange = (event) => {
      this.inputValue = String(event.detail.value);
      this.wppChange.emit({
        value: this.value,
        inputValue: this.inputValue,
        name: this.name,
      });
    };
    this.countDisplayedItems = () => {
      this.displayedItemsCount = Array.from(this.host.querySelectorAll(`.${SELECT_OPTION_TAG_NAME}`)).filter((item) => !item.hidden).length;
    };
    this.hasSimpleSearch = () => !this.infinite;
    this.handleSearch = (initSearchText) => {
      setTimeout(() => {
        this.updateScrollState();
      }, 0);
      const searchText = initSearchText.trim();
      this.searchText = searchText;
      const isOnSearch = Boolean(searchText.length);
      this.isOnSearch = isOnSearch;
      if (!this.hasSimpleSearch()) {
        this.wppSearchValueChange.emit(searchText);
      }
      let isEveryItemHidden = true;
      const hasRedundantSpace = new RegExp(/^\s\s+|\s\s+$/, 'g').test(searchText);
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          element.setAttribute('highlight', searchText);
          const chunks = highlightWords({
            text: element.textContent || '',
            query: searchText,
            matchExactly: true,
          });
          if (!isOnSearch || (!hasRedundantSpace && chunks.some(el => el.match))) {
            isEveryItemHidden = false;
            element.removeAttribute('hidden');
          }
          else {
            element.setAttribute('hidden', 'true');
          }
        }
      });
      this.isEmpty = isOnSearch && isEveryItemHidden && !this.isInfiniteLoading && !this.loading;
    };
    this.updateScrollState = () => {
      const scrollHeight = this.menuRef?.scrollHeight || 0;
      const maxHeight = this.type === 'multiple' ? this.multipleSelectDropdownHeight : this.singleSelectDropdownHeight;
      this.withScroll = scrollHeight > maxHeight;
    };
    this.findParentModal = () => {
      // Set current to the host element as default value
      let current = this.host;
      while (current) {
        // Check if current element is one of the modals
        if (current.tagName &&
          [
            transformToVersionedTag('wpp-modal').toUpperCase(),
            transformToVersionedTag('wpp-side-modal').toUpperCase(),
            transformToVersionedTag('wpp-full-screen-modal').toUpperCase(),
          ].includes(current.tagName)) {
          const dialog = current.shadowRoot?.querySelector('[role="dialog"]');
          return dialog || current;
        }
        current = current?.parentElement;
        // If there is no parent element, break the loop and return null (not in modal)
        if (!current)
          break;
      }
      return null;
    };
    this.updateDropdownHeight = () => {
      const isSmallWindowHeight = window.innerHeight < 800;
      if (!this.menuRef)
        return;
      if (this.isInModal) {
        Object.assign(this.menuRef?.style, {
          '--input-select-dropdown-max-height': 'none',
          width: '100%',
        });
        return;
      }
      if (this.type === 'single') {
        this.singleSelectDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.6 : 372;
        this.menuRef?.style.setProperty('--input-select-dropdown-max-height', `${this.singleSelectDropdownHeight}px`);
      }
      if (this.type === 'multiple') {
        this.multipleSelectDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.7 : 412;
        this.menuRef?.style.setProperty('--input-select-dropdown-max-height', `${this.multipleSelectDropdownHeight}px`);
      }
    };
    this.onWindowResize = () => {
      if (['multiple', 'single'].includes(this.type)) {
        this.updateDropdownHeight();
      }
    };
    this.customDropdownConfig = () => ({
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          {
            name: 'applyStyles',
            fn: ({ state }) => {
              // Get the reference element (trigger element)
              const referenceRect = state.elements.reference.getBoundingClientRect();
              // Get the modal element
              const modalRect = this.modalRef?.getBoundingClientRect();
              if (!modalRect)
                return;
              // Get the modal's scroll position
              const modalScrollTop = this.modalRef?.scrollTop || 0;
              const modalScrollLeft = this.modalRef?.scrollLeft || 0;
              // Calculate position relative to modal
              const left = referenceRect.left - modalRect.left + modalScrollLeft;
              const modalHeight = modalRect.height;
              const actualDropdownHeight = state.elements.popper.getBoundingClientRect().height;
              let top = 0;
              let maxDropdownHeight = 0;
              const isSmallWindowHeight = window.innerHeight < 800;
              if (this.type === 'single') {
                maxDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.4 : this.singleSelectDropdownHeight;
              }
              if (this.type === 'multiple') {
                maxDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.4 : this.multipleSelectDropdownHeight;
              }
              // If the dropdown height is less than the predefined max height, set the dropdown height to the actual height
              let dropdownHeight = maxDropdownHeight > actualDropdownHeight ? actualDropdownHeight : maxDropdownHeight;
              // Calculate available space above and below the reference element
              const availableSpaceAbove = referenceRect.top - modalRect.top + modalScrollTop;
              const availableSpaceBelow = modalHeight - (referenceRect.bottom - modalRect.top + modalScrollTop);
              if (availableSpaceBelow > dropdownHeight) {
                // If there is enough space below, position the dropdown below the reference element and update the top position
                top = referenceRect.bottom - modalRect.top + modalScrollTop;
              }
              else if (availableSpaceAbove >= dropdownHeight) {
                // If there is enough space above, position the dropdown above the reference element and update the top position
                top = referenceRect.top - modalRect.top + modalScrollTop - dropdownHeight;
              }
              else if (availableSpaceAbove < dropdownHeight && availableSpaceBelow <= dropdownHeight) {
                // If there is not enough space above and below, checking where there is more space
                if (availableSpaceAbove <= availableSpaceBelow) {
                  dropdownHeight = availableSpaceBelow;
                }
                else {
                  dropdownHeight = availableSpaceAbove;
                  // Update the top position to be above the reference element
                  top = referenceRect.top - modalRect.top + modalScrollTop - dropdownHeight;
                }
              }
              /**
               * We need to set tippyBox and tippyContent to display flex and width 100% to make the dropdown a correct size
               */
              const tippyBoxEl = state.elements.popper.querySelector('.tippy-box');
              if (tippyBoxEl) {
                tippyBoxEl.style.width = '100%';
              }
              const tippyContentEl = state.elements.popper.querySelector('.tippy-content');
              if (tippyContentEl) {
                tippyContentEl.style.width = '100%';
              }
              const maxHeight = Math.min(modalRect.height, this.type === 'multiple' ? 412 : 372);
              this.menuRef?.style.setProperty('--input-select-dropdown-max-height', `${maxHeight}px`);
              // Update the dropdown position
              Object.assign(state.elements.popper.style, {
                display: 'flex',
                position: 'fixed',
                left: `${left}px`,
                top: `${top}px`,
                maxHeight: `${maxHeight}px`,
              });
            },
          },
        ],
      },
    });
    this.shouldShowSearch = () => {
      if (!this.host || typeof this.host.getAttributeNames !== 'function')
        return false;
      return ((this.host?.getAttributeNames().includes('with-search') && !['auto', false].includes(this.withSearch)) ||
        (this.withSearch === 'auto' && this.displayedItemsCount >= MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH));
    };
    this.changeSlotsAttribute = (attributeValue) => {
      const contentSlots = this.host?.querySelectorAll(`.${SELECT_OPTION_TAG_NAME}`);
      contentSlots.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          element.setAttribute('container-state', attributeValue);
        }
      });
    };
    this.handleMenuListShow = (instance) => {
      this.triggerEl?.setAttribute('aria-expanded', 'true');
      if (['multiple', 'single'].includes(this.type)) {
        this.updateDropdownHeight();
        this.updateScrollState();
        this.isFocused = true;
      }
      this.changeSlotsAttribute('shown');
      if (this.dropdownConfig?.onShow) {
        return this.dropdownConfig.onShow(instance);
      }
    };
    this.handleMenuListHide = (instance) => {
      this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.NONE);
      this.triggerEl?.setAttribute('aria-expanded', 'false');
      this.changeSlotsAttribute('hidden');
      if (['multiple', 'single'].includes(this.type) && this.shouldShowSearch()) {
        setTimeout(() => {
          this.isOnSearch = false;
          this.handleSearch('');
        }, 300);
      }
      if (this.dropdownConfig?.onHide) {
        return this.dropdownConfig.onHide(instance);
      }
    };
    this.getValueFromDOM = () => Array.from(this.host.childNodes).reduce((acc, el) => {
      const element = el;
      if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
        !element.disabled &&
        element.checked) {
        if (this.type === 'multiple') {
          acc.push(element.value);
        }
        else {
          acc = element.value;
        }
      }
      return acc;
    }, (this.type === 'multiple' ? [] : ''));
    this.updateIsFilled = () => {
      const selectedItems = Array.from(this.inputRef.querySelectorAll('.selected-item-text-wrapper') || []);
      this.isInputFilled = selectedItems.some(el => el.clientWidth < el.scrollWidth);
    };
    this.setMultipleTextToDisplay = () => {
      this.selectedItemsTextList = Array.from(this.activeItems)
        .filter(el => el.multiple)
        .slice(0, this.maxItemsToDisplay)
        .map(el => {
        if (this.withCustomValue) {
          return this.getOptionLabel(el.value);
        }
        return el.querySelector('[slot="label"]')?.textContent || el.textContent || '';
      });
      this.textToDisplay =
        this.activeItems.length > this.maxItemsToDisplay ? String(this.activeItems.length - this.maxItemsToDisplay) : '';
    };
    this.anyClearable = () => {
      let anyClearable = false;
      this.activeItems.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          element.checked &&
          !element.disabled) {
          anyClearable = true;
        }
      });
      return anyClearable;
    };
    this.handleClearAll = (e) => {
      if (e) {
        this.hasClickedBtn = true;
      }
      const oldValue = this.value;
      const selectionList = [];
      this.activeItems.forEach(el => {
        const element = el;
        if (element.disabled) {
          selectionList.push(element.value);
        }
      });
      this.value = [...new Set([...selectionList])];
      if (!this.isOptionsValueEqual(oldValue, this.value)) {
        this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
      }
    };
    this.canSelectAll = () => {
      let selectableCount = 0;
      if (this.maximumSelectedItems)
        return false;
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          !element.checked &&
          !element.hidden &&
          !element.disabled) {
          selectableCount++;
        }
      });
      return (selectableCount > 0 &&
        (!this.maximumSelectedItems || this.activeItems.length + selectableCount <= this.maximumSelectedItems));
    };
    this.handleSelectAll = () => {
      this.hasClickedBtn = true;
      const oldValue = this.value;
      const selectionList = [];
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          (element.checked || !element.disabled)) {
          selectionList.push(element.value);
        }
      });
      this.value = [...new Set([...selectionList])];
      if (!this.isOptionsValueEqual(oldValue, this.value)) {
        this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
      }
    };
    this.handleShouldCloseOnOutsideClick = (event) => event.target !== this.host && !isEventTargetContained(this.host, event);
    this.canLoadMore = () => this.infinite && !this.infiniteLastPage && this.loadMore && !this.isInfiniteLoading;
    this.requestLoadMore = () => {
      if (this.loadMore) {
        this.isInfiniteLoading = true;
        const promise = this.loadMore().finally(() => {
          if (!promise.cancelled) {
            this.isInfiniteLoading = false;
            this.infiniteLoadingPromise = undefined;
          }
        });
        this.infiniteLoadingPromise = promise;
      }
    };
    this.scrollOptionsToTop = () => {
      if (this.menuRef) {
        this.menuRef.scrollTop = 0;
      }
    };
    this.handleOptionsScroll = (event) => {
      if (this.canLoadMore()) {
        const container = event.target;
        const scrolledToBottom = container.scrollHeight - container.clientHeight - container.scrollTop;
        if (scrolledToBottom < INFINITE_SCROLL_THRESHOLD) {
          this.requestLoadMore();
        }
      }
    };
    this.handleLabelClick = () => {
      const host = this.host.shadowRoot;
      if (['multiple', 'single', 'text'].includes(this.type)) {
        const triggerElement = host.querySelector('.trigger-element');
        triggerElement.click();
        if (this.type === 'text') {
          triggerElement.focus();
        }
        else {
          const input = host.querySelector('.input');
          input.focus();
        }
      }
      if (this.type === 'combined') {
        const input = host.querySelector('.wpp-input')?.shadowRoot?.querySelector('input');
        input.select();
      }
    };
    this.onFocus = (event) => {
      this.isFocused = true;
      this.wppFocus.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.MOUSE);
    };
    this.handleBlurCall = (event) => {
      if (event.relatedTarget || this.hasClickedBtn) {
        this.hasClickedBtn = false;
        return;
      }
      const host = this.host.shadowRoot;
      const triggerElement = host.querySelector('.trigger-element');
      if (triggerElement.getAttribute('aria-expanded') === 'true') {
        triggerElement.click();
      }
    };
    this.onBlur = (event) => {
      // Handle ref?.current?.blur() on any Select component
      this.handleBlurCall(event);
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.NONE);
      this.isFocused = false;
      this.wppBlur.emit(event);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
        if (this.focusType.listItem === FOCUS_TYPE.TAB) {
          this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE);
        }
      }
    };
    this.areOptionsProvided = () => {
      if (this.infinite || this.loading || this.isInfiniteLoading || this.isOnSearch) {
        return true;
      }
      let result = false;
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          result = true;
        }
      });
      return result;
    };
    this.countItems = () => {
      this.totalItems = 0;
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          if (!element.hasAttribute('multiple')) {
            element.setAttribute('multiple', 'true');
          }
          if (!element.hasAttribute('selectable')) {
            element.setAttribute('selectable', 'true');
          }
          const isItemChecked = this.value.some((valueItem) => this.isOptionsValueEqual(valueItem, element.value));
          if (this.enabledElements.includes(element) || (element.disabled && isItemChecked)) {
            this.totalItems = this.totalItems + 1;
          }
          element.checked = isItemChecked;
        }
      });
      this.isAllSelected = this.totalItems !== 0 && this.activeItems.length === this.totalItems;
    };
    this.handleSlotChange = () => {
      if (this.type === 'multiple' || this.type === 'single') {
        requestAnimationFrame(() => {
          this.countDisplayedItems();
        });
      }
      this.updateScrollState();
      if (this.type === 'multiple') {
        if (!Array.isArray(this.value)) {
          throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
        }
        this.countItems();
        this.setMultipleTextToDisplay();
      }
      else {
        this.host.childNodes.forEach(el => {
          const element = el;
          element.checked = isEqual_1(this.value, element.value);
        });
      }
    };
    this.getDropdownWidth = (instance) => {
      if (!this.triggerEl)
        return;
      if (this.dropdownWidth !== 'auto') {
        instance.popper.style.width = `${Math.max(this.triggerEl.clientWidth, parseInt(this.dropdownWidth, 10))}px`;
      }
      else {
        instance.popper.style.width = `${this.triggerEl.clientWidth}px`;
      }
    };
    this.labelCssClasses = () => ({
      label: true,
      focused: this.isFocused,
      disabled: this.disabled,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
      filled: !!this.textToDisplay || this.selectedItemsTextList.length > 0,
      'filled-active': (!!this.textToDisplay || this.selectedItemsTextList.length > 0) && !this.isHiddenDropdown,
      'filled-pressed': (!!this.textToDisplay || this.selectedItemsTextList.length > 0) && !!this.isHiddenDropdown && !!this.isFocused,
    });
    this.hasIconStartSlot = false;
    this.isEmpty = false;
    this.isOnSearch = false;
    this.searchText = '';
    this.isAllSelected = false;
    this.isInputFilled = false;
    this.activeItem = undefined;
    this.activeItems = [];
    this.textToDisplay = undefined;
    this.selectedItemsTextList = [];
    this.isFocused = false;
    this.focusType = getInitFocusInfo();
    this.withScroll = false;
    this.isInfiniteLoading = false;
    this.hasClickedBtn = false;
    this.isHiddenDropdown = true;
    this.shouldTruncate = false;
    this.displayedItemsCount = 0;
    this.isInModal = false;
    this.modalRef = undefined;
    this.loading = false;
    this.infinite = false;
    this.infiniteLastPage = true;
    this.loadMore = undefined;
    this.name = undefined;
    this.type = 'single';
    this.value = undefined;
    this.withCustomValue = false;
    this.getOptionId = item => item.id;
    this.getOptionLabel = item => item.label;
    this.inputValue = undefined;
    this.displayValue = undefined;
    this.placeholder = undefined;
    this.required = false;
    this.disabled = false;
    this.withSearch = 'auto';
    this.withFolder = false;
    this.autoFocus = false;
    this.size = 'm';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.maxItemsToDisplay = 2;
    this.dropdownPosition = 'absolute';
    this.ariaProps = {};
    this.dropdownConfig = {};
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.enableStaticOptions = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.locales = {
      emptyText: 'Nothing Found',
      clearAllText: 'Clear All',
      selectAllText: 'Select All',
      searchInputPlaceholder: 'Search',
      allSelectedText: 'All selected',
      selectLabel: 'selected',
    };
    this.dropdownWidth = 'auto';
    this.showSelectAllText = true;
    this.truncate = true;
    this.maximumSelectedItems = undefined;
  }
  handleSelectOptionClick(params) {
    const oldValue = this.value;
    const { target, value } = params.detail;
    if (this.type === 'multiple') {
      const list = (this.value || []);
      if (list.some(val => this.isOptionsValueEqual(val, value))) {
        target.removeAttribute('checked');
        this.isAllSelected = false;
        this.value = list.filter(val => !this.isOptionsValueEqual(val, value));
        this.activeItems = this.activeItems.filter(el => !this.isOptionsValueEqual(el.value, value));
      }
      else {
        target.setAttribute('checked', 'true');
        this.value = [...list, value];
        this.activeItems = [...new Set([...this.activeItems, target])];
      }
      this.setMultipleTextToDisplay();
      this.countItems();
    }
    else {
      this.value = value;
      if (this.type === 'text' && this.truncate) {
        this.shouldTruncate = false;
        setTimeout(() => {
          const textEl = this.host.shadowRoot?.querySelector('[part="text"]');
          if (textEl) {
            this.shouldTruncate = textEl.clientWidth > this.host.clientWidth;
          }
        }, TRUNCATION_DELAY);
      }
    }
    this.inputRef?.focus();
    if (!this.isOptionsValueEqual(oldValue, this.value)) {
      this.type === 'combined'
        ? this.wppChange.emit({
          value: this.value,
          inputValue: this.inputValue,
          name: this.name,
        })
        : this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    if (this.type === 'multiple')
      this.getEnabledItems();
  }
  updateValue(newValue) {
    const stringifiedNewValue = String(newValue);
    if (this.type !== 'multiple' && (!stringifiedNewValue || newValue === undefined)) {
      this.value = '';
      this.activeItem = null;
      this.textToDisplay = '';
    }
    if (this.type === 'multiple' && isEmpty_1(newValue) && !isEmpty_1(this.value)) {
      this.handleClearAll();
      return;
    }
    this.totalItems = 0;
    const activeItemsValues = this.activeItems.map(({ value }) => value);
    this.host.childNodes.forEach(el => {
      const element = el;
      if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
        if (this.type === 'multiple') {
          const isItemChecked = this.value.some((valueItem) => this.isOptionsValueEqual(valueItem, element.value));
          if (!element.disabled || (element.disabled && isItemChecked)) {
            this.totalItems = this.totalItems + 1;
          }
          const list = (this.value || []);
          if (list.some(val => this.isOptionsValueEqual(val, element.value))) {
            element.setAttribute('checked', 'true');
            if (!activeItemsValues.some(val => this.isOptionsValueEqual(val, element.value))) {
              this.activeItems = [...new Set([...this.activeItems, element])];
            }
          }
          else {
            element.removeAttribute('checked');
            this.activeItems = this.activeItems.filter(el => !this.isOptionsValueEqual(el.value, element.value));
          }
        }
        else {
          if (this.isOptionsValueEqual(element.value, newValue)) {
            element.setAttribute('checked', 'true');
            this.activeItem = element;
            const textContent = this.withCustomValue
              ? this.getOptionLabel(this.activeItem.value)
              : this.activeItem.querySelector('[slot="label"]')?.textContent || this.activeItem.textContent || '';
            this.textToDisplay = textContent;
          }
          else {
            element.removeAttribute('checked');
          }
        }
      }
    });
    if (this.type === 'multiple') {
      this.setMultipleTextToDisplay();
      this.validateMaxSelected();
      this.isAllSelected = this.totalItems !== 0 && this.activeItems.length === this.totalItems;
    }
  }
  onUpdateValue(newValue, oldValue) {
    if (this.type === 'multiple' && !Array.isArray(newValue)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
    }
    if (this.isOptionsValueEqual(oldValue, newValue) && !isEmpty_1(newValue) && !this.isAllSelected) {
      return;
    }
    this.updateValue(newValue);
  }
  onLoadingChange(loading) {
    setTimeout(() => {
      this.updateOptions();
    }, 0);
    if (loading) {
      this.scrollOptionsToTop();
      if (this.isInfiniteLoading) {
        this.isInfiniteLoading = false;
        if (this.infiniteLoadingPromise) {
          this.infiniteLoadingPromise.cancelled = true;
        }
      }
    }
    else {
      this.handleSearch(this.searchText);
    }
  }
  /**
   * Sets focus on native input
   */
  async setFocus() {
    setTimeout(() => {
      this.handleLabelClick();
    }, 0);
  }
  /**
   * Update options list programmatically
   */
  async updateOptions() {
    setTimeout(() => {
      this.handleSlotChange();
      this.updateValue(this.value);
    }, 0);
  }
  componentDidLoad() {
    const parentModal = this.findParentModal();
    if (parentModal) {
      this.isInModal = true;
      this.modalRef = parentModal;
      // Apply custom dropdown config for modal only for the case with modal
      Object.assign(this.dropdownConfig, this.customDropdownConfig());
    }
    if (this.type === 'multiple' && !Array.isArray(this.value)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
    }
    setTimeout(() => {
      if (['multiple', 'single'].includes(this.type)) {
        this.updateDropdownHeight();
      }
    }, 0);
    window.addEventListener('resize', this.onWindowResize);
    if (!this.enableStaticOptions && this.host) {
      const observer = new MutationObserver(mutationsList => {
        const addedValues = mutationsList
          .flatMap(el => Array.from(el.addedNodes))
          .filter(el => el.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase())
          .map(el => el.value);
        const removedValues = mutationsList
          .flatMap(el => Array.from(el.removedNodes))
          .filter(el => el.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          !addedValues.find(addedValue => addedValue === el.value))
          .map(el => {
          if (this.type === 'multiple') {
            const htmlEl = el;
            htmlEl.removeAttribute('checked');
          }
          return el.value;
        });
        if (typeof this.value === 'object' && isEmpty_1(this.value))
          return;
        if (this.canLoadMore())
          return;
        if (this.type === 'multiple') {
          const remainValues = (this.value || []).filter((val) => !removedValues.some(removedVal => removedVal === val));
          this.activeItems = this.activeItems.filter(activeItem => remainValues.find((remainValueItem) => activeItem.value === remainValueItem));
          this.updateValue(remainValues);
          if (!this.isOptionsValueEqual(this.value, remainValues)) {
            this.value = remainValues;
            this.wppChange.emit({
              value: this.value,
              name: this.name,
            });
          }
        }
        else {
          if (removedValues.some(removedVal => removedVal === this.value)) {
            this.updateValue('');
          }
        }
        this.handleSlotChange();
      });
      observer.observe(this.host, { childList: true, subtree: true });
      this.observers.push(observer);
    }
    if (this.type === 'multiple') {
      const placeholderElement = this.inputRef.querySelector('.input-text');
      const mutationObserver = new MutationObserver(this.updateIsFilled);
      const resizeObserver = new ResizeObserver(this.updateIsFilled);
      mutationObserver.observe(placeholderElement, { childList: true });
      this.observers.push(mutationObserver);
      if (resizeObserver) {
        resizeObserver.observe(placeholderElement);
      }
      this.observers.push(resizeObserver);
    }
    if (typeof this.value === 'object' && isEmpty_1(this.value))
      return;
    this.value = this.value || this.getValueFromDOM();
    this.updateValue(this.value);
    if (this.type === 'multiple') {
      this.countItems();
    }
    requestAnimationFrame(() => {
      if (this.type === 'single' || this.type === 'multiple') {
        this.countDisplayedItems();
      }
      if (this.type === 'text' && this.truncate) {
        const textEl = this.host.shadowRoot?.querySelector('[part="text"]');
        const triggerEl = this.host.shadowRoot?.querySelector('.trigger-element');
        this.shouldTruncate = (triggerEl?.clientWidth || 0) < (textEl?.clientWidth || 0);
      }
    });
    autoFocusElement(this.autoFocus, this.inputRef);
  }
  disconnectedCallback() {
    setHasFocused(false);
    this.observers.forEach((observer, i) => {
      if (observer) {
        observer.disconnect();
        delete this.observers[i];
      }
    });
    window.removeEventListener('resize', this.onWindowResize);
  }
  render() {
    if (this.type === 'single') {
      return renderSingleSelect.call(this);
    }
    if (this.type === 'multiple') {
      return renderMultipleSelect.call(this);
    }
    if (this.type === 'combined') {
      return renderCombinedSelect.call(this);
    }
    return renderTextSelect.call(this);
  }
  static get registryIs() { return "wpp-select-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["onUpdateValue"],
    "loading": ["onLoadingChange"]
  }; }
  static get style() { return wppSelectCss; }
}, [1, "wpp-select", "wpp-select-v2-22-0", {
    "loading": [516],
    "infinite": [4],
    "infiniteLastPage": [4, "infinite-last-page"],
    "loadMore": [16],
    "name": [1],
    "type": [513],
    "value": [1032],
    "withCustomValue": [4, "with-custom-value"],
    "getOptionId": [16],
    "getOptionLabel": [16],
    "inputValue": [1025, "input-value"],
    "displayValue": [1025, "display-value"],
    "placeholder": [1],
    "required": [516],
    "disabled": [516],
    "withSearch": [520, "with-search"],
    "withFolder": [516, "with-folder"],
    "autoFocus": [4, "auto-focus"],
    "size": [1],
    "message": [1],
    "messageType": [1, "message-type"],
    "maxMessageLength": [2, "max-message-length"],
    "maxItemsToDisplay": [2, "max-items-to-display"],
    "dropdownPosition": [1, "dropdown-position"],
    "ariaProps": [16],
    "dropdownConfig": [16],
    "tooltipConfig": [1040],
    "labelConfig": [1040],
    "enableStaticOptions": [4, "enable-static-options"],
    "labelTooltipConfig": [16],
    "locales": [16],
    "dropdownWidth": [1, "dropdown-width"],
    "showSelectAllText": [4, "show-select-all-text"],
    "truncate": [4],
    "maximumSelectedItems": [2, "maximum-selected-items"],
    "hasIconStartSlot": [32],
    "isEmpty": [32],
    "isOnSearch": [32],
    "searchText": [32],
    "isAllSelected": [32],
    "isInputFilled": [32],
    "activeItem": [32],
    "activeItems": [32],
    "textToDisplay": [32],
    "selectedItemsTextList": [32],
    "isFocused": [32],
    "focusType": [32],
    "withScroll": [32],
    "isInfiniteLoading": [32],
    "hasClickedBtn": [32],
    "isHiddenDropdown": [32],
    "shouldTruncate": [32],
    "displayedItemsCount": [32],
    "isInModal": [32],
    "modalRef": [32],
    "setFocus": [64],
    "updateOptions": [64]
  }, [[2, "wppChangeListItem", "handleSelectOptionClick"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-select-v2-22-0", "wpp-action-button-v2-22-0", "wpp-divider-v2-22-0", "wpp-icon-chevron-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-icon-error-v2-22-0", "wpp-icon-info-message-v2-22-0", "wpp-icon-search-v2-22-0", "wpp-icon-success-v2-22-0", "wpp-icon-warning-v2-22-0", "wpp-inline-message-v2-22-0", "wpp-input-v2-22-0", "wpp-internal-label-v2-22-0", "wpp-internal-tooltip-v2-22-0", "wpp-label-v2-22-0", "wpp-menu-list-v2-22-0", "wpp-spinner-v2-22-0", "wpp-tooltip-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-select-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSelect);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-divider-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-chevron-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-info-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-search-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-success-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-warning-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-inline-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-input-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-menu-list-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppSelect as W, defineCustomElement as d };
