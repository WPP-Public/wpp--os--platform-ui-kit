import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFullscreen$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFullscreen extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-fullscreen", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.79167 2.375C3.45704 2.375 2.375 3.45704 2.375 4.79167V7.29167C2.375 7.70588 2.71079 8.04167 3.125 8.04167C3.53921 8.04167 3.875 7.70588 3.875 7.29167V4.79167C3.875 4.28546 4.28546 3.875 4.79167 3.875H7.29167C7.70588 3.875 8.04167 3.53921 8.04167 3.125C8.04167 2.71079 7.70588 2.375 7.29167 2.375H4.79167ZM17.625 12.7084C17.625 12.2942 17.2893 11.9584 16.875 11.9584C16.4608 11.9584 16.125 12.2942 16.125 12.7084V15.2084C16.125 15.7146 15.7146 16.125 15.2084 16.125H12.7084C12.2942 16.125 11.9584 16.4608 11.9584 16.875C11.9584 17.2893 12.2942 17.625 12.7084 17.625H15.2084C16.543 17.625 17.625 16.543 17.625 15.2084V12.7084ZM11.9584 3.125C11.9584 2.71079 12.2942 2.375 12.7084 2.375H15.2084C16.543 2.375 17.625 3.45704 17.625 4.79167V7.29167C17.625 7.70588 17.2893 8.04167 16.875 8.04167C16.4608 8.04167 16.125 7.70588 16.125 7.29167V4.79167C16.125 4.28546 15.7146 3.875 15.2084 3.875H12.7084C12.2942 3.875 11.9584 3.53921 11.9584 3.125ZM3.875 12.7084C3.875 12.2942 3.53921 11.9584 3.125 11.9584C2.71079 11.9584 2.375 12.2942 2.375 12.7084V15.2084C2.375 16.543 3.45704 17.625 4.79167 17.625H7.29167C7.70588 17.625 8.04167 17.2893 8.04167 16.875C8.04167 16.4608 7.70588 16.125 7.29167 16.125H4.79167C4.28546 16.125 3.875 15.7146 3.875 15.2084V12.7084Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-fullscreen-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-fullscreen", "wpp-icon-fullscreen-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-fullscreen-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-fullscreen-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFullscreen$1);
      }
      break;
  } });
}

const WppIconFullscreen = WppIconFullscreen$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFullscreen, defineCustomElement };
