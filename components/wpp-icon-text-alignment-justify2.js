import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentJustify = /*@__PURE__*/ proxyCustomElement(class WppIconTextAlignmentJustify extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-text-alignment-justify", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2 4.25C2 3.83579 2.33579 3.5 2.75 3.5H17.25C17.6642 3.5 18 3.83579 18 4.25C18 4.66421 17.6642 5 17.25 5H2.75C2.33579 5 2 4.66421 2 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM2.75 13.5C2.33579 13.5 2 13.8358 2 14.25C2 14.6642 2.33579 15 2.75 15H17.25C17.6642 15 18 14.6642 18 14.25C18 13.8358 17.6642 13.5 17.25 13.5H2.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-justify-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-text-alignment-justify", "wpp-icon-text-alignment-justify-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-text-alignment-justify-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-text-alignment-justify-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTextAlignmentJustify);
      }
      break;
  } });
}

export { WppIconTextAlignmentJustify as W, defineCustomElement as d };
