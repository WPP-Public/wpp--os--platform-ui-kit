import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNightLife = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-night-life", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.25251 2C3.13888 2 2.58116 3.34642 3.36862 4.13388L9.2954 11.0607V16.5H7.0454C6.63119 16.5 6.2954 16.8358 6.2954 17.25C6.2954 17.6642 6.63119 18 7.0454 18H13.0454C13.4596 18 13.7954 17.6642 13.7954 17.25C13.7954 16.8358 13.4596 16.5 13.0454 16.5H10.7954V11.0607L16.7222 4.13388C17.5096 3.34643 16.9519 2 15.8383 2H4.25251ZM12.9291 6.25L10.0454 9.68934L7.16175 6.25H12.9291ZM14.177 4.76151L15.2347 3.5H4.85606L5.91376 4.76152C5.9565 4.75395 6.00049 4.75 6.04541 4.75H14.0454C14.0903 4.75 14.1343 4.75395 14.177 4.76151Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-night-life-v3-4-0"; }
};
WppIconNightLife.style = wppIconCss;

export { WppIconNightLife as wpp_icon_night_life };
