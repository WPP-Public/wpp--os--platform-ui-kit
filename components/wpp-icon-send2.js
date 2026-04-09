import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSend = /*@__PURE__*/ proxyCustomElement(class WppIconSend extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-send", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.82799 10L2.04367 2.84033C1.84989 2.34203 2.33578 1.86549 2.81645 2.03488L2.8922 2.06708L17.6575 9.44973C18.0826 9.66228 18.1092 10.2443 17.7372 10.503L17.6575 10.5503L2.8922 17.9329C2.41398 18.172 1.89449 17.7324 2.01862 17.2381L2.04367 17.1597L4.82799 10L2.04367 2.84033L4.82799 10ZM3.76856 3.88094L5.9087 9.38429L11.3453 9.38478C11.6567 9.38478 11.9141 9.61623 11.9549 9.91652L11.9605 10C11.9605 10.3115 11.729 10.5689 11.4287 10.6096L11.3453 10.6152L5.9087 10.6147L3.76856 16.1191L16.0067 10L3.76856 3.88094Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-send-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-send", "wpp-icon-send-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-send-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-send-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSend);
      }
      break;
  } });
}

export { WppIconSend as W, defineCustomElement as d };
