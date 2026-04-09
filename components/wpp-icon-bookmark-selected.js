import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBookmarkSelected$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBookmarkSelected extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-bookmark-selected", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.87484 1.95837C5.31021 1.95837 4.0415 3.22708 4.0415 4.79171V17.2917C4.0415 17.5732 4.19908 17.8309 4.44958 17.9592C4.70008 18.0875 5.00133 18.0648 5.22973 17.9004L9.99984 14.4659L14.7699 17.9004C14.9983 18.0648 15.2996 18.0875 15.5501 17.9592C15.8006 17.8309 15.9582 17.5732 15.9582 17.2917V4.79171C15.9582 3.22708 14.6895 1.95837 13.1248 1.95837H6.87484Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bookmark-selected-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-bookmark-selected", "wpp-icon-bookmark-selected-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-bookmark-selected-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-bookmark-selected-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBookmarkSelected$1);
      }
      break;
  } });
}

const WppIconBookmarkSelected = WppIconBookmarkSelected$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBookmarkSelected, defineCustomElement };
