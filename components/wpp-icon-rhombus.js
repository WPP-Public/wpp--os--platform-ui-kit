import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRhombus$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRhombus extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-rhombus", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.93239 4.60189C5.21329 3.90591 5.88864 3.4502 6.63917 3.4502H17.1576C18.4622 3.4502 19.3526 4.76985 18.8644 5.9796L15.0677 15.3869C14.7868 16.0829 14.1114 16.5386 13.3609 16.5386H2.84239C1.53783 16.5386 0.64735 15.2189 1.13561 14.0092L4.93239 4.60189ZM6.63917 4.67723C6.38899 4.67723 6.16388 4.82914 6.07024 5.06113L2.27346 14.4684C2.11071 14.8717 2.40754 15.3115 2.84239 15.3115H13.3609C13.611 15.3115 13.8362 15.1596 13.9298 14.9276L17.7265 5.52037C17.8893 5.11712 17.5925 4.67723 17.1576 4.67723H6.63917Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-rhombus-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-rhombus", "wpp-icon-rhombus-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-rhombus-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-rhombus-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRhombus$1);
      }
      break;
  } });
}

const WppIconRhombus = WppIconRhombus$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRhombus, defineCustomElement };
