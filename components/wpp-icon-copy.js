import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCopy$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCopy extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-copy", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.66249 1.3501C6.12926 1.3501 4.87286 2.53472 4.75845 4.03872C4.75528 4.08036 4.76961 4.12143 4.798 4.15206C4.82639 4.18269 4.86626 4.2001 4.90802 4.2001H6.19004C6.26468 4.2001 6.32796 4.14522 6.33853 4.07134C6.43122 3.42331 6.9888 2.9251 7.66249 2.9251H14.4626C15.9054 2.9251 17.0751 4.09476 17.0751 5.5376V12.3376C17.0751 13.0113 16.5769 13.5689 15.9288 13.6615C15.8549 13.6721 15.8001 13.7354 15.8001 13.81V15.092C15.8001 15.1338 15.8175 15.1737 15.8481 15.2021C15.8787 15.2304 15.9198 15.2448 15.9614 15.2416C17.4655 15.1272 18.6501 13.8708 18.6501 12.3376V5.5376C18.6501 3.2249 16.7753 1.3501 14.4626 1.3501H7.66249Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.26262 4.7501C2.65408 4.7501 1.3501 6.05407 1.3501 7.6626V15.7376C1.3501 17.3461 2.65408 18.6501 4.26262 18.6501H12.3377C13.9462 18.6501 15.2502 17.3461 15.2502 15.7376V7.6626C15.2502 6.05407 13.9462 4.7501 12.3377 4.7501H4.26262ZM2.92511 7.6626C2.92511 6.92392 3.52393 6.3251 4.26262 6.3251H12.3377C13.0764 6.3251 13.6752 6.92392 13.6752 7.6626V15.7376C13.6752 16.4763 13.0764 17.0751 12.3377 17.0751H4.26262C3.52393 17.0751 2.92511 16.4763 2.92511 15.7376V7.6626Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-copy-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-copy", "wpp-icon-copy-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-copy-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-copy-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCopy$1);
      }
      break;
  } });
}

const WppIconCopy = WppIconCopy$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCopy, defineCustomElement };
