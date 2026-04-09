import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatCenter = /*@__PURE__*/ proxyCustomElement(class WppIconFloatCenter extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-float-center", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.5 5.833h5v5H7.5V5.833M2.5 2.5h15v1.667H2.5V2.5m0 10h15v1.667H2.5v-1.667m0 3.333h11.667v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-center-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-float-center", "wpp-icon-float-center-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-float-center-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-float-center-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFloatCenter);
      }
      break;
  } });
}

export { WppIconFloatCenter as W, defineCustomElement as d };
