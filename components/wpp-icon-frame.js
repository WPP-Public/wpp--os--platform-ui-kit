import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFrame$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFrame extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-frame", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.167 1.79199C14.558 1.79226 14.875 2.10896 14.875 2.5V5.125H17.5C17.8911 5.125 18.2078 5.44196 18.208 5.83301C18.208 6.22421 17.8912 6.54102 17.5 6.54102H14.875V13.459H17.5C17.8912 13.459 18.208 13.7758 18.208 14.167C18.2078 14.558 17.8911 14.875 17.5 14.875H14.875V17.5C14.875 17.891 14.558 18.2077 14.167 18.208C13.7758 18.208 13.459 17.8912 13.459 17.5V14.875H6.54199V17.5C6.54199 17.891 6.22496 18.2077 5.83398 18.208C5.44278 18.208 5.12598 17.8912 5.12598 17.5V14.875H2.5C2.10891 14.875 1.79217 14.558 1.79199 14.167C1.79199 13.7758 2.1088 13.459 2.5 13.459H5.12598V6.54102H2.5C2.1088 6.54102 1.79199 6.22421 1.79199 5.83301C1.79217 5.44196 2.10891 5.125 2.5 5.125H5.12598V2.5C5.12598 2.1088 5.44278 1.79199 5.83398 1.79199C6.22496 1.79226 6.54199 2.10896 6.54199 2.5V5.125H13.459V2.5C13.459 2.1088 13.7758 1.79199 14.167 1.79199ZM6.54199 13.459H13.459V6.54102H6.54199V13.459Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-frame-v4-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-frame", "wpp-icon-frame-v4-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-frame-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-frame-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFrame$1);
      }
      break;
  } });
}

const WppIconFrame = WppIconFrame$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFrame, defineCustomElement };
