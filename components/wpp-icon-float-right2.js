import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatRight = /*@__PURE__*/ proxyCustomElement(class WppIconFloatRight extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-float-right", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.5 5.833h5v5h-5V5.833M2.5 2.5h15v1.667H2.5V2.5m8.333 3.333v1.667H2.5V5.833h8.333m-3.333 3.333v1.667H2.5v-1.667h5m-5 3.333h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-right-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-float-right", "wpp-icon-float-right-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-float-right-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-float-right-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFloatRight);
      }
      break;
  } });
}

export { WppIconFloatRight as W, defineCustomElement as d };
