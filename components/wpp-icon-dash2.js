import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDash = /*@__PURE__*/ proxyCustomElement(class WppIconDash extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-dash", width: this.width, height: this.height, size: this.size, color: this.color }, h("line", { x1: "7", y1: "10", x2: "13", y2: "10", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-dash-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-dash", "wpp-icon-dash-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-dash-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-dash-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDash);
      }
      break;
  } });
}

export { WppIconDash as W, defineCustomElement as d };
