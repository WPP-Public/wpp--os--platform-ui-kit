import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPentagon$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPentagon extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-pentagon", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.83236 2.38224C9.53384 1.87258 10.4837 1.87259 11.1852 2.38224L17.4925 6.96472C18.1939 7.47438 18.4875 8.37778 18.2195 9.20242L15.8104 16.617C15.5424 17.4417 14.774 18 13.9069 18H6.1107C5.24361 18 4.47514 17.4417 4.2072 16.617L1.79805 9.20242C1.5301 8.37777 1.82363 7.47438 2.52512 6.96472L8.83236 2.38224ZM10.4613 3.37869C10.1915 3.18266 9.82612 3.18266 9.55631 3.37869L3.24908 7.96116C2.97927 8.15718 2.86638 8.50464 2.96943 8.82182L5.37858 16.2364C5.48164 16.5536 5.7772 16.7683 6.1107 16.7683H13.9069C14.2404 16.7683 14.5359 16.5536 14.639 16.2364L17.0481 8.82182C17.1512 8.50464 17.0383 8.15718 16.7685 7.96116L10.4613 3.37869Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pentagon-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pentagon", "wpp-icon-pentagon-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pentagon-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pentagon-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPentagon$1);
      }
      break;
  } });
}

const WppIconPentagon = WppIconPentagon$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPentagon, defineCustomElement };
