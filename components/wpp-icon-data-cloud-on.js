import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataCloudOn$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDataCloudOn extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-data-cloud-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.35314 7.89744C5.74233 5.67611 7.6817 4 10 4C12.3183 4 14.2577 5.67611 14.6469 7.89744L14.7179 7.89744C16.5306 7.89744 18 9.36686 18 11.1795C18 12.9921 16.5306 14.4615 14.7179 14.4615H5.28205C3.46942 14.4615 2 12.9921 2 11.1795C2 9.36686 3.46942 7.89744 5.28207 7.89744L5.35314 7.89744ZM10 5.23077C8.1391 5.23077 6.60824 6.69231 6.51711 8.5431C6.50098 8.87082 6.23057 9.12824 5.90245 9.12823L5.28205 9.12821C4.14916 9.12821 3.23077 10.0466 3.23077 11.1795C3.23077 12.3124 4.14916 13.2308 5.28205 13.2308H14.7179C15.8508 13.2308 16.7692 12.3124 16.7692 11.1795C16.7692 10.0466 15.8508 9.12821 14.718 9.12821L14.0975 9.12823C13.7694 9.12824 13.499 8.87082 13.4829 8.5431C13.3918 6.69231 11.8609 5.23077 10 5.23077Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-cloud-on-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-data-cloud-on", "wpp-icon-data-cloud-on-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-data-cloud-on-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-data-cloud-on-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDataCloudOn$1);
      }
      break;
  } });
}

const WppIconDataCloudOn = WppIconDataCloudOn$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDataCloudOn, defineCustomElement };
