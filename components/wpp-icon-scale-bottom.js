import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const ScaleBottomDirectionIconPath = {
  left: [
    'M3.53022 3.46966C3.82311 3.17677 4.29798 3.17677 4.59088 3.46966L16.5302 15.409C16.8231 15.7019 16.8231 16.1768 16.5302 16.4697C16.2373 16.7625 15.7624 16.7625 15.4696 16.4697L3.53022 4.53032C3.23732 4.23743 3.23732 3.76255 3.53022 3.46966Z',
    'M3.53022 8.8226C3.82311 8.5297 4.29798 8.5297 4.59088 8.8226L11.1773 15.409C11.4702 15.7019 11.4702 16.1768 11.1773 16.4697C10.8844 16.7625 10.4095 16.7625 10.1166 16.4697L3.53022 9.88326C3.23732 9.59036 3.23732 9.11549 3.53022 8.8226Z',
    'M3.53022 14.1755C3.82311 13.8826 4.29798 13.8826 4.59088 14.1755L5.82433 15.409C6.11723 15.7019 6.11723 16.1768 5.82433 16.4696C5.53144 16.7625 5.05657 16.7625 4.76367 16.4696L3.53022 15.2362C3.23732 14.9433 3.23732 14.4684 3.53022 14.1755Z',
  ],
  right: [
    'M15.4698 3.46966C15.1769 3.17677 14.702 3.17677 14.4091 3.46966L2.46978 15.409C2.17689 15.7019 2.17689 16.1768 2.46978 16.4697C2.76268 16.7625 3.23755 16.7625 3.53044 16.4697L15.4698 4.53032C15.7627 4.23743 15.7627 3.76255 15.4698 3.46966Z',
    'M15.4698 8.8226C15.1769 8.5297 14.702 8.5297 14.4091 8.8226L7.82272 15.409C7.52983 15.7019 7.52983 16.1768 7.82272 16.4697C8.11562 16.7625 8.59049 16.7625 8.88338 16.4697L15.4698 9.88326C15.7627 9.59036 15.7627 9.11549 15.4698 8.8226Z',
    'M15.4698 14.1755C15.1769 13.8826 14.702 13.8826 14.4091 14.1755L13.1757 15.409C12.8828 15.7019 12.8828 16.1768 13.1757 16.4696C13.4686 16.7625 13.9434 16.7625 14.2363 16.4696L15.4698 15.2362C15.7627 14.9433 15.7627 14.4684 15.4698 14.1755Z',
  ],
};
const WppIconScaleBottom$1 = /*@__PURE__*/ proxyCustomElement(class WppIconScaleBottom extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-scale-bottom", width: this.width, height: this.height, size: this.size, color: this.color }, ScaleBottomDirectionIconPath[this.direction].map(path => (h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: path, fill: "currentColor" })))));
  }
  static get registryIs() { return "wpp-icon-scale-bottom-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-scale-bottom", "wpp-icon-scale-bottom-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "direction": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-scale-bottom-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-scale-bottom-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconScaleBottom$1);
      }
      break;
  } });
}

const WppIconScaleBottom = WppIconScaleBottom$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconScaleBottom, defineCustomElement };
