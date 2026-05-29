import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRemove = /*@__PURE__*/ proxyCustomElement(class WppIconRemove extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-remove", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-remove-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-remove", "wpp-icon-remove-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-remove-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-remove-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRemove);
      }
      break;
  } });
}

export { WppIconRemove as W, defineCustomElement as d };
