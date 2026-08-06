import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { P as PRESENTATION_ROLE, G as GROUP_ROLE } from './constants.js';
import { d as defineCustomElement$3 } from './wpp-divider2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppMenuGroupCss = ":host{--menu-group-title-margin:var(--wpp-menu-group-title-margin, 8px 0 0px 8px);--menu-group-title-color:var(--wpp-menu-group-title-color, var(--wpp-grey-color-1000));--menu-group-divider-margin:var(--wpp-menu-group-divider-margin, 8px 0px 4px 0px)}.wpp-typography{display:-ms-flexbox;display:flex;margin:var(--menu-group-title-margin);color:var(--menu-group-title-color)}.wpp-divider{display:-ms-flexbox;display:flex;margin:var(--menu-group-divider-margin)}";

const WppMenuGroup$1 = /*@__PURE__*/ proxyCustomElement(class WppMenuGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hostCssClasses = () => ({
      'wpp-menu-group': true,
    });
    this.getRole = () => (this.withDivider && !this.header ? PRESENTATION_ROLE : GROUP_ROLE);
    this.header = undefined;
    this.withDivider = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: this.getRole(), "aria-label": this.header, exportparts: "header, divider" }, this.header && (h("wpp-typography-v4-3-0", { type: "2xs-strong", part: "header" }, this.header)), h("slot", null), this.withDivider && h("wpp-divider-v4-3-0", { class: "slot-divider", part: "divider" })));
  }
  static get registryIs() { return "wpp-menu-group-v4-3-0"; }
  static get style() { return wppMenuGroupCss; }
}, [1, "wpp-menu-group", "wpp-menu-group-v4-3-0", {
    "header": [1],
    "withDivider": [4, "with-divider"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-menu-group-v4-3-0", "wpp-divider-v4-3-0", "wpp-typography-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-menu-group-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppMenuGroup$1);
      }
      break;
    case "wpp-divider-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppMenuGroup = WppMenuGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WppMenuGroup, defineCustomElement };
