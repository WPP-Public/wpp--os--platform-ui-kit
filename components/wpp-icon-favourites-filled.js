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
    return (h(WppIcon, { name: "wpp-icon-favourites-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.10433 2.89893C9.47114 2.15568 10.531 2.15568 10.8978 2.89893L12.8282 6.81042L17.1448 7.43766C17.9651 7.55685 18.2926 8.56482 17.699 9.14335L14.5755 12.188L15.3129 16.4872C15.453 17.3041 14.5956 17.927 13.8619 17.5414L10.0011 15.5116L6.14018 17.5414C5.40655 17.9271 4.54913 17.3041 4.68924 16.4872L5.4266 12.188L2.30308 9.14335C1.70956 8.56482 2.03708 7.55685 2.8573 7.43766L7.17389 6.81042L9.10433 2.89893Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-favourites-filled-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-favourites-filled", "wpp-icon-favourites-filled-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-favourites-filled-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-favourites-filled-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFavouritesFilled$1);
      }
      break;
  } });
}

const WppIconFavouritesFilled = WppIconFavouritesFilled$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFavouritesFilled, defineCustomElement };
