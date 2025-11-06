import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconH1 = /*@__PURE__*/ proxyCustomElement(class WppIconH1 extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-h1", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M16.5725 3.82273C16.4981 3.78724 16.417 3.76365 16.3315 3.75441C16.1242 3.7315 15.9234 3.79659 15.771 3.92289C15.6922 3.98821 15.6263 4.0699 15.5792 4.16425C15.5496 4.22325 15.5276 4.28669 15.5143 4.35331C15.2597 5.4912 14.2065 6.96097 12.834 7.876C12.4893 8.10576 12.3962 8.57141 12.626 8.91606C12.8557 9.26071 13.3214 9.35384 13.666 9.12407C14.3432 8.67266 14.9718 8.09961 15.5 7.46852V15.5C15.5 15.9142 15.8358 16.25 16.25 16.25C16.6642 16.25 17 15.9142 17 15.5V4.51556C17.0038 4.34006 16.9455 4.1726 16.8418 4.03924C16.7713 3.94858 16.6798 3.87369 16.5725 3.82273ZM3.5 4.50004C3.5 4.08582 3.16421 3.75004 2.75 3.75004C2.33579 3.75004 2 4.08582 2 4.50004V15.5C2 15.9142 2.33579 16.25 2.75 16.25C3.16421 16.25 3.5 15.9142 3.5 15.5V10.5H8.5V15.5C8.5 15.9142 8.83579 16.25 9.25 16.25C9.66421 16.25 10 15.9142 10 15.5V4.50004C10 4.08582 9.66421 3.75004 9.25 3.75004C8.83579 3.75004 8.5 4.08582 8.5 4.50004V9.00004H3.5V4.50004Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-h1-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-h1", "wpp-icon-h1-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-h1-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-h1-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconH1);
      }
      break;
  } });
}

export { WppIconH1 as W, defineCustomElement as d };
