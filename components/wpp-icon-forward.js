import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconForward$1 = /*@__PURE__*/ proxyCustomElement(class WppIconForward extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-forward", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.69 9.49981L12.727 12.4628C12.4341 12.7557 12.4341 13.2305 12.727 13.5234C12.9933 13.7897 13.41 13.8139 13.7036 13.596L13.7877 13.5234L18.0303 9.28078C18.2966 9.01452 18.3208 8.59785 18.1029 8.30424L18.0303 8.22012L13.7877 3.97748C13.4948 3.68459 13.0199 3.68459 12.727 3.97748C12.4608 4.24375 12.4366 4.66041 12.6544 4.95402L12.727 5.03814L15.69 7.99981L10 8.00045C5.8021 8.00045 2.38375 11.3381 2.25383 15.5044L2.25 15.7505C2.25 16.1647 2.58579 16.5005 3 16.5005C3.41421 16.5005 3.75 16.1647 3.75 15.7505C3.75 12.3754 6.42524 9.62514 9.77087 9.50458L10 9.50045L15.69 9.49981Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-forward-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-forward", "wpp-icon-forward-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-forward-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-forward-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconForward$1);
      }
      break;
  } });
}

const WppIconForward = WppIconForward$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconForward, defineCustomElement };
