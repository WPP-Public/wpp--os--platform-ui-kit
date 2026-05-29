import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCta$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCta extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-cta", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7 11C7.55228 11 8 10.5523 8 10C8 9.44772 7.55228 9 7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11Z", fill: "currentColor" }), h("path", { d: "M11 10C11 10.5523 10.5523 11 10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10Z", fill: "currentColor" }), h("path", { d: "M13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15 5H5C3.34315 5 2 6.34315 2 8V12C2 13.6569 3.34315 15 5 15H15C16.6569 15 18 13.6569 18 12V8C18 6.34315 16.6569 5 15 5ZM3.5 8C3.5 7.17157 4.17157 6.5 5 6.5H15C15.8284 6.5 16.5 7.17157 16.5 8V12C16.5 12.8284 15.8284 13.5 15 13.5H5C4.17157 13.5 3.5 12.8284 3.5 12V8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cta-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-cta", "wpp-icon-cta-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-cta-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-cta-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCta$1);
      }
      break;
  } });
}

const WppIconCta = WppIconCta$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCta, defineCustomElement };
