import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconHome$1 = /*@__PURE__*/ proxyCustomElement(class WppIconHome extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-home", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.54167 17.2917H7.70833C7.93833 17.2917 8.125 17.1051 8.125 16.8751V12.7084C8.125 12.248 8.49792 11.8751 8.95833 11.8751H11.0417C11.5021 11.8751 11.875 12.248 11.875 12.7084V16.8751C11.875 17.1051 12.0617 17.2917 12.2917 17.2917H16.4583C16.6883 17.2917 16.875 17.1051 16.875 16.8751V8.92133C16.875 8.1555 16.5238 7.43175 15.9221 6.95758L10 2.29175L4.07792 6.95758C3.47625 7.43175 3.125 8.1555 3.125 8.92133V16.8751C3.125 17.1051 3.31167 17.2917 3.54167 17.2917Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-home-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-home", "wpp-icon-home-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-home-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-home-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconHome$1);
      }
      break;
  } });
}

const WppIconHome = WppIconHome$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconHome, defineCustomElement };
