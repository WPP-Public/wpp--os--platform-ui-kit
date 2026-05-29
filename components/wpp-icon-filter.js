import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFilter$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFilter extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-filter", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.375 3.54167C2.375 2.89745 2.89745 2.375 3.54167 2.375H16.4583C17.1025 2.375 17.625 2.89745 17.625 3.54167V4.82875C17.625 5.82447 17.1683 6.76526 16.3863 7.38156L16.3834 7.38383L16.3834 7.38383L12.2083 10.6411V14.7917C12.2083 15.0339 12.0914 15.2612 11.8943 15.402L8.9776 17.4853C8.74898 17.6486 8.44828 17.6704 8.19848 17.5419C7.94868 17.4133 7.79167 17.1559 7.79167 16.875V10.6411L3.61658 7.38383L3.61369 7.38156C2.83166 6.76526 2.375 5.82447 2.375 4.82875V3.54167ZM3.875 3.875V4.82875C3.875 5.36414 4.12032 5.87035 4.54083 6.2024L9.003 9.68367C9.18517 9.8258 9.29167 10.0439 9.29167 10.275V15.4176L10.7083 14.4057V10.275C10.7083 10.0439 10.8148 9.8258 10.997 9.68367L15.4579 6.20344C15.4583 6.20309 15.4587 6.20274 15.4592 6.20238C15.8797 5.87034 16.125 5.36413 16.125 4.82875V3.875H3.875Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-filter-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-filter", "wpp-icon-filter-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-filter-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-filter-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFilter$1);
      }
      break;
  } });
}

const WppIconFilter = WppIconFilter$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFilter, defineCustomElement };
