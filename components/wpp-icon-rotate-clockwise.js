import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRotateClockwise$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRotateClockwise extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-rotate-clockwise", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 12.6785 16.6837 15.0485 14.6645 16.5H15.75C16.1642 16.5 16.5 16.8358 16.5 17.25C16.5 17.6642 16.1642 18 15.75 18H12.75C12.3358 18 12 17.6642 12 17.25V14.25C12 13.8358 12.3358 13.5 12.75 13.5C13.1642 13.5 13.5 13.8358 13.5 14.25V15.4784C15.3051 14.3227 16.5 12.3003 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5ZM12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5C11.3807 7.5 12.5 8.61929 12.5 10ZM11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-rotate-clockwise-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-rotate-clockwise", "wpp-icon-rotate-clockwise-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-rotate-clockwise-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-rotate-clockwise-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRotateClockwise$1);
      }
      break;
  } });
}

const WppIconRotateClockwise = WppIconRotateClockwise$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRotateClockwise, defineCustomElement };
