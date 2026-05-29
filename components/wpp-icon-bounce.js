import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBounce$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBounce extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-bounce", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.75 6C2.33579 6 2 6.33579 2 6.75V13.25C2 13.6642 2.33579 14 2.75 14C3.16421 14 3.5 13.6642 3.5 13.25V8.56066L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L17.7842 8.27642C18.0771 7.98353 18.0771 7.50866 17.7842 7.21576C17.4913 6.92287 17.0165 6.92287 16.7236 7.21576L10.5 13.4393L4.56066 7.5H9.25C9.66421 7.5 10 7.16421 10 6.75C10 6.33579 9.66421 6 9.25 6H2.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bounce-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-bounce", "wpp-icon-bounce-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-bounce-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-bounce-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBounce$1);
      }
      break;
  } });
}

const WppIconBounce = WppIconBounce$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBounce, defineCustomElement };
