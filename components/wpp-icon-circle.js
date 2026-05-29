import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCircle$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCircle extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-circle", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.7555 16.8 16.8 13.7555 16.8 10C16.8 6.24446 13.7555 3.2 10 3.2ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-circle-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-circle", "wpp-icon-circle-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-circle-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-circle-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCircle$1);
      }
      break;
  } });
}

const WppIconCircle = WppIconCircle$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCircle, defineCustomElement };
