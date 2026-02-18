import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTag$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTag extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-tag", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M16.0234 1.88184C17.2041 1.88958 18.1574 2.84862 18.1592 4.0293L18.167 8.97852C18.1678 9.54969 17.9409 10.098 17.5371 10.502L10.9062 17.1328C10.0666 17.9724 8.70486 17.9724 7.86523 17.1328L2.91699 12.1846C2.07692 11.3442 2.07781 9.98183 2.91895 9.14258L9.60059 2.47754C10.007 2.07219 10.5588 1.84593 11.1328 1.84961L16.0234 1.88184ZM11.125 3.15039C10.898 3.1489 10.6793 3.23814 10.5186 3.39844L3.83691 10.0625C3.50429 10.3943 3.50468 10.9334 3.83691 11.2656L8.78516 16.2139C9.11711 16.5457 9.65539 16.5458 9.9873 16.2139L16.6182 9.58301C16.7777 9.42332 16.8675 9.2062 16.8672 8.98047L16.8594 4.03125C16.8587 3.56447 16.4814 3.1847 16.0146 3.18164L11.125 3.15039ZM14.0029 4.84961C14.6381 4.84961 15.1533 5.36487 15.1533 6C15.1533 6.63513 14.6381 7.15039 14.0029 7.15039C13.3678 7.15039 12.8525 6.63513 12.8525 6C12.8525 5.36487 13.3678 4.84961 14.0029 4.84961Z", fill: "currentColor", stroke: "currentColor", "stroke-width": "0.3" })));
  }
  static get registryIs() { return "wpp-icon-tag-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-tag", "wpp-icon-tag-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-tag-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-tag-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTag$1);
      }
      break;
  } });
}

const WppIconTag = WppIconTag$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTag, defineCustomElement };
