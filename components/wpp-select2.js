import { h, Fragment, Host, proxyCustomElement, HTMLElement, createEvent } from '@stencil/core/internal/client';
import { m as menuListConfig } from './menuListConfig.js';
import { F as FOCUS_TYPE } from './common.js';
import { Z as Z_INDEX } from './consts.js';
import { w as getHighestContainerInDOM, k as transformToVersionedTag, g as getSlotEmptyStates, z as version, b as isEventTargetContained } from './utils.js';
import { l as lodash } from './lodash.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { d as defineCustomElement$l } from './wpp-action-button2.js';
import { d as defineCustomElement$k } from './wpp-checkbox2.js';
import { d as defineCustomElement$j } from './wpp-divider2.js';
import { d as defineCustomElement$i } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$h } from './wpp-icon-cross2.js';
import { d as defineCustomElement$g } from './wpp-icon-dash2.js';
import { d as defineCustomElement$f } from './wpp-icon-error2.js';
import { d as defineCustomElement$e } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$d } from './wpp-icon-search2.js';
import { d as defineCustomElement$c } from './wpp-icon-success2.js';
import { d as defineCustomElement$b } from './wpp-icon-tick2.js';
import { d as defineCustomElement$a } from './wpp-icon-warning2.js';
import { d as defineCustomElement$9 } from './wpp-inline-message2.js';
import { d as defineCustomElement$8 } from './wpp-input2.js';
import { d as defineCustomElement$7 } from './wpp-internal-label2.js';
import { d as defineCustomElement$6 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$5 } from './wpp-label2.js';
import { d as defineCustomElement$4 } from './wpp-list-item2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const DEFAULT_DROPDOWN_CONFIG = {
  maxWidth: 'none',
  hideOnClick: false,
  trigger: 'manual',
  placement: 'bottom-start',
  offset: [0, 4],
  zIndex: Z_INDEX.CONTEXT_MENU,
  appendTo: () => getHighestContainerInDOM(),
};
const LOCALES_DEFAULTS = {
  emptyText: 'Nothing Found',
  clearAllText: 'Clear All',
  selectAllText: 'Select All',
  searchInputPlaceholder: 'Search',
  allSelectedText: 'All selected',
  selectLabel: 'selected',
  loadingText: 'Loading...',
};
const MULTIPLE_SELECT_SINGLE_VALUE_ERROR = 'Value should be an Array in the multiple select.';

function renderSingleSelect(isBaseComponent = true, customSize, isRenderMessageInTooltip) {
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
  const getInlineMessage = () => (h(Fragment, null, this.message && isBaseComponent && (h("wpp-inline-message-v3-4-0", { class: !this.messageType ? 'default-message' : '', showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType || 'information', tooltipConfig: this.tooltipConfig }))));
  const renderAnchor = () => (h("div", { class: getAnchorCSSClasses(), ref: el => (this.anchorRef = el), tabIndex: this.disabled ? -1 : 0, onClick: () => this.handleClick() }, this.anchorButton ? (h("slot", { name: "anchor-button", onSlotchange: this.updateSlotData })) : (h(Fragment, null,
    h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }),
    h("div", { class: "overflow-container", ref: refEl => (this.overflowContainerRef = refEl) }, this.textOverflows ? (h("wpp-tooltip-v3-4-0", { text: getSelectPlaceholder() },
      h("p", null, getSelectPlaceholder()))) : (h("p", null, getSelectPlaceholder()))),
    h("input", { class: "input", ref: refEl => (this.inputRef = refEl), type: "text", name: this.name, onChange: () => this.checkIfTextOverflows(), disabled: this.disabled, value: getSelectPlaceholder(), tabIndex: -1, readonly: true, "aria-label": this.ariaProps.label, title: "", style: { width: this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto' }, required: this.required }),
    h("wpp-icon-chevron-v3-4-0", { class: this.isOpen || this.isDropdownOpen ? 'isOpen' : '', direction: 'down' })))));
  const RootTag = isBaseComponent ? Host : Fragment;
  return (h(RootTag, { onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, class: "wpp-single-select", "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur },
    this.labelConfig?.text && isBaseComponent && (h("wpp-label-v3-4-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: () => this.handleClick() })),
    isRenderMessageInTooltip ? (h("wpp-tooltip-v3-4-0", { text: this.message, error: this.messageType === 'error', warning: this.messageType === 'warning', config: this.tooltipConfig }, renderAnchor())) : (renderAnchor()),
    !isRenderMessageInTooltip && getInlineMessage(),
    h("div", { class: "wpp-select-portal", onKeyDown: this.onKeyDownPortal, ref: el => (this.portalRef = el) },
      this.shouldShowSearch && (h(Fragment, null,
        h("wpp-input-v3-4-0", { type: "search", class: "select-portal-search-input", value: this.searchText, onWppChange: this.handleSearch, name: this.name && `${this.name}-search-input`, placeholder: this._locales.searchInputPlaceholder }),
        h("wpp-divider-v3-4-0", { color: "var(--wpp-grey-color-300)" }))),
      h("div", { class: "list" }, this.renderList()))));
}

function renderMultipleSelect() {
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
  const getInlineMessage = () => (h(Fragment, null, this.message && (h("wpp-inline-message-v3-4-0", { class: !this.messageType ? 'default-message' : '', showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType || 'information', tooltipConfig: this.tooltipConfig }))));
  const renderAnchor = () => (h("div", { class: getAnchorCSSClasses(), ref: el => (this.anchorRef = el), tabIndex: this.disabled ? -1 : 0, onClick: () => this.handleClick() }, this.anchorButton ? (h("slot", { name: "anchor-button", onSlotchange: this.updateSlotData })) : (h(Fragment, null,
    h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }),
    h("div", { class: "overflow-container", ref: refEl => (this.overflowContainerRef = refEl) },
      h("p", null, getRenderedText())),
    h("input", { class: "input", type: "text", ref: refEl => (this.inputRef = refEl), name: this.name, onChange: () => this.checkIfTextOverflows(), disabled: this.disabled, value: this.renderedText, tabIndex: -1, readonly: true, "aria-label": this.ariaProps.label, title: "", style: { width: this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto' }, required: this.required }),
    h("wpp-icon-chevron-v3-4-0", { class: this.isOpen ? 'isOpen' : '', direction: 'down' })))));
  return (h(Host, { class: "wpp-multiple-select", onKeyUp: this.onKeyUp, "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur },
    this.labelConfig?.text && (h("wpp-label-v3-4-0", { class: this.labelCssClasses(), optional: !this.required, htmlFor: this.name, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: () => this.handleClick() })),
    this.isRenderMessageInTooltip ? (h("wpp-tooltip-v3-4-0", { text: this.message, error: this.messageType === 'error', warning: this.messageType === 'warning', config: this.tooltipConfig }, renderAnchor())) : (renderAnchor()),
    !this.isRenderMessageInTooltip && getInlineMessage(),
    h("div", { class: "wpp-select-portal", ref: el => (this.portalRef = el) },
      this.shouldShowSearch && (h(Fragment, null,
        h("wpp-input-v3-4-0", { type: "search", class: "select-portal-search-input", value: this.searchText, onWppChange: this.handleSearch, name: this.name && `${this.name}-search-input`, placeholder: this._locales.searchInputPlaceholder }),
        h("wpp-divider-v3-4-0", { color: "var(--wpp-grey-color-300)" }))),
      h("div", { class: "list", ref: refEl => (this.listRef = refEl) }, this.renderList()),
      this.withFolder && this.isOpen && (h("div", { class: "multiple-select-folder" },
        this.withScroll && h("wpp-divider-v3-4-0", null),
        h("div", { class: "multiple-select-folder-buttons" },
          h("wpp-action-button-v3-4-0", { variant: "secondary", disabled: !this.canSelectAll || this.loading, onClick: this.handleSelectAll }, this._locales.selectAllText),
          this.canClearAll && (h("wpp-action-button-v3-4-0", { variant: "secondary", disabled: this.loading, onClick: this.handleClearAll }, this._locales.clearAllText))))))));
}

/**
 * @internal
 */
function renderTextSelect() {
  const renderAnchor = () => (h(Fragment, null,
    h("wpp-typography-v3-4-0", { id: "select-text", type: "s-body" }, this.renderedText || this.placeholder),
    h("wpp-icon-chevron-v3-4-0", { class: this.isOpen ? 'isOpen' : '', direction: 'down' })));
  const getAnchorCSSClasses = () => ({
    anchor: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'truncated-text': this.truncate,
    'should-truncate': this.shouldTruncate,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  });
  const getInlineMessage = () => (h(Fragment, null, this.message && (h("wpp-inline-message-v3-4-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, tooltipConfig: this.tooltipConfig }))));
  return (h(Host, { class: "wpp-text-select", onKeyUp: this.onKeyUp, "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur },
    h("div", { class: getAnchorCSSClasses(), ref: el => (this.anchorRef = el), tabIndex: this.disabled ? -1 : 0, onClick: () => this.handleClick(), role: this.ariaProps.role || 'button', "aria-label": this.ariaProps.label ||
        (this.truncate && this.shouldTruncate
          ? `Show full selected text: ${this.renderedText || this.placeholder || 'Select an option'}`
          : `${this.renderedText || this.placeholder || 'Select an option'}`), onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleClick();
        }
      } }, this.truncate && this.shouldTruncate ? (h("wpp-tooltip-v3-4-0", { text: this.renderedText || this.placeholder, config: { placement: 'right' }, class: "tooltip" }, renderAnchor())) : (renderAnchor())),
    getInlineMessage(),
    h("div", { class: "wpp-select-portal", ref: el => (this.portalRef = el) },
      h("div", { class: "list" }, this.renderList()))));
}

function renderCombinedSelect() {
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
  const getInlineMessage = () => (h(Fragment, null, this.message && (h("wpp-inline-message-v3-4-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig }))));
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
  const renderAnchor = () => (h("div", { class: combinedInputWrapperCssClasses() },
    renderSingleSelect.call(this, false, this.size, false),
    h("wpp-input-v3-4-0", { onWppChange: handleInputChange, value: this.inputValue, disabled: this.disabled, type: this.inputType, maskOptions: this.maskOptions, messageType: this.messageType, placeholder: this.placeholder, size: this.size, tabIndex: -1, onFocus: onFocusInput, onBlur: onBlurInput, onClick: (event) => event.stopPropagation() })));
  return (h(Host, { class: getHostCssClasses(), onKeyUp: this.onKeyUp, "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur },
    this.labelConfig?.text && (h("wpp-label-v3-4-0", { class: this.labelCssClasses(), htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: () => this.handleClick() })),
    this.isRenderMessageInTooltip ? (h("wpp-tooltip-v3-4-0", { text: this.message, error: this.messageType === 'error', warning: this.messageType === 'warning', config: this.tooltipConfig }, renderAnchor())) : (renderAnchor()),
    !this.isRenderMessageInTooltip && getInlineMessage()));
}

const wppSelectCss = ":host{--select-min-width:var(--wpp-select-min-width, 120px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:var(--select-min-width)}:host .wpp-label{display:-ms-inline-flexbox;display:inline-flex;margin-bottom:8px}:host .wpp-label.disabled .internal-label-wrapper:hover{cursor:not-allowed}:host>.wpp-tooltip{width:100%}:host>.wpp-tooltip::part(anchor){width:100%}:host .anchor{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;border-radius:var(--wpp-border-radius-m);border:1px solid var(--wpp-grey-color-500);position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none}:host .anchor.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host .anchor .icon-start{height:20px;margin-right:9px}:host .anchor.size-s{padding:4px 10px 4px 10px}:host .anchor.size-s .overflow-container{left:5px}:host .anchor.size-m{padding:8px 10px 8px 10px}:host .anchor.size-m p .overflow-container{left:9px}:host .anchor .slot-hidden{display:none}:host .anchor .input{position:absolute;pointer-events:none;outline:none;padding:0;border:none;left:0;bottom:0;opacity:0;color:var(--grey-color-1000);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .input:hover{cursor:pointer}:host .anchor .input::-webkit-input-placeholder{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .input::-moz-placeholder{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .input:-ms-input-placeholder{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .input::-ms-input-placeholder{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .input::placeholder{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.2s;transition:-webkit-transform 0.2s;transition:transform 0.2s;transition:transform 0.2s, -webkit-transform 0.2s;-webkit-transform:rotateZ(0deg);transform:rotateZ(0deg);margin-left:4px}:host .anchor .wpp-icon-chevron.isOpen{-webkit-transform:rotateZ(180deg);transform:rotateZ(180deg)}:host .anchor .overflow-container{display:-ms-flexbox;display:flex;width:100%;min-width:32px;-ms-flex-align:center;align-items:center;color:var(--grey-color-1000);height:var(--wpp-typography-s-body-line-height, 22px);padding:0 2px}:host .anchor .overflow-container p{width:100%;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .anchor .overflow-container .wpp-tooltip{width:100%}:host .anchor .overflow-container .wpp-tooltip::part(anchor){width:100%}:host .anchor.opened{border-color:var(--wpp-grey-color-800)}:host .anchor:hover{cursor:pointer;background-color:var(--wpp-grey-color-200);border-color:var(--wpp-grey-color-700);--wpp-icon-color:var(--wpp-grey-color-800)}:host .anchor:hover .input{background-color:var(--wpp-grey-color-200)}:host .anchor:hover .overflow-container{background-color:var(--wpp-grey-color-200)}:host .anchor:active{background-color:var(--wpp-grey-color-300);border-color:var(--wpp-grey-color-800);--wpp-icon-color:var(--wpp-grey-color-900)}:host .anchor:active .input{background-color:var(--wpp-grey-color-300)}:host .anchor:active .overflow-container{background-color:var(--wpp-grey-color-300)}:host .anchor.with-errors{border-color:var(--wpp-danger-color-400)}:host .anchor.with-warnings{border-color:var(--wpp-warning-color-400)}:host .anchor.disabled{background-color:var(--wpp-grey-color-100);border-color:var(--wpp-grey-color-400);--wpp-text-color:var(--wpp-text-color-disabled);--wpp-icon-color:var(--wpp-grey-color-400)}:host .anchor.disabled:hover{cursor:not-allowed}:host .anchor.disabled .input{background-color:var(--wpp-grey-color-100);color:var(--wpp-text-color-disabled)}:host .anchor.disabled .input:hover{cursor:not-allowed}:host .anchor.disabled .input::-webkit-input-placeholder{color:var(--wpp-text-color-disabled)}:host .anchor.disabled .input::-moz-placeholder{color:var(--wpp-text-color-disabled)}:host .anchor.disabled .input:-ms-input-placeholder{color:var(--wpp-text-color-disabled)}:host .anchor.disabled .input::-ms-input-placeholder{color:var(--wpp-text-color-disabled)}:host .anchor.disabled .input::placeholder{color:var(--wpp-text-color-disabled)}:host .anchor.disabled .overflow-container{background-color:var(--wpp-grey-color-100)}:host .anchor.disabled .overflow-container p{color:var(--wpp-text-color-disabled)}:host .anchor.anchor-button{padding:0;border:none;background:none;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .wpp-select-portal{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);border-radius:var(--wpp-border-radius-s);display:none;-ms-flex-align:start;align-items:flex-start;-ms-flex-direction:column;flex-direction:column;width:100%;overflow:hidden;max-height:372px;background-color:var(--wpp-white-color)}:host .wpp-select-portal .wpp-input{--text-input-height-m:var(--wpp-input-select-search-input-height, 40px);--wpp-border-radius-m:0;--text-input-border-width:0;--text-input-bg-color:var(--wpp-input-select-search-bg-color, var(--wpp-grey-color-000));--text-input-second-border-color-focus:transparent;--text-input-first-border-color-focus:transparent;width:100%}:host .wpp-select-portal .nothing-found{--wpp-typography-color:var(--wpp-grey-color-700);padding:5px 8px}:host .wpp-select-portal .wpp-divider{width:100%}:host .wpp-select-portal .list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;gap:4px;padding:8px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}:host .wpp-select-portal .list::-webkit-scrollbar{width:4px;height:4px}:host .wpp-select-portal .list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}:host .wpp-select-portal .list .wpp-list-item{--wpp-list-item-width:100%;width:100%}:host .wpp-select-portal .list .wpp-list-item p{margin:0}:host .wpp-select-portal .list .loading-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:32px;gap:4px}:host .wpp-select-portal .multiple-select-folder{width:100%}:host .wpp-select-portal .multiple-select-folder-buttons{padding:8px;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}:host .wpp-inline-message{display:-ms-inline-flexbox;display:inline-flex;margin-top:4px}:host .default-message::part(message-icon){display:none}:host(.wpp-text-select){width:auto;--wpp-select-min-width:auto}:host(.wpp-text-select) .anchor{border-radius:var(--wpp-border-radius-s);-ms-flex-pack:start;justify-content:flex-start;padding:1px 6px 1px 8px;border:none;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host(.wpp-text-select) .truncated-text{max-width:100%;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.wpp-text-select) .truncated-text .tooltip{max-width:100%}:host(.wpp-text-select) .truncated-text .tooltip::part(anchor){max-width:100%}:host(.wpp-text-select) .truncated-text .wpp-typography{white-space:nowrap;text-overflow:ellipsis}:host(.wpp-text-select) .should-truncate .wpp-typography{overflow:hidden}:host(.wpp-combined-select){--combined-select-width:var(--wpp-combined-select-width, 260px);--wpp-select-min-width:80px;width:var(--combined-select-width);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start}:host(.wpp-combined-select) .wpp-label{margin-bottom:8px}:host(.wpp-combined-select) .inputs-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start}:host(.wpp-combined-select) .inputs-container .anchor{width:auto;max-width:110px;min-width:var(--select-min-width);border:1px solid var(--wpp-grey-color-500);border-radius:var(--wpp-border-radius-m) 0 0 var(--wpp-border-radius-m)}:host(.wpp-combined-select) .inputs-container .anchor.size-s{padding:4px 10px 4px 12px}:host(.wpp-combined-select) .inputs-container .wpp-input{border:1px solid var(--wpp-grey-color-500);border-radius:0 var(--wpp-border-radius-m) var(--wpp-border-radius-m) 0;border-left:none;--wpp-input-height-m:38px;--wpp-input-height-s:30px}:host(.wpp-combined-select) .inputs-container .wpp-input::part(input){border:none}:host(.wpp-combined-select) .inputs-container:hover{background-color:var(--wpp-grey-color-200)}:host(.wpp-combined-select) .inputs-container:hover .overflow-container{background-color:var(--wpp-grey-color-200)}:host(.wpp-combined-select) .inputs-container:hover .anchor,:host(.wpp-combined-select) .inputs-container:hover .wpp-input{background-color:var(--wpp-grey-color-200);border:1px solid var(--wpp-grey-color-700)}:host(.wpp-combined-select) .inputs-container:hover .wpp-input{border-left:none}:host(.wpp-combined-select) .inputs-container.is-active{background-color:transparent}:host(.wpp-combined-select) .inputs-container.is-active .anchor,:host(.wpp-combined-select) .inputs-container.is-active .wpp-input{border:1px solid var(--wpp-grey-color-800)}:host(.wpp-combined-select) .inputs-container.is-active .wpp-input{border-left:none}:host(.wpp-combined-select) .inputs-container.is-active .wpp-input::part(input):hover{background-color:transparent}:host(.wpp-combined-select) .inputs-container.is-active:hover .overflow-container{background-color:transparent}:host(.wpp-combined-select) .inputs-container.is-active:hover .anchor,:host(.wpp-combined-select) .inputs-container.is-active:hover .wpp-input{background-color:transparent}:host(.wpp-combined-select) .inputs-container.disabled{background-color:var(--wpp-grey-color-100);color:var(--wpp-text-color-disabled)}:host(.wpp-combined-select) .inputs-container.disabled .anchor,:host(.wpp-combined-select) .inputs-container.disabled .wpp-input{border-color:var(--wpp-grey-color-400)}:host(.wpp-combined-select) .inputs-container.disabled:hover .anchor,:host(.wpp-combined-select) .inputs-container.disabled:hover .wpp-input{background-color:var(--wpp-grey-color-100);border:1px solid var(--wpp-grey-color-400)}:host(.wpp-combined-select) .inputs-container.disabled:hover .wpp-input{border-left:none}:host(.wpp-combined-select) .inputs-container.disabled:hover .overflow-container{background-color:var(--wpp-grey-color-100)}:host(.wpp-combined-select) .inputs-container.with-errors .anchor,:host(.wpp-combined-select) .inputs-container.with-errors .wpp-input{border-color:var(--wpp-danger-color-400)}:host(.wpp-combined-select) .inputs-container.with-warnings .anchor,:host(.wpp-combined-select) .inputs-container.with-warnings .wpp-input{border-color:var(--wpp-warning-color-400)}";

const MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH = 10;
const TRUNCATION_DELAY = 100;
const WppSelect = /*@__PURE__*/ proxyCustomElement(class WppSelect extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.hasReachedLimit = false;
    this.canSelectAll = false;
    this.canClearAll = false;
    // ************************************
    this.LIB_COMPONENTS_PREFIX = 'wpp-';
    this._locales = LOCALES_DEFAULTS;
    this.getSelectedItems = () => {
      if (this.type === 'multiple') {
        const selectedItems = this.internalList?.filter((item) => this.emittedValue.some((emittedValueItem) => lodash.isEqual(emittedValueItem, item.value)));
        return selectedItems;
      }
      else {
        const selectedItem = this.internalList?.find((listItem) => lodash.isEqual(listItem.value, this.emittedValue));
        return [selectedItem];
      }
    };
    this.checkMessageInTooltip = () => {
      const shouldRenderInTooltip = !!(this.messageInTooltip &&
        this.message &&
        (this.messageType === 'error' || this.messageType === 'warning'));
      if (this.isRenderMessageInTooltip !== shouldRenderInTooltip) {
        this.isRenderMessageInTooltip = shouldRenderInTooltip;
        if (this.tippyInstance)
          this.tippyInstance.destroy();
        setTimeout(() => {
          if (this.portalRef && this.anchorRef) {
            this.createTippyInstance();
          }
        }, 100);
      }
      else {
        this.isRenderMessageInTooltip = shouldRenderInTooltip;
      }
    };
    this.checkTruncationInTextSelect = () => {
      this.shouldTruncate = false;
      setTimeout(() => {
        const textEl = this.host.shadowRoot?.querySelector('#select-text');
        if (textEl) {
          this.shouldTruncate = textEl.clientWidth > this.host.clientWidth;
        }
      }, TRUNCATION_DELAY);
    };
    this.onUpdateListSingle = () => {
      // This function is called when "this.list" has been updated in the single select.
      const searchTextLowerCase = this.searchText.toLowerCase().trim();
      this.internalList = [
        ...this.list.map((listItem) => {
          const hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase);
          const checked = lodash.isEqual(listItem.value, this.value);
          if (checked) {
            this.renderedText = listItem.label;
          }
          return {
            ...listItem,
            checked,
            hidden,
            highlight: this.searchText,
          };
        }),
      ];
    };
    this.onUpdateListMultiple = () => {
      // This function is called when "this.list" has been updated in the multiple select.
      // We count again all checked and visible items and all disabled or hidden items.
      let checkedItems = 0;
      let disabledItems = 0;
      const searchTextLowerCase = this.searchText.toLowerCase().trim();
      this.internalList = [
        ...this.list.map((listItem) => {
          const hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase);
          const checked = !!this.value?.find((valueItem) => lodash.isEqual(listItem.value, valueItem));
          if (listItem.disabled) {
            disabledItems++;
          }
          else if (checked) {
            checkedItems++;
          }
          return {
            ...listItem,
            hidden,
            checked,
            selectable: true,
            multiple: true,
            highlight: this.searchText,
          };
        }),
      ];
      this.updateItemsAfterChangeMultiple(checkedItems, disabledItems);
    };
    this.updateItemsAfterChangeMultiple = (checkedItems, disabledItems) => {
      this.checkedItems = checkedItems;
      this.disabledItems = disabledItems;
      this.setRenderedTextMultiple();
      if (this.maximumSelectedItems) {
        if (this.checkedItems >= this.maximumSelectedItems) {
          this.disableOtherElements();
        }
        else {
          this.enablePreviousElements();
        }
      }
      if (this.internalList?.length === 0) {
        this.canSelectAll = false;
        this.canClearAll = false;
      }
      else {
        this.canSelectAll = this.maximumSelectedItems
          ? false
          : this.checkedItems < this.internalList?.length - this.disabledItems;
        this.canClearAll = this.checkedItems >= 1;
      }
    };
    this.checkListAgainstValueSingle = () => {
      // Check items against value provided to component and set renderedText in input. This function is called for single-select.
      this.internalList?.forEach((listItem) => {
        const checked = lodash.isEqual(listItem.value, this.value);
        if (checked) {
          this.renderedText = listItem.label;
        }
        listItem.checked = checked;
      });
    };
    this.checkListAgainstValueMultiple = () => {
      // Every time value changes, we make updates to the list and count again
      // the "checked and visible" items and "disabled or hidden" ones.
      let checkedItems = 0;
      let disabledItems = 0;
      this.internalList?.forEach((listItem) => {
        const checked = !!this.value?.find((item) => lodash.isEqual(listItem.value, item));
        if (listItem.disabled) {
          disabledItems++;
        }
        else if (checked) {
          checkedItems++;
        }
        listItem.checked = checked;
      });
      this.updateItemsAfterChangeMultiple(checkedItems, disabledItems);
    };
    this.convertValueToKey = (value) => {
      if (typeof value === 'object') {
        return this.getItemKey ? this.getItemKey(value) : undefined;
      }
      return value;
    };
    this.renderList = () => {
      if (!this.isOpen) {
        return h(Fragment, null);
      }
      if (this.loading) {
        return (h("div", { class: "loading-container" }, h("wpp-spinner-v3-4-0", null), h("wpp-typography-v3-4-0", { type: "s-body" }, this._locales.loadingText)));
      }
      if (this.internalList?.length === 0) {
        return (h("wpp-typography-v3-4-0", { class: "nothing-found", type: "s-body" }, this._locales.emptyText));
      }
      let hiddeItemsCount = 0;
      return (h(Fragment, null, this.internalList?.map((item) => {
        const { label, hidden, ...rest } = item;
        if (hidden) {
          hiddeItemsCount++;
          if (hiddeItemsCount === this.internalList?.length) {
            return (h("wpp-typography-v3-4-0", { class: "nothing-found", type: "s-body" }, this._locales.emptyText));
          }
          return null;
        }
        return (h("wpp-list-item-v3-4-0", { onWppChangeListItem: this.handleClickListItem, key: this.convertValueToKey(item.value), ...rest, id: item.id !== undefined ? `${this.LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined }, h("p", { slot: "label" }, label), item?.slots && this.renderSlotsInListItem(item.slots, Boolean(label)).map((slotNode) => slotNode)));
      })));
    };
    this.renderSlotsInListItem = (slots, isLabelExists) => slots
      .map(slotElement => {
      if (!slotElement)
        return null;
      const { type, props, slot, children } = slotElement;
      if (props.slot === 'label' && isLabelExists)
        return null;
      if (!type.startsWith(this.LIB_COMPONENTS_PREFIX)) {
        const { children: text, ...restProps } = props;
        const Tag = type;
        return (h(Tag, { ...restProps }, text));
      }
      if (!children)
        return h(transformToVersionedTag(type), { slot, ...props });
      const slotNode = h(transformToVersionedTag(type), { slot, ...props });
      slotNode.$children$ = Array.isArray(children)
        ? this.renderSlotsInListItem(Array.from(children), isLabelExists)
        : this.renderSlotsInListItem([children], isLabelExists);
      return slotNode;
    })
      .filter(item => item !== null);
    this.setHasBeenInternallyDisabled = (listItem) => {
      if (listItem.hasBeenInternallyDisabled)
        return true;
      if (listItem.disabled || listItem.checked)
        return null;
      return true;
    };
    this.disableOtherElements = () => {
      if (this.hasReachedLimit)
        return;
      let disabledItems = 0;
      // This function is called when items in the list are checked
      // and "maximumSelectedItems" property is defined.
      this.internalList?.forEach((listItem) => {
        if (listItem.hasBeenInternallyDisabled || listItem.disabled || !(listItem.disabled || listItem.checked)) {
          disabledItems++;
        }
        listItem.hasBeenInternallyDisabled = this.setHasBeenInternallyDisabled(listItem);
        listItem.disabled = listItem.disabled ? listItem.disabled : !listItem.checked;
      });
      this.disabledItems = disabledItems;
      this.hasReachedLimit = true;
    };
    this.enablePreviousElements = () => {
      if (!this.hasReachedLimit)
        return;
      let disabledItems = 0;
      // This function is called to revert the effects of "this.disableOtherElements"
      this.internalList?.forEach((listItem) => {
        if (listItem.hasBeenInternallyDisabled) {
          listItem.disabled = false;
          listItem.hasBeenInternallyDisabled = null;
        }
        if (this.disabled) {
          disabledItems++;
        }
      });
      this.disabledItems = disabledItems;
      this.hasReachedLimit = false;
    };
    this.checkIfTextOverflows = () => {
      if (this.inputRef) {
        this.inputRef.style.width = this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto';
        this.textOverflows = this.inputRef.scrollWidth > this.inputRef.clientWidth;
      }
    };
    this.setRenderedTextMultiple = () => {
      const labels = [];
      let numberOfExtraItems = 0;
      // We need to parse this.value in order to get the labels in the exact order they
      // were selected.
      this.value?.forEach((valueItem) => {
        const listItem = this.internalList?.find((listItem) => lodash.isEqual(valueItem, listItem.value));
        if (listItem) {
          if (labels.length >= this.maxItemsToDisplay) {
            numberOfExtraItems++;
          }
          else {
            labels.push(listItem.label);
          }
        }
      });
      if (numberOfExtraItems > 0) {
        this.renderedText = `${labels.join(', ')}, +${numberOfExtraItems}`;
      }
      else {
        this.renderedText = labels.join(', ');
      }
    };
    this.onShowDropdown = (instance) => {
      if (!this.anchorRef)
        return false;
      if (this.type === 'text' || this.isTextSelect) {
        this.onShowDropdownText(instance);
      }
      else {
        // Set width of dropdown based on "dropdownWidth" property and "this.anchorRef"
        if (this.dropdownWidth !== 'auto') {
          instance.popper.style.width = `${Math.max(this.anchorRef.clientWidth, parseInt(this.dropdownWidth, 10))}px`;
        }
        else {
          instance.popper.style.width = `${this.anchorRef.clientWidth}px`;
        }
      }
      if (this.dropdownConfig?.onShow) {
        if (this.dropdownConfig.onShow(instance) === false) {
          return false;
        }
        this.dropdownConfig?.onShow(instance);
      }
      this.isOpen = true;
    };
    this.onShowDropdownText = (instance) => {
      if (!this.anchorRef)
        return;
      if (this.dropdownWidth === 'auto') {
        if (this.anchorRef.clientWidth < 350) {
          instance.setProps({ maxWidth: '350px' });
          instance.popper.style.width = 'auto';
        }
        else {
          instance.setProps({ maxWidth: `${this.anchorRef.clientWidth}px` });
          instance.popper.style.width = `${this.anchorRef.clientWidth}px`;
        }
      }
      else {
        const widthValue = Math.max(this.anchorRef.clientWidth, parseInt(this.dropdownWidth));
        instance.setProps({ maxWidth: `${widthValue}px` });
        instance.popper.style.width = `${widthValue}px`;
      }
    };
    this.onHiddenDropdown = (instance) => {
      this.isOpen = false;
      if (!this.consistentSearch) {
        this.searchText = '';
      }
      if (this.dropdownConfig?.onHidden) {
        this.dropdownConfig?.onHidden(instance);
      }
    };
    this.createTippyInstance = () => {
      if (!this.anchorRef || !this.portalRef)
        return;
      this.tippyInstance = menuListConfig({
        anchor: this.anchorRef,
        content: this.portalRef,
        ...DEFAULT_DROPDOWN_CONFIG,
        ...this.dropdownConfig,
        onShow: (instance) => {
          if (this.disabled)
            return false;
          this.setShouldShowSearch();
          // Re-position in case it was not position correctly initially.
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 0);
          return this.onShowDropdown(instance);
        },
        onShown: (instance) => {
          this.updateScrollState();
          if (['single', 'multiple'].includes(this.type)) {
            this.focusSearchInput();
          }
          else {
            this.focusFirstListItem();
          }
          if (this.dropdownConfig?.onShown) {
            this.dropdownConfig?.onShown(instance);
          }
        },
        onHide: (instance) => {
          this.onBlur();
          if (this.dropdownConfig?.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onHidden: this.onHiddenDropdown,
        onClickOutside: (instance, event) => {
          if (this.tippyInstance && !isEventTargetContained(this.host, event)) {
            this.tippyInstance.hide();
          }
          if (this.dropdownConfig?.onClickOutside) {
            this.dropdownConfig.onClickOutside(instance, event);
          }
        },
      });
    };
    this.focusFirstListItem = () => {
      if (!this.portalRef)
        return;
      const listItem = this.portalRef.querySelector('.wpp-list-item');
      if (!listItem)
        return;
      listItem.setFocus();
    };
    this.focusSearchInput = () => {
      if (!this.portalRef)
        return;
      const inputEl = this.portalRef.querySelector('.select-portal-search-input');
      setTimeout(() => {
        if (!inputEl)
          return;
        inputEl.setFocus();
      }, 0);
    };
    this.handleSearch = (event) => {
      const searchValue = event.detail.value;
      if (searchValue === undefined) {
        this.searchText = '';
        return;
      }
      this.searchText = searchValue;
    };
    this.handleClickListItem = (event) => {
      const listItemValue = event.detail.value;
      if (listItemValue === undefined)
        return;
      if (this.type === 'multiple') {
        this.onClickListItemMultiple(listItemValue);
      }
      else {
        this.onClickListItemSingle(listItemValue);
      }
    };
    this.onClickListItemSingle = (listItemValue) => {
      if (lodash.isEqual(this.value, listItemValue)) {
        this.tippyInstance?.hide();
        return;
      }
      else {
        this.emittedValue = listItemValue;
        // Hide dropdown only when user clicked a new item.
        this.tippyInstance?.hide();
      }
    };
    this.onClickListItemMultiple = (listItemValue) => {
      const valueItem = this.value?.find((item) => lodash.isEqual(item, listItemValue));
      if (valueItem) {
        this.emittedValue = this.value
          ? [...this.value.filter((item) => !lodash.isEqual(item, listItemValue))]
          : [];
      }
      else {
        this.emittedValue = [...this.value, listItemValue];
      }
    };
    this.updateScrollState = () => {
      if (!this.listRef)
        return;
      this.withScroll = this.listRef.scrollHeight > this.listRef.clientHeight;
    };
    this.handleSelectAll = () => {
      // We select all the items that are not disabled. Even hidden ones.
      const valueOfItems = [];
      this.internalList?.forEach((listItem) => {
        if (!listItem.disabled) {
          valueOfItems.push(listItem.value);
        }
        listItem.checked = listItem.disabled ? listItem.checked : true;
      });
      this.emittedValue = [...valueOfItems];
    };
    this.handleClearAll = () => {
      // We un-check all items that are not disabled. Even hidden ones.
      const valueOfItems = [];
      this.internalList?.forEach((listItem) => {
        if (listItem.checked && listItem.disabled) {
          valueOfItems.push(listItem.value);
        }
        listItem.checked = listItem.disabled ? listItem.checked : false;
      });
      this.emittedValue = [...valueOfItems];
    };
    this.setShouldShowSearch = () => {
      if (!this.host)
        return false;
      if (this.type === 'text' || this.isTextSelect) {
        this.shouldShowSearch = false;
        return;
      }
      this.shouldShowSearch =
        (this.host?.getAttributeNames().includes('with-search') && !['auto', false].includes(this.withSearch)) ||
          (this.withSearch === 'auto' && this.list.length >= MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH);
    };
    this.handleClick = (shouldFocus) => {
      if (!this.tippyInstance || this.disabled || this.displayValue !== undefined)
        return;
      if (shouldFocus) {
        this.focusType = FOCUS_TYPE.TAB;
        this.anchorRef?.focus();
      }
      if (this.tippyInstance.state.isVisible) {
        this.tippyInstance.hide();
      }
      else {
        this.tippyInstance.show();
      }
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
        anchorButton: '[slot="anchor-button"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
      this.anchorButton = !emptyStates.anchorButton;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.tippyInstance?.show();
      }
    };
    this.onKeyDownPortal = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.tippyInstance?.hide();
        this.anchorRef?.focus();
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      if (event?.relatedTarget && this.portalRef && this.portalRef.contains(event.relatedTarget)) {
        return;
      }
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.hasErrorsOrWarnings = (type) => this.message ? this.message.length > 0 && this.messageType === type : false;
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
      disabled: this.disabled,
    });
    this.labelCssClasses = () => ({
      disabled: this.disabled,
    });
    this.isOpen = false;
    this.searchText = '';
    this.internalList = undefined;
    this.renderedText = undefined;
    this.emittedValue = undefined;
    this.hasIconStartSlot = false;
    this.anchorButton = false;
    this.shouldShowSearch = false;
    this.focusType = undefined;
    this.isRenderMessageInTooltip = false;
    this.withScroll = false;
    this.checkedItems = 0;
    this.disabledItems = 0;
    this.textOverflows = false;
    this.isContainerFocused = false;
    this.shouldTruncate = false;
    this.consistentSearch = false;
    this.value = undefined;
    this.list = [];
    this.type = 'single';
    this.isTextSelect = false;
    this.withSearch = 'auto';
    this.disabled = false;
    this.required = false;
    this.autoFocus = false;
    this.loading = false;
    this.withFolder = false;
    this.truncate = true;
    this.maximumSelectedItems = undefined;
    this.getItemKey = undefined;
    this.placeholder = undefined;
    this.name = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.size = 'm';
    this.enableStaticOptions = false;
    this.maxItemsToDisplay = 2;
    this.dropdownWidth = 'auto';
    this.displayValue = undefined;
    this.isDropdownOpen = false;
    this.ariaProps = {};
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.dropdownConfig = {};
    this.locales = {};
    this.showSelectAllText = true;
    this.inputValue = undefined;
    this.maskOptions = undefined;
    this.inputType = 'text';
    this.tooltipConfig = {};
    this.messageInTooltip = false;
  }
  onUpdateDisplayValue() {
    if (this.type === 'single' && this.displayValue !== undefined) {
      setTimeout(() => {
        this.checkIfTextOverflows();
      }, 50);
    }
  }
  onUpdateValue() {
    if (this.type === 'multiple' && !Array.isArray(this.value)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
    }
    // Every time this.value changes the text in the anchor is changed.
    this.renderedText = '';
    this.emittedValue = this.value;
    // We filter the whole list passed to the component, not just the renderedList,
    // because we can select items programatically that are not currently visible
    if (this.type === 'multiple') {
      this.checkListAgainstValueMultiple();
    }
    else {
      this.checkListAgainstValueSingle();
    }
    if (this.type === 'text' || this.isTextSelect) {
      if (this.truncate) {
        this.checkTruncationInTextSelect();
      }
    }
    else {
      requestAnimationFrame(() => {
        this.checkIfTextOverflows();
      });
    }
  }
  onUpdateEmittedValue() {
    // Every time this.emittedValue is changed, we emit it, except when it is equal to this.value. The user will change
    // the value of the component on his side and this.onUpdateValue is triggered.
    if (lodash.isEqual(this.value, this.emittedValue))
      return;
    this.value = this.type === 'multiple' ? [...this.emittedValue] : this.emittedValue;
    this.wppChange.emit({
      value: this.value,
      selectedItems: this.getSelectedItems(),
      ...(this.name !== undefined && { name: this.name }),
      ...(this.type === 'combined'
        ? { inputValue: this.inputValue || '' }
        : this.shouldShowSearch && { inputValue: this.searchText }),
    });
  }
  onUpdateList() {
    // When "enableStaticOptions=true", only the initial list is taken into consideration.
    if (this.enableStaticOptions)
      return;
    this.renderedText = '';
    if (this.type === 'multiple') {
      this.onUpdateListMultiple();
    }
    else {
      this.onUpdateListSingle();
    }
    // Every time "this.list" changes, we check if we can still render search input.
    this.setShouldShowSearch();
  }
  onUpdateSearchText() {
    if (this.searchText === '') {
      this.internalList?.forEach((listItem) => {
        listItem.highlight = '';
        listItem.hidden = false;
      });
      return;
    }
    // When search changes, we also set "highlight=this.searchText" in order to
    // highlight characters in each label.
    const searchTextLowerCase = this.searchText.toLowerCase().trim();
    this.internalList?.forEach((listItem) => {
      listItem.highlight = this.searchText;
      listItem.hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase);
    });
  }
  onUpdateLoading() {
    if (!this.loading) {
      setTimeout(() => {
        this.updateScrollState();
      }, 50);
    }
  }
  onUpdateMaximumSelectedItems() {
    this.canSelectAll = this.maximumSelectedItems ? false : true;
    if (this.maximumSelectedItems) {
      if (this.checkedItems === this.maximumSelectedItems) {
        this.hasReachedLimit = false;
        this.disableOtherElements();
        this.setRenderedTextMultiple();
        return;
      }
      else if (this.checkedItems > this.maximumSelectedItems) {
        this.hasReachedLimit = false;
        const values = this.value.slice(0, this.maximumSelectedItems);
        this.emittedValue = values;
        return;
      }
    }
    this.enablePreviousElements();
    this.setRenderedTextMultiple();
  }
  onUpdateMessage() {
    this.checkMessageInTooltip();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  /**
   * Sets focus on the select and opens the dropdown.
   */
  async setFocus() {
    this.handleClick(true);
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    if (this.type === 'text')
      console.warn('The value "text" for the type property is deprecated and will be removed in version 4.0.0.');
    this.versionToCompare = version.slice(1).split('-').join('');
    this.updateSlotData();
    this.checkMessageInTooltip();
    // Specific "componentWillLoad()" behaviour based on type of component.
    if (this.type === 'multiple') {
      if (!Array.isArray(this.value)) {
        throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
      }
      // Search is controlled by the component, so initially all items should have "hidden: false"
      this.internalList = [
        ...this.list.map((item) => ({
          ...item,
          selectable: true,
          multiple: true,
          hidden: false,
          checked: false,
        })),
      ];
      if (this.value?.length > 0) {
        this.checkListAgainstValueMultiple();
      }
      else {
        this.canClearAll = false;
        this.canSelectAll = true;
      }
    }
    else {
      this.internalList = [
        ...this.list.map((listItem) => ({ ...listItem, hidden: false, checked: false })),
      ];
      if (this.value === undefined)
        return;
      this.checkListAgainstValueSingle();
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      if (this.displayValue === undefined) {
        this.createTippyInstance();
      }
      if (this.anchorRef &&
        this.autoFocus &&
        document.activeElement?.tagName.toLowerCase() !== transformToVersionedTag(`${this.LIB_COMPONENTS_PREFIX}select`)) {
        // If multiple select elements on a page have the "this.autoFocus=true" property,
        // we should open only the first select with this property.
        this.handleClick(true);
      }
      if (this.type !== 'text' || !this.isTextSelect) {
        this.resizeObserver = new ResizeObserver(this.checkIfTextOverflows);
        if (this.resizeObserver && this.anchorRef) {
          this.resizeObserver.observe(this.anchorRef);
        }
      }
      else {
        if (this.truncate) {
          this.checkTruncationInTextSelect();
        }
      }
    });
  }
  connectedCallback() {
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    if (this.tippyInstance) {
      this.tippyInstance.destroy();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    if (this.type === 'single' && !this.isTextSelect) {
      return renderSingleSelect.call(this, true, this.size, this.isRenderMessageInTooltip);
    }
    if (this.type === 'multiple') {
      return renderMultipleSelect.call(this);
    }
    if (this.type === 'text' || (this.type === 'single' && this.isTextSelect)) {
      return renderTextSelect.call(this);
    }
    return renderCombinedSelect.call(this);
  }
  static get registryIs() { return "wpp-select-v3-4-0"; }
  get host() { return this; }
  static get watchers() { return {
    "displayValue": ["onUpdateDisplayValue"],
    "value": ["onUpdateValue"],
    "emittedValue": ["onUpdateEmittedValue"],
    "list": ["onUpdateList"],
    "searchText": ["onUpdateSearchText"],
    "loading": ["onUpdateLoading"],
    "maximumSelectedItems": ["onUpdateMaximumSelectedItems"],
    "messageInTooltip": ["onUpdateMessage"],
    "message": ["onUpdateMessage"],
    "messageType": ["onUpdateMessage"],
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppSelectCss; }
}, [1, "wpp-select", "wpp-select-v3-4-0", {
    "consistentSearch": [4, "consistent-search"],
    "value": [1032],
    "list": [16],
    "type": [513],
    "isTextSelect": [4, "is-text-select"],
    "withSearch": [520, "with-search"],
    "disabled": [516],
    "required": [516],
    "autoFocus": [516, "auto-focus"],
    "loading": [4],
    "withFolder": [516, "with-folder"],
    "truncate": [4],
    "maximumSelectedItems": [2, "maximum-selected-items"],
    "getItemKey": [16],
    "placeholder": [1],
    "name": [1],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "size": [1],
    "enableStaticOptions": [4, "enable-static-options"],
    "maxItemsToDisplay": [2, "max-items-to-display"],
    "dropdownWidth": [1, "dropdown-width"],
    "displayValue": [1025, "display-value"],
    "isDropdownOpen": [4, "is-dropdown-open"],
    "ariaProps": [16],
    "message": [1],
    "messageType": [1, "message-type"],
    "maxMessageLength": [2, "max-message-length"],
    "dropdownConfig": [1040],
    "locales": [16],
    "showSelectAllText": [4, "show-select-all-text"],
    "inputValue": [1025, "input-value"],
    "maskOptions": [16],
    "inputType": [1, "input-type"],
    "tooltipConfig": [1040],
    "messageInTooltip": [4, "message-in-tooltip"],
    "isOpen": [32],
    "searchText": [32],
    "internalList": [32],
    "renderedText": [32],
    "emittedValue": [32],
    "hasIconStartSlot": [32],
    "anchorButton": [32],
    "shouldShowSearch": [32],
    "focusType": [32],
    "isRenderMessageInTooltip": [32],
    "withScroll": [32],
    "checkedItems": [32],
    "disabledItems": [32],
    "textOverflows": [32],
    "isContainerFocused": [32],
    "shouldTruncate": [32],
    "setFocus": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-select-v3-4-0", "wpp-action-button-v3-4-0", "wpp-checkbox-v3-4-0", "wpp-divider-v3-4-0", "wpp-icon-chevron-v3-4-0", "wpp-icon-cross-v3-4-0", "wpp-icon-dash-v3-4-0", "wpp-icon-error-v3-4-0", "wpp-icon-info-message-v3-4-0", "wpp-icon-search-v3-4-0", "wpp-icon-success-v3-4-0", "wpp-icon-tick-v3-4-0", "wpp-icon-warning-v3-4-0", "wpp-inline-message-v3-4-0", "wpp-input-v3-4-0", "wpp-internal-label-v3-4-0", "wpp-internal-tooltip-v3-4-0", "wpp-label-v3-4-0", "wpp-list-item-v3-4-0", "wpp-spinner-v3-4-0", "wpp-tooltip-v3-4-0", "wpp-typography-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-select-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSelect);
      }
      break;
    case "wpp-action-button-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-checkbox-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-divider-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-chevron-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-cross-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-dash-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-error-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-info-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-search-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-success-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-tick-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-warning-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-inline-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-input-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-list-item-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppSelect as W, defineCustomElement as d };
