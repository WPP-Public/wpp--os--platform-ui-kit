import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFavourites$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFavourites extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-favourites", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.10433 2.89893C9.47114 2.15568 10.531 2.15568 10.8978 2.89893L12.8282 6.81042L17.1448 7.43766C17.9651 7.55685 18.2926 8.56482 17.699 9.14335L14.5755 12.188L15.3129 16.4872C15.453 17.3041 14.5956 17.927 13.8619 17.5414L10.0011 15.5116L6.14018 17.5414C5.40655 17.9271 4.54913 17.3041 4.68924 16.4872L5.4266 12.188L2.30308 9.14335C1.70956 8.56482 2.03708 7.55685 2.8573 7.43766L7.17389 6.81042L9.10433 2.89893ZM10.0011 3.34149L8.07062 7.25299C7.92496 7.54813 7.6434 7.7527 7.31769 7.80003L3.00109 8.42727L6.12461 11.4719C6.3603 11.7017 6.46784 12.0327 6.41221 12.3571L5.67484 16.6562L9.53572 14.6264C9.82705 14.4733 10.1751 14.4733 10.4664 14.6264L14.3273 16.6562L13.5899 12.3571C13.5343 12.0327 13.6418 11.7017 13.8775 11.4719L17.001 8.42727L12.6844 7.80003C12.3587 7.7527 12.0772 7.54813 11.9315 7.25299L10.0011 3.34149Z", fill: "currentColor", stroke: "currentColor", "stroke-width": "0.3" })));
  }
  static get registryIs() { return "wpp-icon-favourites-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-favourites", "wpp-icon-favourites-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-favourites-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-favourites-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFavourites$1);
      }
      break;
  } });
}

const WppIconFavourites = WppIconFavourites$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFavourites, defineCustomElement };
