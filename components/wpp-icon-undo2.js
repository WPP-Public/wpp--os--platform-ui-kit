import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUndo = /*@__PURE__*/ proxyCustomElement(class WppIconUndo extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-undo", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6 15.25C6 15.6642 6.33579 16 6.75 16H11.25C12.8365 16 13.9458 15.3788 14.78 14.4118C15.6009 13.4603 16 12.2164 16 11C16 9.78364 15.7009 8.53973 14.88 7.5882C14.0458 6.62123 12.8365 6 11.25 6H6.56066L8.78033 3.78033C9.07322 3.48744 9.07322 3.01256 8.78033 2.71967C8.48744 2.42678 8.01256 2.42678 7.71967 2.71967L4.21967 6.21967C4.07561 6.36373 3.99636 6.56019 4.00013 6.76388C4.0039 6.96757 4.09037 7.16097 4.23966 7.29959L7.73966 10.5496C8.04319 10.8314 8.51774 10.8139 8.7996 10.5103C9.08145 10.2068 9.06387 9.73226 8.76034 9.4504L6.6599 7.5H11.25C12.4135 7.5 13.1092 7.94127 13.65 8.56805C14.2041 9.21027 14.5 10.0914 14.5 11C14.5 11.9086 14.2041 12.7897 13.65 13.432C13.1092 14.0587 12.4135 14.5 11.25 14.5H6.75C6.33579 14.5 6 14.8358 6 15.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-undo-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-undo", "wpp-icon-undo-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-undo-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-undo-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconUndo);
      }
      break;
  } });
}

export { WppIconUndo as W, defineCustomElement as d };
