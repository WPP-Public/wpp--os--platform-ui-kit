import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconClose$1 = /*@__PURE__*/ proxyCustomElement(class WppIconClose extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-cross", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L8.58579 10L4.29289 14.2929C3.90237 14.6834 3.90237 15.3166 4.29289 15.7071C4.68342 16.0976 5.31658 16.0976 5.70711 15.7071L10 11.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.4142 10L15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L10 8.58579L5.70711 4.29289Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-close-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-close", "wpp-icon-close-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-close-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-close-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconClose$1);
      }
      break;
  } });
}

const WppIconClose = WppIconClose$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconClose, defineCustomElement };
