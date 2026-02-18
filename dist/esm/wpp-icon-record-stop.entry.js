import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRecordStop = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-record-stop", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.7555 16.8 16.8 13.7555 16.8 10C16.8 6.24446 13.7555 3.2 10 3.2ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM6.8 8C6.8 7.33726 7.33726 6.8 8 6.8H12C12.6627 6.8 13.2 7.33726 13.2 8V12C13.2 12.6627 12.6627 13.2 12 13.2H8C7.33726 13.2 6.8 12.6627 6.8 12V8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-record-stop-v3-5-0"; }
};
WppIconRecordStop.style = wppIconCss;

export { WppIconRecordStop as wpp_icon_record_stop };
