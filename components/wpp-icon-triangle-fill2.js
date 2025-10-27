import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTriangleFill = /*@__PURE__*/ proxyCustomElement(class WppIconTriangleFill extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-triangle-fill", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.1271 9.24407C13.5876 9.64284 13.5876 10.3572 13.1271 10.7559L9.65465 13.7632C9.00701 14.3241 8 13.864 8 13.0073L8 6.99275C8 6.136 9.00701 5.67594 9.65465 6.23682L13.1271 9.24407Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-triangle-fill-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-triangle-fill", "wpp-icon-triangle-fill-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-triangle-fill-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-triangle-fill-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTriangleFill);
      }
      break;
  } });
}

export { WppIconTriangleFill as W, defineCustomElement as d };
