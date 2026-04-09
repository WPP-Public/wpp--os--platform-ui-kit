import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBusiness$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBusiness extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-business", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 2.5C7.0335 2.5 6.25 3.2835 6.25 4.25V5.25H4.25C3.00736 5.25 2 6.25736 2 7.5V15.5C2 16.7426 3.00736 17.75 4.25 17.75H15.75C16.9926 17.75 18 16.7426 18 15.5V7.5C18 6.25736 16.9926 5.25 15.75 5.25H13.75V4.25C13.75 3.2835 12.9665 2.5 12 2.5H8ZM12.25 5.25V4.25C12.25 4.11193 12.1381 4 12 4H8C7.86193 4 7.75 4.11193 7.75 4.25V5.25H12.25ZM3.5 7.5C3.5 7.08579 3.83579 6.75 4.25 6.75H15.75C16.1642 6.75 16.5 7.08579 16.5 7.5V12H11.75V11.75C11.75 11.4739 11.5261 11.25 11.25 11.25H8.75C8.47386 11.25 8.25 11.4739 8.25 11.75V12H3.5V7.5ZM8.25 13.5H3.5V15.5C3.5 15.9142 3.83579 16.25 4.25 16.25H15.75C16.1642 16.25 16.5 15.9142 16.5 15.5V13.5H11.75V13.75C11.75 14.0261 11.5261 14.25 11.25 14.25H8.75C8.47386 14.25 8.25 14.0261 8.25 13.75V13.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-business-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-business", "wpp-icon-business-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-business-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-business-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBusiness$1);
      }
      break;
  } });
}

const WppIconBusiness = WppIconBusiness$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBusiness, defineCustomElement };
