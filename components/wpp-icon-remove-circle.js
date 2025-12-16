import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRemoveCircle$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRemoveCircle extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-remove-circle", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.04163 10.0001C3.04163 6.1571 6.15698 3.04175 9.99996 3.04175C13.8429 3.04175 16.9583 6.1571 16.9583 10.0001C16.9583 13.8431 13.8429 16.9584 9.99996 16.9584C6.15698 16.9584 3.04163 13.8431 3.04163 10.0001ZM9.99996 1.54175C5.32855 1.54175 1.54163 5.32867 1.54163 10.0001C1.54163 14.6715 5.32855 18.4584 9.99996 18.4584C14.6714 18.4584 18.4583 14.6715 18.4583 10.0001C18.4583 5.32867 14.6714 1.54175 9.99996 1.54175ZM6.45837 9.25C6.04416 9.25 5.70837 9.58579 5.70837 10C5.70837 10.4142 6.04416 10.75 6.45837 10.75H13.5417C13.9559 10.75 14.2917 10.4142 14.2917 10C14.2917 9.58579 13.9559 9.25 13.5417 9.25H6.45837Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-remove-circle-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-remove-circle", "wpp-icon-remove-circle-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-remove-circle-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-remove-circle-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRemoveCircle$1);
      }
      break;
  } });
}

const WppIconRemoveCircle = WppIconRemoveCircle$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRemoveCircle, defineCustomElement };
