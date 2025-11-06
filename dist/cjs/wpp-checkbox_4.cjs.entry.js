'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');
const highlightWords = require('./highlight-words-25672f7c.js');
const WrappedSlot = require('./WrappedSlot-736c2736.js');
const constants = require('./constants-6680c2a7.js');
const utils = require('./utils-9c925efe.js');
require('./consts-255c1066.js');

const wppCheckboxCss = ":host{--checkbox-icons-color:var(--wpp-checkbox-icons-color, var(--wpp-grey-color-000));--checkbox-size:var(--wpp-checkbox-size, 20px);--checkbox-border-radius:var(--wpp-checkbox-border-radius, var(--wpp-border-radius-xs));--checkbox-inline-message-margin:var(--wpp-checkbox-inline-message-margin, 4px 0 0 0);--checkbox-label-margin:var(--wpp-checkbox-label-margin, 0 0 0 8px);--checkbox-label-text-color-disabled:var(--wpp-checkbox-label-text-color-disabled, var(--wpp-text-color-disabled));--checkbox-label-text-color-checked-disabled:var(--wpp-checkbox-label-text-color-checked-disabled, var(--wpp-text-color-disabled));--checkbox-bg-color:var(--wpp-checkbox-bg-color-hover, transparent);--checkbox-bg-color-hover:var(--wpp-checkbox-bg-color-hover, rgb(240 242 245 / 75%));--checkbox-bg-color-active:var(--wpp-checkbox-bg-color-active, var(--wpp-grey-color-300));--checkbox-bg-color-disabled:var(--wpp-checkbox-bg-color-disabled, var(--wpp-grey-color-000));--checkbox-bg-color-checked:var(--wpp-checkbox-bg-color-checked, var(--wpp-brand-color));--checkbox-bg-color-checked-hover:var(--wpp-checkbox-bg-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-bg-color-checked-active:var(--wpp-checkbox-bg-color-checked-active, var(--wpp-brand-color-active));--checkbox-bg-color-checked-disabled:var(--wpp-checkbox-bg-color-checked-disabled, var(--wpp-brand-color-disabled));--checkbox-bg-color-indeterminate:var(--wpp-checkbox-bg-color-indeterminate, var(--wpp-primary-color-100));--checkbox-bg-color-indeterminate-hover:var(--wpp-checkbox-bg-color-indeterminate-hover, var(--wpp-primary-color-100));--checkbox-bg-color-indeterminate-active:var(--wpp-checkbox-bg-color-indeterminate-active, var(--wpp-primary-color-200));--checkbox-bg-color-indeterminate-disabled:var(--wpp-checkbox-bg-color-indeterminate-disabled, var(--wpp-primary-color-100));--checkbox-border-color-indeterminate:var(--wpp-checkbox-border-color-indeterminate, var(--wpp-brand-color));--checkbox-border-color-indeterminate-hover:var(--wpp-checkbox-border-color-indeterminate-hover, var(--wpp-brand-color-hover));--checkbox-border-color-indeterminate-active:var(--wpp-checkbox-border-color-indeterminate-active, var(--wpp-brand-color-active));--checkbox-border-color-indeterminate-disabled:var(--wpp-checkbox-border-color-indeterminate-disabled, var(--wpp-brand-color-disabled));--checkbox-icon-color-indeterminate:var(--wpp-checkbox-icon-color-indeterminate, var(--wpp-brand-color));--checkbox-icon-color-indeterminate-hover:var(--wpp-checkbox-icon-color-indeterminate-hover, var(--wpp-brand-color-hover));--checkbox-icon-color-indeterminate-active:var(--wpp-checkbox-icon-color-indeterminate-active, var(--wpp-brand-color-active));--checkbox-icon-color-indeterminate-disabled:var(--wpp-checkbox-icon-color-indeterminate-disabled, var(--wpp-brand-color-disabled));--checkbox-border-color:var(--wpp-checkbox-border-color, var(--wpp-grey-color-500));--checkbox-border-color-hover:var(--wpp-checkbox-border-color-hover, var(--wpp-grey-color-700));--checkbox-border-color-active:var(--wpp-checkbox-border-color-active, var(--wpp-grey-color-800));--checkbox-border-color-disabled:var(--wpp-checkbox-border-color-disabled, var(--wpp-grey-color-400));--checkbox-border-color-checked:var(--wpp-checkbox-border-color-checked, var(--wpp-brand-color));--checkbox-border-color-checked-hover:var(--wpp-checkbox-border-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-border-color-checked-active:var(--wpp-checkbox-border-color-checked-active, var(--wpp-brand-color-active));--checkbox-border-color-checked-disabled:var(--wpp-checkbox-border-color-checked-disabled, var(--wpp-brand-color-disabled));--checkbox-first-border-color-focus:var(--wpp-checkbox-first-border-color-focus, var(--wpp-grey-color-000));--checkbox-second-border-color-focus:var(--wpp-checkbox-second-border-color-focus, var(--wpp-brand-color));--checkbox-border-width:var(--wpp-checkbox-border-width, var(--wpp-border-width-s));--checkbox-border-style:var(--wpp-checkbox-border-style, solid)}:host(.wpp-checkbox-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;outline:none}:host(.wpp-checkbox-wrapper) .label{display:-ms-inline-flexbox;display:inline-flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;z-index:0}:host(.wpp-checkbox-wrapper) .label.with-text .internal-label-wrapper{margin:var(--checkbox-label-margin);height:20px}:host(.wpp-checkbox-wrapper) .label .label-wrapper{height:var(--checkbox-size);margin-bottom:0;margin-left:0}:host(.wpp-checkbox-wrapper) .label .square{-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--checkbox-size);height:var(--checkbox-size);border:var(--checkbox-border-width) var(--checkbox-border-style) var(--checkbox-border-color);border-radius:var(--checkbox-border-radius);background-color:var(--checkbox-bg-color);content:\"\"}:host(.wpp-checkbox-wrapper) .label .wpp-label-selector{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-checkbox-wrapper) .label .checkbox-input{position:absolute;z-index:-1;width:var(--checkbox-size);height:var(--checkbox-size);margin:0;background-color:var(--checkbox-bg-color);opacity:0}:host(.wpp-checkbox-wrapper) .label:hover .square,:host(.wpp-checkbox-wrapper) .label.hover .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checkbox-wrapper) .label:active .square,:host(.wpp-checkbox-wrapper) .label.active .square{background-color:var(--checkbox-bg-color-active);border-color:var(--checkbox-border-color-active)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label{pointer-events:none}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-disabled)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-disabled);border-color:var(--checkbox-border-color-disabled)}:host(.wpp-checkbox-wrapper) .wpp-icon-tick,:host(.wpp-checkbox-wrapper) .wpp-icon-dash{position:absolute;display:none;height:var(--checkbox-size);color:var(--checkbox-icons-color)}:host(.wpp-checkbox-wrapper) .wpp-inline-message{margin:var(--checkbox-inline-message-margin)}:host(.wpp-checkbox-wrapper):host(:focus-visible) .label .square{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 2px var(--checkbox-second-border-color-focus);box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 2px var(--checkbox-second-border-color-focus);background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checked) .label .square{background-color:var(--checkbox-bg-color-checked);border-color:var(--checkbox-border-color-checked)}:host(.wpp-checked) .label:hover .square,:host(.wpp-checked) .label.hover .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-checked) .label:active .square,:host(.wpp-checked) .label.active .square{background-color:var(--checkbox-bg-color-checked-active);border-color:var(--checkbox-border-color-checked-active)}:host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-checked):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-checked-disabled);border-color:var(--checkbox-border-color-checked-disabled)}:host(.wpp-checked):host(:focus-visible) .label .square{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 2px var(--checkbox-second-border-color-focus);box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 2px var(--checkbox-second-border-color-focus);background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-indeterminate) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate)}:host(.wpp-indeterminate) .label .square{background-color:var(--checkbox-bg-color-indeterminate);border-color:var(--checkbox-border-color-indeterminate)}:host(.wpp-indeterminate) .label:hover .square,:host(.wpp-indeterminate) .label.hover .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.hover .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:active .square,:host(.wpp-indeterminate) .label.active .square{background-color:var(--checkbox-bg-color-indeterminate-active);border-color:var(--checkbox-border-color-indeterminate-active)}:host(.wpp-indeterminate) .label:active .wpp-icon-dash,:host(.wpp-indeterminate) .label.active .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-active)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-indeterminate-disabled);border-color:var(--checkbox-border-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(:focus-visible) .label .square{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 2px var(--checkbox-second-border-color-focus);box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 2px var(--checkbox-second-border-color-focus);background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate):host(:focus-visible) .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-checked) .wpp-icon-tick{display:block}:host(.wpp-indeterminate) .wpp-icon-dash{display:block}";

const WppCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppClickCheckbox = index.createEvent(this, "wppClickCheckbox", 1);
    this.onClick = (event) => {
      event.preventDefault();
      this.setFocus();
      if (this.controlled)
        return this.wppChange.emit({
          value: this.value,
          name: this.name,
          ...(this.indeterminate ? { indeterminate: false, checked: true } : { checked: !this.checked }),
        });
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
      }
      else {
        this.checked = !this.checked;
      }
      this.wppChange.emit({
        value: this.value,
        checked: this.checked,
        name: this.name,
      });
      this.wppClickCheckbox.emit({
        value: this.value,
        checked: this.checked,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-checkbox': true,
      'wpp-checkbox-wrapper': true,
      'wpp-checked': this.checked && !this.indeterminate,
      'wpp-indeterminate': this.indeterminate,
      'wpp-disabled': this.disabled,
    });
    this.labelCssClasses = () => ({
      label: true,
      'with-text': !!this.labelConfig?.text,
      [this.internalState]: true,
    });
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.controlled = false;
    this.indeterminate = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.internalState = '';
    this.index = 0;
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  render() {
    return (index.h(index.Host, { "aria-checked": this.checked, "aria-disabled": this.disabled, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required, role: "checkbox", class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, tabIndex: this.index, exportparts: "body, input, square, icon-tick, icon-dash, message" }, index.h("wpp-label-v2-22-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: this.name, disabled: this.disabled, onClick: this.onClick, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, index.h("input", { class: "checkbox-input", type: "checkbox", id: this.name, name: this.name, disabled: this.disabled, checked: this.checked || this.indeterminate, required: this.required, onFocus: this.onFocus, onBlur: this.onBlur, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, tabIndex: -1, part: "input", title: "" }), index.h("div", { class: "square", part: "square" }), index.h("wpp-icon-tick-v2-22-0", { part: "icon-tick" }), index.h("wpp-icon-dash-v2-22-0", { part: "icon-dash" })), !!this.message && (index.h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
  }
  static get registryIs() { return "wpp-checkbox-v2-22-0"; }
  get host() { return index.getElement(this); }
};
WppCheckbox.style = wppCheckboxCss;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDash = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-dash", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("line", { x1: "7", y1: "10", x2: "13", y2: "10", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-dash-v2-22-0"; }
};
WppIconDash.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTick = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-tick", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6.25 10L8.5747 12.1794C8.76703 12.3597 9.06631 12.3597 9.25864 12.1794L14.25 7.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-tick-v2-22-0"; }
};
WppIconTick.style = wppIconCss;

var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
const ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION = new Set([
  'wpp-action-button',
  'wpp-toggle',
  'wpp-icon',
  'wpp-tag',
  'wpp-typography',
  'wpp-menu-context',
]);
const ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION = new Set([
  'wpp-typography',
  'wpp-tag',
  'wpp-menu-context',
  'wpp-action-button',
]);
const ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION = new Set(['wpp-icon', 'wpp-avatar']);
const ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION = new Set(['wpp-checkbox']);

/**
 * Normalizes a tag name by removing any versioning information (e.g., "-v2-20-0").
 * @param tagName - The original tag name.
 * @returns The normalized tag name.
 */
const normalizeTagName = (tagName) => tagName.split('-v')[0];
/**
 * Validates the content of a slot.
 * Removes any disallowed components and logs warnings for invalid elements.
 *
 * @param host - The host element of the list item.
 * @param slotName - The name of the slot to validate ("left" or "right").
 * @param allowedComponents - The list of allowed components for this slot.
 * @param multiple - Indicates whether the list item’s multiple prop is true.
 */
const validateSlotContent = (host, slotName, allowedComponents, multiple) => {
  const slotElements = Array.from(host.querySelectorAll(`[slot="${slotName}"]`));
  slotElements.forEach(element => {
    const tagName = normalizeTagName(element.tagName.toLowerCase());
    // For the right slot, "wpp-menu-context" is allowed only if multiple is true.
    if (slotName === 'right' && tagName === 'wpp-menu-context' && !multiple) {
      console.warn(`[WppListItem] "wpp-menu-context" is not allowed in single selection mode (multiple is false).`);
      element.remove();
      return;
    }
    // Additionally, allow any Icon when it's not multiple
    const isAllowed = allowedComponents.has(tagName) || (tagName.startsWith('wpp-icon') && !multiple);
    if (!isAllowed) {
      console.warn(`[WppListItem] Invalid component "${tagName}" found in the "${slotName}" slot. Only these components are allowed: ${Array.from(allowedComponents).join(', ')}`);
      element.remove();
    }
  });
};
const validateRightSlotContent = (host, multiple) => {
  const allowedComponents = multiple
    ? ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION
    : ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION;
  validateSlotContent(host, 'right', allowedComponents, multiple);
};
const validateLeftSlotContent = (host, multiple) => {
  const allowedComponents = multiple
    ? ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION
    : ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION;
  validateSlotContent(host, 'left', allowedComponents, multiple);
};

const wppListItemCss = ":host{--li-border-radius:var(--wpp-list-item-border-radius, 6px);--li-height:var(--wpp-list-item-height, 32px);--li-with-caption-height:var(--wpp-list-item-with-caption-height, 52px);--li-width:var(--wpp-list-item-width, 240px);--li-padding:var(--wpp-list-item-padding, 0 8px);--li-with-right-icon-padding:var(--wpp-list-item-with-right-icon-padding, 0 6px 0 8px);--li-text-color-disabled:var(--wpp-list-item-text-color-disabled, var(--wpp-text-color-disabled));--li-caption-text-color:var(--wpp-list-item-caption-text-color, var(--wpp-text-color-info));--li-icons-color-disabled:var(--wpp-list-item-icons-color-disabled, var(--wpp-icon-color-disabled));--li-left-wrapper-margin-right:var(--wpp-list-item-left-wrapper-margin-right, 8px);--li-right-wrapper-margin-right:var(--wpp-list-item-right-wrapper-margin-right, -8px);--li-label-text-line-height:var(--wpp-list-item-label-text-line-height, 24px);--li-label-text-color-selected:var(--wpp-list-item-label-text-color-selected, var(--wpp-brand-color));--li-label-text-color-selected-hover:var(--wpp-list-item-label-text-color-selected-hover, var(--wpp-brand-color-hover));--li-label-text-color-selected-active:var(--wpp-list-item-label-text-color-selected-active, var(--wpp-brand-color-active));--li-bg-color:var(--wpp-list-item-bg-color, transparent);--li-bg-color-hover:var(--wpp-list-item-bg-color-hover, var(--wpp-grey-color-200));--li-bg-color-active:var(--wpp-list-item-bg-color-active, var(--wpp-grey-color-300));--li-bg-color-selected:var(--wpp-list-item-bg-color-selected, var(--wpp-primary-color-100));--li-icon-color-hover:var(--wpp-list-item-icon-color-hover, var(--wpp-icon-color-hover));--li-icon-color-active:var(--wpp-list-item-icon-color-active, var(--wpp-icon-color-active));--li-left-icon-color:var(--wpp-list-item-left-icon-color, var(--wpp-grey-color-800));--li-left-icon-color-hover:var(--wpp-list-item-left-icon-color-hover, var(--wpp-grey-color-800));--li-left-icon-color-active:var(--wpp-list-item-left-icon-color-active, var(--wpp-grey-color-900));--li-left-icon-color-selected:var(--wpp-list-item-left-icon-color-selected, var(--wpp-brand-color));--li-right-icon-color-selected:var(--wpp-list-item-right-icon-color-selected, var(--wpp-grey-color-600));--li-right-text-color:var(--wpp-list-item-right-text-color, var(--wpp-grey-color-800));--li-right-text-color-disabled:var(--wpp-list-item-right-text-color-disabled, var(--wpp-grey-color-500));--li-info-wrapper-padding:var(--wpp-li-info-wrapper-padding, 0 8px 0 0);--li-label-text-font-weight:var(--wpp-list-label-text-font-weight, 400);--li-label-text-font-weight-selected:var(--wpp-list-label-text-font-weight-selected, 500);--li-highlight-font-weight:var(--wpp-list-item-highlight-font-weight, 800);--li-subtitle-text-color:var(--wpp-list-item-subtitle-text-color, var(--wpp-grey-color-1000));--li-subtitle-padding:var(--wpp-li-subtitle-padding, 13px 0 5px 8px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;outline:none}:host .subtitle{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);width:var(--li-width);padding:var(--li-subtitle-padding);color:var(--li-subtitle-text-color)}:host .subtitle.slot-hidden{display:none}:host .item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:var(--li-height);width:var(--li-width);padding:var(--li-padding);background-color:var(--li-bg-color);border-radius:var(--li-border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}:host .item .label{--wpp-typography-s-body-font-weight:var(--li-label-text-font-weight);--wpp-typography-s-body-line-height:var(--li-label-text-line-height)}:host .item .info-wrapper{min-width:0;padding:var(--li-info-wrapper-padding);overflow:hidden}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .body-wrapper .highlight-text-wrapper{width:100%}:host .item .info-wrapper .tooltip{min-width:0}:host .item .info-wrapper .tooltip::part(anchor){overflow:hidden}:host .item .info-wrapper .label.slot-hidden,:host .item .info-wrapper .caption.slot-hidden{display:none}:host .item .info-wrapper .label .highlight-text,:host .item .info-wrapper .label ::slotted(*),:host .item .info-wrapper .caption .highlight-text,:host .item .info-wrapper .caption ::slotted(*){white-space:nowrap;text-overflow:ellipsis}:host .item .info-wrapper .label .highlight-wrapper,:host .item .info-wrapper .caption .highlight-wrapper{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .item .info-wrapper .label .highlight-wrapper .highlight,:host .item .info-wrapper .caption .highlight-wrapper .highlight{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);--wpp-typography-s-strong-font-weight:var(--li-highlight-font-weight)}:host .item ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color)}:host .item.non-interactive,:host .item.has-toggle{cursor:default}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle),:host .item:focus-visible{background-color:var(--li-bg-color-active);outline:none}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item:focus-visible ::slotted([slot=left]),:host .item:focus-visible ::slotted([slot=right]),:host .item:focus-visible .fallback-icon{color:var(--li-icon-color-active)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]),:host .item:focus-visible ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.with-right-icon{padding:var(--li-with-right-icon-padding)}:host .item.checked:not(.non-interactive):not(.has-toggle),:host .item .multiple:not(.non-interactive):not(.has-toggle),:host .item .active:not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);--wpp-typography-s-midi-font-weight:var(--li-label-text-font-weight-selected);--wpp-typography-s-body-line-height:var(--li-label-text-line-height);line-height:var(--li-label-text-line-height);color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight{color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item.checked:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .multiple:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .multiple:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .active:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .active:not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-left-icon-color-selected)}:host .item.multiple.checked:not(.non-interactive):hover .label{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):active .label{color:var(--li-label-text-color-selected-active)}:host .item.with-caption{height:var(--li-with-caption-height)}:host .item.with-caption ::slotted(.wpp-action-button){margin-right:0}:host .item.with-caption .info-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host .item.with-caption .info-wrapper .caption{display:-ms-flexbox;display:flex;color:var(--li-caption-text-color)}:host .item.with-caption .info-wrapper .caption.slot-hidden{display:none}:host .item.with-caption.multiple .info-wrapper{-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .info-wrapper .wpp-checkbox{margin-top:1px}:host .item.with-caption.multiple .right{height:100%;-ms-flex-align:start;align-items:flex-start;margin-top:4px}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-tag){margin-top:3px}:host .item.with-caption.multiple .right ::slotted([slot=right][type=s-body]){margin-top:4px}:host .item.disabled{background-color:transparent;pointer-events:none}:host .item.disabled .info-wrapper .label,:host .item.disabled .info-wrapper .caption{color:var(--li-text-color-disabled)}:host .item.disabled ::slotted([slot=left]),:host .item.disabled ::slotted([slot=right]),:host .item.disabled .fallback-icon{color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted(.wpp-avatar[slot=left]){opacity:0.4}:host .item.disabled ::slotted(.wpp-tag[slot=right]){opacity:0.5}:host .item.disabled ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color-disabled)}:host .item.disabled ::slotted(.wpp-action-button){--ab-inverted-icon-color:var(--li-icons-color-disabled);--ab-tertiary-icon-color:var(--li-icons-color-disabled);--ab-secondary-icon-color:var(--li-icons-color-disabled);--ab-primary-icon-color:var(--li-icons-color-disabled)}:host .item.loading-item{pointer-events:none}:host .item.link{text-decoration:none}:host .item .info-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .label,:host .item .info-wrapper .caption{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .item .wpp-checkbox,:host .item .left{margin-right:var(--li-left-wrapper-margin-right)}:host .item ::slotted(.wpp-action-button),:host .item ::slotted(.wpp-menu-context){margin-right:var(--li-right-wrapper-margin-right)}:host .item .label,:host .item .right,:host .item .left{display:-ms-flexbox;display:flex}:host .item .left.slot-hidden,:host .item .caption.slot-hidden,:host .item .right.slot-hidden{display:none}:host:host(.wpp-disabled){cursor:not-allowed}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item{background-color:var(--li-bg-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-active);--checkbox-border-color:var(--checkbox-border-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=left]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=right]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .fallback-icon{color:var(--li-icon-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked{background-color:var(--wpp-primary-color-300)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-active);--checkbox-border-color-checked:var(--checkbox-border-color-checked-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .info-wrapper .label{color:var(--li-label-text-color-selected-active)}:host(.wpp-hidden){display:none}:host(.wpp-mounted) .label .highlight-text,:host(.wpp-mounted) .label ::slotted(*),:host(.wpp-mounted) .caption .highlight-text,:host(.wpp-mounted) .caption ::slotted(*){overflow:hidden}.with-tooltip{width:100%}.with-tooltip::part(anchor){width:100%}:host(.wpp-loading){opacity:0}";

const WppListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChangeListItem = index.createEvent(this, "wppChangeListItem", 1);
    this.tooltipId = utils.uuidv4();
    this.eventSource = null;
    this.hasRightSlotIcon = false;
    this.checkHasTooltip = () => {
      let labelWrapper = this.host?.shadowRoot?.querySelector('[part="label-wrapper"]');
      if (labelWrapper?.classList.contains('slot-hidden')) {
        labelWrapper = this.host?.shadowRoot?.querySelector('.highlight-text');
        this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth;
        return;
      }
      const labelEl = this.host?.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      const textEl = labelEl?.shadowRoot?.querySelector('.typography');
      if (textEl) {
        this.hasTooltip = textEl.clientWidth < textEl.scrollWidth;
      }
      else {
        this.hasTooltip = labelEl.clientWidth < labelEl.scrollWidth;
      }
    };
    this.handleComponentMount = () => {
      this.mounted = true;
      requestAnimationFrame(() => {
        this.checkHasTooltip();
      });
      this.loading = false;
    };
    this.getSlotText = (slotName) => {
      const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
      return slotEl?.textContent || '';
    };
    this.subtitleSlotCssClasses = () => ({
      subtitle: true,
      'slot-hidden': !this.hasSubtitleSlot,
    });
    this.updateComponentState = (updateData) => {
      if (this.nonInteractive)
        return;
      this.componentState = {
        ...this.componentState,
        ...updateData,
      };
    };
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        caption: '[slot="caption"]',
        left: '[slot="left"]',
        right: '[slot="right"]',
        subtitle: '[slot="subtitle"]',
      });
      this.hasCaptionSlot = !emptyStates.caption;
      this.hasLeftSlot = !emptyStates.left;
      this.hasRightSlot = !emptyStates.right;
      this.hasSubtitleSlot = !emptyStates.subtitle;
      this.hasRightSlot && validateRightSlotContent(this.host, this.multiple);
      this.hasLeftSlot && validateLeftSlotContent(this.host, this.multiple);
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest(utils.transformToVersionedTag('wpp-select')),
        isAutocompleteBasedEvent: !!this.host.closest(utils.transformToVersionedTag('wpp-autocomplete')),
      });
    };
    this.handleRightWrapperClick = () => {
      this.eventSource = EVENT_SOURCE.RIGHT_SLOT;
    };
    this.hostCssClasses = () => ({
      'wpp-list-item': true,
      'wpp-disabled': this.disabled,
      'wpp-hidden': this.hidden,
      'wpp-mounted': this.mounted,
      'wpp-loading': this.loading,
    });
    this.itemWrapperCssClasses = () => ({
      item: true,
      checked: this.checked,
      'has-toggle': this.hasToggle,
      selectable: this.selectable,
      multiple: this.multiple,
      disabled: this.disabled,
      'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
      active: this.active,
      link: this.linkConfig?.href,
      'loading-item': this.isLoadingItem,
      'with-right-icon': this.hasRightSlotIcon,
      'non-interactive': this.nonInteractive,
    });
    this.labelSlotCssClasses = () => ({
      label: true,
      'slot-hidden': Boolean(this.highlight),
    });
    this.leftSlotCssClasses = () => ({
      left: true,
      'slot-hidden': !this.hasLeftSlot,
    });
    this.rightSlotCssClasses = () => ({
      right: true,
      'slot-hidden': !this.hasRightSlot && !this.isExtended && !this.active,
    });
    this.captionSlotCssClasses = () => ({
      caption: true,
      'slot-hidden': !this.hasCaptionSlot || Boolean(this.highlight),
    });
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (index.h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (index.h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, index.h("span", { class: "highlight-text" }, this.getHightlightedText('label')))), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (index.h("div", { class: "caption" }, index.h("span", { class: "highlight-text" }, this.getHightlightedText('caption'))))));
    };
    this.renderRightSlot = () => (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && index.h("wpp-icon-chevron-v2-22-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && index.h("wpp-icon-tick-v2-22-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
    this.loading = true;
    this.mounted = false;
    this.hasCaptionSlot = false;
    this.hasLeftSlot = false;
    this.hasRightSlot = false;
    this.hasCaptionHighlight = false;
    this.hasTooltip = false;
    this.hasToggle = false;
    this.hasSubtitleSlot = false;
    this.componentState = {
      hover: false,
      active: false,
    };
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
    this.disabled = false;
    this.highlight = '';
    this.containerState = undefined;
    this.isExtended = false;
    this.tooltipConfig = {};
    this.labelTooltipConfig = {};
    this.linkConfig = {};
    this.hidden = false;
    this.isLoadingItem = false;
    this.nonInteractive = false;
    this.checkboxName = undefined;
  }
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    setTimeout(() => {
      this.hasRightSlotIcon = !!this.host.querySelector('[slot="right"].wpp-icon');
    }, 0);
    setTimeout(() => {
      this.hasToggle = !!this.host.querySelector('[slot="right"].wpp-toggle');
    }, 0);
    this.debouncedResizeHandler = utils.debounce(() => {
      this.checkHasTooltip();
    }, 50);
  }
  componentDidLoad() {
    this.handleComponentMount();
  }
  disconnectedCallback() {
    this.tooltipId = utils.uuidv4();
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords.highlightWords({
      text: captionText,
      query: newValue,
      matchExactly: true,
    });
    this.hasCaptionHighlight = chunks.some(el => el.match);
  }
  handleViewChange(newContainerState) {
    if (newContainerState === 'shown') {
      this.mounted = false;
      this.loading = false;
      this.hasTooltip = false;
      setTimeout(this.handleComponentMount, 100);
    }
    // Special state for a cases when we have list items inside context menu to trigger tooltip check
    if (newContainerState === 'tooltipTrigger') {
      requestAnimationFrame(this.checkHasTooltip);
    }
  }
  getHightlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords.highlightWords({
      text: slotText,
      query: this.highlight,
      matchExactly: true,
    });
    if (this.highlight && chunks.some(el => el.match)) {
      return (index.h("span", { class: "highlight-wrapper" }, chunks.map(({ text, match }) => match && !this.disabled ? (index.h("span", { key: text, class: "highlight", part: "highlight" }, text)) : (index.h("span", { key: text }, text)))));
    }
    return slotText;
  }
  componentWillRender() {
    this.itemWrapper = this.linkConfig?.href ? 'a' : 'li';
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.handleItemClick, role: this.isExtended ? constants.MENU_BAR_ROLE : constants.CONTEXT_ITEM_TAG, onMouseEnter: () => this.updateComponentState({ hover: true }), onMouseLeave: () => this.updateComponentState({ hover: false }), onMouseDown: () => this.updateComponentState({ active: true }), onMouseUp: () => this.updateComponentState({ active: false }), exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: this.disabled ? -1 : 0 }, this.hasSubtitleSlot && (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), index.h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, index.h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (index.h("wpp-checkbox-v2-22-0", { disabled: this.disabled, checked: this.checked, internalState: displayState, index: -1, part: "checkbox", name: this.checkboxName && this.checkboxName })) : (index.h(index.Fragment, null, this.tooltipConfig.leftSlot ? (index.h("wpp-tooltip-v2-22-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (index.h("wpp-tooltip-v2-22-0", { text: this.getSlotText('label'), config: { placement: 'right', ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (index.h("wpp-tooltip-v2-22-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot()))));
  }
  static get registryIs() { return "wpp-list-item-v2-22-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "highlight": ["highlightUpdate"],
    "containerState": ["handleViewChange"]
  }; }
};
WppListItem.style = wppListItemCss;

exports.wpp_checkbox = WppCheckbox;
exports.wpp_icon_dash = WppIconDash;
exports.wpp_icon_tick = WppIconTick;
exports.wpp_list_item = WppListItem;
