import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLockOn$1 = /*@__PURE__*/ proxyCustomElement(class WppIconLockOn extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-lock-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 14C10.8284 14 11.5 13.3284 11.5 12.5C11.5 11.6716 10.8284 11 10 11C9.17157 11 8.5 11.6716 8.5 12.5C8.5 13.3284 9.17157 14 10 14Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M13.5 5V6.5H15C16.1046 6.5 17 7.39543 17 8.5V16.5C17 17.6046 16.1046 18.5 15 18.5H5C3.89543 18.5 3 17.6046 3 16.5V8.5C3 7.39543 3.89543 6.5 5 6.5H6.5V5C6.5 4.54037 6.59053 4.08525 6.76642 3.66061C6.94231 3.23597 7.20012 2.85013 7.52513 2.52513C7.85013 2.20012 8.23597 1.94231 8.66061 1.76642C9.08525 1.59053 9.54037 1.5 10 1.5C10.4596 1.5 10.9148 1.59053 11.3394 1.76642C11.764 1.94231 12.1499 2.20012 12.4749 2.52513C12.7999 2.85013 13.0577 3.23597 13.2336 3.66061C13.4095 4.08525 13.5 4.54037 13.5 5ZM10 3C10.2626 3 10.5227 3.05173 10.7654 3.15224C11.008 3.25275 11.2285 3.40007 11.4142 3.58579C11.5999 3.7715 11.7472 3.99198 11.8478 4.23463C11.9483 4.47728 12 4.73736 12 5V6.5H8V5C8 4.73736 8.05173 4.47728 8.15224 4.23463C8.25275 3.99198 8.40007 3.7715 8.58579 3.58579C8.7715 3.40007 8.99198 3.25275 9.23463 3.15224C9.47728 3.05173 9.73736 3 10 3ZM5 8C4.72386 8 4.5 8.22386 4.5 8.5V16.5C4.5 16.7761 4.72386 17 5 17H15C15.2761 17 15.5 16.7761 15.5 16.5V8.5C15.5 8.22386 15.2761 8 15 8H5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-lock-on-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-lock-on", "wpp-icon-lock-on-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-lock-on-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-lock-on-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconLockOn$1);
      }
      break;
  } });
}

const WppIconLockOn = WppIconLockOn$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconLockOn, defineCustomElement };
