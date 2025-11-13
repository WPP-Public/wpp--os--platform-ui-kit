import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortAscPressed$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTableSortAscPressed extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-grey-color-600)';
    this.upArrowColor = 'var(--wpp-grey-color-900)';
    this.downArrowColor = 'var(--wpp-grey-color-600)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-table-sort-asc-pressed", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: this.upArrowColor }), h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: this.downArrowColor })));
  }
  static get registryIs() { return "wpp-icon-table-sort-asc-pressed-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-table-sort-asc-pressed", "wpp-icon-table-sort-asc-pressed-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "upArrowColor": [1, "up-arrow-color"],
    "downArrowColor": [1, "down-arrow-color"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-table-sort-asc-pressed-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-table-sort-asc-pressed-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTableSortAscPressed$1);
      }
      break;
  } });
}

const WppIconTableSortAscPressed = WppIconTableSortAscPressed$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTableSortAscPressed, defineCustomElement };
