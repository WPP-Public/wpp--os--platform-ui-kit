'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const common = require('./common-ee802540.js');
const subscribeToTheme = require('./subscribe-to-theme-1879a649.js');
const highlightWords = require('./highlight-words-25672f7c.js');
const WrappedSlot = require('./WrappedSlot-dc89a659.js');
const utils = require('./utils-9529c2fe.js');
const isEqual = require('./isEqual-c003d7ce.js');
const constants = require('./constants-780314eb.js');
const menuListConfig = require('./menuListConfig-ec0bf6d4.js');
const consts = require('./consts-d8f5ef98.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./tippy.esm-9d703cd4.js');

const wppCheckboxCss = ":host{--checkbox-icons-color:var(--wpp-checkbox-icons-color, var(--wpp-grey-color-000));--checkbox-size:var(--wpp-checkbox-size, 20px);--checkbox-border-radius:var(--wpp-checkbox-border-radius, var(--wpp-border-radius-xs));--checkbox-inline-message-margin:var(--wpp-checkbox-inline-message-margin, 4px 0 0 0);--checkbox-label-margin:var(--wpp-checkbox-label-margin, 0 0 0 8px);--checkbox-label-text-color-disabled:var(--wpp-checkbox-label-text-color-disabled, var(--wpp-text-color-disabled));--checkbox-label-text-color-checked-disabled:var(\n    --wpp-checkbox-label-text-color-checked-disabled,\n    var(--wpp-text-color-disabled)\n  );--checkbox-bg-color:var(--wpp-checkbox-bg-color-hover, transparent);--checkbox-bg-color-hover:var(\n    --wpp-checkbox-bg-color-hover,\n    color-mix(in srgb, var(--wpp-grey-color-200) 75%, transparent)\n  );--checkbox-bg-color-active:var(--wpp-checkbox-bg-color-active, var(--wpp-grey-color-300));--checkbox-bg-color-disabled:var(--wpp-checkbox-bg-color-disabled, transparent);--checkbox-bg-color-checked:var(--wpp-checkbox-bg-color-checked, var(--wpp-brand-color));--checkbox-bg-color-checked-hover:var(--wpp-checkbox-bg-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-bg-color-checked-active:var(--wpp-checkbox-bg-color-checked-active, var(--wpp-brand-color-active));--checkbox-bg-color-checked-disabled:var(--wpp-checkbox-bg-color-checked-disabled, var(--wpp-brand-color-disabled));--checkbox-bg-color-indeterminate:var(--wpp-checkbox-bg-color-indeterminate, var(--wpp-primary-color-100));--checkbox-bg-color-indeterminate-hover:var(\n    --wpp-checkbox-bg-color-indeterminate-hover,\n    var(--wpp-primary-color-100)\n  );--checkbox-bg-color-indeterminate-active:var(\n    --wpp-checkbox-bg-color-indeterminate-active,\n    var(--wpp-primary-color-200)\n  );--checkbox-bg-color-indeterminate-disabled:var(\n    --wpp-checkbox-bg-color-indeterminate-disabled,\n    var(--wpp-primary-color-100)\n  );--checkbox-border-color-indeterminate:var(--wpp-checkbox-border-color-indeterminate, var(--wpp-brand-color));--checkbox-border-color-indeterminate-hover:var(\n    --wpp-checkbox-border-color-indeterminate-hover,\n    var(--wpp-brand-color-hover)\n  );--checkbox-border-color-indeterminate-active:var(\n    --wpp-checkbox-border-color-indeterminate-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-border-color-indeterminate-disabled:var(\n    --wpp-checkbox-border-color-indeterminate-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-icon-color-indeterminate:var(--wpp-checkbox-icon-color-indeterminate, var(--wpp-brand-color));--checkbox-icon-color-indeterminate-hover:var(\n    --wpp-checkbox-icon-color-indeterminate-hover,\n    var(--wpp-brand-color-hover)\n  );--checkbox-icon-color-indeterminate-active:var(\n    --wpp-checkbox-icon-color-indeterminate-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-icon-color-indeterminate-disabled:var(\n    --wpp-checkbox-icon-color-indeterminate-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-border-color:var(--wpp-checkbox-border-color, var(--wpp-grey-color-500));--checkbox-border-color-hover:var(--wpp-checkbox-border-color-hover, var(--wpp-grey-color-700));--checkbox-border-color-active:var(--wpp-checkbox-border-color-active, var(--wpp-grey-color-800));--checkbox-border-color-disabled:var(--wpp-checkbox-border-color-disabled, var(--wpp-grey-color-400));--checkbox-border-color-checked:var(--wpp-checkbox-border-color-checked, var(--wpp-brand-color));--checkbox-border-color-checked-hover:var(--wpp-checkbox-border-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-border-color-checked-active:var(\n    --wpp-checkbox-border-color-checked-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-border-color-checked-disabled:var(\n    --wpp-checkbox-border-color-checked-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-first-border-color-focus:var(--wpp-checkbox-first-border-color-focus, var(--wpp-grey-color-000));--checkbox-second-border-color-focus:var(--wpp-checkbox-second-border-color-focus, var(--wpp-brand-color));--checkbox-border-width:var(--wpp-checkbox-border-width, var(--wpp-border-width-s));--checkbox-border-style:var(--wpp-checkbox-border-style, solid)}:host(.wpp-checkbox-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;outline:none}:host(.wpp-checkbox-wrapper) .label{display:-ms-inline-flexbox;display:inline-flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;z-index:0}:host(.wpp-checkbox-wrapper) .label.with-text .internal-label-wrapper{margin:var(--checkbox-label-margin);height:20px}:host(.wpp-checkbox-wrapper) .label .label-wrapper{height:var(--checkbox-size);margin-bottom:0;margin-left:0}:host(.wpp-checkbox-wrapper) .label .square{-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--checkbox-size);height:var(--checkbox-size);border:var(--checkbox-border-width) var(--checkbox-border-style) var(--checkbox-border-color);border-radius:var(--checkbox-border-radius);background-color:var(--checkbox-bg-color);content:\"\"}:host(.wpp-checkbox-wrapper) .label .wpp-label-selector{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-checkbox-wrapper) .label .checkbox-input{position:absolute;z-index:-1;width:var(--checkbox-size);height:var(--checkbox-size);margin:0;background-color:var(--checkbox-bg-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border-radius:var(--checkbox-border-radius)}:host(.wpp-checkbox-wrapper) .label .checkbox-input.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 3px var(--checkbox-second-border-color-focus);box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 3px var(--checkbox-second-border-color-focus)}:host(.wpp-checkbox-wrapper) .label:hover .square,:host(.wpp-checkbox-wrapper) .label.hover .square,:host(.wpp-checkbox-wrapper) .label.tab-focus .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checkbox-wrapper) .label:active .square,:host(.wpp-checkbox-wrapper) .label.pressed .square{background-color:var(--checkbox-bg-color-active);border-color:var(--checkbox-border-color-active)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label{pointer-events:none}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-disabled)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-disabled);border-color:var(--checkbox-border-color-disabled)}:host(.wpp-checkbox-wrapper) .wpp-icon-tick,:host(.wpp-checkbox-wrapper) .wpp-icon-dash{position:absolute;display:none;height:var(--checkbox-size);color:var(--checkbox-icons-color)}:host(.wpp-checkbox-wrapper) .wpp-inline-message{margin:var(--checkbox-inline-message-margin)}:host(.wpp-checkbox-wrapper):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checked) .label .square{background-color:var(--checkbox-bg-color-checked);border-color:var(--checkbox-border-color-checked)}:host(.wpp-checked) .label:hover .square,:host(.wpp-checked) .label.hover .square,:host(.wpp-checked) .label.tab-focus .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-checked) .label:active .square,:host(.wpp-checked) .label.pressed .square{background-color:var(--checkbox-bg-color-checked-active);border-color:var(--checkbox-border-color-checked-active)}:host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-checked):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-checked-disabled);border-color:var(--checkbox-border-color-checked-disabled)}:host(.wpp-checked):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-indeterminate) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate)}:host(.wpp-indeterminate) .label .square{background-color:var(--checkbox-bg-color-indeterminate);border-color:var(--checkbox-border-color-indeterminate)}:host(.wpp-indeterminate) .label:hover .square,:host(.wpp-indeterminate) .label.hover .square,:host(.wpp-indeterminate) .label.tab-focus .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.tab-focus .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:active .square,:host(.wpp-indeterminate) .label.pressed .square{background-color:var(--checkbox-bg-color-indeterminate-active);border-color:var(--checkbox-border-color-indeterminate-active)}:host(.wpp-indeterminate) .label:active .wpp-icon-dash,:host(.wpp-indeterminate) .label.pressed .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-active)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-indeterminate-disabled);border-color:var(--checkbox-border-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate):host(:focus-visible) .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-checked) .wpp-icon-tick{display:block}:host(.wpp-indeterminate) .wpp-icon-dash{display:block}:host([data-wpp-theme=dark]){--checkbox-icons-color:var(--wpp-grey-color-100)}";

const WppCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppClickCheckbox = index.createEvent(this, "wppClickCheckbox", 1);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.onClick = (event) => {
      event.preventDefault();
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
      this.focusType = common.FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
      this.isPressed = false;
    };
    this.onKeyUp = (event) => {
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if (event.key === 'Tab' && this.host?.shadowRoot?.activeElement === this.inputRef)
        this.focusType = common.FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onKeyDown = (event) => {
      if (this.disabled)
        return;
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if ((event.key === 'Enter' || event.key === ' ') && this.host?.shadowRoot?.activeElement === this.inputRef) {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
        this.isPressed = true;
        this.checked = !this.checked;
      }
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
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      pressed: this.isPressed,
    });
    this.inputCssClasses = () => ({
      'checkbox-input': true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.isPressed = false;
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
    this.decorative = false;
    this.isDarkTheme = undefined;
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    if (!this.inputRef)
      return;
    this.inputRef.focus();
    this.focusType = common.FOCUS_TYPE.TAB;
  }
  onUpdateDarkTheme() {
    // In case the `checkbox` component subscribed to theme changes before the parent component starts controlling the `isDarkTheme` prop.
    if (this.isDarkTheme !== undefined) {
      this.themeSubscription.stop();
    }
  }
  connectedCallback() {
    // By default, the component will subscribe to theme changes, unless the `isDarkTheme` property is passed explicitly from the parent component (from wpp-list-item).
    // This is needed in order to avoid unnecessary subscription to theme changes for each checkbox from wpp-list-item.
    if (this.isDarkTheme === undefined) {
      this.themeSubscription.start();
    }
  }
  disconnectedCallback() {
    if (this.isDarkTheme === undefined) {
      this.themeSubscription.stop();
    }
  }
  render() {
    if (this.decorative)
      return (index.h(index.Host, { class: this.hostCssClasses(), "aria-hidden": "true", role: "presentation", tabindex: "-1", exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name, ...(this.isDarkTheme !== undefined ? { 'data-wpp-theme': this.isDarkTheme ? 'dark' : 'light' } : {}) }, index.h("wpp-label-v4-3-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, index.h("div", { class: "square", part: "square" }), index.h("wpp-icon-tick-v4-3-0", { part: "icon-tick" }), index.h("wpp-icon-dash-v4-3-0", { part: "icon-dash" })), !!this.message && (index.h("wpp-inline-message-v4-3-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
    return (index.h(index.Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name, ...(this.isDarkTheme !== undefined ? { 'data-wpp-theme': this.isDarkTheme ? 'dark' : 'light' } : {}) }, index.h("wpp-label-v4-3-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: this.name, disabled: this.disabled, onClick: this.onClick, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, index.h("input", { class: this.inputCssClasses(), type: "checkbox", id: this.name, name: this.name, disabled: this.disabled, checked: this.checked || this.indeterminate, required: this.required, onFocus: this.onFocus, onBlur: this.onBlur, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required.toString(), tabindex: this.disabled ? '-1' : this.index, part: "input" }), index.h("div", { class: "square", part: "square" }), index.h("wpp-icon-tick-v4-3-0", { part: "icon-tick" }), index.h("wpp-icon-dash-v4-3-0", { part: "icon-dash" })), !!this.message && (index.h("wpp-inline-message-v4-3-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
  }
  static get registryIs() { return "wpp-checkbox-v4-3-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "isDarkTheme": ["onUpdateDarkTheme"]
  }; }
};
WppCheckbox.style = wppCheckboxCss;

var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
const PRESENTATION_ROLE = 'presentation';
const MENU_ITEM_ACTIVE_CLASS = 'wpp-menu-item-active';
const INTERACTIVE_RIGHT_SLOT_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[contenteditable="true"]',
].join(',');
const INTERACTIVE_RIGHT_SLOT_ROLES = [
  'button',
  'checkbox',
  'combobox',
  'link',
  'menu',
  'menuitem',
  'option',
  'radio',
  'searchbox',
  'slider',
  'spinbutton',
  'switch',
  'tab',
  'textbox',
];
const INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS = [
  'wpp-action-button',
  'wpp-button',
  'wpp-checkbox',
  'wpp-menu-context',
  'wpp-radio',
  'wpp-toggle',
];

/**
 * Type guard to validate theme color usage
 */
const isValidThemeColor = (color) => color.startsWith('var(--wpp-') && color.endsWith(')');
/**
 * Helper to get color value with proper CSS variable syntax
 */
const getThemeColor = (color) => {
  // If already a CSS variable, return as is
  if (color.startsWith('var(')) {
    return color;
  }
  // If it's a raw token, wrap it
  if (color.startsWith('--wpp-')) {
    return `var(${color})`;
  }
  // Otherwise return as is (for edge cases)
  return color;
};

const wppListItemCss = ":host{--li-border-radius:var(--wpp-list-item-border-radius, 6px);--li-height:var(--wpp-list-item-height, 32px);--li-with-caption-height:var(--wpp-list-item-with-caption-height, 52px);--li-custom-typography-height:var(--wpp-list-item-custom-typography-height, auto);--li-width:var(--wpp-list-item-width, 240px);--li-padding:var(--wpp-list-item-padding, 4px 8px);--li-with-right-icon-padding:var(--wpp-list-item-with-right-icon-padding, 0 6px 0 8px);--li-text-color-disabled:var(--wpp-list-item-text-color-disabled, var(--wpp-text-color-disabled));--li-caption-text-color:var(--wpp-list-item-caption-text-color, var(--wpp-grey-color-800));--li-caption-text-color-selected:var(--wpp-list-item-caption-text-color-selected, var(--wpp-brand-color));--li-icons-color-disabled:var(--wpp-list-item-icons-color-disabled, var(--wpp-icon-color-disabled));--li-left-wrapper-margin-right:var(--wpp-list-item-left-wrapper-margin-right, 8px);--li-right-wrapper-margin-right:var(--wpp-list-item-right-wrapper-margin-right, -8px);--li-label-text-line-height:var(--wpp-list-item-label-text-line-height, 22px);--li-label-text-color-selected:var(--wpp-list-item-label-text-color-selected, var(--wpp-brand-color));--li-label-text-color-selected-hover:var(\n    --wpp-list-item-label-text-color-selected-hover,\n    var(--wpp-brand-color-hover)\n  );--li-label-text-color-selected-active:var(\n    --wpp-list-item-label-text-color-selected-active,\n    var(--wpp-brand-color-active)\n  );--li-avatar-bg-color-selected:var(--wpp-li-avatar-bg-color-selected, var(--wpp-primary-color-200));--li-bg-color:var(--wpp-list-item-bg-color, transparent);--li-bg-color-hover:var(--wpp-list-item-bg-color-hover, var(--wpp-grey-color-200));--li-bg-color-active:var(--wpp-list-item-bg-color-active, var(--wpp-grey-color-300));--li-bg-color-selected:var(--wpp-list-item-bg-color-selected, var(--wpp-primary-color-100));--li-icon-color-hover:var(--wpp-list-item-icon-color-hover, var(--wpp-icon-color-hover));--li-icon-color-active:var(--wpp-list-item-icon-color-active, var(--wpp-icon-color-active));--li-left-icon-color:var(--wpp-list-item-left-icon-color, var(--wpp-grey-color-800));--li-left-icon-color-hover:var(--wpp-list-item-left-icon-color-hover, var(--wpp-grey-color-800));--li-left-icon-color-active:var(--wpp-list-item-left-icon-color-active, var(--wpp-grey-color-900));--li-left-icon-color-selected:var(--wpp-list-item-left-icon-color-selected, var(--wpp-brand-color));--li-right-icon-color-selected:var(--wpp-list-item-right-icon-color-selected, var(--wpp-grey-color-600));--li-right-text-color:var(--wpp-list-item-right-text-color, var(--wpp-grey-color-800));--li-right-text-color-disabled:var(--wpp-list-item-right-text-color-disabled, var(--wpp-grey-color-500));--li-info-wrapper-padding:var(--wpp-li-info-wrapper-padding, 0 8px 0 0);--li-label-text-font-weight:var(--wpp-list-label-text-font-weight, 400);--li-label-text-font-weight-selected:var(--wpp-list-label-text-font-weight-selected, 500);--li-highlight-font-weight:var(--wpp-list-item-highlight-font-weight, 800);--li-subtitle-text-color:var(--wpp-list-item-subtitle-text-color, var(--wpp-grey-color-800));--li-subtitle-padding:var(--wpp-li-subtitle-padding, 12px 0 4px 8px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;outline:none}:host .subtitle{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0);width:var(--li-width);padding:var(--li-subtitle-padding);color:var(--li-subtitle-text-color)}:host .subtitle.slot-hidden{display:none}:host .item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:var(--li-height);width:var(--li-width);padding:var(--li-padding);background-color:var(--li-bg-color);border-radius:var(--li-border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}:host .item .right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .item .label{--wpp-typography-s-body-font-weight:var(--li-label-text-font-weight);--wpp-typography-s-body-line-height:var(--li-label-text-line-height)}:host .item .info-wrapper{min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0;overflow:hidden}:host .item .info-wrapper .body-wrapper .highlight-text-wrapper{width:100%}:host .item .info-wrapper .tooltip{min-width:0}:host .item .info-wrapper .tooltip::part(anchor){overflow:hidden}:host .item .info-wrapper .label.slot-hidden,:host .item .info-wrapper .caption.slot-hidden{display:none}:host .item .info-wrapper .label .highlight-text,:host .item .info-wrapper .label ::slotted(*),:host .item .info-wrapper .caption .highlight-text,:host .item .info-wrapper .caption ::slotted(*){white-space:nowrap;text-overflow:ellipsis}:host .item .info-wrapper .label .highlight-wrapper,:host .item .info-wrapper .caption .highlight-wrapper{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .item .info-wrapper .label .highlight-wrapper .highlight,:host .item .info-wrapper .caption .highlight-wrapper .highlight{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);--wpp-typography-s-strong-font-weight:var(--li-highlight-font-weight)}:host .item ::slotted([slot=right][type=s-body]),:host .item ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-right-text-color)}:host .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color)}:host .item.non-interactive,:host .item.has-toggle{cursor:default}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-hover)}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-hover)}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-active);outline:none}:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon,:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-active)}:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.checked:not(.non-interactive,.has-toggle),:host .item .multiple:not(.non-interactive,.has-toggle),:host .item .active:not(.non-interactive,.has-toggle){background-color:var(--li-bg-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) .info-wrapper .label,:host .item .multiple:not(.non-interactive,.has-toggle) .info-wrapper .label,:host .item .active:not(.non-interactive,.has-toggle) .info-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);--wpp-typography-s-midi-font-weight:var(--li-label-text-font-weight-selected);--wpp-typography-s-body-line-height:var(--li-label-text-line-height);line-height:var(--li-label-text-line-height);color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .multiple:not(.non-interactive,.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .active:not(.non-interactive,.has-toggle) .info-wrapper .label .highlight-wrapper .highlight{color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item.checked:not(.non-interactive,.has-toggle) .fallback-icon,:host .item .multiple:not(.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item .multiple:not(.non-interactive,.has-toggle) .fallback-icon,:host .item .active:not(.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item .active:not(.non-interactive,.has-toggle) .fallback-icon{color:var(--li-left-icon-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) ::slotted(.wpp-icon-avatar[slot=left]),:host .item .multiple:not(.non-interactive,.has-toggle) ::slotted(.wpp-icon-avatar[slot=left]),:host .item .active:not(.non-interactive,.has-toggle) ::slotted(.wpp-icon-avatar[slot=left]){--wpp-avatar-icon-bg-color:var(--li-avatar-bg-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle).with-caption .info-wrapper .caption,:host .item .multiple:not(.non-interactive,.has-toggle).with-caption .info-wrapper .caption,:host .item .active:not(.non-interactive,.has-toggle).with-caption .info-wrapper .caption{color:var(--li-caption-text-color-selected)}:host .item.multiple.checked:not(.non-interactive):hover .label{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):hover .info-wrapper .caption{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):active .wpp-checkbox{--wpp-checkbox-bg-color-checked:var(--li-label-text-color-selected-active)}:host .item.multiple.checked:not(.non-interactive):active .label{color:var(--li-label-text-color-selected-active)}:host .item.multiple.checked:not(.non-interactive):active .info-wrapper .caption{color:var(--li-label-text-color-selected-active)}:host .item.with-caption{height:var(--li-with-caption-height)}:host .item.with-caption ::slotted(.wpp-action-button){margin-right:0}:host .item.with-caption .info-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:start;align-items:flex-start}:host .item.with-caption .info-wrapper .caption{display:-ms-flexbox;display:flex;font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0);color:var(--li-caption-text-color)}:host .item.with-caption .info-wrapper .caption.slot-hidden{display:none}:host .item.with-caption.multiple .info-wrapper{-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .info-wrapper .wpp-checkbox{margin-top:1px}:host .item.with-caption.multiple .right{height:100%;-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-typography){margin-top:1px}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-menu-context),:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-action-button){margin-top:-4px}:host .item.disabled{background-color:transparent;pointer-events:none}:host .item.disabled .info-wrapper .label,:host .item.disabled .info-wrapper .caption{color:var(--li-text-color-disabled)}:host .item.disabled ::slotted([slot=right][type=s-body]),:host .item.disabled ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted([slot=left]),:host .item.disabled ::slotted([slot=right]),:host .item.disabled .fallback-icon{color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted(.wpp-avatar[slot=left]){opacity:0.4}:host .item.disabled ::slotted(.wpp-tag[slot=right]){opacity:0.5}:host .item.disabled ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color-disabled)}:host .item.disabled ::slotted(.wpp-action-button){--ab-inverted-icon-color:var(--li-icons-color-disabled);--ab-tertiary-icon-color:var(--li-icons-color-disabled);--ab-secondary-icon-color:var(--li-icons-color-disabled);--ab-primary-icon-color:var(--li-icons-color-disabled)}:host .item.loading-item{pointer-events:none}:host .item.link{text-decoration:none}:host .item .info-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .item .wpp-checkbox,:host .item .left{margin-right:var(--li-left-wrapper-margin-right)}:host .item ::slotted(.wpp-action-button),:host .item ::slotted(.wpp-menu-context){margin-right:var(--li-right-wrapper-margin-right)}:host .item .label,:host .item .right,:host .item .left{display:-ms-flexbox;display:flex}:host .item .left.slot-hidden,:host .item .caption.slot-hidden,:host .item .right.slot-hidden{display:none}:host .item.with-right-slot .info-wrapper{padding:var(--li-info-wrapper-padding)}:host:host(.wpp-disabled){cursor:not-allowed}:host(:focus-visible:not(.wpp-disabled,.non-interactive)){outline:none}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item{border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);background-color:var(--li-bg-color-hover)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-hover);--checkbox-border-color:var(--checkbox-border-color-hover)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item ::slotted([slot=left]),:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item ::slotted([slot=right]),:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item .fallback-icon{color:var(--li-icon-color-hover)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item.checked{background-color:var(--wpp-primary-color-200)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-active);--checkbox-border-color-checked:var(--checkbox-border-color-checked-active)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item.checked .info-wrapper .label{color:var(--li-label-text-color-selected-active)}:host(.has-right-slot) .item{padding:var(--li-with-right-icon-padding)}:host(.wpp-hidden){display:none}:host(.wpp-mounted) .label .highlight-text,:host(.wpp-mounted) .label ::slotted(*),:host(.wpp-mounted) .caption .highlight-text,:host(.wpp-mounted) .caption ::slotted(*){overflow:hidden}.with-tooltip{width:100%}.with-tooltip::part(anchor){width:100%}:host(.wpp-loading){opacity:0}.ul-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;padding:0;margin:0}:host(.tab-focus) .item{border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);background-color:var(--li-bg-color-hover)}:host(.tab-focus) .item ::slotted([slot=left]),:host(.tab-focus) .item ::slotted([slot=right]),:host(.tab-focus) .item .fallback-icon{color:var(--li-icon-color-hover)}:host(.tab-focus) .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host([role=menuitem].tab-focus) .item,:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item{outline:none;-webkit-box-shadow:none;box-shadow:none}:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-active)}:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon,:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-active)}:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-active)}:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-active)}:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.custom-typography{height:var(--li-custom-typography-height);min-height:var(--li-height)}:host .item.custom-typography.multiple{-ms-flex-align:start;align-items:flex-start}:host .item.custom-typography.with-caption{min-height:var(--li-with-caption-height)}:host .label.custom-typography ::slotted([slot=label]){font-size:var(--wpp-list-item-label-font-size) !important;font-weight:var(--wpp-list-item-label-font-weight) !important;font-family:var(--wpp-list-item-label-font-family) !important;font-style:var(--wpp-list-item-label-font-style) !important;line-height:var(--wpp-list-item-label-line-height) !important;letter-spacing:var(--wpp-list-item-label-letter-spacing) !important;text-transform:var(--wpp-list-item-label-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-label-text-decoration) !important;text-decoration:var(--wpp-list-item-label-text-decoration) !important;color:var(--wpp-list-item-label-color) !important}:host .caption.custom-typography ::slotted([slot=caption]){font-size:var(--wpp-list-item-caption-font-size) !important;font-weight:var(--wpp-list-item-caption-font-weight) !important;font-family:var(--wpp-list-item-caption-font-family) !important;font-style:var(--wpp-list-item-caption-font-style) !important;line-height:var(--wpp-list-item-caption-line-height) !important;letter-spacing:var(--wpp-list-item-caption-letter-spacing) !important;text-transform:var(--wpp-list-item-caption-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-caption-text-decoration) !important;text-decoration:var(--wpp-list-item-caption-text-decoration) !important;color:var(--wpp-list-item-caption-color) !important}:host([data-wpp-theme=dark]){--li-label-text-color-selected:var(--wpp-primary-color-800);--li-label-text-color-selected-hover:var(--wpp-primary-color-700);--li-label-text-color-selected-active:var(--wpp-primary-color-800);--li-caption-text-color-selected:var(--wpp-primary-color-800)}:host([data-wpp-theme=dark]) .item.checked:not(.non-interactive,.has-toggle),:host([data-wpp-theme=dark]) .item .multiple:not(.non-interactive,.has-toggle),:host([data-wpp-theme=dark]) .item .active:not(.non-interactive,.has-toggle){--li-right-text-color:var(--wpp-primary-color-700);background-color:var(--wpp-primary-color-300)}:host([data-wpp-theme=dark]) .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--wpp-grey-color-400)}:host([data-wpp-theme=dark]) .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle),:host([data-wpp-theme=dark]) .item:focus-visible{background-color:var(--wpp-grey-color-500)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)[data-wpp-theme=dark]) .item:not(.checked){background-color:var(--wpp-grey-color-300)}:host(.tab-focus[data-wpp-theme=dark]) .item:not(.checked){background-color:var(--wpp-grey-color-300)}";

const WppListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChangeListItem = index.createEvent(this, "wppChangeListItem", 1);
    this.tooltipId = utils.uuidv4();
    this.eventSource = null;
    this.hasRightSlotIcon = false;
    this.previousLabelText = '';
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.removeTriggerWrapperAttributes = () => {
      const menuContextTag = utils.transformToVersionedTag('wpp-menu-context').toUpperCase();
      const menuContext = this.hostElement?.querySelector(`${menuContextTag}[slot="right"]`);
      if (menuContext) {
        let triggerWrapper = menuContext.querySelector('.trigger-wrapper');
        if (triggerWrapper) {
          triggerWrapper.removeAttribute('tabindex');
          triggerWrapper.removeAttribute('role');
        }
        else {
          this.triggerWrapperObserver = new MutationObserver(() => {
            triggerWrapper = menuContext.querySelector('.trigger-wrapper');
            if (triggerWrapper) {
              triggerWrapper.removeAttribute('tabindex');
              triggerWrapper.removeAttribute('role');
              this.triggerWrapperObserver?.disconnect();
              this.triggerWrapperObserver = undefined;
            }
          });
          this.triggerWrapperObserver.observe(menuContext, { childList: true, subtree: true });
        }
      }
    };
    this.setupLabelContentObserver = () => {
      const labelEl = this.host.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      // Create a new observer that will watch for text changes
      this.labelObserver = new MutationObserver(() => {
        const currentLabelText = labelEl.textContent || '';
        if (currentLabelText !== this.previousLabelText) {
          this.previousLabelText = currentLabelText;
          this.updateSlotData();
          this.queueTooltipCheck();
        }
      });
      // Configure the observer to watch for changes in text content and child nodes
      this.labelObserver.observe(labelEl, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    };
    this.checkHasTooltip = () => {
      if (!this.isHostConnected())
        return;
      const hostElement = this.hostElement;
      let labelWrapper = hostElement?.shadowRoot?.querySelector('[part="label-wrapper"]');
      if (labelWrapper?.classList.contains('slot-hidden')) {
        labelWrapper = hostElement?.shadowRoot?.querySelector('.highlight-text');
        this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth;
        return;
      }
      const labelEl = hostElement?.querySelector('[slot="label"]');
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
      if (!this.isHostConnected())
        return;
      this.mounted = true;
      this.queueTooltipCheck();
      this.loading = false;
      // An item that hydrated while detached inside a menu-context Tippy popup can
      // end up with a stuck render queue: setting `loading` here updates the state
      // but never re-renders, so the host keeps the `wpp-loading` (opacity: 0) class
      // and stays invisible. Force the host to reconcile so it becomes visible.
      index.forceUpdate(this);
    };
    this.isHostConnected = () => this.hostElement?.isConnected ?? false;
    this.queueTooltipCheck = () => {
      if (this.tooltipAnimationFrame !== undefined)
        cancelAnimationFrame(this.tooltipAnimationFrame);
      this.tooltipAnimationFrame = requestAnimationFrame(() => {
        this.tooltipAnimationFrame = undefined;
        this.checkHasTooltip();
      });
    };
    this.clearPendingCallbacks = () => {
      if (this.focusTimeout)
        clearTimeout(this.focusTimeout);
      if (this.rightSlotIconTimeout)
        clearTimeout(this.rightSlotIconTimeout);
      if (this.toggleSlotTimeout)
        clearTimeout(this.toggleSlotTimeout);
      if (this.mountTimeout)
        clearTimeout(this.mountTimeout);
      if (this.tooltipAnimationFrame !== undefined)
        cancelAnimationFrame(this.tooltipAnimationFrame);
      this.focusTimeout = undefined;
      this.rightSlotIconTimeout = undefined;
      this.toggleSlotTimeout = undefined;
      this.mountTimeout = undefined;
      this.tooltipAnimationFrame = undefined;
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
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled || this.nonInteractive)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest('.wpp-select-portal'),
        isAutocompleteBasedEvent: !!this.host.closest(utils.transformToVersionedTag('wpp-autocomplete')),
      });
    };
    this.isInteractiveRightSlotElement = (eventTarget) => {
      const element = eventTarget;
      if (typeof element?.tagName !== 'string')
        return false;
      const tagName = element.tagName.toLowerCase();
      const role = element.getAttribute?.('role')?.toLowerCase();
      const tabIndex = element.getAttribute?.('tabindex');
      return (INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS.some(componentTagName => tagName === componentTagName || tagName.startsWith(`${componentTagName}-`)) ||
        (typeof element.matches === 'function' && element.matches(INTERACTIVE_RIGHT_SLOT_SELECTOR)) ||
        (role !== undefined && INTERACTIVE_RIGHT_SLOT_ROLES.includes(role)) ||
        (tabIndex !== null && Number(tabIndex) >= 0));
    };
    this.isInteractiveRightSlotEvent = (event) => {
      const composedPath = event.composedPath();
      const currentTargetIndex = composedPath.indexOf(event.currentTarget);
      const slottedContentPath = currentTargetIndex === -1 ? [event.target] : composedPath.slice(0, currentTargetIndex);
      return slottedContentPath.some(this.isInteractiveRightSlotElement);
    };
    this.handleRightWrapperClick = (event) => {
      this.eventSource = this.isInteractiveRightSlotEvent(event) ? EVENT_SOURCE.RIGHT_SLOT : null;
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
      'interaction-active': this.componentState.active,
      'has-toggle': this.hasToggle,
      selectable: this.selectable,
      multiple: this.multiple,
      disabled: this.disabled,
      'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
      active: this.active,
      link: this.linkConfig?.href,
      'loading-item': this.isLoadingItem,
      'with-right-icon': this.hasRightSlotIcon,
      'with-right-slot': this.hasRightSlot,
      'non-interactive': this.nonInteractive,
      'custom-typography': !!this.labelTypography || !!this.captionTypography,
    });
    this.labelSlotCssClasses = () => ({
      label: true,
      'slot-hidden': Boolean(this.highlight),
      'custom-typography': !!this.labelTypography,
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
      'custom-typography': !!this.captionTypography,
    });
    this.ulWrapperCssClasses = () => ({
      'ul-wrapper': true,
    });
    this.getHostRole = () => this.host.getAttribute('role') || PRESENTATION_ROLE;
    this.getHostTabIndex = () => {
      if (this.disabled || this.nonInteractive)
        return -1;
      const tabIndex = this.host.getAttribute('tabindex');
      return tabIndex === null ? 0 : Number(tabIndex);
    };
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (index.h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (index.h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, index.h("span", { class: "highlight-text" }, this.getHighlightedText('label')))), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (index.h("div", { class: "caption" }, index.h("span", { class: "highlight-text" }, this.getHighlightedText('caption'))))));
    };
    this.renderRightSlot = () => (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && index.h("wpp-icon-chevron-v4-3-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && index.h("wpp-icon-tick-v4-3-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
    this.handleMouseEnter = () => {
      this.updateComponentState({ hover: true });
    };
    this.handleMouseLeave = () => {
      this.updateComponentState({ hover: false });
    };
    this.handleMouseDown = () => {
      this.updateComponentState({ active: true });
    };
    this.handleMouseUp = () => {
      this.updateComponentState({ active: false });
    };
    this.isManagedByMenuContext = () => this.host.getAttribute('role') === 'menuitem' ||
      Boolean(this.host.closest('wpp-menu-context') || this.host.closest(utils.transformToVersionedTag('wpp-menu-context')));
    this.handleKeyDown = (event) => {
      if (this.disabled || this.nonInteractive)
        return;
      if (this.isManagedByMenuContext())
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) {
          this.updateComponentState({ active: true });
        }
        this.handleItemClick();
      }
    };
    this.handleKeyUp = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        this.updateComponentState({ active: false });
      }
    };
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
    this.labelTypography = undefined;
    this.captionTypography = undefined;
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
    this.indeterminate = false;
    this.disabled = false;
    this.highlight = '';
    this.containerState = undefined;
    this.isExtended = false;
    this.tooltipConfig = {};
    this.labelTooltipConfig = {};
    this.linkConfig = {};
    this.hidden = false;
    this.isLoadingItem = false;
    this.isDarkTheme = undefined;
    this.nonInteractive = false;
    this.checkboxName = undefined;
  }
  /**
   * Sets focus on the list-item element.
   */
  async setFocus() {
    const hostElement = this.hostElement || this.host;
    this.focusTimeout = setTimeout(() => {
      if (!hostElement.isConnected)
        return;
      hostElement.focus();
      this.focusTimeout = undefined;
    }, 0);
  }
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  typographyLabel() {
    this.applyTypographyVariables('label', this.labelTypography || {});
  }
  onUpdateDarkTheme() {
    // In case the `list-item` component subscribed to theme changes before the parent component starts controlling the `isDarkTheme` prop.
    if (this.isDarkTheme !== undefined) {
      this.themeSubscription.stop();
    }
  }
  typographyCaption() {
    this.applyTypographyVariables('caption', this.captionTypography || {});
  }
  componentWillLoad() {
    this.hostElement = this.host;
    this.updateSlotData();
    this.hasRightSlot = !!this.hostElement.querySelector('[slot="right"]');
    this.rightSlotIconTimeout = setTimeout(() => {
      if (!this.isHostConnected())
        return;
      this.hasRightSlotIcon = !!this.hostElement?.querySelector('[slot="right"].wpp-icon');
      this.rightSlotIconTimeout = undefined;
    }, 0);
    this.toggleSlotTimeout = setTimeout(() => {
      if (!this.isHostConnected())
        return;
      this.hasToggle = !!this.hostElement?.querySelector('[slot="right"].wpp-toggle');
      this.toggleSlotTimeout = undefined;
    }, 0);
    this.debouncedResizeHandler = utils.debounce(() => {
      this.checkHasTooltip();
    }, 50);
  }
  componentDidLoad() {
    this.handleComponentMount();
    this.setupLabelContentObserver();
    this.removeTriggerWrapperAttributes();
    this.typographyLabel();
    this.typographyCaption();
  }
  applyTypographyVariables(slotName, props) {
    if (!props)
      return;
    const prefix = `--wpp-list-item-${slotName}`;
    const cssAttrs = ['font-weight', 'font-size', 'font-family', 'line-height', 'letter-spacing', 'text-transform'];
    if (props.type) {
      cssAttrs.forEach(attr => {
        const varName = `--wpp-typography-${props.type}-${attr}`;
        let value = getComputedStyle(this.host).getPropertyValue(varName).trim();
        if (!value)
          value = getComputedStyle(document.body).getPropertyValue(varName).trim();
        if (value)
          this.host.style.setProperty(`${prefix}-${attr}`, value);
      });
    }
    // Only apply custom color if the component is not disabled
    if (props.color && !this.disabled) {
      // Validate and normalize the color
      const normalizedColor = getThemeColor(props.color);
      if (!isValidThemeColor(props.color)) {
        console.warn(`[WppListItem] Using non-theme color "${props.color}". ` +
          `Consider using theme colors CSS variables like "var(--wpp-brand-color)"`);
      }
      this.host.style.setProperty(`${prefix}-color`, normalizedColor);
    }
    else if (this.disabled && props.color) {
      // Remove custom color when disabled to let the disabled state color take effect
      this.host.style.removeProperty(`${prefix}-color`);
    }
  }
  connectedCallback() {
    // By default, the component will subscribe to theme changes, unless the `isDarkTheme` property is passed explicitly from the parent component (from select, autocomplete).
    // This is needed in order to avoid unnecessary subscription to theme changes for each list-item.
    if (this.isDarkTheme === undefined) {
      this.themeSubscription.start();
    }
    this.handleComponentMount();
  }
  disconnectedCallback() {
    if (this.isDarkTheme === undefined) {
      this.themeSubscription.stop();
    }
    this.tooltipId = utils.uuidv4();
    this.clearPendingCallbacks();
    if (this.labelObserver) {
      this.labelObserver.disconnect();
    }
    if (this.triggerWrapperObserver) {
      this.triggerWrapperObserver.disconnect();
      this.triggerWrapperObserver = undefined;
    }
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords.highlightWords({
      text: captionText,
      query: newValue || '',
      matchExactly: true,
    });
    this.hasCaptionHighlight = chunks.some(el => el.match);
  }
  handleViewChange(newContainerState) {
    if (newContainerState === 'shown') {
      this.mounted = false;
      this.loading = false;
      this.hasTooltip = false;
      this.mountTimeout = setTimeout(() => {
        this.handleComponentMount();
        this.mountTimeout = undefined;
      }, 100);
    }
    // Special state for cases when we have list items inside a context menu.
    // When hosted in a menu-context, the item hydrates while detached inside the
    // Tippy popup, so componentDidLoad's handleComponentMount bails on the
    // isHostConnected guard and the item stays stuck in the loading (opacity: 0)
    // state. The menu sets container-state='tooltipTrigger' as the popup opens,
    // but the popup may not be attached yet when this watcher fires, so defer the
    // mount to the next tick once the item is reconnected. Otherwise just run the
    // tooltip check.
    if (newContainerState === 'tooltipTrigger') {
      if (this.loading) {
        this.mountTimeout = setTimeout(() => {
          this.handleComponentMount();
          this.mountTimeout = undefined;
        }, 0);
      }
      else {
        this.queueTooltipCheck();
      }
    }
  }
  disabledChanged() {
    this.typographyLabel();
    this.typographyCaption();
  }
  getHighlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords.highlightWords({
      text: slotText,
      query: this.highlight || '',
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
    return (index.h(index.Host, { class: this.hostCssClasses(), role: this.getHostRole(), exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: this.getHostTabIndex(), ...(this.isDarkTheme !== undefined ? { 'data-wpp-theme': this.isDarkTheme ? 'dark' : 'light' } : {}), onKeyDown: this.handleKeyDown, onKeyUp: this.handleKeyUp }, this.hasSubtitleSlot && (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), index.h("ul", { onClick: this.handleItemClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, class: this.ulWrapperCssClasses(), part: "ul-wrapper", role: this.linkConfig?.href ? PRESENTATION_ROLE : undefined }, index.h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, index.h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (index.h("wpp-checkbox-v4-3-0", { isDarkTheme: this.isDarkTheme, disabled: this.disabled, checked: this.checked, indeterminate: this.indeterminate, internalState: displayState, part: "checkbox", name: this.checkboxName || 'wpp-list-item-checkbox' })) : (index.h(index.Fragment, null, this.tooltipConfig.leftSlot ? (index.h("wpp-tooltip-v4-3-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, warning: this.tooltipConfig.leftSlot.warning, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (index.h("wpp-tooltip-v4-3-0", { text: this.getSlotText('label'),
      // The tooltip anchor lives in this shadow root and is not focusable, so the
      // default `focus` trigger never fires and a truncated label stays unreadable
      // for keyboard users (SC 1.4.13). The host is the element that takes focus,
      // so it drives the tooltip while the anchor still positions it.
      config: { placement: 'right', triggerTarget: this.host, ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (index.h("wpp-tooltip-v4-3-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, warning: this.tooltipConfig.rightSlot.warning, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot())))));
  }
  static get registryIs() { return "wpp-list-item-v4-3-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "labelTypography": ["typographyLabel"],
    "isDarkTheme": ["onUpdateDarkTheme"],
    "captionTypography": ["typographyCaption"],
    "highlight": ["highlightUpdate"],
    "containerState": ["handleViewChange"],
    "disabled": ["disabledChanged"]
  }; }
};
WppListItem.style = wppListItemCss;

const defaultDropdownConfig = {
  trigger: 'manual',
  placement: 'bottom-start',
  hideOnClick: false,
  offset: [0, 4],
  zIndex: consts.Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
        },
      },
    ],
  },
};
const defaultNestedDropdownConfig = {
  trigger: 'mouseenter focus',
  hideOnClick: false,
  placement: 'right-start',
  offset: [-8, 9],
  zIndex: consts.Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left-start', 'left'],
        },
      },
    ],
  },
};
const setDefaultDropdownConfig = (isNested) => isNested ? defaultNestedDropdownConfig : defaultDropdownConfig;

const wppMenuContextCss = ".sc-wpp-menu-context-h{--mc-wrapper-width:var(--wpp-mc-wrapper-width, 100%);--mc-list-box-max-width:var(--wpp-menu-context-list-box-max-width, 350px);--mc-item-bg-color-active:var(--wpp-mc-item-bg-color-active, var(--wpp-grey-color-200));--mc-item-icon-color-active:var(--wpp-mc-item-icon-color-active, var(--wpp-grey-color-800));--mc-item-width:var(--wpp-mc-item-width, var(--custom-menu-context-width, 100%));--mc-item-margin:var(--wpp-mc-item-margin, 4px 0 0 0);--mc-nested-wrapper-border-radius:var(--wpp-mc-nested-wrapper-border-radius, 6px)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--mc-wrapper-width);max-width:var(--mc-list-box-max-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m))}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar{width:7px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-track{margin-top:8px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.sc-wpp-menu-context{display:-ms-inline-flexbox;display:inline-flex}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{width:100%}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{border-radius:var(--mc-nested-wrapper-border-radius)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested[data-expanded=true].sc-wpp-menu-context{background-color:var(--mc-item-bg-color-active)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{width:var(--custom-menu-context-width, 100%)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list[data-wpp-theme=dark].sc-wpp-menu-context{background-color:var(--wpp-grey-color-200)}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden]{visibility:visible;pointer-events:all;-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden] .tippy-content{-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-s>[slot=trigger-element]:active::part(icon-extended){color:var(--mc-item-icon-color-active)}.sc-wpp-menu-context-s .tippy-box[data-animation=fadein][data-state=hidden]{opacity:0}.sc-wpp-menu-context-s .wpp-list-item,.sc-wpp-menu-context-s .wpp-menu-context{--mc-item-width:100%;width:var(--mc-item-width);--li-width:var(--mc-item-width);overflow:hidden}.sc-wpp-menu-context-s .wpp-list-item:not(:first-child),.sc-wpp-menu-context-s .wpp-menu-context:not(:first-child){margin:var(--mc-item-margin)}";

const WppMenuContext = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.restoreFocusAfterHide = false;
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.contentRef);
    this.getContentRef = (node) => {
      this.contentRef = node;
    };
    this.getTriggerRef = (node) => {
      this.triggerRef = node;
    };
    this.updateTriggerElementRef = () => {
      this.triggerElement = this.triggerRef?.querySelector('[slot="trigger-element"]');
    };
    this.addTriggerElementListeners = () => {
      if (!this.triggerElement)
        return;
      this.triggerElement.addEventListener('blur', this.onBlur);
      this.triggerElement.addEventListener('focus', this.onFocus);
      this.triggerElement.addEventListener('keydown', this.handleTriggerKeyDown, true);
      this.triggerElement.addEventListener('keyup', this.handleTriggerKeyUp, true);
    };
    this.removeTriggerElementListeners = () => {
      if (!this.triggerElement)
        return;
      this.triggerElement.removeEventListener('blur', this.onBlur);
      this.triggerElement.removeEventListener('focus', this.onFocus);
      this.triggerElement.removeEventListener('keydown', this.handleTriggerKeyDown, true);
      this.triggerElement.removeEventListener('keyup', this.handleTriggerKeyUp, true);
    };
    this.addMenuKeyboardListeners = () => {
      this.contentRef?.addEventListener('keydown', this.handleMenuKeyDown, true);
      this.contentRef?.addEventListener('keyup', this.handleMenuKeyUp, true);
    };
    this.removeMenuKeyboardListeners = () => {
      this.contentRef?.removeEventListener('keydown', this.handleMenuKeyDown, true);
      this.contentRef?.removeEventListener('keyup', this.handleMenuKeyUp, true);
    };
    this.isComponentTag = (element, tagName) => {
      if (!element)
        return false;
      const lowerCaseTag = tagName.toLowerCase();
      const elementTag = element.tagName.toLowerCase();
      return elementTag === lowerCaseTag || elementTag === utils.transformToVersionedTag(lowerCaseTag);
    };
    this.checkNestedItemIsDisabled = () => {
      if (this.isNestedContext && (this.triggerRef?.children[0]).disabled) {
        this.triggerRef?.setAttribute('disabled', 'true');
      }
    };
    this.removeDisabledTag = () => {
      if (!this.triggerRef?.children[0])
        return;
      if (this.triggerRef?.getAttribute('disabled') === 'false' ||
        this.triggerRef?.children[0].getAttribute('disabled') === 'false') {
        this.triggerRef.removeAttribute('disabled');
        this.triggerRef?.children[0].removeAttribute('disabled');
      }
    };
    // Composed Tippy lifecycle handlers. Defined as stable class members so the
    // dropdownConfig watcher can re-assert them on setProps without losing the
    // menu's own ARIA/focus handling; consumer callbacks are read from
    // this.dropdownConfig at call time.
    this.handleTippyMount = (instance) => {
      this.removeTippyBoxMenuAttributes(instance);
      if (this.dropdownConfig?.onMount) {
        return this.dropdownConfig.onMount(instance);
      }
    };
    this.handleTippyShow = (instance) => {
      this.removeTippyBoxMenuAttributes(instance);
      if (this.listWidth !== 'auto') {
        instance.popper.style.width = this.listWidth;
      }
      this.handleAriaExpandedOnTrigger('show');
      this.updateMenuAccessibility();
      const listItems = this.contentRef?.querySelectorAll(utils.transformToVersionedTag('wpp-list-item'));
      Array.from(listItems || []).forEach(item => {
        item.setAttribute('container-state', 'shown');
        item.setAttribute('container-state', 'tooltipTrigger');
      });
      if (this.dropdownConfig?.onShow) {
        return this.dropdownConfig.onShow(instance);
      }
    };
    this.handleTippyHide = (instance) => {
      this.handleAriaExpandedOnTrigger('hide');
      this.clearFocusedMenuItem();
      this.removeMenuItemKeyboardListeners();
      if (this.dropdownConfig?.onHide) {
        return this.dropdownConfig.onHide(instance);
      }
    };
    this.handleTippyHidden = () => {
      this.restoreFocusToTriggerIfNeeded();
      // Resolve activeElement against the trigger's own root so triggers living
      // inside a shadow tree (e.g. wpp-topbar-item) are compared correctly.
      const rootNode = this.triggerElement?.getRootNode();
      if (this.triggerElement && rootNode?.activeElement === this.triggerElement)
        return;
      this.isInComponent = false;
    };
    this.createTippyInstance = () => {
      this.removeDisabledTag();
      this.tippyInstance = menuListConfig.menuListConfig({
        anchor: this.triggerRef,
        content: this.contentRef,
        triggerElementWidth: false,
        maxWidth: '350px',
        hideOnPopperBlur: true,
        appendTo: this.appendToListWrapper ? this.wppListWrapperRef : () => utils.getHighestContainerInDOM(),
        ...setDefaultDropdownConfig(this.isNestedContext),
        ...this.dropdownConfig,
        // Tippy defaults to role="tooltip", which is not valid for menu popups.
        role: '',
        // Tippy's default `aria.expanded: 'auto'` stamps aria-expanded onto its
        // reference (the role-less `.trigger-wrapper` div), causing aria-allowed-attr
        // violations. A consumer-provided `aria` (e.g. { content: 'labelledby' })
        // would clobber the library default that guards against this, so re-assert
        // `expanded: undefined` here. menu-context manages aria-expanded on the real
        // trigger element itself via updateTriggerAccessibility.
        aria: {
          ...this.dropdownConfig?.aria,
          expanded: undefined,
        },
        onMount: this.handleTippyMount,
        onShow: this.handleTippyShow,
        onHide: this.handleTippyHide,
        onHidden: this.handleTippyHidden,
        onClickOutside: instance => {
          // This function handles cases when the user clicks anywhere else but on
          // the trigger element or on the dropdowns. Since the nested menu-contexts
          // are appended to the parent, they are considered part of the main dropdown
          instance.hide();
        },
      });
      // Tippy can stamp aria-expanded / aria-haspopup onto its reference (the
      // role-less `.trigger-wrapper` div) on initialization, which is an
      // aria-allowed-attr violation since the div has no widget role. These props
      // are managed on the real trigger element by updateTriggerAccessibility, and
      // handleAriaExpandedOnTrigger clears them from the wrapper on show/hide, but
      // not before the first interaction — so strip them here to cover that gap.
      this.triggerRef?.removeAttribute('aria-expanded');
      this.triggerRef?.removeAttribute('aria-haspopup');
    };
    this.removeTippyBoxMenuAttributes = (instance) => {
      const tippyBox = instance.popper.querySelector('.tippy-box');
      tippyBox?.removeAttribute('role');
      tippyBox?.removeAttribute('tabindex');
    };
    this.restoreFocusToTriggerIfNeeded = () => {
      if (!this.restoreFocusAfterHide)
        return;
      this.restoreFocusAfterHide = false;
      this.focusTriggeringElement();
      this.lastTriggeringElement = undefined;
    };
    this.handleAriaExpandedOnTrigger = (type) => {
      const isExpanded = type === 'show';
      if (this.triggerRef) {
        this.triggerRef.dataset.expanded = String(isExpanded);
        this.triggerRef.removeAttribute('aria-expanded');
        this.triggerRef.removeAttribute('aria-haspopup');
      }
      if (this.isNestedContext &&
        !isExpanded &&
        this.triggerElement?.classList.contains(constants.TAB_FOCUS_CLASS) &&
        !this.isMenuItemDisabled(this.triggerElement)) {
        this.triggerElement.tabIndex = 0;
      }
      this.updateTriggerAccessibility(isExpanded);
    };
    this.hasAriaPropsProperty = (element) => {
      const tagName = element.tagName.toLowerCase();
      return ('ariaProps' in element ||
        ['wpp-button', 'wpp-action-button', 'wpp-more-button'].some(tag => tagName.includes(tag)));
    };
    this.getAriaAttributeName = (key) => `aria-${key.toLowerCase()}`;
    this.applyAriaPropsAsAttributes = (element, ariaProps) => {
      Object.entries(ariaProps).forEach(([key, value]) => {
        if (key === 'tabIndex')
          return;
        if (key === 'role') {
          if (value)
            element.setAttribute('role', String(value));
          return;
        }
        const attrName = this.getAriaAttributeName(key);
        if (value === undefined || value === null) {
          element.removeAttribute(attrName);
          return;
        }
        element.setAttribute(attrName, String(value));
      });
    };
    this.getTriggerAriaProps = (isExpanded) => ({
      ...this.ariaProps,
      haspopup: this.ariaProps.haspopup || constants.MENU_ROLE,
      expanded: isExpanded,
    });
    this.updateTriggerAccessibility = (isExpanded) => {
      if (!this.triggerElement)
        return;
      const triggerAriaProps = this.getTriggerAriaProps(isExpanded);
      if (this.isNestedContext) {
        this.applyAriaPropsAsAttributes(this.triggerElement, triggerAriaProps);
        this.triggerElement.setAttribute('role', constants.MENU_ITEM);
        return;
      }
      if (this.hasAriaPropsProperty(this.triggerElement)) {
        this.triggerElement.ariaProps = {
          ...(this.triggerElement.ariaProps || {}),
          ...triggerAriaProps,
        };
        return;
      }
      const currentRole = this.triggerElement.getAttribute('role');
      const shouldSetButtonRole = !this.triggerElement.matches('button, a[href], input, select, textarea, summary') &&
        (!currentRole || currentRole === constants.PRESENTATION_ROLE);
      this.applyAriaPropsAsAttributes(this.triggerElement, triggerAriaProps);
      if (shouldSetButtonRole) {
        this.triggerElement.setAttribute('role', constants.BUTTON_ROLE);
      }
    };
    this.getComponentSelector = (tagName) => {
      const lowerCaseTag = tagName.toLowerCase();
      return `${lowerCaseTag}, ${utils.transformToVersionedTag(lowerCaseTag)}`;
    };
    this.setAttributeIfNeeded = (element, attrName, value) => {
      if (element.getAttribute(attrName) !== value)
        element.setAttribute(attrName, value);
    };
    this.updateMenuItemAccessibility = (item) => {
      this.setAttributeIfNeeded(item, 'role', constants.MENU_ITEM);
      item.addEventListener('keydown', this.handleMenuKeyDown, true);
      item.addEventListener('keyup', this.handleMenuKeyUp, true);
      if (!this.isMenuItemDisabled(item) && !item.classList.contains(constants.TAB_FOCUS_CLASS)) {
        item.tabIndex = -1;
      }
      if (this.isMenuItemDisabled(item)) {
        this.setAttributeIfNeeded(item, 'aria-disabled', 'true');
      }
      else {
        item.removeAttribute('aria-disabled');
      }
    };
    this.updateMenuGroupAccessibility = (group) => {
      const hasDividerOnly = group.hasAttribute('with-divider') && !group.hasAttribute('header') && !group.children.length;
      const role = hasDividerOnly ? constants.PRESENTATION_ROLE : constants.GROUP_ROLE;
      this.setAttributeIfNeeded(group, 'role', role);
      const header = group.getAttribute('header');
      if (header && !group.hasAttribute('aria-label')) {
        group.setAttribute('aria-label', header);
      }
    };
    this.updateMenuAccessibility = () => {
      if (!this.contentRef)
        return;
      const menuItems = this.contentRef.querySelectorAll(this.getComponentSelector(constants.CONTEXT_ITEM_TAG));
      const menuGroups = this.contentRef.querySelectorAll(this.getComponentSelector('wpp-menu-group'));
      const nestedMenus = this.contentRef.querySelectorAll(this.getComponentSelector(constants.MENU_CONTEXT_TAG));
      Array.from(menuItems).forEach(this.updateMenuItemAccessibility);
      Array.from(menuGroups).forEach(this.updateMenuGroupAccessibility);
      Array.from(nestedMenus).forEach(menu => menu.removeAttribute('role'));
    };
    this.removeMenuItemKeyboardListeners = () => {
      const menuItems = this.contentRef?.querySelectorAll(this.getComponentSelector(constants.CONTEXT_ITEM_TAG));
      Array.from(menuItems || []).forEach(item => {
        item.removeEventListener('keydown', this.handleMenuKeyDown, true);
        item.removeEventListener('keyup', this.handleMenuKeyUp, true);
      });
    };
    this.isMenuItem = (element) => this.isComponentTag(element, constants.CONTEXT_ITEM_TAG) || this.isComponentTag(element, constants.TOPBAR_NAVIGATION_ITEM_TAG);
    this.isMenuItemDisabled = (item) => (item.hasAttribute('disabled') && item.getAttribute('disabled') !== 'false') ||
      item.classList.contains('disabled') ||
      item.classList.contains('wpp-disabled');
    this.isElementHidden = (element) => Boolean(element.hidden) || element.hasAttribute('hidden') || element.classList.contains('wpp-hidden');
    this.getNestedMenuContext = (item) => {
      const closestMenuContext = item.closest(this.getComponentSelector(constants.MENU_CONTEXT_TAG));
      return closestMenuContext && closestMenuContext !== this.host ? closestMenuContext : undefined;
    };
    this.getMenuItemsFromContainer = (container) => {
      const menuItems = [];
      Array.from(container.children).forEach(child => {
        const element = child;
        if (element.getAttribute('slot') === 'trigger-element')
          return;
        if (this.isMenuItem(element)) {
          menuItems.push(element);
          return;
        }
        if (this.isComponentTag(element, constants.MENU_CONTEXT_TAG)) {
          const nestedTrigger = element.querySelector('[slot="trigger-element"]');
          if (nestedTrigger && this.isMenuItem(nestedTrigger)) {
            menuItems.push(nestedTrigger);
          }
          return;
        }
        menuItems.push(...this.getMenuItemsFromContainer(element));
      });
      return menuItems;
    };
    this.getFocusableMenuItems = () => this.contentRef
      ? this.getMenuItemsFromContainer(this.contentRef).filter(item => !this.isMenuItemDisabled(item) && !this.isElementHidden(item))
      : [];
    this.getMenuItemFromEvent = (event) => {
      const items = this.getFocusableMenuItems();
      return event
        .composedPath()
        .find((element) => Boolean(element.tagName) && items.includes(element));
    };
    this.clearFocusedMenuItem = () => {
      const menuItems = this.contentRef?.querySelectorAll(this.getComponentSelector(constants.CONTEXT_ITEM_TAG));
      Array.from(menuItems || []).forEach(item => {
        item.classList.remove(constants.TAB_FOCUS_CLASS);
        item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
        if (!this.isMenuItemDisabled(item))
          item.tabIndex = -1;
      });
      // Topbar navigation items carry the same keyboard highlight classes but
      // keep their native tabIndex (they are ordinary tab stops by design), so
      // only the classes are cleared — otherwise the previous item keeps its
      // focus ring while the arrow keys move on.
      const navigationItems = this.contentRef?.querySelectorAll(this.getComponentSelector(constants.TOPBAR_NAVIGATION_ITEM_TAG));
      Array.from(navigationItems || []).forEach(item => {
        item.classList.remove(constants.TAB_FOCUS_CLASS);
        item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
      });
    };
    this.focusMenuItem = (item) => {
      this.clearFocusedMenuItem();
      this.clearParentTriggerFocusStyles();
      item.tabIndex = 0;
      item.classList.add(constants.TAB_FOCUS_CLASS);
      item.focus();
      item.scrollIntoView?.({ block: 'nearest' });
    };
    /**
     * When keyboard focus moves into a nested submenu, the parent menuitem that
     * opened it must drop its visible focus ring so that only the currently
     * focused item appears focused. The parent keeps `aria-expanded` and has its
     * ring restored when the submenu is closed via ArrowLeft/Escape.
     */
    this.clearParentTriggerFocusStyles = () => {
      if (!this.isNestedContext || !this.triggerElement)
        return;
      this.triggerElement.classList.remove(constants.TAB_FOCUS_CLASS);
      this.triggerElement.classList.remove(MENU_ITEM_ACTIVE_CLASS);
    };
    this.focusMenuItemByPosition = (position) => {
      const items = this.getFocusableMenuItems();
      const item = position === 'first' ? items[0] : items[items.length - 1];
      if (item)
        this.focusMenuItem(item);
    };
    this.focusNextMenuItem = (currentItem, direction) => {
      const items = this.getFocusableMenuItems();
      const currentIndex = items.indexOf(currentItem);
      if (currentIndex === -1)
        return;
      const nextIndex = (currentIndex + direction + items.length) % items.length;
      this.focusMenuItem(items[nextIndex]);
    };
    // document.activeElement stops at a shadow host; walk shadow roots so a
    // trigger rendered inside one (e.g. wpp-topbar-item) is resolved correctly.
    this.getDeepActiveElement = () => {
      let active = document.activeElement;
      while (active?.shadowRoot?.activeElement) {
        active = active.shadowRoot.activeElement;
      }
      return active || undefined;
    };
    /**
     * getDeepActiveElement records the node that actually held focus, which for a
     * component trigger is a control inside its shadow root (the native button
     * inside wpp-button, say). Focusing that control directly bypasses the
     * component's own setFocus, so the keyboard focus ring never comes back when the
     * menu closes. Walk back out to the shadow host whenever it owns a setFocus.
     */
    this.resolveFocusTarget = (element) => {
      let target = element;
      let host = target.getRootNode().host;
      while (typeof host?.setFocus === 'function') {
        target = host;
        host = target.getRootNode().host;
      }
      return target;
    };
    this.focusTriggeringElement = () => {
      const triggerElement = this.lastTriggeringElement || this.triggerElement;
      if (!triggerElement)
        return;
      const focusableTrigger = this.resolveFocusTarget(triggerElement);
      // isConnected, unlike document.contains, is also true for elements living
      // inside a shadow tree (e.g. the wpp-topbar-item navigation triggers).
      if (!focusableTrigger.isConnected)
        return;
      if (this.isMenuItem(focusableTrigger) && !this.isMenuItemDisabled(focusableTrigger)) {
        focusableTrigger.tabIndex = 0;
        focusableTrigger.classList.add(constants.TAB_FOCUS_CLASS);
        focusableTrigger.focus();
        return;
      }
      if (typeof focusableTrigger.setFocus === 'function') {
        void focusableTrigger.setFocus().catch(() => {
          if (focusableTrigger.isConnected)
            focusableTrigger.focus();
        });
        return;
      }
      focusableTrigger.focus();
    };
    this.openMenuFromKeyboard = (position = 'first') => {
      if (!this.tippyInstance || this.tippyInstance.state?.isShown || this.tippyInstance.state?.isVisible) {
        this.focusMenuItemByPosition(position);
        return;
      }
      this.lastTriggeringElement = this.getDeepActiveElement() || this.triggerElement;
      if (typeof this.tippyInstance.show === 'function') {
        this.tippyInstance.show();
      }
      else {
        this.handleAriaExpandedOnTrigger('show');
      }
      setTimeout(() => {
        this.focusMenuItemByPosition(position);
      }, 0);
    };
    this.closeMenuFromKeyboard = () => {
      this.restoreFocusAfterHide = true;
      this.clearFocusedMenuItem();
      if (typeof this.tippyInstance?.hide === 'function') {
        this.tippyInstance.hide();
      }
      else {
        this.handleAriaExpandedOnTrigger('hide');
      }
      setTimeout(this.restoreFocusToTriggerIfNeeded, 0);
    };
    this.emitListItemKeyboardChange = (item) => {
      const listItem = item;
      if (listItem.selectable && !listItem.nonInteractive) {
        listItem.checked = !listItem.checked;
      }
      item.dispatchEvent(new CustomEvent('wppChangeListItem', {
        bubbles: false,
        composed: false,
        detail: {
          value: listItem.value,
          checked: listItem.checked,
          label: item.querySelector('[slot="label"]')?.textContent || '',
          target: listItem,
          isSelectBasedEvent: Boolean(item.closest('.wpp-select-portal')),
          isAutocompleteBasedEvent: Boolean(item.closest(utils.transformToVersionedTag('wpp-autocomplete'))),
        },
      }));
    };
    this.activateMenuItemFromKeyboard = (item) => {
      const nestedMenuContext = this.getNestedMenuContext(item);
      if (nestedMenuContext) {
        item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
        return;
      }
      if (this.isNestedContext) {
        this.host.dispatchEvent(new CustomEvent(constants.MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT, { bubbles: true, composed: true }));
      }
      else {
        this.restoreFocusAfterHide = true;
      }
      if (this.isComponentTag(item, constants.TOPBAR_NAVIGATION_ITEM_TAG)) {
        this.activateNavigationItemFromKeyboard(item);
        return;
      }
      const listItemLink = this.getListItemLinkAnchor(item);
      if (listItemLink) {
        // A native-link list item (linkConfig.href) navigates through its inner anchor.
        // Clicking that anchor mirrors the mouse exactly: native navigation fires, and the
        // anchor's click bubbles to the list item's own handler which emits wppChangeListItem
        // once. Dispatching the change event ourselves instead would navigate nothing.
        listItemLink.click();
        return;
      }
      this.emitListItemKeyboardChange(item);
    };
    this.getListItemLinkAnchor = (item) => {
      if (!this.isComponentTag(item, constants.CONTEXT_ITEM_TAG))
        return null;
      return item.shadowRoot?.querySelector('a.item[href]') ?? null;
    };
    /**
     * Topbar navigation items are selected through their inner link's click
     * handler, which emits wppActiveNavItemChanged for the topbar to consume.
     * Dispatching wppChangeListItem on them (as for list items) selects nothing,
     * so keyboard activation clicks the real link instead — mirroring the mouse.
     */
    this.activateNavigationItemFromKeyboard = (item) => {
      const link = item.shadowRoot?.querySelector('a.link');
      if (link) {
        link.click();
        return;
      }
      item.click();
    };
    this.handleTriggerKeyDown = (event) => {
      const firstItemKeys = this.isNestedContext ? ['Enter', ' ', 'ArrowRight'] : ['Enter', ' ', 'ArrowDown'];
      if (firstItemKeys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Enter' || event.key === ' ') {
          this.ignoreNextMenuKeyUp = event.key;
        }
        this.openMenuFromKeyboard('first');
        return;
      }
      if (!this.isNestedContext && event.key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();
        this.openMenuFromKeyboard('last');
        return;
      }
      if (this.isNestedContext && (event.key === 'Escape' || event.key === 'ArrowLeft')) {
        event.preventDefault();
        event.stopPropagation();
        this.closeMenuFromKeyboard();
      }
    };
    this.handleTriggerKeyUp = (event) => {
      if (event.key !== this.ignoreNextMenuKeyUp)
        return;
      event.preventDefault();
      event.stopPropagation();
      this.ignoreNextMenuKeyUp = undefined;
    };
    this.handleMenuKeyDown = (event) => {
      const currentItem = this.getMenuItemFromEvent(event);
      if (!currentItem)
        return;
      const nestedMenuContext = this.getNestedMenuContext(currentItem);
      if (nestedMenuContext && ['Enter', ' ', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        return;
      }
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          event.stopPropagation();
          this.focusNextMenuItem(currentItem, 1);
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          event.stopPropagation();
          this.focusNextMenuItem(currentItem, -1);
          break;
        }
        case 'Home': {
          event.preventDefault();
          event.stopPropagation();
          this.focusMenuItemByPosition('first');
          break;
        }
        case 'End': {
          event.preventDefault();
          event.stopPropagation();
          this.focusMenuItemByPosition('last');
          break;
        }
        case 'ArrowLeft': {
          if (!this.isNestedContext)
            return;
          event.preventDefault();
          event.stopPropagation();
          this.closeMenuFromKeyboard();
          break;
        }
        case 'Escape':
        case 'Tab': {
          // Tab exits the menu instead of tabbing through menuitems; focus is restored to the trigger.
          event.preventDefault();
          event.stopPropagation();
          this.closeMenuFromKeyboard();
          break;
        }
        case 'Enter':
        case ' ': {
          event.preventDefault();
          event.stopPropagation();
          currentItem.classList.add(MENU_ITEM_ACTIVE_CLASS);
          break;
        }
      }
    };
    this.handleMenuKeyUp = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ')
        return;
      if (event.key === this.ignoreNextMenuKeyUp) {
        event.preventDefault();
        event.stopPropagation();
        this.ignoreNextMenuKeyUp = undefined;
        return;
      }
      const currentItem = this.getMenuItemFromEvent(event);
      if (!currentItem)
        return;
      if (this.getNestedMenuContext(currentItem))
        return;
      event.preventDefault();
      event.stopPropagation();
      currentItem.classList.remove(MENU_ITEM_ACTIVE_CLASS);
      this.activateMenuItemFromKeyboard(currentItem);
    };
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.wppBlur.emit();
    };
    this.onFocus = (event) => {
      if (!this.isInComponent)
        this.wppFocus.emit(event);
      this.isInComponent = true;
    };
    this.onFocusout = (event) => {
      if (this.host.contains(event.relatedTarget) ||
        this.tippyInstance.popper.contains(event.relatedTarget))
        return;
      this.isInComponent = false;
    };
    this.handleClickTrigger = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const isTriggerDisabled = !!((this.triggerElement?.hasAttribute('disabled') && this.triggerElement?.getAttribute('disabled') !== 'false') ||
        this.triggerElement?.classList.contains('disabled'));
      if (this.isNestedContext || isTriggerDisabled)
        return;
      if (!this.tippyInstance.state.isShown) {
        this.tippyInstance.show();
      }
      else {
        this.tippyInstance.hide();
      }
    };
    this.menuCssClasses = () => ({
      'wpp-menu-context': true,
      'wpp-menu-context-wrapper': true,
      'wpp-menu-nested-context-wrapper': this.isNestedContext,
    });
    this.triggerWrapperCssClasses = () => ({
      'trigger-wrapper': true,
      nested: this.isNestedContext,
    });
    this.listWrapperCssClasses = () => ({
      [constants.WPP_LIST_CLASSNAME]: true,
      [`${this.externalClass}`]: true,
    });
    this.contextList = undefined;
    this.tippyInstance = undefined;
    this.isNestedContext = undefined;
    this.hidden = true;
    this.isInComponent = false;
    this.listWidth = 'auto';
    this.dropdownConfig = {};
    this.appendToListWrapper = false;
    this.externalClass = '';
    this.ariaProps = {};
    this.isBtnTrigger = false;
  }
  handleClick(event) {
    if (!this.tippyInstance?.state?.isVisible)
      return;
    // NOTE: our wppChangeListItem listener is called when ListItems are used in Select or Autocomplete.
    // This should be treated as hotfix until we move all our dropdowns to the document.body
    // or find other proper solution
    if (event.detail?.isSelectBasedEvent)
      return;
    if (event.detail?.isAutocompleteBasedEvent)
      return;
    const listItem = event
      .composedPath()
      .find(el => el.tagName?.includes(constants.CONTEXT_ITEM_TAG) ||
      el.tagName?.includes(constants.TOPBAR_NAVIGATION_ITEM_TAG));
    if (!listItem)
      return;
    const currentRole = listItem.getAttribute('role');
    const disabled = listItem.getAttribute('disabled');
    if (!currentRole ||
      [constants.MENU_BAR_ROLE, constants.MENU_ROLE].includes(currentRole || '') ||
      (disabled !== null && disabled !== 'false'))
      return;
    const target = event.target;
    if (target.isExtended) {
      return;
    }
    if (this.tippyInstance?.state?.isVisible) {
      this.tippyInstance.hide();
    }
  }
  handleKeyboardActivation() {
    // A submenu item was activated via keyboard. Tippy relocates each menu's
    // content (including nested menu-contexts) into a popup appended to <body>,
    // so this event no longer bubbles through the root menu-context host - hence
    // we listen on window. Only the currently-open root menu should mark itself
    // to restore focus to its trigger once it hides.
    if (!this.isNestedContext && this.tippyInstance?.state?.isVisible) {
      this.restoreFocusAfterHide = true;
    }
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual.isEqual_1(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      // Re-assert the same overrides as createTippyInstance. Passing the raw
      // config straight to Tippy would let its default `aria.expanded: 'auto'`
      // re-stamp aria-expanded onto the role-less `.trigger-wrapper` (an
      // aria-allowed-attr violation) and, critically, would replace the
      // composed onMount/onShow/onHide handlers with the consumer's raw
      // callbacks — dropping the menu's own ARIA and focus lifecycle work.
      // A parent that re-renders while the menu is open (e.g. wpp-topbar-item
      // toggling menuExpanded) passes a fresh config object each render, so
      // this watcher must keep the composed handlers intact. The composed
      // handlers read this.dropdownConfig, so consumer callbacks stay honored.
      if (typeof this.tippyInstance?.setProps !== 'function')
        return;
      this.tippyInstance.setProps({
        ...newConfig,
        role: '',
        aria: {
          ...newConfig?.aria,
          expanded: undefined,
        },
        onMount: this.handleTippyMount,
        onShow: this.handleTippyShow,
        onHide: this.handleTippyHide,
        onHidden: this.handleTippyHidden,
      });
    }
  }
  updateIsInComponent(value) {
    if (!value)
      this.onBlur();
  }
  componentWillLoad() {
    this.isNestedContext = this.isBtnTrigger ? false : this.isComponentTag(this.host?.children[0], constants.CONTEXT_ITEM_TAG);
  }
  componentDidLoad() {
    this.themeSubscription.start();
    this.createTippyInstance();
    this.checkNestedItemIsDisabled();
    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag();
    });
    this.menuContentMutationObserver = new MutationObserver(() => {
      this.updateMenuAccessibility();
    });
    this.startObserving();
    this.startMenuContentObserving();
    this.addMenuKeyboardListeners();
    if (this.triggerRef) {
      this.updateTriggerElementRef();
      this.addTriggerElementListeners();
    }
    this.updateTriggerAccessibility(false);
    this.updateMenuAccessibility();
  }
  connectedCallback() {
    this.themeSubscription.start();
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state?.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
    if (this.menuContentMutationObserver) {
      this.startMenuContentObserving();
    }
    this.updateTriggerElementRef();
    this.addTriggerElementListeners();
    this.addMenuKeyboardListeners();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (!this.isNestedContext) {
      this.tippyInstance?.destroy();
    }
    this.removeTriggerElementListeners();
    this.removeMenuKeyboardListeners();
    this.removeMenuItemKeyboardListeners();
    this.mutationObserver?.disconnect();
    this.menuContentMutationObserver?.disconnect();
  }
  startObserving() {
    if (!this.host?.children[0])
      return;
    this.mutationObserver.observe(this.host.children[0], { attributes: true });
  }
  startMenuContentObserving() {
    if (!this.contentRef)
      return;
    this.menuContentMutationObserver.observe(this.contentRef, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'role', 'header', 'with-divider'],
    });
  }
  render() {
    const style = {
      '--custom-menu-context-width': this.listWidth === 'auto' ? '' : this.listWidth,
    };
    return (index.h(index.Host, { class: this.menuCssClasses(), exportparts: "trigger, list-wrapper, list, inner", onFocusout: this.onFocusout }, index.h("div", { ref: this.getTriggerRef, onClick: this.handleClickTrigger, class: this.triggerWrapperCssClasses() }, index.h("slot", { name: "trigger-element", part: "trigger" })), index.h("div", { class: "wpp-list-wrapper", part: "list-wrapper", ref: ref => (this.wppListWrapperRef = ref) }, index.h("ul", { class: this.listWrapperCssClasses(), style: style, ref: this.getContentRef, role: constants.MENU_ROLE, part: "list" }, index.h("slot", { part: "inner", onSlotchange: this.updateMenuAccessibility })))));
  }
  static get registryIs() { return "wpp-menu-context-v4-3-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "dropdownConfig": ["updateDropdownConfig"],
    "isInComponent": ["updateIsInComponent"]
  }; }
};
WppMenuContext.style = wppMenuContextCss;

exports.wpp_checkbox = WppCheckbox;
exports.wpp_list_item = WppListItem;
exports.wpp_menu_context = WppMenuContext;
