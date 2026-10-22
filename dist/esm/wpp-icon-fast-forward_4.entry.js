import { r as registerInstance, h, c as createEvent, H as Host, g as getElement } from './index-a0877c3d.js';
import { W as WppIcon } from './WppIcon-bb52ef53.js';
import { k as transformToVersionedTag } from './utils-49ce8daf.js';
import './consts-744c144f.js';

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFastForward = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-fast-forward", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.9028 3.85156C12.5486 3.38603 11.7782 3.609 11.7778 4.25684V15.7432C11.7782 16.3916 12.549 16.6141 12.9028 16.1475L17.2651 10.3945C17.4456 10.1565 17.445 9.82167 17.2642 9.58398L12.9028 3.85156ZM5.7251 3.85156C5.37084 3.38603 4.60048 3.609 4.6001 4.25684V15.7432C4.60047 16.3916 5.37227 16.6141 5.72607 16.1475L10.0884 10.3945C10.2687 10.1565 10.2681 9.82161 10.0874 9.58398L5.7251 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get registryIs() { return "wpp-icon-fast-forward-v4-6-0"; }
};
WppIconFastForward.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPause = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pause", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.125 4.15C3.125 3.23873 3.86373 2.5 4.775 2.5H7.475C8.38627 2.5 9.125 3.23873 9.125 4.15V15.85C9.125 16.7613 8.38627 17.5 7.475 17.5H4.775C3.86373 17.5 3.125 16.7613 3.125 15.85V4.15ZM4.775 4C4.69216 4 4.625 4.06716 4.625 4.15V15.85C4.625 15.9328 4.69216 16 4.775 16H7.475C7.55784 16 7.625 15.9328 7.625 15.85V4.15C7.625 4.06716 7.55784 4 7.475 4H4.775Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.875 4.15C10.875 3.23873 11.6137 2.5 12.525 2.5H15.225C16.1363 2.5 16.875 3.23873 16.875 4.15V15.85C16.875 16.7613 16.1363 17.5 15.225 17.5H12.525C11.6137 17.5 10.875 16.7613 10.875 15.85V4.15ZM12.525 4C12.4422 4 12.375 4.06716 12.375 4.15V15.85C12.375 15.9328 12.4422 16 12.525 16H15.225C15.3078 16 15.375 15.9328 15.375 15.85V4.15C15.375 4.06716 15.3078 4 15.225 4H12.525Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pause-v4-6-0"; }
};
WppIconPause.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRewind = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-rewind", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.09766 3.85156C7.45192 3.38603 8.22228 3.609 8.22266 4.25684V15.7432C8.22228 16.3916 7.45146 16.6141 7.09766 16.1475L2.73535 10.3945C2.55491 10.1565 2.55547 9.82167 2.73633 9.58398L7.09766 3.85156ZM14.2754 3.85156C14.6296 3.38603 15.4 3.609 15.4004 4.25684V15.7432C15.4 16.3916 14.6282 16.6141 14.2744 16.1475L9.91211 10.3945C9.73183 10.1565 9.73239 9.82161 9.91309 9.58398L14.2754 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get registryIs() { return "wpp-icon-rewind-v4-6-0"; }
};
WppIconRewind.style = wppIconCss;

const wppPillGroupCss = ":host{--pill-group-item-margin:var(--wpp-pill-group-item-margin, 0 8px 0 0);--pill-group-label-margin:var(--wpp-pill-group-label-margin, 0 0 8px 0);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--pill-group-label-margin)}:host .label .wpp-internal-label::part(info-wrapper){cursor:text}:host .pills-wrapper{display:-ms-inline-flexbox;display:inline-flex}:host .pills-wrapper ::slotted(.wpp-pill:not(:last-child)){margin:var(--pill-group-item-margin)}";

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
    return (h(Host, { "aria-multiselectable": this.type === 'multiple', "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, class: this.hostCssClasses(), exportparts: "label, content, inner" }, this.labelConfig?.text && (h("wpp-label-v4-6-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: "pills-wrapper", part: "content" }, h("slot", { part: "inner" }))));
  }
  static get registryIs() { return "wpp-pill-group-v4-6-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"],
    "size": ["onUpdateSize"]
  }; }
};
WppPillGroup.style = wppPillGroupCss;

export { WppIconFastForward as wpp_icon_fast_forward, WppIconPause as wpp_icon_pause, WppIconRewind as wpp_icon_rewind, WppPillGroup as wpp_pill_group };
