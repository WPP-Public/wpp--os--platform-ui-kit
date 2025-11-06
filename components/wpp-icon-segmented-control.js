import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSegmentedControl$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSegmentedControl extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-segmented-control", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15 5H5C3.34315 5 2 6.34315 2 8V12C2 13.6569 3.34315 15 5 15H15C16.6569 15 18 13.6569 18 12V8C18 6.34315 16.6569 5 15 5ZM3.5 8C3.5 7.17157 4.17157 6.5 5 6.5H9.25V13.5H5C4.17157 13.5 3.5 12.8284 3.5 12V8ZM10.75 13.5H15C15.8284 13.5 16.5 12.8284 16.5 12V8C16.5 7.17157 15.8284 6.5 15 6.5H10.75V13.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-segmented-control-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-segmented-control", "wpp-icon-segmented-control-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-segmented-control-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-segmented-control-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSegmentedControl$1);
      }
      break;
  } });
}

const WppIconSegmentedControl = WppIconSegmentedControl$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSegmentedControl, defineCustomElement };
