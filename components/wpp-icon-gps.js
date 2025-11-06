import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconGps$1 = /*@__PURE__*/ proxyCustomElement(class WppIconGps extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-gps", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2C10.3038 2 10.5548 2.22572 10.5945 2.51858L10.6 2.6L10.5993 4.03017C13.4343 4.31006 15.6899 6.56575 15.9706 9.40203L16 9.4H17.4C17.7314 9.4 18 9.66863 18 10C18 10.3038 17.7743 10.5548 17.4814 10.5945L17.4 10.6L15.9693 10.5992C15.6899 13.4343 13.4343 15.6899 10.598 15.9706L10.6 16V17.4C10.6 17.7314 10.3314 18 10 18C9.69624 18 9.44521 17.7743 9.40548 17.4814L9.4 17.4L9.40077 15.9693C6.56575 15.6899 4.31006 13.4343 4.02942 10.598L4 10.6H2.6C2.26863 10.6 2 10.3314 2 10C2 9.69624 2.22572 9.44521 2.51858 9.40548L2.6 9.4L4.03017 9.40075C4.31006 6.56575 6.56575 4.31006 9.40203 4.02942L9.4 4V2.6C9.4 2.26863 9.66863 2 10 2ZM10 5.2C7.34903 5.2 5.2 7.34903 5.2 10C5.2 12.651 7.34903 14.8 10 14.8C12.651 14.8 14.8 12.651 14.8 10C14.8 7.34903 12.651 5.2 10 5.2ZM10 6.8C11.7673 6.8 13.2 8.23269 13.2 10C13.2 11.7673 11.7673 13.2 10 13.2C8.23269 13.2 6.8 11.7673 6.8 10C6.8 8.23269 8.23269 6.8 10 6.8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-gps-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-gps", "wpp-icon-gps-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-gps-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-gps-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconGps$1);
      }
      break;
  } });
}

const WppIconGps = WppIconGps$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconGps, defineCustomElement };
