import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './wpp-button2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';

const wppIconButtonCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host([disabled]:not([disabled=false]):active),:host([loading]:not([loading=false]):active){pointer-events:none}";

const WppIconButton$1 = /*@__PURE__*/ proxyCustomElement(class WppIconButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hostCssClasses = () => ({
      'wpp-icon-button': true,
    });
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.name = undefined;
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-button component is deprecated. Please, use wpp-action-button instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner" }, h("wpp-button-v3-3-0", { variant: "secondary", size: this.size, disabled: this.disabled, loading: this.loading, name: this.name, "data-testid": "wppIconButton", part: "wrapper" }, h("slot", { slot: "icon-start", part: "inner" }))));
  }
  static get registryIs() { return "wpp-icon-button-v3-3-0"; }
  static get style() { return wppIconButtonCss; }
}, [1, "wpp-icon-button", "wpp-icon-button-v3-3-0", {
    "size": [1],
    "disabled": [516],
    "loading": [516],
    "name": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-button-v3-3-0", "wpp-button-v3-3-0", "wpp-spinner-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-button-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconButton$1);
      }
      break;
    case "wpp-button-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppIconButton = WppIconButton$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconButton, defineCustomElement };
