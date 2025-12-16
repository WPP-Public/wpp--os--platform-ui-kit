import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var MenuDirectionIconPath;
(function (MenuDirectionIconPath) {
  MenuDirectionIconPath["vertical"] = "M10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14ZM10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8ZM12 4C12 2.89543 11.1046 2 10 2C8.89543 2 8 2.89543 8 4C8 5.10457 8.89543 6 10 6C11.1046 6 12 5.10457 12 4Z";
  MenuDirectionIconPath["horizontal"] = "M6 10C6 11.1046 5.10457 12 4 12C2.89543 12 2 11.1046 2 10C2 8.89543 2.89543 8 4 8C5.10457 8 6 8.89543 6 10ZM12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10ZM16 12C17.1046 12 18 11.1046 18 10C18 8.89543 17.1046 8 16 8C14.8954 8 14 8.89543 14 10C14 11.1046 14.8954 12 16 12Z";
})(MenuDirectionIconPath || (MenuDirectionIconPath = {}));
const WppIconMore = /*@__PURE__*/ proxyCustomElement(class WppIconMore extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'horizontal';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-more", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: MenuDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-more-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-more", "wpp-icon-more-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "direction": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-more-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-more-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconMore);
      }
      break;
  } });
}

export { WppIconMore as W, defineCustomElement as d };
