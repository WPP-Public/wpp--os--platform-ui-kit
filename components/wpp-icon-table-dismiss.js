import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableDismiss$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTableDismiss extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-table-dismiss", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 5.6C3 4.16406 4.16406 3 5.6 3H14.8C16.2359 3 17.4 4.16406 17.4 5.6V10.2175C17.0294 9.9802 16.6268 9.78867 16.2 9.6508V8.6H13V9.6508C12.5732 9.78867 12.1706 9.98021 11.8 10.2175L11.8 8.6H8.6V11.8H10.2175C9.9802 12.1706 9.78867 12.5732 9.6508 13H8.6V16.2H9.6508C9.78867 16.6268 9.9802 17.0294 10.2175 17.4H5.6C4.16406 17.4 3 16.2359 3 14.8V5.6ZM5.6 4.2C4.8268 4.2 4.2 4.8268 4.2 5.6V7.4H7.4V4.2H5.6ZM4.2 8.6V11.8H7.4L7.4 8.6H4.2ZM13 7.4H16.2V5.6C16.2 4.8268 15.5732 4.2 14.8 4.2H13V7.4ZM11.8 4.2H8.6V7.4H11.8V4.2ZM4.2 13V14.8C4.2 15.5732 4.8268 16.2 5.6 16.2H7.4V13H4.2ZM19 14.6C19 17.0301 17.0301 19 14.6 19C12.1699 19 10.2 17.0301 10.2 14.6C10.2 12.1699 12.1699 10.2 14.6 10.2C17.0301 10.2 19 12.1699 19 14.6ZM14.6 14.0343L13.2828 12.7172C13.1266 12.5609 12.8734 12.5609 12.7172 12.7172C12.5609 12.8734 12.5609 13.1266 12.7172 13.2828L14.0343 14.6L12.7172 15.9172C12.5609 16.0734 12.5609 16.3266 12.7172 16.4828C12.8734 16.6391 13.1266 16.6391 13.2828 16.4828L14.6 15.1657L15.9172 16.4828C16.0734 16.6391 16.3266 16.6391 16.4828 16.4828C16.6391 16.3266 16.6391 16.0734 16.4828 15.9172L15.1657 14.6L16.4828 13.2828C16.6391 13.1266 16.6391 12.8734 16.4828 12.7172C16.3266 12.5609 16.0734 12.5609 15.9172 12.7172L14.6 14.0343Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-table-dismiss-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-table-dismiss", "wpp-icon-table-dismiss-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-table-dismiss-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-table-dismiss-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTableDismiss$1);
      }
      break;
  } });
}

const WppIconTableDismiss = WppIconTableDismiss$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTableDismiss, defineCustomElement };
