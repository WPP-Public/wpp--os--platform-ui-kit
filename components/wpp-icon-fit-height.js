import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFitHeight$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFitHeight extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-fit-height", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.25 2C3.83579 2 3.5 2.33579 3.5 2.75C3.5 3.16421 3.83579 3.5 4.25 3.5H15.25C15.6642 3.5 16 3.16421 16 2.75C16 2.33579 15.6642 2 15.25 2H4.25ZM4.25 16.5C3.83579 16.5 3.5 16.8358 3.5 17.25C3.5 17.6642 3.83579 18 4.25 18H15.25C15.6642 18 16 17.6642 16 17.25C16 16.8358 15.6642 16.5 15.25 16.5H4.25ZM10.2803 14.7803L12.2803 12.7803C12.5732 12.4874 12.5732 12.0126 12.2803 11.7197C11.9874 11.4268 11.5126 11.4268 11.2197 11.7197L10.5 12.4393V7.56066L11.2197 8.28033C11.5126 8.57322 11.9874 8.57322 12.2803 8.28033C12.5732 7.98744 12.5732 7.51256 12.2803 7.21967L10.2803 5.21967C9.98744 4.92678 9.51256 4.92678 9.21967 5.21967L7.21967 7.21967C6.92678 7.51256 6.92678 7.98744 7.21967 8.28033C7.51256 8.57322 7.98744 8.57322 8.28033 8.28033L9 7.56066V12.4393L8.28033 11.7197C7.98744 11.4268 7.51256 11.4268 7.21967 11.7197C6.92678 12.0126 6.92678 12.4874 7.21967 12.7803L9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-fit-height-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-fit-height", "wpp-icon-fit-height-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-fit-height-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-fit-height-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFitHeight$1);
      }
      break;
  } });
}

const WppIconFitHeight = WppIconFitHeight$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFitHeight, defineCustomElement };
