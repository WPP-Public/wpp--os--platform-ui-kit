import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDarkTheme$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDarkTheme extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-dark-theme", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5V3.5ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-dark-theme-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-dark-theme", "wpp-icon-dark-theme-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-dark-theme-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-dark-theme-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDarkTheme$1);
      }
      break;
  } });
}

const WppIconDarkTheme = WppIconDarkTheme$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDarkTheme, defineCustomElement };
