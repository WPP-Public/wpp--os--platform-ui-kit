import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLibraryBuilding$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLibraryBuilding extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-library-building", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.76303 1.78849C9.91698 1.73717 10.0834 1.73717 10.2374 1.78849L17.7374 4.28849C18.1303 4.41947 18.3427 4.84421 18.2117 5.23717C18.0807 5.63013 17.656 5.8425 17.263 5.71151L10.0002 3.29057L2.73737 5.71151C2.34442 5.8425 1.91968 5.63013 1.78869 5.23717C1.65771 4.84421 1.87008 4.41947 2.26303 4.28849L9.76303 1.78849Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.70092 17.25H3.50024C2.80989 17.25 2.25024 16.6904 2.25024 16V7.5C2.25024 6.80964 2.80989 6.25 3.50024 6.25H8.00024C8.78826 6.25 9.49886 6.58144 10.0002 7.11253C10.5016 6.58144 11.2122 6.25 12.0002 6.25H16.5002C17.1906 6.25 17.7502 6.80964 17.7502 7.5V16C17.7502 16.6904 17.1906 17.25 16.5002 17.25H11.2996C11.0402 17.6984 10.5555 18 10.0002 18C9.44503 18 8.96027 17.6984 8.70092 17.25ZM3.75024 15.75V7.75H8.00024C8.6906 7.75 9.25024 8.30964 9.25024 9V15.75H3.75024ZM10.7502 15.75H16.2502V7.75H12.0002C11.3099 7.75 10.7502 8.30964 10.7502 9V15.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-library-building-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-library-building", "wpp-icon-library-building-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-library-building-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-library-building-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLibraryBuilding$1);
      }
      break;
  } });
}

const WppIconLibraryBuilding = WppIconLibraryBuilding$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLibraryBuilding, defineCustomElement };
