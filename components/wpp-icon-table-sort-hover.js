import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortHover$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTableSortHover extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-table-sort-hover", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: "#4D5358" }), h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: "#4D5358" })));
  }
  static get registryIs() { return "wpp-icon-table-sort-hover-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-table-sort-hover", "wpp-icon-table-sort-hover-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-table-sort-hover-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-table-sort-hover-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTableSortHover$1);
      }
      break;
  } });
}

const WppIconTableSortHover = WppIconTableSortHover$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTableSortHover, defineCustomElement };
