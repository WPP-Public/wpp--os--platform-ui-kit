import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBookSearch$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBookSearch extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-book-search", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.0549 9.83601C12.3725 9.36221 12.5579 8.79199 12.5579 8.17895C12.5579 6.53372 11.2242 5.2 9.57897 5.2C7.93374 5.2 6.60002 6.53372 6.60002 8.17895C6.60002 9.82417 7.93374 11.1579 9.57897 11.1579C10.192 11.1579 10.7622 10.9725 11.236 10.6548L13.2169 12.6356L13.2705 12.6819L13.2764 12.6863C13.5032 12.8546 13.8248 12.8361 14.0305 12.6304C14.2565 12.4043 14.2565 12.0378 14.0305 11.8117L12.0549 9.83601ZM9.57897 6.35789C10.5847 6.35789 11.4 7.17321 11.4 8.17895C11.4 9.18469 10.5847 10 9.57897 10C8.57323 10 7.75792 9.18469 7.75792 8.17895C7.75792 7.17321 8.57323 6.35789 9.57897 6.35789ZM5.40002 2C4.29545 2 3.40002 2.89543 3.40002 4V16C3.40002 17.1046 4.29545 18 5.40002 18H16C16.3314 18 16.6 17.7314 16.6 17.4C16.6 17.0686 16.3314 16.8 16 16.8H5.40002C4.9582 16.8 4.60002 16.4418 4.60002 16H16C16.3314 16 16.6 15.7314 16.6 15.4V4C16.6 2.89543 15.7046 2 14.6 2H5.40002ZM15.4 14.8H4.60002V4C4.60002 3.55817 4.9582 3.2 5.40002 3.2H14.6C15.0419 3.2 15.4 3.55817 15.4 4V14.8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-book-search-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-book-search", "wpp-icon-book-search-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-book-search-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-book-search-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBookSearch$1);
      }
      break;
  } });
}

const WppIconBookSearch = WppIconBookSearch$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBookSearch, defineCustomElement };
