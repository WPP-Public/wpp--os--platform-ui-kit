'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppRadioGroupCss = ":host .group-container{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .group-container .content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:8px}:host .group-container .content.direction-row{gap:20px;-ms-flex-direction:row;flex-direction:row}:host .label .wpp-internal-label::part(info-wrapper){cursor:default}";

const WppRadioGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
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
    return (index.h(index.Host, { class: this.hostCssClasses(), onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, index.h("div", { class: "group-container", role: "radiogroup", "aria-labelledby": this.ariaProps.labelledby, ...(!!this.message && this.ariaProps.describedby ? { 'aria-describedby': this.ariaProps.describedby } : {}) }, this.labelConfig?.text && (index.h("wpp-label-v4-1-0", { class: "label", tag: "h3", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, id: this.ariaProps.labelledby })), index.h("div", { class: this.contentCssClasses(), style: this.gap ? { gap: `${this.gap}px` } : {} }, index.h("slot", { onSlotchange: this.checkRadioElements, part: "inner" })), !!this.message && (index.h("wpp-inline-message-v4-1-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, id: this.ariaProps.describedby })))));
  }
  static get registryIs() { return "wpp-radio-group-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["updateValue"]
  }; }
};
WppRadioGroup.style = wppRadioGroupCss;

exports.wpp_radio_group = WppRadioGroup;
