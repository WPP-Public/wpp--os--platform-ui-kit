'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppCheckboxGroupCss = ":host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .label .wpp-internal-label::part(info-wrapper){cursor:default}";

const WppCheckboxGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
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
    this.value = [];
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
    return (index.h(index.Host, { class: this.hostCssClasses(), "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, this.labelConfig?.text && (index.h("wpp-label-v2-22-0", { class: "label", typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), index.h("slot", { onSlotchange: this.getCheckboxElements, part: "inner" }), !!this.message && (index.h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))));
  }
  static get registryIs() { return "wpp-checkbox-group-v2-22-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["updateValue"]
  }; }
};
WppCheckboxGroup.style = wppCheckboxGroupCss;

exports.wpp_checkbox_group = WppCheckboxGroup;
