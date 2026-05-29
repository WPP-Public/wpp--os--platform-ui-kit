import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$6 } from './wpp-icon-error2.js';
import { d as defineCustomElement$5 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$4 } from './wpp-internal-label2.js';
import { d as defineCustomElement$3 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppLabelCss = ".sc-wpp-label-h{display:-ms-flexbox;display:flex}.sc-wpp-label-h .internal-label-wrapper.sc-wpp-label{display:-ms-flexbox;display:flex;margin:0}";

const WppLabel = /*@__PURE__*/ proxyCustomElement(class WppLabel extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.hostCssClasses = () => ({
      'wpp-label': true,
    });
    this.renderContent = () => (h("wpp-internal-label-v4-1-0", { labelText: this.config?.text, description: this.config?.description, optional: this.optional, typography: this.typography, disabled: this.disabled, locales: this.config?.locales, tooltipConfig: this.tooltipConfig, part: "content", id: this.labelId }, this.config?.icon && h(transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })));
    this.description = undefined;
    this.htmlFor = undefined;
    this.optional = false;
    this.typography = 's-strong';
    this.disabled = false;
    this.config = undefined;
    this.tag = 'label';
    this.tooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelId = undefined;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, content, icon" }, h(this.tag, { class: "internal-label-wrapper", part: "wrapper", ...(this.tag === 'label' && { htmlFor: this.htmlFor, 'aria-label': this.htmlFor }) }, this.renderContent())));
  }
  static get registryIs() { return "wpp-label-v4-1-0"; }
  static get style() { return wppLabelCss; }
}, [2, "wpp-label", "wpp-label-v4-1-0", {
    "description": [1],
    "htmlFor": [1, "html-for"],
    "optional": [4],
    "typography": [1],
    "disabled": [516],
    "config": [1040],
    "tag": [1],
    "tooltipConfig": [16],
    "labelId": [1, "label-id"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-label-v4-1-0", "wpp-icon-error-v4-1-0", "wpp-icon-warning-v4-1-0", "wpp-internal-label-v4-1-0", "wpp-internal-tooltip-v4-1-0", "wpp-tooltip-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-label-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppLabel);
      }
      break;
    case "wpp-icon-error-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-label-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-internal-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppLabel as W, defineCustomElement as d };
