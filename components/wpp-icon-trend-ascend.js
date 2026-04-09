import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTrendAscend$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTrendAscend extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-trend-ascend", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.7916 5.70831C14.3774 5.70831 14.0416 6.0441 14.0416 6.45831C14.0416 6.87253 14.3774 7.20831 14.7916 7.20831H16.7311L12.2917 11.6477L7.82204 7.17802C7.52914 6.88513 7.05427 6.88513 6.76138 7.17802L0.928044 13.0114C0.635151 13.3042 0.635151 13.7791 0.928044 14.072C1.22094 14.3649 1.69581 14.3649 1.9887 14.072L7.29171 8.76901L11.7614 13.2387C12.0543 13.5316 12.5291 13.5316 12.822 13.2387L17.7916 8.26909V10.2083C17.7916 10.6225 18.1274 10.9583 18.5416 10.9583C18.9558 10.9583 19.2916 10.6225 19.2916 10.2083V6.45831C19.2916 6.0441 18.9558 5.70831 18.5416 5.70831H14.7916Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-trend-ascend-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-trend-ascend", "wpp-icon-trend-ascend-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-trend-ascend-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-trend-ascend-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTrendAscend$1);
      }
      break;
  } });
}

const WppIconTrendAscend = WppIconTrendAscend$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTrendAscend, defineCustomElement };
