import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSad$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSad extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-sad", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3.19981C6.24436 3.19981 3.19981 6.24436 3.19981 10C3.19981 13.7556 6.24436 16.8002 10 16.8002C13.7556 16.8002 16.8002 13.7556 16.8002 10C16.8002 6.24436 13.7556 3.19981 10 3.19981ZM10 11.1978C11.3048 11.1978 12.5279 11.7216 13.4243 12.6339C13.6565 12.8703 13.6532 13.2501 13.4169 13.4823C13.1805 13.7145 12.8007 13.7112 12.5685 13.4748C11.8954 12.7898 10.9796 12.3976 10 12.3976C9.01824 12.3976 8.10057 12.7916 7.42718 13.4793C7.19537 13.716 6.81555 13.72 6.57883 13.4881C6.34211 13.2563 6.33812 12.8765 6.56993 12.6398C7.46676 11.724 8.69233 11.1978 10 11.1978ZM7.60073 7.40092C8.15262 7.40092 8.60001 7.84831 8.60001 8.40019C8.60001 8.95208 8.15262 9.39947 7.60073 9.39947C7.04885 9.39947 6.60145 8.95208 6.60145 8.40019C6.60145 7.84831 7.04885 7.40092 7.60073 7.40092ZM12.4 7.40092C12.9519 7.40092 13.3993 7.84831 13.3993 8.40019C13.3993 8.95208 12.9519 9.39947 12.4 9.39947C11.8481 9.39947 11.4007 8.95208 11.4007 8.40019C11.4007 7.84831 11.8481 7.40092 12.4 7.40092Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-sad-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-sad", "wpp-icon-sad-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-sad-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-sad-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSad$1);
      }
      break;
  } });
}

const WppIconSad = WppIconSad$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSad, defineCustomElement };
