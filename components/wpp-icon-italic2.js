import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconItalic = /*@__PURE__*/ proxyCustomElement(class WppIconItalic extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-italic", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8 3.25C8 2.83579 8.33579 2.5 8.75 2.5H16.25C16.6642 2.5 17 2.83579 17 3.25C17 3.66421 16.6642 4 16.25 4H13.0151L8.59202 15.5H11.25C11.6642 15.5 12 15.8358 12 16.25C12 16.6642 11.6642 17 11.25 17H3.75C3.33579 17 3 16.6642 3 16.25C3 15.8358 3.33579 15.5 3.75 15.5H6.9849L11.408 4H8.75C8.33579 4 8 3.66421 8 3.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-italic-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-italic", "wpp-icon-italic-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-italic-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-italic-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconItalic);
      }
      break;
  } });
}

export { WppIconItalic as W, defineCustomElement as d };
