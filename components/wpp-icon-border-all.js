import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBorderAll$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBorderAll extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-border-all", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.25 4.5C5.2835 4.5 4.5 5.2835 4.5 6.25V9.25H9.25V4.5H6.25ZM10.75 4.5V9.25H15.5V6.25C15.5 5.2835 14.7165 4.5 13.75 4.5H10.75ZM15.5 10.75H10.75V15.5H13.75C14.7165 15.5 15.5 14.7165 15.5 13.75V10.75ZM9.25 15.5V10.75H4.5V13.75C4.5 14.7165 5.2835 15.5 6.25 15.5H9.25ZM3 6.25C3 4.45507 4.45507 3 6.25 3H13.75C15.5449 3 17 4.45507 17 6.25V13.75C17 15.5449 15.5449 17 13.75 17H6.25C4.45507 17 3 15.5449 3 13.75V6.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-border-all-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-border-all", "wpp-icon-border-all-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-border-all-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-border-all-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBorderAll$1);
      }
      break;
  } });
}

const WppIconBorderAll = WppIconBorderAll$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBorderAll, defineCustomElement };
