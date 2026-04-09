import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPauseFilled = /*@__PURE__*/ proxyCustomElement(class WppIconPauseFilled extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-pause-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.375 2.5C3.33945 2.5 2.5 3.33948 2.5 4.375V15.625C2.5 16.6605 3.33945 17.5 4.375 17.5H6.25C7.28555 17.5 8.125 16.6605 8.125 15.625V4.375C8.125 3.33948 7.28555 2.5 6.25 2.5H4.375ZM13.75 2.5C12.7145 2.5 11.875 3.33948 11.875 4.375V15.625C11.875 16.6605 12.7145 17.5 13.75 17.5H15.625C16.6605 17.5 17.5 16.6605 17.5 15.625V4.375C17.5 3.33948 16.6605 2.5 15.625 2.5H13.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pause-filled-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pause-filled", "wpp-icon-pause-filled-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pause-filled-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pause-filled-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPauseFilled);
      }
      break;
  } });
}

export { WppIconPauseFilled as W, defineCustomElement as d };
