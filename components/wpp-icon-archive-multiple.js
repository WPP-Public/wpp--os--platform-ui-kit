import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconArchiveMultiple$1 = /*@__PURE__*/ proxyCustomElement(class WppIconArchiveMultiple extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-archive-multiple", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.39999 8.79999C7.06862 8.79999 6.79999 9.06861 6.79999 9.39998C6.79999 9.73135 7.06862 9.99998 7.39999 9.99998H10.1817C10.5131 9.99998 10.7817 9.73135 10.7817 9.39998C10.7817 9.06861 10.5131 8.79999 10.1817 8.79999H7.39999ZM3.4 2C2.6268 2 2 2.6268 2 3.4V5.39999C2 5.95847 2.32701 6.44057 2.8 6.66526V13C2.8 14.6568 4.14314 16 5.79999 16H11.8C13.4568 16 14.8 14.6568 14.8 13V6.66526C15.273 6.44057 15.6 5.95847 15.6 5.39999V3.4C15.6 2.6268 14.9732 2 14.2 2H3.4ZM4 13V6.79999H13.6V13C13.6 13.9941 12.7941 14.8 11.8 14.8H5.79999C4.80588 14.8 4 13.9941 4 13ZM3.2 3.4C3.2 3.28954 3.28954 3.2 3.4 3.2H14.2C14.3104 3.2 14.4 3.28954 14.4 3.4V5.39999C14.4 5.51045 14.3104 5.59999 14.2 5.59999H3.4C3.28954 5.59999 3.2 5.51045 3.2 5.39999V3.4ZM16.8002 9.80001C16.8002 8.81852 16.3289 7.94712 15.6002 7.39979V13.4C15.6002 15.2778 14.078 16.8 12.2002 16.8H7.80021L7.79441 16.8H5.39999C5.94731 17.5287 6.81872 18 7.80021 18H12.2002C14.7407 18 16.8002 15.9405 16.8002 13.4V9.80001Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-archive-multiple-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-archive-multiple", "wpp-icon-archive-multiple-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-archive-multiple-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-archive-multiple-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconArchiveMultiple$1);
      }
      break;
  } });
}

const WppIconArchiveMultiple = WppIconArchiveMultiple$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconArchiveMultiple, defineCustomElement };
