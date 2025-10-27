import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBookmark$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBookmark extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-bookmark", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.87508 3.45831C6.13888 3.45831 5.54175 4.05544 5.54175 4.79165V15.8275L9.56185 12.933C9.82361 12.7445 10.1766 12.7445 10.4383 12.933L14.4584 15.8275V4.79165C14.4584 4.05544 13.8613 3.45831 13.1251 3.45831H6.87508ZM4.04175 4.79165C4.04175 3.22702 5.31045 1.95831 6.87508 1.95831H13.1251C14.6897 1.95831 15.9584 3.22702 15.9584 4.79165V17.2916C15.9584 17.5731 15.8008 17.8309 15.5503 17.9592C15.2998 18.0875 14.9986 18.0647 14.7702 17.9003L10.0001 14.4658L5.22998 17.9003C5.00157 18.0647 4.70032 18.0875 4.44982 17.9592C4.19932 17.8309 4.04175 17.5731 4.04175 17.2916V4.79165Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bookmark-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-bookmark", "wpp-icon-bookmark-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-bookmark-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-bookmark-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBookmark$1);
      }
      break;
  } });
}

const WppIconBookmark = WppIconBookmark$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBookmark, defineCustomElement };
