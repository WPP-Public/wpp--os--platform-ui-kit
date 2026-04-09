import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBlockquote = /*@__PURE__*/ proxyCustomElement(class WppIconBlockquote extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-blockquote", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9C6.98728 9 7.442 8.86059 7.82645 8.61948C7.63092 9.73653 7.28608 10.6355 6.87439 11.384C6.22505 12.5647 5.39792 13.395 4.64645 14.1464C4.45118 14.3417 4.45118 14.6583 4.64645 14.8536C4.84171 15.0488 5.15829 15.0488 5.35355 14.8536L5.36545 14.8417C6.11184 14.0953 7.02879 13.1784 7.75061 11.866C8.48082 10.5383 9 8.82976 9 6.5ZM14.8264 8.61948C14.442 8.86059 13.9873 9 13.5 9C12.1193 9 11 7.88071 11 6.5C11 5.11929 12.1193 4 13.5 4C14.8807 4 16 5.11929 16 6.5C16 8.82976 15.4808 10.5383 14.7506 11.866C14.0288 13.1784 13.1118 14.0953 12.3655 14.8417L12.3536 14.8536C12.1583 15.0488 11.8417 15.0488 11.6464 14.8536C11.4512 14.6583 11.4512 14.3417 11.6464 14.1464C12.3979 13.395 13.225 12.5647 13.8744 11.384C14.2861 10.6355 14.6309 9.73653 14.8264 8.61948Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-blockquote-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-blockquote", "wpp-icon-blockquote-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-blockquote-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-blockquote-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBlockquote);
      }
      break;
  } });
}

export { WppIconBlockquote as W, defineCustomElement as d };
