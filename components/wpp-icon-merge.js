import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMerge$1 = /*@__PURE__*/ proxyCustomElement(class WppIconMerge extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'horizontal';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-merge", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3 5.75C3 5.33579 3.33579 5 3.75 5H5.50736C6.50192 5 7.45575 5.39509 8.15901 6.09835L10.6516 8.59099C11.0736 9.01295 11.6459 9.25 12.2426 9.25H15.4393L12.4697 6.28033C12.1768 5.98744 12.1768 5.51256 12.4697 5.21967C12.7626 4.92678 13.2374 4.92678 13.5303 5.21967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L13.5303 14.7803C13.2374 15.0732 12.7626 15.0732 12.4697 14.7803C12.1768 14.4874 12.1768 14.0126 12.4697 13.7197L15.4393 10.75H12.2426C11.6459 10.75 11.0736 10.9871 10.6516 11.409L8.15901 13.9017C7.45575 14.6049 6.50192 15 5.50736 15H3.75C3.33579 15 3 14.6642 3 14.25C3 13.8358 3.33579 13.5 3.75 13.5H5.50736C6.1041 13.5 6.67639 13.2629 7.09835 12.841L9.59099 10.3484C9.7172 10.2221 9.85148 10.1059 9.99262 10C9.85148 9.89414 9.7172 9.77786 9.59099 9.65165L7.09835 7.15901C6.67639 6.73705 6.1041 6.5 5.50736 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-merge-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-merge", "wpp-icon-merge-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "direction": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-merge-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-merge-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconMerge$1);
      }
      break;
  } });
}

const WppIconMerge = WppIconMerge$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconMerge, defineCustomElement };
