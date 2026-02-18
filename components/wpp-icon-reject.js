import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconReject$1 = /*@__PURE__*/ proxyCustomElement(class WppIconReject extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-reject", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.99996 3.04175C6.15698 3.04175 3.04163 6.1571 3.04163 10.0001C3.04163 13.8431 6.15698 16.9584 9.99996 16.9584C13.8429 16.9584 16.9583 13.8431 16.9583 10.0001C16.9583 6.1571 13.8429 3.04175 9.99996 3.04175ZM1.54163 10.0001C1.54163 5.32867 5.32855 1.54175 9.99996 1.54175C14.6714 1.54175 18.4583 5.32867 18.4583 10.0001C18.4583 14.6715 14.6714 18.4584 9.99996 18.4584C5.32855 18.4584 1.54163 14.6715 1.54163 10.0001ZM13.2386 6.76142C13.5315 7.05431 13.5315 7.52918 13.2386 7.82208L11.0606 10.0001L13.2386 12.1781C13.5315 12.471 13.5315 12.9459 13.2386 13.2387C12.9457 13.5316 12.4709 13.5316 12.178 13.2387L9.99996 11.0607L7.82196 13.2387C7.52906 13.5316 7.05419 13.5316 6.7613 13.2387C6.4684 12.9459 6.4684 12.471 6.7613 12.1781L8.9393 10.0001L6.7613 7.82208C6.4684 7.52918 6.4684 7.05431 6.7613 6.76142C7.05419 6.46852 7.52906 6.46852 7.82196 6.76142L9.99996 8.93942L12.178 6.76142C12.4709 6.46852 12.9457 6.46852 13.2386 6.76142Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-reject-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-reject", "wpp-icon-reject-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-reject-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-reject-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconReject$1);
      }
      break;
  } });
}

const WppIconReject = WppIconReject$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconReject, defineCustomElement };
