import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDrag = /*@__PURE__*/ proxyCustomElement(class WppIconDrag extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-drag", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.5 16C8.5 14.8954 7.60457 14 6.5 14C5.39543 14 4.5 14.8954 4.5 16C4.5 17.1046 5.39543 18 6.5 18C7.60457 18 8.5 17.1046 8.5 16ZM8.5 10C8.5 8.89543 7.60457 8 6.5 8C5.39543 8 4.5 8.89543 4.5 10C4.5 11.1046 5.39543 12 6.5 12C7.60457 12 8.5 11.1046 8.5 10ZM6.5 2C7.60457 2 8.5 2.89543 8.5 4C8.5 5.10457 7.60457 6 6.5 6C5.39543 6 4.5 5.10457 4.5 4C4.5 2.89543 5.39543 2 6.5 2ZM15.5 16C15.5 14.8954 14.6046 14 13.5 14C12.3954 14 11.5 14.8954 11.5 16C11.5 17.1046 12.3954 18 13.5 18C14.6046 18 15.5 17.1046 15.5 16ZM15.5 10C15.5 8.89543 14.6046 8 13.5 8C12.3954 8 11.5 8.89543 11.5 10C11.5 11.1046 12.3954 12 13.5 12C14.6046 12 15.5 11.1046 15.5 10ZM13.5 2C14.6046 2 15.5 2.89543 15.5 4C15.5 5.10457 14.6046 6 13.5 6C12.3954 6 11.5 5.10457 11.5 4C11.5 2.89543 12.3954 2 13.5 2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-drag-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-drag", "wpp-icon-drag-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-drag-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-drag-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDrag);
      }
      break;
  } });
}

export { WppIconDrag as W, defineCustomElement as d };
