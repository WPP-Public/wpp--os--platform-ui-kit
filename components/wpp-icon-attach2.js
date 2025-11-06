import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAttach = /*@__PURE__*/ proxyCustomElement(class WppIconAttach extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-attach", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.1684 2.93753C12.0146 1.0913 15.0078 1.0913 16.854 2.93753C18.7003 4.78375 18.7003 7.77696 16.854 9.62319L8.91987 17.5574C7.70656 18.7707 5.73919 18.7707 4.52588 17.5574C3.31257 16.344 3.31257 14.3767 4.52588 13.1634L10.928 6.76128C11.2209 6.46838 11.6957 6.46838 11.9886 6.76128C12.2815 7.05417 12.2815 7.52904 11.9886 7.82194L5.58654 14.224C4.95902 14.8515 4.95902 15.8692 5.58654 16.4967C6.21406 17.1242 7.23169 17.1242 7.85921 16.4967L15.7934 8.56253C17.0538 7.30209 17.0538 5.25863 15.7934 3.99819C14.5329 2.73775 12.4895 2.73775 11.229 3.99819L2.82196 12.4053C2.52906 12.6982 2.05419 12.6982 1.7613 12.4053C1.4684 12.1124 1.4684 11.6375 1.7613 11.3446L10.1684 2.93753Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-attach-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-attach", "wpp-icon-attach-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-attach-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-attach-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAttach);
      }
      break;
  } });
}

export { WppIconAttach as W, defineCustomElement as d };
