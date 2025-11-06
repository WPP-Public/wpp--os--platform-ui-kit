'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-9c925efe.js');
require('./consts-255c1066.js');

const wppCounterCss = ":host{--counter-height-size-s:var(--wpp-counter-height-size-s, 32px);--counter-height-size-m:var(--wpp-counter-height-size-m, 40px);--counter-label-margin:var(--wpp-counter-label-margin, 0 0 8px 0);--counter-input-padding:var(--wpp-counter-input-padding, calc(9px - var(--counter-border-width)) calc(12px - var(--counter-border-width)));--counter-input-width:var(--wpp-counter-input-width, 70px);--counter-input-placeholder-color:var(--wpp-counter-input-placeholder-color, var(--wpp-grey-color-500));--counter-input-text-color:var(--wpp-counter-input-text-color, var(--wpp-text-color));--counter-input-text-color-disabled:var(--wpp-counter-input-text-color-disabled, var(--wpp-text-color-disabled));--counter-increase-wrapper-padding:var(--wpp-counter-increase-wrapper-padding, calc(10px - var(--counter-border-width)) 9px calc(10px - var(--counter-border-width)) 9px);--counter-decrease-wrapper-padding:var(--wpp-counter-decrease-wrapper-padding, calc(10px - var(--counter-border-width)) 9px calc(10px - var(--counter-border-width)) 10px);--counter-border-radius:var(--wpp-counter-border-radius, var(--wpp-border-radius-m));--counter-bg-color:var(--wpp-counter-bg-color, transparent);--counter-bg-color-hover:var(--wpp-counter-bg-color-hover, var(--wpp-grey-color-200));--counter-bg-color-active:var(--wpp-counter-bg-color-active, var(--wpp-grey-color-300));--counter-bg-color-disabled:var(--wpp-counter-bg-color-disabled, var(--wpp-grey-color-100));--counter-border-color:var(--wpp-counter-border-radius, var(--wpp-grey-color-500));--counter-border-color-hover:var(--wpp-counter-border-color-hover, var(--wpp-grey-color-700));--counter-border-color-active:var(--wpp-counter-border-color-active, var(--wpp-grey-color-800));--counter-border-color-disabled:var(--wpp-counter-border-color-disabled, var(--wpp-grey-color-400));--counter-icons-color:var(--wpp-counter-icons-color, var(--wpp-icon-color));--counter-icons-color-hover:var(--wpp-counter-icons-color-hover, var(--wpp-icon-color-hover));--counter-icons-color-active:var(--wpp-counter-icons-color-active, var(--wpp-icon-color-active));--counter-icons-color-disabled:var(--wpp-counter-icons-color-disabled, var(--wpp-icon-color-disabled));--counter-border-width:var(--wpp-counter-border-radius, var(--wpp-border-width-s));--counter-border-style:var(--wpp-counter-border-style, solid);--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color));display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .label{margin:var(--counter-label-margin)}:host .counter-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row;flex-direction:row;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .counter-wrapper .increase-wrapper,:host .counter-wrapper .decrease-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;cursor:pointer}:host .counter-wrapper .increase-wrapper:hover,:host .counter-wrapper .decrease-wrapper:hover{background-color:var(--counter-bg-color-hover);border-color:var(--counter-border-color-hover)}:host .counter-wrapper .increase-wrapper:active,:host .counter-wrapper .decrease-wrapper:active{background-color:var(--counter-bg-color-active);border-color:var(--counter-border-color-active)}:host .counter-wrapper .increase-wrapper{padding:var(--counter-increase-wrapper-padding);border:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-top-right-radius:var(--counter-border-radius);border-bottom-right-radius:var(--counter-border-radius)}:host .counter-wrapper .increase-wrapper.disabled{pointer-events:none}:host .counter-wrapper .increase-wrapper.disabled .icon-plus{color:var(--counter-icons-color-disabled)}:host .counter-wrapper .increase-wrapper:hover .icon-plus{color:var(--counter-icons-color-hover)}:host .counter-wrapper .increase-wrapper:active .icon-plus{color:var(--counter-icons-color-active)}:host .counter-wrapper .decrease-wrapper{padding:var(--counter-decrease-wrapper-padding);border-top:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-left:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-bottom:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-top-left-radius:var(--counter-border-radius);border-bottom-left-radius:var(--counter-border-radius)}:host .counter-wrapper .decrease-wrapper.disabled{pointer-events:none}:host .counter-wrapper .decrease-wrapper.disabled .icon-minus{color:var(--counter-icons-color-disabled)}:host .counter-wrapper .decrease-wrapper:hover .icon-minus{color:var(--counter-icons-color-hover)}:host .counter-wrapper .decrease-wrapper:hover~.counter-input{border-left-color:var(--counter-border-color-hover)}:host .counter-wrapper .decrease-wrapper:active .icon-minus{color:var(--counter-icons-color-active)}:host .counter-wrapper .decrease-wrapper:active~.counter-input{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper .counter-input{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);text-align:center;padding:var(--counter-input-padding);width:var(--counter-input-width);color:var(--counter-input-text-color);background-color:var(--counter-bg-color);border:none;outline:none;margin:0;border-top:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-bottom:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-left:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);-webkit-box-sizing:border-box;box-sizing:border-box}:host .counter-wrapper .counter-input.without-counter{border-radius:var(--counter-border-radius);border-right:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color)}:host .counter-wrapper .counter-input.without-counter::-webkit-outer-spin-button,:host .counter-wrapper .counter-input.without-counter::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}:host .counter-wrapper .counter-input.without-counter[type=number]{-moz-appearance:textfield}:host .counter-wrapper .counter-input.without-counter.warning{border-left-color:var(--wpp-warning-color-400);border-right-color:var(--wpp-warning-color-400)}:host .counter-wrapper .counter-input.without-counter.error{border-left-color:var(--wpp-danger-color-400);border-right-color:var(--wpp-danger-color-400)}:host .counter-wrapper .counter-input::-webkit-input-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input::-moz-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input:-ms-input-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input::-ms-input-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input::placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input:hover{background-color:var(--counter-bg-color-hover);border-color:var(--counter-border-color-hover)}:host .counter-wrapper .counter-input:hover~.increase-wrapper{border-left-color:var(--counter-border-color-hover)}:host .counter-wrapper .counter-input:focus{border-color:var(--counter-border-color-active);background-color:var(--counter-bg-color)}:host .counter-wrapper .counter-input:focus~.increase-wrapper{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper.size-s{height:var(--counter-height-size-s)}:host .counter-wrapper.size-m{height:var(--counter-height-size-m)}:host .counter-wrapper.tab-focus{border-radius:var(--counter-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 2px var(--counter-second-border-color-focus);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 2px var(--counter-second-border-color-focus)}:host .counter-wrapper.tab-focus .counter-input:focus{background-color:var(--counter-bg-color-hover)}:host .counter-wrapper.warning.tab-focus{border-radius:var(--counter-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 2px var(--wpp-warning-color-400);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 2px var(--wpp-warning-color-400)}:host .counter-wrapper.warning .increase-wrapper,:host .counter-wrapper.warning .decrease-wrapper,:host .counter-wrapper.warning .counter-input{border-top-color:var(--wpp-warning-color-400);border-bottom-color:var(--wpp-warning-color-400)}:host .counter-wrapper.warning .decrease-wrapper{border-left-color:var(--wpp-warning-color-400)}:host .counter-wrapper.warning .increase-wrapper{border-right-color:var(--wpp-warning-color-400)}:host .counter-wrapper.warning:hover .increase-wrapper,:host .counter-wrapper.warning:hover .decrease-wrapper,:host .counter-wrapper.warning:hover .counter-input{border-top-color:var(--wpp-warning-color-500);border-bottom-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .decrease-wrapper{border-left-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .increase-wrapper{border-right-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .without-counter{border-left-color:var(--wpp-warning-color-500);border-right-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .increase-wrapper,:host .counter-wrapper.warning:hover .decrease-wrapper,:host .counter-wrapper.warning:hover .counter-input{background-color:var(--counter-bg-color-hover)}:host .counter-wrapper.error.tab-focus{border-radius:var(--counter-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 2px var(--wpp-danger-color-400);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 2px var(--wpp-danger-color-400)}:host .counter-wrapper.error .increase-wrapper,:host .counter-wrapper.error .decrease-wrapper,:host .counter-wrapper.error .counter-input{border-top-color:var(--wpp-danger-color-400);border-bottom-color:var(--wpp-danger-color-400)}:host .counter-wrapper.error .decrease-wrapper{border-left-color:var(--wpp-danger-color-400)}:host .counter-wrapper.error .increase-wrapper{border-right-color:var(--wpp-danger-color-400)}:host .counter-wrapper.error:hover .increase-wrapper,:host .counter-wrapper.error:hover .decrease-wrapper,:host .counter-wrapper.error:hover .counter-input{border-top-color:var(--wpp-danger-color-500);border-bottom-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .decrease-wrapper{border-left-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .increase-wrapper{border-right-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .without-counter{border-left-color:var(--wpp-danger-color-500);border-right-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .increase-wrapper,:host .counter-wrapper.error:hover .decrease-wrapper,:host .counter-wrapper.error:hover .counter-input{background-color:var(--counter-bg-color-hover)}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host([disabled]:not([disabled=false])) .counter-wrapper{pointer-events:none}:host([disabled]:not([disabled=false])) .counter-wrapper.warning .increase-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.warning .decrease-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.warning .counter-input{border-top-color:var(--wpp-warning-color-400);border-bottom-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.warning .decrease-wrapper{border-left-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.warning .increase-wrapper{border-right-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.error .increase-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.error .decrease-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.error .counter-input{border-top-color:var(--wpp-danger-color-400);border-bottom-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.error .decrease-wrapper{border-left-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.error .increase-wrapper{border-right-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper .without-counter.warning{border-left-color:var(--wpp-warning-color-400);border-right-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper .without-counter.error{border-left-color:var(--wpp-danger-color-400);border-right-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper .increase-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper .decrease-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper .counter-input{color:var(--counter-input-text-color-disabled);cursor:not-allowed;border-color:var(--counter-border-color-disabled);background-color:var(--counter-bg-color-disabled)}:host([disabled]:not([disabled=false])) .counter-wrapper .increase-wrapper .icon-plus,:host([disabled]:not([disabled=false])) .counter-wrapper .increase-wrapper .icon-minus,:host([disabled]:not([disabled=false])) .counter-wrapper .decrease-wrapper .icon-plus,:host([disabled]:not([disabled=false])) .counter-wrapper .decrease-wrapper .icon-minus,:host([disabled]:not([disabled=false])) .counter-wrapper .counter-input .icon-plus,:host([disabled]:not([disabled=false])) .counter-wrapper .counter-input .icon-minus{color:var(--counter-icons-color-disabled)}.wpp-inline-message{margin-top:4px}";

const WppCounter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.handleValidate = (event) => {
      if (event.key === 'ArrowUp') {
        if (this.value !== this.max)
          return this.addStepToValue(this.step);
      }
      if (event.key === 'ArrowDown') {
        if (this.value !== this.min)
          return this.addStepToValue(-this.step);
      }
      this.formatValue();
    };
    this.formatValue = (valueToFormat) => {
      this.formattedValue = this.format
        ? (valueToFormat || String(this.value)).replace(this.format.searchValue, this.format.replaceValue)
        : valueToFormat || String(this.value);
      return this.formattedValue;
    };
    this.onInput = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      const target = event.target;
      const targetValue = target.value.replace(' ', '').replace(/[^0-9.]/g, '');
      if (Number.isInteger(this.step)) {
        const inputValue = Number(targetValue) || 0;
        if (inputValue === 0) {
          target.value = '';
          this.formattedValue = '';
        }
        else {
          this.value = Math.max(this.min, Math.min(this.max, inputValue));
          target.value = this.formatValue();
        }
      }
      else {
        if (!/^-?\d*(?:[.,]\d*)?$/.test(targetValue)) {
          target.value = this.formatValue();
          return;
        }
        if (targetValue.includes('.') && targetValue.split('.')[1].length === 0) {
          target.value = this.formatValue(targetValue);
        }
        else {
          this.value = Number(targetValue);
          target.value = this.formatValue();
        }
      }
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.onFocus = (event) => {
      this.inputRef?.select();
      this.wppFocus.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.onBlur = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      if (this.formattedValue === '') {
        this.formattedValue = String(this.min);
        this.value = this.min;
        this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
      }
      this.wppBlur.emit(event);
    };
    this.roundToDecimal = (value, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    };
    this.addStepToValue = (valueOfStep) => {
      if (Number.isInteger(this.step)) {
        this.value += valueOfStep;
      }
      else {
        const numberOfDecimalsFromStep = (this.step + '').split('.')[1].length;
        this.value = this.roundToDecimal(this.value + valueOfStep, numberOfDecimalsFromStep);
      }
    };
    this.increaseValue = () => {
      if (this.value === this.max)
        return;
      this.addStepToValue(this.step);
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.decreaseValue = () => {
      if (this.value === this.min)
        return;
      this.addStepToValue(-this.step);
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.counterWrapperCssClasses = () => ({
      'counter-wrapper': true,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
    });
    this.decreaseWrapperCssClasses = () => ({
      'decrease-wrapper': true,
      disabled: this.value === this.min,
    });
    this.increaseWrapperCssClasses = () => ({
      'increase-wrapper': true,
      disabled: this.value === this.max,
    });
    this.inputCssClasses = () => ({
      'counter-input': true,
      'without-counter': !this.withButtons,
      [`${this.messageType}`]: !!this.messageType,
    });
    this.hostCssClasses = () => ({
      'wpp-counter': true,
    });
    this.formattedValue = undefined;
    this.focusType = undefined;
    this.name = undefined;
    this.value = 1;
    this.min = 1;
    this.max = 100;
    this.withButtons = true;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.format = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.step = 1;
  }
  updateFormattedValue() {
    this.formatValue();
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  componentWillLoad() {
    this.formattedValue = String(this.value);
    this.formatValue();
  }
  componentDidLoad() {
    utils.autoFocusElement(this.autoFocus, this.inputRef);
  }
  render() {
    return (index.h(index.Host, { "aria-disabled": this.disabled, class: this.hostCssClasses(), exportparts: "label, body, decrease-button, decrease-icon, input, increase-button, increase-icon, message", onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onBlur: this.onBlur }, this.labelConfig?.text && (index.h("wpp-label-v2-22-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), index.h("div", { class: this.counterWrapperCssClasses(), part: "body" }, this.withButtons && (index.h("div", { class: this.decreaseWrapperCssClasses(), onClick: this.decreaseValue, part: "decrease-button" }, index.h("wpp-icon-remove-v2-22-0", { class: "icon-minus", part: "decrease-icon" }))), index.h("input", { id: this.name, type: this.withButtons ? 'text' : 'decimal', class: this.inputCssClasses(), name: this.name, onKeyDown: this.handleValidate, value: this.formattedValue, required: this.required, disabled: this.disabled, onInput: this.onInput, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, part: "input", title: "" }), this.withButtons && (index.h("div", { class: this.increaseWrapperCssClasses(), onClick: this.increaseValue, part: "increase-button" }, index.h("wpp-icon-plus-v2-22-0", { class: "icon-plus", part: "increase-icon" })))), this.message && (index.h("wpp-inline-message-v2-22-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
  }
  static get registryIs() { return "wpp-counter-v2-22-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["updateFormattedValue"]
  }; }
};
WppCounter.style = wppCounterCss;

exports.wpp_counter = WppCounter;
