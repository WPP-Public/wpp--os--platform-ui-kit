import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUnderline = /*@__PURE__*/ proxyCustomElement(class WppIconUnderline extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-underline", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75V9C5 10.367 5.33884 11.7359 6.1606 12.7802C7.00313 13.8509 8.29163 14.5 10 14.5C11.7084 14.5 12.9969 13.8509 13.8394 12.7802C14.6612 11.7359 15 10.367 15 9V3.75C15 3.33579 14.6642 3 14.25 3C13.8358 3 13.5 3.33579 13.5 3.75V9C13.5 10.1434 13.2138 11.1495 12.6606 11.8526C12.1281 12.5293 11.2916 13 10 13C8.70837 13 7.87187 12.5293 7.3394 11.8526C6.78616 11.1495 6.5 10.1434 6.5 9V3.75ZM5.75 15.5C5.33579 15.5 5 15.8358 5 16.25C5 16.6642 5.33579 17 5.75 17H14.25C14.6642 17 15 16.6642 15 16.25C15 15.8358 14.6642 15.5 14.25 15.5H5.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-underline-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-underline", "wpp-icon-underline-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-underline-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-underline-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconUnderline);
      }
      break;
  } });
}

export { WppIconUnderline as W, defineCustomElement as d };
