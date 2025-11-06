import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconColumnsOne$1 = /*@__PURE__*/ proxyCustomElement(class WppIconColumnsOne extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-columns-one", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.5 3.5C5.80964 3.5 5.25 4.05964 5.25 4.75V15.25C5.25 15.9404 5.80964 16.5 6.5 16.5H13.5C14.1904 16.5 14.75 15.9404 14.75 15.25V4.75C14.75 4.05964 14.1904 3.5 13.5 3.5H6.5ZM3.75 4.75C3.75 3.23122 4.98122 2 6.5 2H13.5C15.0188 2 16.25 3.23122 16.25 4.75V15.25C16.25 16.7688 15.0188 18 13.5 18H6.5C4.98122 18 3.75 16.7688 3.75 15.25V4.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-columns-one-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-columns-one", "wpp-icon-columns-one-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-columns-one-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-columns-one-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconColumnsOne$1);
      }
      break;
  } });
}

const WppIconColumnsOne = WppIconColumnsOne$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconColumnsOne, defineCustomElement };
