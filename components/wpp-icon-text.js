import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconText$1 = /*@__PURE__*/ proxyCustomElement(class WppIconText extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-text", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4 3.75C4 3.33579 4.33579 3 4.75 3H14.75C15.1642 3 15.5 3.33579 15.5 3.75V5.25C15.5 5.66421 15.1642 6 14.75 6C14.3358 6 14 5.66421 14 5.25V4.5H10.5V15.5H11.75C12.1642 15.5 12.5 15.8358 12.5 16.25C12.5 16.6642 12.1642 17 11.75 17H7.75C7.33579 17 7 16.6642 7 16.25C7 15.8358 7.33579 15.5 7.75 15.5H9V4.5H5.5V5.25C5.5 5.66421 5.16421 6 4.75 6C4.33579 6 4 5.66421 4 5.25V3.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-text", "wpp-icon-text-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-text-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-text-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconText$1);
      }
      break;
  } });
}

const WppIconText = WppIconText$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconText, defineCustomElement };
