import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconShieldCheckmark$1 = /*@__PURE__*/ proxyCustomElement(class WppIconShieldCheckmark extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-shield-checkmark component is deprecated. Please, use wpp-icon-shield-success instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-shield-checkmark", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.8055 7.8423C14.0498 7.61838 14.0663 7.23884 13.8423 6.99457C13.6184 6.7503 13.2389 6.7338 12.9946 6.95771L8.61809 10.9695L7.02431 9.37574C6.79 9.14143 6.4101 9.14143 6.17578 9.37574C5.94147 9.61005 5.94147 9.98995 6.17578 10.2243L8.17578 12.2243C8.40293 12.4514 8.76868 12.4594 9.00548 12.2423L13.8055 7.8423ZM16.6 4.4C14.4693 4.4 12.3937 3.64522 10.36 2.12C10.1467 1.96 9.85338 1.96 9.64005 2.12C7.60642 3.64522 5.53078 4.4 3.40005 4.4C3.06868 4.4 2.80005 4.66863 2.80005 5V9.2C2.80005 13.201 5.1661 16.1406 9.78013 17.9582C9.92146 18.0139 10.0786 18.0139 10.22 17.9582C14.834 16.1406 17.2 13.201 17.2 9.2V5C17.2 4.66863 16.9314 4.4 16.6 4.4ZM4.00005 5.58234C6.06193 5.46068 8.06472 4.71063 10 3.34225C11.9354 4.71063 13.9382 5.46068 16 5.58234V9.2C16 12.6045 14.0374 15.1031 10 16.7535C5.96274 15.1031 4.00005 12.6045 4.00005 9.2V5.58234Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-shield-checkmark-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-shield-checkmark", "wpp-icon-shield-checkmark-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-shield-checkmark-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-shield-checkmark-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconShieldCheckmark$1);
      }
      break;
  } });
}

const WppIconShieldCheckmark = WppIconShieldCheckmark$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconShieldCheckmark, defineCustomElement };
