import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconArchive$1 = /*@__PURE__*/ proxyCustomElement(class WppIconArchive extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-archive", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.875 3.45837V5.29171H16.125V3.45837H3.875ZM2.375 3.12504C2.375 2.48083 2.89745 1.95837 3.54167 1.95837H16.4583C17.1025 1.95837 17.625 2.48083 17.625 3.12504V5.62504C17.625 6.15342 17.2735 6.59988 16.7917 6.74336V15.2083C16.7917 16.7729 15.523 18.0416 13.9584 18.0416H6.04171C4.47708 18.0416 3.20837 16.7729 3.20837 15.2083V6.74338C2.7265 6.59993 2.375 6.15345 2.375 5.62504V3.12504ZM4.70837 6.79171H15.2917V15.2083C15.2917 15.9445 14.6946 16.5416 13.9584 16.5416H6.04171C5.3055 16.5416 4.70837 15.9445 4.70837 15.2083V6.79171ZM8.125 9.04163C7.71079 9.04163 7.375 9.37741 7.375 9.79163C7.375 10.2058 7.71079 10.5416 8.125 10.5416H11.875C12.2892 10.5416 12.625 10.2058 12.625 9.79163C12.625 9.37741 12.2892 9.04163 11.875 9.04163H8.125Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-archive-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-archive", "wpp-icon-archive-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-archive-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-archive-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconArchive$1);
      }
      break;
  } });
}

const WppIconArchive = WppIconArchive$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconArchive, defineCustomElement };
