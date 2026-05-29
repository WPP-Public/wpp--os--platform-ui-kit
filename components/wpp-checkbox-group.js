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

const wppCheckboxGroupCss = ":host .group-container{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .group-container .content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .group-container .content.direction-row{gap:20px;-ms-flex-direction:row;flex-direction:row}:host .label .wpp-internal-label::part(info-wrapper){cursor:default}";

const WppCheckboxGroup$1 = /*@__PURE__*/ proxyCustomElement(class WppCheckboxGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.items = [];
    this.getCheckboxElements = () => {
      setTimeout(() => {
        this.items = Array.from(this.host.querySelectorAll('.wpp-checkbox'));
        this.items.forEach((checkbox) => {
          checkbox.checked = this.value.includes(checkbox.value);
          checkbox.required = true;
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
      'wpp-checkbox-group': true,
    });
    this.contentCssClasses = () => ({
      content: true,
      [`direction-${this.direction}`]: true,
    });
    this.value = [];
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
  componentDidLoad() {
    this.getCheckboxElements();
  }
  updateValue(value) {
    this.items.forEach(item => {
      item.checked = value.includes(item.value);
    });
  }
  onClickCheckbox(event) {
    const value = event.detail.value;
    if (this.value.includes(value)) {
      this.value = [...this.value.filter(item => item !== value)];
    }
    else {
      this.value = [...this.value, value];
    }
    this.wppChange.emit({ value: this.value });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, h("div", { class: "group-container", role: "group", "aria-labelledby": this.ariaProps.labelledby, ...(!!this.message && this.ariaProps.describedby ? { 'aria-describedby': this.ariaProps.describedby } : {}) }, this.labelConfig?.text && (h("wpp-label-v4-1-0", { class: "label", tag: "legend", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, id: this.ariaProps.labelledby })), h("div", { class: this.contentCssClasses(), style: this.gap ? { gap: `${this.gap}px` } : {} }, h("slot", { onSlotchange: this.getCheckboxElements, part: "inner" })), !!this.message && (h("wpp-inline-message-v4-1-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, id: this.ariaProps.describedby })))));
  }
  static get registryIs() { return "wpp-checkbox-group-v4-1-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["updateValue"]
  }; }
  static get style() { return wppCheckboxGroupCss; }
}, [1, "wpp-checkbox-group", "wpp-checkbox-group-v4-1-0", {
    "value": [1040],
    "required": [516],
    "message": [1],
    "messageType": [1, "message-type"],
    "direction": [513],
    "maxMessageLength": [2, "max-message-length"],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "ariaProps": [16],
    "gap": [2]
  }, [[2, "wppClickCheckbox", "onClickCheckbox"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-checkbox-group-v4-1-0", "wpp-action-button-v4-1-0", "wpp-icon-cross-v4-1-0", "wpp-icon-error-v4-1-0", "wpp-icon-info-message-v4-1-0", "wpp-icon-success-v4-1-0", "wpp-icon-warning-v4-1-0", "wpp-inline-message-v4-1-0", "wpp-internal-label-v4-1-0", "wpp-internal-tooltip-v4-1-0", "wpp-label-v4-1-0", "wpp-spinner-v4-1-0", "wpp-tooltip-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-checkbox-group-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppCheckboxGroup$1);
      }
      break;
    case "wpp-action-button-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-cross-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppCheckboxGroup = WppCheckboxGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WppCheckboxGroup, defineCustomElement };
