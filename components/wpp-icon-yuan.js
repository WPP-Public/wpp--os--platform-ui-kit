import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconYuan$1 = /*@__PURE__*/ proxyCustomElement(class WppIconYuan extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-yuan", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.58405 3.37598C5.9287 3.14622 6.39435 3.23935 6.62412 3.58399L10.0001 8.64793L13.376 3.58399C13.6058 3.23935 14.0715 3.14622 14.4161 3.37598C14.7608 3.60575 14.8539 4.0714 14.6241 4.41604L10.8459 10.0833H13.3334C13.7476 10.0833 14.0834 10.4191 14.0834 10.8333C14.0834 11.2476 13.7476 11.5833 13.3334 11.5833H10.7501L10.7501 16C10.7501 16.4142 10.4143 16.75 10.0001 16.75C9.58586 16.75 9.25007 16.4142 9.25007 16L9.25007 11.5833H6.66674C6.25253 11.5833 5.91674 11.2476 5.91674 10.8333C5.91674 10.4191 6.25253 10.0833 6.66674 10.0833H9.15424L5.37604 4.41604C5.14628 4.0714 5.23941 3.60575 5.58405 3.37598Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-yuan-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-yuan", "wpp-icon-yuan-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-yuan-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-yuan-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconYuan$1);
      }
      break;
  } });
}

const WppIconYuan = WppIconYuan$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconYuan, defineCustomElement };
