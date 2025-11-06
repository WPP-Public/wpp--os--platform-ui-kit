import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSquareHint$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSquareHint extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-square-hint", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.44444 3.58333C8.44444 3.26117 8.70561 3 9.02778 3H10.9722C11.2944 3 11.5556 3.26117 11.5556 3.58333C11.5556 3.9055 11.2944 4.16667 10.9722 4.16667H9.02778C8.70561 4.16667 8.44444 3.9055 8.44444 3.58333ZM14.4722 4.16667C14.1501 4.16667 13.8889 3.9055 13.8889 3.58333C13.8889 3.26117 14.1501 3 14.4722 3C15.8683 3 17 4.13172 17 5.52778C17 5.84994 16.7388 6.11111 16.4167 6.11111C16.0945 6.11111 15.8333 5.84994 15.8333 5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667ZM5.52778 3C5.84994 3 6.11111 3.26117 6.11111 3.58333C6.11111 3.9055 5.84994 4.16667 5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778C4.16667 5.84994 3.9055 6.11111 3.58333 6.11111C3.26117 6.11111 3 5.84994 3 5.52778C3 4.13172 4.13172 3 5.52778 3ZM3.58333 13.8889C3.26117 13.8889 3 14.1501 3 14.4722C3 15.8683 4.13172 17 5.52778 17C5.84994 17 6.11111 16.7388 6.11111 16.4167C6.11111 16.0945 5.84994 15.8333 5.52778 15.8333C4.77606 15.8333 4.16667 15.2239 4.16667 14.4722C4.16667 14.1501 3.9055 13.8889 3.58333 13.8889ZM9.02778 15.8333C8.70561 15.8333 8.44444 16.0945 8.44444 16.4167C8.44444 16.7388 8.70561 17 9.02778 17H10.9722C11.2944 17 11.5556 16.7388 11.5556 16.4167C11.5556 16.0945 11.2944 15.8333 10.9722 15.8333H9.02778ZM14.4722 15.8333C14.1501 15.8333 13.8889 16.0945 13.8889 16.4167C13.8889 16.7388 14.1501 17 14.4722 17C15.8683 17 17 15.8683 17 14.4722C17 14.1501 16.7388 13.8889 16.4167 13.8889C16.0945 13.8889 15.8333 14.1501 15.8333 14.4722C15.8333 15.2239 15.2239 15.8333 14.4722 15.8333ZM16.4167 8.44444C16.7388 8.44444 17 8.70561 17 9.02778V10.9722C17 11.2944 16.7388 11.5556 16.4167 11.5556C16.0945 11.5556 15.8333 11.2944 15.8333 10.9722V9.02778C15.8333 8.70561 16.0945 8.44444 16.4167 8.44444ZM3 10.9722C3 11.2944 3.26117 11.5556 3.58333 11.5556C3.9055 11.5556 4.16667 11.2944 4.16667 10.9722V9.02778C4.16667 8.70561 3.9055 8.44444 3.58333 8.44444C3.26117 8.44444 3 8.70561 3 9.02778V10.9722Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-square-hint-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-square-hint", "wpp-icon-square-hint-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-square-hint-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-square-hint-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSquareHint$1);
      }
      break;
  } });
}

const WppIconSquareHint = WppIconSquareHint$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSquareHint, defineCustomElement };
