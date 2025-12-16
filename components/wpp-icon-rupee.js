import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRupee$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRupee extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-rupee", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.75002 4.26899C4.75002 3.84429 5.0963 3.5 5.52346 3.5H14.9766C15.4037 3.5 15.75 3.84429 15.75 4.26899C15.75 4.69369 15.4037 5.03797 14.9766 5.03797H11.3627C11.8104 5.58279 12.1116 6.22977 12.2409 6.91772H14.9766C15.4037 6.91772 15.75 7.26201 15.75 7.68671C15.75 8.11141 15.4037 8.4557 14.9766 8.4557H12.2409C12.0859 9.28013 11.6841 10.0457 11.0792 10.6472C10.2895 11.4323 9.21839 11.8734 8.10158 11.8734H7.3907L11.2266 15.6873C11.5286 15.9876 11.5286 16.4745 11.2266 16.7748C10.9246 17.0751 10.4348 17.0751 10.1328 16.7748L4.97656 11.6482C4.75536 11.4283 4.68918 11.0975 4.8089 10.8102C4.92861 10.5228 5.21063 10.3354 5.52346 10.3354H8.10158C8.80813 10.3354 9.48574 10.0564 9.98535 9.55965C10.2979 9.24885 10.5248 8.86876 10.6509 8.4557H5.52346C5.0963 8.4557 4.75002 8.11141 4.75002 7.68671C4.75002 7.26201 5.0963 6.91772 5.52346 6.91772H10.6509C10.5248 6.50465 10.2979 6.12457 9.98535 5.81377C9.48574 5.31704 8.80813 5.03797 8.10158 5.03797H5.52346C5.0963 5.03797 4.75002 4.69369 4.75002 4.26899Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-rupee-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-rupee", "wpp-icon-rupee-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-rupee-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-rupee-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRupee$1);
      }
      break;
  } });
}

const WppIconRupee = WppIconRupee$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRupee, defineCustomElement };
