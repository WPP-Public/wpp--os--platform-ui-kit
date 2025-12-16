import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFolder$1 = /*@__PURE__*/ proxyCustomElement(class WppIconFolder extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-folder", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.54163 3.2085C2.437 3.2085 1.54163 4.10387 1.54163 5.2085V14.7918C1.54163 15.8965 2.437 16.7918 3.54163 16.7918H16.4583C17.5629 16.7918 18.4583 15.8965 18.4583 14.7918V7.29183C18.4583 6.1872 17.5629 5.29183 16.4583 5.29183H10.0632L8.23544 3.76851C7.80109 3.40666 7.25372 3.2085 6.68829 3.2085H3.54163ZM3.04163 5.2085C3.04163 4.93229 3.26542 4.7085 3.54163 4.7085H6.68829C6.90282 4.7085 7.11052 4.78373 7.27532 4.92098L8.61996 6.04165L7.27532 7.16232L7.2752 7.16242C7.1104 7.29966 6.90282 7.3748 6.68829 7.3748H3.04163V5.2085ZM3.04163 8.8748V14.7918C3.04163 15.068 3.26542 15.2918 3.54163 15.2918H16.4583C16.7345 15.2918 16.9583 15.068 16.9583 14.7918V7.29183C16.9583 7.01563 16.7345 6.79183 16.4583 6.79183H10.0628L8.23555 8.31469L8.23544 8.31478C7.80109 8.67664 7.25372 8.8748 6.68829 8.8748H3.04163Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-folder-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-folder", "wpp-icon-folder-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-folder-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-folder-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconFolder$1);
      }
      break;
  } });
}

const WppIconFolder = WppIconFolder$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconFolder, defineCustomElement };
