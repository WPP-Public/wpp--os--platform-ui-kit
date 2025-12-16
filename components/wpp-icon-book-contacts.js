import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBookContacts$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBookContacts extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-book-contacts", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.6 10.2C12.6 9.86864 12.3314 9.60002 12 9.60002H8.00002C7.66865 9.60002 7.40002 9.86864 7.40002 10.2V10.5996C7.40002 11.4 8.50653 12 10 12C11.4935 12 12.6 11.4 12.6 10.5996V10.2ZM11.4 7.39638C11.4 6.6229 10.7735 6 10 6C9.22655 6 8.60002 6.6229 8.60002 7.39638C8.60002 8.16985 9.22655 8.79687 10 8.79687C10.7735 8.79687 11.4 8.16985 11.4 7.39638ZM3.40002 4C3.40002 2.89543 4.29545 2 5.40002 2H14.6C15.7046 2 16.6 2.89543 16.6 4V15.4C16.6 15.7314 16.3314 16 16 16H4.60002C4.60002 16.4418 4.9582 16.8 5.40002 16.8H16C16.3314 16.8 16.6 17.0686 16.6 17.4C16.6 17.7314 16.3314 18 16 18H5.40002C4.29545 18 3.40002 17.1046 3.40002 16V4ZM4.60002 4V14.8H15.4V4C15.4 3.55817 15.0419 3.2 14.6 3.2H5.40002C4.9582 3.2 4.60002 3.55817 4.60002 4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-book-contacts-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-book-contacts", "wpp-icon-book-contacts-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-book-contacts-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-book-contacts-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBookContacts$1);
      }
      break;
  } });
}

const WppIconBookContacts = WppIconBookContacts$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBookContacts, defineCustomElement };
