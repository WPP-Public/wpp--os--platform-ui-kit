import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFastForward = /*@__PURE__*/ proxyCustomElement(class WppIconFastForward extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-fast-forward", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.9028 3.85156C12.5486 3.38603 11.7782 3.609 11.7778 4.25684V15.7432C11.7782 16.3916 12.549 16.6141 12.9028 16.1475L17.2651 10.3945C17.4456 10.1565 17.445 9.82167 17.2642 9.58398L12.9028 3.85156ZM5.7251 3.85156C5.37084 3.38603 4.60048 3.609 4.6001 4.25684V15.7432C4.60047 16.3916 5.37227 16.6141 5.72607 16.1475L10.0884 10.3945C10.2687 10.1565 10.2681 9.82161 10.0874 9.58398L5.7251 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get registryIs() { return "wpp-icon-fast-forward-v4-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-fast-forward", "wpp-icon-fast-forward-v4-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-fast-forward-v4-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-fast-forward-v4-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFastForward);
      }
      break;
  } });
}

export { WppIconFastForward as W, defineCustomElement as d };
