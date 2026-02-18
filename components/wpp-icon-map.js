import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMap$1 = /*@__PURE__*/ proxyCustomElement(class WppIconMap extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-map", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.51304 2.99868L7.55485 2.99756L7.59552 2.99863C7.61546 2.99978 7.63544 3.00186 7.65541 3.00488L7.66969 3.00826C7.7456 3.02046 7.82104 3.04757 7.89294 3.09016L7.93904 3.11997L12.4454 6.28869L16.9489 3.12295C17.3645 2.83073 17.9278 3.09338 17.9926 3.5754L17.9988 3.66827V13.1182C17.9988 13.3042 17.9211 13.4803 17.7871 13.6054L17.7155 13.6635L12.8273 17.0998C12.5901 17.2666 12.3048 17.2527 12.0916 17.1204L7.5545 13.9286L3.04871 17.0969C2.63301 17.3891 2.06976 17.1264 2.00494 16.6444L1.99878 16.5515V7.10163C1.99878 6.91559 2.07642 6.73953 2.21041 6.61443L2.28201 6.55631L7.17027 3.11997C7.22715 3.07999 7.2868 3.05039 7.34755 3.03032L7.4564 3.00543L7.51304 2.99868ZM16.6656 4.95166L13.1105 7.45081V15.2711L16.6656 12.772V4.95166ZM6.88703 4.94869L3.33194 7.44784V15.2681L6.88703 12.769V4.94869ZM8.22227 4.94869V12.769L11.7774 15.2681V7.44784L8.22227 4.94869Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-map-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-map", "wpp-icon-map-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-map-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-map-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconMap$1);
      }
      break;
  } });
}

const WppIconMap = WppIconMap$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconMap, defineCustomElement };
