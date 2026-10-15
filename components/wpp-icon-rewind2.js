import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRewind = /*@__PURE__*/ proxyCustomElement(class WppIconRewind extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-rewind", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.09766 3.85156C7.45192 3.38603 8.22228 3.609 8.22266 4.25684V15.7432C8.22228 16.3916 7.45146 16.6141 7.09766 16.1475L2.73535 10.3945C2.55491 10.1565 2.55547 9.82167 2.73633 9.58398L7.09766 3.85156ZM14.2754 3.85156C14.6296 3.38603 15.4 3.609 15.4004 4.25684V15.7432C15.4 16.3916 14.6282 16.6141 14.2744 16.1475L9.91211 10.3945C9.73183 10.1565 9.73239 9.82161 9.91309 9.58398L14.2754 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get registryIs() { return "wpp-icon-rewind-v4-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-rewind", "wpp-icon-rewind-v4-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-rewind-v4-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-rewind-v4-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRewind);
      }
      break;
  } });
}

export { WppIconRewind as W, defineCustomElement as d };
