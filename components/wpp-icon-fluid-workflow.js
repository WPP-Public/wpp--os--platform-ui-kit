import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFluidWorkflow$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFluidWorkflow extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-fluid-workflow", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.75 2H6.25C7.2165 2 8 2.7835 8 3.75V6.25C8 7.2165 7.2165 8 6.25 8H3.75C2.7835 8 2 7.2165 2 6.25V3.75C2 2.7835 2.7835 2 3.75 2ZM3.75 3.5C3.61193 3.5 3.5 3.61193 3.5 3.75V6.25C3.5 6.38807 3.61193 6.5 3.75 6.5H6.25C6.38807 6.5 6.5 6.38807 6.5 6.25V3.75C6.5 3.61193 6.38807 3.5 6.25 3.5H3.75Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 10H16C17.1046 10 18 10.8954 18 12V16C18 17.1046 17.1046 18 16 18H12C10.8954 18 10 17.1046 10 16V12C10 10.8954 10.8954 10 12 10ZM12 11.5C11.7239 11.5 11.5 11.7239 11.5 12V16C11.5 16.2761 11.7239 16.5 12 16.5H16C16.2761 16.5 16.5 16.2761 16.5 16V12C16.5 11.7239 16.2761 11.5 16 11.5H12Z", fill: "currentColor" }), h("path", { d: "M9 4.25V5.75H12.75C13.0261 5.75 13.25 5.97386 13.25 6.25V9H14.75V6.25C14.75 5.14543 13.8546 4.25 12.75 4.25H9Z", fill: "currentColor" }), h("path", { d: "M9 13.25V14.75H6.25C5.14543 14.75 4.25 13.8546 4.25 12.75V9H5.75V12.75C5.75 13.0261 5.97386 13.25 6.25 13.25H9Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-fluid-workflow-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-fluid-workflow", "wpp-icon-fluid-workflow-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-fluid-workflow-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-fluid-workflow-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFluidWorkflow$1);
      }
      break;
  } });
}

const WppIconFluidWorkflow = WppIconFluidWorkflow$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFluidWorkflow, defineCustomElement };
