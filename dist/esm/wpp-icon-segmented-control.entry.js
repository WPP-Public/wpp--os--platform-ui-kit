import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSegmentedControl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-segmented-control", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15 5H5C3.34315 5 2 6.34315 2 8V12C2 13.6569 3.34315 15 5 15H15C16.6569 15 18 13.6569 18 12V8C18 6.34315 16.6569 5 15 5ZM3.5 8C3.5 7.17157 4.17157 6.5 5 6.5H9.25V13.5H5C4.17157 13.5 3.5 12.8284 3.5 12V8ZM10.75 13.5H15C15.8284 13.5 16.5 12.8284 16.5 12V8C16.5 7.17157 15.8284 6.5 15 6.5H10.75V13.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-segmented-control-v3-4-0"; }
};
WppIconSegmentedControl.style = wppIconCss;

export { WppIconSegmentedControl as wpp_icon_segmented_control };
