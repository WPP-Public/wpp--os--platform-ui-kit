import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTrendDescent$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTrendDescent extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-trend-descent", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.9887 5.92798C1.69581 5.63509 1.22094 5.63509 0.928044 5.92798C0.635151 6.22088 0.635151 6.69575 0.928044 6.98864L6.76138 12.822C7.05427 13.1149 7.52914 13.1149 7.82204 12.822L12.2917 8.35231L16.7311 12.7917H14.7916C14.3774 12.7917 14.0416 13.1275 14.0416 13.5417C14.0416 13.9559 14.3774 14.2917 14.7916 14.2917H18.5416C18.9558 14.2917 19.2916 13.9559 19.2916 13.5417V9.79169C19.2916 9.37747 18.9558 9.04169 18.5416 9.04169C18.1274 9.04169 17.7916 9.37747 17.7916 9.79169V11.7309L12.822 6.76132C12.5291 6.46842 12.0543 6.46842 11.7614 6.76132L7.29171 11.231L1.9887 5.92798Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-trend-descent-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-trend-descent", "wpp-icon-trend-descent-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-trend-descent-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-trend-descent-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTrendDescent$1);
      }
      break;
  } });
}

const WppIconTrendDescent = WppIconTrendDescent$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTrendDescent, defineCustomElement };
