import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-cc81a41b.js';
import './consts-9fc0a13a.js';

const wppPillGroupCss = ":host{--pill-group-item-margin:var(--wpp-pill-group-item-margin, 0 8px 0 0);--pill-group-label-margin:var(--wpp-pill-group-label-margin, 0 0 8px 0);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--pill-group-label-margin)}:host .pills-wrapper{display:-ms-inline-flexbox;display:inline-flex}:host .pills-wrapper ::slotted(.wpp-pill:not(:last-child)){margin:var(--pill-group-item-margin)}";

const WppPillGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, { "aria-multiselectable": this.type === 'multiple', "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, class: this.hostCssClasses(), exportparts: "label, content, inner" }, this.labelConfig?.text && (h("wpp-label-v4-0-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: "pills-wrapper", part: "content" }, h("slot", { part: "inner" }))));
  }
  static get registryIs() { return "wpp-pill-group-v4-0-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"],
    "size": ["onUpdateSize"]
  }; }
};
WppPillGroup.style = wppPillGroupCss;

export { WppPillGroup as wpp_pill_group };
