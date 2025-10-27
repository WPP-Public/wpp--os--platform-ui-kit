import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPinned$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPinned extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-pinned", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.4732 17.5L6.9128 14.0604L9.27648 16.424C9.84065 16.9882 10.8007 16.7671 11.0613 16.0129L12.1898 12.746C12.2315 12.6253 12.3188 12.5258 12.4329 12.4688L16.2524 10.559C17.6299 9.87026 17.9278 8.03437 16.8388 6.94534L13.0547 3.16125C11.9657 2.07222 10.1298 2.37015 9.44099 3.74768L7.53128 7.56715C7.47421 7.68129 7.37471 7.76854 7.25408 7.81021L3.98713 8.9388C3.233 9.19932 3.01185 10.1594 3.57603 10.7236L5.93967 13.0872L2.50008 16.5269L2.5 17.5H3.4732Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pinned-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pinned", "wpp-icon-pinned-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pinned-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pinned-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPinned$1);
      }
      break;
  } });
}

const WppIconPinned = WppIconPinned$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPinned, defineCustomElement };
