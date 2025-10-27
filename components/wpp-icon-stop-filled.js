import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStopFilled$1 = /*@__PURE__*/ proxyCustomElement(class WppIconStopFilled extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-stop-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 4.36111C3 3.60939 3.60939 3 4.36111 3H15.6389C16.3906 3 17 3.60939 17 4.36111V15.6389C17 16.3906 16.3906 17 15.6389 17H4.36111C3.60939 17 3 16.3906 3 15.6389V4.36111Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-filled-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-stop-filled", "wpp-icon-stop-filled-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-stop-filled-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-stop-filled-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconStopFilled$1);
      }
      break;
  } });
}

const WppIconStopFilled = WppIconStopFilled$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconStopFilled, defineCustomElement };
