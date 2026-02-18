import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDownload$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDownload extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-download", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.46967 14.5303C9.76256 14.8232 10.2374 14.8232 10.5303 14.5303L13.5303 11.5303C13.8232 11.2374 13.8232 10.7626 13.5303 10.4697C13.2374 10.1768 12.7626 10.1768 12.4697 10.4697L10.75 12.1893L10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3L9.25 12.1893L7.53033 10.4697C7.23744 10.1768 6.76256 10.1768 6.46967 10.4697C6.17678 10.7626 6.17678 11.2374 6.46967 11.5303L9.46967 14.5303Z", fill: "currentColor" }), h("path", { d: "M3.5 16.25C3.08579 16.25 2.75 16.5858 2.75 17C2.75 17.4142 3.08579 17.75 3.5 17.75L16.5 17.75C16.9142 17.75 17.25 17.4142 17.25 17C17.25 16.5858 16.9142 16.25 16.5 16.25L3.5 16.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-download-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-download", "wpp-icon-download-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-download-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-download-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDownload$1);
      }
      break;
  } });
}

const WppIconDownload = WppIconDownload$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDownload, defineCustomElement };
