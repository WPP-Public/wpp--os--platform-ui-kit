import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNeutralTrading$1 = /*@__PURE__*/ proxyCustomElement(class WppIconNeutralTrading extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-neutral-trading", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M13.428 2.59467C13.7209 2.30178 14.1958 2.30178 14.4887 2.59467L16.9887 5.09467C17.2816 5.38756 17.2816 5.86244 16.9887 6.15533L14.4887 8.65533C14.1958 8.94822 13.7209 8.94822 13.428 8.65533C13.1351 8.36244 13.1351 7.88756 13.428 7.59467L14.6477 6.375L3.125 6.375C2.71079 6.375 2.375 6.03921 2.375 5.625C2.375 5.21079 2.71079 4.875 3.125 4.875L14.6477 4.875L13.428 3.65533C13.1351 3.36244 13.1351 2.88756 13.428 2.59467ZM3.125 7.375C3.53921 7.375 3.875 7.71079 3.875 8.125V16.875C3.875 17.2892 3.53921 17.625 3.125 17.625C2.71079 17.625 2.375 17.2892 2.375 16.875V8.125C2.375 7.71079 2.71079 7.375 3.125 7.375ZM6.45833 7.375C6.87255 7.375 7.20833 7.71079 7.20833 8.125V16.875C7.20833 17.2892 6.87255 17.625 6.45833 17.625C6.04412 17.625 5.70833 17.2892 5.70833 16.875V8.125C5.70833 7.71079 6.04412 7.375 6.45833 7.375ZM9.79167 7.375C10.2059 7.375 10.5417 7.71079 10.5417 8.125V16.875C10.5417 17.2892 10.2059 17.625 9.79167 17.625C9.37745 17.625 9.04167 17.2892 9.04167 16.875V8.125C9.04167 7.71079 9.37745 7.375 9.79167 7.375ZM16.4583 8.625C16.8725 8.625 17.2083 8.96079 17.2083 9.375V16.875C17.2083 17.2892 16.8725 17.625 16.4583 17.625C16.0441 17.625 15.7083 17.2892 15.7083 16.875V9.375C15.7083 8.96079 16.0441 8.625 16.4583 8.625ZM13.125 9.875C13.5392 9.875 13.875 10.2108 13.875 10.625V16.875C13.875 17.2892 13.5392 17.625 13.125 17.625C12.7108 17.625 12.375 17.2892 12.375 16.875V10.625C12.375 10.2108 12.7108 9.875 13.125 9.875Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-neutral-trading-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-neutral-trading", "wpp-icon-neutral-trading-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-neutral-trading-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-neutral-trading-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconNeutralTrading$1);
      }
      break;
  } });
}

const WppIconNeutralTrading = WppIconNeutralTrading$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconNeutralTrading, defineCustomElement };
