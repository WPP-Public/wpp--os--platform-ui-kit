import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ResizeDirectionIconPath;
(function (ResizeDirectionIconPath) {
  ResizeDirectionIconPath["horizontal"] = "M6.65508 6.57355C6.94812 6.28079 6.94834 5.80592 6.65558 5.51289C6.36283 5.21986 5.88795 5.21963 5.59492 5.51239L1.42695 9.67646C1.28619 9.81709 1.20708 10.0079 1.20703 10.2069C1.20698 10.4058 1.28601 10.5967 1.4267 10.7374L5.59467 14.9053C5.88757 15.1982 6.36244 15.1982 6.65533 14.9053C6.94823 14.6124 6.94823 14.1376 6.65533 13.8447L3.76769 10.957H17.2323L14.3447 13.8447C14.0518 14.1376 14.0518 14.6124 14.3447 14.9053C14.6376 15.1982 15.1124 15.1982 15.4053 14.9053L19.5733 10.7374C19.714 10.5967 19.793 10.4058 19.793 10.2069C19.7929 10.0079 19.7138 9.81709 19.5731 9.67646L15.4051 5.51239C15.1121 5.21963 14.6372 5.21986 14.3444 5.51289C14.0517 5.80592 14.0519 6.28079 14.3449 6.57355L17.2311 9.45703H3.7689L6.65508 6.57355Z";
  ResizeDirectionIconPath["vertical"] = "M9.79315 0.707031C9.99212 0.707078 10.1829 0.786189 10.3236 0.92695L14.4876 5.09492C14.7804 5.38795 14.7801 5.86283 14.4871 6.15558C14.1941 6.44834 13.7192 6.44812 13.4265 6.15508L10.543 3.26889V16.7311L13.4265 13.8449C13.7192 13.5519 14.1941 13.5517 14.4871 13.8444C14.7801 14.1372 14.7804 14.6121 14.4876 14.9051L10.3255 19.0711C10.1896 19.2081 10.0012 19.293 9.79297 19.293C9.5845 19.293 9.39589 19.2079 9.25996 19.0706L5.09467 14.9053C4.80178 14.6124 4.80178 14.1376 5.09467 13.8447C5.38756 13.5518 5.86244 13.5518 6.15533 13.8447L9.04297 16.7323V3.26769L6.15533 6.15533C5.86244 6.44823 5.38756 6.44823 5.09467 6.15533C4.80178 5.86244 4.80178 5.38757 5.09467 5.09467L9.26264 0.926701C9.40334 0.786006 9.59417 0.706985 9.79315 0.707031Z";
})(ResizeDirectionIconPath || (ResizeDirectionIconPath = {}));
const WppIconResize$1 = /*@__PURE__*/ proxyCustomElement(class WppIconResize extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'vertical';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-resize", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: ResizeDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-resize-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-resize", "wpp-icon-resize-v3-4-0", {
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
  const components = ["wpp-icon-resize-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-resize-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconResize$1);
      }
      break;
  } });
}

const WppIconResize = WppIconResize$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconResize, defineCustomElement };
