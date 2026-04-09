import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSmileSlightly$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSmileSlightly extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-smile-slightly", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.59854 8.39922C8.59854 7.84733 8.15115 7.39994 7.59927 7.39994C7.04738 7.39994 6.59999 7.84733 6.59999 8.39922C6.59999 8.9511 7.04738 9.39849 7.59927 9.39849C8.15115 9.39849 8.59854 8.9511 8.59854 8.39922ZM13.3978 8.39922C13.3978 7.84733 12.9504 7.39994 12.3985 7.39994C11.8466 7.39994 11.3992 7.84733 11.3992 8.39922C11.3992 8.9511 11.8466 9.39849 12.3985 9.39849C12.9504 9.39849 13.3978 8.9511 13.3978 8.39922ZM8.50753 12.4838C8.22343 12.3133 7.85493 12.4055 7.68446 12.6896C7.514 12.9737 7.60613 13.3422 7.89023 13.5126C8.5036 13.8806 9.26625 14.048 9.99859 14.0481C10.7309 14.0481 11.4936 13.8807 12.1069 13.5128C12.391 13.3423 12.4832 12.9738 12.3128 12.6897C12.1423 12.4056 11.7738 12.3134 11.4897 12.4839C11.1032 12.7157 10.5661 12.8483 9.99862 12.8482C9.43116 12.8482 8.894 12.7157 8.50753 12.4838ZM17.9985 9.99902C17.9985 5.58075 14.4168 1.99902 9.99854 1.99902C5.58026 1.99902 1.99854 5.58075 1.99854 9.99902C1.99854 14.4173 5.58026 17.999 9.99854 17.999C14.4168 17.999 17.9985 14.4173 17.9985 9.99902ZM3.19835 9.99902C3.19835 6.24338 6.2429 3.19884 9.99854 3.19884C13.7542 3.19884 16.7987 6.24338 16.7987 9.99902C16.7987 13.7547 13.7542 16.7992 9.99854 16.7992C6.2429 16.7992 3.19835 13.7547 3.19835 9.99902Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-smile-slightly-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-smile-slightly", "wpp-icon-smile-slightly-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-smile-slightly-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-smile-slightly-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSmileSlightly$1);
      }
      break;
  } });
}

const WppIconSmileSlightly = WppIconSmileSlightly$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSmileSlightly, defineCustomElement };
