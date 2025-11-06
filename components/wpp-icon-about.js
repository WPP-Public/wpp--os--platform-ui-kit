import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAbout$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAbout extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-about", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.54166 10.0001C1.54166 5.32878 5.3287 1.54175 9.99999 1.54175C14.6713 1.54175 18.4583 5.32878 18.4583 10.0001C18.4583 14.6714 14.6713 18.4584 9.99999 18.4584C8.61984 18.4584 7.31813 18.1249 6.16771 17.5382L3.02322 18.4157L3.02283 18.4158C2.14691 18.6604 1.34089 17.8534 1.58556 16.9783L1.58565 16.978L1.58569 16.9779L2.46345 13.8353C1.87595 12.6841 1.54166 11.3812 1.54166 10.0001ZM9.99999 3.04175C6.15712 3.04175 3.04166 6.15721 3.04166 10.0001C3.04166 11.2284 3.36249 12.3798 3.92165 13.3822C4.01802 13.555 4.04223 13.7588 3.98901 13.9493L3.18942 16.812L6.05382 16.0127C6.24423 15.9595 6.44793 15.9837 6.6206 16.08C7.62212 16.6383 8.77233 16.9584 9.99999 16.9584C13.8429 16.9584 16.9583 13.843 16.9583 10.0001C16.9583 6.15721 13.8429 3.04175 9.99999 3.04175ZM9.99996 14.5834C10.4602 14.5834 10.8333 14.2103 10.8333 13.7501C10.8333 13.2898 10.4602 12.9167 9.99996 12.9167C9.53972 12.9167 9.16663 13.2898 9.16663 13.7501C9.16663 14.2103 9.53972 14.5834 9.99996 14.5834ZM10.75 6.04175C10.75 5.62753 10.4142 5.29175 10 5.29175C9.58579 5.29175 9.25 5.62753 9.25 6.04175V11.0417C9.25 11.456 9.58579 11.7917 10 11.7917C10.4142 11.7917 10.75 11.456 10.75 11.0417V6.04175Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-about-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-about", "wpp-icon-about-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-about-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-about-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAbout$1);
      }
      break;
  } });
}

const WppIconAbout = WppIconAbout$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAbout, defineCustomElement };
