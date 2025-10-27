import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconScale$1 = /*@__PURE__*/ proxyCustomElement(class WppIconScale extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-scale", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.33333 5.91667C5.33333 5.5945 5.5945 5.33333 5.91667 5.33333H7.86111C8.18328 5.33333 8.44444 5.5945 8.44444 5.91667C8.44444 6.23883 8.18328 6.5 7.86111 6.5H7.32496L8.66248 7.83752C8.89028 8.06533 8.89028 8.43467 8.66248 8.66248C8.43467 8.89028 8.06533 8.89028 7.83752 8.66248L6.5 7.32496V7.86201C6.5 8.18417 6.23883 8.44534 5.91667 8.44534C5.5945 8.44534 5.33333 8.18417 5.33333 7.86201V5.91667ZM14.0837 14.6675C14.2384 14.6675 14.3868 14.6061 14.4962 14.4967C14.6056 14.3873 14.667 14.2389 14.667 14.0842V12.1388C14.667 11.8167 14.4059 11.5555 14.0837 11.5555C13.7615 11.5555 13.5004 11.8167 13.5004 12.1388V12.6757L12.1624 11.3376C11.9346 11.1097 11.5653 11.1097 11.3375 11.3375C11.1096 11.5653 11.1096 11.9346 11.3374 12.1624L12.6756 13.5009H12.1393C11.8171 13.5009 11.5559 13.762 11.5559 14.0842C11.5559 14.4064 11.8171 14.6675 12.1393 14.6675H14.0837ZM14.4962 5.50466C14.6056 5.61406 14.667 5.76243 14.667 5.91714V7.86159C14.667 8.18375 14.4059 8.44492 14.0837 8.44492C13.7615 8.44492 13.5004 8.18375 13.5004 7.86159V7.32503L12.1623 8.66256C11.9344 8.89032 11.5651 8.89025 11.3373 8.6624C11.1096 8.43454 11.1097 8.0652 11.3375 7.83744L12.675 6.50047H12.1384C11.8162 6.50047 11.555 6.23931 11.555 5.91714C11.555 5.59498 11.8162 5.33381 12.1384 5.33381L14.0837 5.33381C14.2384 5.33381 14.3868 5.39527 14.4962 5.50466ZM5.33333 14.0837C5.33333 14.2384 5.39479 14.3868 5.50419 14.4962C5.61358 14.6056 5.76196 14.667 5.91667 14.667H7.86201C8.18417 14.667 8.44534 14.4059 8.44534 14.0837C8.44534 13.7615 8.18417 13.5004 7.86201 13.5004H7.3248L8.66251 12.1624C8.8903 11.9346 8.89027 11.5653 8.66245 11.3375C8.43462 11.1097 8.06527 11.1097 7.83749 11.3376L6.5 12.6753V12.1393C6.5 11.8171 6.23883 11.5559 5.91667 11.5559C5.5945 11.5559 5.33333 11.8171 5.33333 12.1393L5.33333 14.0837ZM3 4.75C3 3.7835 3.7835 3 4.75 3H15.25C16.2165 3 17 3.7835 17 4.75V15.25C17 16.2165 16.2165 17 15.25 17H4.75C3.7835 17 3 16.2165 3 15.25V4.75ZM4.75 4.16667C4.42783 4.16667 4.16667 4.42783 4.16667 4.75V15.25C4.16667 15.5722 4.42783 15.8333 4.75 15.8333H15.25C15.5722 15.8333 15.8333 15.5722 15.8333 15.25V4.75C15.8333 4.42783 15.5722 4.16667 15.25 4.16667H4.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-scale-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-scale", "wpp-icon-scale-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-scale-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-scale-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconScale$1);
      }
      break;
  } });
}

const WppIconScale = WppIconScale$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconScale, defineCustomElement };
