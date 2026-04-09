import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUserStarred$1 = /*@__PURE__*/ proxyCustomElement(class WppIconUserStarred extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-user-starred", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.399 6.00071C12.399 3.79118 10.6078 2 8.3983 2C6.18877 2 4.39759 3.79118 4.39759 6.00071C4.39759 8.21024 6.18877 10.0014 8.3983 10.0014C10.6078 10.0014 12.399 8.21024 12.399 6.00071ZM5.59781 6.00071C5.59781 4.45404 6.85163 3.20021 8.3983 3.20021C9.94498 3.20021 11.1988 4.45404 11.1988 6.00071C11.1988 7.54738 9.94498 8.80121 8.3983 8.80121C6.85163 8.80121 5.59781 7.54738 5.59781 6.00071Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.82707 11.5979C8.59515 11.9706 8.40656 12.373 8.26836 12.7982H3.79942C3.46849 12.7982 3.20021 13.0664 3.20021 13.3974V13.8596C3.20021 14.2882 3.35313 14.7027 3.63146 15.0287C4.63429 16.203 6.20727 16.7998 8.3983 16.7998C8.4331 16.7998 8.46775 16.7996 8.50223 16.7993C8.69692 17.2218 8.94359 17.6154 9.23406 17.9718C8.96338 17.9906 8.68477 18 8.3983 18C5.88117 18 3.97202 17.2757 2.71875 15.8081C2.25486 15.2649 2 14.5739 2 13.8596V13.3974C2 12.4036 2.80563 11.5979 3.79942 11.5979H8.82707Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18 14.5C18 16.9853 15.9853 19 13.5 19C11.0147 19 9 16.9853 9 14.5C9 12.0147 11.0147 10 13.5 10C15.9853 10 18 12.0147 18 14.5ZM13.976 11.8605L14.4535 13.3923H15.9985C16.4834 13.3923 16.685 14.0391 16.2927 14.3362L15.0428 15.2829L15.5202 16.8146C15.67 17.2953 15.1422 17.6951 14.75 17.398L13.5 16.4513L12.25 17.398C11.8578 17.6951 11.33 17.2953 11.4798 16.8146L11.9572 15.2829L10.7073 14.3362C10.315 14.0391 10.5166 13.3923 11.0015 13.3923H12.5465L13.024 11.8605C13.1738 11.3798 13.8262 11.3798 13.976 11.8605Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-user-starred-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-user-starred", "wpp-icon-user-starred-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-user-starred-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-user-starred-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconUserStarred$1);
      }
      break;
  } });
}

const WppIconUserStarred = WppIconUserStarred$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconUserStarred, defineCustomElement };
