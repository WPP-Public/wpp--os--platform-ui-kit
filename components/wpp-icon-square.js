import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSquare$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSquare extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-square", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778ZM5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667H5.52778Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-square-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-square", "wpp-icon-square-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-square-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-square-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSquare$1);
      }
      break;
  } });
}

const WppIconSquare = WppIconSquare$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSquare, defineCustomElement };
