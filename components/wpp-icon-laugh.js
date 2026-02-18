import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLaugh$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLaugh extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-laugh", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.79942 10C5.63081 10 5.46999 10.0709 5.35631 10.1955C5.24263 10.32 5.18659 10.4866 5.20189 10.6545C5.42608 13.1133 7.24179 15.2 10 15.2C12.7582 15.2 14.5739 13.1133 14.7982 10.6545C14.8135 10.4866 14.7574 10.32 14.6437 10.1955C14.5301 10.0709 14.3692 10 14.2006 10H5.79942ZM10 14C8.19429 14 6.90282 12.8164 6.50589 11.2H13.4941C13.0972 12.8164 11.8057 14 10 14ZM12.6001 7.4C12.2733 7.4 12.0318 7.62975 11.9936 7.88786C11.9451 8.21566 11.64 8.44206 11.3122 8.39353C10.9844 8.34501 10.758 8.03994 10.8065 7.71214C10.9357 6.8396 11.705 6.2 12.6001 6.2C13.4951 6.2 14.2645 6.8396 14.3936 7.71214C14.4421 8.03994 14.2157 8.34501 13.8879 8.39353C13.5601 8.44206 13.2551 8.21566 13.2065 7.88786C13.1683 7.62975 12.9269 7.4 12.6001 7.4ZM6.79361 7.88786C6.83182 7.62975 7.07326 7.4 7.40008 7.4C7.72691 7.4 7.96834 7.62975 8.00655 7.88786C8.05507 8.21566 8.36014 8.44206 8.68794 8.39353C9.01574 8.34501 9.24214 8.03994 9.19361 7.71214C9.06445 6.8396 8.29514 6.2 7.40008 6.2C6.50502 6.2 5.73571 6.8396 5.60655 7.71214C5.55803 8.03994 5.78442 8.34501 6.11222 8.39353C6.44002 8.44206 6.74509 8.21566 6.79361 7.88786ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3.2 10C3.2 6.24446 6.24446 3.2 10 3.2C13.7555 3.2 16.8 6.24446 16.8 10C16.8 13.7555 13.7555 16.8 10 16.8C6.24446 16.8 3.2 13.7555 3.2 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-laugh-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-laugh", "wpp-icon-laugh-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-laugh-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-laugh-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLaugh$1);
      }
      break;
  } });
}

const WppIconLaugh = WppIconLaugh$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLaugh, defineCustomElement };
