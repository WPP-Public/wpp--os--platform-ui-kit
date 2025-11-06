import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPause$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPause extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-pause", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.125 4.15C3.125 3.23873 3.86373 2.5 4.775 2.5H7.475C8.38627 2.5 9.125 3.23873 9.125 4.15V15.85C9.125 16.7613 8.38627 17.5 7.475 17.5H4.775C3.86373 17.5 3.125 16.7613 3.125 15.85V4.15ZM4.775 4C4.69216 4 4.625 4.06716 4.625 4.15V15.85C4.625 15.9328 4.69216 16 4.775 16H7.475C7.55784 16 7.625 15.9328 7.625 15.85V4.15C7.625 4.06716 7.55784 4 7.475 4H4.775Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.875 4.15C10.875 3.23873 11.6137 2.5 12.525 2.5H15.225C16.1363 2.5 16.875 3.23873 16.875 4.15V15.85C16.875 16.7613 16.1363 17.5 15.225 17.5H12.525C11.6137 17.5 10.875 16.7613 10.875 15.85V4.15ZM12.525 4C12.4422 4 12.375 4.06716 12.375 4.15V15.85C12.375 15.9328 12.4422 16 12.525 16H15.225C15.3078 16 15.375 15.9328 15.375 15.85V4.15C15.375 4.06716 15.3078 4 15.225 4H12.525Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pause-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pause", "wpp-icon-pause-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pause-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pause-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPause$1);
      }
      break;
  } });
}

const WppIconPause = WppIconPause$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPause, defineCustomElement };
