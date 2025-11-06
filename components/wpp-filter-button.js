import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './wpp-icon-tune2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppFilterButtonCss = ":host{--filter-button-height:var(--wpp-filter-button-height, 32px);--filter-button-padding:var(--wpp-filter-button-padding, calc(5px - var(--filter-button-border-width)) calc(16px - var(--filter-button-border-width)) calc(5px - var(--filter-button-border-width)) calc(12px - var(--filter-button-border-width)));--filter-button-bg-color:var(--wpp-filter-button-bg-color, transparent);--filter-button-bg-color-hover:var(--wpp-filter-button-bg-color-hover, var(--wpp-grey-color-200));--filter-button-bg-color-active:var(--wpp-filter-button-bg-color-active, var(--wpp-grey-color-300));--filter-button-bg-color-disabled:var(--wpp-filter-button-bg-color-disabled, var(--wpp-grey-color-100));--filter-button-border-color:var(--wpp-filter-button-border-color, var(--wpp-grey-color-600));--filter-button-border-color-hover:var(--wpp-filter-button-border-color-hover, var(--wpp-grey-color-700));--filter-button-border-color-active:var(--wpp-filter-button-border-color-active, var(--wpp-grey-color-800));--filter-button-border-color-disabled:var(--wpp-filter-button-border-color-disabled, var(--wpp-grey-color-400));--filter-button-first-border-color-focus:var(--wpp-filter-button-first-border-color-focus, var(--wpp-grey-color-000));--filter-button-second-border-color-focus:var(--wpp-filter-button-second-border-color-focus, var(--wpp-brand-color));--filter-button-text-margin:var(--wpp-filter-button-text-margin, 0 0 0 8px);--filter-button-text-color:var(--wpp-filter-button-text-color, var(--wpp-grey-color-900));--filter-button-text-color-hover:var(--wpp-filter-button-text-color-hover, var(--wpp-grey-color-900));--filter-button-text-color-active:var(--wpp-filter-button-text-color-active, var(--wpp-grey-color-1000));--filter-button-text-color-disabled:var(--wpp-filter-button-text-color-disabled, var(--wpp-text-color-disabled));--filter-button-counter-margin:var(--wpp-filter-button-counter-margin, 0 0 0 4px);--filter-button-counter-color:var(--wpp-filter-button-counter-color, var(--wpp-grey-color-900));--filter-button-counter-color-hover:var(--wpp-filter-button-counter-color-hover, var(--wpp-text-color-info));--filter-button-counter-color-active:var(--wpp-filter-button-counter-color-active, var(--wpp-text-color));--filter-button-counter-color-disabled:var(--wpp-filter-button-counter-color-disabled, var(--wpp-text-color-disabled));--filter-button-icon-color:var(--wpp-filter-button-icon-color, var(--wpp-grey-color-800));--filter-button-icon-color-hover:var(--wpp-filter-button-icon-color-hover, var(--wpp-icon-color-hover));--filter-button-icon-color-active:var(--wpp-filter-button-icon-color-active, var(--wpp-icon-color-active));--filter-button-icon-color-disabled:var(--wpp-filter-button-icon-color-disabled, var(--wpp-icon-color-disabled));--filter-button-border-radius:var(--wpp-filter-button-border-radius, var(--wpp-border-radius-s));--filter-button-border-width:var(--wpp-filter-button-border-width, var(--wpp-border-width-s));--filter-button-border-style:var(--wpp-filter-button-border-style, solid);--filter-button-width:auto;display:-ms-inline-flexbox;display:inline-flex;outline:none}:host(.wpp-disabled){cursor:not-allowed}:host(.wpp-disabled:active){pointer-events:none}.button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:var(--filter-button-height);margin:0;padding:var(--filter-button-padding);border-radius:var(--filter-button-border-radius);background-color:var(--filter-button-bg-color);border:var(--filter-button-border-width) var(--filter-button-border-style) var(--filter-button-border-color);outline:none;cursor:pointer}.button .icon{color:var(--filter-button-icon-color)}.button .text{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--filter-button-text-color);margin:var(--filter-button-text-margin);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.button .counter{color:var(--filter-button-counter-color);margin:var(--filter-button-counter-margin)}.button:hover{background-color:var(--filter-button-bg-color-hover);border-color:var(--filter-button-border-color-hover)}.button:hover .icon{color:var(--filter-button-icon-color-hover)}.button:hover .text{color:var(--filter-button-text-color-hover)}.button:hover .counter{color:var(--filter-button-counter-color-hover)}.button:active{background-color:var(--filter-button-bg-color-active);border-color:var(--filter-button-border-color-active)}.button:active .icon{color:var(--filter-button-icon-color-active)}.button:active .text{color:var(--filter-button-text-color-active)}.button:active .counter{color:var(--filter-button-counter-color-active)}.button:disabled{pointer-events:none;background-color:var(--filter-button-bg-color-disabled);border-color:var(--filter-button-border-color-disabled)}.button:disabled .icon{color:var(--filter-button-icon-color-disabled)}.button:disabled .text{color:var(--filter-button-text-color-disabled)}.button:disabled .counter{color:var(--filter-button-counter-color-disabled)}:host(:focus-visible) .button{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--filter-button-first-border-color-focus), 0 0 0 2px var(--filter-button-second-border-color-focus);box-shadow:0 0 0 1px var(--filter-button-first-border-color-focus), 0 0 0 2px var(--filter-button-second-border-color-focus);background-color:var(--filter-button-bg-color-hover);border-color:var(--filter-button-border-color-hover)}:host(:focus-visible) .button .icon{color:var(--filter-button-icon-color-hover)}:host(:focus-visible) .button .text{color:var(--filter-button-text-color-hover)}:host(:focus-visible) .button .counter{color:var(--filter-button-counter-color-hover)}";

const WppFilterButton$1 = /*@__PURE__*/ proxyCustomElement(class WppFilterButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hostCssClasses = () => ({
      'wpp-filter-button': true,
      'wpp-disabled': this.disabled,
    });
    this.buttonCssClasses = () => ({
      button: true,
      disabled: this.disabled,
      primary: true,
    });
    this.counter = 0;
    this.name = undefined;
    this.ariaProps = {};
    this.disabled = false;
    this.autoFocus = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "button, icon, text, inner, counter", "aria-disabled": this.disabled, tabIndex: this.disabled ? -1 : 0 }, h("button", { class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled, name: this.name, type: "button", "data-testid": "wppFilterButton", "aria-label": this.ariaProps.label, tabIndex: -1, part: "button" }, h("wpp-icon-tune-v2-22-0", { class: "icon", part: "icon" }), h("span", { class: "text", part: "text" }, h("slot", { part: "inner" })), this.counter > 0 && (h("wpp-typography-v2-22-0", { class: "counter", type: "s-body", part: "counter" }, `(${this.counter})`)))));
  }
  static get registryIs() { return "wpp-filter-button-v2-22-0"; }
  static get style() { return wppFilterButtonCss; }
}, [1, "wpp-filter-button", "wpp-filter-button-v2-22-0", {
    "counter": [2],
    "name": [1],
    "ariaProps": [16],
    "disabled": [516],
    "autoFocus": [516, "auto-focus"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-filter-button-v2-22-0", "wpp-icon-tune-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-filter-button-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFilterButton$1);
      }
      break;
    case "wpp-icon-tune-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppFilterButton = WppFilterButton$1;
const defineCustomElement = defineCustomElement$1;

export { WppFilterButton, defineCustomElement };
