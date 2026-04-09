import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLaptop$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLaptop extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-laptop", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M1.25 15.5C1.25 15.0858 1.58579 14.75 2 14.75H18C18.4142 14.75 18.75 15.0858 18.75 15.5C18.75 15.9142 18.4142 16.25 18 16.25H2C1.58579 16.25 1.25 15.9142 1.25 15.5Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.25 5C2.25 4.0335 3.0335 3.25 4 3.25H16C16.9665 3.25 17.75 4.0335 17.75 5V12C17.75 12.9665 16.9665 13.75 16 13.75H4C3.0335 13.75 2.25 12.9665 2.25 12V5ZM4 4.75C3.86193 4.75 3.75 4.86193 3.75 5V12C3.75 12.1381 3.86193 12.25 4 12.25H16C16.1381 12.25 16.25 12.1381 16.25 12V5C16.25 4.86193 16.1381 4.75 16 4.75H4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-laptop-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-laptop", "wpp-icon-laptop-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-laptop-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-laptop-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLaptop$1);
      }
      break;
  } });
}

const WppIconLaptop = WppIconLaptop$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLaptop, defineCustomElement };
