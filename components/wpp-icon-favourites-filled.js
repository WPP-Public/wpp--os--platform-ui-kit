import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFavouritesFilled$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFavouritesFilled extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-favourites-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.6921 15.4451C10.5468 15.3689 10.3732 15.3689 10.2279 15.4451L6.07717 17.6208C5.71403 17.8111 5.28875 17.5075 5.35081 17.1022L6.07747 12.3569C6.1015 12.2 6.04959 12.041 5.9376 11.9285L2.69348 8.66928C2.40504 8.3795 2.56742 7.88487 2.97148 7.82242L7.68898 7.09327C7.84945 7.06846 7.98788 6.96728 8.06023 6.82191L10.0124 2.89943C10.1963 2.5298 10.7237 2.5298 10.9076 2.89943L12.8598 6.82191C12.9321 6.96728 13.0706 7.06846 13.231 7.09327L17.9485 7.82242C18.3526 7.88487 18.515 8.3795 18.2265 8.66928L14.9824 11.9285C14.8704 12.041 14.8185 12.2 14.8425 12.3569L15.5692 17.1022C15.6313 17.5075 15.206 17.8111 14.8428 17.6208L10.6921 15.4451Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-favourites-filled-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-favourites-filled", "wpp-icon-favourites-filled-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-favourites-filled-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-favourites-filled-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFavouritesFilled$1);
      }
      break;
  } });
}

const WppIconFavouritesFilled = WppIconFavouritesFilled$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFavouritesFilled, defineCustomElement };
