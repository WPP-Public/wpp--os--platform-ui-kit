import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMoney$1 = /*@__PURE__*/ proxyCustomElement(class WppIconMoney extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-money", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.79999 6.4C7.47451 6.4 6.4 7.47451 6.4 8.79999C6.4 10.1255 7.47451 11.2 8.79999 11.2C10.1255 11.2 11.2 10.1255 11.2 8.79999C11.2 7.47451 10.1255 6.4 8.79999 6.4ZM7.59999 8.79999C7.59999 8.13725 8.13725 7.6 8.79999 7.6C9.46273 7.6 9.99999 8.13725 9.99999 8.79999C9.99999 9.46274 9.46273 9.99999 8.79999 9.99999C8.13725 9.99999 7.59999 9.46274 7.59999 8.79999ZM2 5.8C2 4.80589 2.80589 4 3.8 4H13.8C14.7941 4 15.6 4.80589 15.6 5.8V11.8C15.6 12.7941 14.7941 13.6 13.8 13.6H3.8C2.80589 13.6 2 12.7941 2 11.8V5.8ZM3.8 5.2C3.46863 5.2 3.2 5.46863 3.2 5.8V6.4H3.8C4.13137 6.4 4.4 6.13137 4.4 5.8V5.2H3.8ZM3.2 9.99999H3.8C4.79411 9.99999 5.6 10.8059 5.6 11.8V12.4H12V11.8C12 10.8059 12.8059 9.99999 13.8 9.99999H14.4V7.6H13.8C12.8059 7.6 12 6.79411 12 5.8V5.2H5.6V5.8C5.6 6.79411 4.79411 7.6 3.8 7.6H3.2V9.99999ZM14.4 6.4V5.8C14.4 5.46863 14.1314 5.2 13.8 5.2H13.2V5.8C13.2 6.13137 13.4686 6.4 13.8 6.4H14.4ZM14.4 11.2H13.8C13.4686 11.2 13.2 11.4686 13.2 11.8V12.4H13.8C14.1314 12.4 14.4 12.1314 14.4 11.8V11.2ZM3.2 11.8C3.2 12.1314 3.46863 12.4 3.8 12.4H4.4V11.8C4.4 11.4686 4.13137 11.2 3.8 11.2H3.2V11.8ZM3.92109 14.8C4.33606 15.5174 5.11167 16 6.00001 16H14.2C16.2987 16 18 14.2987 18 12.2V8.00001C18 7.11167 17.5174 6.33606 16.8 5.92109V12.2C16.8 13.6359 15.6359 14.8 14.2 14.8H3.92109Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-money-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-money", "wpp-icon-money-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-money-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-money-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconMoney$1);
      }
      break;
  } });
}

const WppIconMoney = WppIconMoney$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconMoney, defineCustomElement };
