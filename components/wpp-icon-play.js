import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPlay$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPlay extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-play", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.5 15.9991C5.5 16.1906 5.70646 16.311 5.87311 16.2167L16.4757 10.2175C16.6449 10.1218 16.6449 9.8781 16.4757 9.78237L5.87311 3.78326C5.70646 3.68896 5.5 3.80935 5.5 4.00084V15.9991ZM6.23868 2.26663L17.5989 8.69445C18.614 9.2688 18.614 10.7311 17.5989 11.3055L6.23868 17.7333C5.23874 18.2991 4 17.5767 4 16.4278V3.57214C4 2.42323 5.23874 1.70085 6.23868 2.26663Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-play-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-play", "wpp-icon-play-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-play-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-play-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPlay$1);
      }
      break;
  } });
}

const WppIconPlay = WppIconPlay$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPlay, defineCustomElement };
