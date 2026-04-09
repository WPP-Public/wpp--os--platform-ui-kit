import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSuccess = /*@__PURE__*/ proxyCustomElement(class WppIconSuccess extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-success-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-success", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13.6067 8.89925C13.9742 8.5317 13.9742 7.93578 13.6067 7.56823C13.2391 7.20068 12.6432 7.20068 12.2757 7.56823L9.01961 10.8243L7.72433 9.52901C7.35678 9.16146 6.76086 9.16146 6.39331 9.52901C6.02576 9.89657 6.02576 10.4925 6.39331 10.86L8.35409 12.8208C8.72165 13.1884 9.31757 13.1884 9.68512 12.8208L13.6067 8.89925Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-success-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-success", "wpp-icon-success-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-success-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-success-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSuccess);
      }
      break;
  } });
}

export { WppIconSuccess as W, defineCustomElement as d };
