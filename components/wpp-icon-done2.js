import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDone = /*@__PURE__*/ proxyCustomElement(class WppIconDone extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-done", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18.6553 3.84467C18.9482 4.13756 18.9482 4.61244 18.6553 4.90533L7.40533 16.1553C7.11244 16.4482 6.63756 16.4482 6.34467 16.1553L1.34467 11.1553C1.05178 10.8624 1.05178 10.3876 1.34467 10.0947C1.63756 9.80178 2.11244 9.80178 2.40533 10.0947L6.875 14.5643L17.5947 3.84467C17.8876 3.55178 18.3624 3.55178 18.6553 3.84467Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-done-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-done", "wpp-icon-done-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-done-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-done-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDone);
      }
      break;
  } });
}

export { WppIconDone as W, defineCustomElement as d };
