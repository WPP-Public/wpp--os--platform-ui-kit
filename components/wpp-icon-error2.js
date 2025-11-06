import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconError = /*@__PURE__*/ proxyCustomElement(class WppIconError extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-danger-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-error", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.6205 2.68236L17.2903 8.25996C18.2258 9.18045 18.2377 10.6847 17.3183 11.6203L11.7398 17.2904C10.8194 18.2258 9.3149 18.238 8.37946 17.3176L2.70966 11.7396C1.77419 10.8192 1.76202 9.31476 2.68236 8.37933L8.26011 2.70963C9.18053 1.77418 10.6851 1.76203 11.6205 2.68236ZM10 5.33295C10.5198 5.33295 10.9412 5.75433 10.9412 6.27413V10.98C10.9412 11.4998 10.5198 11.9212 10 11.9212C9.4802 11.9212 9.05882 11.4998 9.05882 10.98V6.27413C9.05882 5.75433 9.4802 5.33295 10 5.33295ZM10.9412 13.7647C10.9412 14.2845 10.5198 14.7059 10 14.7059C9.4802 14.7059 9.05882 14.2845 9.05882 13.7647C9.05882 13.2449 9.4802 12.8235 10 12.8235C10.5198 12.8235 10.9412 13.2449 10.9412 13.7647Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-error-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-error", "wpp-icon-error-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-error-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconError);
      }
      break;
  } });
}

export { WppIconError as W, defineCustomElement as d };
