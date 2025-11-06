import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUnorderedList = /*@__PURE__*/ proxyCustomElement(class WppIconUnorderedList extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-unordered-list", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.25 6.5C3.94036 6.5 4.5 5.94036 4.5 5.25C4.5 4.55964 3.94036 4 3.25 4C2.55964 4 2 4.55964 2 5.25C2 5.94036 2.55964 6.5 3.25 6.5ZM7 5.25C7 4.83579 7.33579 4.5 7.75 4.5H17.25C17.6642 4.5 18 4.83579 18 5.25C18 5.66421 17.6642 6 17.25 6H7.75C7.33579 6 7 5.66421 7 5.25ZM7.75 9.5C7.33579 9.5 7 9.83579 7 10.25C7 10.6642 7.33579 11 7.75 11H17.25C17.6642 11 18 10.6642 18 10.25C18 9.83579 17.6642 9.5 17.25 9.5H7.75ZM7.75 14.5C7.33579 14.5 7 14.8358 7 15.25C7 15.6642 7.33579 16 7.75 16H17.25C17.6642 16 18 15.6642 18 15.25C18 14.8358 17.6642 14.5 17.25 14.5H7.75ZM4.5 10.25C4.5 10.9404 3.94036 11.5 3.25 11.5C2.55964 11.5 2 10.9404 2 10.25C2 9.55964 2.55964 9 3.25 9C3.94036 9 4.5 9.55964 4.5 10.25ZM3.25 16.5C3.94036 16.5 4.5 15.9404 4.5 15.25C4.5 14.5596 3.94036 14 3.25 14C2.55964 14 2 14.5596 2 15.25C2 15.9404 2.55964 16.5 3.25 16.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-unordered-list-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-unordered-list", "wpp-icon-unordered-list-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-unordered-list-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-unordered-list-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconUnorderedList);
      }
      break;
  } });
}

export { WppIconUnorderedList as W, defineCustomElement as d };
