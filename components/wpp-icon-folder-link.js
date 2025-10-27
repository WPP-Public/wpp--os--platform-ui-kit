import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFolderLink$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFolderLink extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-folder-link", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.9995 11.3997C16.6562 11.3997 17.9993 12.7427 17.9993 14.3995C17.9993 16.0029 16.7415 17.3124 15.1613 17.3952L15.0022 17.3994L14.2022 17.4031C13.8709 17.4046 13.601 17.1372 13.5995 16.8059C13.5981 16.5021 13.8227 16.2501 14.1153 16.209L14.1967 16.2031L14.9995 16.1995C15.9935 16.1995 16.7994 15.3936 16.7994 14.3995C16.7994 13.4469 16.0593 12.6671 15.1227 12.6038L14.9995 12.5996H14.1995C13.8681 12.5996 13.5995 12.331 13.5995 11.9996C13.5995 11.6959 13.8252 11.4449 14.1181 11.4051L14.1995 11.3997H14.9995ZM11.3996 11.3997C11.731 11.3997 11.9996 11.6683 11.9996 11.9996C11.9996 12.3034 11.7739 12.5544 11.481 12.5941L11.3996 12.5996H10.5996C9.60557 12.5996 8.79972 13.4055 8.79972 14.3995C8.79972 15.3522 9.53981 16.132 10.4764 16.1953L10.5996 16.1995H11.3996C11.731 16.1995 11.9996 16.4681 11.9996 16.7994C11.9996 17.1032 11.7739 17.3542 11.481 17.3939L11.3996 17.3994H10.5996C8.94286 17.3994 7.59977 16.0563 7.59977 14.3995C7.59977 12.7962 8.8576 11.4866 10.4403 11.4038L10.5996 11.3997H11.3996ZM6.96533 3C7.33377 3 7.692 3.11302 7.9925 3.32187L8.11762 3.41718L10.0173 4.99992H16.1994C17.1088 4.99992 17.8606 5.67426 17.9822 6.55016L17.9952 6.67661L17.9993 6.79984L18 12.0678C17.676 11.6515 17.2673 11.3044 16.7998 11.0524L16.7994 6.79984C16.7994 6.4961 16.5737 6.24507 16.2808 6.20534L16.1994 6.19987H10.0165L8.11762 7.7826C7.83458 8.01847 7.48702 8.16097 7.12247 8.19291L6.96533 8.19978L3.19995 8.19898V13.9995C3.19995 14.3033 3.42566 14.5543 3.71851 14.594L3.79992 14.5995L6.805 14.6C6.82693 15.022 6.91773 15.4258 7.06637 15.8004L3.79992 15.7995C2.84727 15.7995 2.06748 15.0594 2.00415 14.1228L2 13.9995V4.79993C2 3.84727 2.7401 3.06748 3.67669 3.00415L3.79992 3H6.96533ZM14.9995 13.7996C15.3308 13.7996 15.5994 14.0682 15.5994 14.3995C15.5994 14.7033 15.3737 14.9543 15.0809 14.994L14.9995 14.9995H10.5996C10.2683 14.9995 9.99967 14.7309 9.99967 14.3995C9.99967 14.0958 10.2254 13.8448 10.5182 13.805L10.5996 13.7996H14.9995ZM6.96533 4.19995H3.79992C3.49618 4.19995 3.24516 4.42566 3.20543 4.71851L3.19995 4.79993V6.99903L6.96533 6.99983C7.07762 6.99983 7.18706 6.96834 7.28155 6.90974L7.34943 6.86077L8.86211 5.59909L7.34943 4.33901C7.26317 4.26713 7.15893 4.22126 7.04882 4.20579L6.96533 4.19995Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-folder-link-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-folder-link", "wpp-icon-folder-link-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-folder-link-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-folder-link-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFolderLink$1);
      }
      break;
  } });
}

const WppIconFolderLink = WppIconFolderLink$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFolderLink, defineCustomElement };
