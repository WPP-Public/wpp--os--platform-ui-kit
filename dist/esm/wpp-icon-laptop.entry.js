import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLaptop = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-laptop", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M1.25 15.5C1.25 15.0858 1.58579 14.75 2 14.75H18C18.4142 14.75 18.75 15.0858 18.75 15.5C18.75 15.9142 18.4142 16.25 18 16.25H2C1.58579 16.25 1.25 15.9142 1.25 15.5Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.25 5C2.25 4.0335 3.0335 3.25 4 3.25H16C16.9665 3.25 17.75 4.0335 17.75 5V12C17.75 12.9665 16.9665 13.75 16 13.75H4C3.0335 13.75 2.25 12.9665 2.25 12V5ZM4 4.75C3.86193 4.75 3.75 4.86193 3.75 5V12C3.75 12.1381 3.86193 12.25 4 12.25H16C16.1381 12.25 16.25 12.1381 16.25 12V5C16.25 4.86193 16.1381 4.75 16 4.75H4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-laptop-v3-4-0"; }
};
WppIconLaptop.style = wppIconCss;

export { WppIconLaptop as wpp_icon_laptop };
