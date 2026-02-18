import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconWarning = /*@__PURE__*/ proxyCustomElement(class WppIconWarning extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-warning-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-warning", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.83422 2.68592L1.77378 15.024C1.26617 15.9112 1.92884 17 2.97644 17H17.0978C18.1454 17 18.808 15.9112 18.3004 15.024L11.2395 2.68592C10.716 1.77136 9.35779 1.77136 8.83422 2.68592ZM10.0374 5.75C10.5552 5.74994 10.9749 6.16963 10.975 6.68739L10.9751 11.3746L9.10014 11.3749L9.09999 6.68761C9.09993 6.16984 9.51962 5.75006 10.0374 5.75ZM10.9751 11.3746C10.9751 11.8923 10.5554 12.3125 10.0376 12.3125C9.51985 12.3125 9.10013 11.8927 9.10014 11.3749L10.9751 11.3746ZM10.9746 14.1875C10.9746 14.7053 10.5549 15.125 10.0371 15.125C9.51934 15.125 9.09961 14.7053 9.09961 14.1875C9.09961 13.6697 9.51934 13.25 10.0371 13.25C10.5549 13.25 10.9746 13.6697 10.9746 14.1875Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-warning-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-warning", "wpp-icon-warning-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-warning-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-warning-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconWarning);
      }
      break;
  } });
}

export { WppIconWarning as W, defineCustomElement as d };
