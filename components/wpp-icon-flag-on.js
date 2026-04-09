import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFlagOn$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFlagOn extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-flag-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 3.59205C3 3.26507 3.26507 3 3.59205 3H16.6203C17.1083 3 17.3867 3.55704 17.094 3.94733L13.8067 8.3294L17.094 12.7115C17.3867 13.1018 17.1083 13.6588 16.6203 13.6588L4.1841 13.6584V17.408C4.1841 17.7077 3.96136 17.9554 3.67239 17.9946L3.59205 18C3.29232 18 3.04461 17.7773 3.0054 17.4883L3 17.408V3.59205ZM15.4361 4.1841H4.1841V12.4747H15.4361L12.5929 8.68468C12.435 8.47415 12.435 8.18465 12.5929 7.97412L15.4361 4.1841Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-flag-on-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-flag-on", "wpp-icon-flag-on-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-flag-on-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-flag-on-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFlagOn$1);
      }
      break;
  } });
}

const WppIconFlagOn = WppIconFlagOn$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFlagOn, defineCustomElement };
