import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSurprise$1 = /*@__PURE__*/ proxyCustomElement(class WppIconSurprise extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-surprise", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2.00488C14.4183 2.00488 18 5.5866 18 10.0049C18 14.4232 14.4183 18.0049 10 18.0049C5.58172 18.0049 2 14.4232 2 10.0049C2 5.5866 5.58172 2.00488 10 2.00488ZM10 3.20488C6.24446 3.20488 3.2 6.24935 3.2 10.0049C3.2 13.7604 6.24446 16.8049 10 16.8049C13.7555 16.8049 16.8 13.7604 16.8 10.0049C16.8 6.24935 13.7555 3.20488 10 3.20488ZM10 10.8012C10.9941 10.8012 11.8 11.6071 11.8 12.6012C11.8 13.5953 10.9941 14.4012 10 14.4012C9.00589 14.4012 8.2 13.5953 8.2 12.6012C8.2 11.6071 9.00589 10.8012 10 10.8012ZM7.60036 7.40211C8.15233 7.40211 8.59979 7.84957 8.59979 8.40154C8.59979 8.95351 8.15233 9.40097 7.60036 9.40097C7.04839 9.40097 6.60093 8.95351 6.60093 8.40154C6.60093 7.84957 7.04839 7.40211 7.60036 7.40211ZM12.4004 7.40211C12.9523 7.40211 13.3998 7.84957 13.3998 8.40154C13.3998 8.95351 12.9523 9.40097 12.4004 9.40097C11.8484 9.40097 11.4009 8.95351 11.4009 8.40154C11.4009 7.84957 11.8484 7.40211 12.4004 7.40211Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-surprise-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-surprise", "wpp-icon-surprise-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-surprise-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-surprise-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconSurprise$1);
      }
      break;
  } });
}

const WppIconSurprise = WppIconSurprise$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconSurprise, defineCustomElement };
