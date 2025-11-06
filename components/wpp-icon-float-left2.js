import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatLeft = /*@__PURE__*/ proxyCustomElement(class WppIconFloatLeft extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-float-left", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.5 5.833h5v5H2.5V5.833m0-3.333h15v1.667H2.5V2.5m15 3.333v1.667H9.167V5.833h8.333m0 3.333v1.667H9.167v-1.667h8.333M2.5 12.5h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-left-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-float-left", "wpp-icon-float-left-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-float-left-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-float-left-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFloatLeft);
      }
      break;
  } });
}

export { WppIconFloatLeft as W, defineCustomElement as d };
