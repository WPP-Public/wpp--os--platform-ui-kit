import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$8 } from './wpp-icon-error2.js';
import { d as defineCustomElement$7 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$6 } from './wpp-internal-label2.js';
import { d as defineCustomElement$5 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$4 } from './wpp-label2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppPillGroupCss = ":host{--pill-group-item-margin:var(--wpp-pill-group-item-margin, 0 8px 0 0);--pill-group-label-margin:var(--wpp-pill-group-label-margin, 0 0 8px 0);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--pill-group-label-margin)}:host .pills-wrapper{display:-ms-inline-flexbox;display:inline-flex}:host .pills-wrapper ::slotted(.wpp-pill:not(:last-child)){margin:var(--pill-group-item-margin)}";

const WppPillGroup$1 = /*@__PURE__*/ proxyCustomElement(class WppPillGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.setPillsSize = (size) => {
      this.host.querySelectorAll(transformToVersionedTag('wpp-pill')).forEach(pill => {
        pill.setAttribute('size', size);
      });
    };
    this.setActivePill = (initValue) => {
      const value = Array.isArray(initValue) ? initValue : [initValue];
      this.host.querySelectorAll(transformToVersionedTag('wpp-pill')).forEach(pill => {
        pill.setAttribute('checked', value.includes(pill.value) ? 'true' : 'false');
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-pill-group': true,
    });
    this.name = undefined;
    this.size = 'm';
    this.value = undefined;
    this.type = undefined;
    this.required = false;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  handleClick(event) {
    const isMultiple = this.type === 'multiple';
    if (isMultiple) {
      const currentValue = this.value || [];
      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => element !== event.detail.value);
    }
    else {
      this.value = event.detail.value;
    }
    this.wppChange.emit({
      value: this.value,
      name: this.name,
    });
  }
  onValueChange(newValue) {
    this.setActivePill(newValue);
  }
  onUpdateSize(newSize) {
    this.setPillsSize(newSize);
  }
  componentDidLoad() {
    this.setPillsSize(this.size);
    if (this.value) {
      this.setActivePill(this.value);
    }
  }
  render() {
    return (h(Host, { "aria-multiselectable": this.type === 'multiple', "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, class: this.hostCssClasses(), exportparts: "label, content, inner" }, this.labelConfig?.text && (h("wpp-label-v3-6-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: "pills-wrapper", part: "content" }, h("slot", { part: "inner" }))));
  }
  static get registryIs() { return "wpp-pill-group-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"],
    "size": ["onUpdateSize"]
  }; }
  static get style() { return wppPillGroupCss; }
}, [1, "wpp-pill-group", "wpp-pill-group-v3-6-0", {
    "name": [1],
    "size": [1],
    "value": [1032],
    "type": [1],
    "required": [516],
    "labelConfig": [1040],
    "labelTooltipConfig": [16]
  }, [[2, "wppClick", "handleClick"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-pill-group-v3-6-0", "wpp-icon-error-v3-6-0", "wpp-icon-warning-v3-6-0", "wpp-internal-label-v3-6-0", "wpp-internal-tooltip-v3-6-0", "wpp-label-v3-6-0", "wpp-tooltip-v3-6-0", "wpp-typography-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-pill-group-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPillGroup$1);
      }
      break;
    case "wpp-icon-error-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-warning-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppPillGroup = WppPillGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WppPillGroup, defineCustomElement };
