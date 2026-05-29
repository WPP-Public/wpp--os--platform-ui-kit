import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconColumnsThree$1 = /*@__PURE__*/ proxyCustomElement(class WppIconColumnsThree extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-columns-three", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 4.75C2 3.23122 3.23122 2 4.75 2H15.25C16.7688 2 18 3.23122 18 4.75V15.25C18 16.7688 16.7688 18 15.25 18H4.75C3.23122 18 2 16.7688 2 15.25V4.75ZM8.25 16.5H11.75V3.5H8.25V16.5ZM6.75 3.5V16.5H4.75C4.05964 16.5 3.5 15.9404 3.5 15.25V4.75C3.5 4.05964 4.05964 3.5 4.75 3.5H6.75ZM13.25 3.5V16.5H15.25C15.9404 16.5 16.5 15.9404 16.5 15.25V4.75C16.5 4.05964 15.9404 3.5 15.25 3.5H13.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-columns-three-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-columns-three", "wpp-icon-columns-three-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-columns-three-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-columns-three-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconColumnsThree$1);
      }
      break;
  } });
}

const WppIconColumnsThree = WppIconColumnsThree$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconColumnsThree, defineCustomElement };
