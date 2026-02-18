import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentJustifyLow$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTextAlignmentJustifyLow extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-text-alignment-justify-low", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9 4.5C9 4.08579 9.33579 3.75 9.75 3.75H17.25C17.6642 3.75 18 4.08579 18 4.5C18 4.91421 17.6642 5.25 17.25 5.25H9.75C9.33579 5.25 9 4.91421 9 4.5ZM9 9.5C9 9.08579 9.33579 8.75 9.75 8.75H17.25C17.6642 8.75 18 9.08579 18 9.5C18 9.91421 17.6642 10.25 17.25 10.25H9.75C9.33579 10.25 9 9.91421 9 9.5ZM2.75 13.75C2.33579 13.75 2 14.0858 2 14.5C2 14.9142 2.33579 15.25 2.75 15.25H17.25C17.6642 15.25 18 14.9142 18 14.5C18 14.0858 17.6642 13.75 17.25 13.75H2.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-justify-low-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-text-alignment-justify-low", "wpp-icon-text-alignment-justify-low-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-text-alignment-justify-low-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-text-alignment-justify-low-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTextAlignmentJustifyLow$1);
      }
      break;
  } });
}

const WppIconTextAlignmentJustifyLow = WppIconTextAlignmentJustifyLow$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTextAlignmentJustifyLow, defineCustomElement };
