import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPound$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPound extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-pound", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.8701 5.16928C11.3422 4.9577 10.7578 4.92146 10.2068 5.0661C9.65573 5.21075 9.1685 5.52829 8.81991 5.96994C8.47177 6.41104 8.28116 6.95157 8.27725 7.50869V10.0535H11.6385C12.0562 10.0535 12.3948 10.3846 12.3948 10.793C12.3948 11.2014 12.0562 11.5325 11.6385 11.5325H8.27725V13.6688C8.27725 13.6964 8.27567 13.724 8.27252 13.7514C8.25078 13.9406 8.21193 14.1267 8.15686 14.3077C8.87975 14.2784 9.60291 14.3817 10.2887 14.6131C10.3119 14.621 10.3347 14.6299 10.357 14.6399C10.9173 14.891 11.5264 15.021 12.1427 15.021C12.7591 15.021 13.3681 14.891 13.9284 14.6399C14.3081 14.4697 14.757 14.6328 14.931 15.004C15.1051 15.3753 14.9383 15.8142 14.5586 15.9844C13.8006 16.3241 12.9766 16.5 12.1427 16.5C11.3221 16.5 10.5109 16.3297 9.76288 16.0004C9.18659 15.8109 8.57553 15.7434 7.97027 15.8026C7.56455 15.8423 7.16779 15.9383 6.79169 16.0868C6.57261 16.2249 6.33641 16.3376 6.08769 16.4218C5.7204 16.5461 5.31656 16.378 5.15366 16.0329C4.99077 15.6879 5.12186 15.2783 5.45686 15.0856C5.6532 14.9727 5.85571 14.8714 6.06327 14.7822C6.18618 14.6936 6.2974 14.5893 6.39374 14.4715C6.5939 14.2269 6.72201 13.9337 6.76467 13.6237V11.5325H5.75629C5.3386 11.5325 5 11.2014 5 10.793C5 10.3846 5.3386 10.0535 5.75629 10.0535H6.76467V7.5019C6.77011 6.6201 7.07148 5.76443 7.62247 5.06633C8.17346 4.36823 8.9436 3.86632 9.8146 3.63768C10.6856 3.40905 11.6093 3.46634 12.4437 3.80076C13.2782 4.13518 13.9773 4.72824 14.4337 5.48882C14.645 5.84108 14.5243 6.29419 14.1641 6.50085C13.8038 6.70752 13.3404 6.58949 13.129 6.23723C12.8403 5.75604 12.398 5.38085 11.8701 5.16928Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pound-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pound", "wpp-icon-pound-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pound-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pound-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPound$1);
      }
      break;
  } });
}

const WppIconPound = WppIconPound$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPound, defineCustomElement };
