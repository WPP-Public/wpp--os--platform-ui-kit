import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const CHEVRON_ICON_PATH = 'M5.20921 7.21967C5.48816 6.92678 5.94042 6.92678 6.21936 7.21967L10 11.1893L13.7806 7.21967C14.0596 6.92678 14.5118 6.92678 14.7908 7.21967C15.0697 7.51256 15.0697 7.98744 14.7908 8.28033L10.5051 12.7803C10.2261 13.0732 9.77387 13.0732 9.49492 12.7803L5.20921 8.28033C4.93026 7.98744 4.93026 7.51256 5.20921 7.21967Z';
const ChevronDirectionTransform = {
  up: 'rotate(180 10 10)',
  right: 'rotate(-90 10 10)',
  down: undefined,
  left: 'rotate(90 10 10)',
};
const WppIconChevron = /*@__PURE__*/ proxyCustomElement(class WppIconChevron extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: CHEVRON_ICON_PATH, fill: "currentColor", transform: ChevronDirectionTransform[this.direction] })));
  }
  static get registryIs() { return "wpp-icon-chevron-v4-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-chevron", "wpp-icon-chevron-v4-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "direction": [513]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-chevron-v4-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-chevron-v4-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconChevron);
      }
      break;
  } });
}

export { WppIconChevron as W, defineCustomElement as d };
