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

const wppRadioGroupCss = ":host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .label .wpp-internal-label::part(info-wrapper){cursor:default}";

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
      }, 0);
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
    this.value = undefined;
    this.required = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  componentDidLoad() {
    this.checkRadioElements();
  }
  updateValue(value) {
    this.items.forEach(item => {
      item.checked = item.value === value;
    });
  }
  onClickRadioButton(event) {
    const value = event.detail.value;
    if (this.value !== value) {
      this.value = value;
      this.wppChange.emit({ value });
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-multiselectable": "false", "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: "label", typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("slot", { onSlotchange: this.checkRadioElements, part: "inner" }), !!this.message && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))));
  }
  static get registryIs() { return "wpp-radio-group-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["updateValue"]
  }; }
  static get style() { return wppRadioGroupCss; }
}, [1, "wpp-radio-group", "wpp-radio-group-v2-22-0", {
    "value": [1032],
    "required": [516],
    "message": [1],
    "messageType": [1, "message-type"],
    "maxMessageLength": [2, "max-message-length"],
    "labelConfig": [1040],
    "labelTooltipConfig": [16]
  }, [[2, "wppClickRadio", "onClickRadioButton"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-radio-group-v2-22-0", "wpp-action-button-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-icon-error-v2-22-0", "wpp-icon-info-message-v2-22-0", "wpp-icon-success-v2-22-0", "wpp-icon-warning-v2-22-0", "wpp-inline-message-v2-22-0", "wpp-internal-label-v2-22-0", "wpp-internal-tooltip-v2-22-0", "wpp-label-v2-22-0", "wpp-spinner-v2-22-0", "wpp-tooltip-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-radio-group-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRadioGroup$1);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppRadioGroup = WppRadioGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WppRadioGroup, defineCustomElement };
