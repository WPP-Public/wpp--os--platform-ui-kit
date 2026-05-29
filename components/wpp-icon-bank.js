import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBank$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBank extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-bank", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.05 2.35C10.4278 1.88333 9.57221 1.88333 8.94998 2.35L2.74998 7C1.78897 7.72076 2.29872 9.25 3.49998 9.25H4V13.6707C2.83481 14.0825 2 15.1938 2 16.5V17.5C2 17.7761 2.22386 18 2.5 18H17.5C17.7761 18 18 17.7761 18 17.5V16.5C18 15.1938 17.1652 14.0825 16 13.6707V9.25H16.5C17.7012 9.25 18.211 7.72076 17.25 7L11.05 2.35ZM5.5 13.5H7.5V9.25H5.5V13.5ZM14.5 9.25H12.5V13.5H14.5V9.25ZM9 9.25V13.5H11V9.25H9ZM9.84998 3.55C9.93887 3.48333 10.0611 3.48333 10.15 3.55L15.75 7.75H4.24998L9.84998 3.55ZM15 15C15.8284 15 16.5 15.6716 16.5 16.5H3.5C3.5 15.6716 4.17157 15 5 15H15Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bank-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-bank", "wpp-icon-bank-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-bank-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-bank-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBank$1);
      }
      break;
  } });
}

const WppIconBank = WppIconBank$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBank, defineCustomElement };
