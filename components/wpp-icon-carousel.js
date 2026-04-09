import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCarousel$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCarousel extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-carousel", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.5 2H12.5C13.7095 2 14.7184 2.85888 14.95 4H16C17.3807 4 18.5 5.11929 18.5 6.5V13.5C18.5 14.8807 17.3807 16 16 16H14.95C14.7184 17.1411 13.7095 18 12.5 18H7.5C6.29052 18 5.28164 17.1411 5.05001 16H4C2.61929 16 1.5 14.8807 1.5 13.5V6.5C1.5 5.11929 2.61929 4 4 4H5.05001C5.28164 2.85888 6.29052 2 7.5 2ZM13.5 15.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H7.5C6.94772 3.5 6.5 3.94772 6.5 4.5V15.5C6.5 16.0523 6.94772 16.5 7.5 16.5H12.5C13.0523 16.5 13.5 16.0523 13.5 15.5ZM15 14.5H16C16.1821 14.5 16.3529 14.4513 16.5 14.3662C16.7989 14.1933 17 13.8701 17 13.5V6.5C17 6.12986 16.7989 5.80669 16.5 5.63378C16.3529 5.5487 16.1821 5.5 16 5.5H15V14.5ZM5 5.5V14.5H4C3.81786 14.5 3.64709 14.4513 3.5 14.3662C3.2011 14.1933 3 13.8701 3 13.5V6.5C3 6.12986 3.2011 5.80669 3.5 5.63378C3.64709 5.5487 3.81786 5.5 4 5.5H5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-carousel-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-carousel", "wpp-icon-carousel-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-carousel-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-carousel-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCarousel$1);
      }
      break;
  } });
}

const WppIconCarousel = WppIconCarousel$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCarousel, defineCustomElement };
