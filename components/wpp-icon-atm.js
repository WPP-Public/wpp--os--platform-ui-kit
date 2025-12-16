import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAtm$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAtm extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-atm", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.75 3.5C2.50736 3.5 1.5 4.50736 1.5 5.75V12.25C1.5 13.4926 2.50736 14.5 3.75 14.5H14.25C15.4926 14.5 16.5 13.4926 16.5 12.25V5.75C16.5 4.50736 15.4926 3.5 14.25 3.5H3.75ZM3 5.75C3 5.33579 3.33579 5 3.75 5H14.25C14.6642 5 15 5.33579 15 5.75V6.5H3V5.75ZM3 8H15V12.25C15 12.6642 14.6642 13 14.25 13H3.75C3.33579 13 3 12.6642 3 12.25V8ZM5.99997 16.75C4.9962 16.75 4.10758 16.257 3.56299 15.5H14.5C16.1568 15.5 17.5 14.1568 17.5 12.5V5.56299C18.257 6.10758 18.75 6.9962 18.75 7.99997V12.75C18.75 14.9591 16.9591 16.75 14.75 16.75H5.99997ZM10.75 10.5C10.3358 10.5 10 10.8358 10 11.25C10 11.6642 10.3358 12 10.75 12H13.25C13.6642 12 14 11.6642 14 11.25C14 10.8358 13.6642 10.5 13.25 10.5H10.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-atm-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-atm", "wpp-icon-atm-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-atm-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-atm-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAtm$1);
      }
      break;
  } });
}

const WppIconAtm = WppIconAtm$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAtm, defineCustomElement };
