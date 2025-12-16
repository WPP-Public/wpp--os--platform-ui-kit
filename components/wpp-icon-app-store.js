import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAppStore$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAppStore extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-app-store", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.1111 2C16.7066 2 18 3.2934 18 4.88889V15.1111C18 16.7066 16.7066 18 15.1111 18H4.88889C3.2934 18 2 16.7066 2 15.1111V4.88889C2 3.2934 3.2934 2 4.88889 2H15.1111ZM15.1111 3.33333H4.88889C4.02978 3.33333 3.33333 4.02978 3.33333 4.88889V15.1111C3.33333 15.9702 4.02978 16.6667 4.88889 16.6667H15.1111C15.9702 16.6667 16.6667 15.9702 16.6667 15.1111V4.88889C16.6667 4.02978 15.9702 3.33333 15.1111 3.33333ZM7.66104 12.8926L7.20835 13.6679C7.02262 13.9858 6.61433 14.0929 6.29641 13.9072C6.005 13.737 5.89067 13.3797 6.01669 13.0765L6.05706 12.9953L6.11615 12.8926H7.66104ZM11.149 8.24362L12.677 10.8925L14.2239 10.8933C14.5614 10.8933 14.8403 11.1441 14.8845 11.4695L14.8906 11.56C14.8906 11.8975 14.6398 12.1764 14.3144 12.2205L14.2239 12.2266L13.4458 12.2258L13.8923 12.9993C14.0763 13.3182 13.967 13.7259 13.648 13.9099C13.3557 14.0785 12.9888 14.0007 12.7879 13.7409L12.7374 13.6656L10.3747 9.56984L11.149 8.24362ZM11.1228 5.64574C11.4142 5.81599 11.5285 6.17325 11.4025 6.47649L11.3621 6.55767L8.82896 10.8924L10.368 10.8932L11.1369 12.2265L5.77918 12.2266C5.41099 12.2266 5.11251 11.9281 5.11251 11.56C5.11251 11.2224 5.36332 10.9435 5.68872 10.8994L5.77918 10.8933L7.28496 10.8933L9.22359 7.57416L8.63479 6.55454C8.46612 6.26219 8.54397 5.89526 8.80377 5.69441L8.87908 5.64393C9.17143 5.47527 9.53836 5.55312 9.73921 5.81291L9.78969 5.88823L9.99693 6.24883L10.2109 5.88509C10.3966 5.56718 10.8049 5.46002 11.1228 5.64574Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-app-store-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-app-store", "wpp-icon-app-store-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-app-store-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-app-store-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAppStore$1);
      }
      break;
  } });
}

const WppIconAppStore = WppIconAppStore$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAppStore, defineCustomElement };
