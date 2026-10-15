import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFacebook$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFacebook extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-facebook", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 1.66699C14.6023 1.66699 18.3338 5.39778 18.334 10L18.3232 10.4287C18.1001 14.8318 14.4586 18.334 10 18.334L9.57129 18.3232C5.16841 18.1 1.66718 14.4583 1.66699 10C1.66717 5.39789 5.39789 1.66717 10 1.66699ZM10 3.16699C6.22631 3.16717 3.16717 6.22631 3.16699 10C3.16716 13.2832 5.48319 16.024 8.57031 16.6816V12.1064H6.66699V10.1758H8.57031V8.89258C8.57031 6.7668 9.65556 5.83301 11.5068 5.83301C12.3929 5.83301 12.862 5.8962 13.084 5.9248V7.6084H11.8213C11.0359 7.60862 10.7618 8.31961 10.7617 9.12109V10.1758H13.0645L12.752 12.1064H10.7617V16.7891C14.177 16.4101 16.8338 13.5162 16.834 10C16.8338 6.2262 13.7738 3.16699 10 3.16699Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-facebook-v4-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-facebook", "wpp-icon-facebook-v4-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-facebook-v4-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-facebook-v4-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFacebook$1);
      }
      break;
  } });
}

const WppIconFacebook = WppIconFacebook$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFacebook, defineCustomElement };
