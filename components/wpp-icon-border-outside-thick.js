import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBorderOutsideThick$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBorderOutsideThick extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-border-outside-thick", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 5C5.44772 5 5 5.44772 5 6V14C5 14.5523 5.44772 15 6 15H14C14.5523 15 15 14.5523 15 14V6C15 5.44772 14.5523 5 14 5H6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-border-outside-thick-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-border-outside-thick", "wpp-icon-border-outside-thick-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-border-outside-thick-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-border-outside-thick-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBorderOutsideThick$1);
      }
      break;
  } });
}

const WppIconBorderOutsideThick = WppIconBorderOutsideThick$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBorderOutsideThick, defineCustomElement };
