import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSocialMedia$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSocialMedia extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-social-media", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.7141 9.94293L10.182 11.475C9.98678 11.6703 9.6702 11.6703 9.47494 11.475L7.94287 9.94293C7.94285 9.94291 7.94289 9.94295 7.94287 9.94293C7.42217 9.42223 7.42211 8.57795 7.94281 8.05725C8.46351 7.53655 9.30773 7.53655 9.82843 8.05725C10.3491 7.53655 11.1935 7.53655 11.7142 8.05725C12.2349 8.57795 12.2348 9.42223 11.7141 9.94293C11.7141 9.94291 11.7141 9.94295 11.7141 9.94293Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 3.25006C2.48122 3.25006 1.25 4.48128 1.25 6.00006L1.25 13.0001C1.25 14.5188 2.48122 15.7501 4 15.7501H7.68934L9.46967 17.5304C9.76256 17.8233 10.2374 17.8233 10.5303 17.5304L12.3107 15.7501L16 15.7501C17.5188 15.7501 18.75 14.5188 18.75 13.0001V6.00006C18.75 4.48128 17.5188 3.25006 16 3.25006L4 3.25006ZM2.75 6.00006C2.75 5.30971 3.30964 4.75006 4 4.75006L16 4.75006C16.6904 4.75006 17.25 5.30971 17.25 6.00006V13.0001C17.25 13.6904 16.6904 14.2501 16 14.2501H12C11.8011 14.2501 11.6103 14.3291 11.4697 14.4697L10 15.9394L8.53033 14.4697C8.38968 14.3291 8.19891 14.2501 8 14.2501H4C3.30964 14.2501 2.75 13.6904 2.75 13.0001L2.75 6.00006Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-social-media-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-social-media", "wpp-icon-social-media-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-social-media-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-social-media-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSocialMedia$1);
      }
      break;
  } });
}

const WppIconSocialMedia = WppIconSocialMedia$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSocialMedia, defineCustomElement };
