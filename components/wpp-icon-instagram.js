import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconInstagram$1 = /*@__PURE__*/ proxyCustomElement(class WppIconInstagram extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-instagram", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.333 2.5C15.6342 2.5 17.5 4.36581 17.5 6.66699V13.333C17.5 15.6342 15.6342 17.5 13.333 17.5H6.66699L6.45215 17.4941C4.25067 17.3825 2.5 15.5622 2.5 13.333V6.66699C2.5 4.43776 4.25067 2.61752 6.45215 2.50586L6.66699 2.5H13.333ZM6.66699 4C5.19423 4 4 5.19423 4 6.66699V13.333C4 14.8058 5.19423 16 6.66699 16H13.333C14.8058 16 16 14.8058 16 13.333V6.66699C16 5.19423 14.8058 4 13.333 4H6.66699ZM10 6.66699C11.8408 6.66699 13.3338 8.1592 13.334 10L13.3291 10.1719C13.2396 11.9329 11.7833 13.334 10 13.334L9.8291 13.3291C8.06785 13.24 6.66718 11.7834 6.66699 10C6.66717 8.15931 8.15931 6.66717 10 6.66699ZM10 8.16699C8.98774 8.16717 8.16717 8.98774 8.16699 10C8.16719 11.0122 8.98775 11.8338 10 11.834C11.0124 11.834 11.8338 11.0124 11.834 10C11.8338 8.98763 11.0124 8.16699 10 8.16699ZM13.75 5.41699C14.2102 5.41699 14.584 5.78976 14.584 6.25C14.584 6.71022 14.2102 7.08301 13.75 7.08301C13.2899 7.08283 12.917 6.71011 12.917 6.25C12.917 5.78987 13.2899 5.41717 13.75 5.41699Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-instagram-v4-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-instagram", "wpp-icon-instagram-v4-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-instagram-v4-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-instagram-v4-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconInstagram$1);
      }
      break;
  } });
}

const WppIconInstagram = WppIconInstagram$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconInstagram, defineCustomElement };
