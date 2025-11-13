import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ChevronDirectionIconPath;
(function (ChevronDirectionIconPath) {
  // @deprecated: top should be removed in 4.0.0 release
  ChevronDirectionIconPath["top"] = "M4 13L10 7L16 13";
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  ChevronDirectionIconPath["up"] = "M4 13L10 7L16 13";
  ChevronDirectionIconPath["right"] = "M8 4L14 10L8 16";
  ChevronDirectionIconPath["down"] = "M16 8L10 14L4 8";
  ChevronDirectionIconPath["left"] = "M12 16L6 10L12 4";
})(ChevronDirectionIconPath || (ChevronDirectionIconPath = {}));
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
    return (h(WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: ChevronDirectionIconPath[this.direction], stroke: "currentColor", "stroke-width": "2", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-chevron-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-chevron", "wpp-icon-chevron-v3-3-1", {
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
  const components = ["wpp-icon-chevron-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-chevron-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconChevron);
      }
      break;
  } });
}

export { WppIconChevron as W, defineCustomElement as d };
