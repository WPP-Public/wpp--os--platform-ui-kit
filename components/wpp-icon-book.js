import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBook$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBook extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-book", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.80002 5.2C5.80002 4.75817 6.1582 4.4 6.60002 4.4H13C13.4419 4.4 13.8 4.75817 13.8 5.2V6.8C13.8 7.24183 13.4419 7.6 13 7.6H6.60002C6.1582 7.6 5.80002 7.24183 5.80002 6.8V5.2ZM7.00002 6.4H12.6V5.6H7.00002V6.4ZM3.40002 4C3.40002 2.89543 4.29545 2 5.40002 2H14.6C15.7046 2 16.6 2.89543 16.6 4V15.4C16.6 15.7314 16.3314 16 16 16H4.60002C4.60002 16.4418 4.9582 16.8 5.40002 16.8H16C16.3314 16.8 16.6 17.0686 16.6 17.4C16.6 17.7314 16.3314 18 16 18H5.40002C4.29545 18 3.40002 17.1046 3.40002 16V4ZM4.60002 14.8H15.4V4C15.4 3.55817 15.0419 3.2 14.6 3.2H5.40002C4.9582 3.2 4.60002 3.55817 4.60002 4V14.8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-book-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-book", "wpp-icon-book-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-book-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-book-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBook$1);
      }
      break;
  } });
}

const WppIconBook = WppIconBook$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBook, defineCustomElement };
