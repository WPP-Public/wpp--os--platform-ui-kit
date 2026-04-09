import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentCenter = /*@__PURE__*/ proxyCustomElement(class WppIconTextAlignmentCenter extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-text-alignment-center", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4 4.25C4 3.83579 4.33579 3.5 4.75 3.5H15.25C15.6642 3.5 16 3.83579 16 4.25C16 4.66421 15.6642 5 15.25 5H4.75C4.33579 5 4 4.66421 4 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM6.75 13.5C6.33579 13.5 6 13.8358 6 14.25C6 14.6642 6.33579 15 6.75 15H13.25C13.6642 15 14 14.6642 14 14.25C14 13.8358 13.6642 13.5 13.25 13.5H6.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-center-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-text-alignment-center", "wpp-icon-text-alignment-center-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-text-alignment-center-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-text-alignment-center-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTextAlignmentCenter);
      }
      break;
  } });
}

export { WppIconTextAlignmentCenter as W, defineCustomElement as d };
