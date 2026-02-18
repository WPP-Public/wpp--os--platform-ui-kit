import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSpeaker = /*@__PURE__*/ proxyCustomElement(class WppIconSpeaker extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-speaker", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.4 3.80194C12.4 2.93905 11.3804 2.48126 10.7356 3.0546L7.14235 6.24921C7.03251 6.34686 6.89066 6.40081 6.74369 6.40081H3.8C2.80589 6.40081 2 7.20669 2 8.20081V11.7991C2 12.7932 2.80589 13.5991 3.8 13.5991H6.74365C6.89063 13.5991 7.0325 13.6531 7.14234 13.7507L10.7355 16.9457C11.3804 17.5191 12.4 17.0613 12.4 16.1984V3.80194ZM7.93968 7.14602L11.2 4.24737V15.7529L7.93972 12.854C7.6102 12.561 7.18459 12.3991 6.74365 12.3991H3.8C3.46863 12.3991 3.2 12.1305 3.2 11.7991V8.20081C3.2 7.86943 3.46863 7.60081 3.8 7.60081H6.74369C7.18459 7.60081 7.61017 7.43898 7.93968 7.14602ZM15.5933 5.1198C15.8595 4.92257 16.2353 4.97855 16.4325 5.24484C17.4174 6.5745 18 8.22106 18 10.0019C18 11.7828 17.4174 13.4294 16.4325 14.7591C16.2353 15.0253 15.8595 15.0813 15.5933 14.8841C15.327 14.6869 15.271 14.3111 15.4682 14.0448C16.3052 12.9148 16.8 11.517 16.8 10.0019C16.8 8.48687 16.3052 7.08911 15.4682 5.95907C15.271 5.69278 15.327 5.31703 15.5933 5.1198ZM14.1144 7.0974C14.4058 6.93965 14.7699 7.048 14.9276 7.33941C15.3566 8.1319 15.6 9.03939 15.6 10.0019C15.6 10.9645 15.3566 11.872 14.9276 12.6645C14.7699 12.9559 14.4058 13.0642 14.1144 12.9065C13.8229 12.7487 13.7146 12.3846 13.8723 12.0932C14.2087 11.4718 14.4 10.7601 14.4 10.0019C14.4 9.24379 14.2087 8.5321 13.8723 7.91068C13.7146 7.61927 13.8229 7.25515 14.1144 7.0974Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-speaker-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-speaker", "wpp-icon-speaker-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-speaker-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-speaker-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSpeaker);
      }
      break;
  } });
}

export { WppIconSpeaker as W, defineCustomElement as d };
