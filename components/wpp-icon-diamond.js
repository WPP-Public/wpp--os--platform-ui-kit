import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDiamond$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDiamond extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-diamond", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.52712 11.2726C1.82429 10.5698 1.82429 9.43024 2.52712 8.72741L8.72741 2.52712C9.43024 1.82429 10.5698 1.82429 11.2726 2.52712L17.4729 8.72741C18.1757 9.43024 18.1757 10.5698 17.4729 11.2726L11.2726 17.4729C10.5698 18.1757 9.43024 18.1757 8.72741 17.4729L2.52712 11.2726ZM3.37551 9.5758C3.14124 9.81008 3.14124 10.1899 3.37551 10.4242L9.5758 16.6245C9.81008 16.8588 10.1899 16.8588 10.4242 16.6245L16.6245 10.4242C16.8588 10.1899 16.8588 9.81008 16.6245 9.5758L10.4242 3.37551C10.1899 3.14124 9.81008 3.14124 9.5758 3.37551L3.37551 9.5758Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-diamond-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-diamond", "wpp-icon-diamond-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-diamond-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-diamond-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDiamond$1);
      }
      break;
  } });
}

const WppIconDiamond = WppIconDiamond$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDiamond, defineCustomElement };
