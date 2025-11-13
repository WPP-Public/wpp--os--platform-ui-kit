import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { W as WrappedSlot } from './WrappedSlot.js';
import { g as getSlotEmptyStates, e as truncate } from './utils.js';
import { d as defineCustomElement$5 } from './wpp-icon-error2.js';
import { d as defineCustomElement$4 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$3 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppTagCss = ":host{--tag-height:var(--wpp-tag-height, 24px);--tag-padding:var(--wpp-tag-padding, 2px 8px);--tag-with-icon-padding:var(--wpp-tag-with-icon-padding, 2px 8px 2px 6px);--tag-bg-opacity:var(--wpp-tag-bg-opacity, 1);--tag-border-radius:var(--wpp-tag-border-radius, var(--wpp-border-radius-xs));--tag-icon-margin:var(--wpp-tag-icon-margin, 0 4px 0 0);--tag-typography-color:var(--wpp-tag-typography-color, var(--wpp-grey-color-1000));--tag-icon-color:var(--wpp-tag-icon-color, var(--wpp-grey-color-900));--tag-neutral-color:var(--wpp-tag-neutral-color, var(--wpp-dataviz-color-seq-grey-600));--tag-neutral-bg-color:var(--wpp-tag-neutral-bg-color, var(--wpp-grey-color-300));--tag-neutral-bg-opacity:var(--wpp-tag-neutral-bg-opacity, 0.25);--tag-warning-color:var(--wpp-tag-warning-color, var(--wpp-dataviz-color-seq-warning-600));--tag-warning-bg-color:var(--wpp-tag-warning-bg-color, var(--wpp-warning-color-200));--tag-warning-bg-opacity:var(--wpp-tag-warning-bg-opacity, 0.25);--tag-positive-color:var(--wpp-tag-positive-color, var(--wpp-dataviz-color-seq-positive-600));--tag-positive-bg-color:var(--wpp-tag-positive-bg-color, var(--wpp-success-color-200));--tag-positive-bg-opacity:var(--wpp-tag-positive-bg-opacity, 0.25);--tag-negative-color:var(--wpp-tag-negative-color, var(--wpp-dataviz-color-seq-negative-600));--tag-negative-bg-color:var(--wpp-tag-negative-bg-color, var(--wpp-danger-color-200));--tag-negative-bg-opacity:var(--wpp-tag-negative-bg-opacity, 0.25);--tag-disabled-opacity:var(--wpp-tag-disabled-opacity, 0.4);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--tag-height);padding:var(--tag-padding);overflow:hidden;border-radius:var(--tag-border-radius)}:host{--wpp-typography-color:var(--tag-typography-color);--wpp-icon-color:var(--tag-icon-color);background-color:var(--wpp-white-color);position:relative}:host .icon-start ::slotted(*){color:var(--tag-icon-color);mix-blend-mode:plus-darker}:host(.wpp-warning) .overlay{background-color:var(--tag-warning-bg-color)}:host(.wpp-positive) .overlay{background-color:var(--tag-positive-bg-color)}:host(.wpp-negative) .overlay{background-color:var(--tag-negative-bg-color)}:host(.wpp-Cat-1) .overlay{background-color:var(--wpp-dataviz-color-cat-light-1)}:host(.wpp-Cat-2) .overlay{background-color:var(--wpp-dataviz-color-cat-light-2)}:host(.wpp-Cat-3) .overlay{background-color:var(--wpp-dataviz-color-cat-light-3)}:host(.wpp-Cat-4) .overlay{background-color:var(--wpp-dataviz-color-cat-light-4)}:host(.wpp-Cat-5) .overlay{background-color:var(--wpp-dataviz-color-cat-light-5)}:host(.wpp-Cat-6) .overlay{background-color:var(--wpp-dataviz-color-cat-light-6)}:host(.wpp-Cat-7) .overlay{background-color:var(--wpp-dataviz-color-cat-light-7)}:host(.wpp-Cat-8) .overlay{background-color:var(--wpp-dataviz-color-cat-light-8)}:host(.wpp-Cat-9) .overlay{background-color:var(--wpp-dataviz-color-cat-light-9)}:host(.wpp-with-icon){padding:var(--tag-with-icon-padding)}:host(.wpp-with-icon) .icon-start{z-index:1;display:-ms-flexbox;display:flex;margin:var(--tag-icon-margin)}.wpp-typography{z-index:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;mix-blend-mode:plus-darker}.wpp-typography::part(typography){mix-blend-mode:plus-darker}.icon-start.slot-hidden{display:none}.overlay{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:var(--tag-border-radius);opacity:var(--tag-bg-opacity)}.categorical-overlay{opacity:0.4}:host(.wpp-neutral) .overlay{background-color:var(--tag-neutral-bg-color);opacity:0.6}:host(.wpp-disabled){opacity:var(--tag-disabled-opacity)}";

const WppTag = /*@__PURE__*/ proxyCustomElement(class WppTag extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.hostCssClasses = () => ({
      'wpp-tag': true,
      ...(this.variant && { [`wpp-${this.variant}`]: true }),
      ...(this.categoricalColorIndex && !this.variant ? { [`wpp-Cat-${this.categoricalColorIndex}`]: true } : {}),
      'wpp-with-icon': Boolean(this.hasIconStartSlot),
      'wpp-disabled': this.disabled,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.hasIconStartSlot = false;
    this.variant = undefined;
    this.maxLabelLength = 30;
    this.tooltipConfig = {};
    this.label = undefined;
    this.categoricalColorIndex = undefined;
    this.withIcon = false;
    this.disabled = false;
  }
  componentWillLoad() {
    this.updateSlotData();
    if (this.categoricalColorIndex) {
      console.warn('%cThe `categoricalColorIndex` property is deprecated. Please, use `variant` instead', 'color: black; font-size: 12px;');
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, tooltip, tooltip-text, icon-start, overlay" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("wpp-typography-v3-3-1", { type: "xs-midi", tag: "span", part: "label" }, Number(this.label?.length) > this.maxLabelLength ? (h("wpp-tooltip-v3-3-1", { text: this.label, config: this.tooltipConfig, part: "tooltip" }, h("span", { part: "tooltip-text" }, truncate(this.label, this.maxLabelLength, false)))) : (this.label)), h("div", { class: `overlay ${this.variant?.includes('Cat-') ? 'categorical-overlay' : ''}`, part: "overlay" })));
  }
  static get registryIs() { return "wpp-tag-v3-3-1"; }
  get host() { return this; }
  static get style() { return wppTagCss; }
}, [1, "wpp-tag", "wpp-tag-v3-3-1", {
    "variant": [1],
    "maxLabelLength": [2, "max-label-length"],
    "tooltipConfig": [16],
    "label": [1],
    "categoricalColorIndex": [2, "categorical-color-index"],
    "withIcon": [4, "with-icon"],
    "disabled": [516],
    "hasIconStartSlot": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-tag-v3-3-1", "wpp-icon-error-v3-3-1", "wpp-icon-warning-v3-3-1", "wpp-internal-tooltip-v3-3-1", "wpp-tooltip-v3-3-1", "wpp-typography-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tag-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTag);
      }
      break;
    case "wpp-icon-error-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-warning-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-internal-tooltip-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppTag as W, defineCustomElement as d };
