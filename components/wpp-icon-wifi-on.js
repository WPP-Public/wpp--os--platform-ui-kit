import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconWifiOn$1 = /*@__PURE__*/ proxyCustomElement(class WppIconWifiOn extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-wifi-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.5988 9.08517C15.0723 9.55863 15.4821 10.1329 15.7944 10.7435C15.9456 11.039 15.8286 11.4012 15.533 11.5523C15.2375 11.7035 14.8754 11.5864 14.7242 11.2909C14.4675 10.7889 14.1307 10.3171 13.7488 9.93518C11.6951 7.88147 8.36536 7.88147 6.31165 9.93518C5.9127 10.3341 5.58861 10.7827 5.33909 11.276C5.18926 11.5722 4.82767 11.6909 4.53146 11.5411C4.23524 11.3913 4.11657 11.0297 4.2664 10.7335C4.57318 10.1269 4.97231 9.5745 5.46164 9.08517C7.9848 6.56201 12.0756 6.56201 14.5988 9.08517ZM12.9144 11.5445C13.2731 11.9032 13.5682 12.3438 13.7736 12.8125C13.9068 13.1165 13.7683 13.471 13.4643 13.6042C13.1602 13.7375 12.8058 13.599 12.6725 13.2949C12.5258 12.9601 12.3145 12.6447 12.0644 12.3945C10.9402 11.2704 9.1176 11.2704 7.99345 12.3945C7.7446 12.6434 7.54256 12.9465 7.39464 13.2845C7.26157 13.5886 6.90717 13.7273 6.60306 13.5942C6.29895 13.4612 6.16029 13.1068 6.29335 12.8027C6.49967 12.3311 6.78528 11.9027 7.14343 11.5445C8.73704 9.95094 11.3208 9.95094 12.9144 11.5445ZM16.7651 7.1042C17.1731 7.51215 17.5582 7.97823 17.8936 8.46408C18.0821 8.73728 18.0135 9.11161 17.7403 9.30016C17.4671 9.48872 17.0928 9.4201 16.9042 9.1469C16.6093 8.71959 16.2704 8.30955 15.9151 7.95422C12.6453 4.68447 7.34403 4.68447 4.07428 7.95422C3.73619 8.29231 3.40087 8.70232 3.09495 9.1433C2.90574 9.41605 2.53125 9.48376 2.2585 9.29455C1.98576 9.10534 1.91804 8.73084 2.10726 8.4581C2.45199 7.96118 2.83218 7.49629 3.22427 7.1042C6.96347 3.36501 13.0259 3.36501 16.7651 7.1042ZM10.8448 13.6439C11.3143 14.1134 11.3143 14.8747 10.8448 15.3442C10.3753 15.8137 9.61408 15.8137 9.14457 15.3442C8.67506 14.8747 8.67506 14.1134 9.14457 13.6439C9.61408 13.1744 10.3753 13.1744 10.8448 13.6439Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-wifi-on-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-wifi-on", "wpp-icon-wifi-on-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-wifi-on-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-wifi-on-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconWifiOn$1);
      }
      break;
  } });
}

const WppIconWifiOn = WppIconWifiOn$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconWifiOn, defineCustomElement };
