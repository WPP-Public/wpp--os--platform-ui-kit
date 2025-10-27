import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEvent$1 = /*@__PURE__*/ proxyCustomElement(class WppIconEvent extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-event", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.25 4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H15.5C16.7426 2.25 17.75 3.25736 17.75 4.5V15.5C17.75 16.7426 16.7426 17.75 15.5 17.75H4.5C3.25736 17.75 2.25 16.7426 2.25 15.5V4.5ZM4.5 3.75C4.08579 3.75 3.75 4.08579 3.75 4.5V5.75H16.25V4.5C16.25 4.08579 15.9142 3.75 15.5 3.75H4.5ZM3.75 15.5V7.25H16.25V15.5C16.25 15.9142 15.9142 16.25 15.5 16.25H4.5C4.08579 16.25 3.75 15.9142 3.75 15.5ZM9.89732 14.0505C9.96163 14.0168 10.0384 14.0168 10.1027 14.0505L11.9386 15.0128C12.0993 15.097 12.2874 14.9627 12.2599 14.7835L11.9385 12.6845C11.9279 12.6151 11.9508 12.5448 12.0004 12.495L13.4354 11.0533C13.5629 10.9252 13.4911 10.7064 13.3124 10.6787L11.2257 10.3562C11.1547 10.3452 11.0935 10.3005 11.0615 10.2362L10.198 8.50116C10.1166 8.33767 9.88337 8.33767 9.802 8.50116L8.93851 10.2362C8.90651 10.3005 8.84528 10.3452 8.7743 10.3562L6.68761 10.6787C6.50889 10.7064 6.43707 10.9252 6.56465 11.0533L7.99962 12.495C8.04915 12.5448 8.07211 12.6151 8.06148 12.6845L7.74006 14.7835C7.71261 14.9627 7.90072 15.097 8.06135 15.0128L9.89732 14.0505Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-event-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-event", "wpp-icon-event-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-event-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-event-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEvent$1);
      }
      break;
  } });
}

const WppIconEvent = WppIconEvent$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconEvent, defineCustomElement };
