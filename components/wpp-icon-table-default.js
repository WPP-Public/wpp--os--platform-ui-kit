import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableDefault$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTableDefault extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-table-default", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778ZM5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V7.27778H7.27778V4.16667H5.52778ZM4.16667 8.44444V11.5556H7.27778V8.44444H4.16667ZM8.44444 8.44444L8.44444 11.5556H11.5556V8.44444H8.44444ZM12.7222 8.44444L12.7222 11.5556H15.8333V8.44444H12.7222ZM11.5556 12.7222H8.44444V15.8333H11.5556V12.7222ZM12.7222 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V12.7222H12.7222V15.8333ZM12.7222 7.27778H15.8333V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667H12.7222V7.27778ZM11.5556 4.16667H8.44444V7.27778H11.5556V4.16667ZM4.16667 12.7222V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H7.27778V12.7222H4.16667Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-table-default-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-table-default", "wpp-icon-table-default-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-table-default-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-table-default-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTableDefault$1);
      }
      break;
  } });
}

const WppIconTableDefault = WppIconTableDefault$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTableDefault, defineCustomElement };
