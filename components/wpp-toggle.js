import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { d as defineCustomElement$8 } from './wpp-icon-error2.js';
import { d as defineCustomElement$7 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$6 } from './wpp-internal-label2.js';
import { d as defineCustomElement$5 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$4 } from './wpp-label2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppToggleCss = ":host{--toggle-height:var(--wpp-toggle-height, 20px);--toggle-width:var(--wpp-toggle-width, 34px);--toggle-inside-circle-size:var(--wpp-toggle-inside-circle-size, 16px);--toggle-inside-circle-bg-color:var(--wpp-toggle-inside-circle-bg-color, var(--wpp-grey-color-000));--toggle-inside-circle-margin-left:var(--wpp-toggle-inside-circle-margin-left, 2px);--toggle-border-radius:var(--wpp-toggle-border-radius, var(--wpp-border-radius-round));--toggle-label-margin:var(--wpp-toggle-label-margin, 0 0 0 8px);--toggle-label-color-disabled:var(--wpp-toggle-label-color-disabled, var(--wpp-text-color-disabled));--toggle-label-color-checked-disabled:var(--wpp-toggle-label-color-checked-disabled, var(--wpp-text-color-disabled));--toggle-bg-color:var(--wpp-toggle-bg-color, var(--wpp-grey-color-500));--toggle-bg-color-hover:var(--wpp-toggle-bg-color-hover, var(--wpp-grey-color-700));--toggle-bg-color-active:var(--wpp-toggle-bg-color-active, var(--wpp-grey-color-800));--toggle-bg-color-disabled:var(--wpp-toggle-bg-color-disabled, var(--wpp-grey-color-400));--toggle-bg-color-checked:var(--wpp-toggle-bg-color-checked, var(--wpp-brand-color));--toggle-bg-color-checked-hover:var(--wpp-toggle-bg-color-checked-hover, var(--wpp-brand-color-hover));--toggle-bg-color-checked-active:var(--wpp-toggle-bg-color-checked-active, var(--wpp-brand-color-active));--toggle-bg-color-checked-disabled:var(--wpp-toggle-bg-color-checked-disabled, var(--wpp-brand-color-disabled));--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color))}:host(.wpp-toggle-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;height:var(--toggle-height);padding-left:var(--toggle-width);cursor:pointer;outline:none}:host(.wpp-toggle-wrapper) .label{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.wpp-toggle-wrapper) .label.hide>label{display:none}:host(.wpp-toggle-wrapper) .label.with-text .internal-label-wrapper{margin:var(--toggle-label-margin)}:host(.wpp-toggle-wrapper) .label.tab-focus::before{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);background-color:var(--toggle-bg-color-hover)}:host(.wpp-toggle-wrapper) .label::before{position:absolute;top:0;right:0;bottom:0;left:0;width:var(--toggle-width);height:var(--toggle-height);background-color:var(--toggle-bg-color);border-radius:var(--toggle-border-radius);cursor:pointer;-webkit-transition:0.25s ease-in-out;transition:0.25s ease-in-out;content:\"\"}:host(.wpp-toggle-wrapper) .label:hover::before{background-color:var(--toggle-bg-color-hover)}:host(.wpp-toggle-wrapper) .label:active::before{background-color:var(--toggle-bg-color-active)}:host(.wpp-toggle-wrapper) .label::after{position:absolute;top:50%;left:var(--toggle-inside-circle-margin-left);width:var(--toggle-inside-circle-size);height:var(--toggle-inside-circle-size);background-color:var(--toggle-inside-circle-bg-color);border-radius:var(--wpp-border-radius-round);-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:0.25s ease-in-out;transition:0.25s ease-in-out;content:\"\"}:host(.wpp-toggle-wrapper) .label .toggle-input{position:absolute;left:0;top:0;z-index:-1;opacity:0;outline:none}:host(.wpp-toggle-wrapper) .label .toggle-input:checked~.label-wrapper .wpp-label-selector::after{-webkit-transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%);transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%)}:host(.wpp-toggle-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label{pointer-events:none}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label .internal-label-wrapper{margin-left:8px}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--toggle-label-color-disabled)}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label::before{background-color:var(--toggle-bg-color-disabled)}:host(.wpp-checked) .label.tab-focus::before{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);background-color:var(--toggle-bg-color-checked-hover)}:host(.wpp-checked) .label::before{background-color:var(--toggle-bg-color-checked)}:host(.wpp-checked) .label:hover::before{background-color:var(--toggle-bg-color-checked-hover)}:host(.wpp-checked) .label:active::before{background-color:var(--toggle-bg-color-checked-active)}:host(.wpp-checked) .label::after{-webkit-transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%);transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%)}:host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--toggle-label-color-checked-disabled)}:host(.wpp-checked):host(.wpp-disabled) .label::before{background-color:var(--toggle-bg-color-checked-disabled)}";

const WppToggle$1 = /*@__PURE__*/ proxyCustomElement(class WppToggle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.onClick = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      this.setFocus();
      if (!this.controlled) {
        this.checked = !this.checked;
        this.wppChange.emit({
          value: this.value,
          checked: this.checked,
          name: this.name,
        });
      }
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.hostCssClasses = () => ({
      'wpp-toggle': true,
      'wpp-toggle-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-checked': this.checked,
    });
    this.labelCssClasses = () => ({
      label: true,
      'with-text': !!this.labelConfig?.text,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      hide: !this.labelConfig?.text,
    });
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onClick(event);
      }
    };
    this.focusType = undefined;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.controlled = false;
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  render() {
    const inputId = this.name || 'wpp-toggle';
    const labelId = `${inputId}-label`;
    const hasLabel = !!this.labelConfig?.text;
    const labelText = this.labelConfig?.text || this.ariaProps.label;
    // Only pass aria-label/aria-labelledby if there is NO label
    const ariaProps = !hasLabel && (this.ariaProps?.label || this.ariaProps?.labelledby)
      ? {
        ...(this.ariaProps.label ? { 'aria-label': this.ariaProps.label } : {}),
        ...(this.ariaProps.labelledby ? { 'aria-labelledby': this.ariaProps.labelledby } : {}),
      }
      : {};
    return (h(Host, { onClick: this.onClick, class: this.hostCssClasses(), exportparts: "label, input" }, h("wpp-label-v3-5-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: inputId, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label", labelId: labelId }, h("input", { type: "checkbox", name: this.name, id: inputId, value: this.value, disabled: this.disabled, checked: this.checked, required: this.required, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), class: "toggle-input", part: "input", ...ariaProps, title: labelText, "aria-checked": this.checked ? 'true' : 'false', "aria-hidden": this.disabled ? 'true' : null, role: "switch", tabIndex: this.disabled ? -1 : 0, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown }))));
  }
  static get registryIs() { return "wpp-toggle-v3-5-0"; }
  get host() { return this; }
  static get style() { return wppToggleCss; }
}, [1, "wpp-toggle", "wpp-toggle-v3-5-0", {
    "name": [1],
    "value": [1032],
    "checked": [1540],
    "required": [516],
    "disabled": [516],
    "autoFocus": [4, "auto-focus"],
    "size": [1],
    "controlled": [516],
    "ariaProps": [16],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "focusType": [32],
    "setFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-toggle-v3-5-0", "wpp-icon-error-v3-5-0", "wpp-icon-warning-v3-5-0", "wpp-internal-label-v3-5-0", "wpp-internal-tooltip-v3-5-0", "wpp-label-v3-5-0", "wpp-tooltip-v3-5-0", "wpp-typography-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-toggle-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppToggle$1);
      }
      break;
    case "wpp-icon-error-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-warning-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppToggle = WppToggle$1;
const defineCustomElement = defineCustomElement$1;

export { WppToggle, defineCustomElement };
