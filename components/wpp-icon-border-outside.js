import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBorderOutside$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBorderOutside extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-border-outside", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4.5C5.17157 4.5 4.5 5.17157 4.5 6V14C4.5 14.8284 5.17157 15.5 6 15.5H14C14.8284 15.5 15.5 14.8284 15.5 14V6C15.5 5.17157 14.8284 4.5 14 4.5H6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-border-outside-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-border-outside", "wpp-icon-border-outside-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-border-outside-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-border-outside-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBorderOutside$1);
      }
      break;
  } });
}

const WppIconBorderOutside = WppIconBorderOutside$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBorderOutside, defineCustomElement };
