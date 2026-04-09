import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUpload$1 = /*@__PURE__*/ proxyCustomElement(class WppIconUpload extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-upload", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L13.5303 8.46967C13.8232 8.76256 13.8232 9.23744 13.5303 9.53033C13.2374 9.82322 12.7626 9.82322 12.4697 9.53033L10.75 7.81066L10.75 17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17L9.25 7.81066L7.53033 9.53033C7.23744 9.82322 6.76256 9.82322 6.46967 9.53033C6.17678 9.23744 6.17678 8.76256 6.46967 8.46967L9.46967 5.46967Z", fill: "currentColor" }), h("path", { d: "M3.5 3.75C3.08579 3.75 2.75 3.41421 2.75 3C2.75 2.58579 3.08579 2.25 3.5 2.25L16.5 2.25C16.9142 2.25 17.25 2.58578 17.25 3C17.25 3.41421 16.9142 3.75 16.5 3.75L3.5 3.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-upload-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-upload", "wpp-icon-upload-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-upload-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-upload-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconUpload$1);
      }
      break;
  } });
}

const WppIconUpload = WppIconUpload$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconUpload, defineCustomElement };
