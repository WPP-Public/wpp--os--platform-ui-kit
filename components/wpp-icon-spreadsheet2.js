import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSpreadsheet = /*@__PURE__*/ proxyCustomElement(class WppIconSpreadsheet extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-spreadsheet", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.24897 9.57704H12.748C13.5656 9.57704 14.2285 10.2399 14.2285 11.0575V14.4415C14.2285 15.2592 13.5656 15.922 12.748 15.922H7.24897C6.43131 15.922 5.76847 15.2592 5.76847 14.4415V11.0575C5.76847 10.2399 6.43131 9.57704 7.24897 9.57704ZM7.03747 11.0575V12.115H8.30647V10.846H7.24897C7.13216 10.846 7.03747 10.9407 7.03747 11.0575ZM7.03747 13.384V14.4415C7.03747 14.5583 7.13216 14.653 7.24897 14.653H8.30647V13.384H7.03747ZM9.57547 13.384V14.653H12.748C12.8648 14.653 12.9595 14.5583 12.9595 14.4415V13.384H9.57547ZM12.9595 12.115V11.0575C12.9595 10.9407 12.8648 10.846 12.748 10.846H9.57547V12.115H12.9595ZM11.3394 2.0358C11.3267 2.02315 11.3124 2.01218 11.2982 2.00127C11.2876 1.99322 11.2772 1.9852 11.2675 1.97658C11.2074 1.92243 11.1482 1.86913 11.0822 1.8243C11.0608 1.80986 11.0374 1.79847 11.0141 1.78713C11.0005 1.78052 10.987 1.77393 10.9739 1.76677C10.9598 1.75881 10.9457 1.75066 10.9316 1.74251C10.8858 1.71598 10.8397 1.68934 10.7912 1.66863C10.6245 1.59926 10.4452 1.56457 10.2633 1.55188C10.2466 1.55082 10.2301 1.54857 10.2135 1.54631C10.1906 1.54318 10.1676 1.54004 10.144 1.54004H4.92247C3.98848 1.54004 3.23047 2.29806 3.23047 3.23204V16.768C3.23047 17.702 3.98848 18.46 4.92247 18.46H15.0745C16.0085 18.46 16.7665 17.702 16.7665 16.768V8.16253C16.7665 7.71415 16.588 7.28353 16.2707 6.96628L11.3394 2.0358ZM15.0745 17.191H4.92247C4.68897 17.191 4.49947 17.0007 4.49947 16.768V3.23204C4.49947 2.99939 4.68897 2.80904 4.92247 2.80904H9.99847V6.61604C9.99847 7.55002 10.7565 8.30804 11.6905 8.30804H15.4975V16.768C15.4975 17.0007 15.308 17.191 15.0745 17.191ZM14.5483 7.03904H11.6905C11.457 7.03904 11.2675 6.84869 11.2675 6.61604V3.75741L14.5483 7.03904Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-spreadsheet-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-spreadsheet", "wpp-icon-spreadsheet-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-spreadsheet-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-spreadsheet-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSpreadsheet);
      }
      break;
  } });
}

export { WppIconSpreadsheet as W, defineCustomElement as d };
