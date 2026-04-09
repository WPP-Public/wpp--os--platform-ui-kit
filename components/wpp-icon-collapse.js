import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCollapse$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCollapse extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-collapse", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18.2374 2.8233C18.5303 2.53041 18.5303 2.05553 18.2374 1.76264C17.9445 1.46975 17.4696 1.46975 17.1767 1.76264L12.207 6.73231V2.70703C12.207 2.29282 11.8712 1.95703 11.457 1.95703C11.0428 1.95703 10.707 2.29282 10.707 2.70703V8.54297C10.707 8.95719 11.0428 9.29297 11.457 9.29297H17.293C17.7072 9.29297 18.043 8.95719 18.043 8.54297C18.043 8.12876 17.7072 7.79297 17.293 7.79297H13.2677L18.2374 2.8233ZM1.76264 18.2374C1.46975 17.9445 1.46975 17.4696 1.76264 17.1767L6.73231 12.207H2.70703C2.29282 12.207 1.95703 11.8712 1.95703 11.457C1.95703 11.0428 2.29282 10.707 2.70703 10.707H8.54297C8.95719 10.707 9.29297 11.0428 9.29297 11.457V17.293C9.29297 17.7072 8.95719 18.043 8.54297 18.043C8.12876 18.043 7.79297 17.7072 7.79297 17.293V13.2677L2.8233 18.2374C2.53041 18.5303 2.05553 18.5303 1.76264 18.2374Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-collapse-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-collapse", "wpp-icon-collapse-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-collapse-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-collapse-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCollapse$1);
      }
      break;
  } });
}

const WppIconCollapse = WppIconCollapse$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCollapse, defineCustomElement };
