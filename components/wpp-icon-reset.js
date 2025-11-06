import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconReset$1 = /*@__PURE__*/ proxyCustomElement(class WppIconReset extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-reset", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.63599 3C3.63599 2.58579 3.97177 2.25 4.38599 2.25C4.8002 2.25 5.13599 2.58579 5.13599 3V4.00857C6.43569 2.973 8.08159 2.35205 9.875 2.35205C14.0863 2.35205 17.5 5.76575 17.5 9.97705C17.5 14.1883 14.0863 17.6021 9.875 17.6021C5.6637 17.6021 2.25 14.1883 2.25 9.97705C2.25 9.57269 2.29033 9.18683 2.34558 8.82284C2.40773 8.41332 2.7901 8.13172 3.19963 8.19388C3.60915 8.25603 3.89075 8.6384 3.82859 9.04793C3.7805 9.36477 3.75 9.67141 3.75 9.97705C3.75 13.3599 6.49213 16.1021 9.875 16.1021C13.2579 16.1021 16 13.3599 16 9.97705C16 6.59418 13.2579 3.85205 9.875 3.85205C8.44508 3.85205 7.13137 4.34307 6.08945 5.16667H7.30265C7.71687 5.16667 8.05265 5.50245 8.05265 5.91667C8.05265 6.33088 7.71687 6.66667 7.30265 6.66667H4.38599C3.97177 6.66667 3.63599 6.33088 3.63599 5.91667V3Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-reset-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-reset", "wpp-icon-reset-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-reset-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-reset-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconReset$1);
      }
      break;
  } });
}

const WppIconReset = WppIconReset$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconReset, defineCustomElement };
