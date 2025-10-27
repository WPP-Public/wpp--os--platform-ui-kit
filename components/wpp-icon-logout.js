import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLogout$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLogout extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-logout", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.01465 4.26488C2.01465 3.02224 3.02201 2.01488 4.26465 2.01488H11.2825C12.5251 2.01488 13.5325 3.02224 13.5325 4.26488V6.10417C13.5325 6.51838 13.1967 6.85417 12.7825 6.85417C12.3683 6.85417 12.0325 6.51838 12.0325 6.10417V4.26488C12.0325 3.85066 11.6967 3.51488 11.2825 3.51488H4.26465C3.85043 3.51488 3.51465 3.85066 3.51465 4.26488V15.7351C3.51465 16.1493 3.85043 16.4851 4.26465 16.4851H11.2825C11.6967 16.4851 12.0325 16.1493 12.0325 15.7351V13.8958C12.0325 13.4816 12.3683 13.1458 12.7825 13.1458C13.1967 13.1458 13.5325 13.4816 13.5325 13.8958V15.7351C13.5325 16.9778 12.5251 17.9851 11.2825 17.9851H4.26465C3.02201 17.9851 2.01465 16.9778 2.01465 15.7351V4.26488Z", fill: "currentColor" }), h("path", { d: "M8.69336 10C8.69336 9.58579 9.02915 9.25 9.44336 9.25H15.4233L14.4775 8.30413C14.1846 8.01124 14.1846 7.53637 14.4775 7.24347C14.7704 6.95058 15.2452 6.95058 15.5381 7.24347L17.7416 9.44688C17.8912 9.584 17.985 9.78104 17.985 10C17.985 10.219 17.8911 10.4161 17.7414 10.5532L15.5381 12.7565C15.2452 13.0494 14.7704 13.0494 14.4775 12.7565C14.1846 12.4636 14.1846 11.9887 14.4775 11.6959L15.4233 10.75H9.44336C9.02915 10.75 8.69336 10.4142 8.69336 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-logout-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-logout", "wpp-icon-logout-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-logout-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-logout-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLogout$1);
      }
      break;
  } });
}

const WppIconLogout = WppIconLogout$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLogout, defineCustomElement };
