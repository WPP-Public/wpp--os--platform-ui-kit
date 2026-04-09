import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconVideoClip = /*@__PURE__*/ proxyCustomElement(class WppIconVideoClip extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-video-clip", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8 7.90744V12.0928C8 12.5484 8.48794 12.8378 8.88778 12.6192L12.7167 10.5263C13.133 10.2988 13.133 9.70088 12.7166 9.47336L8.88773 7.38093C8.48789 7.16243 8 7.4518 8 7.90744ZM4.6 2.7998C3.16406 2.7998 2 3.96386 2 5.3998V14.5998C2 16.0357 3.16406 17.1998 4.6 17.1998H15.4C16.8359 17.1998 18 16.0357 18 14.5998V5.3998C18 3.96386 16.8359 2.7998 15.4 2.7998H4.6ZM3.2 5.3998C3.2 4.62661 3.8268 3.9998 4.6 3.9998H15.4C16.1732 3.9998 16.8 4.62661 16.8 5.3998V14.5998C16.8 15.373 16.1732 15.9998 15.4 15.9998H4.6C3.8268 15.9998 3.2 15.373 3.2 14.5998V5.3998Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-video-clip-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-video-clip", "wpp-icon-video-clip-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-video-clip-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-video-clip-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconVideoClip);
      }
      break;
  } });
}

export { WppIconVideoClip as W, defineCustomElement as d };
