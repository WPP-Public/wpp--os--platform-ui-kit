import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSort = /*@__PURE__*/ proxyCustomElement(class WppIconSort extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-danger-colour-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-sort", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.8393 16.7223C14.702 16.8917 14.4849 17 14.25 17C14.0571 17.001 13.8704 16.9277 13.7232 16.7803L10.7193 13.772C10.4269 13.4791 10.4269 13.0043 10.7193 12.7114C11.0118 12.4185 11.486 12.4185 11.7784 12.7114L13.5 14.4441V3.75C13.5 3.33579 13.8364 3 14.25 3C14.6636 3 15 3.33579 15 3.75V14.4336L16.7216 12.7159C17.014 12.423 17.4882 12.423 17.7807 12.7159C18.0731 13.0088 18.0731 13.4837 17.7807 13.7765L14.8393 16.7223ZM6.33931 3.27775C6.202 3.1083 5.98488 3.00001 5.75 3.00001C5.55709 2.99905 5.37038 3.07227 5.2232 3.21967L2.21934 6.22798C1.92689 6.52087 1.92689 6.99575 2.21934 7.28864C2.5118 7.58153 2.98597 7.58153 3.27843 7.28864L5 5.5559V16.25C5 16.6642 5.3364 17 5.75 17C6.1636 17 6.5 16.6642 6.5 16.25V5.5664L8.22157 7.28412C8.51403 7.57702 8.9882 7.57702 9.28066 7.28412C9.57311 6.99123 9.57311 6.51636 9.28066 6.22346L6.33931 3.27775Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-sort-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-sort", "wpp-icon-sort-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-sort-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-sort-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSort);
      }
      break;
  } });
}

export { WppIconSort as W, defineCustomElement as d };
