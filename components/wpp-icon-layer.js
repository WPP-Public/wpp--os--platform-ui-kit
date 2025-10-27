import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLayer$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLayer extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-layer", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M16.7443 10.2205C16.6196 10.4201 16.4544 10.5912 16.2594 10.7228L11.1754 14.1545C10.4651 14.634 9.53485 14.634 8.82459 14.1545L3.74056 10.7228C3.10107 10.2912 2.85308 9.49653 3.08582 8.79874L8.83462 12.6304C9.49619 13.0714 10.3456 13.099 11.0306 12.7131L11.1653 12.6304L16.9136 8.79831C17.0663 9.25728 17.0207 9.77833 16.7443 10.2205ZM16.9136 11.5294C17.0663 11.9884 17.0207 12.5095 16.7443 12.9517C16.6196 13.1512 16.4544 13.3223 16.2594 13.454L11.1754 16.8857C10.4651 17.3651 9.53485 17.3651 8.82459 16.8857L3.74056 13.454C3.10107 13.0223 2.85308 12.2277 3.08582 11.5299L8.83462 15.3615C9.49619 15.8026 10.3456 15.8301 11.0306 15.4442L11.1653 15.3615L16.9136 11.5294ZM11.1653 2.85284L16.5143 6.41882C16.9005 6.67627 17.0048 7.19801 16.7474 7.58418C16.6858 7.67649 16.6066 7.75571 16.5143 7.81725L11.1653 11.3832C10.4596 11.8537 9.5403 11.8537 8.83462 11.3832L3.48564 7.81725C3.09948 7.55981 2.99513 7.03806 3.25257 6.65189C3.31412 6.55958 3.39333 6.48037 3.48564 6.41882L8.83462 2.85284C9.5403 2.38239 10.4596 2.38239 11.1653 2.85284ZM9.63085 3.8459L9.53383 3.90166L4.70997 7.11804L9.53383 10.3344C9.78474 10.5017 10.1032 10.5203 10.3691 10.3902L10.4661 10.3344L15.2891 7.11804L10.4661 3.90166C10.2152 3.73439 9.89677 3.7158 9.63085 3.8459Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-layer-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-layer", "wpp-icon-layer-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-layer-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-layer-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLayer$1);
      }
      break;
  } });
}

const WppIconLayer = WppIconLayer$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLayer, defineCustomElement };
