import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPending$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPending extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-pending", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.0168 2.67476C10.0591 3.08752 9.7588 3.45642 9.34604 3.49871C6.06366 3.83503 3.50256 6.60937 3.50256 9.98094C3.50256 13.5799 6.4201 16.4974 10.0191 16.4974C13.3902 16.4974 16.1643 13.9369 16.5012 10.6551C16.5435 10.2423 16.9125 9.94206 17.3252 9.98442C17.738 10.0268 18.0383 10.3957 17.9959 10.8085C17.5812 14.8488 14.1686 18 10.0191 18C5.59026 18 2 14.4097 2 9.98094C2 5.83092 5.15187 2.41802 9.19289 2.00397C9.60565 1.96168 9.97454 2.262 10.0168 2.67476ZM11.0389 2.60874C11.1355 2.20521 11.5409 1.95639 11.9444 2.05297C12.3238 2.14378 12.6929 2.26121 13.0496 2.40316C13.4351 2.5566 13.6233 2.9935 13.4698 3.37901C13.3164 3.76452 12.8795 3.95265 12.494 3.79922C12.2037 3.68371 11.9034 3.58816 11.5946 3.51426C11.1911 3.41768 10.9423 3.01226 11.0389 2.60874ZM17.5962 6.94883C17.4427 6.56335 17.0057 6.37529 16.6202 6.52879C16.2348 6.68229 16.0467 7.11922 16.2002 7.50471C16.3158 7.79508 16.4115 8.09555 16.4854 8.40446C16.5821 8.80797 16.9875 9.05675 17.391 8.96013C17.7945 8.8635 18.0433 8.45806 17.9467 8.05455C17.8558 7.67493 17.7382 7.30565 17.5962 6.94883ZM14.3168 3.89632C14.5891 3.5833 15.0637 3.55033 15.3767 3.82269C15.6844 4.09038 15.9717 4.38086 16.236 4.69151C16.5049 5.00753 16.4667 5.48167 16.1507 5.75056C15.8347 6.01944 15.3605 5.98123 15.0916 5.66522C14.8759 5.41173 14.6415 5.17468 14.3904 4.95624C14.0774 4.68389 14.0444 4.20935 14.3168 3.89632ZM10.0193 5.72339C10.0193 5.30847 9.68294 4.97211 9.26802 4.97211C8.85309 4.97211 8.51673 5.30847 8.51673 5.72339V10.7319C8.51673 11.1469 8.85309 11.4832 9.26802 11.4832H12.2731C12.6881 11.4832 13.0244 11.1469 13.0244 10.7319C13.0244 10.317 12.6881 9.98066 12.2731 9.98066H10.0193V5.72339Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pending-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pending", "wpp-icon-pending-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pending-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pending-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPending$1);
      }
      break;
  } });
}

const WppIconPending = WppIconPending$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPending, defineCustomElement };
