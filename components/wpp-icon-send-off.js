import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSendOff$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSendOff extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-send-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.6706 10.1631L4.4919 11.1929C4.34718 11.217 4.22636 11.3165 4.17504 11.454L2.04368 17.162C1.83966 17.6866 2.38887 18.1871 2.89233 17.9353L17.6599 10.5516C18.1134 10.3248 18.1134 9.67761 17.6599 9.45086L2.89233 2.06709C2.38887 1.81536 1.83966 2.31585 2.04368 2.84046L4.17504 8.54843C4.22636 8.68588 4.34718 8.78545 4.4919 8.80956L10.6706 9.83936C10.76 9.85426 10.8204 9.9388 10.8055 10.0282C10.794 10.0973 10.7398 10.1515 10.6706 10.1631Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-send-off-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-send-off", "wpp-icon-send-off-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-send-off-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-send-off-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSendOff$1);
      }
      break;
  } });
}

const WppIconSendOff = WppIconSendOff$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSendOff, defineCustomElement };
