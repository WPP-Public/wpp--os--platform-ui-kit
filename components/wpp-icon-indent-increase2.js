import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconIndentIncrease = /*@__PURE__*/ proxyCustomElement(class WppIconIndentIncrease extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-indent-increase", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.83316 13.3333H14.9165C15.1289 13.3336 15.3332 13.4149 15.4876 13.5607C15.6421 13.7065 15.735 13.9058 15.7475 14.1178C15.7599 14.3299 15.6909 14.5386 15.5546 14.7015C15.4183 14.8644 15.2249 14.9691 15.014 14.9942L14.9165 15H7.83316C7.62076 14.9998 7.41646 14.9184 7.26201 14.7726C7.10757 14.6268 7.01463 14.4275 7.00218 14.2155C6.98973 14.0035 7.05872 13.7947 7.19504 13.6318C7.33137 13.4689 7.52474 13.3643 7.73566 13.3392L7.83316 13.3333ZM2.24399 7.74417C2.38748 7.60069 2.5784 7.51449 2.78092 7.50176C2.98344 7.48903 3.18365 7.55062 3.34399 7.675L3.42232 7.74417L5.08899 9.41083C5.23247 9.55433 5.31866 9.74524 5.3314 9.94777C5.34413 10.1503 5.28253 10.3505 5.15816 10.5108L5.08899 10.5892L3.42232 12.2558C3.27236 12.4053 3.07113 12.4921 2.8595 12.4985C2.64788 12.505 2.44173 12.4307 2.28292 12.2906C2.12412 12.1506 2.02457 11.9554 2.00449 11.7446C1.98441 11.5338 2.04531 11.3233 2.17482 11.1558L2.24399 11.0775L3.32149 10L2.24399 8.9225C2.08776 8.76623 2 8.5543 2 8.33333C2 8.11236 2.08776 7.90044 2.24399 7.74417ZM7.83316 9.16667L17.4165 9.16583C17.6289 9.16607 17.8332 9.2474 17.9876 9.39321C18.1421 9.53901 18.235 9.73829 18.2475 9.95033C18.2599 10.1624 18.1909 10.3711 18.0546 10.534C17.9183 10.6969 17.7249 10.8016 17.514 10.8267L17.4165 10.8333H7.83316C7.62076 10.8331 7.41646 10.7518 7.26201 10.606C7.10757 10.4602 7.01463 10.2609 7.00218 10.0488C6.98973 9.8368 7.05872 9.62802 7.19504 9.46514C7.33137 9.30226 7.52474 9.19759 7.73566 9.1725L7.83316 9.16667ZM7.83316 5H14.9165C15.1289 5.00024 15.3332 5.08157 15.4876 5.22737C15.6421 5.37318 15.735 5.57246 15.7475 5.7845C15.7599 5.99653 15.6909 6.20532 15.5546 6.36819C15.4183 6.53107 15.2249 6.63575 15.014 6.66083L14.9165 6.66667H7.83316C7.62076 6.66643 7.41646 6.5851 7.26201 6.43929C7.10757 6.29349 7.01463 6.09421 7.00218 5.88217C6.98973 5.67014 7.05872 5.46135 7.19504 5.29847C7.33137 5.1356 7.52474 5.03092 7.73566 5.00583L7.83316 5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-indent-increase-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-indent-increase", "wpp-icon-indent-increase-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-indent-increase-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-indent-increase-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconIndentIncrease);
      }
      break;
  } });
}

export { WppIconIndentIncrease as W, defineCustomElement as d };
