import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEnter$1 = /*@__PURE__*/ proxyCustomElement(class WppIconEnter extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-enter", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M17.2 3.60001C17.6103 3.60001 17.9484 3.90884 17.9946 4.30671L18 4.40001V9.60001C18 11.0949 16.8286 12.3161 15.3536 12.3959L15.2 12.4H4.732L7.36569 15.0343C7.65407 15.3227 7.67626 15.7765 7.43224 16.0903L7.36569 16.1657C7.0773 16.4541 6.62351 16.4763 6.30968 16.2322L6.23431 16.1657L2.23431 12.1657C2.206 12.1374 2.18025 12.1075 2.15707 12.0763L2.09974 11.9873L2.05698 11.8971L2.02868 11.8128L2.00881 11.7188L2.00318 11.6718L2 11.6L2.00223 11.5398L2.01619 11.4394L2.03979 11.3503L2.07494 11.2614L2.1168 11.1834L2.16776 11.1097L2.23431 11.0343L6.23431 7.03432C6.54673 6.7219 7.05327 6.7219 7.36569 7.03432C7.65407 7.32271 7.67626 7.77649 7.43224 8.09033L7.36569 8.16569L4.732 10.8H15.2C15.8238 10.8 16.3364 10.3241 16.3945 9.71557L16.4 9.60001V4.40001C16.4 3.95818 16.7582 3.60001 17.2 3.60001Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-enter-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-enter", "wpp-icon-enter-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-enter-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-enter-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEnter$1);
      }
      break;
  } });
}

const WppIconEnter = WppIconEnter$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconEnter, defineCustomElement };
