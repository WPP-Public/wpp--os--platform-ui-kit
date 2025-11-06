import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconService$1 = /*@__PURE__*/ proxyCustomElement(class WppIconService extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-service", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.0604 8.06071C13.7677 8.35343 13.3837 8.5 12.9998 8.5C12.6158 8.5 12.2318 8.35343 11.9391 8.06071C11.3533 7.47529 11.3533 6.52514 11.9391 5.93971L14.882 2.99671C14.2499 2.68171 13.5397 2.5 12.7855 2.5C10.182 2.5 8.0714 4.61071 8.0714 7.21429C8.0714 7.88757 8.21497 8.527 8.46953 9.10643L3.00205 14.5737C2.33265 15.2431 2.33265 16.3287 3.00205 16.9977C3.33718 17.3324 3.77559 17.5 4.21443 17.5C4.65327 17.5 5.09168 17.3324 5.4268 16.9977L10.8939 11.5304C11.4733 11.785 12.1122 11.9286 12.7859 11.9286C15.3894 11.9286 17.5 9.81786 17.5 7.21429C17.5 6.46 17.3183 5.74986 17.0037 5.11771L14.0604 8.06071Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-service-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-service", "wpp-icon-service-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-service-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-service-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconService$1);
      }
      break;
  } });
}

const WppIconService = WppIconService$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconService, defineCustomElement };
