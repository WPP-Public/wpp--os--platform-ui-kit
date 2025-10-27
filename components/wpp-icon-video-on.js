import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconVideoOn$1 = /*@__PURE__*/ proxyCustomElement(class WppIconVideoOn extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-video-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.4 4C12.8359 4 14 5.16406 14 6.6V6.7384L17.0912 4.884C17.4911 4.64389 18 4.93195 18 5.3984V14.6C18 15.0664 17.4912 15.3544 17.0913 15.1145L14 13.26V13.4C14 14.8359 12.8359 16 11.4 16H4.6C3.16406 16 2 14.8359 2 13.4V6.6C2 5.16406 3.16406 4 4.6 4H11.4ZM11.4 5.2H4.6C3.8268 5.2 3.2 5.8268 3.2 6.6V13.4C3.2 14.1732 3.8268 14.8 4.6 14.8H11.4C12.1732 14.8 12.8 14.1732 12.8 13.4V6.6C12.8 5.8268 12.1732 5.2 11.4 5.2ZM16.8 6.45848L14 8.1396V11.8603L16.8 13.5403V6.45848Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-video-on-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-video-on", "wpp-icon-video-on-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-video-on-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-video-on-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconVideoOn$1);
      }
      break;
  } });
}

const WppIconVideoOn = WppIconVideoOn$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconVideoOn, defineCustomElement };
