import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTarget$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTarget extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-target", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.99817 11.5001C10.8266 11.5001 11.4982 10.8285 11.4982 10.0001C11.4982 9.17169 10.8266 8.50012 9.99817 8.50012C9.16974 8.50012 8.49817 9.17169 8.49817 10.0001C8.49817 10.8285 9.16974 11.5001 9.99817 11.5001ZM4.99817 10.0001C4.99817 7.23867 7.23675 5.00009 9.99817 5.00009C12.7596 5.00009 14.9982 7.23867 14.9982 10.0001C14.9982 12.7615 12.7596 15.0001 9.99817 15.0001C7.23675 15.0001 4.99817 12.7615 4.99817 10.0001ZM9.99817 6.50009C8.06517 6.50009 6.49817 8.06709 6.49817 10.0001C6.49817 11.9331 8.06517 13.5001 9.99817 13.5001C11.9312 13.5001 13.4982 11.9331 13.4982 10.0001C13.4982 8.06709 11.9312 6.50009 9.99817 6.50009ZM1.99609 9.9971C1.99609 5.57934 5.57739 1.99805 9.99514 1.99805C14.4129 1.99805 17.9942 5.57934 17.9942 9.9971C17.9942 14.4148 14.4129 17.9961 9.99514 17.9961C5.57739 17.9961 1.99609 14.4148 1.99609 9.9971ZM9.99514 3.49805C6.40582 3.49805 3.49609 6.40777 3.49609 9.9971C3.49609 13.5864 6.40582 16.4961 9.99514 16.4961C13.5845 16.4961 16.4942 13.5864 16.4942 9.9971C16.4942 6.40777 13.5845 3.49805 9.99514 3.49805Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-target-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-target", "wpp-icon-target-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-target-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-target-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTarget$1);
      }
      break;
  } });
}

const WppIconTarget = WppIconTarget$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTarget, defineCustomElement };
