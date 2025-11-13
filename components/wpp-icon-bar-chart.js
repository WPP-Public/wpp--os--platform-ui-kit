import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBarChart$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBarChart extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-bar-chart", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M13.6209 3.75192C13.6209 2.53104 14.6104 1.5415 15.8313 1.5415C17.0522 1.5415 18.0417 2.53104 18.0417 3.75192V16.2498C18.0417 17.4707 17.0522 18.4603 15.8313 18.4603C14.6104 18.4603 13.6209 17.4707 13.6209 16.2498V3.75192ZM15.8313 3.0415C15.4389 3.0415 15.1209 3.35947 15.1209 3.75192V16.2498C15.1209 16.6423 15.4389 16.9603 15.8313 16.9603C16.2238 16.9603 16.5417 16.6423 16.5417 16.2498V3.75192C16.5417 3.35947 16.2238 3.0415 15.8313 3.0415ZM1.95422 7.504C1.95422 6.28312 2.94376 5.29359 4.16464 5.29359C5.38552 5.29359 6.37506 6.28312 6.37506 7.504V16.2498C6.37506 17.4707 5.38552 18.4603 4.16464 18.4603C2.94376 18.4603 1.95422 17.4707 1.95422 16.2498V7.504ZM4.16464 6.79359C3.77219 6.79359 3.45422 7.11155 3.45422 7.504V16.2498C3.45422 16.6423 3.77219 16.9603 4.16464 16.9603C4.55709 16.9603 4.87506 16.6423 4.87506 16.2498V7.504C4.87506 7.11155 4.55709 6.79359 4.16464 6.79359ZM7.78964 11.2519C7.78964 10.031 8.77918 9.0415 10.0001 9.0415C11.2209 9.0415 12.2105 10.031 12.2105 11.2519V16.2498C12.2105 17.4707 11.2209 18.4603 10.0001 18.4603C8.77918 18.4603 7.78964 17.4707 7.78964 16.2498V11.2519ZM10.0001 10.5415C9.6076 10.5415 9.28964 10.8595 9.28964 11.2519V16.2498C9.28964 16.6423 9.60761 16.9603 10.0001 16.9603C10.3925 16.9603 10.7105 16.6423 10.7105 16.2498V11.2519C10.7105 10.8595 10.3925 10.5415 10.0001 10.5415Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bar-chart-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-bar-chart", "wpp-icon-bar-chart-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-bar-chart-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-bar-chart-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBarChart$1);
      }
      break;
  } });
}

const WppIconBarChart = WppIconBarChart$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBarChart, defineCustomElement };
