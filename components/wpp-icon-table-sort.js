import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSort$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTableSort extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-table-sort", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: "currentColor" }), h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-table-sort-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-table-sort", "wpp-icon-table-sort-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-table-sort-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-table-sort-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTableSort$1);
      }
      break;
  } });
}

const WppIconTableSort = WppIconTableSort$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTableSort, defineCustomElement };
