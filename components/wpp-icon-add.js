import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAdd$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAdd extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-cross", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4V9H4C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H9V16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16V11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H11V4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-add-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-add", "wpp-icon-add-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-add-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-add-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAdd$1);
      }
      break;
  } });
}

const WppIconAdd = WppIconAdd$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAdd, defineCustomElement };
