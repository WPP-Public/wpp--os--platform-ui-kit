import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSplit$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSplit extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'horizontal';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-split", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 10C3 9.72386 3.22386 9.5 3.5 9.5L8 9.5L8 7C8 5.89543 8.89543 5 10 5L15.2929 5L13.6464 3.35355C13.4512 3.15829 13.4512 2.84171 13.6464 2.64645C13.8417 2.45118 14.1583 2.45118 14.3536 2.64645L16.8536 5.14645C17.0488 5.34171 17.0488 5.65829 16.8536 5.85355L14.3536 8.35355C14.1583 8.54882 13.8417 8.54882 13.6464 8.35355C13.4512 8.15829 13.4512 7.84171 13.6464 7.64645L15.2929 6L10 6C9.44771 6 9 6.44771 9 7L9 13C9 13.5523 9.44772 14 10 14L15.2929 14L13.6464 12.3536C13.4512 12.1583 13.4512 11.8417 13.6464 11.6464C13.8417 11.4512 14.1583 11.4512 14.3536 11.6464L16.8536 14.1464C17.0488 14.3417 17.0488 14.6583 16.8536 14.8536L14.3536 17.3536C14.1583 17.5488 13.8417 17.5488 13.6464 17.3536C13.4512 17.1583 13.4512 16.8417 13.6464 16.6464L15.2929 15L10 15C8.89543 15 8 14.1046 8 13L8 10.5L3.5 10.5C3.22386 10.5 3 10.2761 3 10Z", fill: "currentColor", stroke: "currentColor", "stroke-width": "0.3", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-split-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-split", "wpp-icon-split-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "direction": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-split-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-split-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSplit$1);
      }
      break;
  } });
}

const WppIconSplit = WppIconSplit$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSplit, defineCustomElement };
