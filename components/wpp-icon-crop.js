import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCrop$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCrop extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-crop", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.20837 1.54163C5.62259 1.54163 5.95837 1.87741 5.95837 2.29163V12.7083C5.95837 13.4445 6.5555 14.0416 7.29171 14.0416H14.7916H17.7084C18.1226 14.0416 18.4584 14.3774 18.4584 14.7916C18.4584 15.2058 18.1226 15.5416 17.7084 15.5416H15.5416V17.7083C15.5416 18.1225 15.2058 18.4583 14.7916 18.4583C14.3774 18.4583 14.0416 18.1225 14.0416 17.7083V15.5416H7.29171C5.72708 15.5416 4.45837 14.2729 4.45837 12.7083V5.95837H2.29163C1.87741 5.95837 1.54163 5.62259 1.54163 5.20837C1.54163 4.79416 1.87741 4.45837 2.29163 4.45837H4.45837V2.29163C4.45837 1.87741 4.79416 1.54163 5.20837 1.54163ZM6.66663 5.95837H12.7083C13.4445 5.95837 14.0416 6.5555 14.0416 7.29171V13.3334H15.5416V7.29171C15.5416 5.72708 14.2729 4.45837 12.7083 4.45837H6.66663V5.95837Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-crop-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-crop", "wpp-icon-crop-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-crop-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-crop-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCrop$1);
      }
      break;
  } });
}

const WppIconCrop = WppIconCrop$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCrop, defineCustomElement };
