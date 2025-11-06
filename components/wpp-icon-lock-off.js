import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLockOff$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLockOff extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-lock-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.99984 1.54169C8.08979 1.54169 6.5415 3.08997 6.5415 5.00002V6.54169H5.2085C4.10387 6.54169 3.2085 7.43706 3.2085 8.54169V16.4584C3.2085 17.563 4.10387 18.4584 5.2085 18.4584H14.7918C15.8965 18.4584 16.7918 17.563 16.7918 16.4584V8.54169C16.7918 7.43706 15.8965 6.54169 14.7918 6.54169H8.0415V5.00002C8.0415 3.9184 8.91822 3.04169 9.99984 3.04169C11.029 3.04169 11.8728 3.83763 11.9499 4.84875C11.9814 5.26176 12.3418 5.57103 12.7548 5.53951C13.1678 5.508 13.4771 5.14764 13.4456 4.73462C13.3094 2.94991 11.8215 1.54169 9.99984 1.54169ZM5.2085 8.04169C4.93229 8.04169 4.7085 8.26548 4.7085 8.54169V16.4584C4.7085 16.7346 4.93229 16.9584 5.2085 16.9584H14.7918C15.068 16.9584 15.2918 16.7346 15.2918 16.4584V8.54169C15.2918 8.26548 15.068 8.04169 14.7918 8.04169H5.2085Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-lock-off-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-lock-off", "wpp-icon-lock-off-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-lock-off-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-lock-off-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLockOff$1);
      }
      break;
  } });
}

const WppIconLockOff = WppIconLockOff$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLockOff, defineCustomElement };
