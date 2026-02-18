import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNavigationMenu$1 = /*@__PURE__*/ proxyCustomElement(class WppIconNavigationMenu extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-navigation-menu", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.2915 4.375H17.7082", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), h("path", { d: "M2.2915 15.625H17.7082", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), h("path", { d: "M2.2915 10H17.7082", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-navigation-menu-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-navigation-menu", "wpp-icon-navigation-menu-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-navigation-menu-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-navigation-menu-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconNavigationMenu$1);
      }
      break;
  } });
}

const WppIconNavigationMenu = WppIconNavigationMenu$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconNavigationMenu, defineCustomElement };
