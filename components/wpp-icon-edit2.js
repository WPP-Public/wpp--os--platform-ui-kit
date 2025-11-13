import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEdit = /*@__PURE__*/ proxyCustomElement(class WppIconEdit extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-edit", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.0897 3.90964C15.4885 3.30811 14.5115 3.30811 13.9102 3.90964L4.68759 13.1318C4.67696 13.1425 4.67015 13.1545 4.66657 13.1671L3.80039 16.1996L6.83048 15.334C6.84549 15.3297 6.8584 15.3218 6.86777 15.3124L16.0898 6.08995C16.6919 5.48784 16.6918 4.51175 16.0897 3.90964ZM17.1506 2.84923C15.9635 1.66159 14.0364 1.66159 12.8493 2.84923L3.62695 12.0712C3.43686 12.2613 3.29786 12.4966 3.22391 12.7563L1.98736 17.0855C1.91255 17.3474 1.9856 17.6293 2.17819 17.8219C2.37078 18.0144 2.65264 18.0875 2.91452 18.0127L7.24489 16.7757C7.50224 16.7017 7.73786 16.5637 7.92843 16.3731L17.1505 7.1506C18.3384 5.96274 18.3384 4.03713 17.1506 2.84923Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.8403 8.4006L11.5994 5.15976L12.6601 4.0991L15.9009 7.33994L14.8403 8.4006Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-edit-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-edit", "wpp-icon-edit-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-edit-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-edit-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEdit);
      }
      break;
  } });
}

export { WppIconEdit as W, defineCustomElement as d };
