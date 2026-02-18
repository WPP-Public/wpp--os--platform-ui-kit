import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSpeakerBluetooth$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSpeakerBluetooth extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-speaker-bluetooth", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.1633 3.1538C12.3161 3.33437 12.4 3.56327 12.4 3.79983V16.2011C12.4 16.7534 11.9523 17.2011 11.4 17.2011C11.1634 17.2011 10.9344 17.1172 10.7538 16.9643L6.7801 13.5997H3.8C2.80589 13.5997 2 12.7938 2 11.7997V8.19968C2 7.20557 2.80589 6.39969 3.8 6.39969H6.78018L10.754 3.03651C11.1755 2.67972 11.8065 2.73223 12.1633 3.1538ZM11.2 4.23111L7.21982 7.59969H3.8C3.46863 7.59969 3.2 7.86831 3.2 8.19968V11.7997C3.2 12.1311 3.46863 12.3997 3.8 12.3997H7.21989L11.2 15.7697V4.23111ZM14.4 8.31626V5.79969C14.4 5.28225 15.0017 5.01976 15.38 5.33481L15.4409 5.39272L17.8409 7.99272C18.0543 8.22397 18.0504 8.5759 17.845 8.80223L17.7841 8.86065L16.4177 9.99909L17.7843 11.1389C18.0259 11.3404 18.0677 11.6896 17.8938 11.9407L17.841 12.0066L15.441 14.6077C15.09 14.9881 14.4697 14.7729 14.4054 14.2847L14.4 14.2009V11.6802L14.1867 11.8579C13.9321 12.07 13.5538 12.0356 13.3417 11.781C13.1489 11.5495 13.1598 11.2158 13.3546 10.9977L13.4186 10.9359L14.4 10.1183V9.87885L13.4184 9.06012C13.1639 8.84787 13.1296 8.46952 13.3419 8.21504C13.5348 7.9837 13.8651 7.93437 14.1147 8.08678L14.187 8.13857L14.4 8.31626V5.79969V8.31626ZM15.6 10.8797V12.6658L16.5313 11.6564L15.6 10.8797ZM15.6 7.33428V9.11844L16.5309 8.3428L15.6 7.33428Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-speaker-bluetooth-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-speaker-bluetooth", "wpp-icon-speaker-bluetooth-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-speaker-bluetooth-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-speaker-bluetooth-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSpeakerBluetooth$1);
      }
      break;
  } });
}

const WppIconSpeakerBluetooth = WppIconSpeakerBluetooth$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSpeakerBluetooth, defineCustomElement };
