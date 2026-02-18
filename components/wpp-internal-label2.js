import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getSlotEmptyStates } from './utils.js';
import { F as FOCUS_TYPE } from './common.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { d as defineCustomElement$5 } from './wpp-icon-error2.js';
import { d as defineCustomElement$4 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$3 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const LOCALES_DEFAULTS = {
  optional: 'Optional',
};

const wppInternalLabelCss = ":host{--label-tooltip-width:var(--wpp-label-tooltip-width, 100%);--label-optional-text-color:var(--wpp-label-optional-text-color, var(--wpp-text-color-info));--label-optional-margin:var(--wpp-label-optional-margin, 0 0 0 4px);--label-text-color:var(--wpp-label-text-color, var(--wpp-text-color));--label-text-color-disabled:var(--wpp-label-text-color-disabled, var(--wpp-text-color-disabled));--label-info-wrapper-margin:var(--wpp-label-info-wrapper-margin, 0 4px 0 0);--label-icon-color:var(--wpp-label-icon-color, var(--wpp-icon-color));--label-s-strong-text-color:var(--wpp-label-s-strong-text-color, var(--wpp-text-color-info));--label-s-body-text-color:var(--wpp-label-s-body-text-color, var(--wpp-text-color));--icon-first-border-color-focus:var(--wpp-icon-first-border-color-focus, var(--wpp-grey-color-000));--icon-second-border-color-focus:var(--wpp-icon-second-border-color-focus, var(--wpp-brand-color));display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host .info-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer}:host .info-wrapper .optional{color:var(--label-optional-text-color);margin:var(--label-optional-margin)}:host .info-wrapper.with-icon{margin:var(--label-info-wrapper-margin)}:host .tooltip{--tooltip-width:var(--label-tooltip-width)}:host .icon{display:-ms-inline-flexbox;display:inline-flex;color:var(--label-icon-color);cursor:pointer;outline:none;border-radius:50%}:host .icon.slot-hidden{display:none}:host .icon.tab-focus.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--icon-first-border-color-focus), 0 0 0 3px var(--icon-second-border-color-focus);box-shadow:0 0 0 1px var(--icon-first-border-color-focus), 0 0 0 3px var(--icon-second-border-color-focus)}:host:host(.s-strong) .info-wrapper .text{color:var(--label-s-strong-text-color)}:host:host(.disabled){pointer-events:none}:host:host(.disabled) .info-wrapper .text,:host:host(.disabled) .info-wrapper .optional{color:var(--label-text-color-disabled)}";

const WppInternalLabel = /*@__PURE__*/ proxyCustomElement(class WppInternalLabel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this._locales = LOCALES_DEFAULTS;
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon"]',
      });
      this.hasIconSlot = !emptyStates.icon;
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.iconCssClasses = () => ({
      icon: true,
      'slot-hidden': !this.hasIconSlot,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-label': true,
      [this.typography]: true,
      disabled: this.disabled,
    });
    this.infoWrapperCssClasses = () => ({
      'info-wrapper': true,
      'with-icon': this.hasIconSlot,
    });
    this.hasIconSlot = true;
    this.focusType = undefined;
    this.labelText = undefined;
    this.description = undefined;
    this.optional = false;
    this.typography = 's-body';
    this.disabled = false;
    this.locales = {};
    this.tooltipConfig = {};
    this.role = 'presentation';
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onBlur: this.onBlur, exportparts: "info-wrapper, text, optional-text, tooltip, icon, icon-wrapper" }, !!this.labelText && (h("div", { class: this.infoWrapperCssClasses(), part: "info-wrapper", role: this.role }, h("wpp-typography-v4-0-0", { type: this.typography, class: "text", part: "text" }, this.labelText), this.optional && (h("wpp-typography-v4-0-0", { type: "s-body", class: "optional", part: "optional-text" }, "(", this._locales.optional, ")")))), !!this.description && this.hasIconSlot ? (h("wpp-tooltip-v4-0-0", { class: "tooltip", text: this.description, config: this.tooltipConfig, part: "tooltip" }, h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: this.tooltipConfig.tabIndex === -1 ? 'none' : 'button', tabIndex: this.tooltipConfig.tabIndex ?? 0, "aria-label": this.tooltipConfig.tabIndex !== -1 ? 'Show info' : undefined }))) : (h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: "button", tabIndex: 0, "aria-label": "Show info" }))));
  }
  static get registryIs() { return "wpp-internal-label-v4-0-0"; }
  get host() { return this; }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppInternalLabelCss; }
}, [1, "wpp-internal-label", "wpp-internal-label-v4-0-0", {
    "labelText": [1, "label-text"],
    "description": [1],
    "optional": [4],
    "typography": [1],
    "disabled": [516],
    "locales": [16],
    "tooltipConfig": [16],
    "role": [1],
    "hasIconSlot": [32],
    "focusType": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-internal-label-v4-0-0", "wpp-icon-error-v4-0-0", "wpp-icon-warning-v4-0-0", "wpp-internal-tooltip-v4-0-0", "wpp-tooltip-v4-0-0", "wpp-typography-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-internal-label-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppInternalLabel);
      }
      break;
    case "wpp-icon-error-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-warning-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-internal-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppInternalLabel as W, defineCustomElement as d };
