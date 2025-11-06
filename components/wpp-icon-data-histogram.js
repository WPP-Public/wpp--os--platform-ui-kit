import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataHistogram$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDataHistogram extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-data-histogram", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.08333 4.3584C7.08333 3.32286 7.9228 2.4834 8.95833 2.4834H11.0417C12.0772 2.4834 12.9167 3.32286 12.9167 4.3584V5.8334H15.625C16.6605 5.8334 17.5 6.67286 17.5 7.7084V16.8751C17.5 17.2202 17.2202 17.5001 16.875 17.5001H3.125C2.77982 17.5001 2.5 17.2202 2.5 16.8751V10.2084C2.5 9.17286 3.33947 8.3334 4.375 8.3334H7.08333V4.3584ZM8.33333 16.2501H11.6667V4.3584C11.6667 4.01322 11.3868 3.7334 11.0417 3.7334H8.95833C8.61315 3.7334 8.33333 4.01322 8.33333 4.3584V16.2501ZM7.08333 9.5834H4.375C4.02982 9.5834 3.75 9.86322 3.75 10.2084V16.2501H7.08333V9.5834ZM12.9167 16.2501H16.25V7.7084C16.25 7.36322 15.9702 7.0834 15.625 7.0834H12.9167V16.2501Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-histogram-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-data-histogram", "wpp-icon-data-histogram-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-data-histogram-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-data-histogram-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDataHistogram$1);
      }
      break;
  } });
}

const WppIconDataHistogram = WppIconDataHistogram$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDataHistogram, defineCustomElement };
