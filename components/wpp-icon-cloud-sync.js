import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCloudSync$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCloudSync extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-cloud-sync", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.26931 5.8C5.64877 3.63421 7.53966 2 9.8 2C12.0603 2 13.9512 3.63421 14.3307 5.8L14.4 5.8C16.1673 5.8 17.6 7.23269 17.6 9C17.6 9.14969 17.5897 9.29698 17.5698 9.4412C17.2066 9.01229 16.7751 8.64304 16.2921 8.3502C16.0223 7.56461 15.2771 7 14.4 7L13.7951 7.00002C13.4752 7.00003 13.2115 6.74905 13.1958 6.42953C13.107 4.625 11.6144 3.2 9.8 3.2C7.98562 3.2 6.49304 4.625 6.40419 6.42953C6.38845 6.74905 6.1248 7.00003 5.80489 7.00002L5.2 7C4.09543 7 3.2 7.89543 3.2 9C3.2 10.1046 4.09543 11 5.2 11H8.71997C8.57939 11.381 8.48215 11.783 8.43424 12.2H5.2C3.43269 12.2 2 10.7673 2 9C2 7.23269 3.43269 5.8 5.20002 5.8L5.26931 5.8ZM9.2 12.8C9.2 15.2301 11.1699 17.2 13.6 17.2C16.0301 17.2 18 15.2301 18 12.8C18 10.3699 16.0301 8.4 13.6 8.4C11.1699 8.4 9.2 10.3699 9.2 12.8ZM16 10C16.2209 10 16.4 10.1791 16.4 10.4V12C16.4 12.2209 16.2209 12.4 16 12.4H14.4C14.1791 12.4 14 12.2209 14 12C14 11.7791 14.1791 11.6 14.4 11.6H15.2002C14.8349 11.1136 14.2539 10.8 13.6 10.8C12.9333 10.8 12.3426 11.1259 11.9786 11.6288C11.8491 11.8077 11.599 11.8478 11.42 11.7183C11.2411 11.5887 11.201 11.3387 11.3306 11.1597C11.8386 10.4579 12.6658 10 13.6 10C14.3838 10 15.0921 10.3222 15.6 10.8405V10.4C15.6 10.1791 15.7791 10 16 10ZM11.6 14.7595V15.2C11.6 15.4209 11.4209 15.6 11.2 15.6C10.9791 15.6 10.8 15.4209 10.8 15.2V13.6C10.8 13.3791 10.9791 13.2 11.2 13.2H12.8C13.0209 13.2 13.2 13.3791 13.2 13.6C13.2 13.8209 13.0209 14 12.8 14H11.9998C12.3651 14.4864 12.9461 14.8 13.6 14.8C14.2131 14.8 14.7614 14.5246 15.1289 14.0894C15.2715 13.9206 15.5238 13.8994 15.6926 14.0419C15.8614 14.1844 15.8827 14.4368 15.7402 14.6056C15.2272 15.2131 14.4586 15.6 13.6 15.6C12.8162 15.6 12.1079 15.2778 11.6 14.7595Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cloud-sync-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-cloud-sync", "wpp-icon-cloud-sync-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-cloud-sync-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-cloud-sync-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCloudSync$1);
      }
      break;
  } });
}

const WppIconCloudSync = WppIconCloudSync$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCloudSync, defineCustomElement };
