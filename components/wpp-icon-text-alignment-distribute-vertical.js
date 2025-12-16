import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentDistributeVertical$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTextAlignmentDistributeVertical extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-text-alignment-distribute-vertical", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.03033 14.7197C2.73744 14.4268 2.26256 14.4268 1.96967 14.7197C1.67678 15.0126 1.67678 15.4874 1.96967 15.7803L3.96967 17.7803C4.26256 18.0732 4.73744 18.0732 5.03033 17.7803L7.03033 15.7803C7.32322 15.4874 7.32322 15.0126 7.03033 14.7197C6.73744 14.4268 6.26256 14.4268 5.96967 14.7197L5.25 15.4393L5.25 2.75C5.25 2.33579 4.91421 2 4.5 2C4.08578 2 3.75 2.33579 3.75 2.75L3.75 15.4393L3.03033 14.7197ZM10 18C9.58579 18 9.25 17.6642 9.25 17.25L9.25 2.75C9.25 2.33579 9.58579 2 10 2C10.4142 2 10.75 2.33579 10.75 2.75L10.75 17.25C10.75 17.6642 10.4142 18 10 18ZM18.0303 5.28033C17.7374 5.57322 17.2626 5.57322 16.9697 5.28033L16.25 4.56066L16.25 17.25C16.25 17.6642 15.9142 18 15.5 18C15.0858 18 14.75 17.6642 14.75 17.25L14.75 4.56066L14.0303 5.28033C13.7374 5.57322 13.2626 5.57322 12.9697 5.28033C12.6768 4.98744 12.6768 4.51256 12.9697 4.21967L14.9697 2.21967C15.2626 1.92678 15.7374 1.92678 16.0303 2.21967L18.0303 4.21967C18.3232 4.51256 18.3232 4.98744 18.0303 5.28033Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-distribute-vertical-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-text-alignment-distribute-vertical", "wpp-icon-text-alignment-distribute-vertical-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-text-alignment-distribute-vertical-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-text-alignment-distribute-vertical-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTextAlignmentDistributeVertical$1);
      }
      break;
  } });
}

const WppIconTextAlignmentDistributeVertical = WppIconTextAlignmentDistributeVertical$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTextAlignmentDistributeVertical, defineCustomElement };
