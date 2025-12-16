import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNextFilled$1 = /*@__PURE__*/ proxyCustomElement(class WppIconNextFilled extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-next-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 4.36337C3 3.26846 4.22712 2.62173 5.13034 3.24061L13.2954 8.83518C14.081 9.3735 14.085 10.5315 13.3032 11.0753L5.13815 16.754C4.23572 17.3816 3 16.7358 3 15.6366V4.36337ZM16.9992 3.5833C16.9992 3.26115 16.738 3 16.4159 3C16.0937 3 15.8325 3.26115 15.8325 3.5833V16.4159C15.8325 16.7381 16.0937 16.9992 16.4159 16.9992C16.738 16.9992 16.9992 16.7381 16.9992 16.4159V3.5833Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-next-filled-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-next-filled", "wpp-icon-next-filled-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-next-filled-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-next-filled-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconNextFilled$1);
      }
      break;
  } });
}

const WppIconNextFilled = WppIconNextFilled$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconNextFilled, defineCustomElement };
