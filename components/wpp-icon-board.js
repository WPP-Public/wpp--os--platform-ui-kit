import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBoard$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBoard extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-board", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.5393 3C15.8505 3 16.9221 4.0262 16.9944 5.31936L16.9983 5.4589L16.9979 14.5411C16.9977 15.8991 15.8968 17 14.5388 17H5.45902C4.14778 17 3.07623 15.9738 3.00389 14.6806L3 14.5411L3.00045 5.45891C3.00061 4.10093 4.10148 3 5.45947 3H14.5393ZM9.43117 8.29626L4.13491 8.29702L4.13499 14.541L4.14042 14.6627C4.20179 15.3369 4.76869 15.8651 5.45898 15.8651L9.43117 15.8646V8.29626ZM15.8623 12.8359L10.5661 12.8367V15.8646L14.5388 15.8651C15.27 15.8651 15.8629 15.2722 15.863 14.541L15.8623 12.8359ZM14.5393 4.13491L10.5661 4.13416V11.7018L15.8623 11.701L15.8633 5.45895L15.8579 5.33735C15.7965 4.66306 15.2296 4.13491 14.5393 4.13491ZM9.43117 4.13416L5.45953 4.13491L5.35096 4.13931C4.67048 4.19459 4.13545 4.76433 4.13537 5.459L4.13491 7.1621L9.43117 7.16135V4.13416Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-board-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-board", "wpp-icon-board-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-board-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-board-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBoard$1);
      }
      break;
  } });
}

const WppIconBoard = WppIconBoard$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBoard, defineCustomElement };
