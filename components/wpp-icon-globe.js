import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconGlobe$1 = /*@__PURE__*/ proxyCustomElement(class WppIconGlobe extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-globe", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.9982 2.91669C9.41272 2.91775 8.68316 3.46168 8.06351 4.81034C7.81791 5.34487 7.60815 5.97097 7.44644 6.66669H12.5534C12.3917 5.97097 12.1819 5.34487 11.9363 4.81034C11.3161 3.46036 10.5857 2.91669 9.99992 2.91669L9.9982 2.91669ZM6.92766 4.28847C6.60992 4.98001 6.35184 5.78427 6.16627 6.66669H3.7485C4.53733 5.19035 5.83382 4.02613 7.40482 3.40722C7.22868 3.68305 7.06947 3.97983 6.92766 4.28847ZM5.95918 7.91669H3.22808C3.02568 8.57537 2.91675 9.27497 2.91675 10C2.91675 10.7251 3.02568 11.4246 3.22807 12.0833H5.95918C5.87673 11.4159 5.83325 10.7174 5.83325 10C5.83325 9.2826 5.87673 8.58412 5.95918 7.91669ZM6.16626 13.3333H3.74848C4.5373 14.8097 5.83381 15.9739 7.40482 16.5928C7.22868 16.317 7.06947 16.0202 6.92766 15.7116C6.60992 15.02 6.35183 14.2157 6.16626 13.3333ZM7.44643 13.3333H12.5534C12.3917 14.029 12.1819 14.6552 11.9363 15.1897C11.3161 16.5397 10.5857 17.0834 9.99992 17.0834C9.41414 17.0834 8.68377 16.5397 8.06351 15.1897C7.81791 14.6552 7.60814 14.029 7.44643 13.3333ZM12.7804 12.0833H7.21948C7.13122 11.4261 7.08325 10.7271 7.08325 10C7.08325 9.2729 7.13122 8.57386 7.21948 7.91669H12.7804C12.8686 8.57386 12.9166 9.2729 12.9166 10C12.9166 10.7271 12.8686 11.4261 12.7804 12.0833ZM13.8336 13.3333C13.648 14.2157 13.3899 15.02 13.0722 15.7116C12.9303 16.0203 12.7711 16.3171 12.5949 16.593C14.1661 15.9741 15.4628 14.8098 16.2517 13.3333H13.8336ZM16.7721 12.0833H14.0407C14.1231 11.4159 14.1666 10.7174 14.1666 10C14.1666 9.2826 14.1231 8.58412 14.0407 7.91669H16.7721C16.9745 8.57537 17.0834 9.27497 17.0834 10C17.0834 10.7251 16.9745 11.4246 16.7721 12.0833ZM12.5949 3.40704C14.1661 4.02592 15.4628 5.19021 16.2517 6.66669H13.8336C13.648 5.78427 13.3899 4.98001 13.0722 4.28847C12.9303 3.97977 12.7711 3.68292 12.5949 3.40704ZM9.99992 18.3334H10.0001C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.601 5.39545 18.3311 9.9959 18.3334L9.99992 18.3334Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-globe-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-globe", "wpp-icon-globe-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-globe-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-globe-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconGlobe$1);
      }
      break;
  } });
}

const WppIconGlobe = WppIconGlobe$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconGlobe, defineCustomElement };
