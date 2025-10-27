import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRecord$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRecord extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-record", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 14.8C12.651 14.8 14.8 12.651 14.8 10C14.8 7.34903 12.651 5.2 10 5.2C7.34903 5.2 5.2 7.34903 5.2 10C5.2 12.651 7.34903 14.8 10 14.8ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3.2 10C3.2 6.24446 6.24446 3.2 10 3.2C13.7555 3.2 16.8 6.24446 16.8 10C16.8 13.7555 13.7555 16.8 10 16.8C6.24446 16.8 3.2 13.7555 3.2 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-record-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-record", "wpp-icon-record-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-record-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-record-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRecord$1);
      }
      break;
  } });
}

const WppIconRecord = WppIconRecord$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRecord, defineCustomElement };
