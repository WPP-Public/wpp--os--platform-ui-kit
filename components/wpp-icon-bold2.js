import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBold = /*@__PURE__*/ proxyCustomElement(class WppIconBold extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-bold", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.5 4.25C5.5 3.55964 6.05964 3 6.75 3H10.2512C12.654 3 14.25 4.98768 14.25 7C14.25 7.87176 13.9504 8.73837 13.4157 9.44091C14.3205 10.1431 14.9974 11.242 14.9974 12.75C14.9974 15.6133 12.5599 16.9955 10.7531 16.9955H6.75C6.05964 16.9955 5.5 16.4358 5.5 15.7455V4.25ZM8 11V14.4955H10.7531C11.5641 14.4955 12.4974 13.8768 12.4974 12.75C12.4974 11.6212 11.5598 11 10.7531 11H8ZM8 8.5H10.2478C11.1296 8.5 11.75 7.77853 11.75 7C11.75 6.22003 11.1295 5.5 10.2512 5.5H8V8.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bold-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-bold", "wpp-icon-bold-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-bold-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-bold-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBold);
      }
      break;
  } });
}

export { WppIconBold as W, defineCustomElement as d };
