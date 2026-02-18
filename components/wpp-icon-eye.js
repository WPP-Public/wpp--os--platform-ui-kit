import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEye$1 = /*@__PURE__*/ proxyCustomElement(class WppIconEye extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-eye component is deprecated. Please, use wpp-icon-eye-on instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-eye", width: this.width, height: this.height, size: this.size, color: this.color }, h("g", { "clip-path": "url(#clip0_876_729)" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.99464 3.625C5.23474 3.625 1.01208 6.94546 -0.101271 11.2714C-0.204512 11.6725 0.0369846 12.0814 0.438126 12.1847C0.839267 12.2879 1.24815 12.0464 1.35139 11.6453C2.29054 7.99621 5.90455 5.125 9.99464 5.125C14.0857 5.125 17.7098 7.99717 18.6487 11.6453C18.752 12.0464 19.1609 12.2879 19.562 12.1847C19.9631 12.0814 20.2046 11.6725 20.1014 11.2714C18.9878 6.9445 14.7535 3.625 9.99464 3.625ZM7.34875 11.1105C7.34875 9.64575 8.53613 8.45837 10.0008 8.45837C11.4655 8.45837 12.6529 9.64575 12.6529 11.1105C12.6529 12.5752 11.4655 13.7625 10.0008 13.7625C8.53613 13.7625 7.34875 12.5752 7.34875 11.1105ZM10.0008 6.95837C7.70771 6.95837 5.84875 8.81733 5.84875 11.1105C5.84875 13.4036 7.70771 15.2625 10.0008 15.2625C12.294 15.2625 14.1529 13.4036 14.1529 11.1105C14.1529 8.81733 12.294 6.95837 10.0008 6.95837Z", fill: "currentColor" })), h("defs", null, h("clipPath", { id: "clip0_876_729" }, h("rect", { width: "20", height: "20", fill: "white" })))));
  }
  static get registryIs() { return "wpp-icon-eye-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-eye", "wpp-icon-eye-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-eye-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-eye-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEye$1);
      }
      break;
  } });
}

const WppIconEye = WppIconEye$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconEye, defineCustomElement };
