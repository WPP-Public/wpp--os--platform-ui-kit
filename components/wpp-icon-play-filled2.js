import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPlayFilled = /*@__PURE__*/ proxyCustomElement(class WppIconPlayFilled extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-play-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.23868 2.26663L17.5989 8.69445C18.614 9.2688 18.614 10.7311 17.5989 11.3055L6.23868 17.7333C5.23874 18.2991 4 17.5767 4 16.4278V3.57214C4 2.42323 5.23874 1.70085 6.23868 2.26663Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-play-filled-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-play-filled", "wpp-icon-play-filled-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-play-filled-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-play-filled-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPlayFilled);
      }
      break;
  } });
}

export { WppIconPlayFilled as W, defineCustomElement as d };
