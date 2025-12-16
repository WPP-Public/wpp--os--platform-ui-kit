import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTick = /*@__PURE__*/ proxyCustomElement(class WppIconTick extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-tick", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.25 10L8.5747 12.1794C8.76703 12.3597 9.06631 12.3597 9.25864 12.1794L14.25 7.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-tick-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-tick", "wpp-icon-tick-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-tick-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-tick-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTick);
      }
      break;
  } });
}

export { WppIconTick as W, defineCustomElement as d };
