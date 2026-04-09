import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNeutral$1 = /*@__PURE__*/ proxyCustomElement(class WppIconNeutral extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-neutral", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.60041 7.40098C8.15238 7.40098 8.59984 7.84844 8.59984 8.40041C8.59984 8.95238 8.15238 9.39984 7.60041 9.39984C7.04844 9.39984 6.60098 8.95238 6.60098 8.40041C6.60098 7.84844 7.04844 7.40098 7.60041 7.40098ZM12.4004 7.40098C12.9524 7.40098 13.3998 7.84844 13.3998 8.40041C13.3998 8.95238 12.9524 9.39984 12.4004 9.39984C11.8484 9.39984 11.401 8.95238 11.401 8.40041C11.401 7.84844 11.8484 7.40098 12.4004 7.40098ZM7 12.4C6.66863 12.4 6.4 12.6686 6.4 13C6.4 13.3314 6.66863 13.6 7 13.6H13C13.3314 13.6 13.6 13.3314 13.6 13C13.6 12.6686 13.3314 12.4 13 12.4H7ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.7555 16.8 16.8 13.7555 16.8 10C16.8 6.24446 13.7555 3.2 10 3.2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-neutral-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-neutral", "wpp-icon-neutral-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-neutral-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-neutral-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconNeutral$1);
      }
      break;
  } });
}

const WppIconNeutral = WppIconNeutral$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconNeutral, defineCustomElement };
