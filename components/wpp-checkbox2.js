import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { d as defineCustomElement$f } from './wpp-action-button2.js';
import { d as defineCustomElement$e } from './wpp-icon-cross2.js';
import { d as defineCustomElement$d } from './wpp-icon-dash2.js';
import { d as defineCustomElement$c } from './wpp-icon-error2.js';
import { d as defineCustomElement$b } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$a } from './wpp-icon-success2.js';
import { d as defineCustomElement$9 } from './wpp-icon-tick2.js';
import { d as defineCustomElement$8 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$7 } from './wpp-inline-message2.js';
import { d as defineCustomElement$6 } from './wpp-internal-label2.js';
import { d as defineCustomElement$5 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$4 } from './wpp-label2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppCheckboxCss = ":host{--checkbox-icons-color:var(--wpp-checkbox-icons-color, var(--wpp-grey-color-000));--checkbox-size:var(--wpp-checkbox-size, 20px);--checkbox-border-radius:var(--wpp-checkbox-border-radius, var(--wpp-border-radius-xs));--checkbox-inline-message-margin:var(--wpp-checkbox-inline-message-margin, 4px 0 0 0);--checkbox-label-margin:var(--wpp-checkbox-label-margin, 0 0 0 8px);--checkbox-label-text-color-disabled:var(--wpp-checkbox-label-text-color-disabled, var(--wpp-text-color-disabled));--checkbox-label-text-color-checked-disabled:var(\n    --wpp-checkbox-label-text-color-checked-disabled,\n    var(--wpp-text-color-disabled)\n  );--checkbox-bg-color:var(--wpp-checkbox-bg-color-hover, transparent);--checkbox-bg-color-hover:var(--wpp-checkbox-bg-color-hover, rgb(240 242 245 / 75%));--checkbox-bg-color-active:var(--wpp-checkbox-bg-color-active, var(--wpp-grey-color-300));--checkbox-bg-color-disabled:var(--wpp-checkbox-bg-color-disabled, var(--wpp-grey-color-000));--checkbox-bg-color-checked:var(--wpp-checkbox-bg-color-checked, var(--wpp-brand-color));--checkbox-bg-color-checked-hover:var(--wpp-checkbox-bg-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-bg-color-checked-active:var(--wpp-checkbox-bg-color-checked-active, var(--wpp-brand-color-active));--checkbox-bg-color-checked-disabled:var(--wpp-checkbox-bg-color-checked-disabled, var(--wpp-brand-color-disabled));--checkbox-bg-color-indeterminate:var(--wpp-checkbox-bg-color-indeterminate, var(--wpp-primary-color-100));--checkbox-bg-color-indeterminate-hover:var(\n    --wpp-checkbox-bg-color-indeterminate-hover,\n    var(--wpp-primary-color-100)\n  );--checkbox-bg-color-indeterminate-active:var(\n    --wpp-checkbox-bg-color-indeterminate-active,\n    var(--wpp-primary-color-200)\n  );--checkbox-bg-color-indeterminate-disabled:var(\n    --wpp-checkbox-bg-color-indeterminate-disabled,\n    var(--wpp-primary-color-100)\n  );--checkbox-border-color-indeterminate:var(--wpp-checkbox-border-color-indeterminate, var(--wpp-brand-color));--checkbox-border-color-indeterminate-hover:var(\n    --wpp-checkbox-border-color-indeterminate-hover,\n    var(--wpp-brand-color-hover)\n  );--checkbox-border-color-indeterminate-active:var(\n    --wpp-checkbox-border-color-indeterminate-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-border-color-indeterminate-disabled:var(\n    --wpp-checkbox-border-color-indeterminate-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-icon-color-indeterminate:var(--wpp-checkbox-icon-color-indeterminate, var(--wpp-brand-color));--checkbox-icon-color-indeterminate-hover:var(\n    --wpp-checkbox-icon-color-indeterminate-hover,\n    var(--wpp-brand-color-hover)\n  );--checkbox-icon-color-indeterminate-active:var(\n    --wpp-checkbox-icon-color-indeterminate-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-icon-color-indeterminate-disabled:var(\n    --wpp-checkbox-icon-color-indeterminate-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-border-color:var(--wpp-checkbox-border-color, var(--wpp-grey-color-500));--checkbox-border-color-hover:var(--wpp-checkbox-border-color-hover, var(--wpp-grey-color-700));--checkbox-border-color-active:var(--wpp-checkbox-border-color-active, var(--wpp-grey-color-800));--checkbox-border-color-disabled:var(--wpp-checkbox-border-color-disabled, var(--wpp-grey-color-400));--checkbox-border-color-checked:var(--wpp-checkbox-border-color-checked, var(--wpp-brand-color));--checkbox-border-color-checked-hover:var(--wpp-checkbox-border-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-border-color-checked-active:var(\n    --wpp-checkbox-border-color-checked-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-border-color-checked-disabled:var(\n    --wpp-checkbox-border-color-checked-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-first-border-color-focus:var(--wpp-checkbox-first-border-color-focus, var(--wpp-grey-color-000));--checkbox-second-border-color-focus:var(--wpp-checkbox-second-border-color-focus, var(--wpp-brand-color));--checkbox-border-width:var(--wpp-checkbox-border-width, var(--wpp-border-width-s));--checkbox-border-style:var(--wpp-checkbox-border-style, solid)}:host(.wpp-checkbox-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;outline:none}:host(.wpp-checkbox-wrapper) .label{display:-ms-inline-flexbox;display:inline-flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;z-index:0}:host(.wpp-checkbox-wrapper) .label.with-text .internal-label-wrapper{margin:var(--checkbox-label-margin);height:20px}:host(.wpp-checkbox-wrapper) .label .label-wrapper{height:var(--checkbox-size);margin-bottom:0;margin-left:0}:host(.wpp-checkbox-wrapper) .label .square{-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--checkbox-size);height:var(--checkbox-size);border:var(--checkbox-border-width) var(--checkbox-border-style) var(--checkbox-border-color);border-radius:var(--checkbox-border-radius);background-color:var(--checkbox-bg-color);content:\"\"}:host(.wpp-checkbox-wrapper) .label .wpp-label-selector{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-checkbox-wrapper) .label .checkbox-input{position:absolute;z-index:-1;width:var(--checkbox-size);height:var(--checkbox-size);margin:0;background-color:var(--checkbox-bg-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border-radius:var(--checkbox-border-radius)}:host(.wpp-checkbox-wrapper) .label .checkbox-input.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 3px var(--checkbox-second-border-color-focus);box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 3px var(--checkbox-second-border-color-focus)}:host(.wpp-checkbox-wrapper) .label:hover .square,:host(.wpp-checkbox-wrapper) .label.hover .square,:host(.wpp-checkbox-wrapper) .label.tab-focus .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checkbox-wrapper) .label:active .square,:host(.wpp-checkbox-wrapper) .label.pressed .square{background-color:var(--checkbox-bg-color-active);border-color:var(--checkbox-border-color-active)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label{pointer-events:none}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-disabled)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-disabled);border-color:var(--checkbox-border-color-disabled)}:host(.wpp-checkbox-wrapper) .wpp-icon-tick,:host(.wpp-checkbox-wrapper) .wpp-icon-dash{position:absolute;display:none;height:var(--checkbox-size);color:var(--checkbox-icons-color)}:host(.wpp-checkbox-wrapper) .wpp-inline-message{margin:var(--checkbox-inline-message-margin)}:host(.wpp-checkbox-wrapper):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checked) .label .square{background-color:var(--checkbox-bg-color-checked);border-color:var(--checkbox-border-color-checked)}:host(.wpp-checked) .label:hover .square,:host(.wpp-checked) .label.hover .square,:host(.wpp-checked) .label.tab-focus .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-checked) .label:active .square,:host(.wpp-checked) .label.pressed .square{background-color:var(--checkbox-bg-color-checked-active);border-color:var(--checkbox-border-color-checked-active)}:host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-checked):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-checked-disabled);border-color:var(--checkbox-border-color-checked-disabled)}:host(.wpp-checked):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-indeterminate) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate)}:host(.wpp-indeterminate) .label .square{background-color:var(--checkbox-bg-color-indeterminate);border-color:var(--checkbox-border-color-indeterminate)}:host(.wpp-indeterminate) .label:hover .square,:host(.wpp-indeterminate) .label.hover .square,:host(.wpp-indeterminate) .label.tab-focus .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.tab-focus .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:active .square,:host(.wpp-indeterminate) .label.pressed .square{background-color:var(--checkbox-bg-color-indeterminate-active);border-color:var(--checkbox-border-color-indeterminate-active)}:host(.wpp-indeterminate) .label:active .wpp-icon-dash,:host(.wpp-indeterminate) .label.pressed .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-active)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-indeterminate-disabled);border-color:var(--checkbox-border-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate):host(:focus-visible) .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-checked) .wpp-icon-tick{display:block}:host(.wpp-indeterminate) .wpp-icon-dash{display:block}";

const WppCheckbox = /*@__PURE__*/ proxyCustomElement(class WppCheckbox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppClickCheckbox = createEvent(this, "wppClickCheckbox", 1);
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
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
      this.isPressed = false;
    };
    this.onKeyUp = (event) => {
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if (event.key === 'Tab' && this.host?.shadowRoot?.activeElement === this.inputRef)
        this.focusType = FOCUS_TYPE.TAB;
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
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      pressed: this.isPressed,
    });
    this.inputCssClasses = () => ({
      'checkbox-input': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
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
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    if (!this.inputRef)
      return;
    this.inputRef.focus();
    this.focusType = FOCUS_TYPE.TAB;
  }
  render() {
    if (this.decorative)
      return (h(Host, { class: this.hostCssClasses(), "aria-hidden": "true", role: "presentation", tabindex: "-1", exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name }, h("wpp-label-v3-4-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, h("div", { class: "square", part: "square" }), h("wpp-icon-tick-v3-4-0", { part: "icon-tick" }), h("wpp-icon-dash-v3-4-0", { part: "icon-dash" })), !!this.message && (h("wpp-inline-message-v3-4-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name }, h("wpp-label-v3-4-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: this.name, disabled: this.disabled, onClick: this.onClick, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, h("input", { class: this.inputCssClasses(), type: "checkbox", id: this.name, name: this.name, disabled: this.disabled, checked: this.checked || this.indeterminate, required: this.required, onFocus: this.onFocus, onBlur: this.onBlur, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required.toString(), tabindex: this.disabled ? '-1' : this.index, part: "input" }), h("div", { class: "square", part: "square" }), h("wpp-icon-tick-v3-4-0", { part: "icon-tick" }), h("wpp-icon-dash-v3-4-0", { part: "icon-dash" })), !!this.message && (h("wpp-inline-message-v3-4-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
  }
  static get registryIs() { return "wpp-checkbox-v3-4-0"; }
  get host() { return this; }
  static get style() { return wppCheckboxCss; }
}, [1, "wpp-checkbox", "wpp-checkbox-v3-4-0", {
    "name": [1],
    "value": [1032],
    "checked": [1540],
    "controlled": [516],
    "indeterminate": [1540],
    "labelTooltipConfig": [16],
    "required": [516],
    "disabled": [516],
    "autoFocus": [4, "auto-focus"],
    "message": [1],
    "messageType": [1, "message-type"],
    "maxMessageLength": [2, "max-message-length"],
    "ariaProps": [16],
    "labelConfig": [1040],
    "internalState": [1, "internal-state"],
    "index": [2],
    "decorative": [4],
    "focusType": [32],
    "isPressed": [32],
    "setFocus": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-checkbox-v3-4-0", "wpp-action-button-v3-4-0", "wpp-icon-cross-v3-4-0", "wpp-icon-dash-v3-4-0", "wpp-icon-error-v3-4-0", "wpp-icon-info-message-v3-4-0", "wpp-icon-success-v3-4-0", "wpp-icon-tick-v3-4-0", "wpp-icon-warning-v3-4-0", "wpp-inline-message-v3-4-0", "wpp-internal-label-v3-4-0", "wpp-internal-tooltip-v3-4-0", "wpp-label-v3-4-0", "wpp-spinner-v3-4-0", "wpp-tooltip-v3-4-0", "wpp-typography-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-checkbox-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppCheckbox);
      }
      break;
    case "wpp-action-button-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-dash-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-tick-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-warning-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-inline-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v3-4-0":
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

export { WppCheckbox as W, defineCustomElement as d };
