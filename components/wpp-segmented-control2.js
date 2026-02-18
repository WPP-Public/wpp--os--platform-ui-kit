import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$7 } from './wpp-icon-error2.js';
import { d as defineCustomElement$6 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$5 } from './wpp-internal-label2.js';
import { d as defineCustomElement$4 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-label2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppSegmentedControlCss = ":host{--sc-padding-s:var(--wpp-segmented-control-padding-s, 0);--sc-padding-m:var(--wpp-segmented-control-padding-m, 0);--sc-item-margin-s:var(--wpp-segmented-control-item-margin-s, 0);--sc-item-margin-m:var(--wpp-segmented-control-item-margin-m, 0);--sc-border-radius-s:var(--wpp-segmented-control-border-radius-s, var(--wpp-border-radius-s));--sc-border-radius-m:var(--wpp-segmented-control-border-radius-m, var(--wpp-border-radius-m));--sc-border-width:var(--wpp-segmented-control-border-width, 1px);--sc-border-style:var(--wpp-segmented-control-border-style, solid);--sc-border-color:var(--wpp-segmented-control-border-color, var(--wpp-grey-color-500));--sc-bg-color:var(--wpp-segmented-control-bg-color, transparent);--sc-label-margin:var(--wpp-segmented-control-label-margin, 0 0 8px 0);--wpp-bar-width:auto;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--sc-label-margin)}:host .wpp-bar-wrapper{display:-ms-inline-flexbox;display:inline-flex;padding:var(--sc-padding-m);background-color:var(--sc-bg-color)}:host .wpp-bar-wrapper.hug-content-off{width:var(--wpp-bar-width)}:host .wpp-bar-wrapper.size-s{padding:var(--sc-padding-s);border-radius:var(--sc-border-radius-s)}:host .wpp-bar-wrapper.size-s ::slotted(.wpp-segmented-control-item:not(:last-child)){margin-right:var(--sc-item-margin-s)}:host .wpp-bar-wrapper.size-m{padding:var(--sc-padding-m);border-radius:var(--sc-border-radius-m)}:host .wpp-bar-wrapper.size-m ::slotted(.wpp-segmented-control-item:not(:last-child)){margin-right:var(--sc-item-margin-m)}";

const WppSegmentedControl = /*@__PURE__*/ proxyCustomElement(class WppSegmentedControl extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.setSegmentedControlItemsSize = (size) => {
      this.host
        .querySelectorAll(transformToVersionedTag('wpp-segmented-control-item'))
        .forEach(item => {
        item.setAttribute('size', size);
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.cssClasses = () => ({
      'wpp-bar-wrapper': true,
      [`size-${this.size}`]: true,
      'hug-content-off': this.hugContentOff,
    });
    this.hostCssClasses = () => ({
      'wpp-segmented-control': true,
    });
    this.previousActiveElement = undefined;
    this.size = 'm';
    this.hugContentOff = false;
    this.width = 'auto';
    this.variant = 'text';
    this.required = false;
    this.value = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  handleChangeSegmentedControlItemClick(event) {
    this.value = event.detail.value;
  }
  valueChanged(newValue) {
    this.previousActiveElement?.setAttribute('active', 'false');
    const activeElement = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-segmented-control-item'))).find(item => item.value === newValue);
    activeElement?.setAttribute('active', 'true');
    this.previousActiveElement = activeElement;
    this.wppChange.emit({ value: newValue, reason: 'valueChanged' });
  }
  widthChange(newValue) {
    this.host.style.setProperty('--wpp-bar-width', newValue);
  }
  onUpdateSize(newSize) {
    this.setSegmentedControlItemsSize(newSize);
  }
  componentWillLoad() {
    this.widthChange(this.width);
    this.setSegmentedControlItemsSize(this.size);
  }
  componentDidLoad() {
    this.host
      .querySelectorAll(transformToVersionedTag('wpp-segmented-control-item'))
      .forEach(item => {
      if (item.value === this.value) {
        item.setAttribute('active', 'true');
        this.previousActiveElement = item;
      }
    });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, label", onFocus: this.onFocus, onBlur: this.onBlur }, this.labelConfig?.text && (h("wpp-label-v4-0-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.cssClasses(), role: "listbox", "aria-multiselectable": "false", "aria-required": this.required, part: "wrapper" }, h("slot", { part: "inner" }))));
  }
  static get registryIs() { return "wpp-segmented-control-v4-0-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["valueChanged"],
    "width": ["widthChange"],
    "size": ["onUpdateSize"]
  }; }
  static get style() { return wppSegmentedControlCss; }
}, [1, "wpp-segmented-control", "wpp-segmented-control-v4-0-0", {
    "size": [1],
    "hugContentOff": [516, "hug-content-off"],
    "width": [1],
    "variant": [1],
    "required": [516],
    "value": [1544],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "previousActiveElement": [32]
  }, [[2, "wppChangeSegmentedControlItem", "handleChangeSegmentedControlItemClick"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-segmented-control-v4-0-0", "wpp-icon-error-v4-0-0", "wpp-icon-warning-v4-0-0", "wpp-internal-label-v4-0-0", "wpp-internal-tooltip-v4-0-0", "wpp-label-v4-0-0", "wpp-tooltip-v4-0-0", "wpp-typography-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-segmented-control-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSegmentedControl);
      }
      break;
    case "wpp-icon-error-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-warning-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-label-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-label-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppSegmentedControl as W, defineCustomElement as d };
