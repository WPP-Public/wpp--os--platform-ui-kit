import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBranch$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBranch extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-branch", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.86035 4.91156C2.86035 3.24834 4.20866 1.90002 5.87189 1.90002C7.53512 1.90002 8.88343 3.24834 8.88343 4.91156C8.88343 6.20266 8.07097 7.30399 6.92942 7.73218C7.75438 9.23974 9.34734 10.2095 11.1108 10.2095H11.215C11.5507 8.91258 12.7289 7.95478 14.1307 7.95478C15.7939 7.95478 17.1422 9.30309 17.1422 10.9663C17.1422 12.6295 15.7939 13.9779 14.1307 13.9779C12.7239 13.9779 11.5424 13.0133 11.2115 11.7095H11.1108C9.381 11.7095 7.77601 10.9997 6.62207 9.81614V12.1711C7.92234 12.5045 8.88343 13.6843 8.88343 15.0885C8.88343 16.7517 7.53512 18.1 5.87189 18.1C4.20866 18.1 2.86035 16.7517 2.86035 15.0885C2.86035 13.6841 3.82162 12.5043 5.12207 12.171V7.82901C3.82162 7.49577 2.86035 6.31592 2.86035 4.91156ZM5.87189 3.40002C5.03709 3.40002 4.36035 4.07676 4.36035 4.91156C4.36035 5.74636 5.03709 6.4231 5.87189 6.4231C6.70669 6.4231 7.38343 5.74636 7.38343 4.91156C7.38343 4.07676 6.70669 3.40002 5.87189 3.40002ZM14.1307 9.45478C13.2959 9.45478 12.6191 10.1315 12.6191 10.9663C12.6191 11.8011 13.2959 12.4779 14.1307 12.4779C14.9655 12.4779 15.6422 11.8011 15.6422 10.9663C15.6422 10.1315 14.9655 9.45478 14.1307 9.45478ZM4.36035 15.0885C4.36035 14.2537 5.03709 13.5769 5.87189 13.5769C6.70669 13.5769 7.38343 14.2537 7.38343 15.0885C7.38343 15.9233 6.70669 16.6 5.87189 16.6C5.03709 16.6 4.36035 15.9233 4.36035 15.0885Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-branch-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-branch", "wpp-icon-branch-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-branch-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-branch-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBranch$1);
      }
      break;
  } });
}

const WppIconBranch = WppIconBranch$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBranch, defineCustomElement };
