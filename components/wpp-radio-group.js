import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$e } from './wpp-action-button2.js';
import { d as defineCustomElement$d } from './wpp-icon-cross2.js';
import { d as defineCustomElement$c } from './wpp-icon-error2.js';
import { d as defineCustomElement$b } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$a } from './wpp-icon-success2.js';
import { d as defineCustomElement$9 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$8 } from './wpp-inline-message2.js';
import { d as defineCustomElement$7 } from './wpp-internal-label2.js';
import { d as defineCustomElement$6 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$5 } from './wpp-label2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppRadioGroupCss = ":host .group-container{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .group-container .content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .group-container .content.direction-row{gap:20px;-ms-flex-direction:row;flex-direction:row}:host .label .wpp-internal-label::part(info-wrapper){cursor:default}";

const WppRadioGroup$1 = /*@__PURE__*/ proxyCustomElement(class WppRadioGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.items = [];
    this.checkRadioElements = () => {
      setTimeout(() => {
        this.items = Array.from(this.host.querySelectorAll('.wpp-radio'));
        this.items.forEach((radio) => {
          radio.checked = this.value === radio.value;
          radio.required = true;
        });
        this.syncTabIndexes();
      }, 0);
    };
    this.getEnabledItems = () => this.items.filter(item => !item.disabled);
    this.getCurrentNdx = (enabled) => {
      const checkedNdx = enabled.findIndex(item => item.checked);
      return checkedNdx !== -1 ? checkedNdx : 0;
    };
    this.focusAndSelect = (target) => {
      if (!target)
        return;
      const nextValue = target.value;
      if (this.value !== nextValue) {
        this.value = nextValue;
        this.wppChange.emit({ value: this.value });
      }
      this.syncTabIndexes();
      target.setFocus?.();
    };
    this.onKeyDown = (event) => {
      const enabledItems = this.getEnabledItems();
      if (enabledItems.length === 0)
        return;
      const currentNdx = this.getCurrentNdx(enabledItems);
      let nextNdx = currentNdx;
      const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const isPrevKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
      if (!isNextKey && !isPrevKey)
        return;
      event.preventDefault();
      const onFirst = currentNdx === 0;
      const onLast = currentNdx === enabledItems.length - 1;
      if (onLast && isNextKey) {
        nextNdx = 0;
      }
      else if (onFirst && isPrevKey) {
        nextNdx = enabledItems.length - 1;
      }
      else if (isNextKey) {
        nextNdx = Math.min(currentNdx + 1, enabledItems.length - 1);
      }
      else if (isPrevKey) {
        nextNdx = Math.max(currentNdx - 1, 0);
      }
      const target = enabledItems[nextNdx];
      this.focusAndSelect(target);
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-radio-group': true,
    });
    this.contentCssClasses = () => ({
      content: true,
      [`direction-${this.direction}`]: true,
    });
    this.value = undefined;
    this.required = false;
    this.message = undefined;
    this.messageType = undefined;
    this.direction = 'column';
    this.maxMessageLength = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.ariaProps = {
      labelledby: 'label-id',
      describedby: 'description-id',
    };
    this.gap = undefined;
  }
  updateValue(value) {
    this.items.forEach(item => {
      item.checked = item.value === value;
    });
    this.syncTabIndexes();
  }
  onClickRadioButton(event) {
    const value = event.detail.value;
    if (this.value !== value) {
      this.value = value;
      this.wppChange.emit({ value });
    }
    this.syncTabIndexes();
  }
  componentDidLoad() {
    this.checkRadioElements();
  }
  syncTabIndexes() {
    const enabled = this.getEnabledItems();
    if (enabled.length === 0)
      return;
    let activeIndex = enabled.findIndex(r => r.checked);
    if (activeIndex === -1)
      activeIndex = 0;
    enabled.forEach((r, i) => {
      r.index = i === activeIndex ? 0 : -1;
    });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, h("div", { class: "group-container", role: "radiogroup", "aria-labelledby": this.ariaProps.labelledby, ...(!!this.message && this.ariaProps.describedby ? { 'aria-describedby': this.ariaProps.describedby } : {}) }, this.labelConfig?.text && (h("wpp-label-v3-5-0", { class: "label", tag: "h3", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, id: this.ariaProps.labelledby })), h("div", { class: this.contentCssClasses(), style: this.gap ? { gap: `${this.gap}px` } : {} }, h("slot", { onSlotchange: this.checkRadioElements, part: "inner" })), !!this.message && (h("wpp-inline-message-v3-5-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, id: this.ariaProps.describedby })))));
  }
  static get registryIs() { return "wpp-radio-group-v3-5-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["updateValue"]
  }; }
  static get style() { return wppRadioGroupCss; }
}, [1, "wpp-radio-group", "wpp-radio-group-v3-5-0", {
    "value": [1032],
    "required": [516],
    "message": [1],
    "messageType": [1, "message-type"],
    "direction": [513],
    "maxMessageLength": [2, "max-message-length"],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "ariaProps": [16],
    "gap": [2]
  }, [[2, "wppClickRadio", "onClickRadioButton"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-radio-group-v3-5-0", "wpp-action-button-v3-5-0", "wpp-icon-cross-v3-5-0", "wpp-icon-error-v3-5-0", "wpp-icon-info-message-v3-5-0", "wpp-icon-success-v3-5-0", "wpp-icon-warning-v3-5-0", "wpp-inline-message-v3-5-0", "wpp-internal-label-v3-5-0", "wpp-internal-tooltip-v3-5-0", "wpp-label-v3-5-0", "wpp-spinner-v3-5-0", "wpp-tooltip-v3-5-0", "wpp-typography-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-radio-group-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRadioGroup$1);
      }
      break;
    case "wpp-action-button-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-cross-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppRadioGroup = WppRadioGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WppRadioGroup, defineCustomElement };
